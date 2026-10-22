# Advertio Android — برنامه ساخت نسخه قابل انتشار

> وضعیت: **برنامه‌ریزی و تعریف Backlog**؛ این پوشه هنوز APK/AAB نهایی تولید نمی‌کند.

## هدف
ساخت اپلیکیشن اندروید Advertio با **Capacitor**، استفاده مجدد از Frontend React/Vite و Backend موجود، بدون تغییر هیچ فایلی در مخزن اصلی GitLab `advertio/platform/advertio-monorepo`. پایان پروژه: **AAB امضاشده با upload key برای Google Play + APK امضاشده برای تست/توزیع مناسب، گزارش آزمون و مسیر بازتولید Build**.

## اصول غیرقابل مذاکره
1. **همه کد، patch، تنظیمات، مستندات، تست و pipeline اندروید در همین پوشه** باشد. هیچ منبع اصلی Advertio در GitLab و هیچ پوشه قبلی این مخزن GitHub تغییر نکند.
2. در فرایند Build، نسخه *pin شده* از `apps/web` مخزن خصوصی GitLab با حساب **فقط‌خواندنی** دریافت شود؛ سازگاری dependency و مجوز استفاده تأیید شود. منابع خصوصی، توکن، خروجی build محرمانه و کلید امضا نباید در مخزن عمومی یا لاگ منتشر شوند.
3. Android-specific overlays فقط در staging workspace اعمال شوند؛ `git status` مخزن upstream بعد از Build باید بدون تغییر باقی بماند. فایل‌های patch نسخه‌بندی و قابل تست باشند.
4. حساب‌ها، JWT/session و قوانین احراز هویت فعلی مشترک بمانند؛ Google Sign-In در Android **بومی** (Credential Manager) باشد؛ Google OAuth داخل WebView انجام نشود. الزام شماره موبایل تأییدشده و کد ارسالی توسط بات تلگرام تا زمانی که محصول روش دیگری تعریف نکرده حفظ شود.
5. **تمام راه‌های خرید/شارژ سکه در اپ اندروید مخفی و غیرقابل فراخوانی باشند**؛ محل مربوطه فقط «خرید سکه به‌زودی فعال می‌شود» را نشان دهد. لینک خروجی به خرید Stripe/Telegram نیز نباشد. نمایش موجودی و استفاده از سکه‌های قبلی صرفاً پس از بررسی سیاست‌های Play مجاز است.
6. روی نسخه ۲۰۲۶ Google Play: `targetSdk` حداقل **36**؛ سایر نسخه‌های SDK و ابزارها در مرحله بوت‌استرپ مطابق نسخه قفل‌شده Capacitor/Android Gradle Plugin تعیین شود.
7. هر تغییر در Backend، DNS/CORS، OAuth Cloud Console، Play Console یا سیاست‌های احراز هویت که بدون تغییر سورس اصلی شدنی نیست به عنوان **Blocker** ثبت و برای تصمیم جدا مطرح شود؛ هیچ تغییر پنهانی در سورس اصلی انجام نشود.

## ساختار هدف
```text
اندروید اپ/
├── README.md
├── .gitignore
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── RELEASE.md
│   ├── SECURITY-PLAY.md
│   └── QA-AND-BLOCKERS.md
├── mobile/        # در تسک‌های ساخت: wrapper، پیکربندی Capacitor و پروژه android/
├── scripts/       # همگام‌سازی pinned source، overlay، ساخت و ارزیابی
├── tests/         # smoke/E2E/device matrix
└── assets/        # آیکون، splash و دارایی‌های تأییدشده
```
Git فایل/پوشه خالی را نگه نمی‌دارد؛ mobile، scripts، tests و assets هنگام تکمیل ایشیوهای مربوط ساخته می‌شوند. به خاطر نام فارسی پوشه والد، اسکریپت‌ها باید مسیرها را quote کرده و در صورت ناسازگاری Gradle از staging موقت با نام ASCII استفاده کنند.

## مراحل و تعریف اتمام
به [ROADMAP](docs/ROADMAP.md) و GitHub Issues با پیشوند `[Android NN]` مراجعه کنید. هر ایشیو باید Pull Request فقط داخل این پوشه، تست، مستند به شواهد و DoD مشخص داشته باشد. بستن ایشیو بدون شواهد ممنوع است.

## نکات محرمانگی
**این ریپازیتوری GitHub عمومی است.** از قرار دادن سورس خصوصی GitLab، bundle قابل استخراج، GitLab access token، Google secrets، keystore، پسورد امضا، `google-services.json` حاوی پیکربندی حساس احتمالی، اطلاعات کاربران و فایل‌های انتشار غیرعمومی در Git خودداری کنید؛ پیش از راه‌اندازی CI با سورس خصوصی، معماری مجوز/دسترسی باید تعیین تکلیف شود.

## مرجع
- [Capacitor](https://capacitorjs.com/docs)
- [Android app signing](https://developer.android.com/studio/publish/app-signing)
- [Google Play target SDK](https://support.google.com/googleplay/android-developer/answer/11926878)
- Jira Google Sign-In: [AD-49](https://advertio24.atlassian.net/browse/AD-49)
