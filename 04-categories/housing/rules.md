# Housing & Roommate — Category Rules

> Current rules are compiled from implemented Housing behavior plus canonical platform rules. Conflicting legacy product rules are called out rather than silently resolved.

## Category availability

Housing & Roommate is the currently active marketplace category in the Mini App.

Other Home categories may be visible as future/Coming Soon entries, but Housing is the currently verified live marketplace surface.

## Listing submission

Platform-level submission flow:

1. Choose category.
2. Complete listing fields.
3. Preview/confirm.
4. Listing enters Pending.
5. Admin moderation.
6. Approve or Reject.
7. Approved listing becomes available according to platform lifecycle rules.

Listing fields include:

- title;
- description;
- images;
- location;
- category-specific Housing attributes.

## Mandatory moderation

Current product rules state that listings must not publish before Admin approval.

## Active listing rule

The source product rule says a user normally has one Active Listing per category.

The same source contains unresolved exceptions/fee/support rules for additional listings, so this document does not invent a final exception flow.

## Structured Housing data

Housing should use canonical structured attributes for filtering.

Do not encode important filterable Housing information only in free-text description when a structured field exists.

## Filter semantics

- Unset / Any means the criterion does not constrain results.
- Multi-select criteria such as Amenities/Lifestyle can contain multiple selected values.
- Filters change result selection, not listing content.
- Global Search is separate from Housing structured filtering.

## Missing data

If optional Housing information is unavailable:

- omit it from card/detail presentation;
- do not fabricate a placeholder value that looks like real listing data.

Crawler/import pipelines must not guess required canonical values.

## Crawled vs user-generated

Crawled Housing listings must remain distinguishable from native/user-generated listings.

Canonical crawled-listing rules include:

- no crawler monetization;
- contact redirects to Telegram advertiser;
- no internal chat;
- no review;
- no escrow.

Crawler supply exists for cold-start and must not be presented as native user supply.

## Contact measurement

Official contact actions should remain measurable by Advertio analytics.

The current Housing detail UI can expose an `Open in Telegram` contact action.

## Ranking

The source product ranking document defines a basic future/current roadmap ordering concept:

1. Boosted listings
2. Newest listings
3. Verified users
4. Other listings

The supplied Housing screenshots do not prove the exact runtime ranking algorithm, so this file does not assert that every current feed is ordered exactly by that sequence.

## Lifecycle

Platform lifecycle includes:

- Pending
- approval/publication
- Active
- Expired
- optional Extend/Renew
- optional Boost/Urgent

Exact Early Access timing is unresolved in source documentation; see [monetization.md](./monetization.md).

## Current QA note

The currently displayed Floor filter includes `50–50`, which appears inconsistent.

Document current behavior first; product/QA should fix the value through an explicit change rather than silently altering documentation.

## References

- [Housing Overview](./overview.md)
- [Attributes](./attributes.md)
- [Filters](./filters.md)
- [Monetization](./monetization.md)
- [Product Rules](../../03-product/product-rules.md)
- [Listing Lifecycle](../../03-product/listing-lifecycle.md)
