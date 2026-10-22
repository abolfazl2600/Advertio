# Roadmap اندروید: ترتیب اجرا و وابستگی‌ها

**هدف نهایی: Signed APK + Play-ready signed AAB.** ترتیب ایشیوها با شماره `[Android NN]` مشخص است؛ شماره واقعی GitHub Issues در انتهای راه‌اندازی ثبت می‌شود.

| فاز | شناسه | خروجی |
|---|---|---|
| 0: governance | 01 | تحلیل سورس، ریسک عمومی/خصوصی و محدوده نسخه اول |
| 0: governance | 02 | پروتکل snapshot read-only و مرزبندی upstream |
| 1: foundation | 03 | پروژه Capacitor/Android مستقل + target API 36 |
| 1: foundation | 04 | build reproducible، pinned source و overlay automation |
| 1: foundation | 05 | platform adapter native/Telegram/browser |
| 2: backend | 06 | اتصال API/HTTPS/CORS و رسانه‌ها |
| 2: auth | 07 | session، PhoneGate و OTP فعلی |
| 2: auth | 08 | Google native sign-in (Jira AD-49) |
| 2: wallet | 09 | حذف تمامی پرداخت‌ها + UI «بزودی» |
| 3: UX | 10 | ناوبری، Back، status bar، RTL و keyboard |
| 3: UX | 11 | App Links، deep links و انتقال به Telegram |
| 3: UX | 12 | camera/picker و بارگذاری تصاویر/فایل |
| 3: functional | 13 | Housing و Saved Searches |
| 3: functional | 14 | Passenger Cargo، Jobs و آگهی‌های من |
| 4: hardening | 15 | امنیت session/network و permissions |
| 4: polish | 16 | برند، آیکون، splash و accessibility |
| 4: quality | 17 | تست خودکار، دستگاه واقعی و regression |
| 5: compliance | 18 | سیاست‌های Play، UGC، privacy، Data safety، deletion |
| 5: release | 19 | signing/release key، reproducible signed APK/AAB |
| 5: release | 20 | CI امن، versioning، artifacts و rollback |
| 5: release | 21 | Play Console، closed test و مدارک انتشار |
| 6: delivery | 22 | release candidate، تحویل و sign-off |

## Gateهای الزام‌آور
- **G0:** سیاست محرمانگی، دسترسی upstream و package ID حل شوند (پایان 02).
- **G1:** نصب یک debug APK واقعی و اتصال API/ورود ممکن باشد (پایان 08).
- **G2:** خرید سکه هیچ مسیر UI یا deep-link قابل استفاده‌ای نداشته باشد (پایان 09).
- **G3:** سه بخش اصلی روی دستگاه تست شده باشند (پایان 17).
- **G4:** انطباق Google Play و حذف حساب/UGC بدون blocker حل شود (پایان 18).
- **G5:** signed AAB با upload certificate قابل تایید و signed APK نصب‌پذیر ساخته شده باشد (پایان 22).

## قاعده تحویل
هر ایشیو تنها با PR محدود به `اندروید اپ/`، تست‌های پاس‌شده، سند تغییر، ریسک و مدرک بازتولید بسته شود. هر مشکل upstream به Issue/Blocker مستقل و **نه تغییر مستقیم GitLab** منجر می‌شود.
