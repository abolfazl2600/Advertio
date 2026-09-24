# Listings

این فایل قواعد Backoffice مرتبط با Listing Entity، وضعیت‌ها، moderation handoff، lifecycle، محدودیت‌ها و عملیات Boost/Extend/Urgent را Consolidate می‌کند.

## Listing Entity

### Base fields
- Title
- Description
- Category
- Images
- Tagهای اجباری و اختیاری مخصوص هر Category

### Location
- Country
- Province / State
- City
- Area — optional

### Metrics
- Impression — مجموع نمایش در Searchها
- Detail View — تعداد دفعات بازشدن Listing
- Contact Requests Count — تعداد درخواست‌های مشاهده Contact info

## Submission and moderation flow

1. User ثبت‌نام و Phone Verification اجباری را انجام می‌دهد.
2. User یک Category انتخاب می‌کند.
3. Eligibility بررسی می‌شود.
4. Listing Form تکمیل می‌شود:
   - Title
   - Description
   - Images
   - Location: Country خودکار / Province / City / Area اختیاری
   - امکان ارسال Location در Telegram برای ثبت در سیستم
   - Optional fields بر اساس Category، مانند Price range، Area size، Job type، Origin، Destination، Date و غیره
5. Preview نمایش داده می‌شود: Edit | Confirm.
6. Submission با Status = Pending.
7. Admin Moderation: بررسی محتوا → Approve یا Reject.
8. در صورت تأیید، Listing منتشر و Lifecycle شروع می‌شود.
9. Source می‌گوید پس از تأیید Admin، انتشار در Channelهای ارتباطی مختلف نیز انجام می‌شود.

## Listing statuses

Listing Entity این وضعیت‌ها را ثبت می‌کند:
- Pending
- Approved
- Rejected
- Expired
- Extend
- Boost and Urgent

> ⚠️ Source Conflict
>
> در Listing Entity، وضعیت پس از تأیید «Approved» است.
>
> در Workflow انتشار، بعد از Admin approval وضعیت «Published» نوشته شده است.
>
> Source مشخص نمی‌کند Published یک Status مستقل است یا نام عملیاتی Approved؛ این مورد نیازمند تصمیم نهایی Product/Business است.

## Listing lifecycle

### Common rules
- Admin approval قبل از انتشار اجباری است.
- User می‌تواند Listing را deactivate کند؛ Listing در History باقی می‌ماند.
- Extend یا Promote در صورت نیاز قابل انجام است.
- Listing در پایان اعتبار Expired و از نتایج فعال حذف می‌شود.

### Source-defined lifecycle model A
- Active period با عنوان «Day 1–3» شروع می‌شود.
- آگهی پس از انتشار وارد Early Access می‌شود.
- آگهی‌های جدید تا 30 ساعت فقط برای کاربران دارای Early Access به‌صورت کامل قابل مشاهده‌اند.
- پس از پایان آن دوره، Listing رایگان برای همه قابل مشاهده می‌شود.
- Source می‌گوید این مدل برای همه Categoryها نیست و Housing، Jobs و Passenger Cargo را شامل می‌شود؛ سایر موارد رایگان هستند.
- Phase 2 با عنوان «Day 2–30» انتشار عمومی است.
- Day 31: Expired.
- پس از Expiry، Extend/Renew می‌تواند Listing را دوباره وارد چرخه انتشار کند.
- Performance reports تا یک ماه بعد از Expiry قابل مشاهده/ارسال است؛ سپس archive یا delete مطابق Data Retention Policy.

### Source-defined workflow model B
- Day 1–3: Free Interaction
  - کاربران بدون Coin پیام بدهند.
  - Contact info را ببینند.
- Day 4+: Monetization
  - مشاهده Contact info: 1 Coin (Early Access).
- Day 30: Expired.
- Telegram notifications برای Extend تا 15 روز بعد ذکر شده‌اند.

> ⚠️ Source Conflict
>
> Lifecycle model A، Early Access پولی/محدود را در ابتدای انتشار قرار می‌دهد و بعد از حدود 30 ساعت Contact را رایگان می‌کند.
>
> Workflow model B دقیقاً جهت معکوس را ثبت می‌کند: Day 1–3 رایگان و Day 4+ مشاهده Contact با 1 Coin.
>
> درباره Duration نیز Source یکدست نیست: در Lifecycle مقدار 30 ساعت آمده، در بخش مستقل Early Access عبارت «یک روزه» آمده، و عنوان Phase نیز «Day 1–3» است.
>
> Expiry هم در یک بخش از Day 31 شروع می‌شود، ولی Workflow دیگری Status = Expired را در Day 30 قرار می‌دهد.
>
> این موارد نیازمند تصمیم نهایی Product/Business هستند.

