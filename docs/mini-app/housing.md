# Mini App — Housing Current State

> Current implementation documented from the Mini App/Web App UI review on 24 Sep 2026.

This document describes the Housing experience currently visible in Advertio. It does not define future Housing behavior.

## Current Housing feed

The Housing category opens a dedicated listing feed.

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

An observed feed state displayed **320 listings**.

## Current primary filters

The Housing feed currently exposes filter controls across the top of the feed.

Observed filters include:

- City
- Listing Type
- Property Type
- Rent (CAD)
- Furnishing
- Gender Preference
- Rental Duration
- More Filters

The filter row can extend horizontally as more filters are available.

## City filter

The City selector is implemented as a bottom sheet with a city search field.

Observed options include:

- All cities
- Toronto
- North York
- Richmond Hill
- Vancouver
- North Vancouver
- Coquitlam

The selected value is visually indicated.

## Gender Preference

The current selector includes:

- Any
- Male
- Female
- Family
- No preference

The selected value is visually indicated.

## Rental Duration

The current selector includes:

- Any
- Daily
- Short Term
- Long Term

## More Filters

The **More Filters** experience is implemented as a bottom sheet containing additional Housing and roommate criteria.

### Roommate Age Range

Observed options:

- 18–25
- 25–35
- 35–50
- 50+

### Lifestyle

Observed selectable lifestyle tags include:

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

Current segmented options:

- Any
- Yes
- No

### Available From

A date input is available.

### Area (m²)

Observed options:

- Under 150
- 150–250
- 250–400
- Over 400

### Bathrooms

Observed options:

- 1
- 2
- +3

### Floor

Observed options currently shown in the UI:

- Under 50
- 50–50
- 50–100
- Over 100

> Note: this documents the UI exactly as observed. The `50–50` value and the overall Floor ranges appear to need product/QA review, but no correction is assumed in this current-state document.

### Year Built

Observed options:

- 0–5 years
- 5–10 years
- 10–20 years
- 20+ years

### Owner

A segmented control is shown under **Are you the owner?**

Options:

- Any
- Yes
- No

### Smoking Allowed

Current segmented options:

- Any
- Yes
- No

### Amenities

Observed amenity choices include:

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

## Filter interaction patterns observed

- Bottom-sheet selectors are used for filter selection.
- Selected single-choice values are marked with a check.
- More Filters groups secondary criteria in one scrollable sheet.
- A **Reset** action is available in More Filters.
- Chip/segmented-control patterns are used for multi-option and Yes/No/Any filters.
- The feed exposes the number of matching listings.

## Current Search relationship

Housing filtering is currently implemented directly in the Housing feed.

The separate **Search** tab in bottom navigation is not yet a functional Global Search experience. Its current screen shows **Search is coming soon** and directs users back to Housing filters.

Global Search is therefore separate from the currently implemented Housing filter system.
