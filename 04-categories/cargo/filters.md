# Cargo — Filters & Search Contract

> Cargo has one feed. Filters narrow listings by role and route; they do not navigate to subcategories.
>
> Filter design also accounts for fields currently extracted by Telclaw `transferlist`.

## 1. Primary filters

Recommended V1:

1. Role
2. From
3. To
4. Date
5. Weight
6. Item Type
7. Price
8. More Filters

## 2. Role

Values:

- Any
- Carrier
- Sender

Crawler terminology maps:

```text
passenger → Carrier
shipper → Sender
```

A crawler listing whose role is unknown must not be silently put into either role filter.

## 3. User-intent shortcut

UI may offer:

```text
I need a carrier
I need a sender
```

Mapping:

```text
I need a carrier → filter role = carrier
I need a sender → filter role = sender
```

These are query shortcuts, not categories.

## 4. Origin / destination

Route filters are directional.

```text
From Toronto
To Tehran
```

must not match:

```text
Tehran → Toronto
```

Use canonical locations, not display flags or raw route strings.

## 5. Date

### Carrier

Filter against:

- departure_date;
- optionally arrival_date.

### Sender

Native sender listings can support a date window.

Crawled sender records may only contain one extracted departure/shipment date.

Do not fabricate flexibility around a single crawler date.

## 6. Time

Telclaw can extract:

- departure_time
- arrival_time

Time should initially live in More Filters/detail rather than the primary row.

Possible later filters:

- Morning
- Afternoon
- Evening
- Exact time window

Only introduce these after time normalization is reliable.

## 7. Weight

### Carrier

Desired query semantics:

```text
available capacity >= required weight
```

### Sender

Weight represents shipment cargo weight.

### Crawled records

Telclaw provides:

- weight
- weight_unit

Only apply role-specific capacity logic when role is reliable.

Normalize units for matching without deleting source values.

## 8. Quantity

Telclaw can provide `quantity`.

Quantity should be a secondary filter only after its semantics are sufficiently normalized.

Until then:

- preserve/display it;
- do not make it a primary hard filter.

## 9. Volume

Telclaw provides:

- volume
- volume_unit

Potential More Filter:

```text
Maximum cargo volume
```

for Carrier discovery.

Do not compare incompatible volume units without normalization.

## 10. Item / Cargo Type

Telclaw provides free-form:

```text
cargo_type
```

Advertio uses normalized `item_types` when confidently mapped.

Filter against canonical item types, not arbitrary `cargo_type_raw`.

Initial values:

- Documents
- Electronics
- Clothes
- Personal Items
- Other

## 11. Price

Telclaw provides:

- price
- currency

but does not reliably encode per-kg vs total price.

Therefore numeric Cargo price filters should operate only on records with a known compatible `price_type`.

Do not interpret a crawler price with `price_type = unknown` as per-kg or total.

## 12. Airline

Telclaw extracts `airline` when explicitly stated.

Recommended placement:

```text
More Filters → Airline
```

Only expose as a structured selector after airline normalization exists.

Before then, airline can be text/search/display data.

## 13. Flight number

Telclaw extracts `flight_number`.

Use cases:

- detail display;
- exact search;
- moderation/trip verification.

It should not normally be a primary browse filter.

## 14. More Filters

Potential:

- Airline
- Departure time
- Arrival date/time
- Quantity
- Volume
- Verified trip only
- Verified user only
- Published within
- Price type
- Supply source — admin/internal only

Only enable filters whose data is normalized enough for predictable query behavior.

## 15. Features

Telclaw `features` is open-ended explicit transfer information.

Do not expose arbitrary `features_raw` as structured filter values.

It may participate in free-text Search where safe.

## 16. Cross-filter semantics

Across independent filters:

```text
AND
```

Within a canonical multi-select Item Type:

```text
OR
```

unless UX explicitly requires all selected types.

## 17. Search

Free-text Cargo search can consider:

- origin city;
- destination city;
- airline;
- flight number;
- description;
- raw cargo type;
- normalized item type;
- features;
- role label.

Structured route filters remain authoritative for precise route matching.

## 18. Saved Search

Examples:

```text
Carrier · Toronto → Tehran · 18–22 Oct · ≥5 kg
Carrier · Toronto → Tehran · Air Canada
Sender · Vancouver → Tehran · documents
```

Persist canonical filter values.

## 19. Zero results

Offer:

- change date;
- increase flexibility;
- reduce required capacity;
- remove item restriction;
- remove airline restriction;
- reset filters.

Do not silently:

- reverse route;
- switch role;
- change cargo type;
- change date.

## 20. Acceptance criteria

- [ ] Filter model includes relevant Telclaw transfer fields where normalized.
- [ ] Unknown crawler role never appears under the wrong role filter.
- [ ] Route direction is deterministic.
- [ ] Date/time semantics do not invent missing flexibility.
- [ ] Weight/volume unit normalization is required before numerical comparison.
- [ ] Raw cargo type is not treated as a canonical filter enum without mapping.
- [ ] Unknown crawler price type is excluded from incompatible numeric filtering.
- [ ] Airline/flight info can be searched/displayed even if not yet canonical filters.
