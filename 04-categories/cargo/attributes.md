# Cargo — Attributes & Data Contract

> Status: **Development specification**
>
> This contract combines:
> 1. original Advertio Cargo/Passenger Cargo requirements;
> 2. actual Telclaw `transferlist` fields on commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92);
> 3. Advertio-specific normalized fields required for matching and UX.

## 1. Core principle

Cargo has one public category schema with conditional behavior based on:

```text
role = carrier | sender
```

Do not create separate Carrier/Sender categories.

## 2. Exact Telclaw AI extraction fields

The current Telclaw AI allow-list contains:

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

Reference:

- [ai/category_schemas.py](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/ai/category_schemas.py)
- [ai/prompts/transferlist.txt](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/ai/prompts/transferlist.txt)

Unknown/ambiguous source values are explicitly required by the Telclaw prompt to remain `null`.

## 3. Additional Telclaw storage/publisher fields

Telclaw storage/presentation also knows:

```text
transport_type
transfer_role
```

Important: on the reviewed commit these are **not both present in the current AI extraction allow-list/output schema**.

Therefore mark their crawler extraction status separately:

| Telclaw field | Storage/Publisher | Current AI output | Advertio use |
| --- | ---: | ---: | --- |
| `transfer_role` | Yes | Not reliably present | map passenger→carrier, shipper→sender when present |
| `transport_type` | Yes | Not in current AI output | optional transport-mode provenance |

Do not make Cargo ingest fail solely because these crawler-side compatibility fields are absent.

## 4. Canonical Advertio common fields

| Advertio field | Type | Required native | Filterable | Telclaw source |
| --- | --- | ---: | ---: | --- |
| `title` | string | Yes | Search | title |
| `description` | text | Yes | Search | description |
| `role` | enum | Yes | Yes | transfer_role when reliably present |
| `origin_country` | ISO-2/canonical | Yes | Yes | origin_country |
| `origin_province` | canonical region | Conditional | Yes | origin_province |
| `origin_city` | canonical city | Yes | Yes | origin_city |
| `destination_country` | ISO-2/canonical | Yes | Yes | destination_country |
| `destination_province` | canonical region | Conditional | Yes | destination_province |
| `destination_city` | canonical city | Yes | Yes | destination_city |
| `airline` | string/canonical later | No | Soft | airline |
| `flight_number` | string | No | Search/exact later | flight_number |
| `departure_date` | date | Conditional | Yes | departure_date |
| `departure_time` | time | No | Soft | departure_time |
| `arrival_date` | date | No | Soft | arrival_date |
| `arrival_time` | time | No | Soft | arrival_time |
| `cargo_type_raw` | string | No | No | cargo_type |
| `weight_value` | decimal | Conditional | Yes | weight |
| `weight_unit` | enum/string | Conditional | Yes | weight_unit |
| `quantity` | decimal/integer | No | Soft | quantity |
| `volume_value` | decimal | No | Soft | volume |
| `volume_unit` | enum/string | No | Soft | volume_unit |
| `price_amount` | decimal | No | Yes | price |
| `currency` | ISO-4217 | Conditional | Yes | currency |
| `contact_external` | string | Crawled only | No | contact |
| `features_raw` | array/text | No | Search only initially | features |

## 5. Role mapping

Telclaw role vocabulary:

```text
passenger
shipper
```

Advertio:

```text
passenger → carrier
shipper   → sender
```

Advertio public data should persist only:

```text
carrier
sender
```

Optionally preserve:

```text
source_transfer_role
```

internally for traceability.

### Unknown role

If Telclaw does not provide a reliable role:

```text
role = null
```

and the record should follow a review/hold policy.

Do not infer role merely because an airline/flight number exists.

## 6. Route

Direction is significant.

```text
Toronto → Tehran
```

does not match:

```text
Tehran → Toronto
```

Telclaw prompt explicitly requires preserving source direction and never reversing it.

## 7. Location normalization

Telclaw outputs:

- city in standard English/Roman form;
- country as ISO 3166-1 alpha-2 uppercase;
- province when explicit/confident.

Telclaw also maintains `transfer_locations` with:

- origin_city_canonical
- origin_city_key
- origin_country_iso2
- destination_city_canonical
- destination_city_key
- destination_country_iso2

Advertio should map these into its canonical location catalog where possible.

## 8. Date and time model

### Telclaw behavior

Telclaw can extract:

- departure_date
- departure_time
- arrival_date
- arrival_time

Dates are normalized to Gregorian `YYYY-MM-DD`.

Its prompt can recognize Gregorian and Jalali dates and only fills dates supported by the source.

### Advertio native Carrier

Carrier should use:

- departure_date required;
- departure_time optional;
- arrival_date optional;
- arrival_time optional.

### Advertio native Sender

For native UX, a sender may need flexibility:

- `send_date_from`
- `send_date_until`

Crawler mapping can retain the source `departure_date` as the source shipment/travel date when that is all Telclaw extracted.

Do not invent a date range from one extracted date.

## 9. Airline and flight number

Telclaw extracts these only when stated:

- airline
- flight_number

Advertio usage:

