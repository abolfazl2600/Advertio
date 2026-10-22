#!/usr/bin/env python3
"""Private manual runner. No public CI, logs, source or outputs."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
from source_workspace import BuildError, fetch_source, import_snapshot, load_lock, run as source_run, workspace
from overlay_manifest import load_manifest

ANDROID = Path(__file__).resolve().parents[1]
PRIVATE_LOG = None

def run(argv, cwd, env=None):
    if PRIVATE_LOG is None:
        return source_run(argv, cwd, env)
    result = subprocess.run(argv, cwd=cwd, env=env, capture_output=True, text=True)
    with PRIVATE_LOG.open('a') as log:
        log.write('\nCommand: '+Path(argv[0]).name+' | exit: '+str(result.returncode)+'\n')
        log.write(result.stdout); log.write(result.stderr)
    if result.returncode:
        raise BuildError('Private command failed; inspect only the private runner log')
    return result.stdout.strip()

def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def external(path):
    path = Path(path).resolve()
    ancestor = path
    while not ancestor.is_dir():
        if ancestor.parent == ancestor:
            raise BuildError('Cannot establish external private path')
        ancestor = ancestor.parent
    if subprocess.run(['git', '-C', str(ancestor),
                       'rev-parse', '--show-toplevel'], capture_output=True).returncode == 0:
        raise BuildError('Private inputs/output must be outside any Git worktree')
    return path

def child(root, rel):
    if not isinstance(rel, str) or Path(rel).is_absolute() or '..' in Path(rel).parts:
        raise BuildError('Unsafe overlay path')
    target = (root / rel).resolve()
    if not target.is_relative_to(root.resolve()):
        raise BuildError('Overlay escaped staging')
    return target

def apply_overlays(source, overlay_root, manifest, lock):
    if manifest.get('schema') != 1:
        raise BuildError('Invalid overlay manifest')
    # Private lock owns expected source hashes; public manifest owns original payload hashes.
    expected = lock.get('files', {})
    entries = manifest.get('files', [])
    if not entries:
        raise BuildError('No reviewed overlays supplied')
    targets = set()
    plan = []
    for entry in entries:
        rel = entry['target']
        if rel in targets or not rel.startswith('apps/web/'):
            raise BuildError('Invalid/duplicate overlay target')
        targets.add(rel)
        dst, payload = child(source, rel), child(overlay_root, entry['payload'])
        if digest(payload) != entry['sha256']:
            raise BuildError('Overlay payload hash mismatch')
        before = expected.get(rel)
        if before == 'ABSENT':
            if dst.exists():
                raise BuildError('New overlay target already exists')
        elif not isinstance(before, str) or not dst.is_file() or digest(dst) != before:
            raise BuildError('Upstream overlay drift; review source lock privately')
        plan.append((dst, payload))
    # Validate the entire plan before changing a single file.
    for dst, payload in plan:
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(payload, dst)

def check_approval(path, source_lock):
    record = json.loads(external(path).read_text())
    required = ('owner', 'approvalReference', 'privateRunner', 'privateArtifactPolicy')
    if any(not isinstance(record.get(k), str) or not record[k].strip() for k in required):
        raise BuildError('Incomplete owner decision record')
    if record.get('sourceLockSha256') != digest(source_lock) or record.get('purpose') != 'private-debug-build':
        raise BuildError('Owner decision is not bound to this source lock/purpose')
    # Organizational approval authenticity remains the operator's responsibility.
    return record

def build(args):
    global PRIVATE_LOG
    PRIVATE_LOG = external(args.private_log) if getattr(args, 'private_log', None) else None
    if PRIVATE_LOG:
        descriptor = os.open(PRIVATE_LOG, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        os.close(descriptor)
    lock_path = external(args.source_lock)
    lock = load_lock(lock_path)
    check_approval(args.approval, lock_path)
    output = external(args.output)
    if output.exists():
        raise BuildError('Output must not already exist')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.mkdir(mode=0o700)
    try:
        with workspace() as temp:
            if args.source_snapshot:
                source = import_snapshot(lock, temp, external(args.source_snapshot), external(args.snapshot_manifest))
            else:
                source = fetch_source(lock, temp, external(args.token_file))
            overlay = ANDROID / 'mobile/overlays'
            manifest_path = overlay / 'manifest.json'
            manifest = load_manifest(overlay)
            apply_overlays(source, overlay, manifest, lock)
            # Inputs are owner-controlled and reviewed; never run inherited npm auth configs.
            env = {k: v for k, v in os.environ.items() if k in ('PATH', 'JAVA_HOME', 'ANDROID_HOME', 'ANDROID_SDK_ROOT', 'LANG', 'HTTPS_PROXY', 'HTTP_PROXY', 'NO_PROXY', 'GRADLE_OPTS', 'GRADLE_USER_HOME', 'NODE_USE_ENV_PROXY', 'NODE_EXTRA_CA_CERTS')}
            clean_home = temp / 'home'
            clean_home.mkdir(mode=0o700)
            env['HOME'] = str(clean_home)
            env['npm_config_userconfig'] = '/dev/null'
            env['VITE_API_URL'] = args.api_origin
            env['VITE_ANDROID_API_ORIGINS'] = args.api_allowlist
            env['VITE_ANDROID_MEDIA_ORIGINS'] = args.media_origins
            from urllib.parse import urlsplit
            url = urlsplit(args.api_origin)
            if url.scheme != 'https' or url.username or url.password or url.query or url.fragment or url.path not in ('', '/') or args.api_origin.rstrip('/') not in args.api_allowlist.split(','):
                raise BuildError('Approved HTTPS API origin required')
            if url.hostname in ('localhost', '127.0.0.1', '::1'):
                raise BuildError('Loopback API prohibited')
            for candidate in args.media_origins.split(','):
                media = urlsplit(candidate)
                if media.scheme != 'https' or media.username or media.password or media.query or media.fragment or media.path not in ('', '/') or media.hostname in ('localhost', '127.0.0.1', '::1'):
                    raise BuildError('Approved HTTPS media origins required')
            if run(['node', '--version'], source, env) != 'v24.19.0' or run(['npm', '--version'], source, env) != '11.9.0':
                raise BuildError('Pinned Node/npm required')
            java = subprocess.run(['java', '-version'], env=env, capture_output=True, text=True)
            if java.returncode or not __import__('re').search(r'version \"21[.\"]', java.stderr):
                raise BuildError('JDK 21 required')
            if not (source / 'pnpm-lock.yaml').is_file():
                raise BuildError('Upstream lockfile missing')
            run(['corepack', 'pnpm@11.9.0', 'install', '--frozen-lockfile'], source, env)
            mobile = temp / 'mobile'
            shutil.copytree(ANDROID / 'mobile', mobile, ignore=shutil.ignore_patterns('node_modules', 'build', '.gradle', 'overlays'))
            run(['python3', str(mobile / 'native/install.py'), str(mobile)], mobile, env)
            run(['npm', 'ci', '--ignore-scripts', '--no-audit', '--no-fund'], mobile, env)
            web = source / 'apps/web'
            # Resolve Android-only dependencies without editing the upstream lockfile.
            cap = web / 'node_modules/@capacitor'
            if cap.exists():
                raise BuildError('Unexpected upstream Capacitor dependencies')
            cap.symlink_to(mobile / 'node_modules/@capacitor', target_is_directory=True)
            run(['corepack', 'pnpm@11.9.0', '--filter', 'web', 'build'], source, env)
            assets = web / 'dist'
            if not (assets / 'index.html').is_file():
                raise BuildError('Vite output is missing')
            shutil.rmtree(mobile / 'www')
            shutil.copytree(assets, mobile / 'www')
            run(['npx', '--no-install', 'cap', 'sync', 'android'], mobile, env)
            run(['./gradlew', 'assembleDebug', '--console=plain', '--no-daemon'], mobile / 'android', env)
            apk = mobile / 'android/app/build/outputs/apk/debug/app-debug.apk'
            if not apk.is_file():
                raise BuildError('Debug APK missing')
            shutil.copyfile(apk, output / 'app-debug.apk')
            result = dict(schema=1, sourceRevision=lock['revision'], sourceLockSha256=digest(lock_path),
                          overlayManifestSha256=hashlib.sha256(json.dumps(manifest, sort_keys=True).encode()).hexdigest(), apkSha256=digest(apk),
                          webAssets={str(p.relative_to(assets)): digest(p) for p in sorted(assets.rglob('*')) if p.is_file()},
                          toolchain={'node': run(['node', '--version'], mobile), 'npm': run(['npm', '--version'], mobile),
                                     'capacitor': '8.5.3', 'gradle': '8.14.3', 'agp': '8.13.0', 'requiredJdk': '21'},
                          reproducibility='Unproven until two independent manifests are compared; APK signatures/timestamps can differ')
            (output / 'build-manifest.json').write_text(json.dumps(result, indent=2) + '\n')
    except BaseException:
        shutil.rmtree(output)
        raise

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    for name in ('source-lock', 'approval', 'output', 'api-origin', 'api-allowlist', 'media-origins'):
        p.add_argument('--' + name, required=True)
    source = p.add_mutually_exclusive_group(required=True)
    source.add_argument('--token-file')
    source.add_argument('--source-snapshot', help='External owner-reviewed pinned connector export')
    p.add_argument('--snapshot-manifest', help='External manifest bound into the approved source lock')
    p.add_argument('--private-log', help='New owner-only log outside every Git worktree; never upload publicly')
    try:
        args = p.parse_args()
        if args.source_snapshot and not args.snapshot_manifest:
            raise BuildError('Snapshot manifest required with source export')
        build(args)
        print('Private build completed; outputs remain in the private destination.')
    except (BuildError, OSError, ValueError, KeyError):
        print('BLOCKED: private build failed; inspect the optional owner-only log. No private logs printed.', file=sys.stderr)
        sys.exit(1)
