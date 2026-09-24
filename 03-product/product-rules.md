# Product Rules

## Registration rules

- Phone Verification برای شروع Product اجباری است.
- Registration می‌تواند از طریق Telegram share button یا Mobile OTP انجام شود.
- Phone number ایران یا Canada پذیرفته می‌شود.
- سایر کشورها در Registration flow وارد Waitlist می‌شوند تا Admin تأیید کند.
- پس از Account creation:
  - Default Province و City انتخاب می‌شود.
  - Training / FAQ ارائه می‌شود.
  - Membership در Channel و Group مربوطه اجباری ذکر شده است.
  - Coin gift بابت Phone Verification ذکر شده ولی Amount در این بخش مشخص نیست.

## Listing submission rules

Flow:
1. User Category انتخاب می‌کند.
2. Eligibility check.
3. Form:
   - Title
   - Description
   - Images
   - Location
   - Category-specific fields
4. Preview
5. Confirm
6. Pending
7. Admin Moderation
8. Approve / Reject
9. Publish if approved

### Mandatory approval
Listing قبل از Admin approval نباید منتشر شود.

## One-active-listing rule

Rule اصلی:
- هر User فقط یک Active Listing در هر Category دارد.

Source سه Behavior مرتبط ثبت می‌کند:
- اگر Listing فعال دارد، Warning + پیام به Admin/Support.
- در بخش محدودیت‌ها، Listing اضافه در همان Category با Fee ممکن است.
- در Coin Economy، ثبت مجدد بعد از یک ماه در همان Category با 5 Coins ذکر شده است.

> ⚠️ Source Conflict
>
> Source برای Listing اضافه در همان Category، هم Support escalation، هم Fee متغیر، و هم Rule مربوط به 5 Coins را ثبت کرده است.
>
> این‌ها به یک Flow نهایی تبدیل نشده‌اند و نیازمند تصمیم Product/Business هستند.

## Listing status vocabulary

Source:
- Pending
- Approved
- Rejected
- Expired
- Extend
- Boost and Urgent

Workflow دیگری بعد از Admin approval از `Published` استفاده می‌کند.

> ⚠️ Source Conflict
>
> Source مشخص نمی‌کند `Published` یک Status مستقل است یا معادل operational برای `Approved`.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Contact-access rules

Source برای Contact access چند Rule دارد:
- قبل از Early Access: Contact info masked.
- بعد از Early Access یک‌روزه: Full contact.
- هزینه Early Access با Coin و Admin-configurable.
- Social / Event / Meetup برای Contact access Coin نیاز ندارند، اما Official contact button باید برای Analytics استفاده شود.
- پس از بازشدن Contact با یک Advertiser، دسترسی برای Listingهای دیگر همان Advertiser تا 2 ماه باز می‌ماند.
- Coin فقط از طریق Official contact button کسر شود.

Lifecycle بخش دیگری Timing متفاوت دارد؛ جزئیات در [Listing Lifecycle](./listing-lifecycle.md).

## Boost rules

- Sample cost: 3 Coins
- Dynamic by Admin
- Effects:
  - Return to top of results
  - Republish to communication/social channels

## Urgent rules

- Paid badge
- Distinct listing presentation
- Fee مستقل برای هر Category
- Configurable in Admin Panel

## Extend rules

First 30-day extension:
- Jobs & Social: 35 Coins
- Housing: 65 Coins

Second and later:
- Jobs & Social: 55 Coins
- Housing: 85 Coins

Other Categories:
- Dynamic by Country + Category

## Crawled Listing rules

- Free listing
- Advertio monetization disabled
- User redirected to Telegram advertiser
- Internal Chat disabled
- Review disabled
- Escrow disabled
- If owner joins Advertio:
  - new crawled listings from that User stop
  - User must post directly
  - previous crawled listings may remain in History

## Review reward rule

- Review possible after both parties confirm Deal.
- User who paid Early Access and leaves Review after Deal: +1 Coin.
- Same User cannot receive repeat Coin for same case.
- Free-contact listings can receive Review but no Coin reward.

## Pricing rule

All service prices are dynamically configurable by Admin:
- Early Access
- Boost
- Extend
- Escrow
- other services

Pricing factors:
- Country
- Category
- Supply & Demand
- User behavior
- Unit Economics

## Current vs Future constraints

Current/early:
- Phone Verification
- Admin approval
- Telegram notifications
- basic profile

Future:
- Advanced Verification
- Reviews/Badges per Roadmap
- AI
- Multi-language
- WhatsApp
- Escrow
- Business Platform

Version conflicts for Verification are documented in [Verification](./verification.md).
