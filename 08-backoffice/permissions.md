# Permissions

Source Document یک RBAC یا Permission Matrix رسمی تعریف نکرده است. این فایل فقط Actorها و Actionهایی را ثبت می‌کند که صراحتاً در Source به آن‌ها نسبت داده شده‌اند.

## Source-defined administrative actors

### Admin / مدیر سیستم

Actionهای صریح:
- Approve یا Reject کردن Listing قبل از Publication
- تأیید Userهای Waitlist در Registration flow
- انجام یا پشتیبانی از بعضی Verificationها
- بررسی Documents در نسخه اولیه
- مشاهده Wallet balance کاربران
- اضافه‌کردن Coin به‌صورت دستی
- حذف Coin
- مشاهده Transaction History
- مدیریت Coin Package:
  - Create
  - تغییر Price
  - تغییر Coin amount
  - تعیین Bonus
  - Active / Inactive
- مشاهده Transaction data
- تنظیم Dynamic Pricing برای Serviceها
- تنظیم Boost/Urgent fee به تفکیک Category
- تنظیم Extend fee
- تنظیم Verification reward amounts در بخش‌هایی از Source
- تعریف Channel routing بر اساس Attribute/Tag
- مشاهده Active Saved Filters
- ارسال Admin-to-user notification
- اجرای Targeted advertising با هزینه توافقی

### Operations Team / Human Operator

در نسخه اولیه:
- Listing approval
- User verification
- Document review

Source می‌گوید این نقش با Automation تدریجی به Exception handling محدود خواهد شد.

### Admin Support

Source برای Cargo ticket Verified می‌گوید:
- توسط Admin Support انجام می‌شود.
- هزینه 20 Coin دارد.

همچنین در Bot workflow، اگر User در Category یک Listing فعال داشته باشد، Warning می‌گیرد و به Admin/Support ارجاع داده می‌شود.

## User-side capability boundaries relevant to Backoffice

- User نمی‌تواند Listing را بدون Admin approval منتشر کند.
- فقط یک Active Listing در هر Category Rule اصلی است؛ رفتار Exception/paid override در Source متناقض و در [Listings](./listings.md) ثبت شده است.
- بعضی Verificationها اختیاری‌اند و Trust را افزایش می‌دهند.
- بعضی Contact accessها به Coin/Verification وابسته‌اند.

## Future reduction of human permissions

پس از رسیدن به Operational KPIهای تعریف‌شده:
- Verification services
- AI Moderation
- Fraud Detection

قرار است بخشی از کار Human Operator را جایگزین کنند، و نقش Human به موارد Exception محدود شود.

## Not specified in Source

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source موارد زیر را مشخص نکرده است:
- نام Roleهای رسمی سیستم
- Super Admin vs Admin
- granular permissions
- Role assignment flow
- approval hierarchy
- audit log permission
- session/security policy برای Backoffice
- read-only roles
- permission inheritance

بنابراین هیچ Role یا Permission اضافی فرض نشده است.
