# Cargo — Unified Filters & Search Contract

> Cargo has one feed and one filter surface.
>
> There is no Role filter.

## 1. Primary filters

Recommended V1:

1. From
2. To
3. Date
4. Weight
5. Item Type
6. Price
7. More Filters

Do not add:

- Carrier;
- Sender;
- Passenger;
- Shipper

as Product filters.

## 2. Route

Route is directional.

```text
From Toronto
To Tehran
```

must not be returned for:

```text
Tehran → Toronto
```

Use canonical location fields.

## 3. Date

Filter against the listing's known transfer/travel date fields.

Recommended:

- exact date;
- date range.

Crawler listings may have:

- departure_date;
- arrival_date;
- no date when source did not provide one.

Do not invent date flexibility.

## 4. Time

Telclaw can provide:

- departure_time
- arrival_time

Keep time under More Filters initially.

Possible future:

- Morning
- Afternoon
- Evening
- exact window

only after reliable normalization.

## 5. Weight

Filter Cargo by normalized weight when possible.

Examples:

- Up to 2 kg
- Up to 5 kg
- Up to 10 kg
- 10+ kg
- Custom

Important:

Because Advertio has no role split, weight is treated as a generic Cargo filter value.

Do not assume every crawler weight means capacity or shipment mass beyond what the listing content states.

## 6. Item Type

Use normalized Advertio item types:

- Documents
- Electronics
- Clothes
- Personal Items
- Other

Telclaw `cargo_type_raw` can participate in Search but should not directly create uncontrolled filter values.

## 7. Price

Only apply numeric price filtering when the stored price semantics are known and compatible.

Use:

- Price Type
- Amount
- Currency

Crawler `price_type = unknown` should not be forced into per-kg/total numeric comparisons.

## 8. Airline

Telclaw extracts airline when stated.

Recommended:

```text
More Filters → Airline
```

only once airline normalization is good enough.

Before then airline remains searchable/display data.

## 9. Flight number

Use primarily for:

- exact search;
- detail;
- moderation;
- verification workflow.

Not a primary browse filter.

## 10. Quantity / volume

Optional secondary filters only after normalization is stable.

Preserve them even if not yet filterable.

## 11. More Filters

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

No role/source-role filter should be exposed as part of Cargo Product UX.

## 12. Search

Free-text Cargo search can search:

- origin city;
- destination city;
- airline;
- flight number;
- title;
- description;
- raw cargo type;
- normalized item type;
- features.

Telclaw source role may remain provenance but should not affect public search segmentation.

## 13. Saved Search

Examples:

```text
Toronto → Tehran · 18–22 Oct · ≥5 kg
Toronto → Tehran · Air Canada
Vancouver → Tehran · Documents
```

No role value is stored.

## 14. Zero results

Offer:

- change date;
- increase date range;
- relax weight;
- remove item restriction;
- remove airline restriction;
- reset filters.

Never silently reverse route.

## 15. Acceptance criteria

- [ ] No Role filter exists.
- [ ] Route direction is deterministic.
- [ ] Date/time filtering preserves source truth.
- [ ] Weight/volume comparisons require normalized units.
- [ ] Raw cargo type is not treated as canonical enum without mapping.
- [ ] Unknown crawler price semantics are not miscompared.
- [ ] Airline/flight information can be searched/displayed.
