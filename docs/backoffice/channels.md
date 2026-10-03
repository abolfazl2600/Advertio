# Backoffice — Channels

> Current-state documentation based on the reviewed Backoffice UI and completed channel-delivery behavior as of 3 Oct 2026.

## Purpose

The Channels section manages automatic publishing of Advertio listings to configured Telegram channels or groups.

The current UI states that a listing is published to a channel when it becomes Active if it matches every configured filter. It also states that a listing is not sent twice and that failed sends are retried and logged rather than silently dropped.

## Current Implementation

### Channels list

The Channels page currently displays:

- Channel name
- Telegram destination / handle
- Configured filter summary
- Status
- **Total Sent**
- Last matched time
- **Matches** action
- History action
- Edit action
- Deactivate action
- Create channel action

Observed channels are shown with an `Active` status.

`Last matched` may contain a relative time or `Never`.

#### Total Sent

Each channel row exposes a **TOTAL SENT** value representing cumulative successful Telegram delivery events for that channel.

Observed examples in the reviewed UI include values such as:

- `30`
- `14`
- `0`

A channel with no successful deliveries displays `0`.

The metric is a successful-delivery/event count rather than a unique-listing count. It is intended to include successful automatic sends and successful admin-triggered/backfill deliveries according to the persisted delivery history.

