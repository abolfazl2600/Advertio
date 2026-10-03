# Cargo — Sender ↔ Carrier Matching

> Matching is role-based inside one Cargo category.

## 1. Counterparty rule

A transaction match requires opposite roles:

```text
sender ↔ carrier
```

A Carrier listing can still appear next to other Carrier listings in general browsing, but Carrier ↔ Carrier is not a transaction match.

## 2. Hard matching constraints

Recommended V1 hard constraints:

### Role

```text
sender.role != carrier.role
```

### Route

```text
sender.origin = carrier.origin
sender.destination = carrier.destination
```

Use canonical geography.

Nearby-city/radius matching can be a later soft extension.

### Date

Carrier:

```text
departure_date
```

Sender:

```text
send_date_from .. send_date_until
```

Match if:

```text
carrier.departure_date
is inside
sender.send_date_from .. sender.send_date_until
```

### Weight

```text
carrier.available_weight_kg >= sender.cargo_weight_kg
```

### Item

At least every sender-declared item type intended for that shipment must be allowed by the carrier.

V1 can require:

```text
sender.item_types ⊆ carrier.allowed_items
```

## 3. Price compatibility

Price should initially be a ranking/display factor rather than a hard match unless the sender explicitly sets a maximum budget.

Do not compare:

- per-kg rate;
- total price

without converting using the sender cargo weight.

If conversion is implemented:

```text
carrier_total =
  carrier.price_per_kg × sender.cargo_weight_kg
```

for per-kg carrier rates.

## 4. Soft ranking factors

After hard constraints:

- closer date;
- exact city match;
- verified trip;
- verified user;
- rating/history when available;
- response speed;
- price compatibility;
- freshness.

## 5. Match score

A future compatibility percentage may be useful, but V1 does not require AI.

A deterministic match can be sufficient:

```text
Eligible / Not Eligible
```

then sort eligible candidates by soft factors.

Do not show an arbitrary percentage unless its formula is defined.

## 6. Reverse-route rule

Never treat:

```text
Toronto → Tehran
```

as matching:

```text
Tehran → Toronto
```

unless the listing explicitly represents a return trip as a separate route/listing.

## 7. Partial-route matching

Not required for V1.

Example future complexity:

```text
Montreal → Toronto → Istanbul → Tehran
```

V1 should use one origin and one destination per Cargo listing.

## 8. Multiple sender requests

Carrier capacity may be consumed by more than one sender in the future.

Do not implement automatic capacity reservation unless a confirmed-deal/booking model exists.

Until then, `available_weight_kg` is advertiser-declared capacity.

## 9. Safety boundary

A technical match does not guarantee:

- legal eligibility of the item;
- customs acceptance;
- airline acceptance;
- identity/trust;
- transaction completion.

Those remain separate trust/compliance checks.

## 10. Acceptance criteria

- [ ] Only opposite roles generate transaction matches.
- [ ] Origin/destination direction must match.
- [ ] Carrier date must overlap sender date window.
- [ ] Carrier capacity must cover sender cargo weight.
- [ ] Item types must be compatible.
- [ ] Price comparison respects price type.
- [ ] Matching does not imply legal/trust approval.
