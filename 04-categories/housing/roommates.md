# Housing — Roommate Experience

> Current implementation is represented through Housing & Roommate filters. A separate standalone Roommate feed has not been verified from the supplied UI.

## Current roommate-oriented discovery

Advertio currently exposes roommate-specific criteria inside Housing.

### Gender Preference

- Any
- Male
- Female
- Family
- No preference

### Roommate Age Range

- 18–25
- 25–35
- 35–50
- 50+

### Lifestyle

Current multi-select tags:

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

### Household/property compatibility

Related filters include:

- Pets Allowed
- Smoking Allowed
- Furnishing
- Rental Duration
- Available From
- Amenities
- City
- Monthly Rent

## Product interpretation

These filters allow roommate-style matching without requiring a separate AI matching system.

Current behavior is structured-filter based.

The future AI/Compatibility Score concepts described elsewhere in the product roadmap are **not** documented here as current behavior.

## Current data boundary

The current UI establishes the availability of the roommate filters, but it does not establish:

- a separate Roommate listing subtype enum;
- required roommate-specific posting fields;
- mutual matching/swipe behavior;
- compatibility score;
- chat;
- gender/age enforcement rules.

Those should not be inferred until separately implemented/verified.

## Safety and trust

General Advertio trust/moderation rules apply to roommate listings:

- listing moderation before publication;
- platform verification rules where enabled;
- crawler/native supply distinction;
- official contact actions for measurable interaction.

## Related

- [Housing filters](./filters.md)
- [Product overview](../../03-product/product-overview.md)
- [Verification](../../03-product/verification.md)
