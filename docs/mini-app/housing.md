# Mini App — Housing Current State

> Current implementation documented from the Mini App/Web App UI review on **3 Oct 2026**.

This document describes the Housing experience currently visible in Advertio. It does not define future Housing behavior.

## Current Housing feed

Housing opens a dedicated listing feed.

### Current feed behavior observed

- Housing page header with back navigation
- Listing result count
- Listing cards
- Listing image when available
- No-photo placeholder when an image is unavailable
- Property type label
- Listing title
- Bedroom information where available
- Location
- Price
- Monthly price suffix where applicable
- Relative publish time
- Floating Post action

A reviewed 3 Oct 2026 feed state displayed **171 listings**.

## Current primary filters

The Housing feed currently exposes horizontally scrollable filter controls.

Observed primary filters include:

- City
- Listing Type
- Property Type
- Bedrooms
- Monthly Rent (CAD)
- Furnishing
- Gender Preference
- Rental Duration
- More Filters

## City filter

The City selector is implemented as a bottom sheet.

Previously reviewed options include:

- All cities
- Toronto
- North York
- Richmond Hill
- Vancouver
- North Vancouver
- Coquitlam

## Monthly Rent (CAD)

The reviewed current selector shows:

- Any
- Under 2,600
- 2,600–5,050
- 5,050–7,550
- Over 7,550

These are documented as current UI buckets.

## Gender Preference

Current selector:

- Any
- Male
- Female
- Family
- No preference

## Rental Duration

Current selector:

- Any
- Daily
- Short Term
- Long Term

## More Filters

The **More Filters** experience is implemented as a scrollable bottom sheet containing Housing and roommate criteria.

### Roommate Age Range

- 18–25
- 25–35
- 35–50
- 50+

### Lifestyle

- Quiet
- Early bird
- Night owl
- Social
- Party friendly
- Keeps to themselves
- Students only
- Working professional
- Works from home
- Vegetarian household

### Pets Allowed

- Any
- Yes
- No

### Available From

A date input is available.

### Area (m²)

- Under 150
- 150–250
- 250–400
- Over 400

### Bathrooms

- 1
- 2
- +3

### Floor

Current UI:

- Under 50
- 50–50
- 50–100
- Over 100

> QA note: `50–50` and the overall Floor buckets appear inconsistent. This document records the UI exactly as observed.

### Year Built

- 0–5 years
- 5–10 years
- 10–20 years
- 20+ years

### Owner

Under **Are you the owner?**:

- Any
- Yes
- No

### Smoking Allowed

- Any
- Yes
- No

### Amenities

Observed options:

- Elevator
- Parking
- Storage Room
- Balcony
- Terrace
- Garden
- Rooftop
- Security System
- CCTV
- Doorman
- Renovated
- Kitchen Appliances
- Washing Machine
- Dishwasher
- Air Conditioning
- Heating
- Internet Ready
- Swimming Pool
- Sauna
- Gym

The current More Filters sheet exposes a **Show results** action.

Issue #22 also records Reset behavior as implemented.

## Current listing detail

The reviewed current Housing detail includes:

- About / description
- Listing Type
- Property Type
- Bedrooms
- Monthly Rent (CAD)
- Furnishing
- Rental Duration
- Contact section

Observed current example:

```text
Listing Type: Rent
Property Type: House
Bedrooms: 1
Monthly Rent (CAD): 2,000
Furnishing: Furnished
Rental Duration: Long Term
```

The reviewed Contact area shows:

```text
Contact via Telegram
No coins charged
Open in Telegram
```

This documents the visible UI state only; the screenshot does not expose the listing supply-source badge in the captured area.

## Filter interaction patterns observed

- Bottom-sheet selectors are used.
- Selected single-choice values use checkmarks.
- Multi-select chips are used for Lifestyle/Amenities.
- Segmented controls are used for Any / Yes / No.
- More Filters groups secondary criteria.
- Housing feed shows the matching listing count.

## Current Search relationship

Housing filtering is implemented directly in the Housing feed.

Global Search is separate:

- Global Search = free-text discovery.
- Housing filters = structured category-specific discovery.

See [Global Search](./search.md).

## Category documentation

Detailed category-level documentation now lives under:

- [Housing overview](../../04-categories/housing/overview.md)
- [Housing attributes](../../04-categories/housing/attributes.md)
- [Housing filters](../../04-categories/housing/filters.md)
- [Rental listings](../../04-categories/housing/rental-apartments.md)
- [Roommate experience](../../04-categories/housing/roommates.md)
- [Housing monetization](../../04-categories/housing/monetization.md)
- [Housing rules](../../04-categories/housing/rules.md)

## Related implementation issues

- [#21 — Housing listing feed](https://github.com/abolfazl2600/Advertio/issues/21)
- [#22 — Housing feed filters](https://github.com/abolfazl2600/Advertio/issues/22)