- Carrier detail;
- moderation;
- optional trust/ticket verification workflow;
- optional exact search/filter later.

They should be optional.

Presence does **not** imply Ticket Verified.

## 10. Cargo type / item model

Telclaw:

```text
cargo_type
```

is source-derived/free-form.

Advertio native V1 uses controlled item types such as:

```text
documents
electronics
clothes
personal_items
other
```

Recommended ingestion model:

```text
cargo_type_raw = Telclaw original extracted value
item_types = normalized canonical Advertio values when mapping is confident
```

If normalization is ambiguous:

```text
item_types = []
cargo_type_raw = preserved
```

Do not force an unknown cargo type into an incorrect enum.

## 11. Weight model

Telclaw preserves both:

- weight
- weight_unit

Advertio should preserve source values and derive a matching value only when conversion is safe.

Recommended:

```text
weight_value
weight_unit
weight_kg_derived
```

### Role semantics

Carrier:

```text
weight = available carrying capacity
```

only when source context clearly indicates capacity.

Sender:

```text
weight = cargo shipment weight
```

only when role/context supports it.

Because current Telclaw role extraction has a known gap, do not automatically reinterpret every crawler weight as available capacity.

## 12. Quantity

Telclaw extracts:

```text
quantity
```

when explicitly stated.

Possible meaning:

- number of packages;
- number of items;
- another stated count.

Until Cargo establishes a stronger structured package model:

```text
quantity = source-declared cargo count
```

and detail UI should avoid inventing the noun/unit if source does not identify it.

## 13. Volume

Telclaw extracts:

- volume
- volume_unit

Advertio should preserve:

```text
volume_value
volume_unit
```

Potential derived canonical volume can be added later.

Volume is useful for bulky cargo even when weight is low.

## 14. Price

Telclaw extracts:

- price only when explicitly stated;
- currency as ISO 4217;
- no conversion.

Advertio needs additional semantics:

```text
price_type:
- per_kg
- total
- negotiable
- unknown
```

Telclaw currently does not provide a dedicated `price_type`.

Therefore crawler price should remain:

```text
price_amount = extracted price
currency = extracted currency
price_type = unknown
```

unless source text/normalization explicitly establishes per-kg vs total.

Do not assume every Transfer price is per kg.

## 15. Contact

Telclaw extracts explicit contact information only.

Advertio mapping:

```text
contact_external
```

For crawled records, source Telegram username/message link may be preferred by the existing crawler contact-routing contract.

Do not mix external crawler contact into native account ownership.

## 16. Features

Telclaw `features` means explicit transfer information not represented in another field.

Advertio should initially store:

```text
features_raw
```

It can be displayed/searchable if safe.

Do not make arbitrary feature strings canonical filter enums automatically.

## 17. Transport type

Telclaw storage/publisher supports `transport_type` and formats examples such as air/ground.

However current classification/prompt scope is strongly air-cargo/passenger-baggage oriented, and `transport_type` is not in the reviewed AI output schema.

Advertio Cargo V1 remains traveler-assisted Cargo.

If `transport_type` is supplied by a trusted upstream path:

```text
source_transport_type
```

may be preserved.

Do not expand Cargo V1 to commercial ground logistics merely because this storage field exists.

## 18. Native Carrier fields

Recommended required native fields:

- role = carrier
- route
- departure_date
- available weight/capacity
- allowed item types
- description
- price state
- contact method

Optional:

- airline
- flight_number
- departure_time
- arrival_date/time
- quantity constraints
- volume constraints

## 19. Native Sender fields

Recommended required native fields:

- role = sender
- route
- date/date window
- cargo weight
- item type
- description
- price/budget state
- contact method

Optional:

- quantity
- volume
- special features/handling notes

## 20. Crawler provenance

Keep separately:

- source_name
- external_id
- source_url
- channel/message identity
- sender identity where available
- raw source text
- imported_at
- source_transfer_role
- source_transport_type

## 21. Validation

### Common

- canonical role when public;
- origin/destination direction preserved;
- canonical location where possible;
- valid Gregorian dates after normalization;
- no invented values.

### Weight

- numeric weight > 0;
- recognized unit before deriving kg;
- derived conversion must not overwrite original source value.

### Volume

- numeric volume > 0;
- preserve original unit.

### Flight

- flight number optional;
- airline optional;
- neither implies verification.

### Price

- amount > 0 when present;
- currency canonical when present;
- price type remains unknown unless established.

## 22. Acceptance criteria

- [ ] Every actual Telclaw AI transfer field has an explicit Advertio mapping or preservation rule.
- [ ] `transfer_role` and `transport_type` are documented as current Telclaw schema gaps, not falsely claimed as reliable AI output.
- [ ] Passenger maps to Carrier and Shipper maps to Sender.
- [ ] Airline/flight/date/time survive ingestion.
- [ ] Weight/unit survive without forced kg overwrite.
- [ ] Quantity and volume are preserved.
- [ ] Cargo type raw text is preserved before canonical item mapping.
- [ ] Price is not assumed per-kg.
- [ ] Unknown role or ambiguous normalized values are not guessed.