## Early Access contact behavior

در بخش مستقل Early Access:
- قبل از Early Access: Contact info به‌صورت masked.
- بعد از Early Access یک‌روزه: Contact info کامل.
- هزینه Early Access با Coin و قابل تنظیم در Admin Panel.
- Social / Event / Meetup برای مشاهده Contact به Coin نیاز ندارد، اما کاربر باید روی دکمه رسمی مشاهده Contact کلیک کند تا Analytics ثبت شود.
- پس از بازشدن ارتباط با یک Advertiser، ارتباط برای سایر Listingهای همان Advertiser تا 2 ماه باز می‌ماند.
- کسر Coin باید از طریق دکمه رسمی نمایش Contact انجام شود.

این Ruleها در کنار Conflict lifecycle بالا نگهداری می‌شوند و بدون تصمیم Product با یکدیگر merge نشده‌اند.

## One-active-listing rule

Rule اصلی:
- فقط یک Listing فعال در هر Category برای هر User مجاز است.

Source سه رفتار برای حالت تلاش جهت Listing مجدد ثبت کرده است:
1. در «محدودیت‌های کلیدی»: اگر User نیاز به Listing دیگری در همان Category داشته باشد، باید Fee مربوطه را پرداخت کند؛ Fee بر اساس Category متفاوت است.
2. در Bot workflow: اگر Listing فعال وجود داشته باشد، Warning نمایش داده می‌شود و User باید به Admin/Support پیام دهد؛ Flow ادامه خودکار ندارد.
3. در Coin Economy: دو Listing رایگان در یک Category ممکن نیست و اگر User مجدداً بعد از یک ماه در همان Category Listing ثبت کند، 5 Coin ذکر شده است.

> ⚠️ Source Conflict
>
> Source برای Listing دوم/مجدد در یک Category، هم «پرداخت Fee متغیر بر اساس Category»، هم «ارجاع به Admin/Support»، و هم Rule مربوط به 5 Coin بعد از یک ماه را ثبت کرده است.
>
> این رفتارها به‌صورت یک Flow واحد و بدون ابهام تعریف نشده‌اند و نیازمند تصمیم نهایی Product/Business هستند.

## Boost

- هزینه نمونه: 3 Coin.
- Dynamic by Admin.
- اثر:
  - بازگشت Listing به صدر نتایج
  - انتشار مجدد در Social communication channels
- در Public phase نیز می‌تواند Listing را مجدداً در صدر Search/Listها قرار دهد.

## Urgent

- User می‌تواند Urgent badge را با پرداخت هزینه اضافه کند.
- Listing در نتایج متمایز نمایش داده می‌شود.
- Fee به‌صورت مستقل برای هر Category از Admin Panel قابل تنظیم است.

## Extend / Renew

پس از Expiry:
- User با پرداخت Coin آگهی را برای 30 روز تمدید می‌کند.
- Extension اولیه:
  - Jobs و Social: 35 Coin
  - Housing: 65 Coin
- Extension دوم و بعد:
  - Jobs و Social: 55 Coin
  - Housing: 85 Coin
- همه این اعداد در Source «داینامیک توسط ادمین» توصیف شده‌اند.
- سایر Categoryها بر اساس Country و Category fee متفاوت دارند و توسط Admin تعیین می‌شوند.

جزئیات Pricing در [Pricing Management](./pricing-management.md).

## Ranking logic

ترتیب ذکرشده:
1. Boost شده‌ها
2. جدیدترین
3. Verified users
4. سایر Listingها

Source این Ranking را «بر اساس تاریخ با اولویت بالا» توصیف می‌کند.

## Crawled listings exception

Crawler فقط برای Cold Start است:
- Crawled Listing رایگان است و Monetization Advertio روی آن فعال نیست.
- User به Telegram account آگهی‌دهنده Redirect می‌شود.
- Chat داخلی، Review، Escrow و قابلیت‌های اختصاصی Advertio برای Crawled Listing فعال نیست.
- اگر صاحب Listing به Advertio join کند، Listingهای جدید Crawled آن User دیگر نباید خودکار ثبت شوند.
- Listingهای قبلی Crawled می‌توانند به‌عنوان History نمایش داده شوند.
