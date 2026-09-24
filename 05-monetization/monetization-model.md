# Monetization Model

این سند مدل درآمدی Advertio را بر اساس Source Document اصلی Consolidate می‌کند. تصمیم‌های جدید Product/Business که بعداً تأیید شده‌اند، در بخش‌های جداگانه با برچسب **Product Decision** ثبت می‌شوند تا با Source اصلی مخلوط نشوند.

## Monetization Philosophy

مدل درآمدی بر سه اصل تعریف شده است:

1. **Low Friction Entry**
   - کاربر بدون پرداخت وارد پلتفرم می‌شود و ابتدا ارزش محصول را تجربه می‌کند.
   - Source به تعدادی اعتبار/سکه اولیه اشاره می‌کند، اما مقدار ثابت آن را در این بخش تعیین نمی‌کند.

2. **Revenue from Real Interaction — Early Access**
   - پرداخت زمانی انجام می‌شود که کاربر قصد ارتباط واقعی با آگهی‌دهنده دارد.
   - جزئیات و Conflictهای زمانی Early Access در [Early Access](./early-access.md) نگهداری می‌شود.

3. **Power Users**
   - کاربران فعال و حرفه‌ای، از طریق مصرف بیشتر سرویس‌های پولی، سهم درآمدی بیشتری ایجاد می‌کنند.

## Roadmap

### Version 1.0 — Minimum Viable Marketplace
Roadmap نسخه 1.0 روی Marketplace پایه تمرکز دارد و Wallet/Monetization را در فهرست Featureهای آن قرار نمی‌دهد.

### Version 1.1 — Wallet & Monetization Base
- Wallet + Coin System
- Boost
- Extend
- Early Access
- Listing Analytics پایه
- پرداخت دستی ریالی / USDT
- محدودیت یک Listing فعال در هر Category

هدف صریح این نسخه: **فعال‌سازی جریان درآمدی**.

### Future Versions
- Version 3.0:
  - Premium Accounts
  - Escrow
  - Business Analytics + Enterprise Dashboard
  - Business Verification
  - Landing Pages برای کسب‌وکارها
- پیشنهادهای آینده:
  - Dynamic Pricing
  - Premium Account برای دریافت گروهی Coinها
  - Promote کردن Listing با Google Ads یا Telegram Ads
  - گسترش Monetization به Categoryهای بیشتر

> ⚠️ Source Conflict
>
> در Roadmap، Wallet + Coin System و Monetization Base برای Version 1.1 تعریف شده و Version 1.0 بدون آن‌ها است.
>
> در بخش دیگری با عنوان «MVP vs Future»، **سیستم سکه** صراحتاً جزو MVP نوشته شده است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Core Revenue Mechanisms

### Early Access
- مشاهده Contact info در سناریوی پولی با Coin انجام می‌شود.
- قیمت قابل تنظیم توسط Admin است.
- Social / Event / Meetup طبق Source برای مشاهده Contact به Coin نیاز ندارند.
- willingness-to-pay برای مشاهده Contact هنوز با نتایج MVP اولیه اثبات نشده است.
- See [Early Access](./early-access.md).

### Boost
- Listing را دوباره به صدر نتایج می‌برد.
- می‌تواند باعث انتشار مجدد در Social communication channels شود.
- نمونه هزینه Source: 3 Coin، با قابلیت تنظیم توسط Admin.
- See [Boost](./boost.md).

### Extend / Renew
- Listing منقضی‌شده با پرداخت Coin برای دوره 30 روزه دوباره فعال می‌شود.
- قیمت بر اساس Category و دفعات تمدید متفاوت است.
- See [Extend / Renew](./extend-renew.md).

### Urgent
- Badge پولی برای متمایز کردن Listing در نتایج.
- Fee مستقل برای هر Category و قابل تنظیم توسط Admin.
- See [Urgent](./urgent.md).

### Repeat Listing in Same Category
Source می‌گوید:
- فقط یک Listing فعال در هر Category مجاز است.
- دو Listing رایگان هم‌زمان در یک Category ممکن نیست.
- برای ثبت مجدد/اضافی، پرداخت Fee مطرح شده است.
- در Coin Economy، عدد 5 Coin برای ثبت مجدد در همان Category بعد از یک ماه ذکر شده است.

جزئیات Flow اجرایی این Rule در Source کاملاً یکپارچه نشده است؛ قیمت‌ها نیز مشمول Pricing Policy داینامیک هستند.

### Targeted Messaging / Promotion
مصارف Coin شامل:
- ارسال پیام از طریق Bot به کاربران هدف بر اساس منطقه
- تبلیغ هدفمند برای Category / City / Country با هزینه توافقی با Admin
- Promote کردن Listing در Google Ads یا Telegram Ads در نسخه‌های آینده

### Business Landing Page — Future
Status: Proposed

Source این سرویس را محصولی مستقل از Core Platform می‌داند.

مدل درآمدی ذکرشده:
- اشتراک ماهانه
- Planهای مختلف بر اساس امکانات
- Premium services مانند Custom Domain، طراحی سفارشی و Analytics در آینده

