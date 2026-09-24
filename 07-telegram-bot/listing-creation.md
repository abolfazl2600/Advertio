# Listing Creation

این فایل Workflow ثبت Listing از طریق Telegram Bot را طبق Source Document ثبت می‌کند.

## Preconditions

- User ثبت‌نام کرده باشد.
- Phone Verification اجباری انجام شده باشد.
- Admin approval قبل از Publication الزامی است.
- فقط یک Listing فعال در هر Category برای هر User مجاز است.

## Flow

### 1. Post Listing
User از Main Menu گزینه **Post Listing** را انتخاب می‌کند.

### 2. Category Selection
Categoryهای نمایش‌داده‌شده در Bot Workflow:
- Housing
- Jobs
- Services
- Cargo
- Social and Event

### 3. Eligibility Check

سیستم بررسی می‌کند:

#### Active Listing in Category
- اگر User در Category انتخاب‌شده Listing فعال دارد:
  - Warning نمایش داده می‌شود.
  - Message / Support path برای تماس با Admin ارائه می‌شود.
- اگر Listing فعال ندارد:
  - Flow ادامه پیدا می‌کند.

#### Crawler History
سیستم بررسی می‌کند آیا Listing قبلاً توسط Crawler ثبت شده است:
- Yes → User قابلیت ثبت Listing دارد.
- No → User نیز قابلیت ثبت Listing دارد.

بنابراین وجود Crawled Listing قبلی مانع Post Listing نیست.

### 4. Step-by-Step Listing Form

#### Step 1 — Title
User عنوان را وارد می‌کند.

#### Step 2 — Description
User توضیحات کامل را وارد می‌کند.

#### Step 3 — Images
User تصاویر را Upload می‌کند.

#### Step 4 — Location
- Country — خودکار
- Province / State
- City
- Area — optional
- امکان ارسال Location در Telegram برای ثبت در سیستم

#### Step 5 — Category-specific optional fields
Source مثال می‌زند:
- Price range
- Area size برای Housing
- Job type برای Jobs
- Origin
- Destination
- Date
- و Fieldهای وابسته به Category

### 5. Preview & Confirmation

Preview Listing نمایش داده می‌شود.

Actions:
- Edit
- Confirm ✅

### 6. Submission

پس از Confirm:
- Status = **Pending**
- Listing برای Admin Review ارسال می‌شود.

### 7. Admin Moderation

Backend:
- Content review
- Approve یا Reject

### 8. Publish

اگر Listing تأیید شود:
- Workflow Source وضعیت را **Published** می‌نامد.
- Listing Lifecycle شروع می‌شود.
- Source در بخش Listing Entity وضعیت **Approved** را نیز ثبت می‌کند.

> ⚠️ Source Conflict
>
> در Listing Entity، وضعیت بعد از تأیید Admin با نام **Approved** ثبت شده است.
>
> در Telegram Bot workflow، نتیجه تأیید Admin با وضعیت **Published** نوشته شده است.
>
> Source مشخص نمی‌کند Published یک Status مستقل است یا نام عملیاتی Approved.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## One Active Listing Rule

Rule پایه:
- فقط یک Listing فعال در هر Category مجاز است.

Source برای تلاش به ثبت Listing اضافی/مجدد در همان Category چند رفتار ثبت کرده است:

1. در Bot Workflow:
   - Warning
   - User باید با Admin/Support تماس بگیرد.

2. در Key Restrictions:
   - اگر User نیاز به Listing دیگری در همان Category داشته باشد، باید Fee مربوطه را پرداخت کند.
   - Fee بر اساس Category متفاوت است.

3. در Coin Economy:
   - دو Listing رایگان در یک Category ممکن نیست.
   - اگر User مجدداً بعد از یک ماه در همان Category Listing ثبت کند، **5 Coin** ذکر شده است.

> ⚠️ Source Conflict
>
> Source برای Listing اضافی/مجدد در یک Category، هم مسیر تماس با Admin/Support، هم پرداخت Fee متغیر بر اساس Category، و هم Rule عدد 5 Coin بعد از یک ماه را ثبت کرده است.
>
> این موارد به‌صورت یک Flow نهایی و یکپارچه تعریف نشده‌اند.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## After Publication

پس از انتشار:
- Lifecycle و Early Access / Free Interaction طبق Rule مربوط آغاز می‌شود.
- Performance tracking فعال می‌شود.
- Boost در صورت Interaction کم قابل ارائه است.
- Day 30 / Day 31 به Expiry می‌رسد.
- Extend/Renew می‌تواند Listing را دوباره فعال کند.
- Post-deal flow می‌تواند Review و Comment داشته باشد.

Conflict مربوط به Early Access timing در [Listing Browsing](./listing-browsing.md) و [Flows](./flows.md) نگهداری می‌شود.

## Channel Publication

Source می‌گوید پس از تکمیل Listing و تأیید Admin، Publication در Channelهای ارتباطی مختلف انجام می‌شود.

Admin می‌تواند Rule انتشار Telegram Channel را با Attribute/Tag تعیین کند.
