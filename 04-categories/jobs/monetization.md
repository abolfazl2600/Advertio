# Jobs — Monetization

> Status: **Source-defined monetization model with unresolved Early Access timing**, plus Jobs V1 launch recommendation.

## Current verified state

Jobs is still Coming Soon in the Mini App, so no Jobs-specific paid runtime UI is currently documented as implemented.

## Source-defined monetization capabilities

Shared Advertio source includes:

- Early Access / contact monetization
- Boost
- Extend
- Urgent
- Wallet / Coin system

The source says Early Access applies to Jobs.

## Unresolved Early Access conflict

Two opposite source models exist.

### Model A — fresh access paid first

- listing enters Early Access immediately;
- approximately first 30 hours / Day 1–3 language;
- contact consumes Coin;
- contact becomes free later.

### Model B — free first, paid later

- Day 1–3 contact is free;
- Day 4+ contact costs Coin;
- Day 30 expiry.

Do not implement Jobs Early Access from documentation alone until one model is selected as canonical.

## Jobs/Social extension source prices

Source examples:

- First 30-day extension: **35 Coins**
- Second and later extension: **55 Coins**

Pricing is Admin-configurable.

## Boost

Source sample:

- 3 Coins
- Admin-configurable

Boost should affect placement/promotion, not listing contents.

## Urgent

Source defines paid Urgent as a visual distinction with category-configurable price.

## Crawled Jobs

Crawled listing monetization is disabled under shared crawler rules.

Therefore:

- no Coin charge to open crawler contact;
- contact routes to Telegram/source;
- crawler contact remains a separate analytics cohort.

## Recommended Jobs V1 launch policy

For initial Jobs liquidity validation:

- Posting: free
- Contact/Apply: free
- Crawled contact: free
- Boost: can be introduced as paid after basic liquidity
- Extend: can be paid after expiry behavior is validated
- Urgent: later
- Paid contact unlock: delay until meaningful Jobs supply/demand liquidity exists

This section is a **product recommendation**, not current source behavior.

## Acceptance criteria

- [ ] Crawled Jobs are never charged native contact monetization.
- [ ] Admin-configurable prices are not hard-coded as permanent rules.
- [ ] Early Access timing is explicitly resolved before paid Jobs contact launches.
- [ ] Wallet deductions are idempotent and never double-charge.
- [ ] Free/paid contact state is obvious before the user confirms an action.
