"""Deterministic, unique version metadata for protected Android Actions builds.

No git writes or build secrets are required. The run number increments with new
workflow runs, and the attempt distinguishes re-runs of the same workflow run.
"""
import re

BASE_VERSION_CODE = 3  # Last manually assigned Android versionCode.
ATTEMPT_SLOTS = 100
PLAY_MAX_VERSION_CODE = 2_100_000_000


def version_for_run(environ):
    """Return (versionCode, versionName) derived from GitHub's run metadata.

    Reject missing, malformed or exhausted numbers rather than silently
    generating a versionCode that could overwrite a previous APK's identity.
    """
    raw_run = environ.get('GITHUB_RUN_NUMBER', '')
    raw_attempt = environ.get('GITHUB_RUN_ATTEMPT', '')
    if not re.fullmatch(r'[1-9][0-9]*', raw_run) or not re.fullmatch(r'[1-9][0-9]*', raw_attempt):
        raise ValueError('Valid GitHub run and attempt numbers are required')
    run_number, attempt = int(raw_run), int(raw_attempt)
    if attempt >= ATTEMPT_SLOTS:
        raise ValueError('GitHub run has exceeded reserved attempt slots')
    version_code = BASE_VERSION_CODE + run_number * ATTEMPT_SLOTS + attempt
    if version_code > PLAY_MAX_VERSION_CODE:
        raise ValueError('Generated Android versionCode exceeds Play limit')
    version_name = f'1.0.{run_number}.{attempt}'
    return version_code, version_name


def verify_apk_version(badging, expected_code, expected_name):
    """Fail release before upload unless the *packaged APK* has CI's version."""
    match = re.search(
        r"(?m)^package:.*\bversionCode='([0-9]+)'.*\bversionName='([^']+)'",
        badging,
    )
    if not match or int(match.group(1)) != expected_code or match.group(2) != expected_name:
        raise ValueError('Built APK version does not match GitHub run metadata')