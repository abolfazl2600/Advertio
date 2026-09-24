# Unit Economics

## Core Definitions

### CAC — Customer Acquisition Cost
مجموع هزینه‌هایی که برای جذب، ثبت‌نام و تبدیل یک User به حالت Active و Paying صرف می‌شود.

### LTV — Lifetime Value
مجموع درآمدی که یک User در تمام مدت فعالیت خود در Platform ایجاد می‌کند.

### Break-even
نقطه‌ای که Revenue کل Platform همه هزینه‌ها، شامل Fixed Costs و CAC، را پوشش می‌دهد.

## CAC — Source Data

Status: Validated — campaign data reported in Source

Source برای 4 Campaign این داده‌ها را ثبت می‌کند:
- Total spend: **426,760,000 تومان**
- معادل ذکرشده: **3,185 CAD**
- Total acquired channel members: **62**
- Stated acquisition cost per channel member: **6,883 تومان**
- معادل ذکرشده برای هر عضو: **0.051 CAD**

Source همچنین فرمول CAC کامل را این‌گونه بیان می‌کند:

    Full CAC = actual member acquisition cost + operational costs + conversion-rate adjustment

و Base acquisition cost را دوباره **6,883 تومان** می‌نویسد.

> ⚠️ Source Conflict
>
> Total spend، تعداد 62 عضو، و CAC per member که در Source نوشته شده‌اند از نظر محاسباتی با یکدیگر سازگار نیستند؛ همین ناسازگاری در معادل‌های CAD نیز دیده می‌شود.
>
> این سند مقدار جایگزین محاسبه یا انتخاب نمی‌کند و اعداد Source را همان‌طور که ثبت شده‌اند حفظ می‌کند.
>
> این مورد نیازمند بررسی و تصمیم نهایی Product/Business است.

## CAC Scenarios

Source عنوان «سناریوها و نحوه محاسبه دقیق» را دارد، اما مقادیر/سناریوهای تکمیلی در Source Document فعلی ارائه نشده‌اند.

## LTV Calculation

Source تعریف LTV و عنوان «روش محاسبه» را ارائه می‌کند، اما فرمول یا مقادیر عددی تکمیلی برای LTV در Source Document فعلی وجود ندارد.

## Break-even

Source تعریف Break-even را ارائه می‌کند، اما Break-even point عددی محاسبه‌شده ارائه نمی‌کند.

## Burn Rate Inputs

مهم‌ترین هزینه‌های Initial Version:
- Infrastructure
- Domain & Services
- Manual listing approval operations
- Verification operations
- User support
- Application development
- Customer acquisition / advertising

Source مقدار ماهانه یا Burn Rate عددی برای این هزینه‌ها ارائه نمی‌کند.

## Revenue / Conversion Metrics Required

### Revenue Metrics
- Total Revenue
- Revenue per Package
- Average Purchase Value
- Monthly Recurring Revenue

### Conversion Metrics
- Users viewing Packages
- Users purchasing Coin
- Purchase Conversion Rate
- Repeat Purchase Rate

## Historical MVP Results

Status: Validated — results reported in Source

Rental Housing Canada MVP:
- Duration: 4 months
- Telegram Channel members: 272
- Direct listing requests to Admin: 38
- Paying users: 2
- Payment per listing: $2
- Initial revenue: $4
- Payment model: publication on Website + Telegram Bot + Telegram Channel

Source calculations:
- Engagement: 38 / 272 = 13.9%
- Payment conversion: 2 / 38 = 5.2%

Source notes the initial audience was probably a Warm Audience because part of acquisition was targeted advertising.

## What Was / Was Not Validated

### Validated
The MVP shows actual payment by two Users for **listing publication**.

### Not Validated
Source explicitly states this does **not** prove willingness-to-pay for **contact viewing / Early Access**.

## Pricing Link

Pricing Policy says final prices should be informed by Unit Economics results alongside Country, Category, Supply/Demand and User behavior.

See [Pricing](./pricing.md).
