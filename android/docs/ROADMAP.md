# Roadmap اندروید: ترتیب اجرا و وابستگی‌ها

**هدف نهایی: Signed APK + Play-ready signed AAB.** ترتیب ایشیوها با شماره `[Android NN]` مشخص است؛ لینک همه ایشیوها در [ISSUES.md](ISSUES.md) ثبت شده است.

| فاز | شناسه / لینک Issue | خروجی |
|---|---|---|
| 0: governance | [01 / #39](https://github.com/abolfazl2600/Advertio/issues/39) | تحلیل سورس، ریسک عمومی/خصوصی و محدوده نسخه اول |
| 0: governance | [02 / #40](https://github.com/abolfazl2600/Advertio/issues/40) | پروتکل snapshot read-only و مرزبندی upstream |
| 1: foundation | [03 / #41](https://github.com/abolfazl2600/Advertio/issues/41) | پروژه Capacitor/Android مستقل + target API 36 |
| 1: foundation | [04 / #42](https://github.com/abolfazl2600/Advertio/issues/42) | build reproducible، pinned source و overlay automation |
| 1: foundation | [05 / #43](https://github.com/abolfazl2600/Advertio/issues/43) | platform adapter native/Telegram/browser |
| 2: backend | [06 / #44](https://github.com/abolfazl2600/Advertio/issues/44) | اتصال API/HTTPS/CORS و رسانه‌ها |
| 2: auth | [07 / #45](https://github.com/abolfazl2600/Advertio/issues/45) | session، PhoneGate و OTP فعلی |
| 2: auth | [08 / #46](https://github.com/abolfazl2600/Advertio/issues/46) | Google native sign-in (Jira AD-49) |
| 2: wallet | [09 / #47](https://github.com/abolfazl2600/Advertio/issues/47) | حذف تمامی پرداخت‌ها + UI «بزودی» |
| 3: UX | [10 / #48](https://github.com/abolfazl2600/Advertio/issues/48) | ناوبری، Back، status bar، RTL و keyboard |
| 3: UX | [11 / #49](https://github.com/abolfazl2600/Advertio/issues/49) | App Links، deep links و انتقال به Telegram |
| 3: UX | [12 / #50](https://github.com/abolfazl2600/Advertio/issues/50) | camera/picker و بارگذاری تصاویر/فایل |
| 3: functional | [13 / #51](https://github.com/abolfazl2600/Advertio/issues/51) | Housing و Saved Searches |
| 3: functional | [14 / #52](https://github.com/abolfazl2600/Advertio/issues/52) | Passenger Cargo، Jobs و آگهی‌های من |
| 4: hardening | [15 / #53](https://github.com/abolfazl2600/Advertio/issues/53) | امنیت session/network و permissions |
| 4: polish | [16 / #54](https://github.com/abolfazl2600/Advertio/issues/54) | برند، آیکون، splash و accessibility |
| 4: quality | [17 / #55](https://github.com/abolfazl2600/Advertio/issues/55) | تست خودکار، دستگاه واقعی و regression |
| 5: compliance | [18 / #56](https://github.com/abolfazl2600/Advertio/issues/56) | سیاست‌های Play، UGC، privacy، Data safety، deletion |
| 5: release | [19 / #57](https://github.com/abolfazl2600/Advertio/issues/57) | signing/release key، reproducible signed APK/AAB |
| 5: release | [20 / #58](https://github.com/abolfazl2600/Advertio/issues/58) | CI امن، versioning، artifacts و rollback |
| 5: release | [21 / #59](https://github.com/abolfazl2600/Advertio/issues/59) | Play Console، closed test و مدارک انتشار |
| 6: delivery | [22 / #60](https://github.com/abolfazl2600/Advertio/issues/60) | release candidate، تحویل و sign-off |

## Gateهای الزام‌آور
- **G0:** سیاست محرمانگی، دسترسی upstream و package ID حل شوند (پایان 02).
- **G1:** نصب یک debug APK واقعی و اتصال API/ورود ممکن باشد (پایان 08).
- **G2:** خرید سکه هیچ مسیر UI یا deep-link قابل استفاده‌ای نداشته باشد (پایان 09).
- **G3:** سه بخش اصلی روی دستگاه تست شده باشند (پایان 17).
- **G4:** انطباق Google Play و حذف حساب/UGC بدون blocker حل شود (پایان 18).
- **G5:** signed AAB با upload certificate قابل تایید و signed APK نصب‌پذیر ساخته شده باشد (پایان 22).

## قاعده تحویل
هر ایشیو تنها با PR محدود به `android/`، تست‌های پاس‌شده، سند تغییر، ریسک و مدرک بازتولید بسته شود. هر مشکل upstream به Issue/Blocker مستقل و **نه تغییر مستقیم GitLab** منجر می‌شود.

## نحوه اجرا توسط AI
AI agent باید هر Issue را طبق [AGENTS.md](../AGENTS.md) و [AI Execution](AI-EXECUTION.md) به یک PR با **کد واقعی، تست و Evidence** تبدیل کند. تنها مجاز به تغییر فایل‌های مسیر `android/` است. اگر تغییر سرور/کلید/Play Console لازم است، مسئله را BLOCKED کند و کار انجام‌نشده را Done نشمارد.
