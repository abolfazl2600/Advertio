# Assumptions, Validation & Source Conflicts

## Status Convention

این فایل بین موارد زیر تفکیک می‌کند:

- **Validated / Observed:** Source Document داده یا نتیجه واقعی ارائه کرده است.
- **Hypothesis / Estimate:** برآورد، سناریو یا سؤال نیازمند Validation است.
- **Proposed / Planned:** ایده یا Feature برای آینده است.
- **Source Conflict:** دو یا چند بخش Source Document Rule/Timing/Amount متفاوت داده‌اند و تصمیم نهایی در Source وجود ندارد.

## Market Assumptions & Estimates

### Canada Rental Market

**Status: Estimate / Market sizing in Source Document**

- Canada population: ~40.5M.
- Households: ~17.2M.
- Renter share: ~33.5% → ~5.8M renter households.
- Telegram penetration assumption: ~7.5%.
- Telegram renter households: ~435K.
- Approx people represented: ~950K–1.05M.
- Rentals.ca listings quoted: 59,128.
- Under $2,000: ~38K = 64.3%.

### User Acquisition Scenarios

**Status: Hypothesis / Scenario**

- 5% capture → ~150K MAU → ~7–8K active listings if 5% post.
- 7.5% capture → ~225K MAU → ~11K active listings if 5% post.
- 10% capture → ~300K MAU → ~15K active listings if 5% post.

### Persian-speaking Initial Audience

**Status: Estimate**

Source Document برآورد می‌کند حدود **400K Persian-speaking Telegram users in Canada** وجود داشته باشند و این Community می‌تواند Entry Audience باشد.

### General Jobs Canada

**Status: Estimate based on figures cited in Source Document**

- Job Bank General share: 12,578 / 63,119 = 19.9%.
- Kijiji General share: 11,321 / 68,292 = 16.6%.
- Average General share: ~18%.
- Telegram Canada users: ~3M.
- Job-seeker ratio assumption: 3.6% → ~108K.
- General Jobs target after 18% factor: ~19.4K.

## Observed Advertising Data

**Status: Observed in Source Document — 4 campaigns**

- Total spend: **426,760,000 تومان** ≈ **3,185 CAD**.
- Channel members acquired: **62**.
- Actual acquisition cost per channel member: **6,883 تومان** ≈ **0.051 CAD**.

### Full CAC

Source Document formula:

**Full CAC = actual member acquisition cost + operating costs + adjustment for conversion rate**

**Status: Incomplete** — رقم نهایی Full CAC در Source Document فعلی ارائه نشده است.

### LTV / Break-even

Definitions exist, but numerical LTV and numerical Break-even are not completed in the current Source Document.

**Status: Insufficient source data for final numerical calculation**

## MVP Validation Results — Rental Housing Canada

**Status: Observed / Validated as historical MVP results**

MVP اولیه به زبان English برای بازار Rental Housing Canada و با سه Distribution Channel اجرا شده است:

1. Rental Housing Website.
2. Telegram Bot.
3. Specialized Telegram Rental Channel.

### Results

| Metric | Observed value |
|---|---:|
| MVP duration | 4 months |
| Telegram channel members | 272 |
| Direct listing requests to admin | 38 |
| Paying users | 2 |
| Price per listing | $2 |
| Initial total revenue | $4 |
| Payment model | Publish on Website + Telegram Bot + Telegram Channel |

### Derived Rates Already Stated in Source

- Active interaction: 38 / 272 = **13.9%** (~14%).
- Payment conversion: 2 / 38 = **5.2%**.

### What This Validates

**Status: Validated only for this behavior**

حداقل بخشی از کاربران حاضر بوده‌اند برای **ثبت/انتشار Listing** در مدل فوق پول پرداخت کنند.

### What This Does Not Validate

**Status: Not validated**

Source Document صریحاً می‌گوید پرداخت برای **Contact Information / Early Access** با این MVP اثبات نشده است.

### Audience Limitation

**Status: Source interpretation / not a controlled conclusion**

متن می‌گوید Community اولیه «احتمالاً» Warm Audience بوده چون بخشی از Ads هدفمند بوده است.

## Existing User Behavior Evidence

**Status: Observed community sizes cited by Source; not Advertio conversion**

| Domain | Community | Members |
|---|---|---:|
| Toronto Rental | RentToronto | 34,000 |
| Toronto Rental | Toronto_Rental | 21,000 |
| Iran–Canada Passenger Cargo | BarVaMosaferi | 7,000 |
| Iran–Germany Passenger Cargo | hilfenChat | 12,000 |

## Open Validation Questions

**Status: Hypothesis / Open**

- آیا کاربران واقعاً برای حل مشکل از alternativeها استفاده می‌کنند؟
- Pain Point چقدر شدید و پرتکرار است؟
- چه درصدی از Community هر ماه Active Need دارد؟
- آیا User حاضر به پرداخت برای حل مسئله است؟
- آیا راهکارهای فعلی مثل Telegram، Facebook و Kijiji ناکافی‌اند؟
- Community → Real Customer conversion چقدر است؟
- آیا Market growth potential دارد؟
- آیا Trust Layer Deal Rate را بالا می‌برد؟
- آیا User بعد از اولین Payment دوباره برمی‌گردد؟
- Retention در 30 / 90 / 180 روز چقدر است؟
- Badge، Review و Verification تا چه حد قابل اعتماد و دارای Economic Value هستند؟

# Source Conflicts

## Conflict 1 — Early Access Timing & Free/Paid Contact

