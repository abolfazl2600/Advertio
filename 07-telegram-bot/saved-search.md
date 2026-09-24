# Saved Search + Alerts

## Roadmap

Saved Search + Alerts در **Version 1.2 — Core Experience & Ranking** قرار گرفته است.

در بخش MVP vs Future، Saved Filters در **Phase 2** آمده است.

## User Flow

Source دو بخش مکمل برای Flow ارائه می‌کند:

1. User Filterهای مورد نیاز را در Web App آماده می‌کند.
2. Telegram notification button را فعال می‌کند.
3. Filter / Search ذخیره می‌شود.
4. وقتی Listing جدید به Search نزدیک یا مطابق باشد، Telegram Bot به User اطلاع می‌دهد.

Example:
- Housing
- Toronto
- Price under / between specific values
- Female roommate preference

## Matching Rule

Source می‌گوید:
- User فقط یک بار Filter را Save می‌کند.
- اگر Listing حدود **70%** به Filter User نزدیک باشد، برای User ارسال می‌شود.

Future:
- درصد Match توسط User قابل تنظیم خواهد بود.
- این قابلیت در Version فعلی وجود ندارد.

## Delivery

در بخش Saved Filters:
- Alertها از Telegram Bot ارسال می‌شوند.
- **روزانه یک بار**
- به‌صورت Summary
- همراه Link Listingها

در بخش Saved Search، بیان عمومی این است که اگر Listing جدید مطابق Search وجود داشته باشد، System اطلاع می‌دهد.

## No-result Behavior

اگر Listing مناسب برای User ارسال نشود:
- System پیشنهاد می‌دهد Active Filterها را کاهش / Relax کند.
- هدف: Resultهای بیشتری ایجاد شود.

Example:
- Housing in Toronto
- Price 1000–1500

## Admin Visibility

Active Filters در Admin Panel قابل مشاهده هستند.

## Email

### Current
Telegram Bot Channel صریحاً برای Saved Search notification ذکر شده است.

### Future
User در آینده می‌تواند Email خود را برای دریافت Notification اضافه کند.

## AI Relation — Future

AI Recommendation Assistant در Future امکان Save کردن Request برای Notification Listingهای جدید را نیز ذکر می‌کند.

Source این AI flow را جایگزین Saved Search فعلی معرفی نمی‌کند؛ فقط قابلیت Future مرتبط است.