Source قیمت یا ساختار دقیق Planها را تعیین نمی‌کند.

### Premium Accounts — Future
Status: Proposed

Premium Accounts در Version 3.0 آمده‌اند. جزئیات در [Premium](./premium.md).

### Escrow — Future
Escrow در Version 3.0 ذکر شده و Pricing Policy می‌گوید هزینه آن باید داینامیک و Admin-configurable باشد. Source جزئیات درآمدی یا Fee مشخصی برای Escrow ارائه نمی‌کند.


## Approved Product Decisions — New Revenue Mechanisms

> The following items are approved Product/Business decisions recorded on 24 Sep 2026. They are not claims extracted from the original Source Document.

### Paid Identity Verification
Status: Product Decision / Planned

Advertio will offer a paid **Identity Verification** service.

- User pays the verification fee with Advertio Coins.
- User continues to the Advertio Telegram bot.
- User submits a supported identity document, randomized-challenge video, and optional text in Telegram.
- Telegram remains the media host in v1; Advertio stores operational Telegram references/metadata rather than duplicate raw media.
- Authorized admins can review/approve/reject from Telegram or Backoffice.
- Only an approved request grants the explicit **Identity Verified** badge.
- Initial price: **USD $8 equivalent**.
- Payment is made with Advertio Coins in the first version.
- At the current documented reference of 10 Coin = $1, the initial reference amount is **80 Coin**.
- Payment alone does not grant the badge.
- See [Paid Identity Verification](./identity-verification.md).
- Implementation: GitHub issue #28.

This adds a direct Trust-Layer revenue stream: users pay for a stronger, manually reviewed identity signal.

### Independent Listing Inspection
Status: Product Decision / Planned Backoffice MVP

Advertio will offer a paid **Independent Listing Inspection** service.

This replaces the narrower working idea `Property checker` because the service must work across categories such as Housing, Vehicles, Electronics, Cargo-related listings, business/service locations, and future categories.

- A requester can ask Advertio to coordinate an independent in-person inspection of the subject of a Listing.
- An inspector/operator may capture photos, video, visible-condition notes, basic tests/checks, issues found, checks performed/not performed, and inspection date.
- A structured inspection report is prepared for the request.
- Pricing is **not fixed globally** and may vary by Category, Location, travel distance, complexity, expertise, requested scope, and operational cost.
- The first version is **Backoffice-only** so operations can manually manage intake, quote, payment, assignment, scheduling, evidence, and report delivery.
- See [Independent Listing Inspection](./independent-listing-inspection.md).
- Implementation: GitHub issue #29.

This adds a paid operational Trust service that can reduce the requester's need to travel for an initial inspection and creates a category-agnostic monetization path.

## Revenue Loops

### Loop 1 — Listing → Message → Payment
کاربر Listing را می‌بیند → درخواست Contact info می‌دهد → در مثال Source، 1 Coin پرداخت می‌کند.

### Loop 2 — Low Response → Boost
Response کم → User از Boost استفاده می‌کند → Listing دوباره دیده می‌شود.

### Loop 3 — Expire → Extend
Listing منقضی می‌شود → User هنوز نیاز دارد → Extend/Renew انجام می‌دهد.

### Loop 4 — Deal → Review → Coin
Deal انجام می‌شود → User Review ثبت می‌کند → 1 Coin Reward می‌گیرد → Coin دوباره در Platform مصرف می‌شود.

## Exclusion: Crawled Listings

Crawled Listings برای Cold Start هستند و:
- رایگان منتشر می‌شوند.
- مشمول Monetization Advertio نیستند.
- User مستقیماً به Telegram account آگهی‌دهنده Redirect می‌شود.
- Chat داخلی، Review، Escrow و سایر Featureهای اختصاصی Advertio روی آن‌ها فعال نیست.

## Validated vs Hypothesis

### Status: Validated — Historical MVP payment behavior
MVP اولیه چهارماهه برای Rental Housing Canada:
- 272 عضو Telegram Channel
- 38 درخواست مستقیم ثبت Listing به Admin
- 2 کاربر پرداخت‌کننده
- $2 برای هر Listing
- $4 مجموع درآمد اولیه
- مدل پرداخت: انتشار Listing در Website + Telegram Bot + Telegram Channel
- نرخ تعامل گزارش‌شده: 38 / 272 = 13.9%
- نرخ تبدیل پرداخت گزارش‌شده: 2 / 38 = 5.2%

این داده فقط نشان می‌دهد در آن MVP، دو User برای **ثبت و انتشار Listing** پرداخت کرده‌اند.

### Status: Hypothesis / Not Yet Validated
Source صراحتاً می‌گوید willingness-to-pay برای **مشاهده Contact info / Early Access** هنوز اثبات نشده است.

## Related Documents

- [Pricing](./pricing.md)
- [Coin Economy](./coin-economy.md)
- [Wallet](./wallet.md)
- [Unit Economics](./unit-economics.md)
- [Paid Identity Verification](./identity-verification.md)
- [Independent Listing Inspection](./independent-listing-inspection.md)
