# Marketplace KPIs

این فایل Metricها و Signalهایی را ثبت می‌کند که مستقیماً سلامت Supply/Demand، Listing activity، Trust و Interaction در Marketplace را نشان می‌دهند.

## Strategic marketplace risk

Source یک Risk صریح ثبت می‌کند:
- نسبت Listingهای واقعی Userها باید خیلی سریع از Listingهای Crawled بیشتر شود.
- Telegram Search Engine نباید به وضعیت دائمی Product تبدیل شود؛ Crawler برای شروع/Cold Start است.

### Marketplace KPI implied by the Source

Metric قابل استخراج مستقیم از این Rule:
- User-generated listings vs Crawled listings ratio

Source Target عددی برای این Ratio تعیین نکرده است.

## Listing supply targets and scenarios

### Version 1.0 success target
- حداقل 50 Real Listings published

### Rental Canada scenarios
- Pessimistic: ~7–8K Active Listings
- Realistic: ~11K Active Listings
- Optimistic: ~15K Active Listings

این Scenarioها Result واقعی نیستند.

## MAU scenarios

Rental Canada:
- Pessimistic: ~150K MAU
- Realistic: ~225K MAU
- Optimistic: ~300K MAU

Source در Realistic scenario، 5% Listing creation را برای رسیدن به ~11K Active Listings فرض می‌کند.

## Listing performance metrics

Listing Entity این Metricها را تعریف می‌کند:

### Impression
- مجموع نمایش در Search resultها

### Detail View
- تعداد دفعات بازشدن Listing توسط Userها

### Contact Requests Count
- تعداد Userهایی که درخواست مشاهده Contact info داشته‌اند

Workflow یک Label دیگر نیز ثبت می‌کند:
- Reaching views

Source مشخص نمی‌کند `Reaching views` دقیقاً همان Impression است یا Metric متفاوت؛ بنابراین آن‌ها ادغام نشده‌اند.

## Listing-reporting cadence

Source می‌گوید Metrics برای Listing owner به‌صورت Daily گزارش/Notification می‌روند.

Metrics ذکرشده در بخش‌های مختلف:
- Views
- Detail Views
- Contact Requests
- Contact info views
- Contact-method clicks

> ⚠️ Source Conflict
>
> یک بخش می‌گوید Listing metrics حتی بعد از Expiry تا یک ماه Daily notification دارند.
>
> Workflow دیگری Telegram notification بعد از Expiry را تا 15 روز برای پیشنهاد Extend ذکر می‌کند.
>
> Source روشن نمی‌کند این‌ها دو Notification stream جدا هستند یا یک Retention window واحد.

## User / trust performance metrics

User Entity:
- Last Active
- Deals Count
- Average Rating از 5
- Reviews

### Last Active display rule
- «online» یا «چند ساعت قبل»
- اگر بیش از 3 روز هیچ Activity در Bot یا Website نباشد: «بیشتر از سه روز»

### Response Metrics
Source Response Metrics را مجموعه شاخص‌هایی می‌داند که نشان می‌دهد Users:
- چقدر سریع پاسخ می‌دهند
- چقدر مؤثر پاسخ می‌دهند
- کیفیت Interaction آن‌ها چگونه است

این Metrics فقط Analytics ساده نیستند و به Trust/interaction quality نیز مرتبط شده‌اند.

با این حال فقط Last Activity به‌صورت مشخص نام‌گذاری شده است.

## Deal-quality / trust signals

- Deals Count = تعداد Dealهایی که موفق بوده و طرفین تأیید کرده‌اند.
- Average Rating = میانگین Rating از 5.
- Reviews.
- Top Rated rule:
  - Average Rating ≥ 4.5
  - حداقل 15 Review
  - بدون Dispute یا Report

این Rule بیشتر Trust qualification است تا KPI target؛ اما برای Marketplace health قابل اندازه‌گیری است.

## Saved Search matching signal

Source:
- Listing با حدود 70% تطابق با Filter شخص می‌تواند برای User ارسال شود.
- Match percentage قابل تنظیم توسط User در Future ذکر شده، نه Current version.

## Ranking signals

Basic Ranking:
1. Boosted
2. Newest
3. Verified users
4. Other Listings

Source KPI برای Ranking quality یا CTR uplift ارائه نکرده است.

## Demand-side urgency signal — Future proposal

برای Passenger Cargo Listing detail در Future:
- Views in previous 24h
- Contact Request count
- یا Online Users in previous 6h

می‌تواند نمایش داده شود.

Source احتمال اثر منفی Contact Request count را نیز مطرح می‌کند و این Feature را Validated نمی‌داند.

## Marketplace metric gaps

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source Target/Result واقعی برای موارد زیر ندارد:
- Supply-demand balance
- Search success rate
- Time to first contact
- Time to deal
- Listing fill rate
- Deal completion rate
- Fraud/report rate
- Response rate
- User-generated vs Crawled ratio target
