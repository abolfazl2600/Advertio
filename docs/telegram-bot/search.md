# Telegram bot — Quick global Search (2026-10-21)

> **Reviewed:** GitLab `master` at `e36ba877`, source change [`7d0f4b98`](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/7d0f4b9881b635c4ddf177fa7b75538a6f48fdc6). Replaces the previous **category → city → price → attributes chat wizard**. No claim of independently verified Production rollout.

## Entry and interaction

- **Search Listings** menu and `/search` both open one localized free-text prompt (city, category, title word or anything relevant).
- `/search some words` submits a query immediately, without waiting for another message.
- Searches all categories at once; no upfront category/city/price questions. The bot uses the feed's canonical keyword search, shared with Mini App and saved-search alerts.
- Blank queries and text beyond the backend's max keyword length are re-prompted; file/photo/sticker/voice replies are rejected as non-text.
- The bot interprets subsequent text as a query only within the 30-minute active search conversation TTL. Other commands/screens exit the search, but active result buttons can still operate. Old wizard buttons/state lead to a fresh Quick Search prompt, not restoration of the removed wizard.

## Search semantics

**Every search term must match**, but each term may match a different supported field: title, description, city, province, neighborhood, category name (English/Persian), or catalog city name/code (English/Persian). A query can mix transliterations/categories without explicitly selecting a field.

The backend applies resolved keyword terms in SQL to active feed entries, and the saved-search matcher uses the same term model in memory. Ordering is the shared feed ranking: **boosted, urgent, newest**; visibility is Active only. Literal text is parameterized/escaped so wildcard characters do not widen lookups.

## Results and actions

- Message shows the query, total count and **five listings per page**, plus Page X of Y and Previous/Next when applicable.
- Each row shows the **category's icon**, title and **only available** price/city/weight details; missing fields do not produce placeholder values.
- Every result gets a Mini App button for that listing.
- **Save this search** creates a keyword-only **Instant saved search** named after the typed query, at most once from that result state; its alerts use the same keyword matching semantics.
- **New Search** resets the prompt; **Advanced Search** opens the Mini App hub for category-specific filtering; **Main Menu** exits.
- Zero results still show the searched query and useful next actions.

## Removed behavior and scope

There is **no** bot category/city/price/attribute wizard in `/search`. Previous controls such as “Any city”, numeric price range parsing, or stepwise Select/Boolean filters **do not describe current Quick Search**. They belong to historical implementations, not current instructions. For detailed category filters (route, date, wage, rent, etc.) use the Mini App journey feeds. Other saved-search management flows remain separate.

Implementation pointers: `backend/src/Advertio.Api/Modules/Identity/Bot/QuickSearch.cs`, `QuickSearchState.cs`, `LeadKeywordTerm.cs`, `LeadKeywordResolver.cs` and `SavedSearchMatcher.cs`. Commit reports **756/756 unit** and **395/395 integration** tests; those results were not rerun in this documentation update.

Related: [Mini App Search](../mini-app/search.md), [Saved searches and notifications](./saved-searches.md), [today's release inventory](../releases/2026-10-21.md).
