# Advertio Crawler — Overview

> Source study: [Telclaw](https://github.com/abolfazl260/Telclaw) at commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).
>
> This folder records the crawler behavior and integration requirements that Advertio should preserve/adopt from Telclaw. It is documentation and integration guidance; it does not claim every Telclaw behavior already runs inside Advertio.

## Role in Advertio

The crawler is a **supply-seeding pipeline**, not the core marketplace.

Its job is to collect eligible Telegram posts, preserve their provenance, normalize and validate them, and deliver only valid structured records into Advertio's dedicated crawler ingest path.

Crawled listings must remain distinguishable from user-generated listings.

## Required pipeline boundary

Telclaw's architecture separates each stage:

```text
Telegram
   ↓
Collection
   ↓
Raw storage
   ↓
Cleaning / normalization
   ↓
Category classification
   ↓
Category-specific extraction
   ↓
Validation
   ↓
Business rules
   ↓
Advertio Ingest API
```

Advertio should preserve this separation. Collection must not become tightly coupled to AI, marketplace UI, or delivery.

## Core principles to carry into Advertio

1. **Preserve raw source data.** Keep the original Telegram text and provenance so records can be reprocessed later.
2. **Separate raw collection from processed data.** Cleaning, normalization, classification and AI extraction are later stages.
3. **Use stable source identity.** Delivery idempotency is based on `(sourceName, externalId)`, where `externalId` is the stable Telegram message ID.
4. **Do not use text hashes as external IDs.** Content hashes are useful for duplicate detection, not delivery identity.
5. **Keep crawled supply separate.** Crawled records use Advertio's crawler ingest endpoint and must not masquerade as native user listings.
6. **Default new sources to review.** New crawler sources should begin with `autoPublish=false`.
7. **Retry only transient failures.** Validation errors are permanent; network/5xx failures may retry with backoff.
8. **Delete stale source records.** If the source Telegram post disappears, the corresponding crawler lead must be deactivated through the ingest API.
9. **Defer media download.** Telclaw stores media metadata during collection and downloads photos only after a record survives AI/validation and is ready for delivery.
10. **Make every stage observable.** Persist stage status, errors, attempts, timestamps and delivery state.

## Advertio ingest boundary

Crawler output is delivered through the dedicated crawler contract:

- media upload: `POST /api/ingest/media`
- lead creation: `POST /api/ingest/leads`
- single-lead removal: `DELETE /api/ingest/leads/{sourceName}/{externalId}`
- whole-source removal: `DELETE /api/ingest/sources/{sourceName}`

The integration uses `X-Ingest-Key` and the key must remain in environment/secret storage, never in source, logs or payloads.

## Folder map

- [purpose.md](./purpose.md) — why Advertio uses crawler supply and the product boundary.
- [sources.md](./sources.md) — Telegram source identity, configuration and provenance.
- [crawling-rules.md](./crawling-rules.md) — collection eligibility and crawl-time rules.
- [data-normalization.md](./data-normalization.md) — normalization and canonical Advertio contract.
- [duplicate-detection.md](./duplicate-detection.md) — content duplicates vs ingest idempotency.
- [lifecycle.md](./lifecycle.md) — stage states, delivery retry and stale-record removal.
- [quality-control.md](./quality-control.md) — validation, media, monitoring and release gates.
- [user-claiming.md](./user-claiming.md) — metadata needed for future ownership/claim flows.

## Primary Telclaw references

- [README.md](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/README.md)
- [Architecture](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/architecture.md)
- [Advertio Ingest API contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Crawler implementation](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/crawler.py)
- [Media downloader](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/media_downloader.py)
- [Scheduler](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/services/scheduler_service.py)
- [Content duplicate handling](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/content_duplicate.py)
