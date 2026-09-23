# Business Model

## Monetization Philosophy

مدل درآمدی Advertio در Source Document بر سه اصل بنا شده است:

1. **Low Friction Entry** — User بدون پرداخت وارد می‌شود و ابتدا Value را تجربه می‌کند؛ تعدادی Credit اولیه می‌تواند برای استفاده اولیه در اختیار او قرار گیرد.
2. **Revenue from Real Interaction / Early Access** — پرداخت زمانی انجام شود که User قصد واقعی برای ارتباط دارد.
3. **Power User Monetization** — Userهای فعال و حرفه‌ای بیشتر هزینه می‌کنند.

## Pricing Policy

تمام هزینه‌های سرویس‌ها مانند **Early Access، Boost، Extend، Escrow و سایر خدمات** باید از Admin Panel قابل تنظیم و Dynamic باشند.

Source Document صریحاً می‌گوید اعداد ذکرشده نمونه‌اند و قیمت نهایی می‌تواند بر اساس این عوامل تغییر کند:

- Country.
- Category.
- Supply & Demand.
- User Behavior.
- Unit Economics results.

قیمت‌ها قرار است طی نسخه‌های مختلف بازنگری شوند تا بین Conversion، Revenue و User Satisfaction تعادل ایجاد شود.

> بنابراین اعداد Coin در ادامه باید به‌عنوان Rule/Example ثبت‌شده در Source Document خوانده شوند و نه قیمت ثابت غیرقابل تغییر، مگر جایی که متن خلاف آن را صریحاً بگوید.

## Coin Economy

تعریف پایه در Source Document:

- **10 Coins = $1**.

### User Coin Sources

- واریز به حساب بانکی Canada؛ در شروع با تأیید تراکنش و در نسخه‌های آینده امکان اضافه‌شدن Stripe و PayPal.
- USDT / TON.
- Telegram Stars؛ در Version 1 بررسی کاملاً دستی و در صورت موفقیت، در آینده Systematic Confirmation.
- پرداخت مستقیم برای Iran با واریز ریالی به Card Number در Version 1 و Online Payment Gateway خودکار در نسخه بعدی.

## Wallet

Wallet اعتبار داخلی برای پرداخت سرویس‌های پلتفرم با Coin/Credit است.

### Wallet Data

- Balance.
- Coin count.
- Equivalent value.
- Transaction history.

Example:

- Wallet Balance: 250 Coins.
- Equivalent Value: $25.

### Purchased Coins

- خریداری‌شده توسط User.
- قابل استفاده برای تمام Services.
- بدون محدودیت زمانی طبق Business Policy.

### Bonus Coins

- برای Promotion، Incentive و Engagement.
- استفاده برای بعضی Revenue Services ممکن است محدود یا غیرفعال باشد.
- منابع: Signup، Referral Program، Campaign، Discount.
- دارای Expiration.
- اولویت مصرف قبل از Purchased Coins.

### Coin Purchase Flow

User Wallet → Select Coin Package → Payment Gateway → Payment Confirmation → Add Coins To Wallet

### Gift / Promo Code Flow

User Code را وارد می‌کند → Code Validation → Add Coin → Register Transaction.

Example Code: PROMO2026.

### Coin Package Examples

| Package | Coins | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | None |
| Plus | 220 | $20 | 20 Coins |
| Premium | 550 | $50 | 50 Coins |

این Packageها نمونه‌اند و Pricing Policy آن‌ها Dynamic است.

### Transaction States

- Pending
- Successful
- Failed
- Refunded

### Low Balance Rule

Condition: **Balance < Required Coins**.

Message defined in source: “Your wallet balance is low. Recharge your wallet to continue.”

Action: View Packages.

## Core Revenue Uses of Coins

- مشاهده Contact Information در مدل Early Access.
- Boost Listing.
- Extend/Renew اولیه و بعدی بر اساس Category.
- ثبت Listing اضافه در همان Category طبق Ruleهای مربوطه.
- پرداخت هزینه ارتباط توسط Listing Owner در مدل Sponsor Contact / تقبل هزینه.
- ارسال Message هدفمند از Bot به کاربران بر اساس Region.
- Promote کردن Listing در Google Ads یا Telegram Ads در نسخه‌های آینده.
- بعضی Verificationها یا Services خاص مانند Cargo Ticket Verification طبق Ruleهای Category مربوطه.

## Early Access

Business intent: Monetization هنگام Intent واقعی برای Contact.

Rules ثبت‌شده:

