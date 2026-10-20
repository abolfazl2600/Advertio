# Crawler ingestion — current contract

> **Contract status:** the ingest API is implemented in GitLab `master` (ADR-0009). The current documented supported category is `housing` only. Cargo/Jobs crawler ingestion is explicitly not included in their October 2026 launch work.
>
> The original GitLab integration guide recorded `api.advertio.ir` and the separate edge-rate-limit configuration, but also said that hostname/TLS/Cloudflare rollout was not live on 2026-08-31. Verify current DNS, TLS and edge rules with the backend/operations owner before pointing a production crawler at it.

## 1. Cohort separation

Any listing created through the ingest endpoints is marked `supplySource=Crawled`. That is a business rule, not just a badge:

- Opening a crawled listing's contact never deducts Advertio Coins.
- The user is routed to the original poster's Telegram handle when available, otherwise to the source post URL.
- Crawled supply is excluded from user-generated Gate A listing/contact metrics, except the explicit comparison that measures whether crawled supply is substituting for demand.
- A crawler must never submit a real user-created Advertio listing. User submissions use the normal listing-create API.

## 2. Authentication and host

Send `X-Ingest-Key: <key>` on every ingest request. The server-side setting is `INGEST_API_KEY`; the documented minimum is 32 characters.

- Missing/invalid key: `401`.
- A `404` from the route group can mean the key is not configured and the ingest route group was not mapped.
- The documented API base URL is `https://api.advertio.ir/api`; keep the host configurable rather than hardcoding it.
- The integration guide documents an edge limit of 10 requests/second with a burst of 20 per IP and a separate Cloudflare daily limit. Verify the current production limits before running a high-volume import; `429` means slow down and retry according to the service response.

## 3. Required ingestion sequence

### Step 1 — upload photos (if any)

```http
POST /api/ingest/media?source=<sourceName>
X-Ingest-Key: <key>
Content-Type: multipart/form-data
```

The returned opaque media key is used in the listing request. Do not send public media URLs as `mediaKeys`. A source can attach up to 10 media keys; the first key becomes the feed-card cover image.

### Step 2 — create or update a crawled listing

```http
POST /api/ingest/leads
X-Ingest-Key: <key>
Content-Type: application/json
```

Example shape:

```json
{
  "sourceName": "telegram-rent",
  "externalId": "4021",
  "sourceUrl": "https://t.me/some_channel/4021",
  "contactHandle": "@landlord",
  "description": "Cleaned-up post text",
  "categorySlug": "housing",
  "attributesJson": "{\"listing_type\":\"rent\",\"property_type\":\"apartment\",\"bedrooms\":\"2\",\"price\":2100}",
  "mediaKeys": ["leads/crawler-telegram-rent/<opaque-media-id>"],
  "autoPublish": false
}
```

`attributesJson` is a **JSON string containing a JSON object**, not a raw object. The request validates the category schema and the uploaded-media ownership before writing.

### Step 3 — remove listings when source content disappears

Delete one ingested post:

```http
DELETE /api/ingest/leads/<sourceName>/<externalId>
X-Ingest-Key: <key>
```

The endpoint returns `204` on deactivation (or `404` when the target does not exist). To deactivate all listings for a source, use:

```http
DELETE /api/ingest/sources/<sourceName>
X-Ingest-Key: <key>
```

The source-wide endpoint returns the number deactivated. The Backoffice Crawled sources page is an additional source-wide deactivation control; it does not stop the external crawler process.

## 4. Field contract

| Field | Required | Rules |
|---|---|---|
| `sourceName` | Yes | Stable name matching `^[a-z0-9][a-z0-9-]{1,31}$`; 2–32 lowercase letters/digits/dashes. Do not rename it or existing records become orphaned from the source identity |
| `externalId` | Yes | Stable source-side ID, max 200 characters; the idempotency key together with `sourceName` |
| `sourceUrl` | One of sourceUrl/contactHandle | Original post URL, max 500 characters |
| `contactHandle` | One of sourceUrl/contactHandle | The **poster’s** Telegram handle, with or without `@`, max 64 characters; do not use the channel handle unless it is actually the poster |
| `posterTelegramUserId` | Optional | Positive numeric Telegram user ID only when the source truly exposes the author. Do not send a channel/chat/message ID |
| `categorySlug` | Yes | Current ingest contract supports `housing` only |
| `attributesJson` | Yes | JSON string; must satisfy the Housing attribute schema |
| `mediaKeys` | Optional | Up to 10 keys uploaded under this same source; first key is cover |
| `autoPublish` | Optional | Defaults to `false`; use false for a new source or changed extraction logic |

### Housing attributes

Required Housing fields are:

- `listing_type`
- `property_type`
- `bedrooms`
- Either numeric `price` or `price_negotiable=true`

When price is negotiable, omit numeric `price`; do not use `price_negotiable` to conceal a failed price extraction. Optional schema fields are validated against the current category schema.

## 5. Publication and duplicate review

- `autoPublish=false` creates a listing in `PendingReview`.
- `autoPublish=true` requests immediate activation for a trusted/reviewed source.
- A possible duplicate can remain in `PendingReview` even if `autoPublish=true`; automatic publication is not a bypass of duplicate review.
- New sources and changed extraction logic should begin with `autoPublish=false` until manually reviewed.

## 6. Idempotency

The pair `(sourceName, externalId)` is unique. Re-running the crawler for the same post must reuse the same external ID; a Telegram message ID is appropriate. A hash of the post text is not a stable ID because small edits would create new records.

If the original post is removed, call the individual delete endpoint. Do not create a new source name for each crawl run.

## 7. Contact and ownership claim

The redirect target is chosen in this order:

1. `t.me/<contactHandle>`, if the poster's handle is present.
2. `sourceUrl`, otherwise.

A matching poster handle can also support a later ownership claim/transfer. Incorrectly extracting a channel handle as the poster's handle can transfer the wrong listing; omit the poster ID if it is not genuinely exposed by the source.

A claimed crawled listing keeps `supplySource=Crawled`; only the ownership/publisher relationship changes.

## 8. Current boundaries and operations

- Cargo and Jobs crawler ingestion is not implemented in their October 2026 journey work.
- The Backoffice **Crawled sources** page shows source name, live/total count, last ingest and a Stale badge when last ingest is older than 48 hours.
- Deactivating a source removes its live/pending listings from the Advertio feed; it does not delete the external Telegram post or stop a crawler process.
- A stale source badge is a monitoring signal, not an automatic deactivation.
- The supported category/schema and production edge configuration must be verified against the deployed backend before a real ingestion run.

## Related pages

- [Backoffice Crawled sources](../backoffice/crawled-sources.md)
- [Backoffice Listings and provenance](../backoffice/listings.md)
- [Gate A](../backoffice/gate-a.md)
- [Current platform architecture](../architecture/current-platform.md)
