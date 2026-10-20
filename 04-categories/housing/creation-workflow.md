# ورکفلو ثبت آگهی مسکن (Housing Listing Creation)

> **مبنای بررسی:** کد شاخه \`master\` پروژه [Advertio Monorepo در GitLab](https://gitlab.com/advertio/platform/advertio-monorepo)، بررسی‌شده در ۲۰ اکتبر ۲۰۲۶. این سند **رفتار پیاده‌سازی‌شده در مخزن** را توصیف می‌کند، نه تأیید استقرار در Production.
>
> **دامنه:** آگهی مسکن و همخانه‌ای که خود کاربر از **Mini App** ثبت می‌کند (\`categorySlug = housing\`، \`SupplySource = User\`). ورود آگهی از Crawler مسیر مستقل \`/api/ingest\` دارد و موضوع این ورکفلو نیست.

## ۱. نتیجهٔ کلی

- ورودی: **Post** در Mini App ← انتخاب **Housing** ← صفحهٔ \`/housing/new\`.
- پیش‌شرط: احراز هویت و **شماره‌تلفن تأییدشده**؛ این کنترل هم در رابط کاربری (\`PhoneGate\`) و هم در API وجود دارد.
- فرم ثبت مسکن **سه مرحله** دارد: (۱) نوع آگهی، (۲) اطلاعات و مشخصات و موقعیت و عکس، (۳) پیش‌نمایش و ثبت.
- با زدن دکمهٔ \`Publish listing\`، درخواست \`POST /api/leads\` ارسال می‌شود؛ پاسخ موفق \`201 Created\` یک آگهی با وضعیت **\`PendingReview\`** می‌سازد؛ آگهی **همان لحظه در فید عمومی منتشر نمی‌شود**.
- ادمین آن را **Approve** یا با ذکر دلیل **Reject** می‌کند. تنها در تأیید، وضعیت \`Active\`، تاریخ انتشار/انقضا و رویداد \`LeadActivatedDomainEvent\` ثبت می‌شوند.
- بعد از فعال‌شدن، آگهی وارد فید/جزئیات عمومی می‌شود و می‌تواند با **Saved Searches** و **کانال‌های تلگرام فعال** تطابق پیدا کند؛ ارسال پیام جداگانه و ناهمگام است.

## ۲. نمودار روند کاربر تا انتشار

\`\`\`mermaid
flowchart TD
    A["Mini App: Post"] --> B["انتخاب Housing"]
    B --> C{"ورود و شماره تلفن تأیید شده؟"}
    C -- "خیر" --> D["PhoneGate: ورود / تأیید شماره"]
    D --> C
    C -- "بله" --> E["مرحله ۱: Rent یا Roommate"]
    E --> F["مرحله ۲: عنوان، توضیح، ویژگی‌ها، موقعیت، تصاویر"]
    F --> G["اعتبارسنجی فرم طبق Schema دسته"]
    G -- "خطا" --> F
    G -- "معتبر" --> H["مرحله ۳: Preview + هزینه ثبت"]
    H --> I["Publish listing"]
    I --> J["POST /api/leads"]
    J --> K{"اعتبارسنجی سرور و بررسی تکرار / موجودی کیف پول"}
    K -- "رد درخواست" --> L["پیغام خطا؛ پیش نویس برای اصلاح باقی می‌ماند"]
    L --> H
    K -- "قبول" --> M["201 Created / PendingReview"]
    M --> N["My Listings / نمایش جزئیات برای صاحب آگهی"]
    M --> O["Backoffice: صف بررسی ادمین"]
    O --> P{"تصمیم ادمین"}
    P -- "Reject + reason" --> Q["Rejected + RejectionReason"]
    P -- "Approve" --> R["Active + PublishedAt + ExpiresAt"]
    R --> S["فید و جزئیات عمومی"]
    R --> T["LeadActivatedDomainEvent / Outbox"]
    T --> U["تطبیق Saved Searches"]
    T --> V["تطبیق کانال‌های تلگرام"]
    U --> W["صف / Worker اعلان تلگرام"]
    V --> X["صف / Worker انتشار کانال"]
    R --> Y["Early → Public → Expired طبق Policy"]
\`\`\`

**توضیح:** عنوان دکمهٔ رابط کاربری \`Publish listing\` است، اما این دکمه *درخواست بررسی* ایجاد می‌کند. «ارسال اعلان به صاحب آگهی بعد از تأیید» در متن UI وعده داده شده، ولی در مسیرهای \`LeadActivatedDomainEvent\` بررسی‌شده، handler مستقلی برای تضمین این پیام به صاحب آگهی پیدا نشد؛ بنابراین در این نمودار آن را به‌عنوان رفتار قطعی رسم نکرده‌ایم.

## ۳. گام‌های دقیق فرم

| گام | کار کاربر | وابستگی/رفتار سیستم | خروجی موقت |
|---|---|---|---|
| ۰. ورود | Post → Housing | Journey Registry؛ مسیر \`/housing/new\` و \`PhoneGate\` | اجازه ورود به فرم |
| ۱. نوع آگهی | انتخاب \`rent\` یا \`roommate\` | گزینه‌ها از \`GET /api/categories/housing/attributes\` می‌آیند، نه فهرست هاردکد | \`listingType\` در state |
| ۲. اطلاعات پایه | عنوان، توضیحات | UI: عنوان ۳–۲۰۰ کاراکتر؛ توضیحات ۱۰–۲۰۰۰ | \`draft.title\`, \`draft.description\` |
| ۲. مشخصات مسکن | ملک، خواب، اجاره و سایر ویژگی‌ها | فیلدها، الزامی‌بودن، گزینه‌ها و شرط نمایش از Category Schema | \`draft.attributes\` |
| ۲. موقعیت | کشور کانادا، استان، شهر، محله اختیاری | استان/شهر از Location API؛ تغییر استان، شهر انتخابی را پاک می‌کند | \`countryCode=CA\` و \`province/city/neighborhood\` |
| ۲. عکس‌ها | بارگذاری، حذف/تعیین عکس اصلی | آپلود تک‌به‌تک و مستقل از ثبت آگهی از طریق \`POST /api/media\`؛ حداکثر ۱۰ عکس و ۸ مگابایت برای هر عکس | آرایهٔ \`photos\` حاوی \`key\`, \`url\`, \`thumbUrl\` |
| ۳. پیش‌نمایش | بررسی عکس اصلی، عنوان، توضیح، مشخصات و هزینه | هزینه از Policy/Pricing دسته واکشی می‌شود و لزوماً همیشه رایگان نیست | آمادهٔ ارسال |
| ۳. ارسال | کلیک \`Publish listing\` | \`POST /api/leads\` با داده‌های نرمال‌شده؛ پس از موفقیت، reset فرم و انتقال به صفحهٔ جزئیات آگهی | \`Lead.Id\` و \`PendingReview\` |

### نوع‌های اصلی و مشخصات مسکن

**ضروری در Category Schema** (به‌جز استثنای قیمت):

| کلید | نوع | مقدار/قاعده |
|---|---|---|
| \`listing_type\` | select | \`rent\` / \`roommate\` |
| \`property_type\` | select | \`apartment\`, \`condo\`, \`basement\`, \`studio\`, \`room\`, \`house\` |
| \`bedrooms\` | select | رشتهٔ \`"0"\`, \`"1"\`, \`"2"\`, \`"3"\`, \`"4+"\` |
| \`price\` | number | اجارهٔ ماهانه به CAD، از ۱۰۰ تا ۱۰٬۰۰۰؛ **مگر وقتی** \`price_negotiable=true\` |
| \`price_negotiable\` | boolean | اگر درست باشد، \`price\` همراه آن ارسال نمی‌شود |

**سایر فیلدهای پشتیبانی‌شده در Schema** (اختیاری، بسته به نوع/شرایط): \`furnishing\`, \`gender_preference\`, \`age_range\`, \`lifestyle_tags\`, \`pets_allowed\`, \`available_from\`, \`rental_duration\`, \`area\`, \`bathrooms_count\`, \`floor_number\`, \`year_built\`, \`is_owner\`, \`smoking_allowed\`, \`amenities\`.

سه فیلد \`gender_preference\`, \`age_range\`, \`lifestyle_tags\` فقط در حالت \`roommate\` نمایش داده می‌شوند. گزینه‌های دقیق و محدودیت‌ها را **API زندهٔ Schema** تعیین می‌کند. فیلدهای اختیاری خالی قبل از ساخت \`attributesJson\` حذف می‌شوند؛ عدد اجاره هنگام انتخاب «توافقی» حذف می‌شود.

## ۴. ارتباط اجزای سیستم

\`\`\`mermaid
flowchart LR
    User["کاربر"] --> Web["Mini App / Housing Wizard"]
    Web --> Auth["Identity / PhoneGate"]
    Web --> Category["Category API: schema"]
    Web --> Location["ReferenceData API: location"]
    Web --> Pricing["Config API: category pricing"]
    Web --> Media["Media API: uploads"]
    Media --> Storage["Object Storage: keys, thumbnails, full image"]
    Web --> LeadAPI["Lead API: POST /api/leads"]
    LeadAPI --> LeadApp["CreateLeadCommandHandler"]
    LeadApp --> Auth
    LeadApp --> Category
    LeadApp --> Location
    LeadApp --> Dedup["Duplicate Detection"]
    LeadApp --> Wallet["Wallet / pricing charge"]
    LeadApp --> DB["PostgreSQL: lead.leads"]
    Admin["Backoffice Admin"] --> Mod["Approve / Reject APIs"]
    Mod --> DB
    Mod --> Event["LeadActivatedDomainEvent via Outbox"]
    Event --> Saved["Notification: Saved Search matching"]
    Event --> Channels["Notification: Channel matching"]
    Saved --> Telegram["Telegram notification worker"]
    Channels --> Publisher["Telegram channel worker"]
\`\`\`

| بخش | مسئولیت | API یا مکان |
|---|---|---|
| **Mini App** | ویزارد سه‌مرحله‌ای، validation، draft، پیش‌نمایش | \`apps/web/src/features/housing/\` |
| **Identity** | احراز هویت/تأیید شماره؛ استخراج \`userId\` از session و نه payload کاربر | \`PhoneGate\` + \`PhoneVerified\` |
| **Category** | فیلدهای پویا و validation سمت سرور | \`GET /api/categories\`; \`GET /api/categories/housing/attributes\` |
| **ReferenceData** | کاتالوگ کشور/استان/شهر و حل نام استاندارد | \`GET /api/locations/*\` |
| **Media + Storage** | آپلود عکس و ساخت کلید؛ ذخیرهٔ کلید به‌جای URL در آگهی | \`POST /api/media\` |
| **Lead** | بررسی مجاز بودن، محدودیت آگهی، مکان، Schema، تکراری بودن و ایجاد آگهی | \`POST /api/leads\` |
| **Wallet + Config** | دریافت قیمت تنظیم‌شدهٔ ثبت آگهی و کسر احتمالی سکه در تراکنش | \`LeadAction.CreateListing\` |
| **Backoffice** | مشاهدهٔ Pending، تأیید یا رد با دلیل | \`/api/admin/leads/pending\` و \`/{id}/approve|reject\` |
| **Notifications** | بعد از فعال‌سازی: انطباق Saved Search و Channel؛ ثبت کار در صف و ارسال توسط Worker | \`LeadActivatedDomainEvent\`، Outbox، Notification |
| **Lifecycle** | تبدیل Early به Public، انقضا و پایان Boost | \`LeadLifecycleWorker\` |

**رابطه با ربات تلگرام:** برای ثبت Housing مسیر تأییدشدهٔ این بررسی **Mini App** است و API ایجاد آگهی \`CreationSource=MiniApp\` ثبت می‌کند. بعد از تأیید، ربات/کانال تلگرام در نقش **توزیع و اعلان** عمل می‌کند؛ ثبت آگهی مستقیم از یک فرم چندمرحله‌ای داخل خود ربات، مسیر مستند این پیاده‌سازی نیست.

## ۵. دقیقاً چه چیزی به API ارسال می‌شود؟

در Step Preview، فرم \`CreateLeadPayload\` را می‌سازد. نمونهٔ **فرضیِ صرفاً نمایشی**:

\`\`\`json
{
  "title": "1-bedroom condo near subway",
  "description": "Bright unit, available next month, near transit.",
  "categoryId": "<GUID returned by GET /api/categories>",
  "categorySlug": "housing",
  "attributesJson": "{\"listing_type\":\"rent\",\"property_type\":\"condo\",\"bedrooms\":\"1\",\"price\":2100,\"furnishing\":\"furnished\",\"amenities\":[\"parking\",\"balcony\"]}",
  "countryCode": "CA",
  "province": "ON",
  "city": "toronto",
  "neighborhood": "Midtown",
  "mediaKeys": ["<opaque key returned by POST /api/media>"]
}
\`\`\`

- \`attributesJson\` **رشتهٔ JSON** است، نه JSON object. سرور آن را اعتبارسنجی و نرمال می‌کند و داخل ستون \`jsonb\` ذخیره می‌کند.
- \`categoryId\` شناسهٔ واقعی دسته است و \`categorySlug\` برای Housing همیشه \`housing\` است.
- \`countryCode\` در فرم فعلی Housing برابر \`CA\` است؛ استان و شهر با **کد** ارسال می‌شوند؛ سرور نام استاندارد آن‌ها را ذخیره می‌کند.
- \`mediaKeys\` کلیدهای برگردانده‌شده از سرویس Media هستند؛ URL عکس برای پیش‌نمایش است و در Lead نگهداری نمی‌شود.
- \`publisherId\` در درخواست وجود ندارد؛ سرور آن را از کاربر احرازشده می‌گیرد.
- فیلد \`autoPublish\` مربوط به **Crawler Ingest** است، نه این API.

## ۶. چه داده‌هایی در دیتابیس ثبت می‌شوند؟

رکورد اصلی در جدول **\`lead.leads\`** ذخیره می‌شود.

| گروه | ستون‌ها / مفهوم |
|---|---|
| شناسه و مالک | \`Id\`، \`PublisherId\` |
| محتوای آگهی | \`Title\`، \`Description\` |
| دسته‌بندی | \`CategoryId\`، \`CategorySlug=housing\` |
| مشخصات | \`AttributesJson\` (ستون \`jsonb\`) |
| موقعیت | \`CountryCode\`، \`Province\`، \`City\`، \`Neighborhood\` |
| عکس‌ها | \`MediaKeysJson\` (آرایهٔ JSON کلیدهای Storage؛ عکس اول = کاور) |
| وضعیت و زمان | \`Status\`، \`Phase\`، \`CreatedAtUtc\`، \`PublishedAtUtc\`، \`ExpiresAtUtc\`، \`UpdatedAtUtc\` |
| منشأ | \`SupplySource=User\`، \`CreationSource=MiniApp\` |
| قیمت تعامل/تبلیغ | \`ContactCost\`، \`IsUrgent\`، \`IsBoosted\`، \`BoostedUntil\` |
| مدیریت | \`RejectionReason\`؛ در صورت رد/برداشت ادمین |
| کنترل تکرار | \`ContentFingerprint\`؛ در موارد مشابه رکورد تشخیص در جدول/مدل \`LeadDuplicateDetection\` |
| ستون‌های مخصوص Crawler | \`SourceName\`، \`SourceExternalId\`، \`SourceUrl\`، \`SourceContactHandle\` و ... برای این مسیر **خالی** هستند |

هنگام ایجاد: \`Status=PendingReview\`، \`Phase=Early\` و \`CreatedAtUtc=now\`. زمان انتشار/انقضا **هنوز مقدار ندارند** و فقط در \`Approve\` تنظیم می‌شوند. مبلغ ایجاد آگهی، اگر غیرصفر باشد، به‌واسطهٔ سرویس Wallet و Ledger پردازش می‌شود؛ جزئیات دفتر کل را نباید با جدول \`leads\` یکی فرض کرد.

## ۷. کنترل‌ها و پاسخ‌ها

1. **مجوز:** بدون ورود و شمارهٔ تأییدشده، ایجاد آگهی و آپلود عکس پذیرفته نمی‌شوند.
2. **تک‌آگهی فعال در هر دسته:** اگر کاربر از قبل در Housing آگهی فعال داشته باشد، ثبت دوم رد می‌شود.
3. **صحت فرم:** عنوان/توضیح، location و همهٔ attributeها در UI کنترل می‌شوند؛ سرور اعتبار Schema و تعلق شهر به استان/کشور را مجدداً بررسی می‌کند.
4. **عکس:** حداکثر ۱۰ عکس؛ کلید هر عکس باید متعلق به همان کاربر باشد. عکس‌ها جداگانه آپلود می‌شوند، بنابراین در صورت رها کردن فرم ممکن است فایل بدون ارجاع باقی بماند؛ \`OrphanMediaReaper\` برای پاک‌سازی پس از مهلت ۲۴ ساعته وجود دارد.
5. **آگهی تکراری:** بررسی تکراری/شباهت **قبل از کسر سکه و ثبت رکورد** است؛ تکراری قطعی رد می‌شود؛ مشابه ممکن است ثبت شود و برای بررسی علامت بخورد.
6. **هزینه:** مبلغ \`create_listing\` از قیمت‌گذاری دسته می‌آید. اگر موجودی کافی نباشد، ثبت انجام نمی‌شود و رابط کاربری امکان افزودن سکه را پیشنهاد می‌کند؛ ثبت و کسر سکه در یک تراکنش مدیریت می‌شوند.
7. **پاسخ موفق:** \`201 Created\` همراه DTO آگهی و مسیر \`/api/leads/{id}\`. فرم پاک می‌شود و کاربر به جزئیات آگهی می‌رود؛ آگهی همچنان \`PendingReview\` است.

## ۸. تأیید، توزیع و چرخهٔ عمر

| انتقال | عامل | اثر |
|---|---|---|
| \`PendingReview → Active\` | ادمین با \`POST /api/admin/leads/{id}/approve\` | درج \`PublishedAtUtc\` و \`ExpiresAtUtc\`، تثبیت \`ContactCost\` طبق Policy، رویداد \`LeadActivatedDomainEvent\` |
| \`PendingReview → Rejected\` | ادمین با \`POST /api/admin/leads/{id}/reject\` و دلیل | ثبت \`RejectionReason\`؛ عدم انتشار |
| \`Active: Early → Public\` | Lifecycle Worker | بعد از \`EarlyWindowHours\` دسته |
| \`Active → Expired\` | Lifecycle Worker | با گذشت \`ListingTtlDays\` از انتشار؛ ایجاد رویداد برداشت |
| \`Active/PendingReview → Deactivated\` | کاربر یا ادمین (با مجوز مناسب) | برداشتن آگهی؛ دلیل برای takedown ادمین ضروری است |

مقادیر اولیهٔ policy در Seeder برابر **۷۲ ساعت Early** و **۳۰ روز عمر آگهی** است، اما **قابل‌تنظیم** هستند؛ آن‌ها را مقدار ثابت محصول تلقی نکنید.

**رویداد تأیید:** \`LeadActivatedDomainEvent\` به Outbox می‌رود. دو handler آن، انطباق با **Saved Search** و **کانال‌های فعال تلگرام** را انجام می‌دهند؛ رکوردهای Pending برای تحویل می‌سازند و Workerهای جدا ارسال می‌کنند. **هر آگهی لزوماً در همهٔ کانال‌ها منتشر نمی‌شود** و هر کاربر نیز لزوماً اعلان دریافت نمی‌کند. همه‌چیز به فیلترها، فعال‌بودن تنظیمات و امکان تحویل بستگی دارد.

## ۹. مرزهایی که نباید اشتباه گرفته شوند

- **ثبت آگهی کاربر ≠ ورود آگهی Crawler:** مسیر کاربر \`POST /api/leads\`، منشأ \`User/MiniApp\` و تأیید اجباری دارد؛ مسیر Crawler از \`/api/ingest\` استفاده می‌کند.
- **Save Listing ≠ Create Listing:** ذخیرهٔ یک آگهی برای بازدیدکننده رکوردی در ماژول Interaction می‌سازد؛ \`leads\` را از نو ایجاد نمی‌کند.
- **Saved Search ≠ آگهی:** Saved Search قانون تطبیق کاربر برای اعلان است؛ رویداد فعال‌شدن آگهی می‌تواند آن را تحریک کند.
- **ساخت آگهی ≠ انتشار در فید:** فقط آگهی \`Active\` از فیلتر انتشار عمومی عبور می‌کند.
- **پیش‌نویس ویزارد ≠ Draft دیتابیس:** تا پیش از کلیک موفق \`Publish listing\`، \`draft\` و \`photos\` در state سمت Mini App نگه داشته می‌شوند؛ مرحلهٔ مستقلِ ذخیرهٔ \`Draft Lead\` در این مسیر مشاهده نشد.

## ۱۰. مراجع پیاده‌سازی (GitLab master)

- [مسیر ویزارد Housing](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/apps/web/src/features/housing/components/CreateListingWizard.tsx)
- [State و عکس‌ها](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/apps/web/src/features/housing/stores/useCreateListingStore.ts)
- [اعتبارسنجی فرم](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/apps/web/src/features/housing/api/attributeSchema.ts)
- [کد ارسال درخواست Create](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/apps/web/src/shared/listing/api/useCreateLead.ts)
- [تعریف ویژگی‌های دسته‌ها](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Category/Advertio.Modules.Category.Infrastructure/Seed/CategorySeeder.cs)
- [API آگهی و ادمین](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Advertio.Api/Modules/Lead/LeadEndpoints.cs)
- [منطق ایجاد و کنترل‌ها](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Lead/Advertio.Modules.Lead.Application/Leads/Commands/CreateLeadCommandHandler.cs)
- [مدل Lead و چرخهٔ عمر](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Lead/Advertio.Modules.Lead.Domain/Leads/Lead.cs)
- [نگاشت پایگاه داده](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Lead/Advertio.Modules.Lead.Infrastructure/Persistence/Configurations/LeadConfiguration.cs)
- [پردازش انطباق کانال](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Notification/Advertio.Modules.Notification.Application/Channels/EventHandlers/LeadActivatedChannelPublishHandler.cs)
- [پردازش انطباق Saved Search](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/backend/src/Modules/Notification/Advertio.Modules.Notification.Application/SavedSearches/EventHandlers/LeadActivatedNotificationHandler.cs)
