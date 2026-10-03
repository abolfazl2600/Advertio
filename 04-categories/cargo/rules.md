# Cargo — Category Rules

> Cargo is one category with one unified listing model.
>
> Telclaw `transferlist` is an upstream crawler source.

## 1. Category identity

Canonical category:

```text
Cargo
```

Do not create:

- Passenger Cargo
- Carrier
- Sender
- Ride Sharing
- Logistics / Shipping

as Cargo categories/subcategories.

## 2. No-role rule

Advertio Cargo has no public Product role.

Do not create:

```text
role = carrier
role = sender
```

Telclaw may internally classify or store:

```text
passenger
shipper
```

but Advertio treats both as:

```text
Cargo
```

## 3. Telclaw extraction boundary

Preserve current Telclaw fields:

- title/description;
- route city/province/country;
- airline;
- flight number;
- departure/arrival date/time;
- cargo type;
- weight/unit;
- quantity;
- volume/unit;
- price/currency;
- contact;
- features.

## 4. Telclaw transfer_role

If upstream `transfer_role` exists:

- preserve only as `source_transfer_role` if useful;
- do not map it to Advertio Product roles;
- do not expose it as category/filter requirement;
- do not block ingestion if it is missing.

This also removes the previous Telclaw role-schema gap as an Advertio blocker.

## 5. transport_type

Telclaw may contain `transport_type`.

Preserve as source provenance when present.

It does not expand Cargo into commercial logistics.

## 6. Scope

Cargo V1 covers traveler-assisted cargo transfer.

Excluded:

- passenger transport;
- ride-sharing;
- taxi;
- freight brokerage;
- trucking fleets;
- warehousing;
- courier fleet management;
- freight forwarding.

## 7. Route

Every public Cargo listing should have a usable directional route.

Incomplete crawler routes should be reviewed/held according to ingest policy rather than fabricated.

## 8. Date/time

Preserve source dates/times.

Never substitute Telegram post date for transfer date.

## 9. Weight/unit

Preserve original value + unit.

Derive normalized weight separately.

Do not assign role-specific meaning.

## 10. Quantity/volume

Preserve quantity and volume/unit.

Only make them hard filters when semantics/normalization are sufficiently reliable.

## 11. Cargo type

Preserve raw cargo type.

Normalize to controlled item types only with confidence.

## 12. Price

Preserve amount/currency.

Do not assume per-kg vs total.

## 13. Contact

Crawler contact remains external/source contact.

It does not create native ownership or verification.

## 14. Safety

Do not encourage:

- unknown sealed packages;
- undeclared goods;
- illegal/restricted goods.

A dedicated compliance policy is required before public launch.

## 15. Verification

Ticket/trip verification is system/admin-controlled.

Airline + flight number alone do not create verification.

## 16. Moderation

Backoffice should expose:

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
- crawler provenance;
- source_transfer_role only as diagnostic provenance if present.

## 17. Multiple active Cargo listings

Cargo may legitimately need multiple active routes/dates.

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

## 19. UI rename

Current Telegram Bot docs still record **Passenger Cargo** as current UI copy.

Target is **Cargo**.

Update current-state docs only after runtime UI changes.

## 20. Acceptance criteria

- [ ] Cargo remains one category.
- [ ] No Carrier/Sender Product role exists.
- [ ] Telclaw Passenger/Shipper values never create Advertio Product roles.
- [ ] Full Telclaw transfer attributes survive ingestion.
- [ ] Role absence never blocks Cargo ingestion.
- [ ] Route/date/weight/cargo/price/contact semantics are preserved.
