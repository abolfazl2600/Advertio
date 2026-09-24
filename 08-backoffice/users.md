# Users

این فایل فقط اطلاعات مرتبط با مدیریت User Entity و رفتارهای Backoffice را که در Source Document آمده است ثبت می‌کند.

## User Entity

### اطلاعات پایه
- نام
- نام خانوادگی
- عکس پروفایل
- شماره موبایل احراز‌شده
- پرچم کشور بر اساس شماره تماس
- تاریخ عضویت

### موقعیت
- کشور
- ایالت
- شهر
- محدوده — اختیاری

### Trust Layer status
Backoffice باید وضعیت‌های ثبت‌شده در User Entity را در نظر بگیرد:
- Phone Verified
- National ID Verified — تطابق موبایل و کد ملی فقط برای ایران
- Video Verified
- GPS Verified
- Document Verified
- Social Media Verified
- Financial Verified — micro transaction
- Cargo ticket Verified

Source تصریح می‌کند که همه این Verificationها در Version 1 وجود ندارند و در نسخه‌های مختلف اضافه می‌شوند. جزئیات و تناقض‌های Versioning در [Verification](./verification.md) نگهداری شده است.

### Badgeها
Badgeهای تعریف‌شده در Source:
- Top Rated
- Financial Verified
- Phone Verified
- Quick Responder
- New Member
- 1 Year Member
- 10 Deals
- +20 Deals

Badgeها نیز طبق Source در Version 1 همگی وجود ندارند و در نسخه‌های مختلف اضافه می‌شوند.

#### Top Rated
شرایط دقیق:
- Average Rating ≥ 4.5 از 5
- حداقل 15 Review
- بدون Dispute یا Report

#### Financial Verified
در یک بخش Source، شرط این Badge تأیید حداقل یک حساب بانکی یا کارت بانکی توسط سیستم یا ادمین ذکر شده است. وضعیت Version آن در Source متناقض است؛ جزئیات در [Verification](./verification.md).

## Performance Metrics

- Last Active:
  - نمایش به‌شکل «online» یا «چند ساعت قبل آنلاین بوده»
  - اگر بیش از سه روز هیچ فعالیتی در Bot یا Website نباشد: «بیشتر از سه روز»
- Deals Count:
  - تعداد معامله‌های موفقی که طرفین تأیید کرده‌اند
- Average Rating:
  - میانگین امتیاز از 5 ستاره
- Reviews

## Activity

- Listing History
  - آگهی‌های منقضی‌شده کاربر در تاریخچه نگهداری می‌شوند.
  - Source برای نمایش تاریخچه کامل به Early Access اشاره می‌کند؛ بدون Early Access فقط Preview نمایش داده می‌شود.
  - با Early Access همه Ratingها، Commentها و آگهی‌های قدیمی قابل نمایش هستند.
- Total Listings
- Active Listings

## Registration / user eligibility

در Workflow ثبت‌نام:
1. کاربر شماره موبایل را از طریق دکمه Telegram share می‌کند یا Mobile OTP انجام می‌دهد.
2. اگر شماره مربوط به ایران یا کانادا باشد، مورد تأیید قرار می‌گیرد.
3. سایر کشورها در این مرحله تأیید نمی‌شوند و کاربر باید در Waitlist قرار گیرد تا ادمین تأیید کند.
4. پس از ایجاد Account:
   - Province و City پیش‌فرض انتخاب می‌شود.
   - آموزش و FAQ ارائه می‌شود.
   - عضویت در Channel و Group مربوطه اجباری ذکر شده است.
   - Coin هدیه به دلیل احراز شماره موبایل ذکر شده، اما مقدار آن در این بخش تعیین نشده است.

## Social & Contact

Source این بخش را برای Version فعلی «وجود ندارد» توصیف می‌کند، اما برای نسخه‌ها/فرآیندهای بعدی موارد زیر را مشخص کرده است:
- Instagram
- Facebook
- LinkedIn
- Telegram
- Email

برای Social Verification، کاربر باید Code تولیدشده توسط سیستم را از طریق Private Message برای حساب Social پلتفرم ارسال کند. Source در مورد اجرای دستی فعلی این Verification با بخش دیگری تناقض دارد؛ به [Verification](./verification.md) مراجعه شود.

### Coin incentives documented in Source
- اضافه‌کردن هر Social Network قابل احراز و متعلق به کاربر: 1 Coin
- Email دانشگاه یا محل کار در صورت احراز: 5 Coin
- Email عمومی: بدون Coin هدیه
- Login از Facebook در یک بخش دیگر: 5 Coin به‌عنوان Social Proof incentive

Source مشخص نکرده است که Facebook Login reward و Social Network verification reward جایگزین یکدیگرند یا دو Trigger جدا هستند؛ بنابراین هر دو Rule حفظ شده‌اند.

## Admin-facing user operations explicitly stated

- تأیید Waitlist برای شماره‌های خارج از ایران/کانادا
- بررسی دستی بخشی از Verificationها و Documents
- مشاهده و مدیریت Wallet balance از مسیر Wallet Management
- اطلاع‌رسانی مستقیم ادمین به کاربر
- مشاهده Active Saved Filters در Admin Panel
- مشاهده وضعیت Listing و Listing History در جریان‌های عملیاتی مرتبط

برای Wallet operations به [Wallet Management](./wallet-management.md) و برای Permission boundaries به [Permissions](./permissions.md) مراجعه شود.
