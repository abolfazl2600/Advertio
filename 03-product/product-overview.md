# Product Overview

Advertio یک Marketplace هوشمند مبتنی بر Trust است که Userها را برای نیازهای واقعی مانند Housing، Jobs، Services، Cargo، Human Connections و Social connections به یکدیگر متصل می‌کند.

## Core product structure

Source این اجزای اصلی را برای Product تعریف می‌کند:
- ثبت Listing و گزارش Performance به Advertiser
- User Profile و History
- Automatic Notifications
- Wallet + Coin account
- Multi-layer Verification
- Admin Panel برای کنترل Platform و تأیید Listingها

## Core product principles

### Trust
- Multi-layer Verification
- User activity/history
- Deals Count
- Rating & Review
- Badges

### Structured marketplace
- Category-specific Attributes
- Hard/Soft Filters
- Active Filters
- Saved Filters
- Ranking
- Listing lifecycle
- Contact-access rules

### Multi-surface experience
- Telegram Bot
- Web Application
- Telegram Notifications
- Future WhatsApp
- Future multi-language

## Product discovery decision

Advertio uses:

```text
Search
+ Active Filters
+ Saved Filters
+ Ranking
```

Active Filters determine the structured result set. Ranking can order that result set, but it does not replace or bypass active hard filters.

## Product roadmap

### Version 1.0 — Minimum Viable Marketplace

Focus:
- Housing (Rental & Roommate)
- Telegram Bot: Post + View Listing
- Simple Web Application
- Phone Verification
- Basic User Profile
- Admin manual approval
- Telegram Notifications
- Telegram Crawler for Initial Supply
- Basic lifecycle: Pending → Approved → Expired

Goal:
- راه‌اندازی سریع اولین Marketplace
- تست مدل

Success criteria:
- حداقل 50 Real Listings
- حداقل 200 Registered Users

### Version 1.1 — Wallet & Monetization Base

- Wallet + Coin System
- Boost
- Extend
- Early Access
- Basic Listing Analytics
- Manual payment
- One active Listing per Category

Goal:
- فعال‌سازی Revenue flow

### Version 1.2 — Core Experience & Ranking

- Saved Filters + Alerts
- Basic Ranking
- Smart Notifications
- Response Metrics
- Full Listing Lifecycle + daily reports

Goal:
- افزایش Engagement و بهبود User experience

### Version 1.5 — Trust Foundation

- Manual Video Verification
- Review + Rating + Badges
- Manual Verification Workflow
- Basic Fraud Detection
- Referral System

Goal:
- Trust foundation و کاهش Fraud risk

### Version 2.0 — Smart & AI Features

- AI Search Assistant
- AI Question Generator
- Price Suggestion
- Listing-quality assistance

Goal:
- کاهش friction در Search/Filter و بهبود کیفیت Listing

### Version 2.5 — International Expansion

- Multi-language + AI Translation
- Germany + Italy
- WhatsApp Integration
- Cargo
- Human Connections + Social Categories

Goal:
- ورود به Marketهای جدید و Expansion دسته‌ها

### Version 3.0 — Business Platform

- Business Landing Pages
- Premium Accounts
- Business Analytics + Enterprise Dashboard
- Escrow
- Partner APIs
- Business Verification

Goal:
- Revenue diversification از Professional/Business users

## MVP vs other source prioritization

بخش دیگری از Source، MVP را این‌گونه تعریف می‌کند:
- Registration + Phone Verification
- View Listing
- Post Listing
- Admin approval
- Telegram notification
- Coin System
- Basic Profile

Phase 2:
- Rating & Review
- Advanced Verification
- Simple Chat
- Boost
- Saved Filters

Phase 3:
- Automated Listing approval
- Advanced Ranking
- Advanced Anti-fraud
- Multi-language

> ⚠️ Source Conflict
>
> Roadmap رسمی Wallet + Coin را در Version 1.1 قرار می‌دهد.
>
> بخش MVP prioritization، Coin System را جزو MVP می‌داند.
>
> این مورد نیازمند تصمیم نهایی Product/Business است.

## Initial operational model

در نسخه اولیه:
- Listing approval دستی
- User Verification دستی
- Document Review دستی

پس از رسیدن به Operational KPIهای از پیش تعریف‌شده:
- Specialized Verification services
- AI Moderation
- Fraud Detection

به‌تدریج جایگزین Manual work می‌شوند و Human operator به Exceptionها محدود خواهد شد.

## Cargo taxonomy decision

Cargo is one top-level marketplace category with **one unified listing model**.

It must **not** be split into `Passenger Cargo`, `Ride Sharing`, `Logistics / Shipping`, `Carrier`, or `Sender` categories/subcategories.

Advertio does not use a Cargo `role` field. A Cargo listing is simply a Cargo listing.

Whether source text describes a traveler carrying cargo or a person looking to send cargo is preserved in listing content/provenance, not represented as a separate Product role.

All Cargo listings use the same feed, route fields, filters and moderation model.

Ride-sharing for transporting passengers and commercial logistics/shipping remain outside Cargo V1 unless designed later as separate products.

## Human Connections taxonomy decision

Canonical category name:

```text
Human Connections
```

Human Connections uses structured Attributes + Active Filters for discovery.

See [Human Connections](../04-categories/human-connections/overview.md).

## Social & Events taxonomy decision

Canonical Social & Events types:

```text
event
meetup
community_activity
```

Study Partner, Sports Partner and other person-seeking use cases belong to **Human Connections**, not Social & Events.

Peer Exchange is not a Social subtype.

See [Social & Events](../04-categories/social/overview.md).

## Cold-start boundary

Telegram Crawler:
- فقط Initial Supply
- بخشی از Core Platform نیست
- نباید Advertio را به Telegram Search Engine دائمی تبدیل کند
- User-generated listings باید به‌سرعت از Crawled listings بیشتر شوند

## Related documents

- [Product Rules](./product-rules.md)
- [Listing Lifecycle](./listing-lifecycle.md)
- [User Profile](./user-profile.md)
- [Verification](./verification.md)
- [Reviews & Ratings](./reviews-ratings.md)
- [Ranking](./ranking.md)
- [Saved Search / Saved Filter](./saved-search.md)
- [Notifications](./notifications.md)
- [AI Features](./ai-features.md)
