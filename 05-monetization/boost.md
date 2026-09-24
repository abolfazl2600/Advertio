# Boost

Boost مکانیزم پولی افزایش Visibility یک Listing است.

## Versioning

- در Roadmap، Boost در **Version 1.1 — Wallet & Monetization Base** آمده است.
- در بخش MVP vs Future، Boost در **Phase 2** ذکر شده است.

## Trigger

User می‌تواند در دوره فعال Listing، در صورت نیاز به Visibility بیشتر یا Response پایین، Boost را استفاده کند.

Revenue Loop:

    Low Response → Boost → Listing دیده می‌شود

## Price

Source example:
- **3 Coin**
- Dynamic by Admin

Pricing Policy کلی نیز می‌گوید هزینه‌ها بر اساس Country، Category، Supply/Demand، User behavior و Unit Economics قابل تغییر هستند.

See [Pricing](./pricing.md).

## Effects

Boost:
- Listing را به صدر نتایج برمی‌گرداند.
- باعث انتشار مجدد Listing در Social communication channels می‌شود.
- در Public phase نیز می‌تواند Listing را مجدداً در صدر Search/List نمایش دهد.

## Ranking

Source Ranking priority:
1. Boosted listings
2. Newest
3. Verified users
4. Other listings

بنابراین Boost بالاترین Priority صریح ذکرشده در Ranking Logic را دارد.

## Listing System Status

Hidden system filter:

    boost_status = normal | boosted | featured | urgent

Source رفتار دقیق featured را جداگانه تعریف نمی‌کند.

## Admin Rule

هزینه Boost باید از Admin قابل تنظیم باشد.

## Related

- [Pricing](./pricing.md)
- [Coin Economy](./coin-economy.md)
- [Urgent](./urgent.md)
