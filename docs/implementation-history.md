# Advertio implementation history and legacy-spec reconciliation

> **Reviewed:** 2026-10-20. This review follows the accessible GitLab `master` history from the repository's initial scaffold on 2026-07-05 through the latest reviewed feature commits on 2026-10-19. It summarizes material product-capability milestones, not every CI, refactor, test-only or deployment-maintenance commit. Merged code is not proof of Production deployment.

## How to interpret the historical record

- **Current implementation evidence** comes from the reviewed GitLab `master` code, current subsystem documentation in this folder and feature commits.
- **Historical specification** means a product, monetization, category, or roadmap document describes an intended behavior. It is not evidence that the behavior shipped.
- **Configurable** means server policy, price, credentials, provider configuration, or environment settings determine the live behavior.
- **Not verified** means the reviewed source does not establish the capability as current. It does not necessarily mean no prototype or experiment ever existed.
- When an older specification conflicts with current code, prefer the current code contract and preserve the old proposal as historical context rather than silently combining them.

## Implementation milestones

### 2026-07-05 to 2026-07-06 — repository and platform scaffold

- Created the Advertio platform repository and initial application architecture.
- Established the API, Web app, backend modules, category/listing model, and early deployment structure.
- Initial commits: [repository scaffold](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/d55d0927) · [architecture build-out](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/dbc0d419).

### 2026-07-27 to 2026-07-31 — central identity, sign-in and core platform services

- Established phone-first central account identity, with Telegram as one identity provider rather than the permanent account key: [central authentication](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f264d5cc).
- Added browser sign-in flows that detect the client and use Telegram deep-link hand-off; one-time phone codes are delivered through the Advertio bot rather than SMS: [browser sign-in](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/41cf55f7) · [Telegram OTP hand-off](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/4c0bfb1d).
- Added Google sign-in alongside Telegram, while retaining phone verification as a separate gate: [Google alongside Telegram](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/2bd7c30f).
- Added structured country/province/city reference data: [location module](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/30ac672e).
- Added object storage behind a shared storage abstraction: [file storage](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/9b9dc99c).
- Added Telegram Stars as an online coin top-up rail: [Telegram Stars](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/22c28ac8).
- Added a local whole-stack development workflow and bot polling support for environments where a public webhook is not available: [local development stack](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8f9af280) · [bot polling](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/62afcd07).

### 2026-08-01 to 2026-08-31 — listing management, moderation, pricing and account operations

- Implemented and expanded the Web listing journeys, owner listing management, saved/bookmarked listings, profile editing and the Backoffice operational console. The code now has distinct Backoffice surfaces for users, listings, policy/pricing, payments, transactions, wallet actions, sources, channels, verifications, inspections and metrics.
- Added end-to-end save/bookmark behavior: [saved listings](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/e56a1564).
- Added Backoffice listing/payment/policy/source management and Web profile/My listings: [admin console and profile](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/1d9056d8) · [Backoffice completion milestone](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/1437c022).
- Added configurable policy/pricing management, including a redesigned comparison view: [policy and pricing](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/e7cce0d9).
- Added ownership transfer/claim handling for crawled listings so a matching verified account can claim eligible source listings without creating an orphan account: [crawled-listing ownership transfer](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/e943731c).
- Added Telegram report-link/reconnect flow for admins: [Telegram report linking](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/05cf9862). Follow-up fixes prevent linking a chat already attached to another account and address reconnect failures.
- Added Housing negotiable-price support: [negotiable Housing price](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/0c30ee42).
- Added account/token and operational reliability work, including JWT lifetime and health/deployment workflow changes. These are code/operations changes, not proof that the current deployment is healthy: [JWT lifetime change](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/46658f9d).

### 2026-09-05 to 2026-09-07 — localization, duplicate detection and saved-search alerts

- Added backend localization infrastructure, user locale and structured error codes: [localization architecture](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/5e967b23).
- Added exact and similar listing detection for user-created and crawled listings: [duplicate/similar detection](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f0f3d0c3).
- Added saved-search alerts and smart Telegram notification processing: [saved search and notifications](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f45ba47c).
- Corrected the listing count to represent the actual total rather than only the currently loaded page: [total listing count](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/b6ee09c3).

### 2026-09-15 to 2026-09-19 — channels, profile media, bot state and localization

- Added administrator-managed distribution channels and routing of matching listings to destinations: [distribution channels](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/4425b587).
- Added Mini App integration improvements, notification deep links and channel-specific listing post formatting: [Mini App integration and notifications](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/03450a54) · [channel publishing](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/4425b587).
- Added user roles/avatar URL support and profile avatar upload: [user role and avatar fields](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/0577ea5b) · [avatar upload](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/5995bd79).
- Added one-time password setup links for Backoffice account credentials: [password setup links](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/54b2f1cf).
- Added persisted Telegram conversation state for user-to-user listing conversations and reply routing.
- Added the Create Listing entry point to channel posts and improved channel-post translations/formatting.

### 2026-09-28 to 2026-09-29 — global search, reports, inspection, verification and payments

- Added global Web Search across the live journeys: [global Search tab](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/33d679f0).
- Added Backoffice channel historical-match inspection, manual backfill/re-send and retry for failed publication records, along with schema-driven attribute filters.
- Added direct one-to-one Telegram messages from Backoffice and improved user search/filtering: [direct admin message](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/e2781eb1).
- Added user listing reports and an admin review surface: [listing reports](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8e879b31).
- Added the independent listing-inspection workflow for support/operations: [listing inspections](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/63af5512).
- Added paid document/video Identity Verification with admin review: [Identity Verification](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/2b3daba0).
- Added manual coin top-up requests submitted through the Telegram bot and approved/rejected by admins: [manual top-up](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/931b0ac1).
- Added the generic /search bot command and navigation improvements: [bot search command](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/3d8d8017).
- Added the daily admin management report and /adminreport: [admin report](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/eaefd4f9).
- Expanded Gate A with user counts, crawler-vs-user supply comparisons, failure attribution, duplicate-charge and instrumentation-health monitoring.

