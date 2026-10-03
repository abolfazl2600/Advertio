# Jobs — Category Rules

> Compiled from current platform rules, Telegram Bot current state, Mini App current state, and the original Jobs product direction.

## Current availability

### Telegram Bot

Jobs is visible in the Create Listing category-selection screen.

Verified:

```text
Jobs
```

as a category button.

Jobs-specific steps after category selection are not verified from the current reviewed screenshots.

### Mini App

Jobs is currently shown as:

```text
Coming Soon
```

A dedicated Jobs feed should therefore not be documented as currently live.

## Generic listing submission rules

The shared Advertio submission flow applies:

1. User chooses category.
2. Eligibility is checked.
3. User enters Title.
4. User enters Description.
5. User uploads Images.
6. User enters Location.
7. User enters category-specific fields.
8. Preview.
9. Confirm.
10. Status becomes Pending.
11. Admin moderates.
12. Approved listing enters publication/lifecycle flow.

For Jobs, the original source explicitly mentions **Job Type** as a category-specific field.

## Moderation

Product rules state:

> Listing must not be published before Admin approval.

This applies to Jobs unless a later explicit category rule changes it.

## One-active-listing rule

The source's main rule says:

```text
one Active Listing per User per Category
```

The source also contains unresolved exceptions involving support escalation / fees / repeat-posting rules.

Therefore:

- document the one-active-listing rule as the base rule;
- do not invent the final additional-listing exception flow.

## Status/lifecycle vocabulary

Shared source vocabulary includes:

- Pending
- Approved
- Rejected
- Published
- Active
- Expired
- Extend
- Boost
- Urgent

The source does not fully resolve whether `Approved` and `Published` are separate statuses or operational synonyms.

## Location

Jobs uses the shared listing location model:

- Country
- Province / State
- City
- optional Area

No Jobs-specific geo rule is defined in the current source.

## Structured data rule

When the Jobs category is implemented fully:

- job-specific filterable fields should be stored structurally;
- free-text description should remain separate;
- missing values must not be fabricated;
- crawler/AI extraction must use canonical category values.

## Crawled listings

If Jobs uses crawler supply, shared crawled rules apply:

- crawled/native supply must remain distinguishable;
- crawler monetization disabled;
- contact routes to the external Telegram advertiser/source;
- internal chat disabled;
- review disabled;
- escrow disabled;
- crawler is intended for cold start, not permanent supply dominance.

## Contact / Early Access

The source says Early Access applies to Jobs.

However, the lifecycle source contains conflicting timing models.

See [monetization.md](./monetization.md).

## Ranking

A source-level Basic Ranking model exists:

1. Boosted
2. Newest
3. Verified Users
4. Other listings

No Jobs-specific runtime ranking has been verified.

Do not state that the current Jobs feed uses this ordering until a live Jobs feed is implemented and verified.

## Search

Future/revised Telegram Quick Search task #33 intends global free-text search to return Jobs results without forcing category selection.

Jobs result representation in that task:

```text
💼 {Listing Title} — {Relevant information}
```

Issue #33 is not current implemented behavior until completed/verified.

## Missing product decisions

The current source does not define:

- canonical Jobs taxonomy;
- complete Job Type enum;
- mandatory Jobs attributes;
- employer verification rules;
- salary schema;
- employment type schema;
- remote/hybrid/onsite model;
- job application flow;
- job-specific expiry duration;
- job-specific moderation rules beyond general listing moderation.

These remain explicit gaps rather than inferred behavior.

## Related

- [Jobs overview](./overview.md)
- [Jobs attributes](./attributes.md)
- [Jobs filters](./filters.md)
- [General Jobs](./general-jobs.md)
- [Jobs monetization](./monetization.md)
- [Product rules](../../03-product/product-rules.md)
- [Listing lifecycle](../../03-product/listing-lifecycle.md)
