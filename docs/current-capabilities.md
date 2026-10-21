# Advertio — detailed capability catalogue

> **Current delta:** 2026-10-21, GitLab `master` at `e36ba877`; updated Cargo, Quick Search and native listing pricing below. [All changes](./releases/2026-10-21.md). **Baseline reviewed:** 2026-10-20. This catalogue was re-audited against the GitLab `master` code and commit history from the initial repository scaffold on 2026-07-05 through the October 2026 journey launches—not only the last two weeks. It consolidates the current `docs/` implementation notes and cross-checks the older product, monetization, category and growth specifications. It describes repository implementation, not verified Production deployment. Configuration-dependent features are marked as such; planned work and known gaps are not described as shipped.

## 1. Product scope and architecture

### Live Web journeys
- **Housing** — Canadian rental and roommate listings; canonical slug `housing`.
- **Cargo** — traveller/sender route listings; display label Cargo, canonical slug `passenger-cargo`.
- **Jobs** — Canadian hiring and job-seeker listings; canonical slug `jobs`.
- Services and Social may exist in backend category definitions, but they are not registered as live Web journeys.

### Shared Mini App navigation
- Home/Hub with cards for live journeys.
- Post chooser when the user has more than one live journey.
- Global keyword Search.
- Saved listings across journeys.
- My listings across journeys.
- Wallet and payment history.
- Profile, sign-in, verification and sign-out.
- Journey-specific feed, create form and listing detail routes. Current public routes include `/housing`, `/passenger-cargo`, `/jobs`; create routes end in `/new`.

### Shared technical and interaction boundaries
- Journeys are independent features and reuse a shared listing layer rather than importing another journey's UI.
- Shared listing layer owns API interactions, contact/unlock, conversation, save, report and publisher actions.
- Server validation and category policy are authoritative. Client-displayed prices or stale UI state do not override the server.
- Current server rule: one free-slot live listing per owner/category; further concurrent native listings require configured per-category `additional_listing` charges (and a quote/confirmation), or fail closed when the extra charge is disabled. Crawled ingest is a separate supply class.
- Code merged to GitLab `master` does not, by itself, prove Production deployment.

## 2. Housing

- Canadian rental and roommate marketplace.
- Listing types: Rent and Roommate.
- Required structured attributes: listing type; property type (Apartment, Condo, Basement, Studio, Room, House); bedrooms (Studio, 1, 2, 3, 4+); monthly CAD price unless negotiable is explicitly set.
- Optional/conditional schema attributes include furnishing, gender preference and other category-defined fields; the server uses the same schema to validate submissions and render supported filters.
- Price validation for numeric monthly rent: CAD 100–10,000; a negotiable listing uses `price_negotiable=true` instead of inventing a number.
- Wizard-style listing creation with optional photo upload (up to 10 Housing photos; client accepts JPEG/PNG/WebP, max 8 MiB per file; the backend processes uploaded images).
- Category feed supports schema-driven structured filters, listing cards, detail pages and pagination/loading states as implemented by the journey.
- Uses shared contact/unlock, conversation, save, report and publisher actions.
- Housing is the default category for Gate A listing-based metrics.
- Market scope remains Canada; other countries in the shared location catalogue do not automatically expand Housing geography.

Detailed source: [Mini App — Housing](./mini-app/housing.md).

## 3. Cargo

- One route pool with **no public traveller/sender role**; the optional backend `role` defaults to `traveler` when missing and preserves legacy sender records for price semantics.
- Required: catalog-validated origin and destination country/city. **Travel date is optional** and can be cleared; title is the route, plus date only when supplied.
- `cargo_type` is **MultiSelect**, with old scalar item values read as one-item arrays. Multiple items appear on card, detail and channel post. Existing item-type saved/channel filters continue to match list membership.
- Other optional fields: weight 0.1–30 kg, price, negotiable flag and description. New/no-role Cargo prices mean per kg; existing sender totals remain totals. The native UI derives currency from route, but crawlers must not infer a currency.
- Seven route countries: IR, CA, US, DE, IT, GB, FR. The listing location is its origin. Local-calendar travel countdown and Telegram viewport-aware city picker improve form usability.
- Feed uses origin/destination filters, not role tabs. Trips with a known past date are hidden without expiring their stored lifecycle. Undated trips remain eligible.
- Shared Hub/Post/Search/Saved/My listings integration, terminal `410` unavailable-detail state, and consistent back-to-Hub navigation.
- **Crawler Cargo ingest is supported** alongside Housing and Jobs, via the same dedicated API. See [Cargo implementation](./mini-app/cargo.md), [full receiver contract](./integrations/crawler.md), and [source-backed reconciliation](../09-crawler/advertio-integration-2026-10-21.md).

