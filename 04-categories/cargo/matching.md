# Cargo — Route Relevance & Matching

> Cargo matching is **not role-based**.
>
> Advertio does not require Carrier/Sender or Passenger/Shipper roles.

## 1. Goal

Matching means:

> Find Cargo listings that are relevant to the user's route, timing and cargo requirements.

It does not mean matching two explicit marketplace roles.

## 2. Core relevance dimensions

### Route

Primary:

```text
origin
destination
```

Direction must match.

### Date

Prefer listings whose departure/shipment dates overlap the user's requested date/range.

### Cargo type

Prefer compatible normalized item type or relevant raw cargo description.

### Weight

Use normalized weight when helpful.

Because there is no role field, weight is a relevance dimension rather than a strict Carrier-capacity-vs-Sender-weight equation.

### Airline / flight

Can improve relevance when the user specifies:

- airline;
- flight number;
- airport/travel context.

### Price

Use only when price semantics are compatible/known.

## 3. Hard constraints

Safe hard constraints for V1:

- same route direction;
- date inside requested range when user explicitly filters date;
- explicit item restriction where canonical item type exists.

Weight can become hard only when the UX clearly defines what the user's weight constraint means.

## 4. Soft ranking

After hard filters, rank by:

- exact route match;
- date closeness;
- item relevance;
- known weight compatibility;
- airline/flight relevance;
- verified trip;
- verified user;
- price relevance;
- freshness.

## 5. No role inference

Do not infer:

```text
passenger = carrier
shipper = sender
```

for Product matching.

Even if Telclaw preserves `transfer_role`, Advertio relevance must work without it.

## 6. Source role as provenance

Optional internal:

```text
source_transfer_role
```

may be useful for:

- debugging;
- crawler QA;
- source analysis.

It must not be required for public matching.

## 7. Reverse route

Never treat:

```text
Toronto → Tehran
```

as equivalent to:

```text
Tehran → Toronto
```

unless user explicitly searches both directions.

## 8. Partial routes

Out of scope for V1.

Use one origin and one destination per listing.

## 9. Score

V1 can use deterministic eligibility + ranking.

Do not expose an arbitrary percentage unless a documented score formula exists.

## 10. Safety boundary

Relevance does not imply:

- legal cargo;
- customs acceptance;
- airline acceptance;
- identity verification;
- delivery guarantee.

## 11. Acceptance criteria

- [ ] Matching works with no Cargo role field.
- [ ] Route direction is preserved.
- [ ] Date/item filters can act as hard constraints.
- [ ] Weight is not interpreted through a nonexistent role model.
- [ ] Telclaw source role does not control Product matching.
- [ ] Ranking can use airline/flight/price/trust/freshness as soft signals.
