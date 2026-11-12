# Campaigns

این فایل Campaignها و Campaign-like mechanics موجود در Source Document و اجرای واقعی Advertio را ثبت می‌کند. برای جزئیات عملکرد تبلیغات پولی، فایل‌های تحلیلی مرتبط نیز نگهداری می‌شوند.

## Actual paid campaigns — historical source data

Status: Source-reported actual data from 4 campaigns

Source از «4 Campaign» تبلیغاتی یاد می‌کند:
- Total spend: 426,760,000 تومان
- Stated equivalent: 3,185 CAD
- Total acquired channel members: 62

Cost-per-member numbers در Source ناسازگاری محاسباتی دارند؛ جزئیات در [Paid Acquisition](./paid-acquisition.md). این داده تاریخی از رکوردهای جدید کمپین جدا نگهداری می‌شود و نباید بدون تطبیق، با آن‌ها جمع یا ادغام شود.

## Telegram Ads — campaign-level records

از 2026-11-13 سه تبلیغ در سطح Ad ID و تنظیمات هدف‌گیری ثبت شده‌اند:

- [Telegram Ads Performance Log](./telegram-ads/README.md) — روش ثبت، تعاریف، CSV و معیارهای مقایسه
- [TG-ADS-001 — Canada House / City Search](./telegram-ads/001-canada-house-city-search.md) — هدف‌گیری بر اساس عبارت‌های کشور و شهر
- [TG-ADS-002 — Canada House / Channel Targeting](./telegram-ads/002-canada-house-channel-targeting.md) — Ad ID: `1caeba50`، هدف‌گیری 16 کانال
- [TG-ADS-003 — Advertio Cargo / Traveler Acquisition](./telegram-ads/003-advertio-cargo-traveler-acquisition.md) — Ad ID: `0f1c8f5b`، هدف‌گیری 18 کانال

### TG-ADS-001 — Snapshot اول

- Destination: Canada House — https://t.me/canadahouse24
- Status at capture: Active
- Views: 883
- Clicks: 43
- Memberships: 6
- Spend: 883 (currency / unit not confirmed)
- Reported CTR: 4.87%
- Reported CVR: 13.95%

این Snapshot نتیجه نهایی کمپین نیست؛ هنگام ثبت، کمپین فعال و فقط 8.83% بودجه مصرف شده بود.

### TG-ADS-002 — اولین ثبت

- Telegram Ads ID: `1caeba50`
- Destination: Canada House — https://t.me/canadahouse24
- Targeting: 16 Telegram channels
- Budget spent: 185
- Budget remaining: 9,815
- Total budget: 10,000 (calculated from spent + remaining)
- Views / clicks / memberships: not visible in supplied screenshots

در TG-ADS-002، نوع هدف‌گیری با TG-ADS-001 متفاوت است؛ جزئیات در گزارش مستقل کمپین ثبت شده است.

### TG-ADS-003 — اولین ثبت

- Telegram Ads ID: `0f1c8f5b`
- Creative: سفرهای رو به درآمد تبدیل کن
- Destination: Advertio Cargo — https://t.me/advertio_cargo
- Targeting: 18 Telegram channels
- Budget spent: 1,168
- Budget remaining: 8,832
- Total budget: 10,000 (calculated from spent + remaining)
- Budget consumption: 11.68%
- Views / clicks / memberships: not visible in supplied screenshots

این تبلیغ مسافران دارای ظرفیت خالی چمدان را برای حمل مدارک و بسته‌ها هدف می‌گیرد. هدف‌گیری شامل کانال‌های مهاجرت، جامعه ایرانیان، سفر، صرافی و سه کانال حمل بار و مدارک در آلمان، هلند و بلژیک است. جزئیات در [گزارش TG-ADS-003](./telegram-ads/003-advertio-cargo-traveler-acquisition.md) ثبت شده است.

## Initial MVP campaign context

MVP:
- 4 months
- Rental Canada
- English
- Website + Telegram Bot + Telegram Channel
- Telegram Ads استفاده شده است، اما Source تعداد Ads/flightهای آن دوره را مشخص نمی‌کند.

Source می‌گوید Initial audience احتمالاً Warm Audience بوده چون بخشی از Advertising هدفمند بوده است.

## Targeted notification / advertising campaign

Source یک Campaign mechanism تعریف می‌کند:
- انتخاب Userها بر اساس Region
- Category
- City
- Country
- ارسال Notification/advertising
- Fee با Admin به‌صورت توافقی

Source campaign setup workflow یا pricing formula نمی‌دهد.

## Bonus / promotional campaigns

Bonus Coins می‌توانند از:
- Advertising campaigns
- Discounts

دریافت شوند.

Gift/Promo Code example:
- PROMO2026

این صرفاً Example code در Source است.

## Referral campaign mechanics

دو Referral mechanic در Source وجود دارد:
- Signup/verification → 3 Coins each
- Friend package purchase → Example 100 Coins each

جزئیات و Conflict در [Referral Growth](./referral-growth.md).

## Future advertiser promotion campaigns

Future:
- Promote listing via Google Ads
- Promote listing via Telegram Ads

Source درباره:
- Campaign budget
- targeting
- duration
- approval
- performance guarantee

اطلاعاتی ارائه نکرده است.

## Campaign measurement

برای کمپین‌های جدید Telegram Ads، داده‌های سطح کمپین در پوشه [telegram-ads](./telegram-ads/README.md) ثبت می‌شوند.

برای 4 کمپین تاریخی Source، اطلاعات سطح هر کمپین همچنان کامل نیست:
- dates
- creative
- targeting settings
- impressions
- clicks
- CTR
- conversions
- per-campaign spend

داده‌های جدید نباید به‌عنوان تکمیل‌کننده خودکار داده‌های تاریخی فرض شوند؛ ابتدا باید انتساب و دوره زمانی آن‌ها تطبیق داده شود.
