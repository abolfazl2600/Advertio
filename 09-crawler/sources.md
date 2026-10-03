# Crawler Sources and Provenance

> Source study: Telclaw commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).

## Source model

A crawler source is a configured Telegram channel/group from which eligible messages may be collected.

Advertio should preserve enough provenance to answer:

- which Telegram source produced this record;
- which Telegram message produced it;
- who posted it when that identity is available;
- where the original post can be opened;
- whether the source is currently enabled/trusted.

## Stable source identity

The Advertio ingest contract requires a stable `sourceName`.

Rules from the contract:

- 2–32 characters;
- pattern `^[a-z0-9][a-z0-9-]{1,31}$`;
- must stay stable over time;
- media upload `source` must match the lead `sourceName`.

Do not derive a new source name on each run.

## Stable record identity

For Telegram records:

```text
externalId = stable Telegram message/post ID
```

Advertio idempotency uses:

```text
(sourceName, externalId)
```

Do not use a text hash as the external ID.

## Provenance fields worth preserving

Telclaw collection/delivery preserves or derives:

- Telegram source/channel username;
- Telegram channel ID/title where available;
- Telegram message ID;
- Telegram message link for public usernames;
- sender numeric ID;
- sender username;
- sender type;
- source URL;
- contact handle;
- original message date;
- raw source text;
- media metadata.

These fields are important for moderation, stale-record cleanup, duplicate investigation and future ownership/claim flows.

## Source URL and contact routing

The Advertio contract requires at least one of:

- `sourceUrl`
- `contactHandle`

Contact routing priority is:

1. Telegram handle when `contactHandle` exists;
2. otherwise the original `sourceUrl`.

## Source access failures

Telclaw treats invalid/private/inaccessible Telegram channels as crawl failures rather than fabricating results.

Advertio operations should expose source health instead of silently dropping inaccessible sources.

## Source deactivation

If an entire source must be withdrawn, the integration contract provides:

```http
DELETE /api/ingest/sources/{sourceName}
```

This should deactivate the crawler leads associated with that source rather than requiring manual record-by-record cleanup.

## Scheduling behavior worth preserving

Telclaw's scheduler:

- accepts one or more source categories;
- avoids scheduling the same Telegram username twice when shared across categories;
- keeps source order;
- supports spacing between channels;
- tracks active crawl jobs;
- can stop/skip stages operationally.

## Related source

- [Advertio ingest contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Crawler service](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/services/crawler_service.py)
- [Crawler implementation](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/crawler.py)
