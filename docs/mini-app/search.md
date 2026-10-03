# Mini App — Global Search Current State

> Current implementation documented from the supplied Mini App/Web App UI review on **3 Oct 2026**.

This document describes the Global Search experience currently visible in Advertio. It records current product behavior and does not define future Search functionality.

## Current Search entry point

The Mini App bottom navigation includes:

- Home
- Search
- Post
- Wallet
- Profile

The **Search** tab is implemented and opens the Global Search screen.

## Current Search UI

The reviewed Search screen currently includes:

- **Search** page title
- Free-text search input
- Search icon
- Clear-input control
- Current query visible in the input
- Matching result count
- Listing result cards
- Persistent bottom navigation

In the supplied current-state example, the query:

```text
toro
```

displayed:

```text
7 results for “toro”
```

## Current result presentation

Matching listings are displayed using listing cards.

The reviewed result card includes:

- Listing image area
- **No photo** placeholder when no image is available
- Property/listing type label
- Listing title
- Area where available
- Bedroom count where available
- Location
- Price
- Monthly price suffix where applicable
- Relative publication time

The reviewed example showed:

```text
Studio
North York, Toronto Studio Rental
37.35 m²
1 bed
Toronto
$1,917/mo
2 d ago
```

## Search behavior currently confirmed

The current UI confirms that:

- Users can enter free text in the Search tab.
- A query returns matching listings.
- The Search screen displays the number of matches.
- Results are rendered directly below the search field.
- Search results use the existing listing-card presentation.
- The Search experience is separate from the Housing feed filter controls.

## Relationship to Housing filters

Global Search and Housing feed filtering are separate product experiences.

- **Global Search** provides a keyword-oriented Search screen from the main bottom navigation.
- **Housing filters** remain available inside the Housing listing feed for structured filtering.

The Global Search implementation does not replace the Housing filter system.

## Current scope note

The reviewed result shown in the supplied UI is a Housing listing.

Issue #23 originally defined Housing listings as the first implementation scope. This current-state document does not claim multi-category Search behavior unless separately verified.

## Not verified from the supplied UI

The supplied screenshot does not by itself establish the implementation details of:

- exact searchable database fields;
- ranking/relevance algorithm;
- loading-state behavior;
- error-state behavior;
- empty-results UI;
- Search-state preservation after returning from Listing Detail;
- exact Listing Detail navigation behavior;
- future multi-category Search.

These should only be documented as current behavior after they are separately verified.

## Related implementation issue

- [#23 — Implement Global Search Experience](https://github.com/abolfazl2600/Advertio/issues/23)

Issue #23 is recorded as completed for the currently implemented Global Search experience.
