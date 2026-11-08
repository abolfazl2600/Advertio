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

ANDROID = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ANDROID/'scripts'))
from source_workspace import BuildError
from android_source import unpack, key_bytes
from overlay_manifest import load_manifest
from ci.versioning import version_for_run, verify_apk_version
spec = importlib.util.spec_from_file_location('builder', ANDROID/'scripts/build-private.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

CONFIG_NAMES = ('ANDROID_SOURCE_KEY','KEYSTORE_BASE64',
                'RELEASE_STORE_PASSWORD','RELEASE_KEY_ALIAS','RELEASE_KEY_PASSWORD',
                'API_ORIGIN','MEDIA_ORIGINS')

class MissingConfiguration(BuildError):
    def __init__(self, missing):
        # Only constant configuration names may appear in public diagnostics.
        self.names = tuple('ADVERTIO_'+name for name in CONFIG_NAMES if name in missing)
        super().__init__('Missing GitHub environment secrets: '+', '.join(self.names))

def configuration():
    missing = [name for name in CONFIG_NAMES if not os.environ.get('ADVERTIO_'+name, '').strip()]
    if missing:
        raise MissingConfiguration(missing)
    return {name: required(name) for name in CONFIG_NAMES}

def stage_apk(apk, runner_temp):
    # Only the verified APK crosses the private staging boundary.
    output = Path(runner_temp)/'advertio-apk-artifact'
    if output.is_symlink():
        raise BuildError('Artifact directory symlink prohibited')
    output.mkdir(mode=0o700, exist_ok=True)
    target = output/'Advertio-release.apk'
    if target.is_symlink():
        raise BuildError('Artifact file symlink prohibited')
    shutil.copyfile(apk, target)
    return target

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
    values = configuration()
    version_code, version_name = version_for_run(os.environ)
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
        source = root/'source'
        hashes = unpack(ANDROID/'source/android-source.enc', source, key_bytes(values['ANDROID_SOURCE_KEY']))
        manifest = load_manifest(ANDROID/'mobile/overlays')
        pins = {item['target']:hashes.get(item['target'],'ABSENT') for item in manifest['files']}
        builder.apply_overlays(source, ANDROID/'mobile/overlays', manifest, {'files':pins})
        # Private home/config; no inherited npm authentication or global git hooks.
        (root/'home').mkdir(); env.update(HOME=str(root/'home'),npm_config_userconfig='/dev/null',
            VITE_API_URL=values['API_ORIGIN'],VITE_ANDROID_API_ORIGINS=values['API_ORIGIN'],
            VITE_ANDROID_MEDIA_ORIGINS=values['MEDIA_ORIGINS'])
        run(['corepack','pnpm@11.9.0','install','--frozen-lockfile','--filter','web...'],source,env)
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
            ADVERTIO_VERSION_CODE=str(version_code),ADVERTIO_VERSION_NAME=version_name,
            ADVERTIO_RELEASE_STORE_PASSWORD=values['RELEASE_STORE_PASSWORD'],
            ADVERTIO_RELEASE_KEY_ALIAS=values['RELEASE_KEY_ALIAS'],
            ADVERTIO_RELEASE_KEY_PASSWORD=values['RELEASE_KEY_PASSWORD'])
        run(['./gradlew',':app:assembleRelease','--console=plain','--no-daemon','--max-workers=2'],mobile/'android',signing)
        apk = mobile/'android/app/build/outputs/apk/release/app-release.apk'
        run([str(sdk/'build-tools/36.0.0/apksigner'),'verify','--verbose',str(apk)],mobile,env)
        badging = run([str(sdk/'build-tools/36.0.0/aapt'),'dump','badging',str(apk)],mobile,env)
        if 'application-debuggable' in badging:
            raise BuildError('Debug APK delivery prohibited')
        verify_apk_version(badging, version_code, version_name)
        stage_apk(apk, os.environ['RUNNER_TEMP'])
        print('Verified Android version: '+version_name+' (code '+str(version_code)+')')
        print('Verified signed release APK staged for GitHub artifact upload.')
        print('APK SHA256: '+hashlib.sha256(apk.read_bytes()).hexdigest())

if __name__ == '__main__':
    try:
        build()
    except MissingConfiguration as error:
        print(str(error), file=sys.stderr)
        print('Configure repository Settings > Environments > android-release > Environment secrets. Never paste secret values into logs or issues.', file=sys.stderr)
        sys.exit(1)
    except Exception:
        # No exception string/traceback: providers may include credentials or URLs.
        print('Release failed. Verify private configuration, source pins, signing; raw logs are intentionally suppressed.',file=sys.stderr)
        sys.exit(1)
