# Cargo — Telclaw Crawler Mapping

> Upstream: [Telclaw](https://github.com/abolfazl260/Telclaw) commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92)
>
> Telclaw category: `transferlist`
>
> Advertio category: `Cargo`

## 1. Why this mapping exists

Telclaw's Transfer schema is richer than Advertio's original Passenger Cargo notes.

This file defines which upstream fields:

- map directly;
- require normalization;
- remain raw/provenance;
- cannot yet be trusted as always populated.

## 2. Classification scope

Telclaw classifier describes `transferlist` as:

- air cargo;
- passenger baggage;
- luggage space;
- parcel/package carried by an airline passenger;
- flight-based shipping.

The transfer extraction prompt recognizes conceptual listing intent:

```text
PASSENGER
SHIPPER
OTHER
```

where OTHER is rejected as a genuine transfer listing unless it satisfies Passenger/Shipper intent.

## 3. Current AI output schema

Exact fields:

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
| `departure_date` | `departure_date` / sender source date | role-dependent |
| `departure_time` | `departure_time` | preserve |
| `arrival_date` | `arrival_date` | preserve |
| `arrival_time` | `arrival_time` | preserve |
| `cargo_type` | `cargo_type_raw` + optional `item_types` | normalize if confident |
| `weight` | `weight_value` | preserve |
| `weight_unit` | `weight_unit` | preserve + normalize |
| `quantity` | `quantity` | preserve |
| `volume` | `volume_value` | preserve |
| `volume_unit` | `volume_unit` | preserve + normalize |
| `price` | `price_amount` | preserve |
| `currency` | `currency` | ISO-4217 |
| `contact` | `contact_external` | crawler/external only |
| `features` | `features_raw` | preserve |

## 4. Role mapping

Desired:

```text
Telclaw passenger → Advertio carrier
Telclaw shipper   → Advertio sender
```

Advertio must not persist `passenger` or `shipper` as public category names.

## 5. Current role extraction gap

On the reviewed Telclaw commit:

- the prompt conceptually distinguishes PASSENGER and SHIPPER;
- `storage/__init__.py` ensures DB support for `transfer_role`;
- Telegram publisher reads `transfer_role`;
- system docs say role is `passenger | shipper`.

But the actual fetched `ai/category_schemas.py` transfer allow-list and transfer prompt JSON output do not include `transfer_role`.

Therefore:

```text
transfer_role support exists
≠
transfer_role reliably AI-extracted
```

Advertio integration policy:

1. use role if upstream record actually supplies a trusted value;
2. map it to carrier/sender;
3. otherwise keep role unknown;
4. hold/review if public Cargo requires role;
5. never infer role simply from weight/airline/contact.

## 6. Transport type gap

Telclaw DB/publisher supports:

```text
transport_type
```

and presentation recognizes examples around air/ground transport.

But this field is not in the current transfer AI output schema.

Advertio can preserve it as:

```text
source_transport_type
```

when present, but it is not a required Cargo V1 field.

## 7. Location normalization

Telclaw has a dedicated `transfer_locations` table with:

- origin_city_canonical
- origin_city_key
- origin_country_iso2
- destination_city_canonical
- destination_city_key
- destination_country_iso2

Advertio should prefer canonical values for filtering/routing.

Source text remains available for audit/reprocessing.

## 8. Date normalization

Telclaw prompt:

- uses explicit source dates only;
- recognizes Gregorian/Jalali;
- normalizes to Gregorian `YYYY-MM-DD`;
- may infer only a missing year when month/day are explicit and a reference date is provided;
- must not use Telegram post date as shipment/travel date.

Advertio should preserve that boundary.

## 9. Currency behavior

The Transfer prompt says:

- use stated currency;
- infer from route only with high confidence;
- never convert.

The shared Telclaw extractor also contains currency-normalization behavior that can null non-CAD transfer pricing in some paths.

Therefore Advertio integration should treat currency/price as **source-dependent** and should not assume every crawler record retains a non-CAD price.

This is another reason to preserve raw source text.

## 10. Null handling

Telclaw normalizes sentinel strings such as:

```text
null
none
n/a
unknown
not provided
-
```

to real null values before persistence.

Advertio must preserve null as unknown; do not convert it into fake placeholders.

## 11. Features behavior

Telclaw extracts `features` only for explicit transfer details that do not belong to another structured field.

Advertio:

- preserve as raw feature list/text;
- optionally display/search;
- do not auto-promote arbitrary feature strings to permanent filter enums.

## 12. Weight normalization

Telclaw:

```text
weight
weight_unit
```

Advertio:

```text
weight_value
weight_unit
weight_kg_derived (optional)
```

Rules:

- preserve original;
- convert only recognized units;
- use derived kg for matching;
- role meaning must be known before interpreting as capacity vs shipment weight.

## 13. Volume normalization

Telclaw:

```text
volume
volume_unit
```

Advertio:

```text
volume_value
volume_unit
canonical_volume_derived (future)
```

Do not compare volume numerically across units before normalization.

## 14. Cargo type normalization

Examples can be broader/free-form than Advertio's controlled item list.

Pipeline:

```text
cargo_type
→ preserve cargo_type_raw
→ normalize to canonical item_types if confident
→ otherwise leave item_types unset/review
```

## 15. Contact mapping

Telclaw explicit `contact` plus Telegram message/user provenance can exist.

Advertio crawler contact-routing rules should decide the displayed action.

Crawler contact does not create an Advertio-owned employer/user identity.

## 16. Fields to expose in Backoffice review

For crawled Cargo review:

- source role / mapped role;
- origin/destination raw + canonical;
- airline;
- flight number;
- departure/arrival date/time;
- cargo_type_raw;
- normalized item_types;
- weight + unit + derived kg;
- quantity;
- volume + unit;
- price + currency + price-type confidence;
- contact;
- features;
- source URL/message;
- raw source text.

## 17. Telclaw change dependency

If Telclaw is updated to make role first-class AI output, change all affected Telclaw layers together:

- AI allow-list/schema;
- transfer prompt;
- DB/migration;
- repository persistence;
- publisher;
- tests.

Advertio Docs should then update this file and remove the current role-gap warning only after verification.

## 18. Acceptance criteria

- [ ] Mapping covers every current Telclaw transfer AI field.
- [ ] Storage-only/current-gap fields are not mislabeled as reliable extraction.
- [ ] Passenger/Shipper are normalized to Carrier/Sender.
- [ ] Source values are preserved before lossy normalization.
- [ ] Null remains unknown.
- [ ] Route/date direction semantics are preserved.
- [ ] Weight and volume units are retained.
- [ ] Price type is not guessed.
- [ ] Backoffice can inspect raw + normalized crawler values.
