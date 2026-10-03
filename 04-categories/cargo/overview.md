# Cargo — Product Overview

> Status: **Development specification**
>
> Product decision: this category replaces the old `Travel / Transport` planning section.
>
> Cargo is **one top-level category**. It has no Passenger Cargo / Ride Sharing / Logistics & Shipping subcategories.

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
Price: $20/kg
```

### Sender

A person who needs an item/cargo transported along a route.

Example:

```text
Toronto → Tehran
Need to send before: 20 Oct
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

That taxonomy is superseded for the Cargo product specification.

New model:

```text
CARGO
└── role
    ├── carrier
    └── sender
```

There is:

- one category;
- one feed;
- one set of route fields;
- one filter/search model;
- one detail model;
- one moderation system;
- one matching system.

## 3. What Cargo V1 is

Cargo V1 is a **traveler-assisted cargo marketplace**.

It is designed for matching:

- travelers with unused baggage/carrying capacity;
- people who want to send eligible items along the same route.

## 4. What Cargo V1 is not

Cargo V1 is not:

- passenger ride-sharing;
- taxi/carpooling;
- commercial freight brokerage;
- courier-company marketplace;
- trucking/logistics management;
- warehouse/freight forwarding;
- escrow/shipping insurance platform.

These can be separate future products if needed.

## 5. Source-defined core fields

The original product source explicitly defines for the old Passenger Cargo concept:

- `role` — carrier / sender;
- `origin_country`;
- `origin_city`;
- `destination_country`;
- `destination_city`;
- `date`;
- `max_weight_kg`;
- `allowed_items` — documents, electronics, clothes, personal_items;
- `price`;
- `currency` — CAD, USD, EUR.

This Cargo specification preserves that core model but removes the subcategory split.

## 6. Core user flows

### Carrier flow

```text
Post
→ Cargo
→ I can carry cargo
→ Route
→ Travel date
→ Available capacity
→ Allowed item types
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
→ Preferred date / deadline
→ Cargo weight
→ Item type
→ Budget / price preference
→ Contact
→ Preview
→ Pending
→ Admin review
→ Active
```

## 7. Unified discovery

The Cargo feed can contain both roles.

Each card must make the role immediately visible.

Examples:

```text
✈️ Carrier · Toronto → Tehran · 12 kg · 20 Oct
📦 Sender · Toronto → Tehran · 4 kg · before 20 Oct
```

Users can filter by role, but role selection does not move them into another category.

## 8. Matching model

Cargo matching pairs complementary roles:

```text
sender ↔ carrier
```

Core compatibility:

- opposite roles;
- same route direction;
- compatible date/date range;
- carrier capacity >= sender cargo weight;
- sender item type allowed by carrier.

See [matching.md](./matching.md).

## 9. Trust and verification

Cargo has higher trust requirements than a normal classified listing because a traveler may physically carry another person's property.

Advertio's source mentions a future/manual **Cargo ticket Verified** verification.

This should be treated as a trust signal for a carrier/trip, not as proof that a cargo item is legal or safe.

Potential trust layers:

- Phone Verified;
- Identity Verified;
- Ticket/Trip Verified;
- Member since;
- Reviews/history when available.

Do not label unverified trip data as verified.

## 10. Safety boundary

Advertio should require item declaration and prohibit illegal/restricted goods according to applicable law and carrier/travel rules.

The platform must not encourage:

- undisclosed cargo;
- unknown sealed items;
- illegal/restricted goods;
- bypassing customs/airline rules.

Exact legal/prohibited-item policy requires a dedicated compliance policy before public launch.

## 11. Current implementation boundary

The current Telegram Bot documentation still shows the UI label **Passenger Cargo** in category selection.

That is a current-state UI observation, not the new product taxonomy.

The product target is now:

```text
Cargo
```

A separate implementation task is required to rename current UI/runtime labels if they still use Passenger Cargo.

## 12. Documentation map

- [attributes.md](./attributes.md) — unified Cargo data contract
- [filters.md](./filters.md) — unified filtering/search
- [matching.md](./matching.md) — sender ↔ carrier matching
- [rules.md](./rules.md) — category invariants and safety rules

## 13. Acceptance criteria

- [ ] Cargo exists as one top-level category.
- [ ] Carrier and Sender are listing roles, not categories/subcategories.
- [ ] No new Cargo flow asks the user to choose Passenger Cargo / Ride Sharing / Logistics Shipping.
- [ ] Both roles share one route model and one feed.
- [ ] Role is visible on Cargo listing cards/details.
- [ ] Matching pairs Sender with Carrier using route/date/capacity/item compatibility.
- [ ] Ride-sharing and commercial logistics are not silently included in Cargo V1.