- قبل از Early Access، Contact به‌صورت Masked نمایش داده می‌شود.
- بعد از Early Access، Full Contact قابل نمایش است.
- Early Access Coin cost از Admin Panel قابل تنظیم است.
- Social / Event / Meetup برای مشاهده Contact Coin نیاز ندارند، اما Click رسمی برای Contact لازم است تا Analytics ثبت شود.
- پس از بازشدن ارتباط برای یک Listing Owner، ارتباط برای سایر Listingهای همان Advertiser تا **2 ماه** باز می‌ماند.
- Contact باید از Button رسمی نمایش داده شود و Coin deduction از همان Flow انجام شود.

### Early Access Timing Conflict

زمان‌بندی دقیق Free vs Paid Contact و مدت Early Access در Source Document متناقض است و در این فایل حل نشده است.

See [Source Conflicts](./assumptions.md#source-conflicts).

## Listing Monetization Rules

### Active Listing Limit

Source Document بر محدودیت **یک Active Listing در هر Category** تأکید دارد، اما Flow پرداخت برای Listing اضافه یا ثبت مجدد در چند بخش یکسان نیست.

See [Source Conflicts](./assumptions.md#source-conflicts).

### Extend / Renew

Example pricing for **30-day extension**:

- Jobs + Social: **35 Coins** (Dynamic by Admin).
- Housing: **65 Coins** (Dynamic by Admin).

Example pricing for **second 30 days and later**:

- Jobs + Social: **55 Coins** (Dynamic by Admin).
- Housing: **85 Coins** (Dynamic by Admin).

Other Category prices vary by Country and Category and are Admin-configured.

### Boost

- Example cost: **3 Coins** (Dynamic by Admin).
- Effect: return to top of results.
- Effect: republish to social communication channels.

### Urgent

- Paid add-on that visually distinguishes Listing in results.
- Cost is independently configurable by Category in Admin Panel.

## Listing Lifecycle Business Rules

- Signup + Mandatory Phone Verification پیش از Listing creation.
- Listing پس از تکمیل به **Pending** می‌رود.
- Admin Approval قبل از Publish اجباری است.
- User می‌تواند Verificationهای بیشتر را برای Trust بالاتر انجام دهد.
- User می‌تواند در دوره فعال از Boost / Urgent استفاده کند.
- Listing در **Day 30** منقضی و از نتایج Active خارج می‌شود؛ از Day 31 Status = Expired.
- Extend/Renew می‌تواند Listing را دوباره وارد چرخه انتشار کند.
- User می‌تواند Listing را Deactivate کند، اما در User History باقی می‌ماند.
- Performance Report بعد از Expiry تا **یک ماه** قابل مشاهده/ارسال است.
- Telegram renewal notification در یک Workflow تا **15 روز بعد از Expiry** ادامه دارد.

زمان‌بندی Paid vs Free Contact در ابتدای Lifecycle متناقض است و در [Source Conflicts](./assumptions.md#source-conflicts) ثبت شده است.

## Listing Performance & Retention Notifications

Metrics تعریف‌شده:

- Impression.
- Detail View.
- Contact Requests Count.

Notification / retention rules:

- گزارش Performance می‌تواند روزانه، هفتگی و کل ارسال شود.
- یک بخش می‌گوید Metrics حتی برای Expired Listing تا یک ماه روزانه ارسال می‌شوند.
- 3 روز قبل از Expiry، Warning هر روز ارسال می‌شود.
- Admin می‌تواند Notification مستقیم برای User ارسال کند.
- Targeted promotional notification برای Region / Category / City / Country با هزینه توافقی با Admin مطرح شده است.
- اگر User Coin کافی نداشته باشد، می‌تواند از Advertiser درخواست کند هزینه ارتباط را تقبل کند و Notification مرتبط برای Advertiser ارسال شود.

## Ranking Logic

ترتیب پایه نمایش Listingها:

1. Boosted Listings.
2. Newest Listings.
3. Listings from Verified Users.
4. Other Listings.

این Ranking در Roadmap Version 1.2 با عنوان Basic Ranking نیز آمده است؛ زمان دقیق ورود آن به MVP با بخش‌های دیگر نیازمند هماهنگی Release Scope است.

## Review / Deal Incentive

- پس از تأیید Deal توسط هر دو طرف، Review قابل ثبت است.
- User که هزینه Early Access را پرداخته و بعد از Deal Review ثبت کند، **1 Coin** می‌گیرد.
- Reward تکراری برای همان مورد مجاز نیست.
- Free-contact Listings Review دارند ولی Coin reward ندارند.

## Verification-related Incentives

مقادیر Video و National ID در Source متناقض‌اند. See [Source Conflicts](./assumptions.md#source-conflicts).

سایر Rewardها:

- هر Social Network قابل Verification: **1 Coin**.
- University/Work Email در صورت Verification: **5 Coins**؛ Public email Coin ندارد.
- رسیدن به **10 Deals**: **20 Coins** + 10 Deals Badge.

## Referral Revenue / Reward Logic

Referral در دو بخش با Trigger و Amount متفاوت آمده و بدون reconcile در Conflict Register حفظ شده است.

See [Source Conflicts](./assumptions.md#source-conflicts).

## Revenue Loops

### Loop 1 — Listing → Contact → Payment

User sees Listing → requests advertiser Contact → pays Early Access Coin cost.

یک بخش **1 Coin** را نمونه مبلغ می‌دهد؛ Pricing Policy کلی Dynamic است.

### Loop 2 — Low Response → Boost

Low response → Listing Owner buys Boost → Listing becomes visible again.

### Loop 3 — Expire → Extend

Listing expires → User still needs demand fulfillment → pays to Extend/Renew.

### Loop 4 — Deal → Review → Coin

Deal completed → User leaves Review → receives 1 Coin → Coin can be reused.

## Verified-user Discounts

### Extend Discount Example

در بخش «مدل فعلی: simple» یک **example** آمده که User با Verification کامل هنگام Extend می‌تواند **35% discount** بگیرد.

**Status: Proposed / Example**

### Coin Package Discount

برای Verified Users **20% reduction in Coin Package price** مطرح شده و اجرای آن به Future / Partner or Plugin مرتبط شده است.

**Status: Planned / Future**

## Admin Financial Controls

Admin باید بتواند:

- User Balance را ببیند.
- Coin دستی اضافه یا حذف کند.
- Transaction History را ببیند.
- Coin Package ایجاد کند.
- Price، Coin count و Bonus را تغییر دهد.
- Package را Active/Inactive کند.
- User ID، Transaction ID، Payment Status، Amount، Date و Gateway Reference را ببیند.

## Revenue Analytics

### Revenue Metrics

- Total Revenue.
- Revenue per Package.
- Average Purchase Value.
- Monthly Recurring Revenue.

### Conversion Metrics

- Package viewers.
- Coin buyers.
- Purchase Conversion Rate.
- Repeat Purchase Rate.

## Burn Rate / Cost Base

مهم‌ترین هزینه‌های نسخه اولیه:

- Infrastructure.
- Domain & Services.
- عملیات دستی Listing Approval.
- عملیات Verification.
- User Support.
- Application Development.
- CAC / Advertising.

## CAC / LTV / Break-even

- **CAC:** مجموع هزینه جذب، Signup و تبدیل User به Active / Paying user.
- **LTV:** مجموع Revenue ایجادشده توسط User در طول عمر فعالیت.
- **Break-even:** نقطه‌ای که Total Revenue تمام Fixed Cost + CAC را پوشش دهد.

### Observed Campaign Data — 4 Campaigns

- Total Spend: **426,760,000 تومان** ≈ **3,185 CAD**.
- Members acquired: **62**.
- Cost per acquired channel member: **6,883 تومان** ≈ **0.051 CAD**.

فرمول Full CAC:

**Full CAC = actual member acquisition cost + operational costs + conversion-rate adjustment**

عدد نهایی Full CAC یا LTV نهایی در Source Document تکمیل نشده است.

## MVP Revenue Evidence

در MVP چهارماهه Rental Housing Canada:

- 2 Paying Users.
- $2 per Listing.
- $4 Total Revenue.
- Payment model: Website + Telegram Bot + Telegram Channel publication.

این نتیجه فقط willingness to pay برای **Listing publication** را نشان می‌دهد؛ willingness to pay برای **Contact / Early Access** هنوز اثبات نشده است.

See [Assumptions & Validation](./assumptions.md).

## Future Business Revenue: Landing Page

**Status: Planned / Future**

Revenue model:

- Monthly Subscription.
- Tiered Plans based on features.
- Future Premium Services: Custom Domain، Custom Design، Analytics.

Service delivery can be via External Partner، SaaS Landing Page Builder یا Independent Plugin؛ Advertio نقش Integration / Marketplace connection را داشته باشد.

## Other Future Monetization

- Dynamic Pricing تکامل‌یافته.
- Premium Account برای دریافت گروهی Coins / Benefits.
- Other Categories.
- Better Seller Dashboard.
- Escrow در Business Platform.
