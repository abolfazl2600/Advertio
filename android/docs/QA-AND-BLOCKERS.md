# Test Matrix، خروجی قابل قبول و Blocker Register

## ماتریس پایه QA
| گروه | سناریوها | مدرک مورد انتظار |
|---|---|---|
| نصب/ارتقا | clean install، upgrade بدون حذف داده، downgrade blocking | build IDs و ویدئو/لاگ پاکسازی‌شده |
| ورود نسخه فعلی | PhoneGate، ورود با کد بات، لغو، بازگشت، logout، JWT expiry؛ نبود ورود Google | نتیجه و account ID ناشناس‌سازی‌شده |
| فهرست‌ها | Housing/Cargo/Jobs، جستجو، فیلتر، جزئیات، saved، ثبت/ویرایش/حذف | screenshot با داده ساختگی |
| کیف پول | نمایش موجودی، مخفی‌بودن تمام پرداخت‌ها، مسدودبودن خرید از deep link و edge case | تست UI و route negative tests |
| سیستم | Android back، keyboard، status bar، share، file upload، rotate، RTL | emulator + physical device |
| خطا | قطع اینترنت، timeout، TLS invalid، API 401/403/500، resume/background، لینک قدیمی | expected/actual + crash logs sanitised |
| امنیت | secrets scan، token persistence/logout، network, permission audit، app signing verify | audit + reports |
| Play | privacy, UGC, Data safety، account deletion، target API، signed AAB upload | checklist و نتیجه Play Console |

## محیط‌های الزام‌آور
- Android نسخه قدیمی پشتیبانی‌شده طبق minSdk، Android 13/14 و Android 16(API 36)، دستگاه کوچک و بزرگ، شبکه کند و سریع.
- روی دستگاه فیزیکی واقعی حداقل یک دور کامل happy path اجرا شود؛ روی Play Internal Test نسخه امضاشده توسط Play تست شود.
- در نسخه آینده دارای Google login، debug و release با keystoreهای متفاوت مستقل تست شوند؛ Google طبق تصمیم مالک از نسخه فعلی خارج است.
- اگر سناریویی واقعاً قابل آزمایش نبوده، «Pass» نوشته نشود.

## Blocker register
هر blocker حداقل این داده‌ها را داشته باشد:
```
ID | Owner | First observed | Reproduction steps | Risk/severity
Scope: Android overlay / existing backend / cloud config / Google Play
Why no-source-change constraint blocks this
Workaround/options | Required decision | Status | Evidence | Resolution
```
نمونه‌های شناخته‌شده (هنوز تأیید نشده):
- GitHub عمومی در برابر GitLab خصوصی و توزیع دارایی compiled.
- Google ID token audience یا endpoint موجود ممکن است با Android client همخوان نباشد.
- API/CORS یا uploads در Capacitor ممکن است به پیکربندی خارجی احتیاج داشته باشند.
- جریان OTP تلگرام ممکن است خروج/بازگشت امن از اپ را نیاز داشته باشد.
- Account deletion و UGC report/block ممکن است در Backend کنونی ناقص باشند.
- استفاده از سکه خریداری‌شده خارج اپ در Google Play نیازمند تصمیم سیاستی است.

## Definition of Done کل محصول
`./gradlew test`، Typecheck/Lint، آزمون‌های E2E، smoke واقعی، اسکن secrets و امضا، test Play و چک‌لیست compliance تکمیل؛ سپس امضای artifact، hash و sign-off نهایی ثبت شود.

## AI Test Evidence
هر PR باید ستون‌های `Criterion | Command/device | PASS/FAIL/NOT RUN | Evidence link | Known limitation` داشته باشد. اجرای نشدن تست به‌دلیل نبود Android SDK، emulator، دستگاه، Google Cloud یا Play Console، با برچسب NOT RUN/BLOCKED ثبت می‌شود و با ساختگی‌کردن لاگ/آرتیفکت قابل جایگزینی نیست.

## Foundation execution status — 2026-10-22 (#39–44)

| Gate / owner | Evidence | Required resolution | Status |
|---|---|---|---|
| Audit metadata / project owner | Local read-only review exists; public delivery withheld by approval review | Explicit permission to publish the source revision/internal inventory/derived observations, or approved private destination | BLOCKED #39 |
| Private source distribution / owner | No owner-signed runner/artifact decision or deploy credential supplied | Private decision record + external pinned source lock and read-only token | BLOCKED #40/#42 |
| Native toolchain / build operator | Node 24.19.0, npm 11.9.0, JDK 17; SDK/adb/emulator absent; Gradle distribution download failed Network is unreachable | JDK 21, SDK 36, emulator/physical device and reproducible private build logs | BLOCKED #41/#42 |
| API CORS / deployment owner | Credential-free host probes: categories 200, preflight 204 and unauthenticated profile 401; no CORS allow headers for https://localhost | Explicit CORS origin/method/header config and device retest; no server change performed | BLOCKED #63 / #44 |
| Package identity / owner | Development-only package; release tasks disabled | Approve final Play package before OAuth/signing | OPEN |

Executed against combined original foundation changes: 6 source/scope Python tests, 4 overlay-pipeline Python tests, 7 Node platform/network policy tests: PASS (17 total). npm ci (104 packages), mobile typecheck and cap sync (five native plugins): PASS. Overlay TypeScript check with real public dependencies and synthetic auth/theme stores: PASS; not a private upstream integration build. Real WebView, physical plugins, authenticated API/media/upload and web/Telegram E2E remain NOT RUN. No signed APK/AAB is claimed.

## Auth / payment / UX execution — 2026-10-22 (#45–48)

- #45: native Keystore/GCM vault, serialized session restore/logout/expiry and original OTP/bot overlays implemented. Unit/installer tests PASS; actual pre-existing account, device vault/revocation and full private UI NOT RUN (#41/#63/private runner gates).
- #46: deferred by the owner to the next version. Native implementation remains in PR #70 only; current integration has a disabled/hidden hook and no Google module, dependency or build option. Google is not a blocker for this version. No Jira changes were made.
- #47: read-only wallet, provider/request/route/external-link boundaries and spending-disabled policy implemented. Negative policy tests PASS; physical/manual private-UI traversal NOT RUN. General external links and potentially charging publish operations deliberately remain disabled pending reviewed policy.
- #48: native insets/system bars/keyboard/root confirmation, accessible original Sheet and three synthetic browser snapshots implemented. Browser fixture checks PASS; Android device/IME/gesture/Play acceptance NOT RUN.

Current no-Google integration verification: 21 Node + 12 Python tests PASS, public-overlay typecheck PASS, synthetic fixture build/three-viewports including disabled Google UI PASS, combined 33-payload hashes PASS. This is not a private production build or signed APK claim. Foundation #41 is included in the integration; public source-derived audit metadata remains withheld unless separately approved. See [current-version.md](current-version.md).
