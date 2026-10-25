# Signed private release APK

Owner request, 2026-10-25: deliver a release APK instead of debug. This authorizes a private sideload build and creation/retention of its dedicated signing key, not public source/artifact distribution or Google Play publication. Refs #57 and parent #38. The current `com.advertio.development` package is retained; the name of a package does not determine the build variant. Final Play identity/account/policy acceptance remains separate.

Release uses versionName 1.0.1 / versionCode 3, `debuggable false`, ordinary release compilation and a dedicated encrypted PKCS12 RSA-3072 key. Debug retains a `-debug` suffix. Launcher name is Advertio. WebView debugging and bridge logging remain disabled by the existing native installer. R8/minification is not enabled; it is not required for a release variant and must be reviewed separately before changing reflection/bridge behavior.

Gradle keeps private release opt-in and refuses missing signing inputs, relative/missing/in-tree keystores and placeholder UI. It never falls back to the debug key. Generate/build keys only outside Git. Secrets are injected through environment variables, not committed properties, command-line passwords or public logs:

- `ADVERTIO_PRIVATE_RELEASE=true` for this authorized private purpose.
- `ADVERTIO_RELEASE_KEYSTORE`: absolute external encrypted keystore file.
- `ADVERTIO_RELEASE_STORE_PASSWORD`, `ADVERTIO_RELEASE_KEY_ALIAS`, `ADVERTIO_RELEASE_KEY_PASSWORD`: inject from private secret storage.

Build the reviewed private UI, install the existing native modules, sync Capacitor and configure JDK21/SDK36/Gradle8.14.3 as in [private-build.md](private-build.md). From the external mobile staging directory, invoke the repository's `android/scripts/private-release.sh` by absolute path. The script invokes `:app:assembleRelease` and apksigner. The original strict debug runner remains a debug runner; it does not inherit signing secrets.

Keep the signing key for all future releases. The password-protected keystore backup is delivered privately; its randomly generated recovery password is delivered separately. Keep independent secure copies and store recovery details separately. A recovered temporary copy is checked with keytool before delivery. This is a sideload release key, not an approved Play upload/app-signing key.

Because release uses a different certificate from the earlier debug APKs with the same package, Android requires uninstalling the debug app first; this removes local data/session state. Subsequent release upgrades must use this same key and an increasing versionCode. No server account is changed by the build.

Current device/OTP/API/native vault/picker/Back/keyboard QA, upload AAB, Play signing and Play acceptance are NOT RUN. Do not close #57 or label the artifact Play-ready. Rollback uses the retained release key with reviewed earlier code and a higher versionCode, never a payment-enabled predecessor.

## Executed private release evidence — 2026-10-25

PASS: `:app:assembleRelease` (296 tasks), release signing v2 verification, certificate/keystore match, distinct certificate from debug, application label Advertio, `debuggable` absent/false, versionName 1.0.1/versionCode 3, targetSdk36, embedded UI asset byte comparison, no remote server URL/WebView debugging, and recovery of the encrypted key backup. APK and encrypted-key backup plus separate recovery credentials were saved privately. The same real private UI build from the preceding debug delivery was reused; no claim of a second independent web build.

APK: `Advertio-1.0.1-release.apk`, 4,239,987 bytes. SHA-256: `652718fc39fa2d09b3f99783b31e27857bf6251028da521e228f18f908c2fbd8`.

Public signing certificate SHA-256: `e94ffa0e7a3b11b095edcf62c6703a427f682e4f421a7e4bfe93901e70a88d13`. This fingerprint contains no private key.

Real Gradle negative checks PASS: no explicit private-release authorization; missing signing inputs; keystore inside the project. Reproduce against a provisioned external staging copy with `python3 android/tests/release/check-guards.py --mobile /secure/mobile --gradle /secure/gradle/bin/gradle`, with JDK21/SDK36 and the populated private Gradle cache configured in the environment. Script syntax check, existing native installer test and Android scope/diff checks PASS. Device install/upgrade, AAB and Play acceptance remain NOT RUN. No release acceptance issue is closed.
