# Crawler → Advertio: current integration (2026-10-21)

The ingestion receiver is **implemented** in GitLab `master`. The independently maintained Telclaw collector is a **different repository**, and this integration documentation does not assert that a Telclaw deployment has been updated.

**Read in order:** [full synchronized contract](./architecture.md), [operational reconciliation](../../09-crawler/advertio-integration-2026-10-21.md), [source changes](../../docs/releases/2026-10-21.md).

The documented pipeline: Telegram source → source-ID/provenance preservation → text cleanup → classifier + extraction → schema/location validation → optional housing media upload → `POST /api/ingest/leads` → moderation/dedup → indexed public listing → matched channels / Mini App → `DELETE` once original source disappears.

- Accepted category slugs: `housing`, `passenger-cargo`, `jobs`. Jobs and housing target Canada; Cargo routes use seven country catalog.
- Payload envelope includes stable `sourceName` + `externalId`, title, cleaned description, category-specific `attributesJson` **string**, canonical location and one valid Telegram contact destination.
- Receiver labels imported records `supplySource=Crawled`. Crawled supply is never confused with paid native listing posting; it has Telegram contact without paid unlock, no native verification badge and no contribution to Gate A.
- Use `autoPublish=false` for newly added or unproven sources.
- The first-time Cargo schema changed on October 21: **no side required; date optional; item type is multi-select**. [Exact mapping](./data-mapping.md).
- A repeated source ID is a no-op; cross-source duplicates can also produce `alreadyExisted=true`. Source deletion must be explicitly propagated; old approved listings cannot be overwritten by re-ingest.
- The deployment address, edge budget and authentication require environment verification; presence in GitLab `master` does **not** confirm the corresponding production systems.

**Ownership:** Telclaw owns collection, parsing and retry queue; Advertio owns endpoint validation, persistence and downstream publication. See [errors/retries](./errors-retries.md), [monitoring](./monitoring.md), [duplicate handling](./duplicate-handling.md).
