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

- returns Listing to top of Search/List;
- can republish Listing to communication/social channels;
- sample fee: 3 Coins;
- dynamic by Admin.

## Hidden system ranking/filter signal

Housing structure includes:

```text
boost_status = normal | boosted | featured | urgent
```

Source does not separately define ranking weight for `featured` or `urgent`.

## Response Metrics and Trust

Source describes Response Metrics as:

- indicators of speed, effectiveness and quality of User responses;
- not merely analytics;
- part of Trust / interaction-quality ranking.

Explicit metric:

- Last Activity

However, Source does not define a formula that adds Response Metrics to Listing ranking.

## Product decision: Ranking is not Matching

Advertio does not use:

- Smart Matching;
- Compatibility Score;
- Match Score;
- percentage compatibility.

Ranking may order the result set after Search/Active Filters are applied.

It must not silently override an active hard Filter.

Example:

```text
Active Filters determine eligible results
→ Ranking orders those results
```

## Search relevance

Free-text Search can use relevance to order textual search results.

Relevance means:

- how well a Listing satisfies the search query;

not:

- compatibility between two people;
- an 85% Match Score;
- a fuzzy Saved Filter threshold.

## Advanced Ranking — Future

Feature prioritization places Advanced Ranking algorithm in Phase 3.

Source does not define:

- weights;
- tie-breakers;
- score formula;
- personalization formula;
- CTR/relevance feedback loop.

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.
