# Extend / Renew

Extend/Renew برای فعال‌سازی دوباره Listing پس از پایان مدت اعتبار استفاده می‌شود.

## Lifecycle

- Listing تا پایان دوره اعتبار فعال است.
- Source Day 30 / Day 31 را به‌عنوان مرز Expiry توصیف می‌کند.
- با پایان اعتبار، Status = Expired و Listing از نتایج فعال حذف می‌شود.
- User می‌تواند با پرداخت Coin، Listing را دوباره فعال کند.
- پس از Extend، Listing دوباره وارد چرخه انتشار می‌شود.

## Extension Duration

هر Extend ذکرشده در Source:
- **30 days**

## Pricing

### First 30-day extension
- Jobs: 35 Coin
- Social: 35 Coin
- Housing: 65 Coin

### Second 30-day extension and later
- Jobs: 55 Coin
- Social: 55 Coin
- Housing: 85 Coin

### Other Categories
هزینه بر اساس:
- Country
- Category

متفاوت است و Admin آن را Dynamic تعیین می‌کند.

تمام اعداد بالا طبق Pricing Policy نمونه/قابل بازنگری و Admin-configurable هستند.

## Verified User Discount

Status: Proposed / Example

Source مثال می‌زند اگر User «احراز کامل» داشته باشد:
- برای Extend می‌تواند **35% discount** دریافت کند.

Source این Rule را به‌عنوان Example در Pricing Strategy آورده است و جزئیات Eligibility «احراز کامل» را دقیق‌تر تعریف نمی‌کند.

## Notifications

Before expiry:
- اخطار از **3 روز قبل از Expiry**
- Source می‌گوید هر روز ارسال می‌شود.

After expiry:
- Bot workflow می‌گوید Telegram notificationها تا **15 روز بعد** ادامه پیدا می‌کنند تا User در صورت نیاز Extend کند.

Listing performance reports:
- بخش دیگری Source می‌گوید Performance report تا **یک ماه بعد از Expiry** قابل مشاهده/ارسال است.

این دو بازه درباره دو نوع اطلاع‌رسانی متفاوت هستند: renewal reminder و performance reporting.

## Revenue Loop

    Expire → User still needs listing → Extend

## Related

- [Pricing](./pricing.md)
- [Coin Economy](./coin-economy.md)
- [Boost](./boost.md)
