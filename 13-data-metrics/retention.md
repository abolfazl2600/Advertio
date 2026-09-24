# Retention

Source Document Retention را به‌عنوان Question مهم Validation مطرح می‌کند، اما Cohort result واقعی ارائه نمی‌دهد.

## Core retention question

Status: Hypothesis / Open Question

Source می‌پرسد:

- Retention کاربران در بازه 30 روز چگونه است؟
- Retention در 90 روز چگونه است؟
- Retention در 180 روز چگونه است؟

هیچ Percent یا Cohort result برای این سه بازه در Source ارائه نشده است.

## Repeat payment / repeat purchase

Status: Hypothesis / Open Question

Source می‌پرسد:
- آیا Users بعد از اولین Payment دوباره از Platform استفاده خواهند کرد؟

Wallet Analytics همچنین Metric زیر را به‌عنوان Requirement نام می‌برد:
- Repeat Purchase Rate

اما مقدار Actual برای آن ارائه نشده است.

## Retention-supporting loops in Source

این Loopها می‌توانند User را به Platform برگردانند، اما Source اثر واقعی آن‌ها را اندازه‌گیری نکرده است:

### Saved Search → return
- User Search را save می‌کند.
- New matching Listing ایجاد می‌شود.
- Telegram notification / daily summary ارسال می‌شود.
- User به Listing برمی‌گردد.

### Expiry → Extend
- Listing Expired می‌شود.
- User اگر هنوز نیاز دارد Extend می‌خرد.
- Listing دوباره Active می‌شود.

### Deal → Review → Coin
- User Deal را complete می‌کند.
- Review ثبت می‌کند.
- 1 Coin می‌گیرد.
- Coin می‌تواند دوباره مصرف شود.

### Referral
- User Friend را Invite می‌کند.
- Reward دریافت می‌شود.
- Source هدف Engagement/Acquisition را از Reward دنبال می‌کند.

### Wallet
- User Package می‌خرد.
- Coin را به‌تدریج برای Serviceها مصرف می‌کند.
- Repeat Purchase Rate به‌عنوان Metric تعریف شده است.

## Listing-owner post-expiry engagement

Source دو Window مرتبط ثبت می‌کند:
- Listing performance metrics/report تا یک ماه بعد از Expiry.
- Telegram notification برای Extend تا 15 روز بعد از Expiry در Workflow.

> ⚠️ Source Conflict
>
> Source روشن نمی‌کند این دو Window مربوط به دو نوع Notification جدا هستند یا Duration یکسانی باید داشته باشند.
>
> هیچ‌کدام معادل User Retention cohort نیستند؛ صرفاً post-expiry engagement mechanics هستند.

## Long-term retention validation

Status: Not Validated

Source هیچ داده واقعی برای:
- D30 Retention
- D90 Retention
- D180 Retention
- Repeat purchase
- Repeat listing
- Repeat contact purchase

ارائه نمی‌کند.

## Related validated data

MVP چهارماهه:
- 272 channel members
- 38 direct listing requests
- 2 paying users

این داده‌ها Cohort retention نیستند و Source از آن‌ها Retention calculation ارائه نمی‌کند.

See [MVP Results](./mvp-results.md).

## Retention data gap

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source تعریف نکرده است:
- Retained user دقیقاً چه کسی است.
- Cohort start event چیست.
- Return event چیست.
- Retention denominator کدام User group است.
- Paid retention و activity retention چگونه تفکیک می‌شوند.
