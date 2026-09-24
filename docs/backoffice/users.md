# Backoffice — Users

> Current-state documentation based on the reviewed Backoffice UI as of 23 Sep 2026.

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

A three-dot row-actions control is present for each observed user. Its existing menu contents have not yet been reviewed, so this document does not infer which actions are currently available.

## Known Changes

- [Issue #3 — Add username column to Users table](https://github.com/abolfazl2600/Advertio/issues/3)
- [Issue #4 — Send direct Telegram message to a user](https://github.com/abolfazl2600/Advertio/issues/4)

### Important current-state distinction

Although the search UI already mentions **username**, the reviewed table does **not currently display a dedicated Username column**. That is tracked by Issue #3.

Direct admin-to-user Telegram messaging from the Users section is **not documented as an existing feature** and is tracked as new work by Issue #4.

## Not yet documented

The following behavior has not yet been reviewed and should not be inferred from this document:

- Existing row-action menu options
- User detail/profile view, if any
- Disable/enable workflow details
- Role-management workflow, if any
- Reputation-management workflow, if any