## 4. Jobs

- Canada only.
- One category/listing model supports Hiring (`role=employer`) and Looking for work (`role=seeker`).
- One-screen posting with four required choices: role, job category, Canadian city and hours/employment type. Title is generated from answers; no free-text title is required.
- Closed 18-value job taxonomy: Restaurant & Food; Construction; Cleaning; Delivery & Driving; Retail & Store; Beauty & Salon; Office & Admin; IT & Tech; General Labour; Warehouse; Skilled Trades; Customer Service; Sales; Healthcare & Care; Childcare; Teaching & Tutoring; Design & Creative; Other.
- Eight common categories are surfaced first as chips; the remaining categories are available through the additional-fields control.
- Optional fields include custom job title (up to 60 characters), salary, salary period, work arrangement and note.
- Salary is stored in CAD and can specify hour, month or year. Missing salary is not replaced with an invented “negotiable” value.
- Work arrangement is distinct from employment type: on-site, hybrid or remote.
- City selection uses the Canadian catalogue and returns the province with the city; no separate province step is required.
- Feed filters by role, job category and city on the server.
- Detail shows role/job information, location, disclosed pay and key facts; it then uses shared contact interactions and displays a job-scam warning.
- Available from Hub, Post chooser, global Search, Saved and My listings.
- Category policy is configurable; initial values were seeded from Housing's then-current policy.

Detailed source: [Mini App — Jobs](./mini-app/jobs.md).

## 5. Global Search, Saved and My listings

### Global Search
- Searches titles and descriptions across Housing, Cargo and Jobs.
- Keyword search only; not semantic/AI search.
- Every query word must appear in the title or description.
- Query length: 2–100 characters; 350 ms debounce after typing settles.
- Query is reflected in the `?q=` URL parameter.
- Results are paged in groups of 20 with further-page loading.
- Keeps previous results visible while the next query loads.
- Returning from a detail restores cached results and scroll position for the same query; a new query starts at the top.
- Clearing the query returns to the empty prompt.
- Search is separate from each journey's structured feed filters.

### Saved listings and My listings
- Saved listings are cross-journey and require sign-in.
- My listings shows the signed-in user's listings across live journeys.
- Save and owner actions are shared across categories.
- Listing creation refreshes the feed for the journey that was actually published to, not always Housing.

Detailed sources: [Search](./mini-app/search.md), [shared listing interactions](./mini-app/listing-interactions.md).

## 6. Shared listing lifecycle, moderation and contact

### Lifecycle and policy
- Listing states include PendingReview, Active, Rejected, Deactivated and Expired.
- User-created listings enter review on creation.
- On approval, the listing snapshots its contact-unlock coin cost and expiry TTL.
- Seeded defaults documented in the implementation: 30-day listing TTL and 72-hour boost duration; Backoffice policy can change them.
- Changing policy does not silently rewrite a live listing's snapshotted contact cost/expiry.
- Create, renew and boost prices are read at action time; backend rechecks price and state.

### Contact and conversations
- Shared contact flow orchestrates sign-in, phone verification, price confirmation and contact unlock.
- UI checks the user's balance and current contact cost, and offers top-up if the balance is insufficient.
- Server policy and listing state determine whether contact is free or paid.
- Successful contact opens or reuses the shared conversation path.
- Crawled listings are a distinct path: contact opens the original Telegram handle when available, otherwise the source URL, and does not deduct Advertio Coins.
- Save, report and publisher/owner actions are part of the shared listing layer.

