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

### Active listing detail / performance drawer

Selecting an Active listing opens a right-side detail drawer that extends the listing details with performance and monetization information.

#### Header / listing context

The reviewed Active listing drawer displays:
- Listing title
- Category and location/context line
- Close action

The reviewed example is an Active crawled housing listing.

#### Listing/payment details visible in the reviewed state

The visible portion of the drawer includes:
- Contact cost in coins
- Whether contact is free
- Location
- Submitted timestamp

Observed example values:
- Contact cost: `0 coins`
- Contact is free: `Yes`
- Location: `Toronto, Ontario, CA`
- Submitted: `23 Sep 2026, 13:07`

The upper portion of the drawer is not fully visible in the reviewed screenshot, so this documentation does not infer additional fields from it.

#### Performance

A dedicated **Performance** section is available with three summary cards:
- **Opened** — observed UI labels this as the last 30 days
- **Contacts**
- **Coins earned** — also shows coins earned per unlock

Observed example:
- Opened: `0` — last 30 days
- Contacts: `0` — `no traffic yet`
- Coins earned: `0` — `0 per unlock`

#### Who paid, and why the rest did not

The drawer contains a conversion/failure breakdown labelled **WHO PAID, AND WHY THE REST DID NOT**.

The UI states:
- values represent **unique people, last 30 days**;
- someone who opened the sheet twice counts once.

Observed funnel/breakdown rows:
- **Opened the listing**
- **Opened the price sheet**
- **Paid**
- **Got it free** — annotated as `free phase`
- **Never opened the sheet** — annotated as `the listing or the UI, not the price`
- **Could not pay** — annotated as `a top-up problem`
- **Would not pay** — annotated as `a price problem`

The reviewed example shows `0` for all of these rows.

#### Views per day

A **VIEWS PER DAY** section is present.

For the reviewed listing, the empty state says:
- `Nobody has opened this listing in the last 31 days.`

This indicates the UI has a per-day views area with a 31-day empty-state horizon in the reviewed implementation. Do not infer the exact chart behavior when data exists until that state is reviewed.

#### Publication lifecycle

The bottom of the Active listing drawer displays:
- **Published** date
- **Expires** date

Observed example:
- Published: `23 Sep 2026`
- Expires: `23 Oct 2026`

#### Moderation action

The Active listing drawer provides a full-width **Take down** action.

The reviewed UI does not show a take-down reason input in this state.

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
