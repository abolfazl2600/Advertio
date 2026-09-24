# Verification

Verification بخشی از Trust Layer Advertio است. Source یک مدل چندلایه تعریف می‌کند، اما Availability بعضی لایه‌ها در بخش‌های مختلف سند متناقض است. هیچ تناقضی در این فایل حل نشده است.

## Verification layers

| Verification | Rule / meaning from Source | Version / operation notes |
|---|---|---|
| Phone Verified | احراز شماره موبایل | Version 1 دارد |
| National ID Verified | تطابق موبایل و کد ملی؛ فقط ایران | در یک بخش Future/غیرفعال در Version فعلی |
| Video Verified | ویدیو با صورت به‌صورت ۱۸۰ درجه + تطابق با عکس Profile | درباره Version فعلی Conflict وجود دارد |
| GPS Verified | وضعیت احراز GPS | جزئیات Workflow در Source ارائه نشده |
| Document Verified | مدارک هویتی مثل Passport یا Driver License | در یک بخش برای Version فعلی انجام نمی‌شود |
| Social Media Verified | اثبات مالکیت Social account با Code | درباره Version فعلی Conflict وجود دارد |
| Financial Verified | micro transaction / تأیید حساب یا کارت | درباره Version فعلی Conflict وجود دارد |
| Cargo ticket Verified | توسط Admin Support؛ هزینه 20 Coin | فرآیند تکمیلی Source ناقص است |

## Phone Verification

Source چند روش/توصیف را ثبت کرده است:
- در User Entity: Phone Verified.
- در یک بخش: «در این ورژن» یک پیام توسط Telegram ارسال می‌شود.
- در Registration Workflow: اشتراک شماره موبایل از طریق Telegram button یا Mobile OTP.
- شماره ایران یا کانادا پذیرفته می‌شود؛ سایر کشورها به Waitlist برای Admin approval می‌روند.

## Video Verification

Rule توصیف‌شده:
- ارسال ویدیو با حرکت صورت به‌صورت ۱۸۰ درجه
- تطابق با Profile photo
- اجرای اپراتوری/دستی در بخش‌هایی از Source

### Future automation
Source استفاده از سرویس‌هایی مانند Persona، Jumio، Onfido یا Veriff را برای Video/Biometric verification در نسخه‌های بعدی ممکن می‌داند. همچنین در بخش Operating Model به Persona، Veriff یا Jumio برای جایگزینی تدریجی فرآیند دستی اشاره شده است.

> ⚠️ Source Conflict
>
> Roadmap، Video Verification (دستی) و Manual Verification Workflow را در Version 1.5 قرار می‌دهد و User Entity نیز می‌گوید Verificationهای پیشرفته در Version 1 وجود ندارند.
>
> بخش دیگری از Source برای Video Verified صراحتاً می‌گوید «در ورژن اول توسط اپراتور».
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Social Media Verification

Flow ثبت‌شده:
1. سیستم Code ایجاد می‌کند.
2. کاربر Code را از طریق Private Message برای Social account پلتفرم ارسال می‌کند.
3. مالکیت Social account تأیید می‌شود.

Social networks قابل قبول:
- Instagram
- Facebook
- LinkedIn
- Telegram

> ⚠️ Source Conflict
>
> در بخش User Entity نوشته شده Social account در «ورژن فعلی توسط ادمین» تأیید می‌شود و در آینده خودکار خواهد شد.
>
> در بخش «سیستم احراز هویت» نوشته شده Social Media Verified «در ورژن فعلی وجود ندارد».
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Financial Verification

دو تعریف مرتبط در Source وجود دارد:
- Financial Verified با micro transaction.
- شرط Badge: حداقل یک حساب بانکی یا کارت بانکی توسط سیستم یا ادمین تأیید شده باشد؛ «فعلاً به‌صورت دستی توسط ادمین» و در نسخه بعدی خودکار.

