# Crawler poster identification and claiming (2026-10-21)

A crawled listing has external origin and remains `supplySource=Crawled`. The **author's** Telegram handle is the primary automatic ownership-claim key, and may be the contact routing destination.

- `contactHandle` may include or omit leading `@`; receiver normalizes case and strips it. Use **author handle**, not forwarding channel handle. If unverified, omit it and pass a legitimate `sourceUrl` instead.
- When a matching Telegram username later authenticates with Advertio, the crawler record may be **claimed/transferred** into that account's My Listings. Claiming is **one time**, not transferable to a later owner of a reused username. This does not change the record's `Crawled` supply classification, paid-contact rule or Gate A exclusion.
- `posterTelegramUserId` is an optional, positive 64-bit numeric ID for an individual author when Telegram `from.id` is available. It is for provenance/admin review, never a channel/chat ID, never a guessed lookup from username, and never made public by the API.
- When Telegram posts lack a visible author or trustworthy username, preserve the actual source message URL and the unknown author status; do not assume the channel itself posted the item personally.
- Duplicate records or replay under the same source ID do not update prior author information. Apply origin-provenance QA *before* first ingest.
- Avoid publishing or storing external identity fields beyond the receiver's documented schema. Validate column lengths before submission: `contactHandle` max 64, `sourceUrl` max 500, `title` max 200, `description` max 2000.

**Security implication:** attaching the channel handle to every listing can transfer an entire channel's inventory to the wrong signer. A missing claim is preferable to a false claim.

Source: [API contract `3](../../docs/integrations/crawler.md), [historical claiming study](../../09-crawler/user-claiming.md).
