# Categories Management

Source Document هم Taxonomy دسته‌بندی‌ها و هم برخی Attribute/Filterهای Category-specific را تعریف کرده است. این فایل فقط مواردی را ثبت می‌کند که برای Backoffice مدیریت دسته‌ها قابل استناد است؛ Source workflow کامل CRUD برای Categoryها ارائه نکرده است.

## Category structures present in Source

### Product-level category list
در بخش Categories:
- Passenger Cargo
- Housing & Roommate
- Social & Events
- Jobs
- Services
- Human Match

### Telegram Bot category selection
در Main Menu ثبت Listing:
- Housing
- Jobs
- Services
- Cargo
- Social and Event

### Later system taxonomy
Source در بخش دیگری می‌گوید ساختار سیستم «به شرح زیر خواهد بود و قابل اصلاح خواهد بود»:

#### HOUSING
- rental_apartments
- roommates

#### SERVICES
- home_services
- professional_services
- education_tutoring
- personal_services

#### TRAVEL_TRANSPORT
- passenger_cargo
- ride_sharing
- logistics_shipping

#### SOCIAL
- events
- meetups
- study_partner
- sports_partner
- other_partner
- p2p_exchange_request

> ⚠️ Source Conflict
>
> ساختارهای مختلف Source یک Taxonomy یکسان ارائه نمی‌کنند.
>
> در فهرست‌های اولیه، Jobs یک Category اصلی است و Human Match نیز مستقل ذکر شده است.
>
> در Taxonomy بعدی که «ساختار سیستم» نامیده شده، Jobs و Human Match به‌عنوان Top-level category نمایش داده نشده‌اند و Passenger Cargo زیر TRAVEL_TRANSPORT قرار گرفته است.
>
> این تفاوت بدون تصمیم Product/Business resolve نشده است.

## Current vs future categories

### Current / prioritized
- Version 1.0 تمرکز اصلی: Housing (Rental & Roommate)
- Category priority بعدی در بخش Target Market: Jobs
- Bot workflow نیز Housing، Jobs، Services، Cargo و Social/Event را برای انتخاب نمایش می‌دهد.

### Future / proposed
- Passenger Cargo در Version 2.5 Roadmap نیز به‌عنوان Expansion feature ذکر شده است، در حالی که Bot workflow نام Cargo را در Category menu نشان می‌دهد؛ Source تاریخ دقیق فعال‌شدن عملیاتی آن را یکدست تعریف نکرده است.
- Human Matching در Version 2.5 Roadmap آمده است.
- Peer Exchange صراحتاً برای Version فعلی غیرفعال و «شاید بعداً» توصیف شده است.
- SOCIAL taxonomy با این حال `p2p_exchange_request` را در ساختار دسته‌ها نگه می‌دارد؛ این را می‌توان Taxonomy برنامه‌ریزی‌شده دانست، نه اثبات فعال‌بودن Feature.

## Category-specific fields

Source می‌گوید Listing شامل Tagهای اجباری و اختیاری مخصوص هر Category است و Listing Form نیز Optional Fields را بر اساس Category تغییر می‌دهد.

نمونه‌ها:
- Housing: Price range، Area size
- Jobs: Job type
- Cargo: Origin، Destination، Date

برای جزئیات Housing و Cargo، Source Attributeهای بیشتری تعریف کرده است، اما این فایل فقط نقش مدیریتی آن‌ها را ثبت می‌کند:
- Attribute/Tagها مبنای Filter و Channel routing هستند.
- بعضی هزینه‌ها بر اساس Country و Category متفاوت و از Admin Panel قابل تنظیم‌اند.
- یک Listing فعال در هر Category Rule مشترک است.

## Housing taxonomy and attributes in Source

### Hard filters
- country
- city
- geo_location / radius
- price range
- property_type
- listing_type: rent | roommate
- bedrooms
- furnishing_status
- roommate gender_preference

### Soft filters
- neighborhood / area
- bathrooms_count
- pets_policy
- smoking_policy
- utilities
- roommate age_range
- lifestyle_tags

### Other fields
- currency: CAD | USD | EUR
- essential_amenities
- Rental Duration: Daily | Short Term | Long Term
- Available From: Date
- Owner Type: Owner | Real Estate Agent
- Nationality
- system filter: boost_status = normal | boosted | featured | urgent

Source `lifestyle_tags` را multi-select تعریف می‌کند.

## Passenger Cargo attributes in Source

- role: carrier | sender
- origin_country
- origin_city
- destination_country
- destination_city
- date
- max_weight_kg
- allowed_items: documents | electronics | clothes | personal_items
- price
- currency: CAD | USD | EUR

## Peer Exchange — Future / Proposed

Status: Proposed

Post Rules ثبت‌شده:
- Phone Verified
- City مشخص
- From/To currency
- حداقل یک Payment method
- Video Verified + Phone Verified اجباری
- نداشتن Report / Review کمتر از 2 ستاره
- فقط 1 Listing فعال در Category
- فقط کاربران Phone + Video Verified بتوانند Contact info را مشاهده کنند

Attributes:
- from_currency: CAD | USD | EUR | other
- to_currency: CAD | USD | EUR | other
- min_amount
- payment_methods: cash | e_transfer | bank_transfer | crypto_usdt
- location: country | city | area optional
- deals_count
- rating
- verification_status
- last_active

## Human Matching — Future

Source مثال‌هایی برای Attributeها می‌دهد:
- travel: تاریخ سفر
- study: بازه امتحان
- Location یا Remote

Source زیرگروه‌های ایده‌ای متعددی برای Daily Life، Health & Fitness، Sports & Outdoor، Social & Activities و Family & Kids فهرست کرده است؛ آن‌ها به‌عنوان «جهت ایده برای زیرمجموعه‌ها» آمده‌اند و Current taxonomy قطعی محسوب نمی‌شوند.

## Admin management boundaries

Source به‌صراحت می‌گوید:
- ساختار کلی Category «قابل اصلاح» است.
- Pricing می‌تواند بر اساس Country و Category تغییر کند.
- Channel routing می‌تواند بر اساس Attribute/Tag انجام شود.

اما Source جزئیات زیر را تعریف نکرده است:
- CRUD screen دقیق Category
- Permission matrix برای ویرایش Taxonomy
- Validation rules برای حذف/rename Category
- Migration behavior برای Listingهای قدیمی

بنابراین برای این موارد Rule جدیدی اضافه نشده است.
