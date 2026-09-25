# Advertio Telegram Bot — Current State

> Current-state documentation as of **25 Sep 2026**.
>
> This document records only behavior confirmed from the reviewed Telegram Bot UI and the contents of the `feature/telegram-bot-flow` branch.

## Evidence reviewed

- Telegram Bot screenshots supplied for this review.
- Existing documentation under `docs/telegram-bot/`.
- Repository tree for `feature/telegram-bot-flow`.

The branch currently contains documentation files and no executable Telegram Bot source files (`.py`, `.js`, `.ts`, `.tsx`, or equivalent). Therefore, handler/function names and implementation-level callback behavior are **Not Verified** from this branch.

## Current entry point

The reviewed bot supports the Telegram `/start` command.

After `/start`, the bot displays:

> **What would you like to do?**

The reviewed Main Menu contains:

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

## Current navigation

The reviewed UI confirms these Main Menu entry points:

```text
/start
  │
  ▼
Main Menu
  │
  ├── 🏠 Create Listing
  │      └── Category selection
  │
  ├── 🔍 Search Listings
  │      └── Not Verified
  │
  ├── Your saved searches
  │      └── Not Verified
  │
  ├── ⚙️ Settings
  │      └── Documented in settings.md
  │
  └── ❓ Help
         └── Not Verified
```

## Create Listing

The reviewed Create Listing flow currently shows:

```text
Create Listing
   ↓
Which category?

├── Housing & Roommate
├── Passenger Cargo
├── Jobs
├── Services
└── Social & Events
```

A **Cancel** button is also visible on the category-selection screen.

The reviewed Housing & Roommate path then shows:

```text
Housing & Roommate
   ↓
Listing Type

├── Rent
├── Roommate
├── Skip
└── Cancel
```

The next reviewed screen shows:

> **Which city? Type a name, or tap Any.**

with:

- **Any**
- **Cancel**

The screenshots do not show the user action between each captured screen, so the exact callback/state transition is **Not Verified**. The full current-state description is in [create-listing.md](./create-listing.md).

## Current Settings

The reviewed Settings screen exposes:

- 🌐 **Language**
- 📣 **Marketing messages: 🔔 On**
- ↩️ **Back**

The current Language screen displays:

> **Choose your language:**

with:

- 🇮🇷 **فارسی**
- 🇬🇧 **English**
- 🇫🇷 **Français**
- 🇷🇺 **Русский**
- 🇮🇳 **हिन्दी**

The screenshots confirm the visible controls and text. Persistence and post-selection behavior are **Not Verified**.

## Visible Telegram UI outside the documented bot flow

A **Share my phone number** control is visible in the supplied Telegram screenshot. The screenshot does not establish when or why this control is presented, so its relationship to the bot flow is **Not Verified**.

The Telegram client also shows an **Advertio mini app** button. The mini-app behavior is outside the reviewed bot flow and is **Not Verified** here.

## Current UI copy

| Area | Current text |
|---|---|
| Main Menu | What would you like to do? |
| Main Menu | Create Listing |
| Main Menu | Search Listings |
| Main Menu | Your saved searches |
| Main Menu | Settings |
| Main Menu | Help |
| Create Listing | Which category? |
| Category | Housing & Roommate |
| Category | Passenger Cargo |
| Category | Jobs |
| Category | Services |
| Category | Social & Events |
| Listing Type | Listing Type |
| Listing Type | Rent |
| Listing Type | Roommate |
| Listing Type | Skip |
| City | Which city? Type a name, or tap Any. |
| City | Any |
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

## Not Verified

The following are not established by the reviewed screenshots or by executable code in this branch:

- Registration and phone-verification flow.
- Exact handler/callback names.
- Backend/API calls.
- Persistence behavior.
- Search Listings flow.
- Saved Searches flow.
- Help flow.
- The result of selecting a listing type.
- The result of entering/selecting a city.
- Behavior of **Any**.
- Behavior of **Cancel** in the reviewed Create Listing screens.
- Validation and error messages.
- Listing fields after city selection.
- Listing preview or submission behavior.
- Behavior of the **Share my phone number** control.
- Advertio Mini App behavior.
