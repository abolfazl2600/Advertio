# Current Implementation Status

> Last reviewed: 2026-10-20. This document summarizes implementation evidence from the Advertio GitLab monorepo between 2026-10-06 and 2026-10-20. “Implemented” means the code and/or implementation documentation is merged into GitLab master. Production deployment and runtime availability were not independently verified.

## At a glance

| Area | Current status | Notes |
|---|---|---|
| Housing | Existing baseline journey | Feed, structured filters, listing details and creation, with shared listing/contact interactions. |
| Cargo | Implemented in GitLab master on 2026-10-19 | Route-based journey under the slug passenger-cargo; Canada plus six other countries in the route city catalog. |
| Jobs | Implemented in GitLab master on 2026-10-19 | Canada only; hiring/job-seeker role, closed job-category taxonomy and server-side filters. |
| Backoffice Broadcasts | Implemented in GitLab master on 2026-10-09 | Draft, audience selection, recipient confirmation, delivery and reporting. |
| Gate A metrics | Category-scoped as of 2026-10-19 | Housing, Cargo and Jobs can be measured separately; opening Cargo and Jobs was an owner decision, not evidence that Gate A passed. |
| Telegram Mini App SDK | Initialization fix merged on 2026-10-09 | Restores SDK-guarded contact sharing and related Mini App methods. |

## Core Web experience

The Web app has a Hub and category journeys for Housing, Cargo and Jobs, plus global Search, Saved, My listings, Profile and Wallet pages.

### Housing

Housing remains the original baseline journey. The implementation includes a category feed, structured housing/roommate filters, listing cards and details, a listing-creation wizard with photo upload, and shared listing actions.

The shared listing layer handles contact/unlock orchestration, conversations, saving and reporting. The contact path coordinates sign-in, verified phone, price confirmation and contact unlock rather than each category implementing a separate payment path.

### Cargo

**Current model:** one Cargo journey using the backend slug passenger-cargo and a role attribute, not separate listing types.

- Posting is a single-screen flow with four required choices: travelling or sending, origin, destination and date. The title is generated from the answers; no free-text field is required.
- Origin and destination cities are selected from the location catalog. The current route catalog covers Iran, Canada, the United States, Germany, Italy, the United Kingdom and France. This is catalog coverage, not a claim that every country has a separately verified production launch.
- Cargo type, weight, price and note are optional details.
- Currency is derived from the route. A traveller’s price is per kilogram; a sender’s price is a total amount.
- The feed filters by role, origin and destination on the server. Trips whose travel date has passed are hidden from the feed.
- Details show the route, date, cargo information and price, then use the shared contact flow.
- Cargo is connected to the Hub, Post chooser, global Search, Saved and My listings.

**Known limits in CARGO-01:** crawler ingestion for Cargo is not included; one active Cargo listing per user remains the rule; the listing lifecycle is still 30 days rather than expiring its status from the travel date; and the Telegram bot search redesign remains out of scope.

### Jobs

**Current scope:** Canada only. The journey was enabled by the product owner before Gate A; this does not mean Gate A has passed.

- Posting is a single-screen flow with four required choices: Hiring or Looking for work, job category, city and hours. No free-text input is required.
- The title is generated from the answers. Job title, salary, work arrangement and a note are optional details.
- Job category uses a closed taxonomy of 18 categories instead of an uncontrolled free-text field.
- Salary is stored in CAD with a period of hour, month or year. If salary is omitted, the UI does not invent a “negotiable” value.
- Work arrangement is separate from employment type and supports on-site, hybrid and remote.
- The city picker uses the Canadian location catalog and returns the province without an extra province-selection step.
- The feed filters by Hiring/Job seekers, job category and city on the server.
- Details show the job, location, disclosed pay and key facts, then use the shared contact flow and show a job-scam warning.
- Jobs is connected to the Hub, Post chooser, global Search, Saved and My listings.

