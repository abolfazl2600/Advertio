# Jobs — Monetization

> Jobs monetization exists in the source product model, but no dedicated current Jobs monetization UI has been verified. Source conflicts are preserved rather than silently resolved.

## Current implementation evidence

No live Jobs Mini App experience has been verified.

Therefore, this document does not claim that paid Jobs contact access, Boost, Extend or Urgent are currently available in a Jobs UI.

## Early Access — source-defined but conflicting

The shared Listing Lifecycle says Early Access applies to:

- Housing
- Jobs
- Passenger Cargo

However, the source contains two opposite timing models.

### Model A — pay for fresh access first

The source describes:

- new listing enters Early Access after publication;
- approximately 30 hours / Day 1–3 language;
- full access limited to Early Access users;
- Coin consumed per contact;
- after Early Access, contact becomes free.

### Model B — free first, pay later

Another source flow describes:

- Day 1–3 free messages/contact;
- Day 4+ contact access costs 1 Coin;
- Day 30 expiry.

These models conflict.

No canonical Jobs Early Access timing should be documented until product/runtime behavior is explicitly resolved.

## Extend — Jobs-specific source pricing

The source defines sample Jobs/Social extension pricing.

### First 30-day extension

```text
35 Coins
```

### Second and later extension

```text
55 Coins
```

The same product source states that service pricing is dynamically configurable by Admin.

Therefore these numbers are source examples/rules, not immutable constants.

## Boost

Source model:

- sample price: **3 Coins**
- Admin-configurable
- intended to return the listing toward the top of results
- may republish to communication/social channels

No Jobs-specific purchase UI is currently verified.

## Urgent

Source model:

- paid visual badge/distinction;
- category-specific fee;
- Admin-configurable.

No Jobs-specific Urgent UI is currently verified.

## Crawled Jobs

General crawler rules apply:

- crawled listing is free;
- Advertio monetization disabled;
- user is redirected to Telegram advertiser/contact source;
- internal chat disabled;
- review disabled;
- escrow disabled.

This is a platform source rule and applies if/when Jobs crawler supply is delivered through the same crawled-listing model.

## Pricing principle

The source says pricing can vary by:

- Country
- Category
- Supply & Demand
- User behavior
- Unit Economics

Do not hard-code old sample prices into category documentation as permanent business rules.

## Related

- [Product rules](../../03-product/product-rules.md)
- [Listing lifecycle](../../03-product/listing-lifecycle.md)
