# Capacitor Android foundation (#41)

Development-only identity: `com.advertio.development`. This is not an approved Play package. All release tasks deliberately fail until identity/signing/distribution gates are implemented. `www/index.html` is original local placeholder HTML, never private UI. No remote server URL, navigation allowlist or cleartext bypass.

Generated with Capacitor CLI/core/android **8.5.3**, not handwritten pseudo-Gradle. Pins: Node **24.19.0** (`.nvmrc`), npm **11.9.0**, TypeScript **6.0.2**, Gradle **8.14.3**, AGP **8.13.0**, JDK **21**, minSdk **24**, target/compileSdk **36**. SDK build-tools 36.0.0; Android Studio is optional, use a version supporting AGP 8.13.0. Native App/Browser/Haptics/Keyboard/StatusBar plugins are pinned at 8.0.0 and cap sync discovers all five. Exact npm dependency graph is in package-lock.json. Template dependency versions are in variables.gradle.

From `android/mobile/`:

```bash
npm ci --ignore-scripts
npm run typecheck
npx cap sync android
cd android
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.advertio.development/.MainActivity
```

Use JDK 21 and install Android SDK platform 36 and build-tools 36.0.0 first. Provision emulator and verify the local placeholder on a clean offline launch. Private Vite UI build is separate (#42), not proven by a placeholder.

For parent paths containing Unicode/spaces, copy this public mobile folder to an ASCII path in a disposable external workspace (exclude node_modules/build/.gradle), then run the commands there. Never put private source into this worktree. Do not upload private APKs, assets or logs to public Actions/artifacts.

## Actual worker evidence — 2026-10-22

PASS: npm install generated lock; npm ci --ignore-scripts (99 packages); npx cap add android; npm run typecheck; cap sync.
Worker: Linux, Node 24.19.0, npm 11.9.0, JDK 17.0.20. Android SDK/adb/emulator absent.
Gradle assembleDebug: FAIL before compilation — Gradle distribution download raised java.net.SocketException: Network is unreachable. Compilation NOT RUN. Device install/launch: NOT RUN (no SDK/device). JDK 21/SDK 36 compile compatibility remains unverified; pinned template versions are not proof of successful compilation.

Rollback: revert the foundation commit. No upstream files or production state are touched.
