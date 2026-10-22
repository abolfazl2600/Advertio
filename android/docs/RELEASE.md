# Build، امضا و انتشار Android

> محدوده نسخه فعلی: ورود Google در #46 به نسخه بعد منتقل شده است؛ توسعه و پذیرش فعلی فقط با OTP/PhoneGate انجام می‌شود. الزام‌های Google در این سند برای نسخه‌ای است که آن را فعال می‌کند. [تصمیم مالک و وضعیت اجرا](current-version.md).

## تعاریف
- **Debug APK:** نصب در محیط توسعه؛ **برای انتشار نهایی نیست**.
- **Release APK:** فایل نصب امضاشده جهت توزیع جانبی/QA؛ امضا و به‌روزرسانی آن باید بر مبنای سیاست کانال توزیع مدیریت شود.
- **Release AAB:** بسته Android App Bundle امضاشده با **upload key** برای ورود به Google Play؛ Google Play با **app signing key** نهایی APKهای کاربران را امضا می‌کند.
- **Play-ready ≠ Published:** AAB قابل بارگذاری، جایگزین تأیید حساب توسعه‌دهنده و review گوگل نیست.

## prerequisites
- نسخه‌های قفل‌شده Node، Capacitor، Gradle، JDK و Android SDK؛ `targetSdkVersion >= 36` در تاریخ این برنامه.
- package name غیرقابل تغییر پس از انتشار انتخاب و مالکیت تأییدشده.
- حساب Play Console، Google OAuth، محرمانگی سورس upstream و محیط CI امن.
- رمزها/Keystore در secret manager یا محل آفلاین امن؛ **هرگز در Git، artifact عمومی یا متن Issues** قرار نگیرند.

## امضای release
1. تولید keystore upload key خصوصی با الگوریتم معتبر، alias و تاریخ اعتبار کافی؛ نسخه پشتیبان آفلاین رمزگذاری‌شده، افراد مجاز و فرآیند بازیابی ثبت شود.
2. ثبت SHA-1 و SHA-256 برای debug/upload و پس از فعال‌سازی Play App Signing برای *app signing key*؛ OAuth Google را برای امضاهای موردنیاز تنظیم کنید.
3. امضا از طریق Gradle release signing config با مقادیر تزریق‌شده در runtime؛ بدون hardcode.
4. تولید release AAB و APK، تأیید امضای APK با `apksigner verify --verbose --print-certs`، تأیید AAB با ابزار سازگار (مثل jarsigner) و نصب APK بر دستگاه؛ checksum `sha256sum` ثبت شود.
5. ثبت versionName/versionCode، GitHub revision، SHA دقیق upstream GitLab، نسخه ابزار، چک‌لیست QA و fingerprintهای عمومی امضا در release manifest.
6. آپلود AAB در **Internal Testing** و نصب نسخه Play-delivered؛ اطمینان از Google login با Play app signing certificate. سپس Closed Testing در صورت الزام حساب.
7. پس از تست، ایجاد انتشار Production **فقط با تأیید صریح مالک پروژه**.

## حفاظت از خروجی
این GitHub repository **public** است: از انتشار باندل حاوی کد اختصاصی یا اطلاعات حساس در public GitHub Releases/Actions Artifacts بدون بررسی مجوز و سیاست دسترسی جلوگیری شود. Artifactهای امضاشده ابتدا باید به مقصد کنترل‌شده منتقل شوند.

## معیار تحویل نهایی
- یک `.aab` امضاشده با upload key معتبر، قابل تأیید و بارگذاری.
- یک `.apk` release امضاشده، تست نصب و upgrade.
- خروجی گزارش آزمون + لینک run خصوصی/مجاز + checksum + version manifest.
- مستند backup key، release/rollback، قوانین store و هر blocker رفع‌شده.
- انتشار در Google Play مستلزم اقدام‌های حساب توسعه‌دهنده و تایید Google Play است و تضمین خودکار ندارد.

منابع:
- https://developer.android.com/studio/publish/app-signing
- https://support.google.com/googleplay/android-developer/answer/11926878

## یادداشت برای توسعه‌دهنده AI
عامل نباید فایل APK/AAB، صحت امضا، اجرای Gradle یا پذیرش Play را بدون artifact واقعی و خروجی قابل بازتولید ادعا کند. موارد وابسته به مالک (keystore/Cloud/Play Console) باید BLOCKED با دستور و سطح دسترسی لازم گزارش شوند. کلید خصوصی را در issue/PR/code paste نکند. همه اسکریپت‌ها زیر `android/scripts/` و تنظیمات Gradle زیر `android/mobile/` نگه‌داری شوند.
