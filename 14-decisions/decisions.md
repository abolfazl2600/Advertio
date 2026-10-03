# Advertio — Product & Data Model Decisions

> Status: **Authoritative decision log**
>
> Effective date: **3 Oct 2026**
>
> This file resolves product conflicts that would otherwise force the Data Model or implementation to guess.
>
> When an older source-derived document conflicts with an **Accepted** decision in this file, this file is the canonical target-state decision. Older documents may still preserve historical source wording for traceability.

## Decision format

Each decision contains:

- **Status**
- **Context**
- **Decision**
- **Data Model consequence**
- **Implementation consequence**

---

## DEC-001 — Listing approval, publication and status

**Status:** Accepted

### Context

Existing source material uses both `Approved` and `Published` after Admin moderation, without defining whether they are two states or two names for the same state.

### Decision

`Approved` and `Published` are **not canonical Listing statuses**.

Canonical Listing status:

```text
draft
pending_review
active
inactive
expired
rejected
taken_down
```

Category-specific closure reasons are stored separately, for example:

```text
inactive_reason:
- user_deactivated
- filled
- cancelled
- completed
- other
```

Publication workflow:

```text
pending_review
→ Admin approves
→ status = active
→ approved_at = timestamp
→ approved_by = admin user
→ published_at = timestamp
```

Therefore:

- **Approved** = moderation decision/event.
- **Published** = publication event represented by `published_at`.
- **Active** = current public lifecycle state.

### Data Model consequence

Listing should support at least:

- `status`
- `approved_at`
- `approved_by`
- `published_at`
- `inactive_reason`

A moderation/audit log can preserve Approve/Reject/Take Down actions.

### Implementation consequence

Do not create separate long-lived Listing states named `approved` and `published` in the canonical state machine.

---

## DEC-002 — Active Listing limits are category policy, not a global database constraint

**Status:** Accepted

### Context

Original source says one Active Listing per User per Category.

That does not fit categories such as Jobs, Cargo, or Social & Events where legitimate users may need several simultaneous listings.

Crawler listings also should not block a user from posting a native listing.

### Decision

There is **no global database uniqueness rule** enforcing one Active Listing per User per Category.

The limit belongs to Category Policy.

Recommended configuration:

```text
active_listing_limit:
  integer | null

null = no fixed product cap; abuse is controlled by moderation/rate limits.
```

Current target policy:

| Category | Active listing policy |
| --- | --- |
| Housing | 1 native Active Listing per User |
| Jobs | Multiple allowed; configurable/rate-limited |
| Cargo | Multiple allowed; configurable/rate-limited |
| Human Connections | Multiple allowed; configurable/rate-limited |
| Social & Events | Multiple allowed; configurable/rate-limited |
| Services | Keep default 1 until Services spec is finalized |
| Peer Exchange | Keep default 1 if/when enabled, pending dedicated risk review |

Crawled listings do **not** consume a native user's active-listing quota.

### Data Model consequence

Do not add a universal unique index equivalent to:

```text
UNIQUE(user_id, category_id) WHERE status = active
```

Category policy should define the allowed active count.

### Implementation consequence

Eligibility checks query the Category Policy and current native Active Listings.

---

## DEC-003 — Early Access uses paid-first → free-later

**Status:** Accepted

### Context

Source contains two opposite models:

- paid contact early, then free;
- free contact early, then paid later.

The term **Early Access** is semantically consistent with the first model.

### Decision

Canonical Early Access direction:

```text
Listing becomes Active
→ Early Access window starts
→ paid/restricted contact during configured window
→ window ends
→ normal free contact
```

Early Access is a **contact-access/monetization policy**, not a Listing lifecycle status.

Rules:

- starts at `published_at`;
- duration is Admin/category/country configurable;
- no hard-coded Day 1–3 or 30-hour value in the Data Model;
- if Early Access is disabled, normal contact is available immediately;
- crawled listings always bypass native contact monetization and use free source/external contact;
- Social & Events default to free contact;
- Coin deduction only occurs through the official contact action.

### Data Model consequence

Recommended policy fields belong to category/pricing configuration, not the Listing status enum.

Listing may store resolved timestamps when needed:

- `early_access_starts_at`
- `early_access_ends_at`

### Implementation consequence

Old source model "free first, paid later" is historical and should not drive new implementation.

---

## DEC-004 — Listing expiry is timestamp-based: 30 days from activation/publication

**Status:** Accepted

### Context

Source alternates between "Day 30" and "from Day 31".

This is a wording ambiguity around the same 30-day duration.

### Decision

Canonical rule:

```text
expires_at = active_period_start + 30 days
```

A Listing becomes Expired when:

```text
now >= expires_at
```

For first publication:

```text
active_period_start = published_at
```

For an extension after expiry:

- preserve original `published_at`;
- increment `extension_count`;
- set `last_activated_at`;
- set new `expires_at = last_activated_at + 30 days`;
- status returns to `active`.

### Data Model consequence

Use timestamps, not a derived "Day 30/Day 31" state.

Recommended:

- `published_at`
- `last_activated_at`
- `expires_at`
- `extension_count`

### Implementation consequence

UI may display human-friendly days remaining, but backend behavior is based on `expires_at`.

---

## DEC-005 — Category-specific attributes use versioned JSON/JSONB

**Status:** Accepted

### Context