### Duplicate detection
- Bare user-created listings with no description and no photos include publisher identity in the exact fingerprint.
- The same publisher's repeated submission still collides; two different publishers can create identical generated titles.
- Similarity alone marks a bare listing as Similar at most, rather than refusing it.
- Listings with text/photos and crawled listings retain their previous exact-match behavior.

Detailed source: [Shared listing interactions](./mini-app/listing-interactions.md).

## 7. Authentication, Profile and trust

### Sign-in
- Telegram Mini App authentication uses Telegram launch credentials.
- Browser sign-in can hand off to Telegram through a deep link and one-time code.
- Phone-code login delivers the code through the linked Advertio Telegram bot, not SMS.
- Google sign-in is offered only when configured; Google alone does not establish phone verification.
- A browsing session without a verified phone can exist, but phone-gated marketplace/financial actions require phone verification.
- Telegram is an identity provider/delivery channel; the verified phone number is the account identity key.

### Phone and identity verification
- Phone verification and identity-document verification are separate trust levels.
- Phone verification is used for listing creation, contact/paid actions and wallet access.
- Inside Telegram, the Mini App requests the user's own contact through Telegram SDK; in an ordinary browser, the user completes the hand-off in Telegram.
- Paid identity verification requires a phone-verified account and linked Telegram identity. The user pays the configured coin fee, then submits a supported identity-document image and randomized challenge video through the bot; an admin reviews the evidence in Telegram or Backoffice. Request states include AwaitingPayment, AwaitingSubmission, Submitted, Approved and Rejected. Only approval grants the Identity Verified badge; payment alone does not.

### Profile
- Handles needs-login, loading, failure/retry and authenticated states.
- Displays avatar/initials, display name or “Unnamed”, and linked Telegram username.
- Supports editing display name and uploading an avatar (client limit 8 MiB; server validates/processes it).
- Shows phone verification status and identity-verification status/actions.
- Provides links to Saved/My listings and sign-out.
- Appearance offers System, Light and Dark; System follows the platform/Telegram theme where supported.
- Ratings, reviews and deal-history screens are not implemented.

Detailed sources: [Authentication](./mini-app/authentication.md), [Profile](./mini-app/profile.md).

## 8. Wallet, coins and payments

- Wallet is a top-level Mini App destination and requires a phone-verified account.
- Shows coin balance and purchase/payment history; errors have retry states.
- Coin packs and manual-payment methods are loaded from the server, not hardcoded as authoritative client data.
- Inside Telegram, the online rail is Telegram Stars. In an ordinary browser, Stripe Checkout and Telegram Stars are offered when configured.
- Manual payment appears only when a method is enabled and an active admin with linked Telegram chat can review it.
- Online top-up: load packs, choose a pack, start checkout, open returned URL, wait for server/webhook confirmation, then show credited/pending/failed state. Returning from checkout is not proof of payment.
- Manual top-up: user starts request, sends text and/or receipt photo through the bot, request is routed to linked active admins, admin approves/rejects, user is notified; coins are credited only on approval.
- Payment records and coin-ledger transactions are separate records.
- User self-service refunds are exposed only when the server marks the payment eligible and the associated coins remain unspent; not every payment is refundable.
- Backoffice can refund through the original rail, including cases that do not meet the user's unspent-coin restriction. Admin refunds and corresponding coin removal are audited. The Backoffice also reviews manual payments and whether text/receipt evidence and admin delivery succeeded.
- Coin flow is a ledger of credits/debits. Admin wallet adjustments and refunds are audited actions.
- Provider credentials, package prices, manual payment methods and refund eligibility are configuration/server dependent.

Detailed source: [Wallet and payments](./mini-app/wallet.md).

## 9. Telegram bot

