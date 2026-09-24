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

Issue #2 changes the manual duplicate-resolution flow so the admin explicitly chooses which of the two listings should be removed. Until that issue is implemented, the behavior described under **Current duplicate-resolution behavior** remains the current state.

## Not yet documented

The detailed behavior of the following views has not yet been reviewed:

- Rejected
- Taken down
- Expired
- All

Do not infer their detailed behavior from this document.
