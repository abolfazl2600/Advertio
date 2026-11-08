# Three-screen Android first-run onboarding

The Android-only Capacitor entry sequence now shows three locally bundled travel, delivery and Telegram verification illustrations. Images are decorative WebP assets; captions remain localized, selectable and accessible React text rather than being burned into the images.

1. On a clean install, the user sees three sequential screens with Next and dot progress; the final primary action opens the existing LoginScreen (the same sign-in component used by the Advertio website). Optional guest browsing remains available throughout.
2. Completion stores only `advertio.android.welcome.v2=seen`; user credentials remain in the existing native secure-session vault. A returning guest starts at LoginScreen, while a restored authenticated user goes directly to the app.
3. Back moves to the previous slide; Back from the sign-in view enters guest browsing. Auth endpoints, verified-phone state and account restrictions are unchanged.

Assets `onboarding/assets/slide-01.webp` through `slide-03.webp` are reduced-size mobile renditions of the three approved 1080×1920 onboarding artworks, cropped to the illustrated upper portion. They are published into `apps/web/public/onboarding/` at build time so Vite/Capacitor serves them offline. The source artwork files are not pulled from a network.

Build integration: update the external reviewed private source lock with three new `apps/web/public/onboarding/slide-0N.webp: ABSENT` entries before running the private build; `welcome.json` contains SHA-256 values for each new overlay target and updated React/CSS sources. The private runner must remain outside public Git and must not publish decrypted source or secrets.

Validation target: `node android/tests/harness/build-entry-fixture.mjs`, `node --test android/tests/navigation/entry.test.mjs`, `node android/tests/navigation/entry-visual-check.mjs`, plus overlay manifest hash and private-device build/test. Actual APK, OTP, device rendering and release signing require the approved private runner and are **NOT RUN** in this change set.

Rollback: revert the onboarding overlay changes and rebuild with the previous reviewed private lock.
