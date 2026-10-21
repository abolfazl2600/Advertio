# Advertio Telegram bot — current implementation

> **Updated 2026-10-21:** Bot Search Listings and `/search` now use [Quick Search](./search.md): one global free-text query, five results/page, Mini App Advanced Search, keyword-only Instant saved searches. The prior category/city/price/attribute Search **wizard no longer exists**; separate Saved Search management remains. [Source commit](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/7d0f4b9881b635c4ddf177fa7b75538a6f48fdc6).
>
> **Baseline reviewed:** 2026-10-20 from executable bot/backend code in GitLab `master`. This supersedes earlier screenshot-only notes that marked Search and Saved searches as unverified.

## 1. Entry point and main menu

The bot ensures a user record from the Telegram sender identity, updates available Telegram profile fields, and uses the saved locale. A new user without a saved locale receives the language picker first. The main menu contains:

1. **Create Listing** — opens the configured Mini App entry. Listing creation itself is not a chat wizard.
2. **Search Listings** — starts the generic category/city/price/attribute search wizard.
3. **Your saved searches** — list, view, pause/resume and delete saved-search alerts.
4. **Settings** — language and marketing opt-in.
5. **Help** — localized help content.

If the Mini App is not configured, Create Listing displays an unavailable message. If an old keyboard still has a callback from before the Mini App was configured, the bot resolves it to the current Mini App link when possible.

## 2. Commands

| Command | Scope |
|---|---|
| `/start` | Everyone; creates/refreshes the Telegram-linked user context and shows language selection or Main Menu |
| `/search` | Everyone; starts the same Search Listings wizard as the menu |
| `/paysupport` | Telegram Stars payment-support command, required for a bot that accepts Stars |
| `/adminreport` | Active admins only, and only in the admin's private chat with the bot |

The bot publishes its command menu from code at startup; commands are not maintained manually in BotFather. Admins receive an admin-specific command list, but hiding the command from other users is only a UI convenience. The command itself checks admin authorization on every request.

## 3. Localization

Supported locales are:

- Persian (`fa`)
- English (`en`)
- French (`fr`)
- Russian (`ru`)
- Hindi (`hi`)

The language picker shows each language in its own script. Choosing a language persists the user's locale and returns to the localized Main Menu. Persian category/attribute labels are used when available; missing translations fall back to English.

## 4. Search

The generic Search wizard asks for:

1. Category from the backend category list.
2. City (typed text) or **Any**.
3. Price (a numeric maximum or a min-max range) or **Any**.
4. Filterable category attributes of type **Select** or **Boolean**; unsupported attribute types are skipped.

Results show total count and each result's title, numeric price when present and city. Each result gets a button that opens the corresponding listing in the Mini App. Results are paged with Previous/Next; the user can save the current filters, start a new search or return to Main Menu.

The generic wizard is not a dedicated Cargo route/date search UI. It only asks for scalar Select/Boolean attributes; it does not provide range sliders, multi-select or date controls.

## 5. Saved searches and notifications

A saved search stores category, optional city, price range and equality filters for supported scalar attributes. The bot automatically names it from the category and city (when supplied). Notification frequencies are:

- **Instant:** queued when a matching listing becomes Active.
- **Digest:** matching results are grouped and sent once per day at a configured UTC hour (default 09:00 UTC).

Users can view each saved search's status/frequency, pause it, resume it or delete it. A paused/disabled search does not receive alerts. See [Saved searches](./saved-searches.md).

## 6. Settings and promotions

Settings exposes:

- Language.
- Marketing messages opt-in toggle.
- Back to Main Menu.

Promotion broadcasts honor the user's marketing opt-in. Every Promotion also has a one-tap **Stop promotions** action; using it disables the preference and removes that button from the message. This opt-out is separate from saved-search alerts, which are controlled per saved search.

## 7. Identity verification and payments

The bot is part of these workflows:

- Telegram phone sharing for account sign-in/verification.
- Manual coin top-up: the user sends payment details and/or a receipt photo; admins review in Telegram, and coins are credited only after approval.
- Paid identity verification: the user sends an identity document and a challenge video; admins review the evidence and approve/reject.
- Conversation/message relay for native user-created listings.
- Telegram Stars payment support.

The Mini App initiates the flow; the bot handles evidence/confirmation where required. See [Payments and verification](./payments-and-verification.md).

## 8. Admin reports

- `/adminreport` generates a current management report for an active admin in their private chat.
- A daily management report is also scheduled (default 06:00 UTC; displayed timestamps default to Asia/Tehran).
- A separate operational lead digest is sent four times per day at 00:00, 06:00, 12:00 and 18:00 Tehran time to configured admins with a linked Telegram chat.

See [Admin report](./admin-report.md).

## 9. Conversation state and reliability

Search and saved-search wizards store their step state in the backend. A wizard that has been inactive for more than 30 minutes is treated as stale rather than continuing from an old prompt. Conversation replies are routed before wizard text handling so an ordinary message reply is not mistaken for a city or price answer. Errors are logged and the next worker cycle can retry; a failed scheduled report does not permanently stop the worker.

## Related pages

- [Start and locale selection](./start.md)
- [Create Listing](./create-listing.md)
- [Search wizard](./search.md)
- [Saved searches](./saved-searches.md)
- [Settings](./settings.md)
- [Payments and verification](./payments-and-verification.md)
- [Admin report](./admin-report.md)
