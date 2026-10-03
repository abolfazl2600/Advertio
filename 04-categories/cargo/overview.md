# Cargo — Product Overview

> Status: **Development specification**
>
> Cargo is **one top-level category with one unified listing model**.
>
> There is no Advertio Cargo `role`, no Carrier/Sender split, and no Passenger Cargo / Ride Sharing / Logistics & Shipping subcategory structure.
>
> Crawler reference: Telclaw `transferlist` at commit `63fbc01555f01345bb92124c9112db63f1395e92`.

## 1. Canonical product model

Advertio Cargo uses:

```text
Category = Cargo
```

and nothing below that is a category or required product role.

A listing may describe:

- someone travelling with cargo capacity;
- someone who wants cargo transported;
- a concrete route-based cargo opportunity/request.

But Advertio stores and presents all of them as **Cargo listings using the same schema**.

The distinction stays in:

- title;
- description;
- cargo details;
- route/date/flight data;
- source provenance.

It does not create a separate `carrier` or `sender` field.

## 2. Taxonomy decision

Superseded model:

```text
TRAVEL_TRANSPORT
├── passenger_cargo
├── ride_sharing
└── logistics_shipping
```

Also rejected for Advertio:

```text
Cargo
└── role
    ├── carrier
    └── sender
```

Canonical Advertio model:

```text
Cargo
```

One category, one feed, one data contract.

## 3. Telclaw relationship

Telclaw classifies this supply under:

```text
transferlist
```

Its current AI extraction supports:

- title
- description
- origin_city
- origin_province
- origin_country
- destination_city
- destination_province
- destination_country
- airline
- flight_number
- departure_date
- departure_time
- arrival_date
- arrival_time
- cargo_type
- weight
- weight_unit
- quantity
- volume
- volume_unit
- price
- currency
- contact
- features

These attributes are useful to Advertio Cargo and should survive ingestion.

## 4. Telclaw PASSENGER / SHIPPER handling

Telclaw internally uses concepts such as:

```text
PASSENGER
SHIPPER
```

and its storage/publisher also knows `transfer_role`.

Advertio must **not** translate these into Product roles.

Specifically, do not do:

```text
passenger → carrier
shipper → sender
```

for Advertio Product data.

Instead:

```text
passenger → Cargo
shipper   → Cargo
```

If the upstream role exists, it may be preserved internally as:

```text
source_transfer_role
```

for audit/debug/provenance only.

It must not:

- change category;
- change feed;
- create a role filter;
- block ingestion if absent;
- alter public Cargo taxonomy.

## 5. Unified native posting flow

Recommended:

```text
Post
→ Cargo
→ Route
→ Date / time
→ Airline / flight info (optional)
→ Cargo type
→ Weight / unit
→ Quantity / volume (optional)
→ Price / currency
→ Description
→ Contact
→ Preview
→ Pending
→ Admin review
→ Active
```

There is no "Are you Carrier or Sender?" step.

The title and description communicate the listing intent naturally.

## 6. Unified feed

All Cargo listings appear in the same Cargo feed.

Example cards:

```text
Toronto → Tehran · 20 Oct · 12 kg
Air Canada · $20/kg
```

```text
Toronto → Tehran · 20 Oct · Documents · 4 kg
Negotiable
```

The UI does not need a Carrier/Sender badge.

## 7. Search and relevance

Cargo discovery should rely on factual attributes:

- origin;
- destination;
- departure/arrival date;
- airline;
- flight number;
- cargo type;
- weight;
- quantity;
- volume;
- price;
- description.

Relevance can rank route/date/item compatibility without requiring an explicit role.

See [matching.md](./matching.md).

## 8. Product scope

Cargo V1 is traveler-assisted cargo transfer.

Included:

- route-based passenger baggage/cargo opportunities;
- requests to transport cargo along a route.

Excluded:

- transporting passengers;
- ride sharing;
- taxi/carpooling;
- commercial freight brokerage;
- trucking/logistics fleet management;
- warehousing/freight forwarding.

## 9. Trust and safety

Potential trust signals:

- Phone Verified;
- Identity Verified;
- Ticket/Trip Verified;
- Member since;
- Reviews/history.

Airline/flight data can support review but does not itself prove verification.

Cargo must not encourage:

- unknown sealed packages;
- undeclared cargo;
- illegal/restricted goods;
- customs/airline-rule bypassing.

## 10. Current implementation boundary

Current Telegram Bot docs still show **Passenger Cargo** as current UI copy.

Target product name:

```text
Cargo
```

Current-state docs should only change once runtime UI is actually renamed.

## 11. Documentation map

- [attributes.md](./attributes.md) — unified Cargo schema
- [filters.md](./filters.md) — unified discovery/filter contract
- [matching.md](./matching.md) — route/relevance logic without roles
- [crawler-mapping.md](./crawler-mapping.md) — Telclaw → Cargo mapping
- [rules.md](./rules.md) — category rules

## 12. Acceptance criteria

- [ ] Cargo is one category.
- [ ] Advertio Cargo has no `role` field.
- [ ] Passenger/Shipper never become Carrier/Sender Product roles.
- [ ] Both Telclaw intents ingest into the same Cargo model.
- [ ] Route/date/flight/cargo/weight/price attributes survive ingestion.
- [ ] Cargo discovery and relevance work without role filtering.
- [ ] Ride-sharing and commercial logistics remain outside Cargo V1.
