# Backoffice — Gate A

> Current-state documentation based on the reviewed Backoffice UI as of **3 Oct 2026**.

## Purpose

Gate A is Advertio's operational/product-validation dashboard for monitoring whether marketplace activity is turning into real user supply, contact demand, and paid contact behavior.

The current dashboard combines:

- user population metrics;
- paid-contact conversion;
- failure attribution;
- real vs crawled supply;
- photo coverage;
- contact-demand allocation;
- crawled-vs-user-generated performance;
- payment-friction visibility;
- experiment monitoring;
- duplicate-charge monitoring;
- instrumentation health.

## Current Implementation

### User metrics

Gate A now includes top-level user-count metrics.

#### Total users · all time

Observed current state:

- **53** total users
- UI definition: **Every account right now**
- Disabled accounts in the reviewed state: **0**
- This metric is explicitly **not limited to the selected/window period**

The card therefore represents the current all-time account population rather than a window-scoped count.

#### New users · last 30 days

Observed current state:

- **45** new users
- UI definition: **Accounts created in the window**

This is a window-scoped registration count.

#### Active users · last 30 days

Observed current state:

- **40** active users
- UI definition: **Accounts that viewed, contacted, signed in or posted in the window**

This is a unique-user activity metric scoped to the displayed 30-day window.