### Entry, locale and menu
- `/start` creates/refreshes Telegram-linked user context and shows language selection or Main Menu.
- Main Menu: Create Listing (Mini App hand-off), Search Listings, Your saved searches, Settings and Help.
- Create Listing does not use a chat-based category form; the Mini App handles listing creation.
- Language options: Persian (`fa`), English (`en`), French (`fr`), Russian (`ru`) and Hindi (`hi`); missing Persian category/attribute labels fall back to English.
- Settings toggles persisted marketing opt-in and returns to menu.
- Commands include `/start`, `/search`, `/paysupport` and admin-only `/adminreport`.

### Quick Search (replaced chat wizard 2026-10-21)
- `/search` and Search Listings accept one text query across all categories. `/search phrase` executes directly, with no category/city/price/attribute wizard.
- Every keyword must match a title, description, city, province, neighborhood, English/Persian category name or catalog city name/code. The Mini App Search and saved-search keyword matching share the term definition.
- Five results/page with category icon, title and only fields present, Mini App buttons, Previous/Next, Save Search, New Search, Advanced Search and Main Menu.
- Save Search creates a keyword-only Instant saved search; specific advanced filters remain in Mini App journey feeds. The old chat wizard state is not resumed.

### Saved-search alerts
- Saved-search wizard asks category, city, price, supported Select/Boolean attributes and frequency.
- Frequency options: Instant or Digest.
- Instant alerts are queued when matching listings activate; digest groups matches and sends once per day at a configured UTC hour (documented default 09:00 UTC).
- Matching supports category, city text, price min/max and scalar equality for supported attributes.
- Saved-search names are generated from category and city; custom names are not requested.
- List/view/pause/resume/delete are supported.
- The separate saved-search management wizard remains category/price/attribute based; Quick Search now accepts keywords and can save them as an Instant alert. Digest time is a global UTC boundary, not per-user local time.
- Full range/number/date/multi-select operators are not implemented in the current bot wizard/matcher.

### Payments, identity and admin reporting
- `/paysupport` is registered for Telegram Stars payment support.
- Bot hand-off supports manual payment evidence submission and identity-verification evidence flows.
- `/adminreport` is restricted to active admins in private chat and can be scheduled daily (default 06:00 UTC); displayed timestamps use configured timezone (documented default Asia/Tehran).
- A separate operational lead digest is scheduled four times daily at 00:00, 06:00, 12:00 and 18:00 Tehran time for configured admin IDs with linked chats.
- Admin reports include users, listing lifecycle/supply by city, saved searches, listing reports and crawler freshness/operations as documented.

Detailed sources: [Telegram bot overview](./telegram-bot/overview.md), [Search](./telegram-bot/search.md), [Saved searches](./telegram-bot/saved-searches.md), [Settings](./telegram-bot/settings.md), [Payments and verification](./telegram-bot/payments-and-verification.md), [Admin report](./telegram-bot/admin-report.md).

## 10. Backoffice

### Users and account
- Filters: All, Active, Disabled, Verified and Posted. Search works together with the filters and accepts name, username, phone or user ID.
- The table exposes display name, Telegram-style username, phone, status, role, reputation and join date; missing usernames/phones use a neutral empty-value placeholder.
- The Posted filter uses the canonical listing creator/owner relationship; crawled/unowned listings do not make an unrelated user count as a publisher.
- Admins can inspect users, send a direct Telegram message (plain text, up to 4,096 characters), or pass selected users to a prefilled Broadcast composer. Direct messages and Broadcasts are separate workflows; delivery failures must not be reported as success.
- Backoffice account supports server-confirmed username/password updates with inline validation, one-time password setup and Telegram linking for reports.
- The UI includes a row-actions menu, but detailed disable/enable, role-editing and reputation-editing behavior is not fully documented by the reviewed source; do not infer those operations from the visible columns.

### Listing moderation
- Views/queues include Pending, Live, Rejected, Taken down, Expired, All and Possible Duplicate.
- Search by title, city and listing ID.
- Pending review drawer exposes title/classification, photos, description, attributes and listing details.
- Moderation actions approve/reject; live listing drawer shows listing/payment details, performance, views per day, publication lifecycle and moderation controls.
- Possible Duplicate queue supports inspecting and resolving duplicate candidates and understanding exact/similarity behavior.
- User reports can be reviewed from listing moderation.

