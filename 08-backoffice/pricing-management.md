# Pricing Management

Pricing Policy در Source صراحتاً Dynamic و Admin-configurable تعریف شده است. اعداد این سند Sample هستند مگر جایی که Source آن‌ها را به‌عنوان Rule/Example خاص ثبت کرده باشد.

## Global pricing policy

تمام هزینه‌های Serviceها باید از Admin Panel قابل تنظیم باشند، از جمله:
- Early Access
- Boost
- Extend
- Escrow
- سایر خدمات

عوامل تعیین قیمت:
- Country
- Category
- Supply & Demand
- User behavior
- Unit Economics analysis

Source می‌گوید Priceها در Versionهای مختلف چندین بار بازنگری می‌شوند تا Balance میان Conversion، Revenue و User satisfaction پیدا شود.

## Coin baseline

Source تعریف می‌کند:
- 10 Coins = $1

نمونه Wallet:
- 250 Coins = $25

## Coin packages — examples

| Package | Coins | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | ندارد |
| Plus | 220 | $20 | 20 Coins |
| Premium | 550 | $50 | 50 Coins |

این Packageها در Source «نمونه» هستند.

Admin Package management:
- Create Package
- تغییر Price
- تغییر Coin amount
- تعیین Bonus
- Active / Inactive

## Early Access

Rules ثبت‌شده:
- هزینه با Coin.
- مقدار قابل تنظیم در Admin Panel.
- در Revenue Loop و یکی از Workflowها، نمونه 1 Coin برای Contact access آمده است.
- Social / Event / Meetup برای Contact access Coin نیاز ندارند، ولی click رسمی برای Analytics لازم است.
- Category scope و timing Early Access در Source Conflict دارد؛ به [Listings](./listings.md) مراجعه شود.

## Boost

- Sample fee: 3 Coins
- Dynamic by Admin
- اثر:
  - بازگشت به صدر نتایج
  - انتشار مجدد در Communication/Social channels

## Urgent

- هزینه Paid دارد.
- Fee مستقل برای هر Category از Admin Panel قابل تنظیم است.
- Source عدد نمونه مشخصی برای Urgent ارائه نکرده است.

## Extend / Renew

### First 30-day extension
- Jobs & Social: 35 Coins
- Housing: 65 Coins

### Second 30-day extension and later
- Jobs & Social: 55 Coins
- Housing: 85 Coins

همه مقادیر بالا در Source «داینامیک توسط ادمین» هستند.

سایر Categoryها:
- Price متفاوت بر اساس Country و Category
- تعیین داینامیک توسط Admin

## Other documented coin charges

- Cargo ticket Verification: 20 Coins
- Duplicate/repeated listing fee: Source چند Rule ناسازگار دارد؛ جزئیات در [Listings](./listings.md)
- Targeted message بر اساس Region: هزینه توافقی با Admin
- Advertiser-sponsored communication: مصرف Coin به‌عنوان Revenue use-case ذکر شده، اما عدد مشخص ندارد
- Google Ads / Telegram Ads promotion: Future، عدد مشخص ندارد

## Verification-related pricing / discounts

### Example / Proposed
اگر User «احراز کامل» داشته باشد، Source مثالی از 35% discount برای Extend ارائه می‌کند.

### Future / Proposed
Coin Package برای Verified users:
- 20% price reduction
- ممکن است توسط Plugin یا Third-party Partner اجرا شود.

این دو Discount برای دو Purchase متفاوت هستند و Source آن‌ها را یک Rule واحد معرفی نکرده است.

## Dynamic pricing — Future

در «پیشنهاد بهینه‌سازی ورژن‌های آینده»:
- dynamic pricing
- premium account برای دریافت گروهی Coinها

Dynamic configurability در Admin Panel هم‌اکنون به‌عنوان Policy عمومی ذکر شده، اما «dynamic pricing» پیشرفته نیز به‌عنوان Future optimization آمده است؛ Source الگوریتم آن را تعریف نکرده است.

## Escrow

Pricing Policy نام Escrow را در Serviceهای قابل قیمت‌گذاری می‌آورد، اما Roadmap آن را در Version 3.0 قرار می‌دهد.

بنابراین:
- Price configurability برای Escrow یک Requirement آینده محسوب می‌شود.
- Escrow Current feature فرض نشده است.
