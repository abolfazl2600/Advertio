# Housing & Roommate — Category Overview

> Current category documentation aligned with the reviewed Mini App UI and implemented Housing issues as of **3 Oct 2026**.

Housing & Roommate is the currently active marketplace category in Advertio's Mini App.

The category currently combines:

- rental housing discovery;
- apartment/house/room-style listings;
- roommate-oriented filters;
- structured property attributes;
- location and price filtering;
- listing detail and external/native contact flows depending on listing source.

## Current product surface

The Mini App exposes Housing as a dedicated category screen with:

- back navigation;
- result count;
- structured filter chips;
- listing cards;
- listing images / no-photo states;
- property type;
- title;
- bedroom count where available;
- location;
- monthly price where available;
- relative publication time;
- floating Post action.

A reviewed 3 Oct 2026 UI state showed **171 listings**.

## Current structured filtering

Primary filters currently include:

- City
- Listing Type
- Property Type
- Bedrooms
- Monthly Rent (CAD)
- Furnishing
- Gender Preference
- Rental Duration
- More filters

The **More filters** sheet includes roommate, property and amenity criteria.

See [filters.md](./filters.md).

## Current listing detail

The reviewed Housing detail UI includes:

- About / description
- Listing Type
- Property Type
- Bedrooms
- Monthly Rent (CAD)
- Furnishing
- Rental Duration
- Contact area

Observed values in the current UI include:

- Listing Type: `Rent`
- Property Type: `House`
- Bedrooms: `1`
- Monthly Rent: `2,000`
- Furnishing: `Furnished`
- Rental Duration: `Long Term`

## Housing vs Roommate

Advertio currently treats Housing & Roommate as one category surface.

The current filter model contains roommate-specific criteria such as:

- Gender Preference
- Roommate Age Range
- Lifestyle
- Pets Allowed
- Smoking Allowed

This documentation does **not** claim that Roommate is a separate currently verified feed; the roommate behavior is currently represented inside the Housing category/filter experience.

## Supply sources

Housing can contain both:

- user-generated/native listings;
- crawled listings used for initial supply.

These cohorts must remain distinguishable for analytics, moderation, contact behavior and marketplace-health metrics.

## Search relationship

Housing structured filtering is separate from Global Search.

- **Housing filters** = structured category-specific discovery.
- **Global Search** = free-text search across currently searchable listings.

## Current implementation references

- [Mini App Housing current state](../../docs/mini-app/housing.md)
- [Issue #21 — Housing listing feed](https://github.com/abolfazl2600/Advertio/issues/21)
- [Issue #22 — Housing feed filters](https://github.com/abolfazl2600/Advertio/issues/22)
- [Product rules](../../03-product/product-rules.md)
- [Listing lifecycle](../../03-product/listing-lifecycle.md)
