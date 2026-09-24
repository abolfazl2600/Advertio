# Ranking

## Current / Basic Ranking

Version 1.2 defines Basic Ranking.

Source order:

1. Boosted Listings
2. Newest Listings
3. Verified Users
4. Other Listings

Source says ordering is based on date, with the above priorities.

## Boost ranking effect

Boost:
- returns Listing to top of Search/List
- can republish Listing to communication/social channels
- sample fee: 3 Coins
- dynamic by Admin

## Hidden system ranking/filter signal

Housing structure includes:
```text
boost_status = normal | boosted | featured | urgent
```

Source does not separately define ranking weight for `featured` or `urgent`.

## Response Metrics and Trust

Source describes Response Metrics as:
- indicators of speed, effectiveness and quality of User responses
- not merely analytics
- part of Trust / interaction-quality ranking

Explicit metric:
- Last Activity

However, Source does not define a formula that adds Response Metrics to Listing ranking.

## AI Match Ranking — Future

Version 2.0:
- AI Search + Smart Matching
- AI Recommendation Assistant
- Compatibility Score

AI Recommendation flow:
- detect Category
- extract Attributes
- rank Listings by similarity
- show similar alternatives when exact result is absent

Example match display:
- 98%
- 95%
- 90%

These are examples, not measured results.

## Compatibility Score — Future

Status: Proposed

Source:
- Example: 85% Match
- Search should offer fuzzy suggestions
- Source notes possible conflict with Urgent Listings

> ⚠️ Source Conflict
>
> Compatibility Score is proposed as a primary match signal.
>
> Source also notes that this can conflict with Urgent Listings.
>
> No precedence rule between Match Score, Urgent, Boost and existing Basic Ranking is defined.

## Advanced Ranking — Future

Feature prioritization places:
- Advanced Ranking algorithm in Phase 3

Source does not define:
- weights
- tie-breakers
- score formula
- personalization formula
- CTR/relevance feedback loop

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.
