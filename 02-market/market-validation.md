# Market Validation

## Validation Status Overview

این فایل فقط شواهد واقعی، نتایج MVP و داده‌های Campaign ذکرشده در Source Document را ثبت می‌کند.

## 1. Version 1.0 Success Criteria

Status: Defined target, not automatically validated

Source برای Version 1.0 هدف «راه‌اندازی سریع اولین بازار و تست مدل» را تعیین می‌کند و دو معیار موفقیت می‌دهد:

- انتشار حداقل **50 آگهی واقعی**
- حداقل **200 کاربر ثبت‌نام‌کرده**

نتایج MVP که در ادامه آمده‌اند شامل 272 عضو کانال Telegram و 38 درخواست مستقیم ثبت آگهی هستند، اما Source مشخص نمی‌کند که:

- 272 عضو کانال همگی Registered User بوده‌اند.
- 38 درخواست ثبت آگهی معادل 50 آگهی واقعی منتشرشده بوده‌اند.

بنابراین در این Knowledge Base این دو Success Criterion به‌عنوان «محقق‌شده» علامت‌گذاری نمی‌شوند.

## 2. Initial MVP — Canada Rental Housing

Status: Validated as an executed experiment

Source گزارش می‌کند یک MVP اولیه به زبان انگلیسی برای بازار اجاره ملک کانادا به مدت **4 ماه** اجرا شده است.

### MVP Distribution

MVP شامل سه کانال بود:

1. وب‌سایت اجاره خانه
2. Telegram Bot
3. کانال Telegram تخصصی اجاره خانه

### Results

| Metric | Result |
|---|---:|
| مدت اجرا | 4 ماه |
| اعضای کانال Telegram | 272 |
| درخواست مستقیم ثبت آگهی به Admin | 38 |
| کاربران پرداخت‌کننده | 2 |
| مبلغ پرداخت هر آگهی | $2 |
| مجموع درآمد اولیه | $4 |
| مدل پرداخت | انتشار آگهی در Website + Telegram Bot + Telegram Channel |

### Engagement Rate

Source محاسبه می‌کند:

```text
38 / 272 = 13.9%
```

و آن را حدود **14% تعامل فعال** گزارش می‌کند.

### Payment Conversion

Source محاسبه می‌کند:

```text
2 / 38 = 5.2%
```

نرخ تبدیل پرداخت گزارش‌شده: **5.2%**

## 3. What This MVP Validated

Status: Validated only for the observed behavior

Source صراحتاً نتیجه می‌گیرد:

- تعدادی از کاربران حاضر بوده‌اند برای **ثبت و انتشار آگهی** پول پرداخت کنند.
- دو پرداخت واقعی با مبلغ **$2 برای هر آگهی** ثبت شده است.

این شواهد فقط رفتار پرداخت برای **Listing Publication** را نشان می‌دهد.

## 4. What This MVP Did Not Validate

Status: Not validated

Source صراحتاً می‌گوید:

- آمادگی کاربران برای پرداخت بابت **مشاهده اطلاعات تماس / Early Access** هنوز اثبات نشده است.

همچنین پرسش‌های زیر همچنان باز هستند:

- آیا Trust Layer نرخ انجام معامله را نسبت به Telegram Groups افزایش می‌دهد؟
- آیا Verification ارزش اقتصادی ایجاد می‌کند؟
- آیا کاربران پس از اولین پرداخت دوباره استفاده و پرداخت می‌کنند؟
- Retention در بازه‌های 30، 90 و 180 روز چگونه خواهد بود؟

## 5. Audience Quality Caveat

Source احتمال می‌دهد جامعه اولیه **Warm Audience** بوده باشد، زیرا بخشی از تبلیغات هدفمند بوده است.

بنابراین نرخ‌های 13.9% و 5.2% نباید بدون Validation بیشتر به کل بازار تعمیم داده شوند.

## 6. Paid Acquisition Data

Status: Source-reported campaign result

Source در بخش CAC / LTV / Break-even داده‌های چهار Campaign را گزارش می‌کند:

| Metric | Source value |
|---|---:|
| تعداد Campaign | 4 |
| کل هزینه | 426,760,000 تومان |
| معادل گزارش‌شده | 3,185 CAD |
| کل عضو جذب‌شده | 62 نفر |
| هزینه واقعی جذب هر عضو کانال — گزارش‌شده | 6,883 تومان |
| معادل گزارش‌شده برای CAC هر عضو | 0.051 CAD |

### CAC Definition in Source

Source، Customer Acquisition Cost را مجموع هزینه‌هایی تعریف می‌کند که برای جذب، ثبت‌نام و تبدیل کاربر به حالت فعال و پرداخت‌کننده صرف می‌شود.

فرمول مفهومی ثبت‌شده:

```text
Full CAC = Actual member acquisition cost
         + Operational costs
         + Adjustment for conversion rate
```

اما Source مقدار نهایی Full CAC تا کاربر پرداخت‌کننده را تکمیل نکرده است.

> ⚠️ Source Conflict
>
> یک بخش از Source Document اعداد زیر را همزمان ارائه می‌کند:
>
> - کل هزینه 4 Campaign: **426,760,000 تومان** معادل **3,185 CAD**
> - کل عضو جذب‌شده: **62 نفر**
> - هزینه جذب هر عضو: **6,883 تومان** معادل **0.051 CAD**
>
> تقسیم مستقیم دو عدد اول، تقریباً **6,883,226 تومان به ازای هر عضو** و تقسیم 3,185 CAD بر 62 تقریباً **51.37 CAD به ازای هر عضو** می‌شود؛ بنابراین با رقم گزارش‌شده 6,883 تومان / 0.051 CAD سازگار نیست.
>
> این مورد نیازمند تصمیم نهایی Product/Business یا اصلاح Source Document است.

## 7. LTV and Break-even

Source تعاریف زیر را ارائه می‌کند:

- **Lifetime Value (LTV):** مجموع درآمدی که یک کاربر طی تمام مدت فعالیت خود در پلتفرم ایجاد می‌کند.
- **Break-even:** نقطه‌ای که درآمد کل پلتفرم هزینه‌های ثابت و CAC را پوشش می‌دهد.

Source روش محاسبه LTV را شروع کرده، اما عدد نهایی LTV یا Break-even را ارائه نکرده است. بنابراین هیچ مقدار جدیدی در این فایل تخمین زده نشده است.

## 8. Existing User Behavior Signals

Status: Source-reported observed community sizes

| حوزه | Community | Members |
|---|---|---:|
| اجاره خانه تورنتو | RentToronto | 34,000 |
| اجاره خانه تورنتو | Toronto_Rental | 21,000 |
| ارسال بار ایران کانادا | BarVaMosaferi | 7,000 |
| ارسال بار ایران آلمان | hilfenChat | 12,000 |

این داده‌ها نشان‌دهنده وجود Communityهای مرتبط هستند، اما Source آن‌ها را به نرخ تبدیل یا درآمد قطعی Advertio تبدیل نکرده است.

## 9. Validation Interpretation Rules

- اعداد Forecast در [Market Sizing](./market-sizing.md) شواهد Validation واقعی نیستند.
- پرداخت $4 در MVP، فقط Listing Publication را Validate کرده است.
- Early Access هنوز Hypothesis درآمدی است.
- Trust-driven transaction uplift هنوز Hypothesis است.
- Retention و Repeat Purchase هنوز نیازمند داده واقعی هستند.
