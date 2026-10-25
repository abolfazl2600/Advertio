#!/usr/bin/env bash
# Run only inside the reviewed external mobile staging directory, after real UI cap sync.
set -euo pipefail
: "${ADVERTIO_PRIVATE_RELEASE:?Set true only for an owner-authorized private release}"
: "${ADVERTIO_RELEASE_KEYSTORE:?Absolute external keystore path required}"
: "${ADVERTIO_RELEASE_STORE_PASSWORD:?Inject from private secret storage}"
: "${ADVERTIO_RELEASE_KEY_ALIAS:?Release alias required}"
: "${ADVERTIO_RELEASE_KEY_PASSWORD:?Inject from private secret storage}"
[[ "$ADVERTIO_PRIVATE_RELEASE" == true ]] || { echo 'Private release authorization required' >&2; exit 1; }
[[ -f android/local.properties && -d www/assets ]] || { echo 'Use reviewed external mobile staging with SDK and real UI' >&2; exit 1; }
(cd android && ./gradlew :app:assembleRelease --console=plain --no-daemon)
"${ANDROID_SDK_ROOT:-${ANDROID_HOME:?Android SDK required}}/build-tools/36.0.0/apksigner" verify --verbose android/app/build/outputs/apk/release/app-release.apk
