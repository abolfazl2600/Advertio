# Advertio Vision

## Vision

Advertio یک **Smart Marketplace مبتنی بر Trust** است که کاربران را برای پیدا کردن نیازمندی‌های واقعی مانند **Housing، Jobs، Services و Social connections** به یکدیگر متصل می‌کند. مدل محصول بر ترکیب داده‌های ساختاریافته، احراز هویت چندلایه، هوش مصنوعی و تجربه‌ای امن‌تر و سریع‌تر از پلتفرم‌های سنتی استوار است.

هدف محصول این نیست که صرفاً یک Search Engine برای Telegram باشد. Crawler و جمع‌آوری آگهی از منابع عمومی فقط برای شروع و حل Cold Start در نظر گرفته شده‌اند و باید به‌تدریج سهم آگهی‌های واقعی کاربران از آگهی‌های Crawl شده بیشتر شود.

## Product Foundations

### Structure

پایه ساختاری Advertio شامل موارد زیر است:

- ثبت آگهی و گزارش‌دهی عملکرد آن به آگهی‌دهنده.
- پروفایل کاربر و تاریخچه فعالیت.
- Notificationهای خودکار.
- Wallet و Coin برای پرداخت سرویس‌ها.
- احراز هویت چندمرحله‌ای.
- Admin Panel برای کنترل پلتفرم و تأیید آگهی‌ها.

### Trust

Advertio قصد دارد یک Trust Layer چندلایه ایجاد کند که شامل این اجزا است:

- احراز هویت چندمرحله‌ای؛ از Phone Verification تا Video، تطبیق هویتی، بانکی و سایر لایه‌ها در نسخه‌های مختلف.
- نمایش سابقه فعالیت و معاملات کاربر.
- Rating، Review و Badgeها در نسخه‌های مربوطه.
- Fraud Detection و فرآیندهای Moderation که در ابتدا بخشی از آن‌ها دستی هستند و بعداً قرار است تخصصی/خودکار شوند.

## Category Scope in Source Document

یک بخش Source Document این Categoryهای سطح بالا را فهرست می‌کند:

- Passenger Cargo.
- Housing & Roommate.
- Social & Events.
- Jobs.
- Services.
- Human Match.

تمرکز Current / Entry Market روی Housing است و Jobs اولویت دوم است. Passenger Cargo، Social، Services و Human Matching در بخش‌های توسعه‌ای/نسخه‌های بعدی نیز مطرح شده‌اند. Peer Exchange صریحاً به‌عنوان Categoryای که «در این ورژن وجود ندارد و شاید بعداً اضافه شود» آمده است.

یک بخش دیگر Taxonomy متفاوت/جزئی‌تری برای HOUSING، SERVICES، TRAVEL_TRANSPORT و SOCIAL می‌دهد و Jobs را در همان لیست نهایی تکرار نمی‌کند؛ این مورد بدون حل‌کردن در Conflict Register حفظ شده است.

