# Advertio documentation — current implementation

> **Reviewed:** 2026-10-20. This directory was re-audited against the Advertio GitLab monorepo's `master` code and commit history from the initial scaffold (2026-07-05) through the October 2026 feature launches. It is a code-level reference, not a claim that every commit has reached Production.

## How to read this documentation

- **Implemented** means the behavior is present in the reviewed code and/or its implementation contract.
- **Configurable** means behavior depends on Backoffice policy, pricing, source, or environment settings; do not treat an example value as a guaranteed live value.
- **Not implemented / not verified** is stated explicitly. A roadmap, historical screenshot, pre-launch design, seeded schema, or mapped crawler field does not by itself prove that a feature is live.
- When an older screenshot-based document conflicts with current code, use the current implementation notes in this directory and the linked GitLab implementation commit.

## Current user-facing scope

| Area | Current implementation |
|---|---|
| Housing | Canadian rental and roommate listings, structured category attributes, filters, photos, detail pages and shared listing actions |
| Cargo | Route-based traveller/sender listings with catalog cities in Iran, Canada, the United States, Germany, Italy, the United Kingdom and France |
| Jobs | Canada-only hiring and job-seeker listings with an 18-value job taxonomy |
| Global Search | Searches titles and descriptions across all three live Web journeys |
| Saved listings / My listings | Cross-journey saved listings and owner listing management |
| Contact / messaging | Shared contact-unlock and conversation path for user-created listings; crawled listings link to their Telegram source/contact without coin deduction |
| Wallet | Coin balance, configured top-up methods, payment history and eligible self-service refunds |
| Profile / trust | Display name, avatar, phone verification and paid identity verification |
| Telegram bot | Mini App entry, search wizard, saved-search alerts, locale/marketing preferences, conversation relay, payment/identity workflows and admin reporting |

Only `housing`, `passenger-cargo` and `jobs` are registered as live Web journeys. Services and Social have backend category definitions, but they are not live journeys in the Web journey registry.

## Detailed capability catalogue

For the complete feature-by-feature inventory—including smaller UI behaviors, field rules, filters, lifecycle, payment/verification paths, bot commands, admin operations, recent changes and explicit gaps—start here:

- **[Detailed Current Capabilities](./current-capabilities.md)** — consolidated capability catalogue across Mini App, Telegram bot and Backoffice.
- [Implementation history and legacy-spec reconciliation](./implementation-history.md) — major capability milestones from July through October 2026, with links to GitLab commits and a status matrix for older roadmap/product specifications.
- [Repository Changelog](../CHANGELOG.md) — commit-based history of recent implementation changes (October 2026).

The pages below provide implementation detail for each subsystem. The catalogue and linked subsystem pages describe code-level status, not guaranteed Production availability.

## Mini App

- [Overview and navigation](./mini-app/overview.md)
- [Housing — form, attributes, filters and lifecycle](./mini-app/housing.md)
- [Cargo — route model, posting, feed and limits](./mini-app/cargo.md)
- [Jobs — roles, taxonomy, pay and filters](./mini-app/jobs.md)
- [Global Search](./mini-app/search.md)
- [Profile and identity verification](./mini-app/profile.md)
- [Wallet and payments](./mini-app/wallet.md)
- [Authentication and phone verification](./mini-app/authentication.md)
- [Shared listing interactions](./mini-app/listing-interactions.md)

## Telegram bot

- [Bot overview and command menu](./telegram-bot/overview.md)
- [Start and language selection](./telegram-bot/start.md)
- [Create Listing hand-off to the Mini App](./telegram-bot/create-listing.md)
- [Search wizard](./telegram-bot/search.md)
- [Saved searches and alerts](./telegram-bot/saved-searches.md)
- [Settings and marketing opt-in](./telegram-bot/settings.md)
- [Payments and identity-verification hand-offs](./telegram-bot/payments-and-verification.md)
- [Admin management report](./telegram-bot/admin-report.md)

## Backoffice

