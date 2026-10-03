# Cargo — Category Rules

> Cargo is one category with two listing roles: Carrier and Sender.
>
> Telclaw `transferlist` is an upstream crawler source for this category.

## 1. Category identity

Canonical product category:

```text
Cargo
```

Do not introduce these as Cargo subcategories:

- Passenger Cargo
- Ride Sharing
- Logistics / Shipping
- Carrier
- Sender

Carrier and Sender are roles.

## 2. Role rule

Advertio role:

```text
carrier
sender
```

Telclaw mapping:

```text
passenger → carrier
shipper → sender
```

Unknown crawler role stays unknown/review-required.

## 3. Telclaw extraction boundary

Telclaw current AI extraction supports:

- route city/province/country;
- airline;
- flight number;
- departure/arrival date;
- departure/arrival time;
- cargo type;
- weight + unit;
- quantity;
- volume + unit;
- price + currency;
- contact;
- features;
- title/description.

Do not discard these fields during Cargo ingestion merely because the original Advertio Cargo notes had a smaller schema.

## 4. Telclaw schema-gap rule

Current Telclaw storage/publisher contains:

- `transfer_role`
- `transport_type`

but the reviewed current AI allow-list/output does not reliably include them.

Advertio must:

- accept them when a trustworthy upstream path supplies them;
- never assume they are populated;
- never invent them to make an import valid;
- retain review visibility for records missing required role.

## 5. Scope rule

Cargo V1 is traveler-assisted cargo transport.

Included:

- traveler with spare baggage/carrying capacity;
- sender seeking a traveler.

Excluded:

- passenger transportation;
- ride-sharing/carpooling;
- taxi;
- commercial freight brokerage;
- trucking;
- courier fleet management;
- warehousing;
- freight forwarding.

A Telclaw `transport_type` value must not automatically expand this product scope.

## 6. Route rule

Every public Cargo listing needs a usable directional route.

Crawler route data may be incomplete; incomplete records may require review rather than fabricated locations.

## 7. Airline / flight rule

Airline and flight number:

- are optional;
- may support moderation/verification;
- do not imply Ticket Verified;
- must reflect source/native user input accurately.

## 8. Date/time rule

Crawler dates/times must be preserved as extracted.

Do not substitute Telegram message date for trip/shipment date.

Telclaw explicitly forbids that behavior.

## 9. Weight/unit rule

Never drop the source unit.

Store source value + unit and derive a canonical matching value separately when safe.

Do not interpret raw crawler weight as Carrier capacity until role/context supports that meaning.

## 10. Quantity/volume rule

Quantity and volume extracted by Telclaw are legitimate Cargo data.

Preserve them.

Do not force them into hard matching until their role semantics and units are normalized.

## 11. Cargo type rule

Preserve raw `cargo_type`.

Normalize into Advertio canonical item types only when confident.

Unknown/ambiguous types remain raw/reviewable.

## 12. Price rule

Telclaw extracts price/currency but not a dedicated reliable price-type field.

Therefore:

- preserve amount/currency;
- do not assume per-kg;
- do not assume total;
- classify price semantics only when established.

## 13. Contact rule

Crawler contact stays external/source contact.

It does not create native Advertio ownership or verification.

## 14. Item declaration and safety

Sender must declare item type.

Do not encourage:

- unknown sealed packages;
- undeclared goods;
- illegal/restricted goods.

A dedicated compliance policy is required before public Cargo launch.

## 15. Verification

Source mentions Cargo ticket verification.

Verification is system/admin controlled.

Airline + flight number alone are not verification.

## 16. Moderation

Review should expose:

- role/source role;
- route;
- airline;
- flight number;
- departure/arrival date/time;
- cargo type;
- weight/unit;
- quantity;
- volume/unit;
- price/currency;
- contact;
- features;
- crawler provenance.

## 17. One-active-listing conflict

Multiple legitimate Cargo listings may be required for:

- multiple trips;
- multiple sender routes.

Recommended:

```text
allow multiple active Cargo listings
+ duplicate/rate-limit controls
```

## 18. Crawled Cargo

Crawled Cargo must:

- remain crawled;
- preserve source identity;
- preserve raw extracted fields;
- use source/external contact;
- remain non-monetized under crawler rules;
- never impersonate a native verified user.

## 19. Current UI rename

Current Telegram Bot docs still record **Passenger Cargo** as current UI copy.

Target product taxonomy is **Cargo**.

Current-state docs should change only when runtime UI actually changes.

## 20. Acceptance criteria

- [ ] Cargo remains a single category.
- [ ] Telclaw's full current transfer field set can survive ingestion.
- [ ] Role mapping is explicit.
- [ ] Telclaw role/transport schema gap is documented and safely handled.
- [ ] Airline/flight/date/time are preserved.
- [ ] Weight/unit, quantity and volume/unit are preserved.
- [ ] Raw cargo type/features are not silently discarded.
- [ ] Raw price is not misinterpreted.
- [ ] Crawled data never grants native verification.