**Known limits in JOBS-01:** multiple active jobs per employer are not supported yet; Jobs crawler ingestion is not included; there is no Filled status; external application methods such as links or email are not included; and job-specific scam signals are not yet present in the backoffice.

## Backoffice and operations

The current backoffice code includes areas for account access, users, listings, verifications, transactions, payments, wallet actions, channels, crawler sources, category policy, inspections, metrics and Broadcasts.

### Broadcasts

Broadcasts provides group messaging through Telegram from the backoffice:

- Audience types: All, Filtered or Selected users.
- Available filters include phone/identity verification, whether a user has posted, join dates, language and saved-search interest.
- Disabled accounts and accounts without Telegram are excluded. Promotions also exclude users who have not opted in.
- Drafts can be created, edited and deleted. Admins can preview the audience, send a test message to themselves and confirm the exact recipient count before sending.
- If the audience changes after confirmation, the server rejects the send so the admin can confirm the new count.
- Delivery runs asynchronously with rate limiting, per-recipient outcomes and handling for Telegram 429 retry-after responses.
- The report shows progress and delivery outcomes; admins can cancel a running broadcast, retry failed deliveries or duplicate a broadcast.
- Creation/sending timestamps and actors are audited. Promotions include a one-tap opt-out.

**Broadcasts v1 does not include** scheduled sends, rich media/HTML/variables, per-language variants, recall/edit after sending, click/open attribution, frequency capping or A/B testing.

### Gate A metrics

Gate A now scopes listing-based metrics to the selected category, with Housing as the default. Cargo and Jobs can be selected independently. User counts and instrumentation-health metrics remain platform-wide; listing events, supply and photo coverage are scoped to the selected journey.

## Recent correctness and architecture changes

- **Duplicate detection:** a bare user-created listing with no description and no photos includes its publisher in the exact fingerprint. Two different users can therefore create word-for-word identical generated listings. A same-user double submission still collides. Similarity alone flags a bare listing as Similar rather than refusing it; listings with text/photos and crawled listings keep their prior exact-match behavior.
- **Shared listing architecture:** contact/unlock, conversation, save, report and owner actions were moved out of Housing-specific code into the shared listing layer so independent journeys reuse the same interaction path.
- **Telegram SDK:** the SDK is initialized once before React mounts, only when running inside Telegram. This fixes the phone-sharing dialog and restores SDK-guarded invoice URL handling, Telegram links, haptics and Mini App mounting.

## Explicitly not confirmed as shipped

Do not describe these as currently implemented based on the reviewed changes alone:

- Cargo or Jobs crawler ingestion.
- Multiple active Cargo listings per traveller or multiple active Jobs listings per employer.
- Travel-date-based Cargo lifecycle expiration, Jobs Filled status, external job application links/email or Jobs-specific backoffice scam signals.
- Broadcast scheduling, rich media, message recall/edit and click/open attribution.
- WhatsApp or email notifications, AI search, escrow or enterprise dashboards.
- Production deployment of the code described above.

## Source commits

- [Broadcasts backoffice UI](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/606c3f5bd161d1cd7d8aaa99eedd61021d464178)
- [Broadcasts backend](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/9446144651edcc7185b6dc588f6adcbe106f1d6c)
- [Telegram Mini App SDK initialization fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a58379f404c621e8f7c05da2e946f176686f8bf5)
- [Shared listing interaction layer](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/c8016fd1bff54dd87a5967a5caa986fcd5107c5d)
- [Category-scoped Gate A metrics](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/99672dd655c3f77de463b97648a00d17f4fa4f24)
- [Cargo backend and route catalog](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/585a1fdb98bfc028e7fa9738a6298116e6543e46)
- [Cargo Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/09b569dcf117ccfa4bcfde0e5e41ed1b51901845)
- [Jobs data model](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8afb46d93a1902f06649823bf5c06b012dd7775b)
- [Jobs Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/06ed02799052eadb900ea16ed8ebaacf2bd8450b)
- [Duplicate-detection correction](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a5db136683570af40e0db905be4acbe5d709ead2)
