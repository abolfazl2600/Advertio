# Cargo — Current Implementation Overview

> **Status:** Implemented in GitLab master on 2026-10-19 (CARGO-01). This is the current implementation summary, not a production deployment audit. Older pre-shipment design notes are preserved in [pre-launch-design.md](./pre-launch-design.md).

## Canonical shipped model

- Backend journey slug: passenger-cargo. Mini App label: Cargo.
- One Cargo listing model with a role attribute: traveller or sender. These are not separate listing types.
- Cargo is for passenger-carried items/capacity, not passenger ride-sharing or commercial freight logistics.

## Posting

Posting is a single-screen flow with four required choices:

1. Travelling or sending.
2. Origin city.
3. Destination city.
4. Travel date.

The title is generated from the answers; free-text input is not required. Cargo type, weight, price and a note are optional details behind an optional section.

Origin and destination must be selected from the location catalog. The current route catalog covers Iran, Canada, the United States, Germany, Italy, the United Kingdom and France. The server rejects cities outside the catalog.

Currency is derived from the route. A traveller’s price is per kilogram; a sender’s price is a total amount.

## Feed and details

- Server-side feed filters: role, origin and destination.
- Trips with a past travel date are hidden from the feed.
- Listing details show the route, date, cargo information and price, then use the shared contact flow.
- Cargo appears in the Hub, Post chooser, global Search, Saved and My listings.

The listing lifetime remains 30 days. Hiding past-date trips from the feed is not the same as expiring their lifecycle status by travel date.

## Shared platform behavior

- Contact, contact unlock, save and report use the shared listing interaction layer.
- Cargo contact/payment policy was seeded from the current Housing policy values; category policy remains configurable.
- Gate A metrics can be scoped to Cargo independently from Housing and Jobs.

## Explicit limits of CARGO-01

The following remain out of scope and must not be described as implemented:

- Cargo crawler ingestion.
- More than one active Cargo listing per user; the existing one-active-listing rule still applies.
- Lifecycle expiration based on the travel date.
- The Telegram bot search redesign.

## Related documents

- [Attributes](./attributes.md)
- [Filters](./filters.md)
- [Rules](./rules.md)
- [Crawler mapping](./crawler-mapping.md)
- [Pre-launch design notes](./pre-launch-design.md)
- [Current implementation status](../../03-product/current-capabilities.md)
