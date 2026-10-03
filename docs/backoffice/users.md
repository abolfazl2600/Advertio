# Backoffice — Users

> Current-state documentation based on the reviewed Backoffice UI as of 3 Oct 2026.

## Current Implementation

### Filters

The Users section currently provides:

- All
- Active
- Disabled

### Search

The search UI indicates support for:

- Name
- Username
- Phone
- ID

### Users table

The currently observed table includes:

- User / display name
- Phone
- Status
- Verification indicator when applicable
- Role
- Reputation
- Joined date
- Row actions menu

Observed values include:

- `Active` user status
- `Verified` indicator next to verified phone/user information
- `User` role
- Reputation displayed numerically

Some users currently display no phone value and use the UI's empty-value representation.

### Row actions

A three-dot row-actions control is present for each user.

The current Users flow includes a **Send message** action that allows an admin to send a direct Telegram message to the selected Advertio user through the existing bot integration.

## Direct Telegram messaging

Backoffice admins can send a plain-text message directly to an individual Advertio user from the **Users** section.

The reviewed current UI includes a **Send message** modal with:

- selected user's display name;
- Telegram username when available;
- a clear note that delivery is performed by the Advertio bot to the user's Telegram chat;
- plain-text message textarea;
- character counter with a 4,096-character limit shown in the UI;
- **Send via Telegram** primary action;
- Cancel action.

The current product behavior follows the completed scope of [Issue #4 — Send direct Telegram message to a user](https://github.com/abolfazl2600/Advertio/issues/4).

Expected/current operational rules for this feature include:

- delivery is performed through the existing Advertio Telegram bot/integration;
- the selected Advertio user's linked Telegram identity/chat is used as the destination;
- an admin does not manually enter a Telegram chat ID;
- empty messages are not valid submissions;
- duplicate submission should be prevented while sending;
- successful delivery should provide clear confirmation;
- failed/unavailable Telegram delivery must not be reported as success;
- bot credentials and internal Telegram identifiers are not exposed in Backoffice.

The supplied current-state UI confirms the composer, Telegram delivery context, selected user identity, message field, character counter, Cancel action, and **Send via Telegram** action.

## Current Users feature set

The currently documented Users capabilities include:

- All / Active / Disabled filters;
- user search;
- user table with status, verification, role, reputation, and joined date;
- row-actions menu;
- direct admin-to-user Telegram messaging through the Advertio bot.

## Known Changes

- [Issue #3 — Add username column to Users table](https://github.com/abolfazl2600/Advertio/issues/3)

### Important current-state distinction

Although the search UI already mentions **username**, the reviewed table does **not currently display a dedicated Username column**. That is tracked by Issue #3.

## Not yet documented

The following behavior has not yet been reviewed and should not be inferred from this document:

- Other row-action menu options beyond the documented Send message flow
- User detail/profile view, if any
- Disable/enable workflow details
- Role-management workflow, if any
- Reputation-management workflow, if any
