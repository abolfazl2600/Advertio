# Crawler Purpose and Product Boundary

> Derived from Telclaw's pipeline architecture and Advertio ingest contract at Telclaw commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).

## Why the crawler exists

Advertio uses crawler supply to reduce cold-start friction by making relevant Telegram inventory discoverable in a structured marketplace.

The crawler's responsibility is to transform eligible Telegram posts into **traceable crawled listings**. It must not blur the distinction between crawler inventory and listings created by registered Advertio users.

## Crawled cohort vs native cohort

The Telclaw → Advertio contract explicitly treats crawler records as a separate cohort.

Crawler records:

- enter through the dedicated ingest API;
- are marked as crawled supply;
- preserve source URL/contact provenance;
- direct contact back to Telegram according to the ingest contract;
- are not equivalent to native user-created listings.

Advertio analytics may compare crawled and user-generated cohorts, but they must remain separable so supply quality and marketplace health are measurable.

## What the crawler should optimize for

The crawler should optimize for:

- **freshness** — stale Telegram content should not remain active;
- **relevance** — only records that survive category and business validation should be delivered;
- **traceability** — every Advertio record should map back to source + external message ID;
- **quality** — weak, unverifiable or structurally incomplete records should be skipped/rejected rather than guessed;
- **idempotency** — rerunning the crawler must not create accidental duplicate leads;
- **operability** — failures, retries, backlogs and per-stage outcomes must be visible.

## What the crawler should not become

The crawler should not:

- be the primary identity system;
- create native Advertio users;
- convert scraped/crawled posts into user-generated supply silently;
- depend on one AI provider;
- store only AI-cleaned text and discard the source text;
- use mutable text hashes as Advertio lead identity;
- auto-publish every new source before quality is proven.

## Safe default for a new source

The Telclaw integration contract specifies:

```text
autoPublish = false
```

for a new source.

That means new sources should enter `PendingReview` until their extraction and quality are trusted. Auto-publishing is a later operational decision for proven sources.

## Related source

- [Telclaw Advertio integration](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Telclaw architecture](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/architecture.md)
