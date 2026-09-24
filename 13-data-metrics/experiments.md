# Experiments & Validation

این فایل Questionها، Hypothesisها و شواهد Validation را همان‌طور که در Source آمده است ثبت می‌کند. مواردی که فقط سؤال یا ایده‌اند به Fact تبدیل نشده‌اند.

## Validation questions — unresolved unless explicitly marked otherwise

### Problem validation

Status: Hypothesis / Open Question

- آیا Userها امروز برای حل این Problem از Alternativeها استفاده می‌کنند؟
- Pain Point چقدر شدید است؟
- چند درصد Userها در ماه با این Problem مواجه می‌شوند؟
- آیا Problem آن‌قدر جدی است که User حاضر به پرداخت باشد؟
- آیا راهکارهای فعلی مانند Telegram، Facebook و Kijiji ناکافی‌اند؟

### Demand and market validation

Status: Hypothesis / Open Question

- چند نفر واقعاً در ماه دنبال Service هستند؟
- چند نفر فقط عضو Community هستند ولی Active need ندارند؟
- Conversion Rate از Community کلی به Customer واقعی چقدر است؟
- آیا Market قابلیت Growth دارد؟
- اولین User واقعی چه کسی است؟
- چرا User باید امروز Product را استفاده کند؟
- Product مشکل New Immigrant را حل می‌کند یا کل Market را؟
- آیا Value Proposition واضح است؟

### Alternative-solution validation

Status: Hypothesis / Open Question

- Userها قبل از Advertio Problem را چگونه حل می‌کنند؟
- Cost روش فعلی چیست: Time، Risk یا Money؟
- آیا Advertio حداقل 10× بهتر از Telegram Group است؟
- چرا User از Advertio استفاده کند؟
- چرا از Telegram Group استفاده نکند؟
- چرا از Facebook Marketplace استفاده نکند؟

### Trust validation

Status: Hypothesis / Open Question

- Badgeها قابل جعل هستند؟
- Review واقعی است؟
- Verification ارزش اقتصادی ایجاد می‌کند؟
- آیا Trust Layer نرخ انجام Deal را نسبت به Telegram Groups افزایش می‌دهد؟

### Monetization and retention validation

Status: Hypothesis / Open Question

- آیا User پس از اولین تجربه Payment دوباره از Platform استفاده می‌کند؟
- Retention در 30، 90 و 180 روز چقدر است؟
- آیا User حاضر است برای Contact access / Early Access پرداخت کند؟

## Validated evidence from the initial MVP

Status: Validated within the limits of the documented MVP

MVP چهارماهه Rental Canada:
- Telegram channel members: 272
- Direct listing requests to Admin: 38
- Paying users: 2
- Price paid per listing: $2
- Initial revenue: $4
- Distribution: Website + Telegram Bot + Telegram Channel

Source calculations:
- Interaction: 38 / 272 = 13.9% (~14%)
- Payment conversion among direct listing requests: 2 / 38 = 5.2%

### What this evidence validates

Source explicitly concludes:
- این MVP نشان می‌دهد حداقل بعضی Userها برای ثبت و انتشار Listing پول پرداخت می‌کنند.

### What this evidence does not validate

Source explicitly says:
- Willingness-to-pay برای مشاهده Contact info هنوز اثبات نشده است.

### Audience caveat

Source می‌گوید Initial community احتمالاً Warm Audience بوده است، چون بخشی از Advertising هدفمند بوده است. بنابراین Result نباید بدون این Caveat به کل Market تعمیم داده شود.

## Experiment: trust through stronger profile

Status: Proposed / Hypothesis

Source یک Social Proof Loop ثبت می‌کند:

```text
Stronger profile
→ higher trust
→ more interaction
```

Facebook login می‌تواند 5 Coin reward داشته باشد تا Trust/Security را تقویت کند. Source Result آزمایشی برای اثر آن ارائه نمی‌کند.

## Experiment: display urgency/activity signals

Status: Proposed / Future

برای Passenger Cargo Listing detail، Source پیشنهاد می‌کند مواردی مانند:
- Views in last 24 hours
- تعداد Contact Requests

نمایش داده شود تا User برای اقدام انگیزه بیشتری پیدا کند.

اما Source همان‌جا احتمال اثر معکوس را مطرح می‌کند:
- اگر Contact Request count بالا باشد، User ممکن است از اقدام منصرف شود.

Alternative proposal:
- نمایش تعداد Online Users در 6 ساعت گذشته، چون احتمالاً عدد کوچک‌تری است.

این مورد برای Versionهای بعدی مطرح شده و Validation result ندارد.

## Pricing experiments / optimization direction

Status: Proposed / Future

Source به این موارد به‌عنوان Optimization اشاره می‌کند:
- Dynamic Pricing
- Premium Account
- Discount برای Verified users
- بازنگری چندباره Pricing بر اساس Conversion، Revenue و User Satisfaction

هیچ A/B test design، Sample Size، Statistical threshold یا Experiment result برای این موارد در Source وجود ندارد.

## Experimentation data gaps

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source تعریف نکرده است:
- Experiment owner
- Test duration standards
- Control / treatment assignment
- Statistical significance threshold
- Sample-size policy
- Guardrail metrics
- Experiment naming / tracking convention
