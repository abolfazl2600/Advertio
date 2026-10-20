# Current platform architecture and capability boundaries

> **Reviewed:** 2026-10-20. This page describes code-level boundaries in GitLab `master`; it is not a production deployment confirmation.

## 1. Live product surfaces

### Web Mini App

The Web shell exposes Hub, global Search, Post chooser, Saved, My listings, Wallet and Profile. The live journey registry contains:

- `housing`
- `passenger-cargo` (display label Cargo)
- `jobs`

Each journey owns its own feed/create/detail components and category schema. Services and Social category records can exist in backend reference data without being live Web journeys.

### Telegram bot

The bot provides onboarding/locale selection, a Mini App Create Listing hand-off, a generic Search wizard, saved-search alert management, settings/marketing opt-in, manual payment and identity-verification hand-offs, conversation relay, and admin reporting. It does not host a full listing-create form in chat.

### Backoffice

Backoffice modules cover metrics, listing moderation/reports/duplicates, category policy/pricing, inspections, crawled sources, automatic Telegram channel publication, users, Broadcasts, identity verifications, payments, coin ledger, wallet actions and admin account settings.

## 2. Shared listing layer

Housing, Cargo and Jobs reuse a shared listing interaction layer for:

- listing detail and feed data mapping;
- contact/unlock and conversation;
- save/unsave;
- report submission;
- owner renew/boost actions;
- publisher trust indicators;
- source-aware handling of user-created vs crawled listings.

A journey must not import another journey's feature implementation. Cross-category behavior belongs in the shared layer or a platform module, while category-specific form and feed behavior belongs in the owning journey.

## 3. Category schema and reference data

The backend category schema supplies attribute keys, types, options, required rules, conditional visibility and filterability. Web forms and filter controls read this schema instead of being the only source of truth.

Location selectors use reference data for countries, provinces and cities. Cargo's current route catalog covers Iran, Canada, United States, Germany, Italy, United Kingdom and France. Jobs uses Canada-only city/province values; Housing is Canada-focused.

The Telegram bot search/saved-search wizard supports only filterable Select and Boolean attributes. Range, Number, Date and MultiSelect operators are intentionally outside the current bot wizard/matcher.

## 4. Identity and trust

- Telegram Mini App sign-in uses Telegram's launch credential.
- Browser sign-in can use a Telegram hand-off, phone-code login delivered through the bot, or Google when configured.
- Google alone is not phone verification.
- Phone verification is a gate for posting and paid/owner operations.
- Identity verification is a separate paid, human-reviewed document/video workflow. Evidence is sent in Telegram and decisions are made by admins.

## 5. Money and coin accounting

Three concepts must remain separate:

1. **Payment:** money moved through Telegram Stars, Stripe or a configured manual payment path.
2. **Coin transaction:** Advertio Coins credited/debited in a wallet ledger.
3. **Category action price:** the configured coin cost for posting, contact unlock, renewal or boost; service prices (identity verification) are configured separately.

Zero action price means free. Online payment success must be confirmed server-side. Manual payment does not credit coins until an admin approves it. Admin refunds use the original rail and remove coins; admin refund is intentionally more permissive than user self-service refund.

## 6. Listing lifecycle and invariants

- User-created listings enter `PendingReview` and become `Active` after approval.
- Listing contact cost and expiry TTL are snapshotted when a listing is approved.
- Seeded default listing TTL is 30 days; seeded boost duration is 72 hours. Backoffice policy can change these.
- One active user-created listing per user per category is enforced by the server.
- Duplicate detection runs before coin charge/write. Exact duplicate submissions are rejected; similar listings can be flagged for human review.
- For bare user-created listings without description/photos, publisher identity is included in the exact fingerprint so two users' identical generated Cargo/Jobs titles do not block each other.
- Past-date Cargo trips are hidden from the Cargo feed, but their listing lifecycle still follows the normal TTL.
- Jobs does not yet have a Filled state or external application URL/email flow.

## 7. User-created versus crawled supply

Crawled listings are ingested through the protected crawler API and marked `supplySource=Crawled`.

- The current documented crawler contract supports Housing only.
- Crawled contact redirects to the original Telegram poster/source and never deducts coins.
- Crawled supply is excluded from Gate A user-generated supply/contact metrics except the explicit substitution comparison.
- Source deactivation affects all listings tied to a source but does not stop the external crawler.

## 8. Notifications and distribution

- **Channels:** automatically publish an Active listing to configured Telegram destinations when all channel filters match; avoid duplicate sends and retain publication history/retry state.
- **Broadcasts:** send one direct Telegram message to All, Filtered or Selected users with recipient preview, exclusions, count confirmation, rate-limited delivery and a per-recipient report.
- **Saved-search alerts:** Instant on matching listing activation or daily Digest at a configured UTC hour.
- **Admin reports:** a daily management report and a separate six-hour operational lead digest are implemented as separate workers/configurations.

## 9. Gate A

Gate A supports 7/30/90-day windows and category selection for Housing, Cargo and Jobs. Listing-based metrics are scoped to the selected category so supply, photo coverage, contact conversion and related listing events are not mixed across journeys. User population metrics and instrumentation-health metrics remain platform-wide.

Enabling Cargo/Jobs does not itself mean Gate A has passed.

## 10. Explicit non-claims

The reviewed code does not establish that:

- the latest GitLab `master` has been deployed to Production;
- Cargo or Jobs crawler ingestion is implemented;
- users can maintain multiple active listings in one category;
- a Cargo listing lifecycle expires from travel date;
- Jobs has a Filled state or external application methods;
- Broadcasts supports scheduled send, rich media, recall, click tracking, frequency capping or A/B tests.
