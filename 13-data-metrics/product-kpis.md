# Product KPIs

این فایل Product-level measurement requirements و Success Signals را از Source Document ثبت می‌کند.

## Version 1.0 success criteria

Target:
- حداقل 50 Real Listings published
- حداقل 200 Registered Users

Goal:
- Launch first marketplace quickly
- Test the model

این‌ها Target هستند، نه Result واقعی. See [MVP Results](./mvp-results.md).

## Version 1.1 listing analytics

Source Version 1.1:
- Basic Listing Analytics
  - View count
  - Contact request count

Listing Entity metric definitions:
- Impression = مجموع Search impressions
- Detail View = تعداد دفعات بازشدن Listing
- Contact Requests Count = تعداد Userهایی که درخواست Contact info داشته‌اند

Workflow همچنین:
- Reaching views
- Contact Requests
- Detail listing view

را نمایش می‌دهد.

> ⚠️ Source Conflict
>
> Source هم `Impression` و هم `Reaching views` را استفاده می‌کند، اما تعریف نمی‌کند این دو یک Metric هستند یا متفاوت.
>
> بنابراین نام‌ها بدون ادغام حفظ شده‌اند و نیازمند Product definition نهایی هستند.

## Version 1.2 interaction / response metrics

Source Version 1.2:
- Response Metrics
- Last Active
- Smart Notifications
- Saved Search + Alerts
- Daily Listing lifecycle reporting

### Response Metrics definition

هدف:
- اندازه‌گیری سرعت، اثربخشی و کیفیت پاسخ Userها به Message/Request.

Source می‌گوید این Metricها:
- فقط Analytics ساده نیستند.
- با Trust و کیفیت Interaction ارتباط دارند.

### Explicit response metric
- Last Activity

Display examples:
- Online
- 6 hours ago
- اگر Activity بیش از 3 روز وجود نداشته باشد: «بیشتر از سه روز»

Source Metric دیگری برای Response Metrics به‌صورت فرمول‌دار ارائه نکرده است.

## User profile metrics

- Deals Count
- Average Rating / 5
- Reviews
- Total Listings
- Active Listings
- Listing History

Top Rated qualification:
- Average Rating ≥ 4.5/5
- ≥15 Reviews
- no Dispute or Report

## Saved Search metrics / matching behavior

- Active filters در Admin قابل مشاهده‌اند.
- اگر Listing حدود 70% با Filter User Match باشد، می‌تواند ارسال شود.
- User-configurable match percentage در Current version وجود ندارد؛ Future است.
- اگر Result ارسال نشود، System پیشنهاد کاهش Filterها را می‌دهد.

Source KPI برای Alert open rate یا Saved Search conversion ارائه نکرده است.

## Product engagement loops

Product behaviorهایی که قابل Measurement هستند:
- Search → Contact request
- Listing → Contact access
- Deal → Review
- Review → Trust
- Low response → Boost
- Expiry → Extend
- Referral → Registration / Purchase
- Package view → Coin purchase

Source برای اکثر این Loopها Result واقعی ندارد.

## AI / Future product metrics implied by features

### AI Recommendation Assistant — Future
Source behavior:
- AI category detection
- Attribute extraction
- Ranking by Match Score
- Similar alternatives when exact result is missing

Display examples:
- 98% Match
- 95% Match
- 90% Match

این اعداد Example output هستند، نه KPI result.

### Compatibility Score — Future
Example:
- 85% Match

Status: Proposed / Future

Source Metric definition یا Validation result برای accuracy/quality این Scoreها ارائه نمی‌کند.

## Listing-reporting duration

Source یک بخش می‌گوید Listing metrics روزانه حتی پس از Expiry تا یک ماه ارسال می‌شوند.

Workflow دیگری می‌گوید Telegram notifications برای Extend تا 15 روز بعد از Expiry ادامه دارند.

جزئیات Conflict در [Marketplace KPIs](./marketplace-kpis.md).

## Product KPI gaps

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source Result یا Target مشخصی برای این Metricها ارائه نکرده است:
- DAU
- DAU/MAU
- Session frequency
- Search-to-contact conversion
- Contact-to-deal conversion
- Boost uplift
- Extend conversion
- Saved Search alert engagement
- AI match quality
- Average response time
