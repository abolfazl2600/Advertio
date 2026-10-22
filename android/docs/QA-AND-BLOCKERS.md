# Test Matrix، خروجی قابل قبول و Blocker Register

## ماتریس پایه QA
| گروه | سناریوها | مدرک مورد انتظار |
|---|---|---|
| نصب/ارتقا | clean install، upgrade بدون حذف داده، downgrade blocking | build IDs و ویدئو/لاگ پاکسازی‌شده |
| ورود | Google جدید/قدیمی، PhoneGate، ورود با کد بات، لغو، بازگشت، logout، JWT expiry | نتیجه و account ID ناشناس‌سازی‌شده |
| فهرست‌ها | Housing/Cargo/Jobs، جستجو، فیلتر، جزئیات، saved، ثبت/ویرایش/حذف | screenshot با داده ساختگی |
| کیف پول | نمایش موجودی، مخفی‌بودن تمام پرداخت‌ها، مسدودبودن خرید از deep link و edge case | تست UI و route negative tests |
| سیستم | Android back، keyboard، status bar، share، file upload، rotate، RTL | emulator + physical device |
| خطا | قطع اینترنت، timeout، TLS invalid، API 401/403/500، resume/background، لینک قدیمی | expected/actual + crash logs sanitised |
| امنیت | secrets scan، token persistence/logout، network, permission audit، app signing verify | audit + reports |
| Play | privacy, UGC, Data safety، account deletion، target API، signed AAB upload | checklist و نتیجه Play Console |

## محیط‌های الزام‌آور
- Android نسخه قدیمی پشتیبانی‌شده طبق minSdk، Android 13/14 و Android 16(API 36)، دستگاه کوچک و بزرگ، شبکه کند و سریع.
- روی دستگاه فیزیکی واقعی حداقل یک دور کامل happy path اجرا شود؛ روی Play Internal Test نسخه امضاشده توسط Play تست شود.
- debug و release، با keystoreهای متفاوت، Google sign-in مستقل تست شوند.
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
