# Advertio Telegram Bot — Current State

> Last documented from the current Telegram Bot UI review on **25 Sep 2026**.
>
> This documentation records **what is currently visible/implemented in the Advertio Telegram Bot** based on the live bot screenshots provided for this review. It is intended to be a development reference alongside the codebase.

## Documentation rules

- **Current Implementation** describes behavior observed in the current Telegram Bot UI.
- Planned or future behavior must not be described here as already implemented.
- The existing product/flow documents under `07-telegram-bot/` describe broader product/source flows and may contain planned or historical behavior; they should not override this current-state document.
- Update this document when the corresponding bot behavior changes.
- When a flow has not yet been reviewed, mark it as **Not yet documented** rather than inferring its behavior.

## Current entry point

The bot currently supports the Telegram `/start` command.

After `/start`, the current bot displays:

> **What would you like to do?**

The current Main Menu contains:

1. 🏠 **Create Listing**
2. 🔍 **Search Listings**
3. **Your saved searches**
4. ⚙️ **Settings**
5. ❓ **Help**

### Current Main Menu

```text
What would you like to do?

🏠 Create Listing
🔍 Search Listings
Your saved searches
⚙️ Settings
❓ Help
```

## Current Settings

Selecting **Settings** opens a settings screen with:

- 🌐 **Language**
- 📣 **Marketing messages: 🔔 On**
- ↩️ **Back**

### Current Settings behavior visible in UI

The current screenshot confirms that:

- Language is an available settings section.
- Marketing messages is currently displayed as **On**.
- Back navigation is available.

The screenshots do not yet establish the underlying persistence/API behavior of these settings.

## Current Language Settings

Selecting **Language** displays:

> **Choose your language:**

The currently available language choices visible in the bot are:

| Displayed option | Language |
|---|---|
| 🇮🇷 فارسی | Persian / Farsi |
| 🇬🇧 English | English |
| 🇫🇷 Français | French |
| 🇷🇺 Русский | Russian |
| 🇮🇳 हिन्दी | Hindi |

### Current navigation

```text
Main Menu
   ↓
Settings
   ↓
Language
   ↓
Choose your language
   ├── 🇮🇷 فارسی
   ├── 🇬🇧 English
   ├── 🇫🇷 Français
   ├── 🇷🇺 Русский
   └── 🇮🇳 हिन्दी
```

The current screenshots confirm that these five language options are displayed.

The following behavior is **not yet documented**:

- language persistence;
- language selection response;
- whether the current screen is refreshed after selection;
- whether `/start` uses the selected language;
- fallback behavior for untranslated strings;
- completeness of translations across all bot flows.

## Current Marketing Messages Setting

The current Settings UI displays:

```text
Marketing messages: 🔔 On
```

This confirms the existence of a marketing-message preference and that the displayed current state is **On**.

The following behavior is not yet documented:

- how the user toggles the setting;
- the Off state;
- persistence mechanism;
- exact definition of marketing messages;
- distinction between marketing and transactional/system notifications.

## Current Back Navigation

The Settings screen exposes a **Back** button.

The intended visible navigation is:

```text
Settings
   ↓
Back
   ↓
Main Menu
```

The exact implementation/state-management behavior should be verified from the bot flow before being treated as a technical specification.

## Current navigation map

```text
/start
  │
  ▼
Main Menu
  │
  ├── 🏠 Create Listing
  │      └── Not yet documented
  │
  ├── 🔍 Search Listings
  │      └── Not yet documented
  │
  ├── Your saved searches
  │      └── Not yet documented
  │
  ├── ⚙️ Settings
  │      │
  │      ├── 🌐 Language
  │      │      ├── 🇮🇷 فارسی
  │      │      ├── 🇬🇧 English
  │      │      ├── 🇫🇷 Français
  │      │      ├── 🇷🇺 Русский
  │      │      └── 🇮🇳 हिन्दी
  │      │
  │      ├── 📣 Marketing messages: 🔔 On
  │      │
  │      └── ↩️ Back
  │
  └── ❓ Help
         └── Not yet documented
```

## Current UI copy

| Area | Current text |
|---|---|
| Main Menu | What would you like to do? |
| Main Menu | Create Listing |
| Main Menu | Search Listings |
| Main Menu | Your saved searches |
| Main Menu | Settings |
| Main Menu | Help |
| Settings | Settings |
| Settings | Language |
| Settings | Marketing messages: 🔔 On |
| Settings | Back |
| Language | Choose your language: |
| Language | فارسی |
| Language | English |
| Language | Français |
| Language | Русский |
| Language | हिन्दी |

## Current implementation status

### Documented / confirmed

- `/start` entry point.
- Main Menu.
- Create Listing entry point.
- Search Listings entry point.
- Your saved searches entry point.
- Settings entry point.
- Help entry point.
- Settings → Language.
- Five visible language options.
- Settings → Marketing messages.
- Settings → Back.

### Not yet documented

The following areas need a separate current-state review before implementation work is specified:

- Registration.
- Phone verification.
- Create Listing.
- Category selection.
- Listing fields.
- Image upload.
- Listing preview.
- Listing submission.
- Moderation state shown to the user.
- Search Listings.
- Search filters.
- Listing detail.
- Contact/unlock flow.
- Saved Search creation and management.
- Saved Search notifications.
- Help.
- Language selection result.
- Marketing-message toggle behavior.
- Error handling.
- Cancel behavior.
- Back behavior inside multi-step flows.
- Restart behavior.

## Related documentation

The broader Telegram product/source documentation is maintained under:

- [Telegram Bot Overview](../../07-telegram-bot/overview.md)
- [Telegram Bot Flows](../../07-telegram-bot/flows.md)

Those documents contain broader product flows and historical/source requirements. This `docs/telegram-bot/` section is the **current-state reference for the reviewed Telegram Bot UI**.

## Next documentation updates

As each flow is reviewed, add or update a dedicated current-state document under `docs/telegram-bot/`.

Recommended structure:

- `overview.md` — overall current bot state and navigation.
- `start.md` — /start, registration and entry behavior.
- `create-listing.md` — listing creation flow.
- `search.md` — search and listing discovery.
- `saved-searches.md` — saved searches and alerts.
- `settings.md` — settings, language and marketing preferences.
- `help.md` — Help flow.

For each documented flow capture:

1. Entry point
2. User action
3. Bot response
4. Buttons
5. State transitions
6. Validation
7. Back / Cancel
8. Error states
9. Data collected
10. Persistence/API side effects when known
11. Completion state
12. Restart behavior