### Category policy and pricing
- Per-category action prices: create listing, renew listing, boost listing and contact unlock.
- Paid-contact phase can be Early or Late, with configurable early window.
- Listing TTL/renewal duration and boost duration are configurable within server-supported limits.
- Service prices are managed separately.
- Existing live listings keep snapshotted contact cost/expiry; backend revalidates price/state at action time.

### Gate A metrics
- Tracks user population/activity, paid-contact conversion, failure attribution, real vs crawled supply, photo coverage, contact-demand allocation, crawled-vs-user-generated performance, payment friction, experiment monitoring, duplicate-charge monitoring and instrumentation health.
- Listing-based metrics can be scoped to Housing, Cargo or Jobs; Housing is default. User counts and instrumentation health remain platform-wide.
- Available windows are 7, 30 and 90 days. Total users is an all-time count; New and Active users are platform-wide for the selected window. Active includes an account that viewed, contacted, signed in or posted during the window.
- Includes “Is crawled supply eating demand?” comparison and “Why they did not pay” failure attribution.
- Includes C1 early-vs-late experiment and duplicate-charge monitoring.
- Metric definitions and data windows matter; displayed sample values in screenshots are historical snapshots, not current live counts.

### Broadcasts
- Send direct Telegram messages to All, Filtered or Selected users.
- Filters include phone/identity verification, whether a user has posted, join dates, language and saved-search interest.
- Disabled users and users without Telegram are excluded; Promotions also exclude users without marketing opt-in. Announcements are a separate Broadcast kind and do not use the marketing opt-in exclusion.
- Draft create/edit/delete, recipient preview and exclusion counts, message preview, test send to acting admin and explicit recipient-count confirmation.
- Server rejects send if audience changed after confirmation.
- Asynchronous rate-limited delivery, Telegram 429 retry-after handling, per-recipient outcomes, live report, cancel, retry failed and duplicate actions.
- Audit fields record creator/sender and timestamps; Promotion includes one-tap Stop promotions.
- V1 text limit 4,096 characters; optional one button (label max 40 characters) opens configured Mini App entry.
- Not implemented: scheduled sends, rich media, HTML/Markdown templates, variables, language variants, recall/edit after send, click/open attribution, frequency caps and A/B tests.

### Telegram channel publishing
- Configure Telegram channels/groups, destination/handle, active status and matching filters.
- Filters include category, country, province, city, outgoing language and schema-backed attribute equality. Conditions combine with AND semantics; blank dimensions act as wildcards and the same attribute key cannot be repeated in multiple rows.
- Send a test message to validate a destination. Automatic publication runs for Active listings matching every configured filter.
- Inspect historical matches and distinguish not-sent, already-sent and all-matching states; historical-match actions support manual backfill/re-send.
- View publish history with listing link, source and delivery status; manually retry failed publication records.
- Total Sent is a cumulative successful-delivery count, not a count of unique listings. Channel publishing is separate from direct-user Broadcasts.

### Crawled sources
- Source table shows stable source name, live/total listing counts and last-ingested timestamp.
- Source marked Stale when last ingest is over 48 hours old.
- Source-wide deactivation affects Advertio's ingested listings; it does not delete the external Telegram post or stop the upstream crawler.
- Crawled listing contact links to Telegram handle when available, otherwise source URL; no coin deduction for opening original source.
- Crawled supply is excluded from user-generated Gate A conversion metrics except the explicit supply-competition comparison.

### Payments, coins, verification and operations
- Payments page lists All/Pending/Succeeded/Failed/Refunded online payments, failure reason, provider/currency, refund amount and actor when relevant; successful payments expose the standard refund action.
- Manual-payment queue tracks Draft/Submitted/Approved/Rejected, method, text/receipt evidence and admin delivery status; failed admin delivery can be retried.
- Coin flow exposes the credit/debit ledger; wallet actions provide audited admin coin credits and payment refunds.
- Identity-verification queue tracks Awaiting payment, Awaiting evidence, Submitted, Approved and Rejected; admins inspect evidence and decide.
- Listing inspections support request queue/status, scope/notes, quote/payment, operations, evidence, report, publication, notes and history.
- Admin account page supports credentials and Telegram-linked scheduled reports.

