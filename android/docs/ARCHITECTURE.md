# معماری Android و مرزهای تغییر

## وضعیت موجود (بر پایه بررسی GitLab در ۲۰۲۶-۱۰)
- GitLab upstream: `advertio/platform/advertio-monorepo`؛ `apps/web`: React 19 + Vite 8 + TypeScript؛ backend: ASP.NET Core/.NET 10؛ JWT و کیف پول مشترک.
- وب از Telegram Mini App و مرورگر معمولی پشتیبانی می‌کند. `usePlatform` واسط کانال است و `@tma.js/sdk-react` در لایه platform به‌کار می‌رود.
- بخش‌های جاری: Housing، Passenger Cargo و Jobs؛ صفحات Search، Post، Saved، Wallet، Profile/My Listings.
- `apps/web/src/shared/api/client.ts` آدرس API را از `VITE_API_URL` می‌گیرد و default لوکال دارد؛ در Capacitor پیش‌فرض relative `/api` لزوماً به Backend نمی‌رسد.
- Google login در وب از GIS؛ PhoneGate به شماره تأییدشده متکی است؛ روش OTP فعلی از طریق بات Telegram است.
- پرداخت وب Stripe و داخل تلگرام Stars است. این‌ها **نباید** در Android قابل دسترسی باشند.

## معماری هدف
```text
Private GitLab Monorepo (read-only, pinned commit)
                 |
      fetch source in ephemeral build workspace
                 |
     apply versioned Android-only overlays/patches
                 |
      build Vite static assets  <-- Android environment config
                 |
          Capacitor sync
                 |
      Android Gradle project (in this folder)
                 |
       signed APK / signed AAB
                 |
    production HTTPS API / existing database
```
- کلیه فایل‌های ماندگار اختصاصی Android زیر `اندروید/`؛ staging خارجی فقط موقت است.
- **No git push / no commits to upstream GitLab**. هر patch باید برای revision upstream قفل‌شده قابل اعمال باشد؛ drift باعث fail-closed شدن pipeline می‌شود.
- آدرس Backend باید HTTPS مطمئن، گواهی معتبر، تنظیم origin/CORS یا adapter native شبکه و media/upload داشته باشد. به (api.advertio.ir) تا تست موفق Production اعتماد قطعی نکنید.
- ترجیح: bundle assets محلی در APK/AAB، نه نمایش صرف URL وب‌سایت. انتشار Remote WebView shell به جای native bundled app قابل قبول نیست.
- Login Google: Credential Manager -> Google ID Token -> endpoint فعلی احراز هویت -> JWT/same identity. Audience/Client ID و اعتبارسنجی سرور باید واقعا سازگار باشند؛ اگر نیستند **Blocker**.
- token vault مبتنی بر Android Keystore و سازگاری Zustand/Auth store؛ refresh/expiry/logout و پاکسازی کامل داده حساس.
- separate Android platform adapter: lifecycle، status/navigation bars، hardware back، haptics، external URL، keyboard، file picker.
- لینک‌های Telegram و رندر Web/Telegram original باید مستقل و بدون regression باقی بمانند.

## تصمیم‌های اجرایی نیازمند تأیید
1. Package ID نهایی و مالکیت آن در Google Play.
2. نحوه امن دسترسی read-only به GitLab private از GitHub عمومی، license/distribution و سیاست artifacts.
3. OAuth Android client و SHAهای debug/upload/Play signing.
4. وضعیت واقعی API/CORS، OTP و فرآیند حذف حساب.
5. ریسک پرداختِ مصرف اعتبار خریداری‌شده بیرون اپ و سیاست Play در کشورهای توزیع.

## معیار جلوگیری از انتشار
اگر برای تحقق یکی از جریان‌های بحرانی (ورود، API، گزارش سوءاستفاده، حذف حساب، پرداخت/سکه) ناچار به تغییر upstream باشیم، نسخه منتشر نمی‌شود تا راهکار مجاز و تست‌شده تصمیم‌گیری شود.
