# Automatic Android APK versioning in GitHub Actions

For each **successful** protected `Android signed release APK` workflow build, the private release builder derives version metadata from GitHub's built-in `GITHUB_RUN_NUMBER` and `GITHUB_RUN_ATTEMPT`. The first value increases with newly dispatched runs of this workflow; the second increases if an existing run is rerun.

| Field | Calculation | Example: run 15, attempt 2 |
|---|---|---|
| `versionCode` | `3 + 100 * run_number + run_attempt` | `1505` |
| `versionName` | `1.0.<run_number>.<run_attempt>` | `1.0.15.2` |

`versionCode` must be a positive, unique integer and remain <= 2,100,000,000. The builder reserves attempt numbers 1–99 for each run number and fails rather than producing a duplicate when the range is exceeded. Numbers are derived without editing or committing `build.gradle` after every build, so rerunning the workflow on the same source still produces different APK version metadata.

The release script passes `ADVERTIO_VERSION_CODE` and `ADVERTIO_VERSION_NAME` to Gradle. Release tasks reject missing values. After signing, the script reads the final APK's Android package metadata via `aapt dump badging` and rejects any mismatch **before** uploading the artifact. Existing signing credentials, package ID and private source restrictions are unchanged.

When building a local debug APK without those environment variables, Gradle retains its fixed fallback (`versionCode=3`, `versionName=1.0.1` plus `-debug`). These fallback values are **not** used in the protected release workflow.

**Important:** A late rerun of an *older* GitHub run can have a lower `versionCode` than an APK built from a newer run and therefore cannot upgrade that installed APK. For the newest installable update, start a **new** workflow run from the latest `main` rather than rerunning an older run. Unsuccessful runs may consume run numbers without producing an APK. The system currently produces an APK for private sideload; it does not automatically publish to Google Play.

Verification: `python3 -m unittest discover -s android/tests/pipeline -p 'test_versioning.py'`. Full signed APK, real-device upgrade, and protected workflow execution require the configured `android-release` environment; no credentials belong in Git.