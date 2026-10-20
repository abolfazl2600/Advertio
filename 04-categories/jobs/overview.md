# Jobs — Current Implementation Overview

> **Status:** Implemented in GitLab master on 2026-10-19 (JOBS-01). Current geography is Canada only. This is an implementation summary, not a production deployment audit. The detailed pre-launch proposal is preserved in [pre-launch-design.md](./pre-launch-design.md); where it conflicts with this file, this file describes the shipped scope. Other detailed documents in this directory may retain proposal-level requirements; use this overview and its explicit gap list as the current implementation boundary.

## Shipped behavior

- Backend journey slug: jobs.
- Role options: Hiring and Looking for work (employer/seeker).
- Posting is a single-screen flow with four required choices: role, job category, city and hours. No free-text field is required.
- The title is generated from the answers. Job title, salary, work arrangement and note are optional details.
- Job category uses a closed taxonomy of 18 categories; it is not free text.
- Salary is stored in CAD with a period of hour, month or year. If no salary is provided, the UI does not show an invented “negotiable” value.
- Work arrangement is separate from employment type and supports on-site, hybrid and remote.
- City selection is Canada-only and returns the province from the catalog without a separate province step.
- The feed filters by role, job category and city on the server.
- Details show the job, location, disclosed pay and key facts, followed by the shared contact flow and a job-scam warning.
- Jobs is connected to the Hub, Post chooser, global Search, Saved and My listings.
- Contact/payment policy uses the current Housing policy values as the starting point; category policy remains configurable.
- Gate A metrics include a Jobs category selection.

## Explicit limits of JOBS-01

The following were intentionally left out and must not be described as shipped:

- Multiple active job listings per employer; the existing one-active-listing rule still applies.
- Jobs crawler ingestion.
- A Filled status or dedicated filled-job lifecycle.
- External application methods such as an application URL or email.
- Jobs-specific scam signals in the backoffice.

## Related documents

- [Job taxonomy](./job-taxonomy.md)
- [Posting flow design notes](./posting-flow.md)
- [Attributes](./attributes.md)
- [Filters](./filters.md)
- [Rules](./rules.md)
- [Pre-launch design notes](./pre-launch-design.md)
- [Current implementation status](../../03-product/current-capabilities.md)
