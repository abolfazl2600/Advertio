# Crawler Record Lifecycle

> Based on Telclaw's staged pipeline, repository statuses, scheduler and Advertio ingest contract at commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).

## Pipeline lifecycle

A crawler record should remain traceable through independent stages:

```text
collected
  ↓
processed / normalized
  ↓
classified
  ↓
AI extracted
  ↓
validated
  ↓
ready for Advertio
  ↓
sent / already existed
```

Failure must identify the stage that failed so an operator can safely retry or reject it.

## Collection state

At collection time Telclaw records raw text and metadata with processing stages still pending/waiting.

The crawler should never need to discard the original record because a later stage fails.

## Processing and classification

Telclaw tracks processing and classification independently.

Representative states include:

- pending / waiting;
- processing;
- processed;
- failed;
- skipped where a category does not require further processing.

Advertio-side documentation should preserve the same stage separation even if implementation names differ.

## Advertio delivery lifecycle

The ingest contract distinguishes delivery outcomes.

### Create lead

`POST /api/ingest/leads`

Typical outcomes:

- `201 PendingReview` — accepted for review;
- `201 Active` — accepted and auto-published when `autoPublish=true`;
- `200 alreadyExisted=true` — idempotent success;
- `400` — permanent validation error;
- `401` — authentication/configuration error;
- `5xx` / timeout / transient network error — retryable.

### Safe default

New sources should use:

```text
autoPublish = false
```

until quality is proven.

## Delivery retry

The integration contract describes delivery roughly as:

```text
PENDING → SENDING → SENT
                  ↘ FAILED → RETRY
```

Telclaw's automatic retry tests also enforce a cycle cutoff so the current cycle does not repeatedly pick up brand-new failures as an uncontrolled tight retry loop.

Retry must remain idempotent.

## Media lifecycle

Telclaw defers media download until a record is ready for delivery.

After:

- successful delivery; or
- `alreadyExisted=true`

local downloaded media can be cleaned up and persisted local paths cleared.

On:

- retryable failure; or
- permanent rejected delivery

the current Telclaw tests preserve local media so the operator/process can inspect or retry safely.

## Stale source record removal

If the original Telegram post no longer exists, the Advertio contract requires deactivation:

```http
DELETE /api/ingest/leads/{sourceName}/{externalId}
```

A crawler that only creates records and never removes stale source posts will produce stale marketplace inventory.

## Whole-source shutdown

For a source that should no longer feed Advertio:

```http
DELETE /api/ingest/sources/{sourceName}
```

This deactivates the related crawled leads.

## References

- [Telclaw architecture](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/architecture.md)
- [Scheduler service](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/services/scheduler_service.py)
- [Advertio automatic retry tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests/test_advertio_automatic_retry.py)
- [Advertio media cleanup tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests/test_advertio_media_cleanup.py)
- [Advertio ingest contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
