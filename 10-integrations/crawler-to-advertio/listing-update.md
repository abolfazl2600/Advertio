# Changes, deactivation and historical channel messages (2026-10-21)

## Existing source post edited

There is **no crawler upsert/patch** in this contract. Sending the same `(sourceName, externalId)` again returns `200 alreadyExisted:true` and **does not change** title, price, description, status, moderation decision or historical author metadata. This intentional rule prevents edits from bypassing manual review. Do not create a new ID from the edited text or try to resurrect a previously deactivated listing.

If the product requires update-on-edit later, that is a distinct backend contract/design change; do not document it as already implemented.

## Source message removed

When an original Telegram source post disappears, use `DELETE /api/ingest/leads/{sourceName}/{externalId}`; server gives `204` or `404`. This is important for completed cargo trips, filled jobs and rented homes: normal 30-day listing lifetime and Cargo date-based *feed hiding* do not replace source cleanup.

To disable a compromised/irrelevant source completely, use `DELETE /api/ingest/sources/{sourceName}`, response includes the deactivated total. This action affects every listing under that identity; namespace sources carefully.

## What happens to Telegram channel publications

A user's clicked historical channel post is **not edited** on expiration/deactivation after [`f8cb1f38`](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f8cb1f389cdfbc704ae7ded1a5bdfbf9e93dcf59). Its Mini App `View Listing` opens a detail route; previously published ended records produce **`410 Gone`** with limited status/category/expiry fields and a browse-other-listings terminal UI. Never-live records produce `404` and do not disclose unpublished/adverse review data. Avoid retrying `404`/`410`.

**Distinguish:** explicit ingest deletion (source synchronization), listing status expiration/deactivation (backend lifecycle), and channel post preservation (historical presentation) are three separate systems.