- [Backoffice overview and navigation](./backoffice/overview.md)
- [Gate A metrics](./backoffice/gate-a.md)
- [Listing moderation, duplicates and user reports](./backoffice/listings.md)
- [Users and admin actions](./backoffice/users.md)
- [Telegram channel publishing](./backoffice/channels.md)
- [Broadcasts](./backoffice/broadcasts.md)
- [Category policy and pricing](./backoffice/policy-pricing.md)
- [Payments and manual-payment review](./backoffice/payments.md)
- [Coin flow / ledger](./backoffice/coin-flow.md)
- [Wallet adjustments](./backoffice/wallet-actions.md)
- [Crawled sources](./backoffice/crawled-sources.md)
- [Listing inspections](./backoffice/inspections.md)
- [Identity-verification review](./backoffice/verifications.md)
- [Admin account and Telegram linking](./backoffice/account.md)

## عملیات و پشتیبانی (فارسی)

- [راهنمای عملیات Advertio](../12-operations/operations-overview.md)
- [تأیید، رد و برداشتن آگهی](../12-operations/listing-approval.md)
- [رسیدگی به تقلب و گزارش سوءاستفاده](../12-operations/fraud-handling.md)
- [پشتیبانی و پیگیری مشکلات کاربران](../12-operations/customer-support.md)
- [بررسی دستی هویت و مدارک](../12-operations/manual-verification.md)

این دستورالعمل‌ها میان قابلیت‌های تأییدشده در کد و رویه‌های پیشنهادی نیازمند تصویب تفکیک می‌کنند. SLA یا گردش‌کار رسمی تیکت که در منابع تأیید نشده، به‌عنوان قابلیت موجود معرفی نشده است.

## Integrations and architecture

- [Crawler ingestion contract](./integrations/crawler.md)
- [Current platform boundaries and shared architecture](./architecture/current-platform.md)
- [Repository changelog](../CHANGELOG.md)
- [Telegram integration and operational boundaries](./integrations/telegram.md) — SDK, authentication, Stars, bot modes, notifications and deployment checks.

## Known implementation gaps

These are intentionally not presented as shipped capabilities:

- Multiple active listings per user within the same category; the current server rule is one active listing per user per category.
- Cargo and Jobs crawler ingestion.
- Cargo lifecycle expiration based on the travel date; past-date trips are hidden from the Cargo feed, but the listing's lifecycle TTL remains independent.
- A dedicated Jobs `Filled` status, external application links/email, and Jobs-specific Backoffice scam signals.
- Scheduled Broadcast sends, rich-media/HTML/variable templates, recall/edit after sending, click/open attribution, frequency caps and A/B testing.
- Advanced saved-search operators for range, number, date and multi-select attributes in the Telegram bot.
- The older product specs also describe features that are not confirmed as shipped: AI/semantic search and translation, reviews/ratings/deal history, referral/gift-code rewards, Urgent listing action, the full legacy ranking formula, advertiser-facing daily/weekly performance reports, Premium/escrow/business platform features, email/WhatsApp delivery, a full Backoffice category/schema editor and verification layers beyond phone plus paid Identity Verification. See [Implementation history and legacy-spec reconciliation](./implementation-history.md) for the full status matrix.
- Production deployment of the latest GitLab `master` revision has not been verified by this documentation update.

## Implementation references

- [Cargo backend](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/585a1fdb98bfc028e7fa9738a6298116e6543e46) · [Cargo Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/09b569dcf117ccfa4bcfde0e5e41ed1b51901845)
- [Jobs schema](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8afb46d93a1902f06649823bf5c06b012dd7775b) · [Jobs Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/06ed02799052eadb900ea16ed8ebaacf2bd8450b)
- [Broadcasts Backoffice](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/606c3f5bd161d1cd7d8aaa99eedd61021d464178) · [Broadcasts backend](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/9446144651edcc7185b6dc588f6adcbe106f1d6c)
- [Category-scoped Gate A](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/99672dd655c3f77de463b97648a00d17f4fa4f24)
- [Shared listing interactions](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/c8016fd1bff54dd87a5967a5caa986fcd5107c5d)
- [Duplicate-detection correction](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a5db136683570af40e0db905be4acbe5d709ead2)
- [Telegram Mini App SDK initialization fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a58379f404c621e8f7c05da2e946f176686f8bf5)
