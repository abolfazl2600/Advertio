# Analytics

این فایل شاخص‌هایی را که Source Document برای Backoffice/Admin Dashboard، Listing Analytics، Wallet/Revenue Analytics و Validation ثبت کرده است نگهداری می‌کند.

## Product / Listing analytics

### Listing metrics
برای هر Listing این Metrics تعریف شده‌اند:
- Impression — مجموع نمایش در Searchها
- Detail View — تعداد بازشدن Listing
- Contact Requests Count — تعداد کاربرانی که درخواست مشاهده Contact info داشته‌اند

در Workflow یک نام دیگر نیز آمده است:
- Reaching views

Source رابطه دقیق `Reaching views` با `Impression` را تعریف نکرده است؛ بنابراین این دو اصطلاح بدون ادغام نگهداری می‌شوند.

### Reporting to listing owner
Source چند نوع گزارش را ذکر می‌کند:
- گزارش روزانه Performance
- گزارش هفتگی
- گزارش کل
- Daily notification در Telegram برای Listing Performance
- ادامه گزارش پس از Expiry برای یک بازه محدود؛ جزئیات متناقض در [Notifications](./notifications.md) ثبت شده است.

نمونه داده‌های گزارش:
- تعداد بازدید
- تعداد مشاهده اطلاعات تماس
- تعداد کلیک روی راه ارتباطی
- Contact Requests
- Detail View

### Versioning
- Version 1.1: Listing Analytics پایه — تعداد بازدید و درخواست تماس
- Version 1.2: Response Metrics و Listing Lifecycle کامل با گزارش روزانه
- Version 3.0: Business Analytics + Enterprise Dashboard

## Wallet / revenue dashboard

### Revenue Metrics
Source برای Dashboard موارد زیر را مشخص کرده است:
- Total Revenue
- Revenue per Package
- Average Purchase Value
- Monthly Recurring Revenue

### Conversion Metrics
- تعداد Userهایی که Packageها را مشاهده کرده‌اند
- تعداد Userهایی که Coin خریده‌اند
- Purchase Conversion Rate
- Repeat Purchase Rate

Source فرمول دقیق MRR یا سایر Metricها را تعریف نکرده است؛ فقط نام Metricها ثبت شده است.

## Response Metrics

Source این مفهوم را صرفاً آمار ساده نمی‌داند و آن را بخشی از سنجش Trust و کیفیت Interaction می‌داند.

### Last Activity
نمونه:
- «6 ساعت قبل کاربر آنلاین بوده»
- اگر بیش از 3 روز Activity در Bot یا Website ثبت نشده باشد: «بیشتر از سه روز»

User Entity همچنین شامل:
- Deals Count
- Average Rating از 5
- Reviews

## Saved Search analytics / admin visibility

- Active Saved Filters باید در Admin Panel قابل نمایش باشند.
- Match threshold ثبت‌شده در Source: اگر Listing حدود 70% با Filter شخص نزدیک باشد برای User ارسال شود.
- قابلیت تنظیم درصد Match توسط User برای Version فعلی وجود ندارد و برای آینده ذکر شده است.

## Market / MVP validation data

### Status: Validated
Source نتایج اجرای MVP اولیه در بازه 4 ماه را به‌عنوان داده واقعی ارائه کرده است:

| شاخص | مقدار |
|---|---:|
| مدت اجرای MVP | 4 ماه |
| اعضای Telegram channel | 272 |
| درخواست مستقیم ثبت Listing به Admin | 38 |
| کاربران پرداخت‌کننده | 2 |
| مبلغ پرداخت هر Listing | $2 |
| مجموع درآمد اولیه | $4 |
| مدل پرداخت | انتشار Listing در Website + Telegram Bot + Telegram Channel |

محاسباتی که خود Source ارائه می‌کند:
- Interaction: 38 / 272 = 13.9%، حدود 14%
- Paid conversion: 2 / 38 = 5.2%

Source تصریح می‌کند که این نتیجه فقط نشان می‌دهد User برای ثبت و انتشار Listing پول پرداخت کرده است؛ willingness-to-pay برای مشاهده Contact info هنوز اثبات نشده است.

همچنین Source می‌گوید جامعه اولیه احتمالاً Warm Audience بوده، چون بخشی از تبلیغات Targeted بوده است.

## Acquisition cost data

### Status: Validated data / source-reported calculation

Source برای 4 Campaign این اعداد را ثبت کرده است:
- Total cost: 426,760,000 تومان
- معادل اعلام‌شده: 3,185 CAD
- Total acquired channel members: 62
- Source-reported acquisition cost per member: 6,883 تومان
- معادل اعلام‌شده: 0.051 CAD

> ⚠️ Source Conflict
>
> مقدار Total cost برابر 426,760,000 تومان و تعداد عضو 62 نفر ثبت شده است.
>
> تقسیم مستقیم این دو عدد تقریباً 6,883,226 تومان به‌ازای هر عضو می‌شود، اما Source مقدار 6,883 تومان را ثبت کرده است.
>
> هیچ‌یک از اعداد اصلاح نشده‌اند؛ این مورد نیازمند بررسی Source/Business است.

## Market Validation: Existing User Behavior

Source اندازه چند Community را به‌عنوان شواهد رفتار موجود کاربر ثبت کرده است:

| حوزه | Community | Members |
|---|---|---:|
| اجاره خانه تورنتو | RentToronto | 34,000 |
| اجاره خانه تورنتو | Toronto_Rental | 21,000 |
| ارسال بار ایران–کانادا | BarVaMosaferi | 7,000 |
| ارسال بار ایران–آلمان | hilfenChat | 12,000 |

این اعداد در Source به‌عنوان Market Validation آمده‌اند و معادل Metric عملیاتی داخلی Advertio نیستند.
