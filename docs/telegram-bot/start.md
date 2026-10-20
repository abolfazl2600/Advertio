# Telegram bot — start, onboarding and command menu

> Current implementation as of 2026-10-20. Earlier screenshot-only notes are superseded where they conflict with this code-level description.

## `/start`

On a Telegram update, the bot ensures/refreshes the Advertio user record using the Telegram sender ID, username, display name and Telegram language code where available.

- If the account already has a saved locale, the bot opens the localized Main Menu.
- If the locale has not been selected, the bot displays the language picker first.
- Selecting a language saves the locale and shows a confirmation followed by Main Menu.
- A plain `/start`, an unknown callback or ordinary text outside an active wizard returns to Main Menu.
- A bot command can be addressed as `/search@BotUsername`; command matching ignores case and only handles a command addressed to this bot.

## Language picker

The supported options are Persian, English, French, Russian and Hindi. Button labels are always displayed in their own script. Translated prompts and buttons use the saved locale; missing translations fall back to English.

## Main Menu

- **Create Listing:** Telegram opens the Mini App link; the bot does not run the listing form in chat.
- **Search Listings:** starts the Search wizard.
- **Your saved searches:** opens the saved-search list.
- **Settings:** language and marketing-message preference.
- **Help:** localized help content with a return-to-menu button.

The Mini App link is environment/configuration dependent. If unavailable, the bot says so instead of pretending that listing creation started.

## Command menu

The public command menu contains:

- `/start`
- `/search`
- `/paysupport`

An active admin's private chat receives `/adminreport` as an additional command. The admin menu is published per chat; actual access is checked on every command and does not rely on the menu being hidden from non-admins.

## Related pages

- [Bot overview](./overview.md)
- [Create Listing hand-off](./create-listing.md)
- [Admin report](./admin-report.md)
