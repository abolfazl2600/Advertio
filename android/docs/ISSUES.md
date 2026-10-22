# GitHub Issues — Android Advertio (AI execution)

> محدوده نسخه فعلی: ورود Google در #46 به نسخه بعد منتقل شده است؛ توسعه و پذیرش فعلی فقط با OTP/PhoneGate انجام می‌شود. الزام‌های Google در این سند برای نسخه‌ای است که آن را فعال می‌کند. [تصمیم مالک و وضعیت اجرا](current-version.md).

ایشیو مادر: [#38 — برنامه اصلی](https://github.com/abolfazl2600/Advertio/issues/38)

**ترتیب اجرا:** ابتدا 01، سپس 02 و الی آخر؛ وابستگی دقیق و Definition of Done در هر Issue نوشته شده است. بستن تسک بدون PR محدود به پوشه Android، تست و evidence مجاز نیست.

| ترتیب | GitHub Issue | فاز | هدف |
|---:|---|---|---|
| 01 | [#39](https://github.com/abolfazl2600/Advertio/issues/39) | 0: governance | ممیزی Monorepo و تثبیت دامنه MVP اندروید |
| 02 | [#40](https://github.com/abolfazl2600/Advertio/issues/40) | 0: governance | امن‌سازی معماری دریافت سورس خصوصی GitLab در مخزن عمومی GitHub |
| 03 | [#41](https://github.com/abolfazl2600/Advertio/issues/41) | 1: foundation | ایجاد پروژه مستقل Capacitor Android و قفل نسخه Toolchain |
| 04 | [#42](https://github.com/abolfazl2600/Advertio/issues/42) | 1: foundation | پیاده‌سازی Build تکرارپذیر از SHA GitLab و Android-only Overlay |
| 05 | [#43](https://github.com/abolfazl2600/Advertio/issues/43) | 1: foundation | Android Platform Adapter و سازگاری مستقل از Telegram Mini App |
| 06 | [#44](https://github.com/abolfazl2600/Advertio/issues/44) | 2: backend | ارتباط امن API/Media و رفع محدودیت CORS در Capacitor |
| 07 | [#45](https://github.com/abolfazl2600/Advertio/issues/45) | 2: auth | حفظ نشست و ورود فعلی Advertio، PhoneGate و OTP تلگرام |
| 08 | [#46](https://github.com/abolfazl2600/Advertio/issues/46) | 2: auth | Native Google Sign-In با Credential Manager و اتصال به حساب موجود |
| 09 | [#47](https://github.com/abolfazl2600/Advertio/issues/47) | 2: wallet | حذف کامل خرید و شارژ سکه و نمایش پیام به‌زودی در Android |
| 10 | [#48](https://github.com/abolfazl2600/Advertio/issues/48) | 3: UX | ناوبری بومی Android، Safe Areas، RTL و مدیریت Keyboard |
| 11 | [#49](https://github.com/abolfazl2600/Advertio/issues/49) | 3: UX | Deep Links، Android App Links و بازگشت امن از بات Telegram |
| 12 | [#50](https://github.com/abolfazl2600/Advertio/issues/50) | 3: UX | آپلود تصویر/مدرک با Android Photo Picker، Camera و Multipart |
| 13 | [#51](https://github.com/abolfazl2600/Advertio/issues/51) | 3: functional | تست و تکمیل مسیر Housing: جستجو تا ثبت آگهی و Saved |
| 14 | [#52](https://github.com/abolfazl2600/Advertio/issues/52) | 3: functional | تست و تکمیل مسیر Passenger Cargo و Jobs و My Listings |
| 15 | [#53](https://github.com/abolfazl2600/Advertio/issues/53) | 4: hardening | Security Hardening: Token Vault، TLS، Secret Scan و حداقل Permission |
| 16 | [#54](https://github.com/abolfazl2600/Advertio/issues/54) | 4: polish | هویت بصری اپ، Launcher Icon، Splash Screen و دسترس‌پذیری |
| 17 | [#55](https://github.com/abolfazl2600/Advertio/issues/55) | 4: quality | QA نهایی: E2E، دستگاه‌های واقعی، Android 16 و Regression |
| 18 | [#56](https://github.com/abolfazl2600/Advertio/issues/56) | 5: compliance | Google Play Compliance: UGC، Data Safety، Privacy، Account Deletion و Coins |
| 19 | [#57](https://github.com/abolfazl2600/Advertio/issues/57) | 5: release | مدیریت Keystore و تولید Release APK/AAB امضاشده و قابل تأیید |
| 20 | [#58](https://github.com/abolfazl2600/Advertio/issues/58) | 5: release | CI/CD امن Android: Lint، Test، Signed Release و کنترل خروجی |
| 21 | [#59](https://github.com/abolfazl2600/Advertio/issues/59) | 5: release | آماده‌سازی Play Console، Internal Testing و مستندات Store |
| 22 | [#60](https://github.com/abolfazl2600/Advertio/issues/60) | 6: delivery | Release Candidate نهایی؛ تحویل Signed AAB/APK، Checklist و تأیید انتشار |

## نتیجه نهایی
با بسته‌شدن *همه* مسائل بحرانی و Issues 01–22 باید AAB امضاشده و قابل بارگذاری در Play Console و APK release امضاشده قابل نصب به همراه release-manifest، hash، QA report، privacy/UGC/payment compliance، و اسناد recovery نگهداری key تحویل شوند. **آماده بارگذاری بودن با تأیید یا انتشار عمومی توسط Google Play یکسان نیست**.

## محدودیت‌های ثابت
- فقط `android/` در GitHub؛ هیچ تغییر در Monorepo خصوصی GitLab.
- GitHub این پروژه عمومی است؛ secrets/private source/private build artifacts نباید منتشر شوند.
- Google Native Auth: [Jira AD-49](https://advertio24.atlassian.net/browse/AD-49) و [GitHub #46](https://github.com/abolfazl2600/Advertio/issues/46).
- پرداخت حذف/«خرید سکه به‌زودی فعال می‌شود»: [#47](https://github.com/abolfazl2600/Advertio/issues/47).
- امضای Release: [#57](https://github.com/abolfazl2600/Advertio/issues/57) تا [#60](https://github.com/abolfazl2600/Advertio/issues/60).

## دستور اجرای این Backlog توسط AI Agent
- ابتدا [قوانین AGENTS](../AGENTS.md) و [AI execution playbook](AI-EXECUTION.md) خوانده شوند.
- هر Issue در شاخه جداگانه با تغییر **فقط در مسیر `android/`**، تست و PR انجام شود؛ در صورت مسدودی **BLOCKED** و پیش‌نیاز مشخص ثبت شود.
- خروجی نهایی فقط با تایید واقعی امضای AAB/APK و تست روی دستگاه/Play قابل پذیرش است. هیچ تستی را بدون اجرا PASS اعلام نکنید.
