# Backoffice — Listings

> Current-state documentation based on the reviewed Backoffice UI as of 23 Sep 2026.

## Current Implementation

### Navigation / views

The Listings section currently exposes these views:

- Pending
- Live
- Rejected
- Taken down
- Expired
- All
- Possible Duplicate

### Search

The Listings UI provides a search field labelled:

- Title
- City
- Listing ID

### Pending listings

Observed listing information/actions include:

- Listing image or no-image placeholder
- Listing title
- Location
- Status
- Source/type badge
- Publisher
- Opened → Contacts state/metric
- Submitted timestamp
- Approve
- Reject

Observed pending crawled listings use:

- `PendingReview` status
- `Crawled` badge
- Publisher may be `Unknown`
- Opened → Contacts may show `not published`

### Listing detail / review drawer

Selecting a Pending listing opens a right-side detail/review drawer. The reviewed example is a crawled listing in `PendingReview` state.

#### Header and classification

The drawer displays:
- Listing title
- Category/context line (observed example: `Housing & Roommate · North York`)
- Source badge (observed: `Crawled`)
- Lifecycle/review status badge (observed: `PendingReview`)
- Close action

#### Photos

A dedicated **Photos** section is present.

If no images are available, the current UI explicitly displays:
- `This listing has no photos.`

#### Description

A **Description** section displays the listing description/body text when available.

#### Attributes

The reviewed listing displays structured attributes in a two-column layout. Observed fields include:
- Area
- Price
- Bedrooms
- Listing type
- Property type
- Bathrooms count
- Rental duration

Observed example values:
- Area: `402`
- Price: `1907`
- Bedrooms: `1`
- Listing type: `rent`
- Property type: `studio`
- Bathrooms count: `1`
- Rental duration: `long_term`

These are observed fields, not an exhaustive schema; other listing/category types may expose different attributes.

#### Details

A **Details** section is present. Observed fields include:
- Publisher
- Publisher ID
- Contact cost
- Contact is free
- Location
- Submitted timestamp

Observed example values:
- Publisher: `Unknown`
- Publisher ID: `—`
- Contact cost: `1 coins`
- Contact is free: `Yes`
- Location: `North York, Ontario, CA`
- Submitted: `23 Sep 2026, 13:15`

#### Moderation actions

For the reviewed Pending/PendingReview listing, the drawer provides:
- **Approve** as the primary action
- **Reject** as the destructive/secondary action

The current reviewed UI does not show a rejection-reason field before the Reject action.

#### Current provenance visibility

The drawer currently shows a high-level `Crawled` badge, but the reviewed UI does not expose more detailed provenance such as whether a crawled listing originated from Telegram, which Telegram account/channel/user supplied it, or whether the listing was submitted directly by an Advertio user.

Telegram username and Telegram numeric user ID are also not visible in the reviewed drawer.

### Live listings

Observed live listings include:

- `Active` status
- `Crawled` badge for crawled listings
- Publisher
- Opened → Contacts counts
- Submitted timestamp
- `Take down` action

### Possible Duplicate queue

A dedicated **Possible Duplicate** view is currently implemented.

The queue displays:

- Candidate listing
- Matched-against listing
- Similarity percentage
- Detection timestamp
- Review action

The reviewed examples show crawled listings being compared and similarity percentages displayed for each duplicate candidate pair.

### Duplicate review

Selecting **Review** opens a side panel/drawer that:

- Shows the overall similarity percentage
- Shows the detection timestamp
- Displays Candidate and Matched Against side by side
- Displays listing source/status badges
- Displays listing title
- Displays location
- Displays submitted timestamp
- Displays listing identifier
- Provides a `Confirm duplicate` action
- Provides a `Not a duplicate` action

#### Current duplicate-resolution behavior

The current UI assumes:

- **Candidate**: "Would be removed if confirmed"
- **Matched Against**: "Stays as-is either way"

Therefore, the current implementation pre-decides which listing is removed when the duplicate is confirmed.

## Known Changes

- [Issue #2 — Let admin choose which duplicate listing to remove](https://github.com/abolfazl2600/Advertio/issues/2)
- Issue #17 — Show listing submission/source provenance in review drawer
- Issue #18 — Show linked Telegram username as a clickable profile link
- Issue #19 — Persist Telegram numeric user ID for listing/user provenance

Issue #2 changes the manual duplicate-resolution flow so the admin explicitly chooses which of the two listings should be removed. Until that issue is implemented, the behavior described under **Current duplicate-resolution behavior** remains the current state.

## Not yet documented

The detailed behavior of the following views has not yet been reviewed:

- Rejected
- Taken down
- Expired
- All

Do not infer their detailed behavior from this document.
