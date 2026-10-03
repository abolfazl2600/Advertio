# Cargo — Telclaw Crawler Mapping

> Upstream: [Telclaw](https://github.com/abolfazl260/Telclaw) commit `63fbc01555f01345bb92124c9112db63f1395e92`
>
> Telclaw category: `transferlist`
>
> Advertio category: `Cargo`

## 1. Core integration decision

Advertio does **not** map Telclaw role values into different Product roles.

Old/rejected mapping:

```text
passenger → carrier
shipper   → sender
```

Canonical mapping:

```text
Telclaw transferlist → Advertio Cargo
```

If Telclaw supplies `passenger` or `shipper`, both still become the same Cargo listing type.

## 2. Source role handling

Optional internal provenance:

```text
source_transfer_role
```

may preserve:

```text
passenger
shipper
```

for crawler QA/debugging.

It must not:

- create a public role;
- create a filter;
- change category;
- be required for ingest.

## 3. Current AI output mapping

| Telclaw | Advertio mapping | Mapping type |
| --- | --- | --- |
| `title` | `title` | direct |
| `description` | `description` | direct |
| `origin_city` | `origin_city` | canonicalize |
| `origin_province` | `origin_province` | canonicalize |
| `origin_country` | `origin_country` | ISO-2/canonical |
| `destination_city` | `destination_city` | canonicalize |
| `destination_province` | `destination_province` | canonicalize |
| `destination_country` | `destination_country` | ISO-2/canonical |
| `airline` | `airline` | preserve/normalize later |
| `flight_number` | `flight_number` | preserve |
| `departure_date` | `departure_date` | preserve |
| `departure_time` | `departure_time` | preserve |
| `arrival_date` | `arrival_date` | preserve |
| `arrival_time` | `arrival_time` | preserve |
| `cargo_type` | `cargo_type_raw` + optional `item_types` | normalize if confident |
| `weight` | `weight_value` | preserve |
| `weight_unit` | `weight_unit` | preserve + derive canonical |
| `quantity` | `quantity` | preserve |
| `volume` | `volume_value` | preserve |
| `volume_unit` | `volume_unit` | preserve + derive canonical |
| `price` | `price_amount` | preserve |
| `currency` | `currency` | canonical ISO-4217 |
| `contact` | `contact_external` | crawler/external |
| `features` | `features_raw` | preserve |

## 4. transfer_role schema gap

Telclaw currently has inconsistent support for `transfer_role` across prompt/schema/storage/publisher.

Because Advertio does not require a Cargo role anymore, this inconsistency is **not an Advertio ingest blocker**.

Policy:

```text
transfer_role missing → OK
transfer_role passenger → Cargo
transfer_role shipper → Cargo
```

Optionally retain the raw value only for diagnostics.

## 5. transport_type

Telclaw storage/publisher may expose `transport_type`.

Advertio can preserve:

```text
source_transport_type
```

when present.

It is not required.

## 6. Location

Prefer canonical Telclaw/Advertio location values.

Telclaw `transfer_locations` contains canonical origin/destination city keys and ISO-2 countries.

## 7. Dates

Preserve explicit source dates.

Telclaw supports Gregorian/Jalali normalization to Gregorian `YYYY-MM-DD`.

Never use Telegram message date as transfer date.

## 8. Weight

Preserve:

```text
weight
weight_unit
```

as:

```text
weight_value
weight_unit
```

Optional derived:

```text
weight_kg_derived
```

Do not assign role-specific capacity/shipment semantics in Advertio.

## 9. Quantity and volume

Preserve:

- quantity;
- volume;
- volume_unit.

Do not discard them because they were absent from the original Advertio notes.

## 10. Cargo type

Preserve:

```text
cargo_type_raw
```

then normalize to canonical `item_types` if confident.

Unknown remains unknown.

## 11. Price

Preserve:

- price;
- currency.

Crawler price type remains:

```text
unknown
```

unless explicitly established.

## 12. Contact

Telclaw explicit contact + Telegram provenance can be available.

Advertio crawler routing decides the public contact action.

No native ownership is created.

## 13. Features

Preserve `features` as raw explicit transfer information.

Do not auto-create filter enums from arbitrary source text.

## 14. Null handling

Telclaw normalizes null-like strings to real null.

Advertio should keep null as unknown.

Do not insert fake placeholder values.

## 15. Backoffice review

Expose:

- raw + canonical route;
- airline;
- flight number;
- departure/arrival date/time;
- cargo_type_raw;
- item_types;
- weight + unit + derived kg;
- quantity;
- volume + unit;
- price + currency;
- contact;
- features;
- source URL/message;
- raw source text;
- source_transfer_role only as diagnostic metadata if available.

## 16. Acceptance criteria

- [ ] Every Telclaw transfer listing maps to one Advertio Cargo category.
- [ ] Passenger/Shipper are not converted to Carrier/Sender Product roles.
- [ ] Missing `transfer_role` never blocks ingestion.
- [ ] All current Telclaw AI transfer fields have a mapping/preservation rule.
- [ ] Raw source fields survive before normalization.
- [ ] Null remains unknown.
- [ ] Weight/volume units are retained.
- [ ] Price semantics are not guessed.
