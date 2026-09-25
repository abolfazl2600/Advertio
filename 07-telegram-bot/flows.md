# Telegram Bot Flows

این فایل Flowهای اصلی Telegram Bot را Consolidate می‌کند. جزئیات هر حوزه در فایل تخصصی همان موضوع نگهداری شده است.

## Flow 1 — Start → Registration

    Start
      ↓
    Check existing registration
      ↓
    Check phone verification
      ↓
    New user? → Registration & Verification
      ↓
    Create account
      ↓
    Default province/city + training/FAQ
      ↓
    Mandatory channel/group membership
      ↓
    Phone-verification gift coin
      ↓
    Main Menu

Country rule:
- Iran / Canada number → accepted
- Other countries → Waitlist + Admin approval

See [Registration](./registration.md).

## Flow 2 — Main Menu

Main Menu:
- View Listings
- Post Listing
- My Profile
- My Listings

See [Main Menu](./main-menu.md).

## Flow 3 — Post Listing

    Post Listing
      ↓
    Select Category
      ↓
    Check active listing in category
      ↓
    Fill Title
      ↓
    Fill Description
      ↓
    Upload Images
      ↓
    Location
      ↓
    Category-specific fields
      ↓
    Preview
      ↓
    Edit / Confirm
      ↓
    Pending
      ↓
    Admin Moderation
      ↓
    Approved / Published
      ↓
    Listing Lifecycle

Category options in Source:
- Housing
- Jobs
- Services
- Cargo
- Social and Event

Conflictهای Status و Active Listing handling در [Listing Creation](./listing-creation.md) ثبت شده‌اند.

## Flow 4 — Listing Interaction / Contact

Source چند مدل زمانی Early Access دارد؛ Conflict کامل در [Listing Browsing](./listing-browsing.md) ثبت شده است.

Contact interaction rules:
- Official Contact button
- Contact request Analytics
- Coin deduction در Flow پولی
- Social / Event / Meetup بدون Coin ولی با Click برای Analytics
- Advertiser contact unlock برای سایر Listingهای او تا 2 ماه

## Flow 5 — Listing Performance

پس از Publication:
- Track Reaching views
- Track Contact Requests
- Track Detail Listing View
- Daily Telegram notification

Source همچنین Daily / Weekly / Total report را ذکر می‌کند.

## Flow 6 — Boost

اگر Interaction کم باشد:

    Low interaction
      ↓
    Boost — Source example: 3 Coin
      ↓
    Return listing to top
      ↓
    Republish in communication/social channels

Boost price Dynamic by Admin است.

## Flow 7 — Expiry → Extend

    Day 30 / Day 31 boundary
      ↓
    Expired
      ↓
    Telegram renewal reminders
      ↓
    Pay Coin
      ↓
    30-day Extend
      ↓
    Re-enter publication cycle

- Warning از 3 روز قبل از Expiry هر روز
- Post-expiry Telegram reminders تا 15 روز در Bot workflow

## Flow 8 — Post Deal → Review

    Deal completed
      ↓
    Both parties confirm deal
      ↓
    Review / Rating becomes available
      ↓
    Optional review/comment
      ↓
    Eligible paid-contact user receives 1 Coin

Rules:
- Reward برای همان User/Deal تکرار نمی‌شود.
- Free-contact Listingها Review دارند ولی Coin reward ندارند.

## Flow 9 — Saved Search

    Configure filters in Web App
      ↓
    Enable Telegram notification
      ↓
    Save filter
      ↓
    New listing reaches matching threshold
      ↓
    Telegram summary/link

- Matching threshold ذکرشده: 70%
- Daily summary در بخش Saved Filters
- User-adjustable threshold: Future

See [Saved Search](./saved-search.md).

## Flow 10 — Crawled Listing

    Public Telegram source
      ↓
    Independent Crawler Service
      ↓
    Quality processing
      ↓
    Structured data via API
      ↓
    Free listing in Advertio
      ↓
    User clicks contact
      ↓
    Redirect to advertiser Telegram account

Restrictions:
- No Advertio monetization
- No internal Chat
- No Review
- No Escrow

اگر Advertiser join کند، Crawl خودکار Listingهای جدید او باید متوقف شود.

## Flow 11 — Channel Distribution

    Approved Listing
      ↓
    Match Admin-defined attributes/tags
      ↓
    Select Telegram Channel
      ↓
    Publish

Future:
- Translation before publishing based on language/country/channel rules
