# First private Android debug APK — 2026-10-22

The owner requested implementation and private delivery of the first debug APK without release signing. A real APK containing the existing application UI was built with the current Android overlays; it is not the foundation placeholder. Google login remains disabled. No private source, compiled assets, source revision, source lock, APK, debug key or raw build logs are stored in this public repository. Delivery is private to the requesting user.

## Changes required for the first build

- Export the immutable source through the read-only GitLab connector, verify every received Git blob against its pinned tree, then bind an external snapshot SHA-256 manifest into the external approved source lock. The runner now accepts this path without extracting/exporting connector credentials. Unlisted files, dependency folders, drift and path escapes are rejected; no GitLab write is performed.
- Export the Android Session type used by the existing views. Actual application TypeScript and Vite production builds now pass with the overlays.
- Use an explicit Android Axios adapter over the installed CapacitorHttp API, including restore/revoke with captured tokens. Native HTTPS requests are not browser CORS requests; no server or browser security setting is weakened. The exact approved API origin, disabled redirects, normal TLS, expiry/session interceptors, payment guards, timeouts and cancellation-result rejection remain in place. There is no global fetch/XHR patch or certificate exception.
- Support multipart strings/files through the SDK's documented native representation, preserving binary bytes and generating a boundary natively. Reject header-injected fields and limit memory to 15 MiB per file / 25 MiB per request. Physical picker/camera and authenticated upload acceptance remain NOT RUN.
- Pin the Gradle binary distribution checksum. Permit managed-runner proxy/trust-store settings for build dependencies only; never disable TLS verification. Optional raw command logs are mode 0600 outside all Git worktrees and must not be published.

## Executed evidence

| Check | Result | Limitation |
| --- | --- | --- |
| Toolchain | PASS | JDK 21.0.13, SDK/build-tools 36, Gradle 8.14.3, AGP 8.13.0, Node 24.19.0, npm/pnpm 11.9.0, Capacitor 8.5.3 |
| Private source export | PASS | Immutable tree/blob verification and external source/overlay locks; metadata retained privately |
| Existing app with overlays | PASS | Actual application tsc -b and Vite build; not only synthetic contracts |
| Native modules | PASS | SecureSession, NavigationPolicy and NativeUx compiled by javac |
| cap sync / assembleDebug | PASS | Successful APK packaging with real UI assets |
| Full private runner | PASS | Connector snapshot -> locked dependency install -> real UI build -> native sync -> Gradle wrapper -> APK; independent APK web assets match the delivered build |
| APK structure and signing | PASS | apksigner verify --verbose --print-certs; real asset chunks, embedded HTTPS API, no GIS script/remote server URL, bridge logging and WebView debugging disabled |
| Tests | PASS | 25 Node tests and 14 Python tests; overlay contract typecheck and scope/diff checks |
| Device / emulator / account | NOT RUN | No attached phone/emulator/KVM; no claim of real OTP, secure-vault instrumentation or install/launch success |

Development package is `com.advertio.development`, versionCode 1/versionName 1.0, minSdk 24, targetSdk 36. Android requires an APK signature to install: Gradle's ordinary development key signs this debug build automatically; no production/upload key is used. The app is debuggable as expected for this variant, while WebView and bridge logging remain disabled. This is not a signed production release or Play-ready artifact.

## Reproduce privately

Use [private-build.md](private-build.md), either the existing deploy-token path or `--source-snapshot /secure/export --snapshot-manifest /secure/snapshot-manifest.json`. The manifest has schema 1, repository, immutable revision and `files: {relativePath: sha256}`. Add its file SHA-256 as `snapshotManifestSha256` in the external source lock, then bind that lock's hash into the owner decision record. Original upstream target hashes and ABSENT entries stay external and reviewed. The user request authorizes this private debug purpose only, not public source/bundle distribution.

Optional `--private-log /secure/new-build.log` retains command output privately. On managed runners, supply a trusted CA bundle through NODE_EXTRA_CA_CERTS and JVM trust-store/proxy properties through GRADLE_OPTS if required. These affect dependency downloads, not app TLS. Build to a new external output directory and verify the resulting APK before delivery.

## Known first-version limits

Google sign-in, purchasing and unapproved credit-spending actions remain disabled. This also blocks posting when it shares a potentially charging endpoint. Bot login currently requires the user to return manually; verified App Links/process-death return is #49. General external support/advertiser links remain blocked pending an approved allowlist. Media is restricted to configured origins; additional image hosts require review. Real OTP/account, native HTTP, picker/upload, Back/IME and full functional QA must be checked on a device. Server CORS issue #63 remains open for browser transports; it is no longer required by the new explicit Android API transport, whose physical-device acceptance is pending.

Rollback: revert the first-debug integration and rebuild reviewed inputs privately. Do not publish an older payment-enabled build. Keep the development key privately for same-signature debug updates, or uninstall the old debug app before installing a differently signed build (which removes its local session/data).