### 2026-10-09 — Broadcasts and Telegram Mini App initialization

- Added Backoffice Broadcasts for All, Filtered and Selected audiences, drafts, recipient preview and confirmation, test send, asynchronous rate-limited delivery, per-recipient outcomes, cancel/retry and audit fields: [Broadcasts UI](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/606c3f5bd161d1cd7d8aaa99eedd61021d464178) · [Broadcasts backend](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/9446144651edcc7185b6dc588f6adcbe106f1d6c).
- Fixed Telegram Mini App SDK initialization order so phone sharing and other Telegram-host-only methods are initialized before React mounts: [SDK initialization fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a58379f404c621e8f7c05da2e946f176686f8bf5).

### 2026-10-19 — Cargo, Jobs and shared listing interactions

- Added the route-based Cargo journey with traveller/sender role, catalog-backed origin/destination, route-derived currency, role-specific price semantics, server-side filters and a one-screen posting flow: [Cargo backend](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/585a1fdb98bfc028e7fa9738a6298116e6543e46) · [Cargo Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/09b569dcf117ccfa4bcfde0e5e41ed1b51901845).
- Enabled the Canada-only Jobs journey with Hiring/Looking for work, an 18-value job taxonomy, city/category/role filters, salary period and work arrangement fields: [Jobs model](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8afb46d93a1902f06649823bf5c06b012dd7775b) · [Jobs Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/06ed02799052eadb900ea16ed8ebaacf2bd8450b).
- Extracted contact/unlock, conversation, save, report and owner actions into the shared listing layer: [shared listing interactions](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/c8016fd1bff54dd87a5967a5caa986fcd5107c5d).
- Scoped listing-based Gate A metrics to the selected journey: [category-scoped Gate A](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/99672dd655c3f77de463b97648a00d17f4fa4f24).
- Corrected duplicate detection for bare generated listings so two publishers' identical titles do not block each other while same-publisher duplicate submissions still collide: [duplicate-detection correction](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a5db136683570af40e0db905be4acbe5d709ead2).

## Legacy specifications: current status matrix

The repository's top-level product documents are useful as design history, but several are older than the current implementation. Use this matrix when those documents appear to promise more than the code currently supports.

| Feature described in older specs | Status based on current reviewed evidence |
|---|---|
| Housing, Cargo and Jobs | Current live Web journeys. Housing is Canada-focused; Cargo is route-based; Jobs is Canada-only. |
| Services and Social | Backend category definitions may exist, but neither is a live Web journey. |
| Backoffice category/schema editor | Not confirmed; the reviewed Backoffice has policy/pricing controls, while category schemas/reference data are supplied by the backend. |
| Human Connections and Peer Exchange | Design/category documents only for this status review; not live Web journeys. |
| Crawler | Implemented ingest contract for Housing. Cargo/Jobs ingestion is not confirmed. |
| Saved filters | Telegram bot saved-search wizard is implemented; the full old Web saved-filter workflow is not confirmed. |
| Ranking | Boost/renew actions exist. The old complete ranking formula and advanced ranking remain unverified. |
| Early Access | Configurable paid-contact phase/policy exists. Legacy time windows conflict and are not a canonical global promise. |
| Urgent listing | Older spec only; not confirmed as a complete current user-facing action. |
| Advertiser analytics reports | Admin Gate A and listing-performance inspection exist. Daily/weekly advertiser reports from old specs are not confirmed. |
| Reviews, ratings, deals count and reputation badges | Not confirmed as implemented; current phone/identity trust indicators are not a ratings system. |
| Verification | Phone verification and paid document/video Identity Verification are current. National ID, GPS, social, financial and cargo-ticket verification are not confirmed. |
| Referral/coin rewards, gift codes and promotional acquisition | Historical proposals/examples; not confirmed as current reward programs. |
| Premium accounts, escrow, business landing pages, partner APIs and enterprise dashboards | Future/business-platform concepts; not current shipped features. |
| AI search, price suggestion, listing-quality assistance, question generation and translation | Proposed future capabilities; no AI/semantic search is confirmed. |
| Email and WhatsApp notifications | Not confirmed as active channels; current documented notification and conversation delivery uses Telegram. |
| Payment examples from old specs (10 Coins = $1, sample bundles, USDT/Ton, PayPal or country-specific transfers) | Do not treat as live price/provider configuration. Current coin packs, prices and manual methods are server/configuration-driven; the reviewed Web payment rails are Telegram Stars in Telegram, Stripe when configured in a browser, and configured manual review. |

## Where to continue the review

- [Detailed current capabilities](./current-capabilities.md)
- [Current platform architecture](./architecture/current-platform.md)
- [Mini App current implementation](./mini-app/overview.md)
- [Shared listing interactions](./mini-app/listing-interactions.md)
- [Crawler ingestion contract](./integrations/crawler.md)
- [Telegram integration and operational boundaries](./integrations/telegram.md)
- [Current implementation status in the product knowledge base](../03-product/current-capabilities.md)
- [Product overview and roadmap](../03-product/product-overview.md)
- [Product rules](../03-product/product-rules.md)
- [Listing lifecycle and legacy Early Access models](../03-product/listing-lifecycle.md)
- [Monetization model](../05-monetization/monetization-model.md)
- [Verification specification](../03-product/verification.md)
