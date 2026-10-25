#!/usr/bin/env python3
"""Exercise real Gradle release rejection in a provisioned external mobile staging copy."""
import argparse
import os
from pathlib import Path
import subprocess

p = argparse.ArgumentParser()
p.add_argument('--mobile', required=True, type=Path)
p.add_argument('--gradle', required=True, type=Path)
a = p.parse_args()
mobile = a.mobile.resolve()
env = {k: v for k, v in os.environ.items() if not k.startswith('ADVERTIO_RELEASE_')}
env.pop('ADVERTIO_PRIVATE_RELEASE', None)
args = [str(a.gradle.resolve()), ':app:assembleRelease', '--offline', '--dry-run',
        '--console=plain', '--no-daemon', '--max-workers=2']

def rejected(expected):
    result = subprocess.run(args, cwd=mobile/'android', env=env, capture_output=True, text=True)
    if not result.returncode or expected not in result.stdout + result.stderr:
        raise SystemExit('FAIL: release guard was not enforced; inspect staging privately')

rejected('explicitly authorize private sideload release')
print('PASS: release requires explicit authorization')
env['ADVERTIO_PRIVATE_RELEASE'] = 'true'
rejected('external release signing inputs are required')
print('PASS: release requires signing secrets')
env.update(ADVERTIO_RELEASE_KEYSTORE=str(mobile/'android/app/build.gradle'),
           ADVERTIO_RELEASE_STORE_PASSWORD='synthetic-invalid',
           ADVERTIO_RELEASE_KEY_ALIAS='synthetic-invalid',
           ADVERTIO_RELEASE_KEY_PASSWORD='synthetic-invalid')
rejected('signing keystore must be an external absolute file')
print('PASS: release rejects signing material inside the project')
