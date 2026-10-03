# Jobs — Listing Card

> Status: **Jobs V1 proposed Mini App presentation**.

## Goal

A Jobs card should communicate enough information to decide whether to open the listing without overloading the feed.

## Recommended card

```text
💼 Warehouse Associate

ABC Logistics
Toronto, Ontario

$21–$24/hour
Full-time · On-site

Posted 3h ago
```

Without salary:

```text
💼 Graphic Designer

XYZ Studio
Richmond Hill, Ontario

Part-time · Hybrid

Posted 1d ago
```

## Display priority

1. Job title
2. Company
3. Location / Remote scope
4. Salary when disclosed
5. Employment type
6. Work arrangement
7. Relative publication time

Optional badge layer:

- Verified employer
- Boosted
- Urgent

Only show badges that exist in canonical runtime state.

## Missing values

Never display fake defaults.

Do not show:

```text
Salary $0
Unknown company
Unknown city
0 years experience
```

Omit optional lines instead.

## Remote card

Recommended:

```text
Remote — Canada
```

rather than only:

```text
Remote
```

because geographic/legal scope may still matter.

## Crawled listing

Crawled status does not need to dominate the feed card, but the supply source must remain available to detail/moderation/analytics logic.

## Acceptance criteria

- [ ] Job title and company are visible on every native Jobs card.
- [ ] Salary is shown only when disclosed.
- [ ] Employment type and work arrangement are concise.
- [ ] Optional missing values are omitted.
- [ ] Remote listings display meaningful geographic scope.
- [ ] Card opens the canonical Job Detail.
