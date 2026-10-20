# Backoffice — Crawled sources

> Crawled sources tracks listings ingested from external sources, such as Telegram channels. It is an operational monitor and bulk-deactivation surface, not a crawler configuration editor.

## 1. Sources table

Each source row shows:

- Stable source name.
- Live listing count and total listing count.
- Last-ingested timestamp as relative time (or its available timestamp).
- A **Stale** badge when the last ingest is more than 48 hours old.
- Deactivate action.

The page header shows the total number of crawled listings currently live across sources.

## 2. Deactivate a source

The Deactivate action opens a confirmation showing the number of live and pending listings that will leave the feed. On confirmation, the server deactivates all listings associated with that source and the page refreshes the source and listing counts.

- The action is disabled when a source has no live listings.
- Deactivation is source-wide; it is not a per-listing delete.
- Deactivation does not mean the external Telegram post was deleted or that the crawler was stopped upstream. It changes Advertio's ingested listings.
- The crawler should separately remove an individual listing when the source post disappears, using the ingestion contract.

## 3. Crawled listing semantics

Crawled listings are a separate supply cohort:

- They never deduct Advertio Coins for opening the original contact/source.
- Contact routes to the poster's Telegram handle when available, otherwise to the source URL.
- Crawled supply is excluded from Gate A's user-generated listing/contact-conversion metrics, except the explicit **Is crawled supply eating demand?** comparison.
- Listing provenance in the Listings drawer identifies crawler source and source-message information when recorded.

## 4. Freshness and response

The Stale badge is a monitor, not an automatic failure/deactivation. Check crawler health, source availability and the last successful ingest before deciding whether to deactivate a source. The UI does not restart or schedule a crawler.

## Related pages

- [Crawler ingestion contract](../integrations/crawler.md)
- [Listings and provenance](./listings.md)
- [Gate A](./gate-a.md)
