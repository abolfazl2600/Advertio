# Cargo — Attributes & Data Contract

> Status: **Development specification**
>
> Source-defined fields are preserved from the original Passenger Cargo design. Additional fields are proposed where necessary to make the single-category Carrier/Sender model implementable.

## 1. Core principle

Cargo has one schema with conditional fields based on:

```text
role = carrier | sender
```

Do not create separate database/category schemas for Carrier and Sender.

## 2. Common fields

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `role` | enum | Yes | Yes | carrier / sender |
| `origin_country` | canonical country | Yes | Yes | route origin |
| `origin_province` | canonical region | Conditional | Yes | where applicable |
| `origin_city` | canonical city | Yes | Yes | route origin |
| `destination_country` | canonical country | Yes | Yes | route destination |
| `destination_province` | canonical region | Conditional | Yes | where applicable |
| `destination_city` | canonical city | Yes | Yes | route destination |
| `description` | text | Yes | Search | additional details |
| `currency` | ISO currency | Conditional | Yes | source defines CAD/USD/EUR |
| `contact_method` | enum | Yes | No | canonical Advertio contact method |

## 3. Role

Canonical values:

```text
carrier
sender
```

UI labels can be localized.

Suggested labels:

### English

- I can carry cargo
- I need to send cargo

### Persian

- امکان حمل بار دارم
- می‌خواهم بار ارسال کنم

Persist the canonical role, not the localized text.

## 4. Route

Route direction is significant.

```text
Toronto → Tehran
```

is not equivalent to:

```text
Tehran → Toronto
```

Origin/destination must therefore be stored independently.

## 5. Date model

The original source defines one `date`.

For implementation, one shared flexible date model is recommended.

### Carrier

```text
departure_date
```

Required.

Optional later:

```text
arrival_date
```

### Sender

Recommended:

```text
send_date_from
send_date_until
```

or a single preferred date plus flexibility.

This allows a sender to say:

```text
Any carrier between 18–22 Oct
```

without pretending the sender has a flight.

## 6. Carrier-specific fields

| Field | Type | Required | Notes |
| --- | --- | ---: | --- |
| `departure_date` | date | Yes | travel date |
| `available_weight_kg` | decimal | Yes | remaining cargo capacity |
| `allowed_items` | array enum | Yes | accepted item types |
| `price_type` | enum | Yes | per_kg / total / negotiable |
| `price_amount` | decimal | Conditional | when price is numeric |
| `currency` | ISO currency | Conditional | numeric price |
| `trip_verified` | system/trust state | No | never user-authored |

The source's `max_weight_kg` is represented here as the clearer role-specific `available_weight_kg`.

## 7. Sender-specific fields

| Field | Type | Required | Notes |
| --- | --- | ---: | --- |
| `send_date_from` | date | Yes | earliest acceptable date |
| `send_date_until` | date | Yes | latest acceptable date |
| `cargo_weight_kg` | decimal | Yes | expected cargo weight |
| `item_types` | array enum | Yes | declared item type(s) |
| `price_type` | enum | Yes | total / per_kg / negotiable |
| `price_amount` | decimal | Conditional | sender budget/offer |
| `currency` | ISO currency | Conditional | numeric price |

## 8. Item type

Source-defined initial values:

```text
documents
electronics
clothes
personal_items
```

Recommended addition:

```text
other
```

If `other` is selected, require a short description.

Do not allow arbitrary AI output to create new permanent item enums.

## 9. Price model

Source defines `price` and `currency`, but not price semantics.

Unified V1 proposal:

```text
price_type:
- per_kg
- total
- negotiable
```

### Carrier

Price means the amount requested for carrying the cargo.

### Sender

Price means the amount offered/budgeted for transport.

Display must make that distinction clear.

Examples:

```text
Carrier: $20/kg
Sender: Budget $80 total
Negotiable
```

## 10. Weight validation

Rules:

- weight > 0;
- carrier available capacity > 0;
- sender cargo weight > 0;
- matching requires:
  `carrier.available_weight_kg >= sender.cargo_weight_kg`.

Use decimals; baggage/cargo may not be integer kilograms.

## 11. Optional cargo-detail fields

Recommended later, not required for V1:

- `package_count`;
- `dimensions_cm`;
- `fragile`;
- `declared_value`;
- `special_handling_notes`.

Do not overcomplicate V1 unless operational evidence requires them.

## 12. Trust/system fields

System-controlled:

- listing_id
- owner_user_id
- status
- supply_source
- created_at
- published_at
- expires_at
- moderation_state
- boost_status

Carrier/trip trust:

- trip_verified
- verification_type
- verification_timestamp

User input must never set verification state directly.

## 13. Crawler provenance

For crawled Cargo:

- source_name
- external_id
- source_url
- Telegram source identity
- raw source text
- imported_at

Crawler data must map into the same public Cargo role/schema.

Unknown values remain unknown; do not guess.

## 14. Derived fields

Potential derived fields:

- route key;
- normalized origin/destination;
- date overlap index;
- remaining capacity after confirmed deals — future;
- match eligibility;
- duplicate fingerprint.

Derived values should be recomputable.

## 15. Validation

Common:

- role is canonical;
- origin != destination at meaningful route level;
- canonical locations;
- valid dates;
- description meaningful;
- contact method valid.

Carrier:

- departure date not in past at creation;
- available weight > 0;
- at least one allowed item type.

Sender:

- date_from <= date_until;
- date_until not in past;
- cargo weight > 0;
- at least one item type.

Price:

- numeric amount > 0;
- currency required when amount is numeric.

## 16. Acceptance criteria

- [ ] One Cargo schema supports both roles.
- [ ] Role-specific requiredness is enforced.
- [ ] Route direction is preserved.
- [ ] Carrier capacity and sender cargo weight are separate fields.
- [ ] Item types use controlled values.
- [ ] Price semantics are explicit.
- [ ] Verification is system-controlled.
- [ ] Crawled records do not invent missing route/weight/item data.
