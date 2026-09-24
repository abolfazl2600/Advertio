# User Profile

Telegram Bot Main Menu شامل گزینه **My Profile** است.

Source UI دقیق Profile داخل Bot را کامل تعریف نمی‌کند، اما User Entity و داده‌هایی که باید در Profile/History وجود داشته باشند مشخص شده‌اند.

## Base Information

User Entity:
- First name
- Last name
- Profile photo
- Verified mobile number
- Country flag based on phone number
- Join date

## Location

- Country
- Province / State
- City
- Area — optional

## Trust Layer

Verification statusهای تعریف‌شده:
- Phone Verified
- National ID Verified
- Video Verified
- GPS Verified
- Document Verified
- Social Media Verified
- Financial Verified
- Cargo ticket Verified

همه این Verificationها در Version 1 در دسترس نیستند.

جزئیات Versioning و Source Conflictها در [Verification](./verification.md).

## Badges

Source Badgeهای زیر را تعریف می‌کند:
- Top Rated
- Financial Verified
- Phone Verified
- Quick Responder
- New Member
- 1 Year Member
- 10 Deals
- +20 Deals

Source می‌گوید Badgeها در Versionهای مختلف اضافه می‌شوند و در Version اول همه آن‌ها وجود ندارند.

### Top Rated
شرایط:
- Average Rating ≥ 4.5 / 5
- حداقل 15 Review
- بدون Dispute یا Report

### Financial Verified
در یک بخش Source:
- حداقل یک Bank Account یا Bank Card توسط System یا Admin تأیید شده باشد.

Availability این Verification در Source Conflict دارد؛ See [Verification](./verification.md).

## Performance Metrics

### Last Active
نمایش مورد انتظار:
- Online
- چند ساعت قبل Online بوده
- اگر بیش از 3 روز هیچ Activity در Bot یا Website نداشته باشد: «بیشتر از سه روز»

### Deals Count
تعداد Dealهای موفقی که طرفین آن را تأیید کرده‌اند.

### Average Rating
میانگین Rating از 5.

### Reviews
Reviewهای ثبت‌شده برای User.

## Activity

### Listing History
Source می‌گوید:
- Expired Listings در History User باقی می‌مانند.
- بدون Early Access فقط Preview نمایش داده می‌شود.
- پس از Early Access، Ratingها، Commentها و Listingهای قدیمی کامل قابل مشاهده می‌شوند.

Source دقیقاً مشخص نمی‌کند این Early Access مربوط به Profile History چگونه با Early Access Contact Listingها مرتبط است.

### Total Listings
تعداد کل Listingهای انجام‌شده.

### Active Listings
Listingهای فعال User.

## Social & Contact

Source این بخش را برای Version فعلی «وجود ندارد» توصیف می‌کند و برای Versionهای بعدی این Social Networkها را ذکر می‌کند:
- Instagram
- Facebook
- LinkedIn
- Telegram

Email نیز در همین حوزه ذکر شده است.

### Social verification reward references
- هر Social Network قابل احراز و متعلق به User: 1 Coin
- Verified university/work email: 5 Coin
- Public email: بدون Coin reward
- Facebook login در Social Proof Loop: 5 Coin

Source مشخص نمی‌کند Facebook Login reward و Social Network verification reward یک Trigger هستند یا دو Trigger جدا؛ هر دو Reference حفظ می‌شوند.

## My Listings Relation

Main Menu گزینه **My Listings** نیز دارد.

اطلاعات Source-derived مرتبط:
- Active Listings
- Expired / Listing History
- Listing Performance
- Boost
- Expiry / Extend
- Post-deal Review

## Review / Deal Flow

Review پس از تأیید Deal توسط هر دو طرف قابل ثبت است.

User می‌تواند:
- Review ثبت کند.
- Rating از 5 بدهد.
- Comment اختیاری ثبت کند.

در بعضی Monetization flowها، User واجد شرایط بابت Review بعد از Deal یک Coin دریافت می‌کند.