Detailed sources: [Backoffice overview](./backoffice/overview.md), [Gate A](./backoffice/gate-a.md), [Listings](./backoffice/listings.md), [Users](./backoffice/users.md), [Policy & pricing](./backoffice/policy-pricing.md), [Broadcasts](./backoffice/broadcasts.md), [Channels](./backoffice/channels.md), [Crawled sources](./backoffice/crawled-sources.md), [Payments](./backoffice/payments.md), [Coin flow](./backoffice/coin-flow.md), [Wallet actions](./backoffice/wallet-actions.md), [Verifications](./backoffice/verifications.md), [Inspections](./backoffice/inspections.md), [Account](./backoffice/account.md).

## 11. Recent implementation changes (6–20 October 2026)

- **Cargo:** route-based traveller/sender journey; catalog-backed cities; route-derived currency; role-specific price semantics; server-side route/role filters; past-date trips hidden from feed; connected to Hub, Post, Search, Saved and My listings.
- **Jobs:** Canada-only hiring/job-seeker journey; one-screen four-choice posting; 18-value closed taxonomy; salary periods hour/month/year in CAD; separate on-site/hybrid/remote work arrangement; server-side filters; shared contact flow and scam warning.
- **Shared listing architecture:** contact/unlock, conversation, save, report and owner actions moved to the shared listing layer for all journeys.
- **Gate A:** listing-based metrics scoped to selected category so Housing, Cargo and Jobs are not mixed.
- **Duplicate detection:** identical bare generated listings from different users no longer block each other; same-user double submissions still collide.
- **Broadcasts:** audience builder, live recipient preview, confirmation, test send, asynchronous rate-limited delivery, reporting, retry/cancel and promotion opt-out.
- **Telegram Mini App SDK:** initialized once before React mounts inside Telegram, restoring phone sharing and other version-gated SDK methods.

Commit-level details: [Repository CHANGELOG](../CHANGELOG.md).

## 12. Additional capabilities confirmed by earlier implementation history (July–September 2026)

The older implementation history contains several capabilities that were not called out explicitly enough in the previous summary catalogue.

### Mini App host integration and appearance

- When running inside Telegram, the Mini App SDK is initialized once before React mounts. Supported host-specific behavior includes requesting the user's own phone contact, opening Stars invoice URLs and Telegram links, haptic feedback, and Mini App readiness/mount handling. Browser mode must not call Telegram-only methods as if the Telegram host exists.
- The Appearance control offers System, Light and Dark; System follows the platform/Telegram theme where supported.

### Conversations and Telegram relay

- User-created listings have a shared conversation panel for sending and replying to messages across Housing, Cargo and Jobs.
- The Telegram bot relays a new buyer message to the advertiser's linked Telegram chat and routes the advertiser's reply back to the buyer; messages can include a deep link back to the listing in its own journey.
- Conversation state is persisted so an incoming reply is routed to the active conversation before the bot treats text as an answer to a Search or saved-search wizard.
- Delivery depends on the recipient having a usable linked Telegram chat. Crawled listings follow the source redirect flow instead of this native Advertio conversation path.
- Contact funnel instrumentation includes abandoned contact sheets, insufficient-balance attribution and message-button-click events. These support Gate A analysis; they are not evidence of a public advertiser analytics dashboard.

### Crawled-listing ownership claim and ingestion contract

