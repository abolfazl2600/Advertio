# Backoffice Overview

Backoffice در Advertio لایه عملیاتی و مدیریتی پلتفرم است که برای کنترل کیفیت Marketplace، تأیید آگهی‌ها، احراز هویت، مدیریت Wallet و Pricing، انتشار در کانال‌ها، Notification و مشاهده Analytics استفاده می‌شود.

## Source-defined scope

در ساختار اصلی محصول، Backoffice صراحتاً برای «کنترل پلتفرم و تأیید آگهی‌ها» در نظر گرفته شده است. در نسخه اولیه، بخش قابل‌توجهی از عملیات عمداً دستی است تا فرضیات محصول با داده واقعی اعتبارسنجی شوند و توسعه سیستم‌های پیچیده زودهنگام انجام نشود.

### Version 1.0 — Minimum Viable Marketplace

طبق Roadmap نسخه 1.0:
- Admin Panel برای تأیید دستی آگهی وجود دارد.
- Phone Verification وجود دارد.
- Telegram Notifications وجود دارد.
- Telegram Crawler Integration برای عرضه اولیه وجود دارد.
- Listing Lifecycle پایه شامل ثبت → Pending → Approved → Expired است.
- Housing (Rental & Roommate) تمرکز اصلی دسته‌بندی است.

### Operational processes in the initial version

فرآیندهای زیر در نسخه اولیه به‌صورت دستی توسط تیم عملیات انجام می‌شوند:
- تأیید آگهی‌ها
- احراز هویت کاربران
- بررسی مدارک

پس از رسیدن به Operational KPIهای از پیش تعریف‌شده، این فرآیندها قرار است به‌تدریج با سرویس‌های تخصصی و AI جایگزین شوند؛ Source به Persona، Veriff، Jumio، Moderation و Fraud Detection اشاره می‌کند. در آن وضعیت، نقش اپراتور انسانی باید به موارد استثنا محدود شود.

## Backoffice capability map

| حوزه | مسئولیت‌های صریح در Source |
|---|---|
| Listings | بررسی Pending، تأیید/رد، کنترل یک آگهی فعال در هر دسته، lifecycle، Boost/Urgent/Extend |
| Moderation | بررسی دستی محتوا، کنترل کیفیت داده‌های Crawler، بررسی مدارک و بعضی Verificationها |
| Users | مشاهده وضعیت Verification و Activity، رسیدگی به کاربران خارج از ایران/کانادا در Waitlist |
| Verification | Phone، Video و سایر لایه‌ها با درجات مختلف دستی/آینده |
| Wallet | مشاهده موجودی، اضافه/حذف Coin، مشاهده Transaction History |
| Pricing | تنظیم داینامیک هزینه Early Access، Boost، Extend، Urgent و سایر خدمات |
| Transactions | مشاهده User ID، Transaction ID، Payment Status، Amount، Date و Gateway Reference |
| Channels | تعریف Rule انتشار بر اساس Attribute/Tag و Channel مقصد |
| Notifications | Admin-to-user message، Saved Search alert، lifecycle/report notifications و تبلیغ هدفمند |
| Analytics | Listing metrics، Revenue metrics، Conversion metrics و داده‌های validation |
| Categories | ساختار Category/Subcategory و Attribute/Tagهای مرتبط؛ ساختار کلی در Source «قابل اصلاح» توصیف شده است |

## Current vs future operating model

### Initial / manually operated behavior
- تأیید آگهی قبل از انتشار الزامی است.
- بخشی از Verificationها و بررسی مدارک دستی هستند.
- بعضی روش‌های پرداخت در نسخه اول دستی بررسی می‌شوند.
- Crawler فقط برای Cold Start است و Core Platform محسوب نمی‌شود.

### Future behavior
- خودکارسازی Moderation و Verification.
- Fraud Detection پیشرفته.
- Multi-language و ترجمه خودکار.
- Business Analytics + Enterprise Dashboard در Version 3.0.
- Business Verification در Version 3.0.
- نقش اپراتور انسانی محدود به Exceptionها.

> ⚠️ Source Conflict
>
> Roadmap، Wallet + Coin System را در Version 1.1 قرار داده و Version 1.0 را بدون آن تعریف می‌کند.
>
> در بخش «اولویت‌بندی فیچرها (MVP vs Future)»، سیستم سکه جزو MVP ذکر شده است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Related documents

- [Users](./users.md)
- [Verification](./verification.md)
- [Listings](./listings.md)
- [Moderation](./moderation.md)
- [Categories Management](./categories-management.md)
- [Channels Management](./channels-management.md)
- [Notifications](./notifications.md)
- [Wallet Management](./wallet-management.md)
- [Transactions](./transactions.md)
- [Pricing Management](./pricing-management.md)
- [Analytics](./analytics.md)
- [Permissions](./permissions.md)
