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

**Verified** uses the canonical Advertio verification state. **Posted** identifies users who have created at least one listing through the canonical listing ownership/creator relationship.

Backoffice admins can also send a direct plain-text Telegram message to an individual Advertio user from the **Users** section using the existing Advertio bot integration.

See [Users](./users.md) for the current behavior.

### Current Channels capability note

The Backoffice Channels area supports automatic filtered publishing to configured Telegram destinations and now includes the following documented operational capabilities:

- destination verification through **Send test message**;
- data-driven Language/Country/Province/City selectors with dependent geographic filtering;
- schema-driven Category/Attribute filtering;
- per-channel **Total Sent** successful-delivery count;
- **Matches / Historical matches** with Not sent yet / Already sent / All matching;
- manual historical/backfill sends and intentional re-send path;
- per-listing Sent here / Latest delivery visibility;
- Publish History with human-readable listing titles and Listing IDs;
- listing-title navigation to Backoffice Listing Detail;
- Backfill status visibility;
- manual recovery of eligible failed deliveries;
- Attempts semantics based on actual delivery attempts.

See [Channels](./channels.md) for the current behavior.

## Detailed documentation

- [Gate A](./gate-a.md)

- [Listings](./listings.md)
- [Users](./users.md)
- [Channels](./channels.md)
