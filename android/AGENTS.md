# AGENTS.md — دستورالعمل الزام‌آور عامل توسعه Android Advertio

**Scope:** `android/` در مخزن عمومی `abolfazl2600/Advertio`. این سند برای GitHub Copilot/Codex و سایر عامل‌های برنامه‌نویس است. تمام وظایف Android Issues #39–#60 تابع این قواعد‌اند.

## ماموریت
پیاده‌سازی و تحویل **اپ Android واقعی مبتنی بر Capacitor**؛ خروجی نهایی signed release AAB (با upload key برای Google Play) و signed release APK، نه PWA، لینک وب یا WebView wrapper صرف. از UI React/Vite موجود و API مشترک Advertio استفاده کن و وظایف Issueها را **به ترتیب وابستگی** اجرا کن.

## مرز تغییر — قانون قطعی
- فقط فایل‌هایی با مسیر Git **`android/`** را ایجاد/ویرایش/حذف کن. تغییر فایل‌های ریشه، `.github/workflows`، `apps/web` یا پوشه‌های `01-business` تا `15-communication-assets` ممنوع است.
- مخزن اصلی GitLab `advertio/platform/advertio-monorepo` (private) **فقط read-only** است: هیچ commit، MR، push، tag، migration یا تغییر سرور بدون Issue/تأیید جداگانه.
- اگر برای GitHub Actions نیاز به `.github/workflows/` در root است، **آن را خودسرانه ایجاد نکن**. یک script runner قابل اجرای دستی/خارجی زیر `android/scripts/` بساز و محدودیت را در Issue #58 ثبت کن.
- در Build، نسخه مشخصی از GitLab را در workspace **موقت خارج از Git tree** دریافت و overlay/patch‌های نسخه‌بندی‌شده در همین پوشه را اعمال کن. کد خصوصی، assets ساخته‌شده از آن و dependency dump را وارد مخزن عمومی نکن.
- اسکریپت‌های path-sensitive باید با مسیر Unicode `اندروید` و یک working directory موقت ASCII قابل اجرا باشند.

## Workflow هر Issue
1. Issue هدف را کامل بخوان؛ [docs/ISSUES.md](docs/ISSUES.md)، [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)، [docs/AI-EXECUTION.md](docs/AI-EXECUTION.md) و وابستگی‌های آن را مرور کن.
2. برای Issue `#NN` روی شاخه‌ای مثل `android/NN-short-slug` کار کن. قبل از تغییر، وضعیت git و مسیرهای مجاز را بررسی کن.
3. **پیاده‌سازی واقعی و حداقلی** انجام بده؛ طراحی یا شرح مجدد Issue به‌جای کد کافی نیست. بخش‌های نامشخص غیرامن/دارای نیاز به credential را با فرض ساختگی رد نکن؛ به BLOCKED تبدیل کن.
4. فقط فایل‌های لازم در `android/` را تغییر بده؛ commit و PR با `Closes #NN` صرفاً وقتی Done واقعی است. اگر بخشی از acceptance قابل انجام نیست `Refs #NN` و توضیح Blocker استفاده شود.
5. lint / typecheck / unit tests / build / device tests مرتبط را اجرا کن؛ **موارد اجرا نشده را NOT RUN بنویس**، هیچ build یا screen واقعی را جعل نکن.
6. `scripts/guard-scope.sh` را با commit base مناسب اجرا کن. اگر تغییر خارج scope وجود دارد PR مردود است.
7. در PR: خلاصه تغییر، مسیر فایل‌ها، دستورهای واقعی اجرا، نتایج، commit و GitLab SHA، تست‌های واقعی و اجرا‌نشده، ریسک، rollback، امنیت secrets و status acceptance را ثبت کن.
8. تسک بعدی را فقط وقتی شروع کن که پیش‌نیازهای بحرانی حل شده باشند. عامل می‌تواند کار مستقل بدون secret را ادامه دهد، اما *انتشار و امضای واقعی* بدون دسترسی مجاز ممنوع است.

## قواعد محصول
- **محدوده نسخه فعلی، تصمیم مالک 2026-10-22:** ورود Google (#46 / PR #70) به نسخه بعد منتقل شده است؛ [current-version.md](docs/current-version.md) ملاک نسخه فعلی است. hook گوگل در Android غیرفعال و پنهان بماند؛ توسعه و پذیرش نسخه فعلی به OAuth گوگل وابسته نیست.
- Login: **همان کاربران و حساب‌ها**، PhoneGate و OTP مبتنی بر بات Telegram بدون تغییر Backend. Google روی Android با **Native Credential Manager / API پشتیبانی‌شده**، ID token به API موجود، بدون OAuth داخل embedded WebView.
- Coins: هیچ خرید، شارژ، Stripe Checkout، Telegram Stars Invoice، deeplink و لینک خارج برنامه برای خرید وجود نداشته باشد. متن: **«خرید سکه به‌زودی فعال می‌شود»**. مصرف اعتبار موجود فقط پس از انطباق سیاست Play.
- امکانات: Housing، Passenger Cargo، Jobs، Profile، Saved و My Listings؛ پشتیبانی از media upload، back/navigation، خطاها.
- endpointها صرفاً HTTPS واقعی. `VITE_API_URL` هرگز localhost در Release نباشد. مجوزها و token storage از اصل least privilege و Android Keystore تبعیت کنند.
- `targetSdk >= 36` برای هدف انتشار اکتبر ۲۰۲۶؛ نسخه‌های SDK و Gradle پس از تست سازگاری pin شوند.

## امنیت/محرمانگی
مخزن GitHub **عمومی** است. Never commit access tokens, `.env`, keystore, signing passwords, user PII, GitLab source, compiled private JS, Google credentials or Play service-account JSON. داده تست ساختگی؛ لاگ پاکسازی شده. کلید واقعی Release باید خارج git و با کنترل دسترسی مالک نگه‌داری شود. اگر policy یا entitlement مانع است، issue را BLOCKED با evidence مشخص کن.

## Gate نهایی
هیچ «Done» برای Release (#57–#60) بدون artifact signed حقیقی، `apksigner`/`jarsigner` verification، دستگاه واقعی، Play test، ورود OTP/PhoneGate، QA و Privacy/UGC/Account deletion/payment compliance. Google auth تنها در نسخه‌ای که آن را فعال می‌کند gate است. Play-ready با Approved/Published برابر نیست.

**شروع پیاده‌سازی:** [#39](https://github.com/abolfazl2600/Advertio/issues/39).
