# Mini App — Profile Current State

> Current implementation documented from the Mini App/Web App UI review on 24 Sep 2026.

This document describes the Profile, My Listings, and Saved Listings experiences currently visible in Advertio. It records the observed implementation only and does not define future profile behavior.

## Profile entry point

Profile is available from the persistent bottom navigation.

The current Profile screen contains:

- Profile title
- User identity card
- Verification badge
- Telegram-style username
- Profile image
- Profile image change affordance
- Edit action
- Verified phone section
- My Listings entry
- Saved Listings entry
- Appearance selector
- Bottom navigation

## User identity card

The top profile card currently displays:

- Profile image/avatar
- User display name
- `Verified` badge
- Username
- `Edit` action

A small camera control is shown over the profile image, indicating that the avatar/profile photo can be changed.

The observed account displayed a verified profile state.

## Verification state

A dedicated verification section is currently shown below the profile identity card.

Observed content:

- Shield/verification icon
- `Verified phone` label
- Verified phone number

This confirms that phone verification status is currently surfaced directly in the Profile UI.

## My Listings

The Profile page links to a dedicated **My listings** screen.

### Current listing status tabs

The My Listings screen currently exposes four status tabs:

- Active
- Pending
- Rejected
- Inactive

Each tab displays the number of listings in that state.

Observed example counts:

- Active: 0
- Pending: 0
- Rejected: 2
- Inactive: 0

## Active listings empty state

When there are no active listings, the current screen displays an empty state containing:

- Listing/document icon
- `Nothing live right now`
- Supporting text explaining that listings which passed review and have not expired appear here
- `Post a listing` action

This gives the user a direct path from the empty state into the listing creation flow.

## Rejected listings

The Rejected tab currently displays rejected listing cards.

Observed rejected listing card content includes:

- Listing image
- Property type
- Listing title
- Bedroom count
- Location
- Price
- Relative listing age

Below the rejected listing card, the UI displays a dedicated rejection-reason panel.

### Rejection reason

The current rejection panel contains:

- Error/warning icon
- `Why it was rejected` heading
- Admin-provided rejection reason text

An observed example rejection reason was:

- `chek picture`

This confirms that the current product exposes the moderation rejection reason directly to the listing owner.

## Pending listings

A Pending tab is present and includes a count.

No pending listing details were included in the reviewed screenshots, so this document does not assume additional pending-specific behavior beyond the visible tab/state.

## Inactive listings

An Inactive tab is present and includes a count.

No inactive listing details were included in the reviewed screenshots, so this document does not assume additional inactive-specific behavior beyond the visible tab/state.

## Saved Listings

The Profile screen links to a dedicated **Saved** page.

The current Saved page displays saved listing cards using the same general marketplace card style.

Observed saved listing content includes:

- Listing image
- Property type
- Listing title
- Bedroom count
- Location
- Price
- Relative publish time

An observed saved listing example displayed:

- Property type: Apartment
- Title: Fully furnished one-bedroom unit in West Vancouver
- 1 bed
- West Vancouver
- $2,400/mo
- 14 h ago

## Appearance settings

The current Profile screen includes an **Appearance** section.

Observed options:

- System
- Light
- Dark

The selector is implemented as a segmented control.

The reviewed screenshot shows **System** selected.

## Navigation behavior

The My Listings and Saved pages preserve the persistent bottom navigation:

- Home
- Search
- Post
- Wallet
- Profile

The central Post action remains visually emphasized.

Back navigation is available from both My Listings and Saved.

## Current functional map

### Implemented and visible

- Profile page in bottom navigation
- Display name
- Username
- Profile photo
- Verified badge
- Phone verification status
- Verified phone number display
- Profile edit entry point
- Avatar/photo change affordance
- My Listings entry point
- Saved Listings entry point
- Appearance selection
- My Listings status tabs
- Status counts
- Active empty state
- Post Listing CTA from Active empty state
- Rejected listing cards
- Rejection reason display
- Saved listing feed/cards

### Visible but not fully documented from the current screenshots

The following controls are visible, but their deeper flows were not reviewed in the provided UI evidence:

- Profile Edit flow
- Profile image upload/change flow
- Pending-listing detail behavior
- Inactive-listing detail behavior
- Saved-listing removal/unsave interaction
- Appearance persistence behavior across sessions/devices

These should not be treated as fully documented until their UI/behavior is reviewed.

## Product-state boundary

This document intentionally does not assume future profile features such as:

- ratings and reviews;
- advanced trust badges;
- Last Active metrics;
- Deals Count;
- social verification;
- video verification management;
- referral profile UI;
- public user history;
- profile analytics.

Those features belong to future work unless already implemented and reviewed separately.
