# Jobs — Development Overview

> Status: **Development specification**
>
> Current verified product state as of 3 Oct 2026:
> - Jobs is visible in Telegram Bot category selection.
> - Jobs is still **Coming Soon** in the Mini App.
> - A dedicated Jobs feed/filter/detail experience is not yet verified as implemented.
>
> The specification below expands the original Advertio product source so the Jobs category can be implemented without requiring the developer/AI agent to invent core product decisions.

## Product objective

Jobs should initially solve one focused marketplace problem:

> An employer/recruiter publishes a structured job opening, and a job seeker discovers it using location, job category, employment type, salary and work arrangement, then uses an official Advertio contact/apply action.

Jobs V1 is **not** intended to be a full ATS, resume platform or LinkedIn replacement.

## Product priority

The original Advertio source defines Jobs as the **second category priority after Housing**, with an initial emphasis on **General Jobs / daily work**.

Source-defined rationale:

- high demand;
- serious/high-intent users;
- monetization opportunity on the job-seeker side;
- General Jobs / daily work as the initial focus.

## Jobs V1 scope

Recommended V1 scope:

- employer/recruiter job openings only;
- Canada-first location model using Advertio canonical geography;
- General Jobs-oriented taxonomy;
- structured posting;
- admin moderation;
- Jobs feed;
- Jobs filters;
- Job detail;
- official contact/apply actions;
- crawler support;
- duplicate/fraud controls;
- lifecycle/expiry;
- analytics.

Out of scope for Jobs V1:

- resume builder;
- CV parsing;
- applicant tracking system;
- interview scheduling;
- AI candidate scoring;
- job-seeker public marketplace;
- employer subscription plans;
- skill assessments;
- LinkedIn import;
- automatic candidate matching;
- visa-eligibility engine.

## Core user flows

### Employer / poster

```text
Post
→ Jobs
→ Job form
→ Preview
→ Submit
→ Pending
→ Admin review
→ Active
→ Views / Contact / Apply
→ Filled / Deactivated / Expired
```

### Job seeker

```text
Jobs
→ Search / Filters
→ Job card
→ Job detail
→ Contact / Apply
```

### Crawled job

```text
Telegram source
→ Crawler
→ Normalize / classify / validate
→ Advertio crawler ingest
→ Moderation / publication rules
→ Jobs feed
→ External Telegram/source contact
```

## Documentation map

- [attributes.md](./attributes.md) — canonical Jobs V1 data model
- [filters.md](./filters.md) — category-specific filtering
- [general-jobs.md](./general-jobs.md) — initial General Jobs focus
- [job-taxonomy.md](./job-taxonomy.md) — proposed canonical job categories
- [posting-flow.md](./posting-flow.md) — employer listing creation
- [listing-card.md](./listing-card.md) — feed card presentation
- [listing-detail.md](./listing-detail.md) — detail-page structure
- [employer-model.md](./employer-model.md) — poster/employer identity and trust
- [application-contact.md](./application-contact.md) — contact/apply methods
- [moderation-safety.md](./moderation-safety.md) — fraud/scam and admin moderation
- [crawler-mapping.md](./crawler-mapping.md) — Jobs crawler contract
- [lifecycle.md](./lifecycle.md) — statuses, expiry, Filled, Extend and Boost
- [analytics.md](./analytics.md) — events and KPIs
- [monetization.md](./monetization.md) — current source model and unresolved Early Access decision
- [rules.md](./rules.md) — category-level invariants

## Source-derived vs proposed

This folder deliberately separates:

- **Current verified** — behavior visible in the current product;
- **Source-defined** — behavior explicitly present in existing Advertio product docs;
- **Jobs V1 proposed** — product decisions added here to make implementation possible.

Proposed values should become canonical only once implemented/approved.

## Acceptance criteria

Jobs documentation is development-ready when:

- [x] Every major Jobs surface has a dedicated specification.
- [x] Required and optional fields are defined.
- [x] Filter behavior is defined.
- [x] Posting and moderation flow is defined.
- [x] Employer identity/trust behavior is defined.
- [x] Contact/application paths are defined.
- [x] Crawler mapping and provenance rules are defined.
- [x] Lifecycle and Jobs-specific `Filled` state are defined.
- [x] Analytics events and category KPIs are defined.
- [x] Acceptance criteria live inside the relevant files instead of a separate acceptance-criteria document.
