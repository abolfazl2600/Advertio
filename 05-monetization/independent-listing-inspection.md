# Independent Listing Inspection

> Product Decision — updated 24 Sep 2026  
> This document records an approved Advertio product/monetization decision. It is not derived from the original Source Document.

## Working product name

**Independent Listing Inspection**

This replaces the narrower working idea **Property Checker** because the service is intended to work across multiple current and future listing categories.

Examples include:

- Housing / property
- Vehicles
- Electronics
- Cargo / shipment-related items
- Business/service locations
- other future Advertio listing categories

## Purpose

Advertio can coordinate an independent in-person inspection of the subject/location of a listing.

The service is designed for situations where a user cannot or does not want to inspect the listing personally.

The key product goal is broader than a private inspection for one requester:

**create higher-quality, independent, reusable information about the Listing so other Advertio users can better understand the listing without being physically present.**

## Who can request the inspection

Either side may initiate the request:

- the listing owner/publisher;
- an interested/listing-seeking user.

The operational service is the same in both cases.

Backoffice stores who requested it and their role, but the final inspection record is attached to the **Listing**, not only to the requester.

## Inspection output

Depending on category and agreed scope, an inspection may include:

- physical presence at the listing location;
- clear/professional photos;
- video;
- visible-condition documentation;
- basic/general category-appropriate checks;
- discovered issues;
- checks performed;
- checks not performed;
- inspection date;
- inspector/operator reference;
- structured report.

The report must distinguish observed facts and performed checks from assumptions.

The inspection does not automatically guarantee:

- ownership;
- legal title;
- authenticity;
- safety;
- hidden condition;
- future performance;

unless a future specific service explicitly provides such a guarantee.

## Examples

### Housing

Possible inspection content:

- overall visible condition;
- visible damage;
- interior/rooms;
- fixtures;
- appliances where included in scope;
- photos/video;
- visible comparison with listing description/media;
- checks performed/not performed.

### Vehicle

Possible inspection content:

- visible exterior/body condition;
- interior;
- obvious defects;
- agreed basic operational checks;
- photos/video;
- checks performed/not performed.

### Laptop / electronics

Possible inspection content:

- exterior condition;
- power-on;
- screen;
- keyboard;
- ports;
- agreed basic functionality;
- photos/video;
- issues found;
- checks performed/not performed.

These are examples only and are not universal inspection guarantees.

## MVP operating model

The first version is intentionally **Backoffice-only**.

No complete Mini App self-service inspection-order flow is required yet.

Requests may initially arrive through manual/support channels.

Backoffice becomes the canonical operational system for:

- request;
- requester;
- requester role;
- listing;
- scope;
- quote;
- payment;
- inspector assignment;
- scheduling;
- evidence;
- report;
- publication readiness;
- completion/delivery status.

This allows Advertio to validate demand, pricing, operating cost, inspector workflow, category-specific needs, and usefulness of the resulting listing information before automating the customer-facing experience.

## Pricing

There is no single global price.

Price may vary based on:

- category;
- country/city/location;
- travel distance;
- inspection complexity;
- required expertise;
- requested tests/evidence;
- urgency;
- operating cost.

Backoffice must support per-request quoting.

Payment design should remain compatible with:

- Advertio Coins;
- supported manual/alternative payment methods;
- future payment rails.

## Monetization role

Independent Listing Inspection is a paid Trust/Operations service.

Revenue is generated from the inspection fee/quote charged for coordinating and delivering the inspection.

The initial objective is operational validation rather than fixed automated pricing.

## Backoffice requirements

Backoffice should support:

- Inspection Request ID
- Listing ID
- requester User ID
- requester role
- listing owner User ID where available
- category
- inspection location
- requested scope
- quote and currency
- optional Coin equivalent
- payment method/status/reference
- assigned inspector/operator
- planned inspection date/time
- completion date/time
- photos/videos/documents
- checks performed/not performed
- observations/issues
- report
- public/listing-facing summary
- internal-only evidence
- publication-safe evidence
- publication readiness/status
- internal notes
- audit history

## Listing-level inspection record

The completed inspection is a **listing-level trust record**.

The data model should support:

- more than one inspection for the same Listing over time;
- latest inspection date;
- inspection scope;
- report reference;
- publishable summary;
- publishable evidence references;
- publication status;
- freshness/validity information if introduced later.

This matters because the inspection result is intended to help other users viewing the same listing, regardless of who originally requested or paid for it.

## Publication model

The first version does not require the final Mini App inspection-report UI.

However, Backoffice must support preparation of the result for later listing publication.

Operations should be able to distinguish:

- internal-only evidence;
- publication-safe evidence;
- report not ready for publication;
- report ready for publication.

Requester identity does not need to be publicly shown.

Future listing-facing information should focus on:

- inspection date;
- inspection scope;
- findings;
- evidence;
- checks performed/not performed;
- limitations.

## Trust semantics

Do not create a generic permanent **Verified Listing** badge in this MVP.

A physical condition can change over time.

Any future public inspection signal must preserve at least:

- inspection date;
- inspection scope.

A future public label may use wording such as **Inspected** or **Independent inspection available**, but the final Mini App UI is outside this Backoffice MVP.

## Privacy

Do not publish by default:

- requester identity;
- internal admin notes;
- private operational addresses/contact details;
- inspector private contact information;
- internal-only evidence.

Backoffice may retain this information for operations and audit purposes.

## Future expansion

Possible later phases include:

- Mini App inspection-request flow;
- listing-facing inspection report/summary;
- category-specific checklists;
- inspector network/matching;
- inspector mobile app;
- downloadable/shareable reports;
- automated pricing;
- AI-assisted report drafting.

## Related implementation

- GitHub issue #29 — Listing-level Independent Inspection service MVP
