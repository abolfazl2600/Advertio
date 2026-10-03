# Cargo — Sender ↔ Carrier Matching

> Matching is role-based inside one Cargo category.
>
> Telclaw transfer fields enrich matching, but unknown crawler values must never be invented to force eligibility.

## 1. Counterparty rule

A transaction match requires opposite roles:

```text
sender ↔ carrier
```

Crawler role mapping:

```text
passenger → carrier
shipper → sender
```

If crawler role is unknown, automatic counterparty matching should wait for normalization/review.

## 2. Hard matching constraints

### Role

```text
sender.role != carrier.role
```

### Route

```text
sender.origin = carrier.origin
sender.destination = carrier.destination
```

Direction is mandatory.

### Date

Carrier:

```text
departure_date
```

Native Sender:

```text
send_date_from .. send_date_until
```

Match when carrier departure date falls inside sender window.

A crawled Sender may only contain one source date. In that case treat it as the known source date only; do not invent a date range.

### Weight

After safe unit normalization:

```text
carrier.available_weight_kg >= sender.cargo_weight_kg
```

Telclaw raw `weight + weight_unit` must be interpreted according to reliable role/context before applying this rule.

### Item

Canonical sender item types must be compatible with Carrier allowed items.

Raw Telclaw `cargo_type` needs normalization first.

## 3. Quantity compatibility

Telclaw can extract `quantity`.

Quantity becomes a hard matching constraint only if Advertio has a corresponding Carrier quantity/package limit.

Until then it is informational.

## 4. Volume compatibility

Telclaw can extract:

- volume
- volume_unit

Future hard constraint:

```text
carrier.max_volume >= sender.cargo_volume
```

only after:

- both roles have canonical volume semantics;
- units are normalized.

Until then volume is a soft/detail signal.

## 5. Airline and flight number

Telclaw may provide:

- airline
- flight_number

These can improve:

- trip confidence;
- exact traveler discovery;
- moderation;
- ticket verification.

They should not be mandatory general matching constraints unless the Sender explicitly asks for a specific airline/flight.

## 6. Departure / arrival time

Time fields can improve ranking for handoff practicality.

Examples:

- same-day airport handoff;
- arrival-before-deadline preference.

V1 does not require hard time matching unless the user supplies a time constraint.

## 7. Price compatibility

Telclaw provides price/currency but not a reliable dedicated price type.

Do not hard-match raw crawler price until it is known whether the amount is:

- per kg;
- total;
- negotiable.

For native structured prices:

```text
carrier_total =
  carrier.price_per_kg × sender.cargo_weight_kg
```

can be derived when `price_type = per_kg`.

## 8. Soft ranking factors

After hard constraints:

- date closeness;
- exact city match;
- verified trip;
- verified user;
- airline/flight completeness;
- arrival timing;
- rating/history when available;
- response speed;
- compatible known price;
- freshness.

## 9. Match score

V1 can use:

```text
Eligible / Not Eligible
```

then rank eligible matches.

Do not show an arbitrary percentage without a documented formula.

## 10. Reverse-route rule

Never match:

```text
Toronto → Tehran
```

to:

```text
Tehran → Toronto
```

unless a separate return-route listing exists.

## 11. Partial-route matching

Not required for V1.

One listing should have one origin and one destination.

## 12. Safety boundary

A technical match does not establish:

- cargo legality;
- customs acceptance;
- airline acceptance;
- verified identity;
- verified trip;
- delivery guarantee.

## 13. Acceptance criteria

- [ ] Opposite reliable roles are required for automatic sender↔carrier matching.
- [ ] Route direction must match.
- [ ] Date logic does not fabricate source dates/windows.
- [ ] Weight comparison happens only after unit and role semantics are known.
- [ ] Cargo type is normalized before item hard-matching.
- [ ] Quantity/volume become hard constraints only when both sides support canonical limits.
- [ ] Airline/flight fields enrich rather than falsely guarantee matching.
- [ ] Unknown raw price type cannot cause an incorrect price match.
