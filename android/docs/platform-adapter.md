# Native platform overlay (#43)

Original Android code in mobile/overlays/platform is applied only to a disposable Android checkout. Public web and Telegram source is never modified, so existing channel builds retain their original implementations. detectChannel has explicit native-first precedence and a lazy Telegram probe. The native implementation never initializes Telegram, reads initData or opens invoices.

Native plugins: App (hardware Back/lifecycle/minimize), Browser (external HTTPS), Haptics, Keyboard and StatusBar. Dependencies are pinned by foundation #41. A single controller installs hardware listeners once; active sheet/page callbacks take priority, then React Router's history index, then root minimize. No unconditional exitApp. Cleanup removes pending and active listeners. State is preserved by minimizing rather than terminating the process; full process-death/auth restoration remains #45/#49.

The hook overlay preserves the platform shape for phone-based interactive login. Telegram bot links use system browser, allowing a later app-link return (#49). Invoice API returns unsupported. This does not replace #47's complete UI/route purchase removal. Haptics/keyboard are optional enhancements; failures are suppressed. Required navigation initialization emits only a fixed error code.

Wiring: overlay manifest (#42/#44) replaces only staged platform modules and index.html Telegram bootstrap. Source/target hashes must be pinned privately; no blind fuzzy patch. Native services use the official Capacitor plugins. Browser/Telegram regressions require running original web builds separately, not claiming mock tests prove them.

Verification: `node --test android/tests/platform/*.test.mjs` tests native precedence without initData, browser/Telegram selection, hardware Back, lifecycle cleanup and pending listener races, external scheme/invoice rejection, optional-plugin failures. Actual WebView, haptics, keyboard, system browser, full private UI and web/Telegram E2E: NOT RUN (runner/device prerequisites). Draft/Refs #43 until those pass.
