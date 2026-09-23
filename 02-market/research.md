# Market Research, Risks, and Open Questions

## Scope

این فایل سؤال‌ها، فرضیات، ریسک‌ها و جهت‌های تحقیقاتی موجود در Source Document را نگهداری می‌کند. هیچ پاسخ جدیدی از خارج Source به این موارد اضافه نشده است.

## 1. Core Market Risks

### Cold Start / Crawler Dependency

Status: Explicit risk

Source دو ریسک مهم را مشخص می‌کند:

- نسبت Listingهای واقعی کاربران باید خیلی سریع از Listingهای Crawl شده بیشتر شود.
- Advertio نباید به **Search Engine for Telegram** تبدیل شود؛ Crawler برای شروع است و نباید نقش دائمی داشته باشد.

Crawler در Source فقط یک راهکار **Cold Start / Initial Supply** است و بخشی از Core Platform در نظر گرفته نشده است.

آگهی‌های Crawl شده:

- رایگان منتشر می‌شوند.
- مشمول Monetization Advertio نیستند.
- به حساب Telegram آگهی‌دهنده Redirect می‌شوند.
- Chat داخلی، Review، Escrow و قابلیت‌های اختصاصی Advertio برای آن‌ها فعال نیست.
- قبل از ورود باید Quality Control شوند.

Rule مهم:

- اگر صاحب آگهی Crawl شده به Advertio join کند، آگهی‌های جدید Crawl شده آن کاربر دیگر نباید خودکار ثبت شوند.
- از آن پس خود کاربر باید Listing ثبت کند.
- Listingهای قبلی Crawl شده می‌توانند به‌عنوان History نمایش داده شوند.

## 2. Core Validation Questions

Status: Open questions

Source سؤال‌های زیر را برای Validation بازار باز می‌گذارد:

- آیا کاربران امروز برای حل این مشکل از روش‌های جایگزین استفاده می‌کنند؟
- Pain Point چقدر شدید است؟
- چند درصد کاربران در ماه با این مشکل مواجه می‌شوند؟
- آیا مشکل آن‌قدر جدی است که کاربر حاضر به پرداخت شود؟
- آیا راهکار فعلی مانند Telegram، Facebook و Kijiji برای کاربر ناکافی است؟
- چند نفر واقعاً در ماه دنبال این سرویس هستند؟
- چند نفر فقط عضو Community هستند ولی نیاز فعال ندارند؟
- نرخ تبدیل Community کلی به مشتری واقعی چقدر است؟
- آیا بازار قابلیت رشد دارد؟
- اولین کاربر واقعی چه کسی است؟
- چرا این کاربر باید امروز محصول را استفاده کند؟
- آیا محصول مشکل مهاجر جدید را حل می‌کند یا کل بازار را؟
- آیا Value Proposition واضح است؟
- کاربران قبل از Advertio چگونه مشکل را حل می‌کنند؟
- هزینه روش فعلی چیست: زمان، ریسک یا پول؟
- آیا Advertio حداقل 10 برابر بهتر از Telegram Group است؟
- چرا کاربر Advertio را به Telegram Group ترجیح می‌دهد؟
- چرا کاربر Advertio را به Facebook Marketplace ترجیح می‌دهد؟
- آیا Badgeها قابل جعل هستند؟
- آیا Review واقعی است؟
- آیا Verification ارزش اقتصادی ایجاد می‌کند؟

## 3. Trust and Retention Hypotheses

Status: Hypothesis

Source این پرسش‌ها را نیز به‌عنوان Validation آینده مطرح می‌کند:

- آیا Trust Layer باعث افزایش نرخ انجام معامله نسبت به Telegram Groups می‌شود؟
- آیا کاربران پس از اولین تجربه پرداخت دوباره از پلتفرم استفاده می‌کنند؟
- Retention در بازه‌های **30، 90 و 180 روز** چگونه خواهد بود؟

هیچ نتیجه واقعی در Source برای این سه پرسش ارائه نشده است.

## 4. Market-entry Hypothesis

Status: Hypothesis

