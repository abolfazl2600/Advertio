# Early Access

Early Access یکی از مکانیزم‌های اصلی Monetization است که ارزش زمانی Listingهای جدید و قصد واقعی User برای برقراری ارتباط را هدف می‌گیرد.

## Contact Display Rules

### Before access
Contact info به‌صورت ناقص / masked نمایش داده می‌شود.

### After access
در بخش مستقل Early Access، Source می‌گوید پس از Early Access یک‌روزه، Contact info کامل نمایش داده می‌شود.

### Payment
- Early Access با Coin انجام می‌شود.
- مقدار Coin باید از Admin Panel قابل تنظیم باشد.
- در Revenue Loop و Bot Workflow عدد **1 Coin** ذکر شده است.
- کسر Coin باید از طریق دکمه رسمی نمایش Contact انجام شود.

## Category Rules

Source مدل Early Access پولی را برای این Categoryها ذکر می‌کند:
- Housing
- Jobs
- Passenger Cargo

برای سایر موارد، Source می‌گوید رایگان هستند.

به‌صورت مشخص:
- Social
- Event
- Meetup

برای این دسته‌ها Coin لازم نیست؛ با این حال User باید روی دکمه مشاهده Contact کلیک کند تا Analytics مرتبط ثبت شود.

## Advertiser-Level Unlock

پس از بازشدن ارتباط با یک Advertiser، Source می‌گوید Contact برای سایر Listingهای همان Advertiser تا **2 ماه** باز می‌ماند.

## Analytics

Contact Requests Count یکی از Listing metrics است.

برای Listing owner، Source گزارش‌هایی شامل موارد زیر را ذکر می‌کند:
- Views / Detail View
- مشاهده Contact info
- Click روی راه ارتباطی

## Lifecycle Models in Source

### Model A — Early paid window first
- Listing پس از انتشار وارد Early Access می‌شود.
- Listingهای جدید تا **30 ساعت** فقط برای Userهای دارای Early Access به‌صورت کامل قابل مشاهده‌اند.
- بعد از پایان این دوره، Listing رایگان برای همه قابل مشاهده می‌شود و Contact info نیز بدون پرداخت در دسترس قرار می‌گیرد.
- منطق بیان‌شده: ارزش بسیاری از Listingها در ساعات/روزهای اول بیشتر است.

### Model B — One-day access wording
در بخش مستقل Contact System:
- «بعد از Early Access (یک روزه)» Contact info کامل نمایش داده می‌شود.

### Model C — Free first, paid later
در Bot workflow:
- Day 1–3: Free Interaction؛ User می‌تواند بدون Coin پیام بدهد و Contact info را ببیند.
- Day 4+: Monetization Phase؛ مشاهده Contact = **1 Coin (Early Access)**.

> ⚠️ Source Conflict
>
> یک بخش، Early Access پولی/محدود را در ابتدای انتشار تعریف می‌کند و مدت آن را 30 ساعت ذکر می‌کند؛ بخش دیگری از Early Access یک دوره یک‌روزه را بیان می‌کند.
>
> Bot workflow جهت زمانی متفاوتی دارد: Day 1–3 را رایگان و Day 4+ را پولی تعریف می‌کند.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Notifications Around Early Access

در دوره فعال، Source می‌گوید Advertiser باید مطلع شود که پس از پایان Early Access، Listing وارد نمایش عمومی می‌شود و برای حفظ جایگاه می‌تواند از Upgradeهای Listing استفاده کند.

## Validation Status

Status: Hypothesis / Not Yet Validated

Source پس از نتایج MVP اولیه صراحتاً می‌گوید:
- پرداخت برای **ثبت و انتشار Listing** مشاهده شده است.
- پرداخت برای **مشاهده Contact info / Early Access** هنوز اثبات نشده است.

## Related

- [Pricing](./pricing.md)
- [Coin Economy](./coin-economy.md)
- [Monetization Model](./monetization-model.md)
