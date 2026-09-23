# Canada Market

## Scope

این فایل نمای یکپارچه اطلاعات Source Document درباره بازار کانادا است. اعداد این بخش همان اعداد گزارش‌شده در Source هستند و با منبع بیرونی راستی‌آزمایی نشده‌اند.

## Current Market Focus

### Primary Market: Rental Housing in Canada

Status: Source-defined primary market

بازار اول Advertio، دسته‌بندی **اجاره مسکن در کانادا** است.

مسئله‌ای که Source برای این بازار تعریف می‌کند:

- پیدا کردن خانه اجاره‌ای یا همخانه سخت، زمان‌بر و پرریسک است.
- تقاضا به‌دلیل حضور دانشجوها، مهاجران، جابه‌جایی افراد، اجاره اتاق و نیاز به همخانه بالاست.
- کاربران امروز برای حل نیاز خود بین گروه‌های Telegram، Facebook و پلتفرم‌های مختلف جابه‌جا می‌شوند.
- اطلاعات آگهی‌ها پراکنده یا ناقص است.
- اعتماد به آگهی‌دهنده و طرف مقابل پایین است و اسپم/کلاهبرداری مسئله مهمی است.
- کاربران از آگهی‌های جدید متناسب با نیاز خود دیر مطلع می‌شوند.

### Canada Rental Housing Base

Status: Source-reported market estimate

| Metric | Source value |
|---|---:|
| جمعیت کانادا | حدود 40.5 میلیون نفر |
| تعداد خانوار | حدود 17.2 میلیون خانوار |
| سهم خانوارهای مستأجر | حدود 33.5% |
| تعداد تقریبی خانوارهای مستأجر | حدود 5.8 میلیون خانوار |
| نرخ نفوذ Telegram در کانادا | حدود 7.5% |
| خانوارهای مستأجر Telegram-based | حدود 435 هزار خانوار |
| معادل جمعیتی تخمینی این بازار اولیه | حدود 950 هزار تا 1.05 میلیون نفر |

بر اساس Source، این حدود **435 هزار خانوار مستأجر تلگرامی** به‌عنوان بازار هدف اولیه Advertio در نظر گرفته شده‌اند.

برای جزئیات فرمول‌ها و سناریوهای MAU، See [Market Sizing](./market-sizing.md).

## Rental Listing Supply Signal

Status: Source-reported market observation

Source Document گزارش می‌کند:

- تعداد آگهی اجاره منتشرشده در Rentals.ca: **59,128**
- آگهی‌های با اجاره کمتر از **$2,000**: حدود **38,000**
- سهم این بخش از کل آگهی‌ها: **64.3%**

برداشت مستقیم Source این است که تقریباً دو سوم بازار اجاره مورد اشاره در بخش مسکن مقرون‌به‌صرفه متمرکز است.

## Initial Community Wedge

Status: Hypothesis / Go-to-market assumption

Source تخمین می‌زند حدود **400,000 کاربر فارسی‌زبان Telegram در کانادا** حضور داشته باشند و این جامعه می‌تواند نخستین جامعه هدف و مزیت رقابتی Advertio برای ورود به بازار باشد.

این عدد در Source به‌عنوان تخمین آمده و نتیجه Validation واقعی محسوب نشده است.

## Secondary Market: General Jobs Canada

Status: Source-defined second priority

پس از Housing، اولویت دسته‌بندی دوم **Jobs** است؛ با تمرکز بر General Jobs و کارهای عمومی/روزانه.

دلایل ذکرشده در Source:

- تقاضای بالا
- کاربران جدی
- امکان درآمدزایی از سمت کارجو
- وجود کارهای General و روزانه

### General Jobs Supply Share

Source از داده‌های Job Bank و Kijiji این نسبت‌ها را گزارش کرده است:

| Source | General listings | Total listings | Share |
|---|---:|---:|---:|
| Job Bank | 12,578 | 63,119 | 19.9% |
| Kijiji | 11,321 | 68,292 | 16.6% |

میانگین سهم بازار General Jobs در Source: **حدود 18%**

### General Jobs User Capacity

| Metric | Source value |
|---|---:|
| کاربران Telegram کانادا | حدود 3,000,000 نفر |
| نسبت افراد جویای کار | 3.6% |
| کاربران جویای کار تخمینی | حدود 108,000 نفر |
| سهم General Jobs | حدود 18% |
| ظرفیت متقاضی General Jobs | حدود 19,400 نفر |

محاسبه Source:

```text
3,000,000 × 3.6% = 108,000
108,000 × 18% ≈ 19,400
```

See [Market Sizing](./market-sizing.md) for the consolidated sizing model.

## Current Acquisition Context

در فاز اول، Source کانال‌های جذب زیر را ذکر می‌کند:

- Telegram Communities
- Referral Link
- Organic Search
- Telegram Ads
- لینک مستقیم به Mini App
- انتشار آگهی‌ها در کانال Telegram
- Telegram Notifications

Crawler مربوط به Telegram فقط برای **Cold Start / Initial Supply** در نظر گرفته شده و نباید به هویت دائمی محصول تبدیل شود. جزئیات ریسک این رویکرد در [Research](./research.md) آمده است.

## MVP Evidence in Canada Rental Market

یک MVP اولیه به زبان انگلیسی برای بازار اجاره ملک کانادا به مدت 4 ماه اجرا شده است و شامل:

1. وب‌سایت اجاره خانه
2. Telegram Bot
3. کانال تخصصی Telegram برای اجاره خانه

نتایج عددی و وضعیت Validation در [Market Validation](./market-validation.md) ثبت شده است.

## Geographic Expansion

### Current / Initial

- تمرکز بازار اولیه: Canada
- تمرکز دسته‌ای اولیه: Housing (Rental & Roommate)
- اولویت بعدی: Jobs

### Future Versions

Status: Planned

Source در مسیر توسعه آینده موارد زیر را ذکر می‌کند:

- Germany
- Italy
- Multi-language
- AI Translation
- WhatsApp Integration
- کانال‌های ارتباطی تفکیک‌شده بر اساس کشور، شهر و زبان

این موارد نباید به‌عنوان قابلیت یا بازار فعال نسخه فعلی تلقی شوند.