Source حدود **400,000 کاربر فارسی‌زبان Telegram در کانادا** را به‌عنوان Community اولیه بالقوه مطرح می‌کند.

فرضیه ورود این است که این جامعه می‌تواند:

- Early Adopter base باشد.
- هزینه دسترسی اولیه را کاهش دهد.
- برای Housing و سپس Jobs عرضه و تقاضای اولیه ایجاد کند.

Source هنوز نرخ تبدیل این Community به MAU، Listing Creator یا Payer را Validate نکرده است.

## 5. Acquisition Research

### Current / Initial Channels Mentioned

- Telegram Communities
- Referral Link
- Organic Search
- Telegram Ads
- Telegram Group / Channel
- Direct link to Mini App
- Telegram Notifications

Source در بخش Acquisition همچنین به **Telegram Group بدون اجازه ارسال پیام** اشاره می‌کند.

### Referral Acquisition Risk

Status: Explicit concern

Source می‌گوید هر کاربر Referral Link اختصاصی دارد و در Rule ذکرشده، با ثبت‌نام و Verification، هر دو طرف **3 Coin** دریافت می‌کنند.

همزمان Source ریسک ایجاد Fake Account فقط برای دریافت Referral Reward را مطرح می‌کند. با این حال اشاره می‌کند که عضویت همین حساب‌ها در Channel و Group ممکن است در کوتاه‌مدت به رشد Community کمک کند.

این مورد در Source به‌صورت ملاحظه/فرضیه آمده و نتیجه Validation واقعی ندارد.

### Paid Acquisition Evidence

داده چهار Campaign و Source Conflict مربوط به CAC در [Market Validation](./market-validation.md) ثبت شده است.

## 6. Behavioral Research Around Social Proof

Status: Proposed / Future

در بخش Passenger Cargo، Source ایده نمایش موارد زیر در Listing Detail را مطرح می‌کند:

- تعداد بازدید 24 ساعت گذشته
- تعداد درخواست‌های مشاهده اطلاعات تماس

هدف پیشنهادی: ایجاد انگیزه برای اقدام سریع‌تر.

اما خود Source یک ریسک معکوس هم مطرح می‌کند:

- اگر تعداد درخواست تماس خیلی بالا باشد، ممکن است کاربر از اقدام منصرف شود.

جایگزین پیشنهادی در Source:

- نمایش تعداد افراد Online در 6 ساعت گذشته، چون احتمالاً عدد کوچک‌تری است.

این قابلیت برای نسخه‌های آینده مطرح شده و نتیجه آزمایش واقعی ندارد.

## 7. Fraud / Trust Research Concern

Source یک ریسک باز را ذکر می‌کند:

- کلاهبردارها ممکن است History فیک ایجاد کنند.

Source برای این مسئله در همین بخش راه‌حل نهایی ارائه نمی‌کند و فقط نیاز به بررسی بیشتر را مطرح می‌کند.

## 8. Pricing and Willingness-to-Pay Research

Status: Partially validated

آنچه Validate شده:

- 2 کاربر در MVP برای انتشار Listing هر کدام **$2** پرداخت کرده‌اند.

آنچه هنوز Validate نشده:

- پرداخت برای Early Access / Contact Reveal
- Repeat Purchase
- LTV
- Break-even
- قیمت بهینه Coin
- تأثیر Discount برای Verified Users بر Conversion
- حساسیت قیمت بر اساس Category / Country / Supply & Demand

Source تصریح می‌کند Pricing باید در طول نسخه‌های مختلف چند بار بازنگری شود و بر اساس Country، Category، Supply & Demand، User Behavior و Unit Economics تنظیم شود.

## 9. Expansion Research

Status: Planned / Future

Source توسعه آینده را برای موارد زیر مطرح می‌کند:

- Germany
- Italy
- Multi-language
- AI Translation
- WhatsApp Integration
- Passenger Cargo
- Human Matching
- Social categories

برای اندازه بازار یا Validation این توسعه‌ها، Source در بخش Market عدد کافی ارائه نکرده است.
