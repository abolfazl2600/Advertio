# Business KPIs

این فایل KPIها و معیارهای سطح Business را فقط بر اساس Source Document ثبت می‌کند. اعداد Scenario، Target و Result از یکدیگر تفکیک شده‌اند و هیچ مقدار بیرونی به آن‌ها اضافه نشده است.

## MVP success criteria

### Version 1.0 targets

Source برای Version 1.0 دو معیار موفقیت صریح تعریف می‌کند:

| KPI | Target |
|---|---:|
| Real Listings Published | حداقل 50 |
| Registered Users | حداقل 200 |

هدف این Version:
- راه‌اندازی سریع اولین Marketplace
- تست مدل

این اعداد Target هستند، نه Result واقعی. نتایج واقعی اجرای MVP در [MVP Results](./mvp-results.md) ثبت شده‌اند.

## Core business economics definitions

Source سه مفهوم را تعریف می‌کند:

### Customer Acquisition Cost (CAC)
مجموع هزینه‌هایی که برای جذب، ثبت‌نام و تبدیل یک User به حالت Active و Paying صرف می‌شود.

### Lifetime Value (LTV)
مجموع Revenue ایجادشده توسط یک User در کل مدت فعالیت او در Platform.

### Break-even
نقطه‌ای که Total Revenue همه Costها، شامل Fixed Costs و CAC، را پوشش می‌دهد.

## CAC calculation model

Source این Formula را ثبت می‌کند:

```text
Full CAC
= actual member acquisition cost
+ operational costs
+ adjustment based on conversion rate
```

Source یک «Base acquisition cost» برابر 6,883 تومان ثبت کرده است، اما داده‌های همان بخش با این مقدار ناسازگاری محاسباتی دارند. جزئیات در [Marketing KPIs](./marketing-kpis.md).

### Data gap

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

بخش‌های «سناریوها و نحوه محاسبه دقیق» برای Full CAC و «روش محاسبه» LTV در Source خالی مانده‌اند. بنابراین:
- Full CAC نهایی قابل محاسبه از Source نیست.
- LTV واقعی یا Formula کامل آن ارائه نشده است.
- Break-even واقعی محاسبه نشده است.

## Initial burn-rate cost categories

Source برای نسخه اولیه مهم‌ترین Costها را این موارد می‌داند:
- Infrastructure
- Domain & Services
- عملیات دستی تأیید Listingها
- عملیات Verification
- User Support
- Application Development
- Customer Acquisition و Advertising

Source برای این Costها Amount یا Monthly Burn Rate ارائه نکرده است.

## Unit Economics inputs explicitly referenced

Pricing قرار است بر اساس این عوامل بازنگری شود:
- Country
- Category
- Supply & Demand
- User behavior
- Unit Economics results

Source می‌گوید قیمت‌ها در Versionهای مختلف چندبار بازنگری خواهند شد تا تعادل میان:
- Conversion Rate
- Revenue
- User Satisfaction

ایجاد شود.

## Business-scale scenario metrics

برای بازار Rental Canada، Source سه Scenario ارائه می‌کند. این‌ها Scenario/Estimate هستند و Result واقعی نیستند:

| Scenario | Telegram-user capture | MAU | Active Listings |
|---|---:|---:|---:|
| Pessimistic | 5% | ~150,000 | ~7,000–8,000 |
| Realistic | 7.5% | ~225,000 | ~11,000 |
| Optimistic | 10% | ~300,000 | ~15,000 |

در Realistic scenario، Source فرض می‌کند فقط 5% از Users Listing ثبت کنند.

## Operating KPI dependency

Source می‌گوید فرآیندهای دستی مانند:
- Listing approval
- User Verification
- Document review

پس از رسیدن Platform به «Operational KPIs از پیش تعریف‌شده» به‌تدریج خودکار خواهند شد.

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Threshold یا نام دقیق این Operational KPIها در Source تعریف نشده است.

## Related metric files

- [Marketplace KPIs](./marketplace-kpis.md)
- [Marketing KPIs](./marketing-kpis.md)
- [Revenue KPIs](./revenue-kpis.md)
- [Product KPIs](./product-kpis.md)
- [Retention](./retention.md)
- [MVP Results](./mvp-results.md)
