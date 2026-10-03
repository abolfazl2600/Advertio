# Advertio Backoffice — Current State

> Last documented from the current production/backoffice state on 3 Oct 2026.

This documentation records **what is currently visible/implemented in the Advertio Backoffice**. It is intended to be a development reference alongside the codebase.

## Documentation rules

- **Current Implementation** describes behavior observed in the current Backoffice.
- **Known Changes** links to GitHub issues for approved work that is not yet part of the current implementation.
- GitHub Issues are the source for work to be implemented; this documentation should not describe planned work as already implemented.
- Update these documents when the corresponding behavior changes.

## Current navigation observed

The Backoffice sidebar currently contains:

- Gate A
- Listings
- Policy & pricing
- Crawled sources
- Channels
- Users
- Payments
- Coin flow
- Wallet actions
- Your account

The **Gate A**, **Listings**, **Users**, and **Channels** sections have been documented in detail so far. The remaining sections should be documented after their current UI/behavior has been reviewed.

### Current Listings capability note

The Backoffice **Possible Duplicate** workflow includes admin-controlled duplicate resolution: the admin explicitly selects which listing in a duplicate pair should be removed, while the other listing remains unchanged. The `Not a duplicate` action resolves the review item without removing either listing.

See [Listings](./listings.md) for the current behavior.

### Current Users capability note

The Backoffice Users table includes a dedicated **Username** column alongside display name, phone, status, role, reputation, joined date, and row actions. Stored usernames are shown with the `@` prefix, while missing usernames use the neutral `—` placeholder.

The current Users UI also exposes **All**, **Active**, **Disabled**, **Verified**, and **Posted** filters, with search by name, username, phone, or ID.

Backoffice admins can also send a direct plain-text Telegram message to an individual Advertio user from the **Users** section using the existing Advertio bot integration.

See [Users](./users.md) for the current behavior.

### Current Channels capability note

The Backoffice Channels area supports automatic filtered publishing to configured Telegram destinations, per-channel Publish History, and manual recovery of failed deliveries.

Eligible failed Publish History records can be manually retried through the existing publishing pipeline, with Attempts representing actual delivery attempts.

Channels also expose **Historical matches** with **Not sent yet**, **Already sent**, and **All matching** views. Admins can select matching live listings and use **Send selected**, while the table exposes per-listing **Sent here** and **Latest delivery** state.

See [Channels](./channels.md) for the current behavior.

## Detailed documentation

- [Gate A](./gate-a.md)

- [Listings](./listings.md)
- [Users](./users.md)
- [Channels](./channels.md)
