# Backoffice — Channels

> Current-state documentation based on the reviewed Backoffice UI as of 23 Sep 2026.

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
- Last matched time
- History action
- Edit action
- Deactivate action
- Create channel action

Observed channels are shown with an `Active` status.

`Last matched` may contain a relative time or `Never`.

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

The UI supports adding one or more key/value filters:

- Attribute key
- Value
- Add filter
- Remove filter

The current UI states that every configured row must match the listing's attributes.

### Channel actions

Observed actions:

- **History**
- **Edit**
- **Deactivate**

A **Create channel** action is also available at page level.

### Publish history

Each channel has a Publish History view.

The reviewed history table contains:

- Listing identifier
- Status
- Attempts
- Last error
- Created time

Observed successful records use the `Sent` status. Successful examples show `0` attempts and no Last Error value.

## Current behavior that should be preserved

- Channel-specific filtering
- Automatic publishing when a listing becomes Active and matches all configured filters
- Per-channel destination configuration
- Localization/language configuration for outgoing messages
- Attribute/tag filtering
- Prevention of duplicate sends
- Retry/logging behavior for failed sends
- Per-channel publish history
- Ability to edit and deactivate channels

## Not yet documented

The reviewed UI does not establish the detailed behavior for:

- Create Channel validation and save flow
- Reactivating a deactivated channel
- Exact retry policy/backoff and retry limit
- Exact definition of the `Attempts` counter
- Failed-history examples and error presentation
- Telegram group vs. channel permission validation behavior
- Message template/content configuration
- Ordering/priority when multiple channels match the same listing

Do not infer these behaviors from this document.
