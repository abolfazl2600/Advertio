# Verification

Verification بخشی از Trust Layer Advertio است. Telegram Bot در Version اولیه نقش مستقیم در Phone Verification و Registration دارد؛ Verificationهای پیشرفته در Versionهای بعدی یا به‌صورت Manual operation مطرح شده‌اند.

## Verification Layers

- Phone Verified
- National ID Verified
- Video Verified
- GPS Verified
- Document Verified
- Social Media Verified
- Financial Verified
- Cargo ticket Verified

## Phone Verification

### Telegram Bot Registration
Source در Workflow این روش‌ها را ذکر می‌کند:
- Share کردن Mobile Number از طریق Telegram button
- Mobile OTP

در بخش User Entity نیز Phone Verified در Version فعلی به‌صورت ارسال Message توسط Telegram توصیف شده است.

Country rule:
- Iran / Canada → accepted
- سایر Countryها → Waitlist + Admin approval

Phone Verification برای Post Listing اجباری است.

## National ID Verified

- فقط برای Iran
- تطابق Mobile Number و National ID
- در بخش Verification، برای Version فعلی وجود ندارد.
- در Coin Economy نیز Future ذکر شده است.

## Video Verified

Rule:
- User ویدیو با صورت و حرکت 180 درجه ارسال می‌کند.
- با Profile photo تطبیق داده می‌شود.
- Manual operator در بعضی بخش‌های Source ذکر شده است.

> ⚠️ Source Conflict
>
> Roadmap، Video Verification دستی و Manual Verification Workflow را در **Version 1.5** قرار می‌دهد و User Entity نیز می‌گوید Verificationهای پیشرفته در Version اول وجود ندارند.
>
> بخش دیگری برای Video Verified صراحتاً می‌گوید «در ورژن اول توسط اپراتور».
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

### Future automation
Source استفاده از این Serviceها را برای Automation آینده مطرح می‌کند:
- Persona
- Jumio
- Onfido
- Veriff

## GPS Verified

Verification status در Source تعریف شده است، اما Workflow اجرایی Telegram Bot یا Version دقیق آن ارائه نشده است.

## Document Verified

- Identity documents مانند Passport یا Driver License
- Source در بخش Verification می‌گوید در Version فعلی انجام نمی‌شود.

## Social Media Verified

Flow مطرح‌شده:
1. System یک Code تولید می‌کند.
2. User Code را از Social Account خود به Social Account پلتفرم Private Message می‌کند.
3. Account ownership بررسی می‌شود.

Supported social networks:
- Instagram
- Facebook
- LinkedIn
- Telegram

> ⚠️ Source Conflict
>
> در User Entity نوشته شده Social verification در Version فعلی توسط Admin انجام می‌شود و در Future خودکار خواهد شد.
>
> در بخش Verification نوشته شده Social Media Verified در Version فعلی وجود ندارد.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Financial Verified

Source دو تعریف مرتبط دارد:
- Financial Verified با micro transaction، مثلاً پرداخت بسیار کم مانند 1 cent
- تأیید حداقل یک Bank Account یا Bank Card توسط System یا Admin

> ⚠️ Source Conflict
>
> یک بخش Financial Verification را «فعلاً به‌صورت دستی توسط Admin» توصیف می‌کند.
>
> بخش Verification می‌گوید Financial Verified در Version فعلی وجود ندارد.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Cargo Ticket Verified

- توسط Admin Support انجام می‌شود.
- Fee: 20 Coin.
- Source جمله Workflow را بعد از «User با ارائه ...» کامل نکرده است.
- جزئیات بیشتر قابل استخراج نیست.

## Verification Rewards

یک بخش Source:
- Video Verification: **5 Coin**
- National ID: **10 Coin**
- Bank Account verification: مقدار Coin قابل تنظیم در Admin Panel

Coin Economy:
- Video Verification: **3 Coin**
- National ID/mobile match: **3 Coin** — Future

> ⚠️ Source Conflict
>
> Video Verification reward در یک بخش 5 Coin و در Coin Economy مقدار 3 Coin است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

> ⚠️ Source Conflict
>
> National ID Verification reward در یک بخش 10 Coin و در Coin Economy مقدار 3 Coin است.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Verified-user Benefits

### Extend discount
Status: Proposed / Example

Source مثال می‌زند User با Full Verification می‌تواند برای Extend **35% discount** دریافت کند.

### Coin Package discount
Status: Proposed / Future

Source برای Verified Userها **20% کاهش قیمت Coin Package** مطرح می‌کند و می‌گوید این Feature می‌تواند در Future توسط Plugin یا Partner ثالث انجام شود.

## Manual → Automated Operations

در Initial Version بخشی از:
- User Verification
- Document Review
- Listing Approval

به‌صورت Manual توسط Operations انجام می‌شود.

پس از رسیدن به Operational KPIها، Source جایگزینی تدریجی با Specialized Services، AI Moderation و Fraud Detection را مطرح می‌کند.
