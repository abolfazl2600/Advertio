# Telegram Notifications

Telegram یکی از Channelهای اصلی Notification در Advertio است.

## Roadmap

### Version 1.0
- Telegram Notifications در MVP Roadmap وجود دارد.

### Version 1.2
- Smart Notifications
- Saved Search + Alerts
- Listing Lifecycle کامل

### Future channel expansion
- Email برای Saved Search در Future ذکر شده است.
- WhatsApp Integration در Version 2.5 ذکر شده است.

## Notification Triggers

Source این Triggerها را ثبت می‌کند:

### Contact / Payment
- درخواست پرداخت Message جدید توسط Applicant به Advertiser
- فقط زمانی که User Coin نداشته باشد و از Advertiser درخواست کند

Source جزئیات دقیق Message payment sponsorship flow را بیشتر تعریف نمی‌کند.

### Saved Search
- Listing جدید مطابق Active Filter
- Telegram Bot برای Alert استفاده می‌شود.

See [Saved Search](./saved-search.md).

### Listing Performance
برای Listing منتشرشده:
- Daily report
- Weekly report
- Total report

Metrics مرتبط:
- Views
- Contact requests / Contact info views
- Click روی راه ارتباطی
- Detail listing view

در Listing Entity گفته شده این Metrics **هر روز** برای User Notification می‌روند، حتی اگر Listing Expired شده باشد، تا **یک ماه**.

### Expiry
- Warning از **3 روز قبل از Expiry**
- Source می‌گوید هر روز ارسال می‌شود.

### Post-expiry Extend reminders
Telegram Bot Workflow می‌گوید:
- پس از Day 30 / Expiry
- Telegram notifications تا **15 روز بعد** ادامه دارند تا User در صورت نیاز Extend کند.

این بازه با Performance-report retention یکی نیست:
- Extend reminders: 15 days
- Performance reports: up to 1 month

### Admin → User
- Admin می‌تواند به User Notification ارسال کند.

### Targeted Promotion
- Notification/advertising هدفمند برای Userهای یک City / Country / Category
- Fee به‌صورت توافقی با Admin
- می‌تواند برای محدوده شهری مشخص ارسال شود.

## Channels Mentioned by Source

بخش Notification می‌گوید Notificationها از طریق:
- Telegram
- WhatsApp
- Email

ارسال می‌شوند.

اما Roadmap:
- WhatsApp Integration را Version 2.5 قرار می‌دهد.
- Saved Search Email را Future معرفی می‌کند.

> ⚠️ Source Conflict
>
> بخش عمومی Notification، Telegram / WhatsApp / Email را به‌عنوان Channelهای ارسال بیان می‌کند.
>
> Roadmap، WhatsApp Integration را به Version 2.5 منتقل می‌کند و بخش Saved Search نیز Email را Future می‌داند.
>
> Availability فعلی این Channelها به‌صورت یکپارچه در Source مشخص نشده است و نیازمند تصمیم Product/Business است.

## Saved Filter Delivery Frequency

در بخش Saved Filters:
- User Filter را در Web App آماده می‌کند.
- با Telegram notification button آن را فعال می‌کند.
- Listingهای جدید مرتبط **هر روز یک بار به‌صورت خلاصه** با Link ارسال می‌شوند.

بخش دیگر Saved Search می‌گوید هنگام وجود Listing جدید مطابق Search، User مطلع می‌شود.

Source زمان دقیق Event-based alert در برابر Daily digest را به‌عنوان Conflict صریح تعیین نکرده است؛ Daily summary Rule حفظ شده است.

## Admin Channel Publishing

Notification با Channel publishing یکی نیست، اما Telegram در Distribution نیز استفاده می‌شود:
- Admin با Attribute/Tag مشخص می‌کند چه Listingهایی در چه Telegram Channelهایی منتشر شوند.
- Translation برای این Flow در Future اضافه می‌شود.
