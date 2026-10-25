#!/usr/bin/env python3
"""Trusted main-only private build. No private command output enters Actions logs."""
import base64
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request

ANDROID = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ANDROID/'scripts'))
from source_workspace import BuildError, fetch_source, load_lock
from overlay_manifest import load_manifest
spec = importlib.util.spec_from_file_location('builder', ANDROID/'scripts/build-private.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise BuildError('Delivery redirect rejected')

def delivery_url(url, host):
    u = urllib.parse.urlsplit(url)
    if (u.scheme != 'https' or not host or u.hostname != host or u.port not in (None, 443)
            or u.username or u.password or u.fragment or u.path in ('', '/')
            or host in ('localhost', '127.0.0.1', '::1')):
        raise BuildError('Approved HTTPS private object destination required')
    return url

def required(name):
    value = os.environ.get('ADVERTIO_'+name, '')
    if not value.strip():
        raise BuildError('Missing required release configuration: '+name)
    return value

def run(args, cwd, env):
    # Never print output: dependency tools can expose source, paths or signed URLs.
    result = subprocess.run(args, cwd=cwd, env=env, capture_output=True)
    if result.returncode:
        raise BuildError('Private build command failed; no raw output published')
    return result.stdout.decode(errors='replace')

def build():
    names = ['SOURCE_LOCK_JSON','GITLAB_USER','GITLAB_TOKEN','KEYSTORE_BASE64',
             'RELEASE_STORE_PASSWORD','RELEASE_KEY_ALIAS','RELEASE_KEY_PASSWORD',
             'API_ORIGIN','MEDIA_ORIGINS','APK_UPLOAD_URL','APK_UPLOAD_HOST']
    values = {name: required(name) for name in names}
    url = delivery_url(values['APK_UPLOAD_URL'], values['APK_UPLOAD_HOST'])
    # Reuse existing HTTPS origin validation rather than trusting arbitrary URLs.
    from urllib.parse import urlsplit
    for origin in [values['API_ORIGIN'], *values['MEDIA_ORIGINS'].split(',')]:
        u = urlsplit(origin)
        if u.scheme != 'https' or not u.hostname or u.username or u.password or u.query or u.fragment or u.path not in ('','/') or u.hostname in ('localhost','127.0.0.1','::1'):
            raise BuildError('Invalid approved API/media origin')
    env = {k: v for k, v in os.environ.items() if k in
           ('PATH','JAVA_HOME','ANDROID_HOME','ANDROID_SDK_ROOT','LANG','HOME')}
    with tempfile.TemporaryDirectory(prefix='advertio-release-', dir=os.environ['RUNNER_TEMP']) as tmp:
        root = Path(tmp); root.chmod(0o700)
        lockpath = root/'source-lock.json'; lockpath.write_text(values['SOURCE_LOCK_JSON']); lockpath.chmod(0o600)
        lock = load_lock(lockpath)
        token = root/'token'; token.write_text(values['GITLAB_TOKEN']); token.chmod(0o600)
        source = fetch_source(lock, root, token); token.unlink()
        builder.apply_overlays(source, ANDROID/'mobile/overlays', load_manifest(ANDROID/'mobile/overlays'), lock)
        # Private home/config; no inherited npm authentication or global git hooks.
        (root/'home').mkdir(); env.update(HOME=str(root/'home'),npm_config_userconfig='/dev/null',
            VITE_API_URL=values['API_ORIGIN'],VITE_ANDROID_API_ORIGINS=values['API_ORIGIN'],
            VITE_ANDROID_MEDIA_ORIGINS=values['MEDIA_ORIGINS'])
        run(['corepack','pnpm@11.9.0','install','--frozen-lockfile'],source,env)
        mobile = root/'mobile'
        shutil.copytree(ANDROID/'mobile',mobile,ignore=shutil.ignore_patterns('node_modules','build','.gradle','overlays'))
        run(['python3',str(mobile/'native/install.py'),str(mobile)],mobile,env)
        run(['npm','ci','--ignore-scripts','--no-audit','--no-fund'],mobile,env)
        (source/'apps/web/node_modules/@capacitor').symlink_to(mobile/'node_modules/@capacitor',target_is_directory=True)
        run(['corepack','pnpm@11.9.0','--filter','web','build'],source,env)
        shutil.rmtree(mobile/'www');shutil.copytree(source/'apps/web/dist',mobile/'www')
        run(['npx','--no-install','cap','sync','android'],mobile,env)
        sdk = Path(env.get('ANDROID_SDK_ROOT') or env['ANDROID_HOME'])
        (mobile/'android/local.properties').write_text('sdk.dir='+str(sdk)+'\n')
        key = root/'release.p12';key.write_bytes(base64.b64decode(values['KEYSTORE_BASE64'],validate=True));key.chmod(0o600)
        signing = dict(env,ADVERTIO_PRIVATE_RELEASE='true',ADVERTIO_RELEASE_KEYSTORE=str(key),
            ADVERTIO_RELEASE_STORE_PASSWORD=values['RELEASE_STORE_PASSWORD'],
            ADVERTIO_RELEASE_KEY_ALIAS=values['RELEASE_KEY_ALIAS'],
            ADVERTIO_RELEASE_KEY_PASSWORD=values['RELEASE_KEY_PASSWORD'])
        run(['./gradlew',':app:assembleRelease','--console=plain','--no-daemon','--max-workers=2'],mobile/'android',signing)
        apk = mobile/'android/app/build/outputs/apk/release/app-release.apk'
        run([str(sdk/'build-tools/36.0.0/apksigner'),'verify','--verbose',str(apk)],mobile,env)
        badging = run([str(sdk/'build-tools/36.0.0/aapt'),'dump','badging',str(apk)],mobile,env)
        if 'application-debuggable' in badging:
            raise BuildError('Debug APK delivery prohibited')
        request = urllib.request.Request(url,data=apk.read_bytes(),method='PUT',headers={'Content-Type':'application/vnd.android.package-archive'})
        with urllib.request.build_opener(NoRedirect()).open(request,timeout=120) as response:
            if response.status not in (200,201,204):raise BuildError('Private delivery failed')
        print('Signed release APK delivered to configured private destination.')
        print('APK SHA256: '+hashlib.sha256(apk.read_bytes()).hexdigest())

if __name__ == '__main__':
    try:
        build()
    except Exception:
        # No exception string/traceback: providers may include credentials or URLs.
        print('Release failed. Verify private configuration, source pins, signing and destination; raw logs are intentionally suppressed.',file=sys.stderr)
        sys.exit(1)
