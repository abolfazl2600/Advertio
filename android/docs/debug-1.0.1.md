# Private debug APK 1.0.1 — 2026-10-25

Owner explicitly approved downloading private project dependencies from public npm in this conversation. This supersedes the dependency-install blocker in the earlier Welcome report. No private source, source revision, lockfile, APK, key or raw build logs are published here.

Built from public Android main `9a97427`, including PR #75 (optional Welcome, guest browsing, four-tab footer and static future Wallet) and PR #76 (official launcher icon). Existing OTP/PhoneGate remains; Google and purchasing remain disabled.

PASS: frozen pnpm 11.9.0 dependency install, actual application TypeScript/Vite build, local native-module installation, Capacitor sync, Gradle assembleDebug (243 tasks), apksigner v2 signature verification, package/version/SDK checks and byte-for-byte comparison of APK web assets against the generated UI. The bundled UI contains Welcome/guest preference/future Wallet and the approved HTTPS API origin; no GIS provider script or remote-server URL is configured. These are actual build/artifact checks, not a device test.

Toolchain used: Node 24.22.1, npm/pnpm 11.9.0, Vite 8.1.3 from the frozen private lock, Capacitor 8.5.3, Zulu JDK 21.0.13, SDK/build-tools 36, Gradle 8.14.3, AGP 8.13.0. This was a manual private staging build; the strict runner's recommended Node 24.19.0 path and a second independent reproducibility run were NOT RUN for this revision. No toolchain pins changed.

Delivered privately: `Advertio-1.0.1-debug.apk`, 5,256,551 bytes; SHA-256 `5da0e059198b1f7045021bf41635e3be378d399d554177fd41b2419f6af46e5b`. Package `com.advertio.development`, versionCode 2, versionName 1.0.1-debug, minSdk 24, targetSdk 36. Development signing only; no production key or Play-ready claim.

A new development key was used because the earlier debug key was unavailable. Its backup is delivered privately for future same-signature builds. Android cannot update the earlier differently signed debug APK in place: uninstalling it first removes local app/session data. Existing server-side accounts are unchanged. Never use the debug key as a production upload key.

NOT RUN: install/launch on a real phone/emulator, live OTP/account/API/native-vault/picker/Back/keyboard acceptance and Google Play validation. Referenced acceptance issues remain open. No new unit-test claim: this build uses the UI revision whose automated evidence is recorded in [welcome-guest.md](welcome-guest.md).

Reproduce with the private inputs in [private-build.md](private-build.md); retain the reviewed external snapshot, overlay pins and private signing backup. Dependency installs require owner authorization and network access. Roll back by rebuilding reviewed earlier inputs with the retained debug key; never distribute a payment-enabled predecessor.