Housing, Jobs, Cargo and Human Connections have different structured attributes and filters.

Creating one relational table per category would create schema duplication, while a generic EAV model would make validation/filtering difficult.

### Decision

Common Listing fields remain first-class columns.

Category-specific attributes are stored in a versioned structured object:

```text
category_key
attributes
attributes_schema_version
```

Recommended database representation:

```text
attributes = JSONB
```

or the database equivalent.

Rules:

1. `attributes` must be a JSON object, not an opaque free-text blob.
2. Every Category owns a canonical attribute schema.
3. Server-side validation runs before persistence.
4. `attributes_schema_version` records the schema used to validate the Listing.
5. API/client localized labels are not persisted as canonical keys.
6. Filterable values use canonical keys/enums.
7. Unknown crawler values remain null/raw rather than fabricated.
8. Frequently queried JSON paths may receive database indexes or generated/materialized columns.
9. V1 does not use EAV as the canonical category-attribute store.
10. V1 does not require a separate relational Listing table for every category.

### Common Listing columns

Examples:

- id
- owner_user_id
- category_key
- title
- description
- status
- supply_source
- canonical location reference(s)
- published_at
- expires_at
- moderation/audit timestamps
- promotion state

### Data Model consequence

`listing.md` should define the common entity and the versioned `attributes` object.

`category.md` should define:

- category key
- schema/version
- filter definitions
- validation policy
- active-listing policy

### Crawler/API consequence

Crawler `attributesJson` or equivalent transport representation must be parsed and validated into the same canonical category attribute object used by native listings.

---

## DEC-006 — Discovery uses Search + Active Filters + Saved Filters + Ranking

**Status:** Accepted

### Decision

Canonical discovery stack:

```text
Search
+ Active Filters
+ Saved Filters
+ Ranking
```

There is no canonical Data Model entity for:

- Match
- Match Pair
- Compatibility Score
- Match Percentage

Active Filters define structured eligibility.

Ranking orders eligible results and cannot bypass a hard active filter.

Saved Filter notifications use the same deterministic category filter semantics.

---

## DEC-007 — Cargo is one category with no Product role

**Status:** Accepted

### Decision

Canonical:

```text
Cargo
```

No Product role:

- Carrier
- Sender
- Passenger
- Shipper

No Cargo subcategories:

- Passenger Cargo
- Ride Sharing
- Logistics / Shipping

Telclaw `transferlist` data maps into the same Cargo schema.

Upstream `transfer_role`, if present, may be retained as crawler provenance only.

---

## DEC-008 — Human Connections and Social & Events have separate purposes

**Status:** Accepted

### Human Connections

The listing means:

> I am looking for a person/group to do something with.

Examples:

- study partner;
- tennis partner;
- travel companion;
- shopping buddy.

Discovery uses Active Filters.

### Social & Events

The listing means:

> This event, meetup, or organized community activity exists.

Examples:

- public event;
- meetup;
- organized community activity.

### Consequence

Partner-oriented files/use cases belong under Human Connections, not Social & Events.

Do not duplicate the same listing into both categories automatically.

---

## DEC-009 — Social & Events taxonomy

**Status:** Accepted

Canonical category:

```text
Social & Events
```

Canonical listing type field:

```text
social_type:
- event
- meetup
- community_activity
```

Removed from Social taxonomy:

- study_partner
- sports_partner
- other_partner
- p2p_exchange_request

Partner requests belong to Human Connections.

Peer Exchange remains a separate potential future category and is not a Social subtype.

---

## DEC-010 — Social & Events contact is free

**Status:** Accepted

### Context

Source explicitly states Social / Event / Meetup contact does not require Coin, while the official contact button should still be used for analytics.

### Decision

For Social & Events:

- contact access is free;
- Early Access paid contact is disabled by default;
- official Contact / Registration CTA remains instrumented;
- paid event admission, if the organizer states one, is separate from Advertio contact monetization;
- Advertio V1 is not an event ticketing/escrow system.

---

## DEC-011 — Saved Filter alerts are deterministic

**Status:** Accepted

A new Active Listing is notification-eligible when it satisfies the stored Saved Filter conditions.

No fuzzy threshold is used.

Rules:

- hard filters remain hard;
- independent dimensions use their documented AND behavior;
- multi-select behavior belongs to each filter definition;
- Ranking does not change Saved Filter eligibility;
- zero-result situations must not silently broaden the Saved Filter.

---

## DEC-012 — Target taxonomy and Current State UI can differ temporarily

**Status:** Accepted

Current-state docs record what the runtime UI actually shows.

Target product/category docs record the canonical model being developed.

Example:

- current Telegram UI may still show `Passenger Cargo`;
- target taxonomy is `Cargo`.

Do not edit Current State documentation to pretend the runtime already changed.

Implementation work should eventually align UI/runtime labels with accepted target decisions.

---

# Open decisions not resolved here

These are **not blockers for the core Listing Data Model** and remain separate product decisions:

- final payment gateway/provider architecture;
- purchased vs bonus Coin restrictions in all services;
- translation storage/caching strategy;
- final Review/Deal confirmation mechanics;
- notification quiet hours/frequency controls;
- Services category schema;
- Peer Exchange launch decision and compliance model;
- detailed data-retention durations.

When resolved, add new numbered decisions rather than silently modifying historical context.
