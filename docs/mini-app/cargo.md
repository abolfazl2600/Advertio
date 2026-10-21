# Cargo — current implementation (2026-10-21)

> **Reviewed against** GitLab `master` at `e36ba877`, including the October 21 Cargo schema, Mini App, matching and billing changes. Describes merged code, **not independently verified Production deployment**. For the receiving crawler contract see [crawler guide](../integrations/crawler.md) and [crawler implementation reconciliation](../../09-crawler/advertio-integration-2026-10-21.md).

## Identity and purpose

- User-facing name: **Cargo**; canonical category/API slug: **`passenger-cargo`**.
- One shared pool of route-based listings. The user is **not asked** to choose Traveller vs Sender; there is no public role tab, role badge or role line in channel messages.
- The historical schema attribute `role` remains accepted. Unanswered `role` defaults to `traveler` for storage; older `sender` rows are **not rewritten**, and retain different legacy price semantics.
- It connects travel and item transport needs, not passenger ride-share or managed commercial freight.

## Create and validate a route

The current user-facing create form requires **origin and destination**; a trip date is **optional**, including an explicit clear-date action. The user does not type a freeform title: `Origin → Destination · d MMM` when dated, otherwise `Origin → Destination`.

| Attribute | UI and validation |
| --- | --- |
| `origin_country` and `origin` | Required country and city from the catalog |
| `destination_country` and `destination` | Required country and city from the catalog |
| `travel_date` | Optional exact Gregorian date; may be cleared |
| `cargo_type` | **Multi-select** item chips, multiple of Documents, Clothes, Electronics, Food, Other; backend stores an array |
| `weight_kg` | Optional 0.1–30 kg |
| `price` | Optional numeric rate. New/unspecified-role trips use **price per kg** |
| `price_negotiable` | Optional mutually exclusive flag where the schema accepts it |
| `description` | Optional note shown in detail |

Supported route countries: **Iran, Canada, United States, Germany, Italy, United Kingdom and France**. Origin and destination city must belong to selected countries; origin determines the listing's location. The city picker uses a visible viewport-aware sheet and a single vertically scrollable results list; Telegram expand and disabled vertical minimization mitigate partially expanded Mini App clipping. Search keyboard does not auto-open.

Route questions have aligned, readable From/To/Date labels; **Swap** sits on the To line. Selecting a date displays the weekday and a **calendar-day countdown** (Today/Tomorrow/in N days) using local calendar days, including DST-safe transitions. A past/invalid date has no countdown.

### Currency

The native form chooses currency from route geography: Canada CAD; US USD; UK GBP; Germany/Italy/France EUR; the non-Iran foreign end for an Iran route; when both are foreign the origin drives choice; code has a CAD fallback when neither end maps. This is **native UI logic**, not permission for crawlers to infer a price's source currency. The external crawler must omit unproven currency and price.

Old `sender` values can still be read as **total** prices, whereas new no-role/`traveler` listings show a **per-kg** price. Do not retroactively recalculate stored amounts.

## Feed and listing detail

- The feed has origin/destination selectors, Swap and paginated/infinite loading; **no role filter or side tabs**. The backend suspends stored cargo-role filters, including old channel and saved-search filters.
- A trip with a past **specified** `travel_date` is hidden by feed filtering, without changing stored `Active` status. An undated trip is not hidden by this rule. Normal lifecycle expiration remains distinct.
- Cards/details display route, date only if present, available weight, **all** selected item types, appropriately formatted price, notes and applicable shared actions. Legacy scalar item types remain readable after the migration.
- Saving, reporting, contact, user conversations and publisher actions use the shared listing layer. **Crawled** listings link back to Telegram rather than charging for contact or claiming a verified publisher badge.
- A previously published, now expired/deactivated listing responds to public detail with `410` and the UI shows a terminal unavailable state and a link to browse other Cargo listings. Never-public/unavailable ones remain `404`; transient server/network errors can retry.

## Back navigation

Shared journey navigation (`journeyBack.ts`) takes a Cargo feed back to the Hub; the post form leaves through route replacement and is not re-opened by browser Back; a listing opened directly from a Telegram channel returns to the Cargo feed if there is no in-app history.

## Publishing, price policy and crawler separation

- Policies/coin prices are server-controlled per category, including listing creation, renew, boost and the new **additional concurrent listing** price. Payment flows are shared with Housing and Jobs.
- A publisher can have a first free-slot live listing in a category (subject to ordinary posting policy) and pay a separately configured `passenger-cargo.price.additional_listing` to create more; a missing, off or zero extra price blocks additional posts. Server quote and wallet confirmation drive actual charges. Paying does not bypass review.
- Native image-enabled listings may produce a channel photo post. The October 21 **crawler ingest** contract still instructs producers to send `mediaKeys: []` for Cargo. Distinguish those two cases.
- The ingest API supports Cargo through `POST /api/ingest/leads` with category-specific validation. It is **not Housing-only**. External/crawled supply is separate from native paid publishing.

## Known limits and evidence

- Route dates are not automatic listing-expiration triggers.
- No role/side distinction is displayed in the current MVP; database compatibility fields remain.
- The bot's new `/search` is global free-text search, **not** a Cargo-only date/route chat wizard; category-specific filtering remains in the Mini App.
- Production status, real-Telegram gesture behavior and Telegram's acceptance of WebP by URL were not independently verified here.

Source commits: [Cargo simplified](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/b2ade2686d62a629f2fa2b32a31eb925f788d556), [MultiSelect](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/448a94f55c945efc99840a4b39453f9fab7f0ef6), [city picker](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/114b86ea319f95daaa508f05b1d5ffe644730fa7), [date countdown](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/40afe7a2c3b508eaa3805fc4be5ccf2dfbd3ef72), [navigation](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/0b90f0a9b0a8d4570fd87eec0aba0e080683cbe6), [ended detail](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f8cb1f389cdfbc704ae7ded1a5bdfbf9e93dcf59), [additional listing](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/54b42f0fd5a4a2992893973eec58732e134364de).
