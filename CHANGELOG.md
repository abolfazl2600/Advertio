# Changelog

This log tracks implementation changes confirmed in the Advertio GitLab monorepo. Dates refer to source commits merged into GitLab master; they do not independently confirm a production deployment.

## 2026-10-19

### Cargo journey

- Added a route-based Cargo journey under the passenger-cargo slug.
- Added traveller/sender role, catalog-backed origin and destination cities, route-derived currency, and role-specific price semantics.
- Added one-screen posting with four required choices, server-side role/route filtering, Cargo detail UI and shared contact interactions.
- Added route catalog coverage for Iran, Canada, the United States, Germany, Italy, the United Kingdom and France.
- Cargo is available through Hub, Post chooser, global Search, Saved and My listings.
- Not included: Cargo crawler ingestion, multiple active Cargo listings per user, travel-date lifecycle expiration and Telegram bot search redesign.

### Jobs journey

- Enabled the Jobs journey in Canada.
- Added a one-screen, four-choice posting flow for Hiring/Looking for work, job category, city and hours.
- Added a closed 18-value job-category taxonomy, separate work arrangement, salary periods (hour/month/year) and CAD salary handling.
- Added server-side filtering by role, category and city, job details, shared contact interactions and a job-scam warning.
- Connected Jobs to Hub, Post chooser, global Search, Saved and My listings.
- Not included: multiple active jobs per employer, Jobs crawler ingestion, Filled status, external application links/email and Jobs-specific backoffice scam signals.

### Shared platform and correctness

- Scoped listing-based Gate A metrics to the selected category so Housing, Cargo and Jobs are not mixed.
- Moved listing contact/unlock, conversation, save, report and owner actions into the shared listing layer.
- Corrected duplicate detection for bare user-created listings: identical generated listings from different publishers no longer block each other, while same-user double submissions still collide.

## 2026-10-09

### Backoffice Broadcasts

- Added the Broadcasts page, audience builder, live recipient preview, draft management, test send, recipient-count confirmation and delivery report.
- Added All, Filtered and Selected audiences, eligibility exclusions, asynchronous rate-limited Telegram delivery, retry/cancel controls, per-recipient outcomes and audit fields.
- Promotions honor opt-in and provide a one-tap stop-promotions action.
- Not included in v1: scheduled sends, rich media/HTML/variables, per-language variants, recall/edit after sending, click/open attribution, frequency capping and A/B testing.

### Telegram Mini App SDK

- Initialize the Telegram Mini App SDK once before React mounts when running inside Telegram.
- Fixed the SDK initialization failure that prevented phone sharing and degraded invoice URL handling, Telegram links, haptics and Mini App mounting.
