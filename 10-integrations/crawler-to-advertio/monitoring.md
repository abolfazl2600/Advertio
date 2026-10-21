# Crawler integration monitoring and release gates (2026-10-21)

The following are **recommended operational measurements**, not a claim all dashboards already exist. Telclaw's own stages should be instrumented separately from Advertio's receiving API and Telegram publishing workers.

## Per-message trace

Record `sourceName`, `externalId`, canonical `categorySlug`, ingestion attempt timestamp, pipeline stage, HTTP class/status, `leadId` where received, `alreadyExisted`, retry attempt, validation failure category and final disposition. Preserve original source provenance upstream with access controls; never log `X-Ingest-Key`, full sensitive author details or arbitrary media contents.

## Monitor these distributions

| Segment | Key counters / alerts |
| --- | --- |
| Collection | source unreachable/disabled, Telegram disconnect/reconnect, messages scanned/eligible/skipped, sender identity missing |
| AI and mapping | classification invalid, missing route/role/date decisions, unknown city/catalog aliases, field validation rejected, records held for review |
| Ingest | calls by journey, `201` / `200 alreadyExisted` / `400` / `401` / `404` / `429` / `5xx`, retry queue age, rate-limit budget |
| Deduplication | first-attempt `alreadyExisted` across different IDs, same-message idempotent replays, false-positive review |
| Media | upload failures, key mismatch, thumb/full URL correctness, source-specific media volume |
| Channel publishing | sent photo, text-only because no image, `PhotoError`-assisted fallback, ambiguous/failed retry, duplicate-post investigations |
| Cleanup | source deletion detected vs ingested DELETE acknowledged, orphan/expired stale listings, bulk source deactivation |

**Preproduction test gate:** Cargo with no role/date, Cargo type array plus legacy scalar, precise Jalali conversion, wrong country city, different authors same synthetic title, idempotent replay, photo refusal versus timeout, expired `410`, and stale source DELETE. Recommended 2–3 concurrent ingest operations initially; confirm edge host health and budgets.

**Known verification gaps:** The documentation review has not tested API DNS/TLS, live rate-limit settings, real Telegram WebP photo-by-URL acceptance, the external Telclaw deployment or end-to-end prod operations. See [GitLab source audit](../../docs/releases/2026-10-21.md).
