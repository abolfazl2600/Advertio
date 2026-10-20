# Telegram bot — Settings and notification preferences

> Current implementation as of 2026-10-20.

## Settings screen

Settings exposes:

- **Language** — opens the language picker.
- **Marketing messages** — toggles the persisted marketing opt-in preference.
- **Back** — returns to Main Menu.

The displayed marketing state is derived from the user's stored notification preference; it is not a decorative status label. The toggle writes the new preference and re-renders the screen.

## Supported languages

| Code | Language |
|---|---|
| `fa` | Persian |
| `en` | English |
| `fr` | French |
| `ru` | Russian |
| `hi` | Hindi |

Choosing a language saves it to the Advertio user account and returns a localized confirmation and Main Menu. Persian category/attribute labels are used when the backend supplies them; missing translations fall back to English.

## Marketing opt-in and Broadcasts

- Promotion Broadcasts are delivered only to users who opted in.
- Disabled accounts and accounts without a linked Telegram chat are excluded from Broadcasts.
- Every Promotion includes a one-tap **Stop promotions** button.
- Tapping Stop promotions sets marketing opt-in to false and removes the opt-out button from that message.
- Announcements are a separate Broadcast kind and do not use the marketing opt-in exclusion.
- Marketing opt-in does not control saved-search alerts; each saved search has its own enabled/pause state.

## Related pages

- [Bot overview](./overview.md)
- [Saved searches](./saved-searches.md)
- [Backoffice Broadcasts](../backoffice/broadcasts.md)
