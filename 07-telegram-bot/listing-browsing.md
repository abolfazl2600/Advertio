# Listing Browsing

## Entry Point

Telegram Bot Main Menu شامل گزینه **View Listings** است.

Source UI دقیق صفحه Browse را به‌صورت کامل تعریف نمی‌کند، اما Rules مرتبط با مشاهده Listing، Contact، Ranking، Crawler و Analytics را مشخص کرده است.

## Listing Visibility & Ranking

Basic Ranking در Version 1.2 تعریف شده است.

ترتیب Source:
1. Boosted
2. Newest
3. Verified users
4. Other listings

Source می‌گوید ترتیب کلی بر اساس Date است، با Priorityهای بالا.

## Contact Access

### Masked state
قبل از Early Access، Contact info به‌صورت Masked / ناقص نمایش داده می‌شود.

### Official contact button
برای نمایش Contact، Source وجود یک Button رسمی را الزام می‌کند:
- Contact info باید از طریق همین Button نمایش داده شود.
- در Flow پولی، Coin از Wallet از همین مسیر کسر می‌شود.
- Click / Contact Request برای Analytics ثبت می‌شود.

### Free-contact Categories
برای:
- Social
- Event
- Meetup

Coin نیاز نیست، ولی User همچنان باید روی Contact button کلیک کند تا Analytics ثبت شود.

### Advertiser-level unlock
پس از Early Access، ارتباط با سایر Listingهای همان Advertiser تا **2 ماه** باز می‌ماند.

## Early Access Timing Models

### Model A — paid access first
در Listing Lifecycle:
- Listing پس از انتشار وارد Early Access می‌شود.
- تا **30 ساعت** فقط Userهای دارای Early Access Listing را به‌صورت کامل می‌بینند.
- پس از آن Listing و Contact برای همه رایگان می‌شود.
- این مدل برای Housing، Jobs و Passenger Cargo ذکر شده است.

### Model B — one-day wording
بخش مستقل Contact System از **Early Access یک‌روزه** صحبت می‌کند.

### Model C — free first, paid later
در Telegram Bot Workflow:
- Day 1–3: Free Interaction
  - بدون Coin پیام
  - Contact info قابل مشاهده
- Day 4+: Monetization
  - Contact view = **1 Coin**

> ⚠️ Source Conflict
>
> Source سه بیان ناسازگار برای Timing Early Access دارد: 30 ساعت پولی در ابتدای Lifecycle، Early Access یک‌روزه، و Telegram Bot flow که Day 1–3 را رایگان و Day 4+ را پولی تعریف می‌کند.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Contact Payment / Low Balance

در Flow پولی:
- Contact view می‌تواند 1 Coin باشد.
- Pricing باید Admin-configurable باشد.
- اگر Balance کمتر از Required Coins باشد، Low Balance behavior فعال می‌شود.

جزئیات در [Wallet](./wallet.md).

## Crawled Listings

برای Listingهای Crawl‌شده:
- Listing رایگان است.
- Advertio Monetization فعال نیست.
- User مستقیم به Telegram account آگهی‌دهنده Redirect می‌شود.
- Chat داخلی، Review، Escrow و Featureهای اختصاصی Advertio فعال نیستند.

## Listing Metrics Visible / Reported

Source این Metrics را تعریف می‌کند:
- Impression
- Detail View
- Contact Requests Count

در Bot performance flow:
- Reaching views
- Contact Requests
- Detail Listing View

Source همچنین Daily Telegram notification برای Performance ذکر می‌کند.

## Passenger Cargo Future Display Idea

Status: Proposed / Future

Source برای Passenger Cargo مطرح می‌کند که در Listing detail شاید نمایش داده شود:
- Views در 24 ساعت گذشته
- تعداد Userهایی که Contact info درخواست کرده‌اند

اما Source هشدار می‌دهد تعداد زیاد Contact Request ممکن است اثر معکوس داشته باشد.

Alternative پیشنهادی:
- نمایش تعداد Userهای Online در 6 ساعت گذشته

این Feature برای Versionهای بعدی مطرح شده و Final Rule نیست.

## Related

- [Flows](./flows.md)
- [Notifications](./notifications.md)
- [Wallet](./wallet.md)