- A crawled listing can be claimed by a matching publisher when the Advertio account has a verified phone and a linked Telegram identity whose handle matches the recorded source contact handle.
- The claim transfers the publisher/owner relationship but preserves the listing's Crawled supply-source classification. The source cohort therefore remains excluded from user-generated Gate A metrics, apart from the explicit supply-substitution comparison.
- The crawler API is authenticated with a configured ingest key and supports media upload, idempotent create/update keyed by source name plus external ID, individual deactivation and source-wide deactivation.
- The current documented ingestion contract supports Housing only. Cargo and Jobs being live Web journeys does not imply that crawler ingestion is supported for them.
- Backoffice Crawled sources is an operational monitor and bulk-deactivation surface, not a crawler scheduler or editor. A Stale marker means the last ingest was more than 48 hours ago; deactivation in Advertio does not delete an external Telegram post or stop an upstream crawler.

### Server-side media processing and cleanup

- Listing uploads accept JPEG, PNG and WebP, with an 8 MiB upload limit and a 50-million-source-pixel ceiling before full decoding.
- The server identifies the format from file bytes, applies orientation, removes EXIF/IPTC/XMP metadata, generates WebP variants and calculates an image perceptual hash as a duplicate/similarity signal.
- The full image is resized to a maximum 1600-pixel edge and the thumbnail to 480 pixels. Crawled listings use the thumbnail-only path; user-created listings keep both variants.
- Uploads are rate-limited to 30 requests per minute per authenticated user. The backend stores opaque media keys and checks media ownership at listing submission; preview URLs are not the canonical keys to persist.
- A background worker reaps unreferenced uploads older than a 24-hour grace period, runs every 12 hours and caps deletions per run. This is a storage-cleanup safeguard, not a user-facing feature.

### Account and administrative controls

- The verified phone number remains the account identity key; Telegram and Google are identity providers/linked identities, not independent Advertio account keys. Google sign-in is configuration-dependent and does not verify a phone number.
- Backoffice admins can update their own username/password (username 3–50 characters; password at least 12 characters). The account flow also supports one-time password-setup links and account lockout after repeated failed password attempts; defaults are five failed attempts and a 15-minute lockout, with server configuration allowed to change them.
- Admin accounts can link a Telegram chat through a one-time deep link for scheduled report delivery. Linking a chat does not grant admin privileges.
- Direct one-to-one Telegram messages from the Users page are separate from Broadcasts. Selected users can also be handed off to the Broadcast composer for a separate audience preview and explicit send confirmation.
- The bot persists a user's selected locale and marketing opt-in. Promotion broadcasts exclude users who have not opted in and provide a one-tap Stop promotions action.

### Reports, inspections and moderation safety

- Signed-in users can report another user's listing, with one of the current reasons (Scam, Wrong information, Duplicate, Already rented, Offensive or Other) and an optional note up to 500 characters. Repeat pending reports from the same user/listing do not create duplicate pending records.
- Backoffice review includes listing reports, possible duplicates, moderation decisions and source/provenance details. A possible duplicate is a review queue; similarity is not automatically equivalent to an exact duplicate.
- Independent Listing Inspection is a separate Backoffice-only operational workflow: request intake, scope/quote, payment tracking, inspector/visit scheduling, evidence, structured report, publication readiness, notes and history. Evidence supports photos, common video formats and PDFs within the upload limit; long videos can be supplied as links. It is not the standard listing-approval queue and is not a complete public self-service ordering flow.
- Identity verification is a separate paid service. Its configured/seeded reference price is 80 Coins in the reviewed docs, but the live service price is authoritative; payment alone never grants the Identity Verified badge. The document image and challenge video are submitted through Telegram; the reviewed flow stores operational references/metadata rather than duplicating raw evidence into the Advertio listing-media bucket.

### Background processing and operational reporting

- Saved-search Instant alerts are queued on matching listing activation and delivered by a background worker; Digest alerts are grouped at a configured global UTC hour (documented default 09:00 UTC).
- The bot has a user-facing /search command and /paysupport; /adminreport is restricted to active admins in their private chat with the bot.
- Two separate scheduled admin reports exist: a daily management report (default 06:00 UTC, with display timestamps defaulting to Asia/Tehran) and an operational lead digest four times daily at 00:00, 06:00, 12:00 and 18:00 Tehran time for configured admin IDs with linked chats.
- The codebase includes health endpoints/checks, database migrations, object storage, local Docker Compose services and deployment/CI workflows. These are operational implementation capabilities; they do not prove that a particular GitLab revision or provider configuration is active in Production.