This is the implemented outcome of [Issue #10 — Show total sent message count per channel](https://github.com/abolfazl2600/Advertio/issues/10).

### Automatic publishing

Based on the current UI:

- Listings are evaluated when they become Active.
- A listing is published to a configured destination when it matches all filters configured for that channel.
- Duplicate delivery of the same matched listing to the same channel is prevented.
- Failed sends are retried and logged.

### Create / Edit channel

The reviewed Edit Channel form contains the following configuration.

#### Basic configuration

- **Name**
- **Destination**
  - Telegram chat ID or `@channelusername`
  - UI notes that the bot must already be an admin of the destination.
- **Send test message**
  - Available in the channel configuration flow.
  - Uses the currently entered Destination.
  - Sends through the existing Advertio Telegram bot integration.
  - The reviewed UI shows actionable destination errors when Telegram cannot resolve/reach the configured destination.

Observed failure example:

```text
Telegram can't find that destination. Check the @username or chat id — and a private channel or group only resolves once the bot has been added to it.
```

The test-send flow is the implemented outcome of [Issue #5 — Add Test Channel / Send Test Message](https://github.com/abolfazl2600/Advertio/issues/5).

#### Filters

- **Category**
  - Can be left unset to match any category.
- **Language**
  - Locale used for the outgoing message, e.g. `en-CA` or `fa-IR`.
- **Country**
- **Province**
- **City**

The form indicates that a blank filter matches any value for that filter.

#### Attribute & tag filters

Attribute & tag filters are implemented as schema-driven selectors rather than raw free-text key/value fields.

Current UI behavior:

- **Attribute** is selected from a dropdown using human-readable names.
- The corresponding **Value** is selected through a validated dropdown/control appropriate to that attribute.
- The available attributes/values are category-aware where applicable.
- Existing filters can be removed individually.
- **Add filter** adds another attribute/value row.
- Every configured row must match for a listing to qualify.

Observed examples in the reviewed Housing & Roommate channel:

- `Property Type → Condo`
- `Rental Duration → Short Term`

The underlying canonical attribute keys remain an implementation detail rather than something the admin has to type manually.

This is the implemented outcome of [Issue #9 — Replace attribute key/value text filters with schema-driven dropdowns](https://github.com/abolfazl2600/Advertio/issues/9).

### Channel actions

Observed actions:

- **History**
- **Edit**
- **Deactivate**

A **Create channel** action is also available at page level.

### Historical matches

Channels currently expose a **Historical matches** view for reviewing live listings that match a channel's configured filters, regardless of how long those listings have already been live.

The reviewed Historical matches UI includes three result states:

- **Not sent yet**
- **Already sent**
- **All matching**

The reviewed example for `Advertio Ontario` showed:

- Not sent yet: `18`
- Already sent: `77`
- All matching: `95`

#### Historical match delivery queue

The UI indicates that selected/scheduled historical matches are queued for delivery and that the latest delivery result is reflected in the table.

An observed status banner showed:

```text
Queued 9 listings — watch Latest delivery for each result.
```

#### Historical matches table

The reviewed table contains:

- Selection checkbox
- Listing title
- Listing ID
- Location
- Live since
- Sent here
- Latest delivery

The UI also provides:

- **Select this page**
- **Send selected**

#### Not sent yet state

For listings that have not previously been delivered to the channel:

- `Sent here` displays `Never`
- `Latest delivery` has no prior delivery state

The admin can select listings and use **Send selected** to queue them for delivery to the current channel.

#### Already sent state

For previously delivered listings, the UI shows:

- number of times sent to this channel, e.g. `1 time`
- relative time of the latest send, e.g. `last about 6 hours ago`
- latest delivery status, observed as `Sent`

The reviewed rows include listing title/ID, location, how long the listing has been live, channel-send history, and latest delivery status.

#### All matching state

The **All matching** tab combines the channel's currently matching live listings regardless of whether they have already been sent.

The reviewed UI preserves per-listing send history and latest delivery information in this combined view.

#### Historical-match send behavior

The current UI communicates that historical matches are live listings matching the channel's current filters, regardless of how long they have already been live.

Manual selection and **Send selected** allow admins to queue matching listings for channel delivery while retaining per-listing delivery history.

The reviewed UI confirms that previously sent listings remain visible and can be selected again. This provides the admin-controlled path for intentional re-send/backfill while keeping automatic publishing idempotency separate.

Observed examples:

- `Vancouver_house`: `Not sent yet 0`, `Already sent 14`, `All matching 14`
- Previously sent rows show values such as `1 time` and a relative latest-send time.
- Latest delivery is shown as `Sent` for successful historical sends.

Historical matching uses the channel's configured filter set (category/location/attribute filters) rather than a separate ad-hoc filter definition.

This is the implemented outcome of [Issue #11 — Add historical matching and manual backfill publishing](https://github.com/abolfazl2600/Advertio/issues/11).

This flow is separate from automatic publish-on-activation behavior and separate from failed-record **Retry** in Publish History.

### Publish history

Each channel has a Publish History view.

The history table includes:

- **Listing title**
- Listing identifier
- Status
- Attempts
- Last error
- Created time

#### Human-readable listing reference and listing navigation

The Listing column shows the **listing title** as the primary human-readable reference, with the Listing ID underneath for technical identification.

The title is used to open the corresponding listing in Backoffice. The reviewed current UI also shows the resulting listing-detail drawer, including category/location context, source/provenance, photos, description, attributes, and details.

This is the implemented outcome of [Issue #6 — Show clickable listing title in Publish History](https://github.com/abolfazl2600/Advertio/issues/6).

#### Publish source/status

The reviewed Publish History rows can display additional delivery-source context such as:

- `Sent`
- `Backfill`

Observed Backfill rows show `Attempts = 1` and no Last Error after successful delivery.

The **Attempts** value represents the number of actual delivery attempts made for that publish record, including automatic attempts and eligible manual retries that reuse the same publish record.

#### Manual retry for failed publish records

Manual retry for failed channel publications is implemented.

Current behavior:

- Failed publish-history records that are eligible for retry expose a **Retry** action.
- Successfully sent records are not eligible for manual retry through this action.
- Retry uses the existing Advertio channel publishing / Telegram delivery pipeline rather than a separate direct-send path.
- The Retry action is disabled while a retry is in progress to prevent duplicate/concurrent submissions.
- A successful retry updates the publish record to its success state.
- A successful retry updates the Attempts count and clears/updates Last Error as appropriate.
- A failed retry keeps the record in a failed state.
- A failed retry updates Attempts according to actual delivery attempts and retains the latest relevant delivery error.
- Retry targets the original listing and the original configured channel/destination.
- Existing idempotency / duplicate-send protections remain in effect.

This is the implemented outcome of [Issue #7 — Add manual retry for failed publish messages](https://github.com/abolfazl2600/Advertio/issues/7).

> The UI screenshots supplied in the 3 Oct 2026 review show the Channels **Historical matches** workflow rather than a failed Publish History row, so the current Retry control itself is not visually evidenced by those screenshots. Completion of #7 is recorded from the product status supplied for this review.

## Current behavior that should be preserved

- Channel-specific filtering
- Automatic publishing when a listing becomes Active and matches all configured filters
- Per-channel destination configuration
- **Send test message** for channel destination verification
- Actionable Telegram destination validation/error feedback
- Localization/language configuration for outgoing messages
- **Schema-driven attribute/tag filters**
- Category-aware attribute/value selectors where applicable
- Prevention of duplicate sends for normal automatic publishing
- **Total Sent** successful-delivery metric per channel
- Automatic retry/logging behavior for failed sends
- Manual Retry for eligible failed Publish History records
- Consistent Attempts semantics based on actual delivery attempts
- Per-channel Publish History
- Human-readable Listing title + Listing ID in Publish History
- Listing-title navigation to Backoffice listing detail
- Backfill delivery identification in Publish History
- Historical matches with Not sent yet / Already sent / All matching views
- Manual selection and **Send selected** for historical matching listings
- Intentional admin re-send/backfill path for previously sent listings
- Per-listing Sent here and Latest delivery visibility
- Ability to edit and deactivate channels

## Not yet documented

The reviewed UI does not establish the detailed behavior for:

- Create Channel save-validation beyond the observed destination test behavior
- Reactivating a deactivated channel
- Exact automatic retry policy/backoff and retry limit
- A current visual example of a failed Publish History row and its Retry control
- Exact Telegram permission diagnostics beyond the observed destination-resolution error
- Message template/content configuration
- Ordering/priority when multiple channels match the same listing
- Pagination behavior for very large Historical matches result sets
- Whether **Select this page** selects only the visible page or all currently filtered results in every pagination state
- Exact confirmation UX when intentionally re-sending already-sent historical matches

Do not infer these behaviors from this document.
