# Duplicate Detection and Idempotency

> Telclaw implements two different protections. Advertio should keep them conceptually separate.

## Layer 1 — content duplicate detection during collection

Telclaw computes a fingerprint from normalized message text.

Normalization:

1. Unicode NFKC normalization;
2. collapse whitespace;
3. trim;
4. case-fold.

Fingerprint:

```text
SHA-256(normalized text)
```

Duplicate lookup is scoped by:

```text
(sender_id, content_hash)
```

That means the same normalized text from the same sender is treated as a collection duplicate.

The current database adds an index on:

```text
(sender_id, content_hash)
```

### Why sender scope matters

A generic text hash alone can incorrectly merge different people posting similar content. Telclaw intentionally combines the sender identity with the normalized content fingerprint.

## Layer 2 — Advertio ingest idempotency

Advertio lead identity is different.

Canonical ingest key:

```text
(sourceName, externalId)
```

For Telegram:

```text
externalId = stable Telegram message ID
```

**Do not use the content hash as `externalId`.**

If the same source/message is submitted again, Advertio can return:

```text
200
alreadyExisted = true
```

This is a successful idempotent result and must not be logged/retried as a failure.

## Why both layers are required

Content duplicate detection protects the crawler dataset from repeated/reposted same-sender content.

Ingest idempotency protects Advertio from network retries and repeated delivery of the exact same source record.

They solve different problems.

## Advertio marketplace duplicate review

Advertio may perform additional listing-level/fuzzy duplicate detection after ingest. That should remain separate from the deterministic crawler protections above.

Crawler logic should not try to replace marketplace-level duplicate review by over-aggressively collapsing records.

## References

- [content_duplicate.py](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/content_duplicate.py)
- [content duplicate tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests/test_content_duplicate.py)
- [Advertio ingest idempotency contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
