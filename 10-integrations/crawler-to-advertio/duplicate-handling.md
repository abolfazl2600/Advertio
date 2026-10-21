# Duplicates and idempotency (2026-10-21)

Two independent duplicate layers exist. **Collector-level** same-sender content checks (documented in the historical Telclaw study) are not the same as the **Advertio receiver's** source identity and marketplace-level matching.

## Stable identity

Canonical ingest identity is `(sourceName, externalId)`. Telegram `message_id` alone is only unique **within its source/channel**; namespace it through stable `sourceName`. Text hashes are not source IDs. Repeated `POST /api/ingest/leads` returns `200` / `alreadyExisted:true` without updating the original record, even if Telegram post content later changed. A deleted/deactivated identity cannot be recreated by replaying its old ID.

## Independent cross-source duplicate matching

Advertio can return `200 alreadyExisted:true` with the **existing** `leadId` for a **different** message identity: exact normalized source link in same category, matching same-category title+description+price+city, or weighted similarity in a nearby same-category/city/time cohort. The current documented high threshold is `0.92`, with medium band `0.75–0.92` causing review, not automatic publication. Thresholds and weights are configurable, not permanent invariants.

The cross-source matched message is **not inserted as a new source record**; deleting that pair later returns `404`. Log `sourceName`, `externalId` and returned `leadId` on **first** `alreadyExisted` result to diagnose false positives.

**Cargo/Jobs risk:** many titles are synthetic (route/date, job role/field/city). If two different people have matching titles and price, blank descriptions may collapse separate supply. Always submit the cleaned **source post text as description**. ContactHandle is not included in the documented high-level similarity weighting; distinct people can still be merged if the source posts share a rigid template.

**Testing:** same externalId replay; different IDs and different sources; same link in same category; different publishers with similar Cargo routes; medium-confidence review; deletion of a cross-source suppressed identity.

Sources: [full API contract `4](../../docs/integrations/crawler.md), [implementation reconciliation](../../09-crawler/advertio-integration-2026-10-21.md), [historical Telclaw content-hash layer](../../09-crawler/duplicate-detection.md).
