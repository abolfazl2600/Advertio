# Channels Management

Source Document برای Admin Panel یک بخش مشخص جهت مدیریت Channelهای ارتباطی و Ruleهای انتشار تعریف می‌کند.

## Admin channel-routing rule

Admin باید بتواند مشخص کند Listingهایی با شرایط خاص، بر اساس Attributeها و Tagها، در Channelهای منتخب منتشر شوند.

Flow قابل استخراج:

```text
Listing approved
→ evaluate attributes/tags
→ match configured routing rule
→ select destination communication channel
→ publish via the corresponding bot/channel integration
```

Source جزئیات فنی Rule Engine یا API را تعریف نکرده است.

## Source examples

### Example 1
- Province = Ontario
- Category = Jobs
- نتیجه: ارسال به Telegram channel مربوطه

### Example 2
- City = Toronto
- Category = Event
- نتیجه برنامه‌ریزی‌شده: ترجمه به English و سپس انتشار در Channel مربوطه

Translation برای Versionهای بعدی ذکر شده است و Current behavior قطعی نیست.

## Current behavior

- Telegram Bot/Channel یکی از کانال‌های اصلی MVP است.
- Version 1.0 شامل Telegram Notifications و Telegram Crawler Integration برای Initial Supply است.
- پس از Admin approval، Source انتشار Listing در Communication Channelهای مختلف را ذکر می‌کند.
- Telegram acquisition strategy شامل:
  - Telegram group
  - direct link to Mini App
  - انتشار Listing در Channel
  - Notifications

## Future / expanded behavior

### Multi-language routing
در Future:
- Listing translation
- تفکیک Channel بر اساس Country
- City
- Language

Source برای Phase 3 به «کانال‌های ارتباطی به‌صورت تفکیک‌شده کشور – شهر – زبان» اشاره می‌کند.

### Additional communication platforms
در Vision/Strategy:
- Telegram
- WhatsApp
- Website
- سایر Platformها

Version 2.5 مشخصاً WhatsApp Integration را ذکر می‌کند.

### Paid promotion — Future
Source مصرف Coin برای Promote کردن Listing در Google Ads یا Telegram Ads را در Versionهای آینده ذکر می‌کند.

## AI Listing Translation — Future

پس از ثبت یا Edit Listing:
- AI متن را تحلیل می‌کند.
- Title، Description و ویژگی‌های متنی ترجمه می‌شوند.
- User Listing را بر اساس زبان انتخابی مشاهده می‌کند.

در بخش دیگری از Source گفته شده Translation پس از اولین ترجمه cache می‌شود و لزوماً چندین ترجمه دائمی برای هر Listing ذخیره نمی‌شود.

این Translation می‌تواند پیش از Channel publication در Ruleهایی مثل Toronto Event استفاده شود، اما Current feature نیست.

## Crawler boundary

Telegram Crawler:
- فقط برای Cold Start و Initial Supply است.
- Core Platform نیست.
- به‌صورت Service مستقل تعریف شده که Structured Data را از طریق API به Advertio می‌دهد.
- Crawled Listingها رایگان‌اند و Monetization Advertio روی آن‌ها فعال نیست.
- User در Crawled Listing مستقیماً به Telegram account Advertiser Redirect می‌شود.

این سرویس ورودی داده است و با Admin Channel Routing برای انتشار خروجی یکسان نیست.

## Targeted broadcast / advertising

Source یک نوع Notification/Promotion هدفمند را ذکر می‌کند:
- محدوده شهری
- Category
- City
- Country
- هزینه به‌صورت توافقی با Admin

جزئیات Trigger و Pricing formula مشخص نشده است. Notification rules در [Notifications](./notifications.md) نگهداری می‌شود.
