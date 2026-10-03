# Crawler Quality Control

> This document extracts the quality gates and observability patterns in Telclaw that are important for Advertio.

## Quality gates before Advertio delivery

A record should not reach Advertio only because it exists on Telegram.

It should pass layered checks.

### Collection quality

Current Telclaw collection rules include:

- sender must not be a bot;
- forwarded origin must be verifiably human;
- sender username is required by the current crawler;
- message must contain at least 10 words;
- same-sender content duplicates are skipped;
- raw source/provenance is retained.

### Processing quality

Cleaning and normalization must be deterministic and independent from source collection.

Do not overwrite or discard raw source content.

### Classification/extraction quality

Telclaw's architecture requires:

- category-specific processing definitions;
- structured extraction;
- output validation;
- retry/reject behavior for invalid or low-confidence results;
- no direct delivery of unvalidated AI output.

AI providers should be replaceable; crawler collection must not depend on a single model/provider.

### Advertio schema validation

Before delivery:

- category must exist in Advertio;
- location must resolve to canonical supported values;
- required attributes must exist;
- attribute values must be canonical;
- at least one of `sourceUrl` or `contactHandle` must exist;
- media count must be ≤ 10;
- source/media identity must be consistent.

If required data is unknown, reject/hold it rather than inventing a value.

## HTTP error policy

### Do not retry

`400` validation errors are permanent until data/config changes.

Examples from the contract include:

- invalid source name;
- missing external ID;
- missing source/contact routing;
- unknown category/location/attribute;
- missing required attribute;
- too many images;
- media owned by another source.

### Retry

Retry may be appropriate for:

- `5xx`;
- timeouts;
- transient network/provider failures.

Use backoff and preserve idempotency.

## Default moderation policy

For a new source:

```text
autoPublish=false
```

so accepted crawler leads enter review before becoming Active.

Auto-publishing should be enabled only after the source/extraction quality is established.

## Observability

Telclaw exposes operational status across stages, including:

- collected;
- processing pending/failed;
- classification pending/failed;
- AI pending/failed;
- Advertio pending/failed;
- total messages;
- last crawl/processing/AI/Advertio timestamps;
- backlog;
- failed item counts.

The crawler also emits per-stage reports.

Advertio should retain equivalent operational visibility so crawler failures do not silently degrade supply.

## Minimum test coverage to preserve

Telclaw currently has regression coverage for important crawler behaviors such as:

- 10-word collection threshold;
- forwarded human vs bot/channel/unknown filtering;
- content duplicate hashing;
- category-specific extraction;
- normalization;
- AI/provider failover;
- Advertio contract behavior;
- automatic retry;
- media cleanup and retry preservation.

Changes to Advertio's crawler contract should add/update tests rather than rely only on manual validation.

## References

- [Crawler implementation](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/crawler.py)
- [Advertio ingest contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Telegram monitoring](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/monitoring/telegram_monitor.py)
- [Telclaw tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests)
