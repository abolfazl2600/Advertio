# Advertio Mini App — Current State

> Last documented from the current Telegram Mini App/Web App UI review on 3 Oct 2026.

This documentation records **what is currently visible/implemented in the Advertio Mini App/Web App**. It is intended to be a development reference alongside the codebase.

## Documentation rules

- **Current Implementation** describes behavior observed in the current Mini App/Web App.
- GitHub Issues remain the source for work to be implemented.
- Planned or future behavior must not be described here as already implemented.
- Update these documents when the corresponding product behavior changes.

## Current navigation observed

The bottom navigation currently contains:

- Home
- Search
- Post
- Wallet
- Profile

The central **Post** action is visually emphasized.

### Current Global Search

The **Search** tab is implemented as a functional Global Search experience.

The current Search screen includes:

- free-text keyword input;
- clear-input control;
- result count;
- listing result cards;
- persistent bottom navigation.

A reviewed current-state example showed the query `toro` returning **7 results**.

Global Search remains separate from the structured Housing feed filters.

See [Global Search](./search.md) for the detailed current-state documentation.

## Current Home implementation

The Home screen currently includes:

- Advertio header/branding
- Notification entry point
- Category selection cards
- Housing as the currently available category
- Transport marked as **Coming Soon**
- Jobs marked as **Coming Soon**
- Bottom navigation

The current Home experience routes users into the Housing marketplace while preserving entry points for future categories.

## Current documented Mini App areas

The following current-state areas have been reviewed and documented:

- Home and bottom navigation
- Global Search
- Housing listing feed
- Housing feed filters
- Wallet and Telegram Stars coin purchase flow
- Profile, My Listings, and Saved Listings

## Detailed documentation

- [Global Search](./search.md)
- [Housing](./housing.md)
- [Wallet](./wallet.md)
- [Profile](./profile.md)

## Source issues used during the UI review

These issues were created during the review process to capture already-observed implementation, but this documentation is now the canonical current-state reference for those features:

- #20 — Mini App Home category selection and bottom navigation
- #21 — Housing listing feed
- #22 — Housing feed filters
- #23 — Global Search
- #24 — Wallet and Telegram Stars coin purchase flow

The issues themselves should not be treated as the current-state specification.
