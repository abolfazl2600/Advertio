# Moderation

Moderation در نسخه اولیه Advertio عمدتاً Human-operated است. Source Document تأیید Admin قبل از انتشار Listing را Rule اجباری می‌داند.

## Current listing moderation workflow

```text
User completes listing
→ Preview & Confirm
→ Status: Pending
→ Admin moderation
→ content review
→ Approve or Reject
→ if approved: publish and start listing lifecycle
```

### Mandatory rule
- Admin approval قبل از Publication الزامی است.

### Listing outcomes present in Source
- Pending
- Approved
- Rejected
- Expired
- Extend
- Boost and Urgent

در Workflow از `Published` نیز پس از Approval استفاده شده است؛ Conflict آن در [Listings](./listings.md) ثبت شده است.

## Initial operational model

در نسخه اولیه موارد زیر به‌صورت دستی توسط Operations Team انجام می‌شوند:
- Listing approval
- User identity verification
- Document review

هدف اعلام‌شده:
- Product hypothesis validation
- جمع‌آوری Real Data
- جلوگیری از توسعه زودهنگام سیستم‌های پیچیده

## Verification moderation

بعضی Verificationها به Admin/Operator وابسته‌اند:
- Video Verification در بخش‌هایی از Source به‌صورت Operator/manual تعریف شده است.
- Financial verification در بخشی به تأیید Admin یا System اشاره می‌کند.
- Cargo ticket Verified توسط Admin Support انجام می‌شود.
- Userهای دارای Phone number خارج از Iran/Canada در Registration flow وارد Waitlist می‌شوند تا Admin تأیید کند.

Version conflicts این موارد در [Verification](./verification.md) ثبت شده است.

## Crawled listing quality control

قبل از ورود Crawled Data به Platform:
- چند مرحله Processing و Quality Control انجام می‌شود.
- فقط Listingهایی با «کیفیت مجاز» منتشر می‌شوند.

Source معیارهای دقیق Quality، Score threshold، Reject reason یا Queue workflow را تعریف نکرده است؛ بنابراین چیزی اضافه نشده است.

### Crawled listing restrictions
برای Crawled Listing:
- Monetization Advertio فعال نیست.
- Internal Chat فعال نیست.
- Review فعال نیست.
- Escrow فعال نیست.
- User مستقیماً به Telegram account Advertiser Redirect می‌شود.

اگر Advertiser به Advertio join کند:
- Crawled Listing جدید از آن User دیگر نباید خودکار ثبت شود.
- User از آن پس Listing را خودش ثبت می‌کند.
- Listingهای قبلی می‌توانند History باقی بمانند.

## Reports / disputes / trust signals

Source از Report و Dispute در Trust rules استفاده می‌کند:
- Top Rated: بدون Dispute یا Report
- Peer Exchange proposed rule: User نباید Report/Review کمتر از 2 ستاره داشته باشد

اما Source Workflow مدیریت Report/Dispute در Backoffice، Statusها، Evidence handling یا Appeal را تعریف نکرده است.

## Future moderation

### Version 1.5
- Fraud Detection پایه
- Manual Verification Workflow
- Trust Foundation

### Later phases
- Automation تأیید Listing
- Advanced Fraud Detection
- سرویس‌های تخصصی Verification
- AI Moderation

Source می‌گوید پس از رسیدن به Operational KPIهای از پیش تعریف‌شده، Automation تدریجی انجام می‌شود و Human operator به Exceptionها محدود خواهد شد.

> اطلاعات کافی برای تعریف KPI thresholdهای دقیق، Moderation SLA، Reject reason taxonomy یا Appeal workflow در Source Document فعلی وجود ندارد.
