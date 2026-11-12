# Paid Acquisition

## Current / early paid acquisition

Source Telegram Ads را در Phase اول به‌عنوان یکی از Acquisition channels نام می‌برد.

Acquisition sources:
- Telegram Communities
- Referral Link
- Organic Search
- Telegram Ads

## Actual advertising data

Status: Source-reported actual data from 4 campaigns

| Metric | Source value |
|---|---:|
| Total cost | 426,760,000 تومان |
| Stated CAD equivalent | 3,185 CAD |
| Acquired channel members | 62 |
| Stated cost per member | 6,883 تومان |
| Stated CAD cost per member | 0.051 CAD |

> ⚠️ Source Conflict
>
> 426,760,000 تومان ÷ 62 ≈ 6,883,226 تومان برای هر عضو است، نه 6,883 تومان.
>
> همچنین 3,185 CAD ÷ 62 ≈ 51.37 CAD برای هر عضو است، نه 0.051 CAD.
>
> Source values بدون اصلاح حفظ شده‌اند و نیازمند بررسی Business/Finance هستند.

## Telegram Ads — first campaign-level observation

در 2026-11-13 یک Snapshot از کمپین فعال Telegram Ads ثبت شد:

- Campaign: TG-ADS-001 — سرچ -نام شهر ها
- Destination: Canada House — https://t.me/canadahouse24
- Status at capture: Active
- Total budget: 10,000
- Spend: 883
- Remaining: 9,117
- Views: 883
- Clicks: 43
- Memberships: 6
- Reported CTR: 4.87%
- Reported CVR: 13.95%
- Reported CPC: 20.53
- Reported CPA: 100.00
- Reported CPM: 1,000

واحد پول / واحد اعتباری در تصویر مشخص نیست؛ بنابراین اعداد هزینه بدون نسبت‌دادن به تومان، دلار، TON یا Stars ثبت شده‌اند.

### Independent calculation

با فرض یکسان بودن واحد هزینه:

- Calculated CTR: 43 / 883 = 4.87%
- Calculated CVR: 6 / 43 = 13.95%
- Calculated CPC: 883 / 43 = 20.53
- Calculated CPM: 883 / 883 × 1,000 = 1,000
- Calculated CPA per membership: 883 / 6 = 147.17

CPA داشبورد (100.00) با CPA محاسبه‌شده (147.17) متفاوت است. تا زمان روشن‌شدن تعریف این فیلد، این دو مقدار جدا نگهداری می‌شوند.

درصد مصرف بودجه هنگام ثبت 8.83% بوده و کمپین فعال بوده است؛ این داده یک Snapshot میانی است، نه نتیجه نهایی.

جزئیات، عبارت‌های هدف‌گیری، ابهام‌ها و Snapshotهای بعدی در [Telegram Ads Performance Log](./telegram-ads/README.md) و [گزارش TG-ADS-001](./telegram-ads/001-canada-house-city-search.md) ثبت می‌شوند.

## CAC interpretation

Source CAC را هزینه جذب، Registration و Conversion به Active/Paying user تعریف می‌کند.

Formula ثبت‌شده:
Full CAC = actual acquisition cost + operational costs + adjustment based on conversion rate

Source Full CAC نهایی را محاسبه نکرده است.

## MVP advertising context

MVP چهارماهه:
- بخشی از Audience از Targeted advertising آمده است.
- Source به همین دلیل Initial audience را احتمالاً Warm Audience توصیف می‌کند.

Result:
- 272 channel members
- 38 direct listing requests
- 2 paying users

Source Attribution دقیق این Resultها به Campaignهای paid vs organic ارائه نکرده است.

## User-listing promotion — Future

Source برای Advertiser value proposition و Coin usage به:
- Google Ads
- Telegram Ads

برای Promote کردن User Listing اشاره می‌کند.

یک بخش صریحاً این capability را «در ورژن‌های آینده» قرار می‌دهد.

این Service با Advertio paid acquisition برای جذب User متفاوت است.

## Paid acquisition cost category

Initial Burn Rate includes:
- Customer acquisition and advertising cost

اما Source Budget allocation یا Monthly spend plan نمی‌دهد.

## Paid acquisition metric gaps

برای کمپین TG-ADS-001 بخشی از داده‌های CTR، CPC، CPM و تبدیل اولیه موجود است؛ اما برای ارزیابی کامل Acquisition همچنان داده‌های زیر لازم است:

- Currency / cost unit
- Campaign-by-campaign spend برای کمپین‌های تاریخی
- CAC to registered user
- CAC to active user
- CAC to paying user
- ROAS
- Paid payback period
- Downstream conversion from channel membership to bot start, registration, verification, listing creation and payment
- Attribution split between paid, organic and referral traffic