These user metrics are the implemented outcome of [Issue #15 — Add user count metrics to dashboard](https://github.com/abolfazl2600/Advertio/issues/15).

### Gate A — paid contact conversion

The current card monitors paid-contact conversion on **real/user-generated listings**.

Observed current state:

- No percentage is shown because there is no eligible denominator.
- **0 paid of 0 who opened a real listing**
- Status: **No data**
- Target: **≥ 15%**

The UI distinguishes a no-data state from an actual 0% conversion when the denominator is zero.

### Failure attribution

Measures whether non-paying users have a recorded reason for not paying.

Observed current state:

- No percentage is shown because there are no eligible non-payers in the current real-listing flow.
- **0 of 0 non-payers have a recorded reason**
- Status: **No data**
- Target: **≥ 95%**

### Real supply

Tracks live user-generated/real supply separately from crawled inventory.

Observed current state:

- **0** real listings
- **173 crawled alongside**
- User share: **0%**
- Status: **Below target**
- Target: **≥ 20 listings**

### Photo coverage

Tracks photo coverage for live user-generated listings.

Observed current state:

- No percentage available for user-generated supply
- **0 of 0 live user listings have a photo**
- Status: **No data**
- Target: **≥ 80%**

### Is crawled supply eating demand?

This section explicitly compares contact demand going to crawled inventory versus real/user-generated supply.

Observed current state:

- **100%**
- **22 of 22 contacts went to a crawled listing**
- **0 paid contacts in the same window**
- Warning: **Above the 40% ceiling — check paid contacts are still growing**

This section intentionally includes crawled inventory because its purpose is to detect whether crawler supply is absorbing marketplace demand.

## Crawled vs user-generated

Gate A contains a detailed comparison table for crawled supply versus user-generated supply.

The UI notes:

> Rows marked “now” are what is live right now; the rest cover the last 30 days.

### Current comparison

| Metric | Crawled | User-generated |
| --- | ---: | ---: |
| Live listings (now) | 173 | 0 |
| Photo coverage (now) | 39.3% — 68 / 173 | — — 0 / 0 |
| Listing views | 126 | 0 |
| Unique viewers | 32 | 0 |
| Contact attempts | 22 | 0 |
| Contacts made | 22 | 0 |
| Share of contact demand | 100% — 22 / 22 | 0% — 0 / 22 |
| Contact rate | 17.5% — 22 / 126 | — — 0 / 0 |
| Paid contacts | 0 | 0 |
| Paid conversion | 0% — 0 / 32 | — — 0 / 0 |

### Interpretation represented by the UI

The current data shows:

- all live supply in the reviewed state is crawled;
- all recorded contact demand in the last 30 days went to crawled listings;
- user-generated supply has no live listings in the reviewed state;
- crawled listings currently have measurable views and contacts;
- there are currently no paid contacts in either supply type.

This section is descriptive product instrumentation; it should not be treated as a permanent benchmark because the values change with marketplace activity.

## Why they did not pay

A dedicated panel exists for payment-failure / non-payment reasons.

Observed current state:

- Empty state
- **Nobody has reached the price yet.**

This indicates there is currently no eligible pricing-stage traffic to attribute.

## C1 experiment — early vs late

Gate A includes a dedicated panel for the **C1 experiment — early vs late**.

Observed current state:

- Empty state
- **No unlock traffic under either setting yet.**

The current screenshot confirms the experiment monitor exists, but it does not expose enough active data to document assignment logic or conversion calculations beyond this empty state.

## Double charges

A monitoring card tracks duplicate-charge events.

Observed current state:

- **0**
- Status: **Nobody paid twice**

## Instrumentation health (all time)

An all-time instrumentation table is available with:

- **Event**
- **Count**
- **Last Seen**

Observed events and counts in the reviewed current state include:

| Event | Count | Last seen |
| --- | ---: | --- |
| `channel_post_published` | 385 | 3 Oct 2026, 14:27 |
| `listing_detail_viewed` | 313 | 3 Oct 2026, 13:36 |
| `mini_app_opened_from_channel` | 165 | 3 Oct 2026, 13:36 |
| `authentication_started` | 58 | 3 Oct 2026, 09:05 |
| `authentication_completed` | 56 | 3 Oct 2026, 09:05 |

The screenshot shows only part of the instrumentation table, so this list should not be treated as exhaustive.

Instrumentation health is explicitly labelled **all time**, so it is not necessarily scoped to the same 30-day window used by the current activity metrics.

## Current dashboard concepts

The implemented Gate A dashboard currently answers these operational questions:

1. How many users exist in total?
2. How many users joined in the current window?
3. How many users were active in the current window?
4. Are users reaching real/user-generated listings?
5. Are any users paying for contact access?
6. When users do not pay, is the reason captured?
7. Is there enough real/user-generated supply?
8. Do user-generated listings have adequate photo coverage?
9. Is crawled inventory absorbing most contact demand?
10. How do crawled and user-generated listings compare on views, contacts, and paid conversion?
11. Is there enough traffic to evaluate the C1 early-vs-late experiment?
12. Are duplicate charges occurring?
13. Are key analytics events still being recorded?

## Metric definition controls

The reviewed 3 Oct 2026 Gate A UI visibly includes an information control (`ⓘ`) beside the primary KPI/metric labels.

Confirmed visible definition controls include the current cards/sections for:

- Total users
- New users
- Active users
- Gate A paid-contact conversion
- Failure attribution
- Real supply
- Photo coverage
- Is crawled supply eating demand?
- Crawled vs user-generated section/metrics
- Why they did not pay
- C1 experiment — early vs late
- Double charges
- Instrumentation health

This confirms that metric-definition entry points are present in the current dashboard UI.

### Definition content verification status

The supplied screenshots do **not** show any opened metric-definition tooltip/popover/drawer.

Therefore, the current evidence does not yet establish that every info control exposes all of the definition content required by Issue #14, such as:

- exact formula;
- numerator;
- denominator;
- inclusion/exclusion criteria;
- crawled-listing inclusion/exclusion;
- time-window semantics;
- canonical source events/data;
- configured target source;
- zero-denominator handling.

The visible card copy and values documented elsewhere in this file are verified from the current UI. Exact hidden definition content must be verified separately before it is documented as implemented.

## Metric semantics confirmed by the current UI

### Total users

- all-time/current account population;
- explicitly not limited to the displayed window;
- reviewed state shows disabled-account context.

### New users

- accounts created during the displayed window.

### Active users

The current UI defines qualifying activity as an account that:

- viewed;
- contacted;
- signed in; or
- posted

during the displayed window.

### No data vs zero

Gate A intentionally distinguishes:

- **No data** / em dash when a percentage has no valid denominator;
- **0%** when a denominator exists but there are zero successes.

Examples in the current UI:

- Real-listing paid conversion: **No data** because 0 users opened a real listing.
- Crawled paid conversion: **0%** because 32 unique crawled-listing viewers exist and none became a paid contact.

## Current values are snapshots

All numeric values documented above are the values visible in the reviewed **3 Oct 2026** UI.

They document what the dashboard currently exposes and how metrics are presented. They are not product constants and will change as users, listings, contacts, and analytics events change.

## Not yet documented

The reviewed UI does not establish:

- backend/source-table implementation for every Gate A metric;
- exact canonical user-ID query implementation used to deduplicate user counts;
- treatment of admin/system/test accounts beyond what the UI explicitly states;
- complete C1 experiment assignment rules;
- complete list of payment-failure attribution reasons;
- whether every card supports drill-down;
- alerting/notification behavior;
- exact refresh/caching behavior;
- configuration location for target thresholds.

Do not infer these implementation details from the UI alone.
