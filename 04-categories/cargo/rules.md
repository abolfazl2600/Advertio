# Cargo — Category Rules

> Cargo is one category with two listing roles: Carrier and Sender.

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

Every Cargo listing must have exactly one role:

```text
carrier
sender
```

Role can influence form requiredness and matching, but not category identity.

## 3. Scope rule

Cargo V1 is traveler-assisted cargo transport.

### Included

- traveler with spare baggage/carrying capacity;
- sender seeking a traveler for an eligible item.

### Excluded from Cargo V1

- transporting passengers;
- ride-sharing/carpooling;
- taxi;
- commercial freight brokerage;
- trucking;
- courier fleet management;
- warehousing;
- freight forwarding.

## 4. Route rule

Every Cargo listing must have:

- origin country;
- origin city;
- destination country;
- destination city.

Direction matters.

## 5. Carrier rule

Carrier must provide:

- travel/departure date;
- available cargo weight;
- accepted item types;
- pricing state;
- contact method.

Carrier should not be treated as trip-verified unless the verification system marks the trip verified.

## 6. Sender rule

Sender must provide:

- acceptable send date window;
- cargo weight;
- declared item type(s);
- pricing/budget state;
- contact method.

## 7. Item declaration rule

Sender must declare the item type.

Do not encourage carrying:

- unknown sealed packages;
- undeclared items;
- illegal/restricted items.

A dedicated prohibited/restricted-items compliance policy is required before public Cargo launch.

## 8. Verification

The source mentions **Cargo ticket Verified** as a future/manual verification.

Rules:

- verification is system/admin-controlled;
- user cannot self-assign it;
- it verifies trip/ticket evidence only;
- it does not certify item legality or customs compliance.

## 9. Listing moderation

Cargo should require moderation before publication under the current general Advertio listing rule.

Moderation should inspect:

- route;
- dates;
- weight;
- item declaration;
- suspicious description/contact behavior;
- prohibited-item signals;
- duplicate route/listing spam;
- trust/verification claims.

## 10. One-active-listing conflict

Advertio's generic source says one active listing per user per category.

Cargo may legitimately need multiple simultaneous listings:

- multiple upcoming trips;
- multiple sender requests/routes.

Therefore the generic rule should not be blindly applied to Cargo.

Recommended Cargo rule:

```text
allow multiple active Cargo listings
but prevent near-identical duplicate listings
and apply rate limits/moderation
```

A uniqueness heuristic can consider:

- owner;
- role;
- origin;
- destination;
- date/date window.

This is a product decision to implement explicitly.

## 11. Crawled Cargo

Crawled Cargo must:

- remain marked crawled;
- preserve source identity;
- use external/source contact;
- remain non-monetized under existing crawler rules;
- not pretend the source user is a native verified Cargo user.

## 12. Contact and deal boundary

Advertio provides discovery/contact.

Unless a future escrow/booking system is explicitly implemented, the platform must not imply:

- shipment booking guarantee;
- insurance;
- customs clearance;
- delivery guarantee.

## 13. Current UI rename

The current Telegram Bot documentation records **Passenger Cargo** as the visible label.

The target taxonomy is now **Cargo**.

Do not rewrite current-state documentation to claim the UI has already changed until the runtime UI is actually updated.

## 14. Acceptance criteria

- [ ] Cargo is the only category name in new product/category specifications.
- [ ] Carrier/Sender are roles.
- [ ] Old Travel/Transport subcategory files are removed.
- [ ] Ride-sharing and commercial logistics are outside Cargo V1.
- [ ] Moderation includes Cargo-specific safety checks.
- [ ] Cargo trip verification is system-controlled.
- [ ] Multiple legitimate Cargo listings can be supported without allowing duplicate spam.