> ⚠️ Source Conflict
>
> بخش User Entity، Financial Verification را فعلاً قابل انجام به‌صورت دستی توسط Admin توصیف می‌کند.
>
> بخش «سیستم احراز هویت» می‌گوید Financial Verified در «ورژن فعلی وجود ندارد» و آن را به پرداخت ارزی بسیار کم، مثلاً 1 cent، نسبت می‌دهد.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## National ID Verification

- فقط برای ایران
- تطابق شماره موبایل و کد ملی
- در یک بخش explicitly در Version فعلی وجود ندارد
- در Coin Economy نیز به‌عنوان مورد Future ذکر شده است

## Cargo ticket Verification

- توسط Admin Support انجام می‌شود.
- هزینه: 20 Coin.
- Source جمله Workflow را بعد از «کاربر با ارائه ...» کامل نکرده است؛ جزئیات بیشتری قابل استخراج نیست.

## Verification rewards

یک بخش Source:
- Video: 5 Coin — مقدار قابل تنظیم در Admin Panel
- National ID: 10 Coin — مقدار قابل تنظیم در Admin Panel
- Bank account verification: مقدار Coin قابل تنظیم در Admin Panel

بخش Coin Economy:
- Video verification: 3 Coin
- National ID/mobile match: 3 Coin — Future
- Referral: 3 Coin برای هر دو طرف
- Review after deal: 1 Coin
- رسیدن به 10 معامله: 20 Coin + 10 Deals Badge

> ⚠️ Source Conflict
>
> یک بخش Reward ویدیو را 5 Coin و National ID را 10 Coin تعریف می‌کند.
>
> بخش Coin Economy برای همان دو مورد به‌ترتیب 3 Coin و 3 Coin ذکر می‌کند.
>
> هر دو مقدار در Source حفظ می‌شوند و مقدار نهایی نیازمند تصمیم Product/Business است. Pricing Policy نیز می‌گوید هزینه‌ها/مقادیر قابل بازنگری و تنظیم هستند.


## Product Decision — Paid Identity Verification

> Approved 24 Sep 2026. This section is a new Product/Business decision and is not extracted from the original Source Document.

Advertio will add a manually reviewed paid **Identity Verification** flow.

### Meaning of Identity Verified

The explicit badge **Identity Verified** means:
- the user submitted a supported identity document;
- the system assigned a randomized video/liveness challenge;
- the user submitted a video completing that challenge;
- an authorized Backoffice admin reviewed the evidence;
- the admin approved the verification.

This verification remains separate from **Phone Verified** and other verification layers.

### Initial operation

The first version is manual in Backoffice.

The first version uses Telegram as the evidence/media surface and Backoffice as the operational queue and secondary approval surface.

Backoffice must provide:
- verification queue;
- Coin payment state/reference;
- assigned randomized challenge;
- Telegram evidence/message references;
- a safe View/Open in Telegram path where supported;
- approve/reject actions;
- reviewing admin;
- review timestamp;
- audit history.

Raw identity-document images/videos are not duplicated into Backoffice storage in v1. Admins review the original evidence in Telegram and may approve/reject from either Telegram or Backoffice.

Initial service price is **$8 equivalent / 80 Coins at the current documented reference**, payable with Advertio Coins only in the first version.

Detailed implementation is tracked in GitHub issue #28 and monetization documentation:
[Paid Identity Verification](../05-monetization/identity-verification.md).

## Verified-user benefits / proposals

### Proposed / example
Source مثالی ارائه می‌کند که اگر کاربر «احراز کامل» داشته باشد، برای Extend آگهی 35% تخفیف دریافت کند.

### Future / proposed
- بسته‌های Coin برای افراد احرازشده با 20% کاهش قیمت.
- ممکن است توسط Plugin یا Partner ثالث انجام شود.

این دو تخفیف به دو موضوع متفاوت اشاره دارند: Extend و Coin Package؛ Source آن‌ها را به‌عنوان یک Rule واحد معرفی نکرده است.