See [Source Conflicts](./assumptions.md#source-conflicts).

## Current / Initial Product Direction

### Version 1.0 — Minimum Viable Marketplace

تمرکز تعریف‌شده برای Version 1.0:

- Housing (Rental & Roommate).
- Telegram Bot برای ثبت و مشاهده آگهی.
- Web Application ساده برای Listing و Listing Details.
- Phone Verification.
- Basic User Profile.
- Admin Panel با تأیید دستی آگهی.
- Telegram Notifications.
- Telegram Crawler Integration برای عرضه اولیه.
- Listing Lifecycle پایه: ثبت → Pending → Approved → Expired.

### Version 1.0 Goal

راه‌اندازی سریع اولین بازار و تست مدل.

### Success Criteria تعریف‌شده برای Version 1.0

- حداقل ۵۰ آگهی واقعی منتشرشده.
- حداقل ۲۰۰ کاربر ثبت‌نام‌شده.

> این‌ها معیارهای هدف‌گذاری‌شده Source Document هستند و نباید با نتایج MVP چهارماهه به‌عنوان یک مجموعه KPI یکسان فرض شوند. برای نتایج واقعی MVP به [Assumptions & Validation](./assumptions.md) مراجعه شود.

## Planned Product Evolution

### Version 1.1 — Wallet & Monetization Base

تمرکز برنامه‌ریزی‌شده:

- Wallet + Coin System کامل.
- Boost و Extend.
- Early Access برای مشاهده اطلاعات تماس با Coin.
- Listing Analytics پایه: بازدید و Contact Request.
- پرداخت دستی: واریز ریالی / USDT.
- محدودیت یک Listing فعال در هر Category.

هدف: فعال‌سازی جریان درآمدی.

### Version 1.2 — Core Experience & Ranking

تمرکز برنامه‌ریزی‌شده:

- Saved Search + Alerts.
- Basic Ranking با Boost + جدیدترین + Verified.
- Smart Notifications.
- Response Metrics مانند Last Active.
- Listing Lifecycle کامل‌تر و گزارش روزانه.

هدف: بهبود تجربه کاربر و افزایش تعامل.

### Version 1.5 — Trust Foundation

تمرکز برنامه‌ریزی‌شده:

- Video Verification به‌صورت دستی.
- Review + Rating + Badges.
- Manual Verification Workflow.
- Fraud Detection پایه.
- Referral System.

هدف: ساخت لایه اعتماد اولیه و کاهش ریسک کلاهبرداری.

### Version 2.0 — Smart & AI Features

تمرکز برنامه‌ریزی‌شده:

- AI Recommendation Assistant.
- AI Search + Smart Matching.
- AI Question Generator.
- Price Suggestion.
- Compatibility Score.

هدف: تجربه هوشمند و افزایش نرخ تبدیل.

### Version 2.5 — International Expansion

تمرکز برنامه‌ریزی‌شده:

- Multi-language + AI Translation.
- ورود به Germany + Italy.
- WhatsApp Integration.
- Passenger Cargo.
- Human Matching + Social Categories.

هدف: ورود به بازارهای جدید و گسترش Categoryها.

### Version 3.0 — Business Platform

تمرکز برنامه‌ریزی‌شده:

- Landing Pages برای کسب‌وکارها.
- Premium Accounts.
- Business Analytics + Enterprise Dashboard.
- Escrow.
- Partner APIs.
- Business Verification.

هدف: تنوع درآمد از کاربران حرفه‌ای و تجاری.

## Long-term Business Service: Business Landing Page

**Status: Planned / Future**

Advertio در نسخه‌های آینده می‌تواند Landing Page اختصاصی برای Business Users فراهم کند. این سرویس در Source Document به‌عنوان محصولی مستقل از Core Platform تعریف شده و وابستگی فنی مستقیم به Core ندارد؛ در آینده می‌تواند با Core Platform یکپارچه شود.

هدف سرویس: ارائه حضور آنلاین ساده و سریع برای کسب‌وکارهای کوچک و متخصصانی که نیاز به وب‌سایت کامل ندارند؛ از جمله Home Beautician، مربی خصوصی، مشاور، Freelancer، مدرس، Local Service Provider و Small Business.

مدل درآمدی تعریف‌شده:

- Subscription ماهانه.
- Planهای مختلف بر اساس امکانات.
- Premium Services مانند Domain اختصاصی، طراحی سفارشی و Analytics در آینده.

مدل ارائه می‌تواند Partner خارجی، SaaS Landing Page Builder یا Plugin مستقل باشد و Advertio نقش اتصال و Marketplace Integration را داشته باشد.

## Scope Conflict Notice

Release Phasing در Source Document در چند بخش یکسان نیست؛ برای مثال Coin System در یک بخش متعلق به Version 1.1 است، اما در بخش دیگری جزو MVP آمده است. Video Verification، Review و Boost نیز در بخش‌های مختلف در فازهای متفاوت قرار گرفته‌اند. این تناقض عمداً حل نشده است.

See [Source Conflicts](./assumptions.md#source-conflicts).