### Older product specifications: current interpretation

| Older source-defined idea | Current interpretation |
|---|---|
| Saved Filters built in the Web app | The verified user-facing saved-search feature is the Telegram bot wizard with Instant/Digest delivery. Do not claim that the old Web Saved Filter workflow is fully implemented. |
| Early Access durations and timing | Backoffice policy supports Early/Late paid-contact phase configuration, but older source documents disagree on 30 hours, one day, free-first days and paid-later timing. Do not treat any old timeline as a universal current rule; the listing snapshot and live category policy are authoritative. |
| Basic ranking formula (boosted, newest, verified, others) | Boost and renew actions are implemented. The older document's complete ranking order, response-metric weighting and advanced ranking formula are not established as the current canonical algorithm. |
| Urgent badge and category-specific fee | Present in older monetization specifications, but not confirmed as a complete current user-facing action in the reviewed implementation. |
| Daily/weekly performance reports to each advertiser | Older product specs describe them. Current code confirms Backoffice/Gate A metrics and listing-performance inspection, not a complete advertiser-facing daily/weekly report delivery feature. |
| Reviews, ratings, deals count and reputation badges | Not implemented as profile/review screens. Current phone/identity trust indicators are separate and do not imply a ratings/reviews system. |
| National ID, GPS, social, financial or cargo-ticket verification | Not confirmed as current verification flows. The implemented trust levels documented here are phone verification and paid document-plus-challenge-video Identity Verification. |
| Referral rewards, promo/gift codes, social-proof coin rewards | Historical monetization/growth proposals; not confirmed as implemented reward programs in the reviewed current code. |
| Premium accounts, escrow, business landing pages, partner APIs and enterprise dashboards | Future/business-platform concepts, not current shipped Advertio features. |
| AI search, AI price suggestions, listing-quality assistant and AI translation | Proposed roadmap capabilities; no current AI/semantic search implementation is confirmed. |
| Email and WhatsApp notifications | Not confirmed as active delivery channels. The documented current alert, messaging and broadcast paths use Telegram. |
| Services, Social, Human Connections and Peer Exchange | Category design/reference data must not be mistaken for a live Web journey. The only registered live Web journeys are Housing, Cargo and Jobs. |

See [Implementation history and legacy-spec reconciliation](./implementation-history.md) for the older commit timeline and source links.

## 13. Known gaps — do not describe as shipped

- Cargo/Jobs crawler ingestion.
- Multiple active listings per user within the same category; one-active-listing server rule remains.
- Cargo lifecycle expiration based on travel date (past-date trips are only hidden from the feed).
- Jobs Filled status, external application links/email and Jobs-specific Backoffice scam signals.
- Telegram bot search redesign specific to Cargo; bot wizard skips Date/Range/Number/MultiSelect attribute types.
- Broadcast scheduling, rich media/templates/variables, language variants, recall/edit after send, click/open attribution, frequency capping and A/B testing.
- Ratings, reviews, deal-history screens and reputation badges beyond the current phone/identity trust indicators.
- AI/semantic search, AI price suggestion, AI listing-quality assistance, AI translation and AI question generation.
- Full Web Saved Filters; the current saved-search workflow is the Telegram bot wizard.
- A canonical source-defined Early Access timeline, the full legacy ranking formula, Urgent action, advertiser-facing daily/weekly performance reports, referral rewards and promo/gift-code programs are not confirmed as shipped.
- Premium accounts, escrow, business landing pages, partner APIs, enterprise dashboards, automated paid-acquisition integrations, email notifications and WhatsApp notifications.
- National ID, GPS, social-media, financial and cargo-ticket verification flows.
- A complete Backoffice category/schema CRUD editor is not confirmed; current code evidence supports backend category schemas/reference data and a policy/pricing UI, not a full category-definition management interface.
- Production deployment of latest GitLab `master` is not verified by this catalogue.
