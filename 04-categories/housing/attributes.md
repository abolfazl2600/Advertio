# Housing & Roommate — Attributes

> This file documents attributes currently visible or operationally supported by the reviewed Housing UI. It does not invent backend enum values that are not visible in current product evidence.

## Core listing fields

Housing listings use the platform-level listing fields:

- Title
- Description
- Images / media
- Location
- Category
- Status

The current Housing UI additionally exposes structured Housing attributes.

## Current verified Housing attributes

| Attribute | Current UI use | Observed values/examples |
| --- | --- | --- |
| Listing Type | Filter + detail | `Rent` observed |
| Property Type | Card + filter + detail | `Condo`, `House` observed |
| Bedrooms | Card + filter + detail | `1 bed`, `1` observed |
| Monthly Rent (CAD) | Card + filter + detail | `$1,500/mo`, `2,000` observed |
| Furnishing | Filter + detail | `Furnished` observed |
| Rental Duration | Filter + detail | Any, Daily, Short Term, Long Term |
| City / Location | Card + filter | Toronto and other supported cities |
| Gender Preference | Filter | Any, Male, Female, Family, No preference |
| Roommate Age Range | More filters | 18–25, 25–35, 35–50, 50+ |
| Lifestyle | More filters | multi-select tags |
| Pets Allowed | More filters | Any / Yes / No |
| Available From | More filters | date |
| Area (m²) | More filters | bucketed ranges |
| Bathrooms | More filters | 1 / 2 / +3 |
| Floor | More filters | bucketed ranges currently shown in UI |
| Year Built | More filters | 0–5 / 5–10 / 10–20 / 20+ years |
| Owner status | More filters | Any / Yes / No |
| Smoking Allowed | More filters | Any / Yes / No |
| Amenities | More filters | multi-select |

## Lifestyle values currently visible

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

## Amenities currently visible

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

## Current price buckets

The reviewed Monthly Rent (CAD) selector currently shows:

- Any
- Under 2,600
- 2,600–5,050
- 5,050–7,550
- Over 7,550

These are documented as current UI buckets, not permanent pricing policy.

## Current Area buckets

- Under 150
- 150–250
- 250–400
- Over 400

## Current Floor buckets

The UI currently shows:

- Under 50
- 50–50
- 50–100
- Over 100

The `50–50` value and the overall ranges appear inconsistent and should be treated as a QA/product-refinement item. This documentation intentionally records the current UI rather than silently correcting it.

## Attribute semantics rule

If an attribute value is unavailable, the UI should omit it rather than display fabricated/default listing data.

Crawler/imported records must use Advertio's canonical category schema and must not guess required values.

## References

- [Housing filters](./filters.md)
- [Mini App Housing current state](../../docs/mini-app/housing.md)
- [Crawler normalization](../../09-crawler/data-normalization.md)
