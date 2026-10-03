# Housing & Roommate — Filters

> Current implementation verified from the Mini App and completed Issue #22 as of 3 Oct 2026.

## Filter model

Housing uses structured category filters directly in the category feed.

The filter UI is separate from Global Search.

## Primary filter row

Current primary filters:

1. All cities / City
2. Listing Type
3. Property Type
4. Bedrooms
5. Monthly Rent (CAD)
6. Furnishing
7. Gender Preference
8. Rental Duration
9. More filters

The row scrolls horizontally as needed.

## City

City selection uses a bottom-sheet selector.

Previously reviewed options include:

- All cities
- Toronto
- North York
- Richmond Hill
- Vancouver
- North Vancouver
- Coquitlam

The selected value is indicated in the selector.

## Listing Type

Listing Type is a primary selector.

The current detail UI verifies `Rent` as an active value.

The complete canonical option list is not established by the supplied screenshots, so this document does not invent additional enum values.

## Property Type

Property Type is a primary selector.

Observed current listing values include:

- Condo
- House

The full canonical option set is not exhaustively visible in the supplied UI.

## Bedrooms

Bedrooms is currently exposed as a primary Housing filter.

The listing cards/details display bedroom count where available.

## Monthly Rent (CAD)

Current visible ranges:

- Any
- Under 2,600
- 2,600–5,050
- 5,050–7,550
- Over 7,550

These are current UI buckets.

## Furnishing

Furnishing is a primary filter.

The current listing detail UI verifies `Furnished` as a supported displayed state.

The full enum is not exhaustively established by current screenshots.

## Gender Preference

Current options:

- Any
- Male
- Female
- Family
- No preference

## Rental Duration

Current options:

- Any
- Daily
- Short Term
- Long Term

## More filters

The More filters sheet groups additional roommate/property criteria.

### Roommate Age Range

- 18–25
- 25–35
- 35–50
- 50+

### Lifestyle

Multi-select options:

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

Date input.

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

The `50–50` range should be reviewed; no correction is assumed here.

### Year Built

- 0–5 years
- 5–10 years
- 10–20 years
- 20+ years

### Are you the owner?

- Any
- Yes
- No

### Smoking Allowed

- Any
- Yes
- No

### Amenities

Multi-select:

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

## Interaction patterns

Current implementation uses:

- bottom-sheet selectors;
- checkmark for selected single-choice values;
- chips for multi-select criteria;
- segmented Any / Yes / No controls;
- scrollable More filters sheet;
- result count in the Housing feed;
- a **Show results** action in the advanced filter sheet.

Issue #22 also records a Reset action in More Filters.

## Filtering rule

Filters narrow the Housing feed; they do not change listing data.

Unset / Any states should not constrain the result set.

## Related

- [Issue #22 — Implement housing feed filters](https://github.com/abolfazl2600/Advertio/issues/22)
- [Attributes](./attributes.md)
- [Mini App Housing](../../docs/mini-app/housing.md)
