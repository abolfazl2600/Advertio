# Human Connections — Product Overview

> Status: **Development specification**
>
> Discovery is based on **Search + Active Filters**.

## 1. Category purpose

Human Connections is for listings where a user is looking for another person or group for a real activity, task, trip, study period, sport, hobby, or everyday need.

Examples from the original product source include:

- travel — travel date;
- study — exam/study period;
- location-based or remote participation;
- shopping buddy;
- document runner;
- pet-care exchange;
- gym/running/sports partners;
- hiking/activity groups;
- event buddy;
- board-game/gaming/book-club connections;
- photography walk;
- family/kids exchange use cases.


## 2. Product model

Canonical category:

```text
Human Connections
```

A listing describes what the user is looking for.

Examples:

```text
Looking for a tennis partner in North York this weekend
```

```text
Looking for a study partner remotely during the exam period
```

```text
Looking for someone travelling to Rome around 18 Oct
```

Advertio then lets users find these listings through:

- free-text Search;
- Active Filters;
- Saved Filters;
- normal Listing ranking.


## 3. Human Connections vs Social & Events

Recommended boundary:

### Human Connections

The listing is primarily:

> "I am looking for a person/group to do something with."

Examples:

- study partner;
- tennis partner;
- travel companion;
- shopping buddy;
- photography walk companion.

### Social & Events

The listing is primarily:

> "This event/meetup/activity exists."

Examples:

- public event;
- meetup;
- scheduled community activity.

This keeps person/companion requests separate from event publishing.

## 4. Discovery model

The user can:

1. open Human Connections;
2. enter an optional Search query;
3. activate one or more Filters;
4. browse results satisfying those Filters;
5. open a Listing;
6. contact through the normal Advertio contact flow;
7. optionally save the filter state for future alerts.

## 5. Active Filters principle

Active Filters are the canonical narrowing mechanism.

Typical dimensions:

- Connection Type
- Location / Remote
- Date / Date Range
- Activity
- Availability
- Language, when implemented
- Verification state, when a real verification state exists
- More Filters

The exact available filters can vary by connection type.

## 6. Search relationship

Search handles broad/free-text intent.

Example:

```text
tennis North York
```

Active Filters handle structured constraints.

Example:

```text
Connection Type = Sports
Activity = Tennis
City = North York
Date = This weekend
```

Search and Filters can be combined.

## 7. Saved Filter relationship

Human Connections is a high-value Saved Filter use case because the right listing may appear later.

Example:

```text
Sports · Tennis · North York · Weekend
```

A notification should be generated when a new Active Listing satisfies the saved filter conditions.

Alert eligibility uses the same Saved Filter conditions.

## 8. Current implementation boundary

Human Connections is a future/development category.

This document does not claim that a dedicated Human Connections feed, filters, posting flow, or Saved Filter UI is currently implemented.

## 9. Documentation map

- [attributes.md](./attributes.md) — structured listing fields
- [filters.md](./filters.md) — Active Filter contract
- [rules.md](./rules.md) — category invariants and safety
- [use-cases.md](./use-cases.md) — supported/possible use cases

## 10. Acceptance criteria

- [ ] Category is named Human Connections.
- [ ] Search + Active Filters are sufficient for discovery.
- [ ] Saved Filters can represent the same filter state.
- [ ] Human Connections remains distinct from event publishing.
