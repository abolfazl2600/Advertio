# Independent Listing Inspection

> Product Decision — 24 Sep 2026  
> This document records a new approved Advertio product/monetization decision. It is not derived from the original Source Document.

## Working product name

**Independent Listing Inspection**

This name replaces the narrower working idea **Property checker** because the service is intended to work across multiple current/future categories.

Potential examples include:

- Housing / property
- Vehicles
- Electronics
- Cargo / shipment-related items
- Business/service locations
- other future Advertio listing categories

## Purpose

A user may pay Advertio to coordinate an independent in-person inspection of the subject of a listing.

The service is intended to:

- increase trust;
- reduce uncertainty;
- reduce the need/cost for the requester to travel for an initial inspection;
- provide documented third-party observations;
- create an operational paid service for Advertio.

Either side of a marketplace transaction may request the service when product/operational rules allow it.

## Inspection output

Depending on the category and agreed scope, an inspection may include:

- physical presence at the listing location;
- photos;
- video;
- visible-condition documentation;
- basic/general tests;
- discovered issues;
- tests performed;
- tests not performed;
- inspection date;
- inspector/operator reference;
- a structured report.

The report must distinguish observed facts and performed checks from assumptions.

An inspection does not automatically guarantee ownership, legal title, authenticity, safety, or future performance unless a future specific service explicitly provides such a guarantee.

## MVP operating model

The first version is intentionally **Backoffice-only**.

A complete Mini App self-service flow is not required yet.

Operations can receive requests through existing manual/support channels while Backoffice provides the canonical record for:

- request;
- quote;
- payment;
- assignment;
- scheduling;
- evidence;
- report;
- completion/delivery status.

This allows Advertio to validate demand, operational cost, category-specific requirements, and pricing before automating the customer-facing flow.

## Pricing

There is no single global price in the initial model.

Price may vary based on:

- category;
- country/city/location;
- travel distance;
- inspection complexity;
- required expertise;
- requested tests/evidence;
- urgency;
- operational cost.

Backoffice must support per-request quoting.

Payment should be compatible with:

- Advertio Coins;
- supported manual/alternative payment methods;
- future payment rails.

## Monetization role

Independent Listing Inspection is a paid trust/operations service.

Revenue is generated from the inspection fee/quote charged for coordinating and delivering the inspection service.

The initial objective is operational validation rather than fixed automated pricing.

## Backoffice requirements

Backoffice should support:

- inspection request ID;
- listing/user linkage;
- category and location;
- requested scope;
- quote and currency;
- optional Coin equivalent;
- payment method/status/reference;
- assigned inspector/operator;
- planned inspection date/time;
- photos/videos/documents;
- checks performed/not performed;
- findings/issues;
- report;
- completion/delivery status;
- internal notes;
- audit history.

## Future expansion

Possible later phases include:

- Mini App request flow;
- category-specific checklists;
- inspector network/matching;
- public inspection summary/badge;
- downloadable/shareable reports;
- automated pricing;
- AI-assisted report drafting.

These are not part of the first Backoffice-only MVP.

## Related implementation

- GitHub issue #29 — Independent Listing Inspection service MVP
