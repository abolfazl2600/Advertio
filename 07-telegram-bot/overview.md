# Telegram Bot Overview

Telegram Bot یکی از Channelهای اصلی تعامل Advertio است و در Source Document برای ثبت Listing، مشاهده Listing، Registration، Verification اولیه، Notification و هدایت User به Web App / Mini App استفاده می‌شود.

## Product Role

### Version 1.0 — Minimum Viable Marketplace
در Roadmap نسخه 1.0 این موارد صراحتاً وجود دارند:
- Telegram Bot برای ثبت Listing
- Telegram Bot برای مشاهده Listing
- Telegram Notifications
- Phone Verification
- Basic User Profile
- Admin approval قبل از انتشار
- Telegram Crawler Integration برای Initial Supply

تمرکز Category در Version 1.0:
- Housing — Rental & Roommate

### Version 1.1 — Wallet & Monetization Base
موارد مرتبط با Bot:
- Wallet + Coin System
- Early Access
- Boost
- Extend
- Listing Analytics پایه
- Manual payment
- محدودیت یک Listing فعال در هر Category

### Version 1.2 — Core Experience & Ranking
- Saved Search + Alerts
- Basic Ranking
- Smart Notifications
- Response Metrics / Last Active
- Listing Lifecycle کامل

### Future
- Email به‌عنوان Channel دیگر برای Alertها
- WhatsApp Integration در Version 2.5
- Multi-language / AI Translation
- AI Recommendation / Search / Matching
- Automation بیشتر در Verification و Moderation

> ⚠️ Source Conflict
>
> Roadmap، Wallet + Coin System را در Version 1.1 قرار می‌دهد.
>
> بخش «MVP vs Future» سیستم سکه را جزو MVP نوشته است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Main Bot Journey

Workflow اصلی ثبت‌شده در Source:

1. User روی Start کلیک می‌کند.
2. سیستم Registration و Phone Verification را بررسی می‌کند.
3. User جدید Registration/Verification را انجام می‌دهد.
4. Main Menu نمایش داده می‌شود.
5. User می‌تواند Listingها را ببیند یا Post Listing را انتخاب کند.
6. Post Listing به Category Selection و Eligibility Check می‌رود.
7. Form مرحله‌ای تکمیل می‌شود.
8. Preview و Confirm.
9. Listing با Status = Pending برای Admin Moderation ارسال می‌شود.
10. پس از تأیید، Listing منتشر و Lifecycle آغاز می‌شود.
11. Listing performance از طریق Telegram notification گزارش می‌شود.
12. Monetization mechanisms مانند Early Access، Boost و Extend طبق Version/Rule مربوط اعمال می‌شوند.

جزئیات در [Flows](./flows.md) و [Listing Creation](./listing-creation.md).

## Telegram Surfaces in Source

- Bot Start / Registration
- Main Menu
- View Listings
- Post Listing
- My Profile
- My Listings
- Telegram notification button برای فعال‌سازی Saved Filter alert
- Daily listing performance notification
- Expiry / Extend notifications
- Admin-to-user notification
- Low-balance / payment-related interaction
- انتشار Listing در Telegram Channel بر اساس Ruleهای Admin
- Direct link به Mini App در Acquisition strategy

## Telegram Channel / Group

Source برای Telegram این نقش‌ها را نیز ذکر می‌کند:
- Channel اصلی Acquisition
- انتشار Listingها در Channel
- Notificationها
- لینک مستقیم به Mini App
- عضویت اجباری User در Channel و Group مربوطه پس از Registration
- Referral link به‌عنوان Acquisition channel

## Channel Publishing Rules

Admin می‌تواند Ruleهایی بر اساس Attribute/Tag تعریف کند تا Listing در Telegram Channel مناسب منتشر شود.

Examples from Source:
- Ontario + Jobs → کانال Telegram مربوط
- Toronto + Event → در Future ترجمه به English و سپس انتشار در Channel مربوط

Translation در Versionهای بعدی اضافه می‌شود.

## Crawler Boundary

Telegram Crawler:
- فقط برای Cold Start / Initial Supply است.
- Core Platform محسوب نمی‌شود.
- به‌صورت Service مستقل داده Structured را از طریق API به Advertio می‌دهد.
- Crawled Listings رایگان هستند و Monetization Advertio روی آن‌ها فعال نیست.
- User برای Contact مستقیماً به Telegram account آگهی‌دهنده Redirect می‌شود.
- Chat داخلی، Review، Escrow و سایر Featureهای اختصاصی Advertio برای Crawled Listings فعال نیست.

اگر صاحب Crawled Listing به Advertio join کند:
- Listingهای جدید او دیگر نباید خودکار Crawl و ثبت شوند.
- Listingهای قبلی می‌توانند به‌عنوان History نمایش داده شوند.

## Related Documents

- [Registration](./registration.md)
- [Main Menu](./main-menu.md)
- [Flows](./flows.md)
- [Listing Creation](./listing-creation.md)
- [Listing Browsing](./listing-browsing.md)
- [Notifications](./notifications.md)
- [Saved Search](./saved-search.md)
- [User Profile](./user-profile.md)
- [Verification](./verification.md)
- [Wallet](./wallet.md)