> ⚠️ Source Conflict
>
> یک بخش Source Document می‌گوید بعد از Early Access «یک‌روزه» Contact Information کامل نمایش داده می‌شود.
>
> بخش Listing Lifecycle می‌گوید Listing جدید تا **30 ساعت** فقط برای Userهای دارای Early Access به‌صورت کامل قابل مشاهده است و بعد از آن تا پایان دوره عمومی، Listing و Contact رایگان می‌شود.
>
> بخش Telegram Bot Workflow برعکس می‌گوید **Day 1–3 Free Interaction** است و User بدون Coin Contact را می‌بیند؛ سپس **Day 4+** Contact با **1 Coin** وارد Monetization می‌شود.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Conflict 2 — MVP / Release Phasing

> ⚠️ Source Conflict
>
> Roadmap اصلی، Version 1.0 را بدون Wallet/Coin، Early Access، Boost و Review تعریف می‌کند؛ Wallet + Coin + Boost + Extend + Early Access در Version 1.1 و Video Verification + Review/Rating در Version 1.5 آمده‌اند.
>
> بخش «MVP vs Future» در مقابل، **Coin System را جزو MVP** می‌گذارد و Review، Advanced Verification، Boost و Saved Filters را در Phase 2 قرار می‌دهد.
>
> Telegram Bot Workflow نیز Early Access و Boost را در Flow خود وارد کرده است. همچنین بخش Verification، Video Verification را «در ورژن اول توسط اپراتور» توصیف می‌کند، در حالی که Roadmap آن را Version 1.5 می‌داند.
>
> این مورد نیازمند تصمیم نهایی Product/Business درباره Scope دقیق MVP و Versionها است.

## Conflict 3 — Verification Reward Amounts

> ⚠️ Source Conflict
>
> یک بخش Rewardهای Verification را این‌گونه تعریف می‌کند: **Video = 5 Coins** و **National ID = 10 Coins**، با قابلیت تنظیم از Admin Panel.
>
> بخش Coin Economy مقدارهای دیگری می‌دهد: **Video = 3 Coins** و **National ID = 3 Coins**.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Conflict 4 — Referral Trigger & Reward

> ⚠️ Source Conflict
>
> یک Referral flow می‌گوید: Invite Friend → Friend Purchases Package → **Both users receive 100 Coins**.
>
> بخش دیگری می‌گوید با Referral Link و Signup/Verification، تازه‌عضو و Referrer هر دو **3 Coins** می‌گیرند.
>
> این دو می‌توانند از نظر تئوری دو Reward stage جدا باشند، اما Source Document آن‌ها را به‌صورت یک Rule نهایی و هماهنگ تعریف نکرده است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Conflict 5 — Additional Listing in Same Category

> ⚠️ Source Conflict
>
> Rule مشترک می‌گوید فقط **1 Active Listing per Category** مجاز است.
>
> یک بخش می‌گوید اگر User به Listing دیگری در همان Category نیاز داشته باشد باید Fee مربوط به همان Category را بپردازد.
>
> بخش Monetization می‌گوید ثبت دو Listing رایگان در یک Category ممکن نیست و اگر User بعد از یک ماه دوباره در همان Category ثبت کند با **5 Coins** می‌تواند ثبت کند.
>
> Telegram Bot Workflow در صورت وجود Active Listing، به‌جای Flow پرداخت، Warning + Message to Support/Admin را تعریف می‌کند.
>
> این مورد نیازمند تصمیم نهایی Product/Business درباره Trigger، Amount و Automation است.

## Conflict 6 — Financial Verification Availability

> ⚠️ Source Conflict
>
> در بخش Trust Layer، Financial Verified به این صورت توضیح داده شده که حداقل یک Bank Account یا Card توسط System/Admin تأیید شود و **فعلاً به‌صورت دستی توسط Admin** انجام می‌شود و بعداً خودکار می‌شود.
>
> در بخش Verification Layers، Financial Verified (micro transaction) صریحاً **در ورژن فعلی وجود ندارد** اعلام شده است.
>
> این مورد نیازمند تصمیم نهایی Product/Business درباره Current Availability است.

## Conflict 7 — Social Media / Social & Contact Availability

> ⚠️ Source Conflict
>
> بخش Social & Contact ابتدا می‌گوید **در این ورژن وجود ندارد و در ورژن‌های بعدی اضافه می‌شود**.
>
> در ادامه همان بخش، Reward برای اضافه‌کردن Social Network، روش Verification با Code و این عبارت آمده که Verification **در ورژن فعلی توسط Admin** و در آینده خودکار انجام می‌شود.
>
> این مورد نیازمند تصمیم نهایی Product/Business درباره Current Availability است.

## Conflict 8 — Category Taxonomy / Scope List

> ⚠️ Source Conflict
>
> یک بخش Categoryهای سطح بالا را **Passenger Cargo، Housing & Roommate، Social & Events، Jobs، Services و Human Match** معرفی می‌کند.
>
> بخش دیگری که «دسته‌بندی سیستم» را فهرست می‌کند، Taxonomy را به **HOUSING، SERVICES، TRAVEL_TRANSPORT و SOCIAL** تقسیم می‌کند؛ Passenger Cargo را زیر TRAVEL_TRANSPORT و چند نوع Partner را زیر SOCIAL می‌گذارد، اما **Jobs را در آن لیست تکرار نمی‌کند**. Human Matching نیز جداگانه قبل از این Taxonomy توضیح داده شده است. Peer Exchange هم در بخشی Future/Maybe تعریف شده ولی در Taxonomy بعدی p2p_exchange_request زیر SOCIAL آمده است.
>
> این مورد نیازمند تصمیم نهایی Product/Business درباره Taxonomy canonical و Current/Future scope است.
