# Backoffice — Listing inspections

> Inspections is an operations workflow for an independent inspection service. It is separate from ordinary listing moderation and from the public listing's lifecycle.

## 1. Queue

The page is paginated (25 rows per page) and provides filters:

- Open
- New
- Awaiting payment
- Report preparation
- Completed
- Cancelled
- All

The queue shows requester identity and role, inspection status, publication-ready state, quoted amount/currency, payment status/coin equivalent, inspector reference and scheduled/inspected dates. It can be filtered to inspections associated with a particular listing.

A new request can be created from Backoffice with:

- Listing ID.
- Requester's Advertio user ID.
- Requester role: listing owner, interested user or other.
- Requested scope.
- Request notes.

The server checks that the requester role is consistent with the listing/owner relationship.

## 2. Inspection drawer

The drawer is the record for the entire operation. Each section saves independently because the work may span multiple days. Changes are audited in the inspection history.

### Status

The record moves through the operational states used by the queue: New, AwaitingPayment, ReportPreparation, Completed or Cancelled. Open is a queue filter for non-closed work, not a separate persisted status. Cancellation records a reason.

### Request

Contains who requested the inspection, their role, the listing reference, requested scope and internal request notes.

### Pricing and payment

Stores the quote amount/currency and payment state, including coin equivalent when applicable. A quote is distinct from payment confirmation; the operator should not treat a quote as paid.

### Operations

Stores inspector reference, scheduled date/time, actual inspection date/time, outcome/checklist information and operational notes.

### Evidence

Allows inspection evidence to be attached to the record. Evidence remains part of the inspection's internal record; only the designated public summary can be prepared for listing publication.

### Report

Stores the report/public summary and internal notes. The public summary is separate from private operational notes and requester identity.

### Publication

A separate Ready / Not ready control indicates whether the report may be shown to people viewing the listing later. Marking the report Ready does not expose internal notes or who requested the inspection.

### Notes and history

- Internal notes are retained with the inspection.
- The History section records actor, timestamp, action and detail.
- Completed/cancelled inspections are effectively read-only for operational fields; closed records can still receive internal notes where the UI allows it.

## 3. Listing drawer integration

A listing's Backoffice detail drawer shows its inspection history, whether a completed inspection exists, the last inspected date and the count of reports marked ready for publication. An **Open in Inspections** link opens the full operational record filtered to that listing.

## 4. Scope boundary

This is an operational request/quote/visit/evidence/report workflow. It does not automatically publish a report merely because an inspection is completed, and it is not the same as approving a marketplace listing in the Listings moderation queue.

## Related pages

- [Listings](./listings.md)
- [Payments](./payments.md)
