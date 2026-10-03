# Housing — Rental Listings

> Current-state category guidance based on the implemented Housing feed/detail UI.

## Current representation

Rental inventory is represented inside the Housing & Roommate category rather than a separately verified Rental Apartments screen.

The current detail UI confirms the following rental-oriented fields:

- Listing Type
- Property Type
- Bedrooms
- Monthly Rent (CAD)
- Furnishing
- Rental Duration
- Description / About
- Contact action

Observed example:

```text
Listing Type: Rent
Property Type: House
Bedrooms: 1
Monthly Rent (CAD): 2,000
Furnishing: Furnished
Rental Duration: Long Term
```

Listing cards can show:

- image;
- property type;
- title;
- bedroom count;
- city/location;
- monthly rent;
- relative publish time.

## Discovery

Rental discovery is supported through structured filters such as:

- City
- Listing Type
- Property Type
- Bedrooms
- Monthly Rent
- Furnishing
- Rental Duration
- Available From
- Area
- Bathrooms
- Floor
- Year Built
- Owner status
- Smoking Allowed
- Amenities

## Current listing examples

The reviewed Housing feed includes examples such as a Condo listing in Toronto with:

- 1 bedroom;
- $1,500/month;
- image;
- recent publish time.

This file documents capability, not a permanent example inventory.

## Contact behavior

The reviewed Housing listing detail shows a contact area with:

- `Contact via Telegram`
- `No coins charged`
- `Open in Telegram`

This is a verified current UI state for the reviewed listing.

Product rules separately define crawled listings as free-contact records that redirect to the Telegram advertiser. The visible screenshot crop does not itself expose the listing's supply-source label, so this file does not infer source solely from the contact button.

## Lifecycle

Platform-level lifecycle remains defined in:

[Listing Lifecycle](../../03-product/listing-lifecycle.md)

Current core flow includes moderation before publication and active/expired lifecycle behavior.

## Monetization caveat

The source product documentation contains conflicting Housing Early Access timing models.

Therefore, paid contact timing for native Housing listings is **not** asserted here as a settled current category rule.

See [monetization.md](./monetization.md).
