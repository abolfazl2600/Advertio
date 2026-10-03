# Crawled Listing Ownership / User Claiming

> Important boundary: the reviewed Telclaw source does **not** implement an Advertio user-claim workflow. This document records the crawler metadata that makes a future Advertio-side claim flow possible and the safety rules that should apply.

## Why this belongs in crawler documentation

A crawled listing originates outside Advertio.

If the original advertiser later joins Advertio, the system may need to associate or migrate future activity to the verified Advertio identity without losing source provenance or accidentally assigning someone else's listing.

That requires crawler records to preserve identity evidence from the start.

## Identity/provenance available from Telclaw

Current collection records can preserve:

- Telegram sender numeric ID;
- Telegram sender username;
- sender type;
- source channel/group;
- Telegram message ID;
- original message link;
- contact handle;
- source URL.

These values should not be discarded during normalization or delivery.

## Recommended Advertio claim key hierarchy

This is an Advertio-side product rule, not a Telclaw implementation claim.

For any future claiming flow, prefer:

1. **verified Telegram numeric user ID** linked to the Advertio account;
2. Telegram username only as supporting/candidate evidence, because usernames can change;
3. source message/provenance for manual review when identity cannot be proven automatically.

Do not grant ownership solely because someone types the same `@username`.

## Claiming must not break crawler provenance

Even after a successful claim:

- keep original `sourceName`;
- keep original `externalId`;
- keep source URL/message reference;
- keep the fact that the historical record originated from crawler supply.

Do not rewrite historical crawler provenance as though the original listing was natively created in Advertio.

## Future-crawl suppression

If Advertio adopts the product policy that a verified joined advertiser should post natively going forward, suppression should be based on a stable verified identity where possible.

The crawler should then be able to exclude future posts from that verified identity without deleting historical audit data.

This suppression policy is **Advertio-specific** and is not present in the reviewed Telclaw implementation.

## Safe implementation requirements

A future claim flow should be:

- explicit;
- auditable;
- reversible by admin if needed;
- resistant to username reuse/changes;
- based on verified account linkage;
- isolated from crawler ingest idempotency.

Claiming should not mutate the `(sourceName, externalId)` identity of the source record.

## Telclaw references

- [Crawler sender/provenance extraction](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/crawler.py)
- [Advertio ingest contact/source contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Message repository](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/message_repository.py)
