# Backoffice — Gate A

> Current-state documentation based on the reviewed Backoffice UI as of 23 Sep 2026.

## Purpose

Gate A is an operational/product validation dashboard focused on the question shown in the UI: **"Is anyone actually paying?"**

It combines monetization, supply quality, demand allocation, experiment, duplicate-charge, and instrumentation-health signals.

The dashboard provides time-window controls for:
- 7d
- 30d · gate
- 90d

The reviewed screenshot shows the 90d view selected.

The UI notes that crawled listings are excluded from the primary Gate A metrics except for the section that explicitly evaluates whether crawled supply is consuming demand.

## Current Implementation

### Gate A — paid contact conversion

The dashboard shows a paid-contact conversion metric with:
- conversion percentage;
- paid users/contacts relative to users who opened a real listing;
- target threshold.

Observed state:
- 0%
- 0 paid of 1 who opened a real listing
- Below target
- target ≥ 15%

### Failure attribution

Measures whether non-paying users have a recorded reason for not paying.

Observed state:
- 0%
- 0 of 1 non-payers have a recorded reason
- Below target
- target ≥ 95%

### Real supply

Tracks real/user supply separately from crawled inventory.

Observed state:
- 0 real listings
- 320 crawled alongside
- user share 0%
- Below target
- target ≥ 20 listings

### Photo coverage

Measures photo coverage of live user listings.

Observed state:
- no percentage available
- 0 of 0 live user listings have a photo
- No data
- target ≥ 80%

### Is crawled supply eating demand?

This section explicitly includes the mix of crawled and real/user supply and measures how much contact demand goes to crawled listings.

Observed state:
- 97.2%
- 35 of 36 contacts went to a crawled listing
- 0 paid contacts in the same window
- warning: above the 40% ceiling

### Why they did not pay

A panel exists for recorded reasons users did not pay / did not complete the paid-contact flow.

Observed state:
- empty state
- "Nobody has reached the price yet."

### C1 experiment — early vs late

The dashboard includes a C1 experiment comparison for paid-phase timing.

Observed columns include:
- PAID_PHASE
- PEOPLE REACHED
- payment-related result column(s)

Observed row:
- late
- 1 person reached
- 0 in the visible payment result

The reviewed UI does not provide enough information to document the complete experiment definition or all table columns.

### Double charges

A safeguard/monitoring card tracks duplicate charges.

Observed state:
- 0
- "Nobody paid twice"

### Instrumentation health (all time)

An all-time event instrumentation table is available with:
- Event
- Count
- Last Seen

Observed event names include:
- `channel_post_published`
- `listing_detail_viewed`
- `mini_app_opened_from_channel`
- `contact_viewed_free`
- `contact_unlock_attempted`
- `authentication_started`
- `authentication_completed`

This section acts as a basic health/coverage view for important analytics events by showing whether events exist, how often they have been recorded, and when they were last seen.

## Current dashboard concepts

Gate A currently combines several distinct product-health questions:

1. Are users reaching real/user listings?
2. Are any users paying to unlock/contact?
3. When users do not pay, is the reason captured?
4. Is there enough real/user-generated supply?
5. Do live user listings have adequate photo coverage?
6. Is crawled inventory absorbing too much contact demand?
7. What is happening in the C1 paid-phase experiment?
8. Are duplicate charges occurring?
9. Are key analytics/instrumentation events still being recorded?

## Important interpretation notes

- A `Below target` badge compares the observed metric with a product-defined threshold shown in the UI.
- `No data` is distinct from a zero percentage when the denominator is zero.
- Crawled supply is intentionally excluded from most Gate A metrics but included in the crawled-vs-real demand mix section.
- Instrumentation health is labeled `all time` and therefore does not necessarily use the selected 7d/30d/90d Gate A window.

## Not yet documented

The reviewed UI does not establish:
- exact formulas for every Gate A metric;
- source tables/events for each metric;
- complete C1 experiment definition and assignment logic;
- complete list of failure-attribution reasons;
- whether cards support drill-down;
- alerting/notification behavior;
- exact refresh/caching behavior;
- configuration location for target thresholds.

Do not infer these behaviors from this document.
