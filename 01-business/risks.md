# Business Risks & Constraints

## Cold Start Dependency

**Risk explicitly stated in Source Document:** سهم Listingهای واقعی کاربران باید خیلی سریع از Listingهای Crawl شده بیشتر شود.

Crawler فقط برای Initial Supply است. اگر Advertio به Search Engine دائمی برای Telegram تبدیل شود، با جهت‌گیری تعریف‌شده محصول ناسازگار است.

## Validation Risk: Early Access Willingness to Pay

MVP چهارماهه نشان داده است که حداقل 2 User برای انتشار Listing پول پرداخت کرده‌اند، اما Source Document صریحاً می‌گوید این نتیجه **پرداخت برای مشاهده Contact Information / Early Access را اثبات نمی‌کند**.

**Status: Not validated**

## Audience Bias in MVP

Source Document می‌گوید Community اولیه احتمالاً **Warm Audience** بوده، چون بخشی از Advertising هدفمند بوده است.

این یک محدودیت در تفسیر نتایج MVP است و نباید Conversionهای ثبت‌شده بدون Context به کل بازار تعمیم داده شوند.

## Trust Manipulation Risk

Source Document به‌طور مشخص هشدار می‌دهد که Scammerها می‌توانند **Fake History** ایجاد کنند و باید برای آن راه‌حل طراحی شود.

همچنین در Validation Questions این موارد باز مانده‌اند:

- Badgeها قابل جعل هستند؟
- Review واقعی است؟
- Verification ارزش اقتصادی ایجاد می‌کند؟
- Trust Layer واقعاً نرخ Deal را نسبت به Telegram Group افزایش می‌دهد؟

این موارد در Source Document پاسخ قطعی ندارند.

## Social Proof / Contact Competition Display Risk

برای Passenger Cargo پیشنهاد شده است تعداد Viewهای 24 ساعت گذشته و تعداد Userهایی که Contact Information را درخواست کرده‌اند نمایش داده شود تا Urgency افزایش یابد.

خود Source Document ریسک معکوس را نیز ثبت می‌کند: اگر تعداد Contact Requestها زیاد باشد، User ممکن است از تماس منصرف شود.

Alternative پیشنهادی همان متن: نمایش تعداد Userهای Online در 6 ساعت گذشته، چون احتمالاً عدد کوچک‌تری خواهد بود.

**Status: Proposed / Future; effect uncertain**

## Referral Abuse Risk

در بخش Referral Growth آمده است که Referral Signup می‌تواند باعث **Fake Account** بدون Usage شود. متن اشاره می‌کند که عضویت این Accountها در Group/Channel شاید در کوتاه‌مدت به رشد ظاهری Community کمک کند، اما این مورد به‌عنوان کیفیت Usage یا Retention اثبات نشده است.

## Manual Operations Dependency

در نسخه اولیه، بخش‌هایی از عملیات عمداً Manual هستند:

- Listing Approval.
- User Verification.
- Document Review.
- Payment confirmation در بعضی روش‌ها.

Burn Rate نیز شامل Manual Listing Approval، Verification و Support است.

Source Document دلیل این تصمیم را Validation فرضیات، جمع‌آوری Real Data و جلوگیری از توسعه زودهنگام سیستم‌های پیچیده می‌داند. Automation قرار است بعد از رسیدن به Operational KPIهای از پیش تعریف‌شده و با سرویس‌های تخصصی / AI انجام شود.

**Constraint:** خود Source Document مقدار دقیق آن Operational KPIها را در متن فعلی مشخص نکرده است.

## Marketplace Liquidity / Supply Quality Constraint

Cold Start با Crawled Supply حل می‌شود، اما Crawled Listings:

- Monetized نیستند.
- User را مستقیم به Telegram advertiser Redirect می‌کنند.
- Chat، Review، Escrow و سایر قابلیت‌های Core Advertio را ندارند.

بنابراین رشد Revenue و Trust Experience به افزایش سهم User-generated Listings وابسته است.

## Retention Risk — Open Question

Source Document Retention در 30، 90 و 180 روز را به‌عنوان سؤال Validation مطرح می‌کند و مقدار واقعی ارائه نمی‌دهد.

**Status: Open / Not validated in current source**

## Pricing / Unit Economics Uncertainty

Pricing عمداً Dynamic تعریف شده و باید بر اساس Country، Category، Supply/Demand، User Behavior و Unit Economics بازنگری شود.

Source Document داده کامل Full CAC، LTV و Break-even عددی را ارائه نمی‌دهد. بنابراین Economics نهایی هنوز از Source قابل محاسبه کامل نیست.

## Source Rule Conflicts

چند Rule مهم در Source Document در نسخه‌های متفاوت با یکدیگر هم‌خوان نیستند؛ این موضوع خود یک Business/Product decision risk است چون Monetization، Trust و UX را تحت‌تأثیر قرار می‌دهد.

See [Source Conflicts](./assumptions.md#source-conflicts).
