# Business Strategy

## Market Entry Strategy

### First Market

بازار اول Advertio: **Rental Housing in Canada**.

تمرکز اولیه به این دلیل انتخاب شده که پیدا کردن خانه یا Roommate در Source Document سخت، زمان‌بر و پرریسک توصیف شده و تقاضا از سمت دانشجو، مهاجر، جابه‌جایی، اجاره اتاق و همخانه وجود دارد.

### Second Priority

**Jobs** اولویت Category دوم است، با تمرکز مشخص روی General / Daily Jobs و کاربران جدی.

## Canada Rental Market Sizing in Source Document

اعداد زیر برآوردهای ارائه‌شده در Source Document هستند و از Web یا منبع دیگری تکمیل نشده‌اند:

- جمعیت Canada: حدود **40.5M**.
- تعداد Household: حدود **17.2M**.
- سهم Tenant Household: حدود **33.5%** ≈ **5.8M households**.
- Telegram penetration فرض‌شده در Canada: حدود **7.5%**.
- Tenant Householdهای Telegram بر این مبنا: حدود **435K households**.
- Market اولیه متناظر: حدود **950K تا 1.05M نفر**.
- Rentals.ca Listings ذکرشده: **59,128** Listing اجاره.
- Listings کمتر از $2,000: حدود **38K** یا **64.3%**.
- برداشت Source Document: تقریباً دو سوم بازار اجاره در بخش Affordable Housing متمرکز است.

### User Acquisition Scenarios

| Scenario | Telegram Canada Capture | MAU | Active Listings if 5% post |
|---|---:|---:|---:|
| بدبینانه | 5% | ~150K | ~7–8K |
| واقع‌بینانه | 7.5% | ~225K | ~11K |
| خوش‌بینانه | 10% | ~300K | ~15K |

این‌ها **Scenario / Estimate** هستند، نه نتایج واقعی.

### Persian-speaking Initial Community

Source Document حدود **400K Persian-speaking Telegram users in Canada** را برآورد می‌کند و آن‌ها را به‌عنوان جامعه اولیه بالقوه و مزیت ورود به بازار مطرح می‌کند.

## General Jobs Canada Sizing

- Job Bank: 12,578 General Jobs از 63,119 کل = **19.9%**.
- Kijiji: 11,321 General Jobs از 68,292 کل = **16.6%**.
- میانگین سهم General Jobs: حدود **18%**.
- Telegram users in Canada: حدود **3M**.
- نسبت Job Seekers فرض‌شده: **3.6%** → حدود **108K** نفر.
- با اعمال سهم 18% General Jobs: حدود **19.4K** متقاضی General Jobs.

این اعداد Market Estimate هستند و نباید به‌عنوان User Base فعلی Advertio معرفی شوند.

## Cold Start / Supply Strategy

Crawler برای Cold Start و Initial Supply استفاده می‌شود، نه به‌عنوان Core Platform دائمی.

Business rules ثبت‌شده برای Crawled Listings:

- Crawled Listings رایگان منتشر می‌شوند و مشمول Monetization Advertio نیستند.
- پیش از ورود، چند مرحله Processing و Quality Control انجام می‌شود و فقط Listingهای مجاز منتشر می‌شوند.
- User مستقیماً به Telegram account آگهی‌دهنده Redirect می‌شود.
- Chat داخلی، Review، Escrow و سایر قابلیت‌های اختصاصی Advertio برای Crawled Listing فعال نیست.
- وقتی User به Advertio join کند، Crawled Listingهای جدید او دیگر نباید خودکار ثبت شوند.
- بعد از join، خود User باید Listing ثبت کند.
- Listingهای Crawl شده قبلی می‌توانند به‌عنوان History نمایش داده شوند.

### Strategic Constraint

سهم Listingهای واقعی کاربران باید سریعاً از Crawled Listings بیشتر شود. Advertio نباید به Search Engine دائمی برای Telegram تبدیل شود.

## Acquisition Strategy

کانال‌های فاز اول در Source Document:

- Telegram Communities.
- Referral Link.
- Organic Search.
- Telegram Ads.

Telegram به‌عنوان Channel اصلی نیز با این تاکتیک‌ها آمده است:

- Group تلگرام بدون اجازه ارسال پیام.
- Direct Link به Mini App.
- انتشار Listing در Channel.
- Notificationها.

## Referral Growth

هر User می‌تواند Link اختصاصی داشته باشد. منطق Reward در Source Document در چند بخش با Trigger و Amount متفاوت آمده است؛ بنابراین مقدار و Trigger نهایی در این فایل تثبیت نشده است.

See [Source Conflicts](./assumptions.md#source-conflicts).

## Distribution Strategy

Admin قرار است بتواند انتشار Listingها را با Ruleهای مبتنی بر Attribute و Tag به Channelهای ارتباطی متصل کند.

Examples from Source Document:

- Ontario + Jobs → ارسال به Telegram Channel مربوطه.
- Toronto + Event → در آینده ترجمه به English و انتشار در Channel مربوطه.

Translation در این Flow برای نسخه‌های بعدی تعریف شده است.

## Geographic Expansion

### Future Phase

- توسعه به Italy و Germany.
- Multi-language و Auto Translation Listingها.
- Channelهای ارتباطی تفکیک‌شده بر اساس Country، City و Language.

Version 2.5 نیز Germany + Italy، WhatsApp Integration، Passenger Cargo و Human Matching + Social Categories را در برنامه توسعه قرار می‌دهد.

## Business Platform Expansion

### Future

Version 3.0 جهت تنوع درآمد از کاربران Professional / Business شامل Landing Pages، Premium Accounts، Business Analytics / Enterprise Dashboard، Escrow، Partner APIs و Business Verification تعریف شده است.

جزئیات مدل درآمد Landing Page در [Business Model](./business-model.md) آمده است.
