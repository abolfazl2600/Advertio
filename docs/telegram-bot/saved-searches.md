# Telegram bot — saved searches and alerts

> Current implementation as of 2026-10-20.

## 1. Create a saved search

Choose **Your saved searches → New saved search**. The wizard asks for:

1. Category from the backend category list.
2. City as typed text or **Any**.
3. Price as a single maximum, a hyphenated min-max range or **Any**.
4. Filterable Select/Boolean category attributes; unsupported attribute types are skipped.
5. Notification frequency: **Instant** or **Digest**.

The saved-search name is generated from category and city, for example `Housing — Toronto`; without a city, it uses the category name. The bot does not ask for a custom name or keywords in v1.

## 2. Frequency and delivery

| Frequency | Behavior |
|---|---|
| Instant | Matching listing activations queue an alert; a background worker delivers due notifications through Telegram |
| Digest | Matches are grouped and sent once per day at a configured UTC hour; default is 09:00 UTC |

Digest timing is global, not per-user local time. The worker recomputes the next UTC boundary after each cycle, so restarts do not shift the schedule by a rolling interval.

## 3. Matching rules

A saved search can constrain:

- Category.
- City text.
- Price minimum and/or maximum.
- Equality filters for supported category attributes.

The current bot wizard asks for category, city, price and supported Select/Boolean attributes. The underlying saved-search model also has country/province/keywords fields, but the bot wizard does not ask for those in v1.

Only scalar equality matching is implemented for category attributes. Range, Number, Date and MultiSelect operators are out of scope for the current wizard/matcher. Do not describe this as a full clone of every Mini App filter.

## 4. Manage saved searches

The list displays each saved search with a notification icon indicating enabled/paused state. Opening an item shows its name, status and frequency. Available actions:

- **Pause:** disables delivery without deleting the saved search.
- **Resume:** re-enables delivery.
- **Delete:** removes the saved search.
- **New saved search:** starts the wizard.
- **Back:** returns to Main Menu.

An enabled saved search is not the same as a saved listing bookmark. Bookmarks live in the Mini App's Saved page.

## 5. Operational boundaries

- Saved-search alert delivery depends on the user's linked Telegram identity and Telegram being able to deliver to that chat.
- Delivery workers log failures and continue their next cycle; transient notifications can be retried through the notification workflow.
- The bot's conversation state expires after 30 minutes of inactivity.
- The generic category picker may list seeded categories beyond Housing/Cargo/Jobs; this does not activate a create form in the Web app.

## Related pages

- [Search wizard](./search.md)
- [Settings and marketing opt-in](./settings.md)
- [Mini App Saved listings](../mini-app/listing-interactions.md)
