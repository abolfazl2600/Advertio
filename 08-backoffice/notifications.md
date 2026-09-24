# Notifications

Source Document Notificationها را در چند بخش تعریف کرده است: lifecycle، Saved Search، Listing analytics، Wallet و پیام‌های Admin.

## Notification channels

Channelهایی که در Source نام برده شده‌اند:
- Telegram
- WhatsApp
- Email

### Versioning
- Version 1.0: Telegram Notifications
- Version 1.2: Saved Search + Alerts و Smart Notifications
- Version 2.5: WhatsApp Integration
- Saved Search section: Email برای آینده

> ⚠️ Source Conflict
>
> بخش عمومی «سیستم نوتیفیکیشن» می‌گوید Notificationها از طریق Telegram، WhatsApp و Email ارسال می‌شوند.
>
> Roadmap، WhatsApp Integration را در Version 2.5 قرار می‌دهد و بخش Saved Search نیز Email را برای آینده ذکر می‌کند.
>
> بنابراین availability فعلی هر سه Channel در Source یکدست نیست و نیازمند تصمیم Version scope است.

## Notification triggers

Source این Triggerها را ثبت کرده است:
- درخواست پرداخت پیام جدید توسط متقاضی به Advertiser، فقط وقتی User Coin ندارد و از Advertiser درخواست می‌کند.
- Listing جدید مطابق Filter فعال.
- Listing performance report.
- هشدار Expiry.
- Admin-to-user notification.
- Targeted advertising بر اساس Geography/Category.
- اطلاع به Advertiser درباره پایان Early Access و ورود Listing به نمایش عمومی.
- Low Wallet balance.

## Listing performance notifications

Source گزارش‌های زیر را ذکر می‌کند:
- Daily
- Weekly
- Total

Metrics:
- Views
- Contact info views / Contact Requests
- Click روی Contact method
- Detail View

در یک بخش گفته شده این Metrics هر روز برای User Notification می‌رود، حتی اگر Listing Expired باشد، تا یک ماه.

## Expiry notifications

- 3 روز قبل از Expiry هشدار داده می‌شود.
- Source می‌گوید این هشدار «هر روز» ارسال می‌شود.
- در Workflow، بعد از Expiry نیز Telegram notifications برای پیشنهاد Extend تا 15 روز ذکر شده است.

> ⚠️ Source Conflict
>
> یک بخش می‌گوید Performance notification/report حتی پس از Expiry تا یک ماه ادامه دارد.
>
> Workflow دیگری می‌گوید Telegram notification بعد از Expiry تا 15 روز ادامه دارد تا User برای Extend اقدام کند.
>
> Source مشخص نکرده این دو بازه دو Notification type متفاوت‌اند یا یک Rule واحد؛ هر دو حفظ شده‌اند.

## Saved Search + Alerts

Flow:
1. User Filterهای مورد نیاز را در Web App می‌سازد.
2. User دکمه Notification در Telegram را فعال می‌کند.
3. در صورت Listing جدید مطابق Filter، سیستم Notification می‌دهد.
4. در یک بخش گفته شده روزی یک بار Summary شامل Linkها ارسال می‌شود.
5. اگر نتیجه‌ای ارسال نشود، سیستم پیشنهاد می‌دهد Filterها کمتر/بازتر شوند.
6. Match rule ثبت‌شده: Listing با حدود 70% تطابق با Filter User می‌تواند ارسال شود.
7. تنظیم Match percentage توسط User برای Version فعلی نیست و Future ذکر شده است.
8. Email برای Saved Search در آینده قابل اضافه‌شدن است.
9. Active Saved Filters در Admin Panel قابل مشاهده‌اند.

نمونه Source:
- Toronto housing
- زیر 1500 دلار
- roommate gender = Female

## Admin notifications

Admin می‌تواند:
- به User اطلاع‌رسانی کند.
- Targeted message/advertisement را برای Userهای یک محدوده، Category، City یا Country ارسال کند.
- هزینه Targeted advertising در Source «توافقی با Admin» ذکر شده است.

Source workflow Approval برای ارسال Mass Notification، rate limit یا opt-out policy را تعریف نکرده است.

## Wallet low-balance notification

Trigger:
```text
Balance < Required Coins
```

Message:
> Your wallet balance is low. Recharge your wallet to continue.

Action:
- View Packages

## Early Access lifecycle communication

در lifecycle model مربوط به Early Access، Advertiser مطلع می‌شود که:
- پس از پایان Early Access، Listing وارد نمایش عمومی می‌شود.
- برای حفظ جایگاه/visibility بیشتر می‌تواند Upgradeهایی مثل Boost استفاده کند.

Conflict اصلی Early Access timing در [Listings](./listings.md) نگهداری شده است.
