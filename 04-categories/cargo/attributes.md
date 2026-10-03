# Cargo — Unified Attributes & Data Contract

> Status: **Development specification**
>
> Advertio Cargo uses one schema for every Cargo listing.
>
> There is no public `role`, `carrier`, or `sender` field.

## 1. Core principle

The same schema handles every Cargo listing.

Meaning is expressed through:

- structured route/cargo/flight fields;
- title;
- description;
- contact;
- source text/provenance.

Do not add Product branching based on passenger/shipper role.

## 2. Telclaw extraction fields

Current Telclaw `transferlist` supports:

```text
title
description
origin_city
origin_province
origin_country
destination_city
destination_province
destination_country
airline
flight_number
departure_date
departure_time
arrival_date
arrival_time
cargo_type
weight
weight_unit
quantity
volume
volume_unit
price
currency
contact
features
```

Advertio should preserve all of these when present.

## 3. Canonical Advertio Cargo fields

| Field | Type | Required native | Filterable | Telclaw source |
| --- | --- | ---: | ---: | --- |
| `title` | string | Yes | Search | title |
| `description` | text | Yes | Search | description |
| `origin_country` | canonical ISO-2 country | Yes | Yes | origin_country |
| `origin_province` | canonical region | Conditional | Yes | origin_province |
| `origin_city` | canonical city | Yes | Yes | origin_city |
| `destination_country` | canonical ISO-2 country | Yes | Yes | destination_country |
| `destination_province` | canonical region | Conditional | Yes | destination_province |
| `destination_city` | canonical city | Yes | Yes | destination_city |
| `airline` | string/canonical later | No | Soft | airline |
| `flight_number` | string | No | Search/exact later | flight_number |
| `departure_date` | date | Yes for native V1 | Yes | departure_date |
| `departure_time` | time | No | Soft | departure_time |
| `arrival_date` | date | No | Soft | arrival_date |
| `arrival_time` | time | No | Soft | arrival_time |
| `cargo_type_raw` | string | No | Search | cargo_type |
| `item_types` | canonical array | No | Yes | normalized from cargo_type when confident |
| `weight_value` | decimal | No | Yes | weight |
| `weight_unit` | unit | Conditional | Yes | weight_unit |
| `weight_kg_derived` | decimal | No | Yes | derived only |
| `quantity` | decimal/integer | No | Soft | quantity |
| `volume_value` | decimal | No | Soft | volume |
| `volume_unit` | unit | Conditional | Soft | volume_unit |
| `price_amount` | decimal | No | Yes | price |
| `currency` | ISO-4217 | Conditional | Yes | currency |
| `price_type` | enum | No | Yes | native/normalized; not reliably in Telclaw |
| `contact_external` | string | Crawled only | No | contact |
| `features_raw` | array/text | No | Search | features |

## 4. No role field

Advertio must not persist:

```text
role = carrier
role = sender
```

Telclaw may expose:

```text
transfer_role = passenger
transfer_role = shipper
```

If present, optionally preserve it only as:

```text
source_transfer_role
```

inside crawler provenance.

It is not part of the canonical public Cargo schema.

## 5. Route

Route is directional.

```text
Toronto → Tehran
```

is not the same as:

```text
Tehran → Toronto
```

Preserve origin and destination independently.

## 6. Location normalization

Telclaw provides city/province/country and also maintains transfer-specific canonical location data.

Advertio should map into canonical location values where possible.

Country flags remain presentation only.

## 7. Date/time

Use:

- departure_date
- departure_time
- arrival_date
- arrival_time

Native V1 should require a useful Cargo date, normally departure/shipment date.

Crawler rule:

- preserve explicit source dates;
- do not use Telegram post timestamp as transfer date;
- do not invent missing date ranges.

## 8. Airline and flight number

Optional fields:

- airline
- flight_number

Useful for:

- detail display;
- search;
- moderation;
- trip/ticket verification workflow.

Presence does not mean verified.

## 9. Cargo type

Telclaw `cargo_type` is free-form.

Advertio stores:

```text
cargo_type_raw
```

and can derive:

```text
item_types
```

when mapping is confident.

Initial canonical examples:

- documents
- electronics
- clothes
- personal_items
- other

Do not force ambiguous raw cargo into an incorrect enum.

## 10. Weight

Unified Cargo uses generic:

```text
weight_value
weight_unit
```

Do not reinterpret weight differently based on a Carrier/Sender role because Advertio has no role model.

The title/description/source context explains whether the number represents available capacity, parcel weight, or another cargo-related weight.

For numeric comparison:

- preserve original value/unit;
- derive kg separately when conversion is known;
- never overwrite source value.

## 11. Quantity

Preserve Telclaw `quantity`.

Until a stronger package model exists, treat it as source-declared cargo/item quantity.

Do not invent a package unit/noun.

## 12. Volume

Preserve:

- volume_value
- volume_unit

Derived canonical volume can be added later.

Do not compare different units without normalization.

## 13. Price

Telclaw gives:

- price
- currency

but not a reliable price semantic.

Advertio supports:

```text
price_type:
- per_kg
- total
- negotiable
- unknown
```

Crawler default:

```text
price_type = unknown
```

unless source/normalization explicitly establishes the meaning.

Never assume all crawler prices are per kg.

## 14. Contact

Crawler `contact` maps to external/source contact.

Native Cargo should use Advertio's canonical contact method.

Crawler contact does not create native Advertio ownership.

## 15. Features

Preserve `features` as:

```text
features_raw
```

It may be searchable/displayed.

Do not turn arbitrary raw features into permanent filter enums automatically.

## 16. System fields

System-owned:

- listing_id
- owner_user_id
- status
- supply_source
- created_at
- published_at
- expires_at
- moderation_state
- boost_status

No role-dependent system fields are required.

## 17. Crawler provenance

Internal/provenance:

- source_name
- external_id
- source_url
- source message/channel
- source sender identity
- raw source text
- imported_at
- source_transfer_role
- source_transport_type

`source_transfer_role` is diagnostic only.

## 18. Validation

- valid directional route;
- canonical locations where available;
- useful date;
- positive numeric weight/quantity/volume/price when supplied;
- currency required for numeric price where appropriate;
- weight unit required when weight is present unless canonical default is explicitly defined;
- no invented crawler data;
- verification fields are system-controlled.

## 19. Acceptance criteria

- [ ] Cargo schema has no Product role field.
- [ ] Every current Telclaw transfer extraction field has a preservation/mapping rule.
- [ ] Passenger/Shipper values, if preserved, stay provenance-only.
- [ ] Airline/flight/date/time survive ingestion.
- [ ] Weight/unit, quantity and volume/unit survive ingestion.
- [ ] Price type is never guessed.
- [ ] Raw cargo type/features survive before normalization.
