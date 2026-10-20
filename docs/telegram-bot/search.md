# Telegram bot — Search Listings wizard

> Current implementation in GitLab `master` as of 2026-10-20.

## Flow

The wizard is started from **Search Listings** or `/search` and asks for:

1. **Category:** options are loaded from the backend category endpoint. This list can include category records that are not live Web journeys.
2. **City:** user can type a city string or tap **Any**.
3. **Price:** user can type a value or tap **Any**.
4. **Attributes:** filterable attributes from the chosen category are asked in schema order when their type is supported.
5. **Results:** the bot displays a result count and compact listing details.

## Price parsing

- A single numeric value is treated as the **maximum** price (for example, `2500` means up to 2500).
- A hyphenated value is parsed as minimum-maximum (for example, `1500-2500`).
- A non-numeric value clears the price constraint instead of inventing a range.
- An explicit **Any** button clears the price constraint.

## Attribute filters

Only attributes marked hard or soft filterable and typed **Select** or **Boolean** are presented.

- Select: one option button per schema option.
- Boolean: Yes / No.
- Skip: leave that attribute unconstrained.
- Back and Cancel are available during the wizard.

Range, Number, Date and MultiSelect attributes are automatically skipped. This means the bot does not expose a dedicated date filter for Cargo travel date, a numeric weight range or a multi-select amenities filter.

## Results

- The message includes the total result count and each result's title, numeric price (or an em dash if no numeric price is present) and city.
- Each result gets a button that opens the matching listing in the Mini App; the bot does not expose a publisher's direct contact in the result text.
- Results use paged feed queries. Previous/Next buttons appear according to the current page and the server's `hasMore` result.
- The user can save the current filters as a saved search, start a new search, go back one step or return to Main Menu.
- The search result query and saved-search alerts share the same price and scalar attribute semantics, so saving the current search does not silently change the filter meaning.

## State and reliability

The wizard state is stored in the backend. An inactive wizard older than 30 minutes is stale and is not resumed as if it were current. Text replies are only interpreted as wizard answers when the bot has an active matching wizard; conversation replies are routed first.

## Known limitations

- No keyword/title/description field is asked in the wizard.
- City is free text, not a country/province/city catalog picker.
- No AI/semantic search.
- No Range/Number/Date/MultiSelect attribute controls.
- A category being present in the bot's backend list does not mean that a Web journey for that category is live.

## Related pages

- [Saved searches and alerts](./saved-searches.md)
- [Mini App global Search](../mini-app/search.md)
