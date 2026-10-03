# Cargo — Product Overview

> Status: **Development specification**
>
> Product decision: this category replaces the old `Travel / Transport` planning section.
>
> Cargo is **one top-level category**. It has no Passenger Cargo / Ride Sharing / Logistics & Shipping subcategories.
>
> Crawler reference: [Telclaw transferlist @ 63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).

## 1. Core product model

Cargo connects two complementary roles inside the same category:

```text
role = carrier
role = sender
```

### Carrier

A traveler who is already making a trip and has available baggage/cargo capacity.

Example:

```text
Toronto → Tehran
Travel date: 20 Oct
Available capacity: 12 kg
Allowed: documents, clothes
Airline: optional
Flight number: optional
Price: $20/kg
```

### Sender

A person who needs an item/cargo transported along a route.

Example:

```text
Toronto → Tehran
Need to send around: 20 Oct
Weight: 4 kg
Item: documents
Budget: negotiable
```

The roles are **not categories**.

They are values of the Cargo listing attribute `role`.

## 2. Product taxonomy decision

Previous planning material included:

```text
TRAVEL_TRANSPORT
- passenger_cargo
- ride_sharing
- logistics_shipping
```

That taxonomy is superseded.

Canonical model:

```text
CARGO
└── role
    ├── carrier
    └── sender
```

There is:

- one category;
- one feed;
- one route model;
- one filtering/search model;
- one detail model;
- one moderation system;
- one matching system.

## 3. Telclaw Transfer relationship

Telclaw currently classifies this supply as:

```text
transferlist
```

Its classifier describes `transferlist` as air-cargo / passenger-baggage / parcel shipping involving a traveler/passenger.

The current extraction schema includes substantially more data than the original Advertio Passenger Cargo notes.

### Telclaw AI-extracted fields

Current `ai/category_schemas.py` + `ai/prompts/transferlist.txt` support:

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

These fields must be considered when defining Cargo ingestion and native Cargo fields.

See [crawler-mapping.md](./crawler-mapping.md).

## 4. Telclaw role mapping

Telclaw terminology:

```text
passenger
shipper
```

Advertio terminology:

```text
passenger → carrier
shipper   → sender
```

Advertio should persist its canonical role values:

```text
carrier
sender
```

and retain raw crawler terminology only as source/provenance if needed.

## 5. Known Telclaw integration gap

The current Telclaw repository has a schema inconsistency that Advertio integration must not hide.

### Present in Telclaw storage/publisher

- `transfer_role`
- `transport_type`

### Current AI allow-list/prompt output

The current fetched `ai/category_schemas.py` and transfer output schema do **not** include those two fields.

At the same time:

- the Transfer prompt conceptually distinguishes PASSENGER vs SHIPPER;
- `storage/__init__.py` injects `transfer_role` into the transfer table;
- the Telegram transfer publisher reads `transfer_role`;
- the transfer publisher also reads `transport_type`.

Therefore, Advertio must not assume those two values are reliably AI-extracted from every current Telclaw record.

Until Telclaw is aligned, role should be:

- mapped when a trustworthy source value exists;
- otherwise treated as unknown/review-required;
- never guessed merely to satisfy Advertio requiredness.

## 6. What Cargo V1 is

Cargo V1 is a **traveler-assisted cargo marketplace**.

It is designed for matching:

- travelers with unused baggage/carrying capacity;
- people who want to send eligible items along the same route.

## 7. What Cargo V1 is not

Cargo V1 is not:

- passenger ride-sharing;
- taxi/carpooling;
- commercial freight brokerage;
- courier-company marketplace;
- trucking/logistics management;
- warehouse/freight forwarding;
- escrow/shipping insurance platform.

These can be separate future products.

## 8. Core user flows

### Carrier flow

```text
Post
→ Cargo
→ I can carry cargo
→ Route
→ Airline / flight info (optional)
→ Departure / arrival date & time
→ Available capacity
→ Allowed cargo/item types
→ Quantity / volume constraints (optional)
→ Price
→ Contact / verification
→ Preview
→ Pending
→ Admin review
→ Active
```

### Sender flow

```text
Post
→ Cargo
→ I need to send cargo
→ Route
→ Preferred shipment date/window
→ Cargo type
→ Weight / quantity / volume
→ Budget / price preference
→ Contact
→ Preview
→ Pending
→ Admin review
→ Active
```

## 9. Unified discovery

The Cargo feed can contain both roles.

Each card must make the role immediately visible.

Examples:

```text
✈️ Carrier · Toronto → Tehran · 12 kg · 20 Oct
📦 Sender · Toronto → Tehran · 4 kg · before 20 Oct
```

Users can filter by role, but role selection does not move them into another category.

## 10. Matching model

Cargo matching pairs complementary roles:

```text
sender ↔ carrier
```

Core compatibility:

- opposite roles;
- same route direction;
- compatible date/date range;
- carrier capacity >= sender cargo weight;
- sender cargo type/item compatible with carrier;
- optional quantity/volume constraints when supplied.

Airline/flight information is useful for trust, detail and ranking but should not be a mandatory match constraint unless the user explicitly filters for it.

See [matching.md](./matching.md).

## 11. Location normalization

Telclaw already maintains a transfer-specific canonical-location layer:

```text
transfer_locations
```

with canonical origin/destination city keys and ISO-2 countries.

Advertio should reuse canonical normalized locations rather than parsing route strings during every search.

Do not store country flags as data; flags are presentation only.

## 12. Trust and verification

Cargo has higher trust requirements than a normal classified listing because a traveler may physically carry another person's property.

Advertio source mentions future/manual **Cargo ticket Verified** verification.

Potential trust layers:

- Phone Verified;
- Identity Verified;
- Ticket/Trip Verified;
- Member since;
- Reviews/history when available.

Airline and flight number can support trip review but do not themselves prove verification.

## 13. Safety boundary

Advertio should require item declaration and prohibit illegal/restricted goods according to applicable law and airline/carrier rules.

The platform must not encourage:

- undisclosed cargo;
- unknown sealed items;
- illegal/restricted goods;
- bypassing customs/airline rules.

Exact prohibited/restricted-item policy requires dedicated compliance work before public launch.

## 14. Current implementation boundary

Current Telegram Bot documentation still shows **Passenger Cargo** as the UI label.

That is a current-state observation, not the new product taxonomy.

Target:

```text
Cargo
```

A runtime/UI implementation change is still required where the old label exists.

## 15. Documentation map

- [attributes.md](./attributes.md) — unified Cargo + Telclaw-aligned data contract
- [filters.md](./filters.md) — filtering/search
- [matching.md](./matching.md) — sender ↔ carrier matching
- [crawler-mapping.md](./crawler-mapping.md) — exact Telclaw → Advertio mapping
- [rules.md](./rules.md) — category invariants and safety rules

## 16. Acceptance criteria

- [ ] Cargo exists as one top-level category.
- [ ] Carrier and Sender are listing roles, not subcategories.
- [ ] Telclaw transfer fields are represented in the Cargo integration contract.
- [ ] Passenger maps to Carrier; Shipper maps to Sender.
- [ ] Unknown crawler role is never silently guessed.
- [ ] Route date/time, airline/flight, cargo type, weight, quantity, volume, price and contact can survive ingestion where present.
- [ ] Both roles share one feed and route model.
- [ ] Ride-sharing and commercial logistics remain outside Cargo V1.
