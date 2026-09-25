# Telegram Bot — Current Implementation State

> Status: **Implemented / observed in the live Telegram bot UI**
>
> Source of truth for this document: screenshots provided by the product owner on **2026-09-25**.
>
> This document records **what is currently visible and testable in the bot**, not the desired future behavior. Future changes should be documented separately so that the current implementation is not confused with planned functionality.

---

## 1. Purpose

This document is the baseline for the current Telegram Bot implementation of Advertio.

It exists so future development work can be described against a known state:

- what the user currently sees;
- which buttons currently exist;
- which settings are currently exposed;
- which languages are currently available;
- which states are confirmed by the current UI;
- which behavior has **not** yet been confirmed and therefore must not be assumed.

When a new feature is requested, compare it with this document first and update the document when the implemented behavior changes.

---

# 2. Current Entry Point — /start

## 2.1 /start behavior observed

When the user sends:

~~~text
/start
~~~

the bot responds with:

> **What would you like to do?**

The current main menu contains five actions:

1. 🏠 **Create Listing**
2. 🔍 **Search Listings**
3. **Your saved searches**
4. ⚙️ **Settings**
5. ❓ **Help**

The same main menu is shown after starting the bot in the provided screenshots.

### Current main-menu structure

~~~text
What would you like to do?

┌─────────────────────────────┐
│ 🏠 Create Listing            │
├─────────────────────────────┤
│ 🔍 Search Listings           │
├─────────────────────────────┤
│ Your saved searches          │
├─────────────────────────────┤
│ ⚙️ Settings                  │
├─────────────────────────────┤
│ ❓ Help                      │
└─────────────────────────────┘
~~~

## 2.2 Confirmed actions vs. unconfirmed internals

The screenshots confirm that the following menu entries are currently exposed:

- Create Listing
- Search Listings
- Your saved searches
- Settings
- Help

The screenshots **do not provide enough evidence** to document the internal behavior after clicking:

- Create Listing
- Search Listings
- Your saved searches
- Help

Those flows should therefore be documented after they are tested or provided in subsequent product-flow messages.

---

# 3. Settings

Selecting **Settings** opens a dedicated settings screen.

## 3.1 Current Settings menu

The current screen contains:

1. 🌐 **Language**
2. 📣 **Marketing messages: 🔔 On**
3. ↩️ **Back**

### Current structure

~~~text
Settings

┌────────────────────────────────────┐
│ 🌐 Language                        │
├────────────────────────────────────┤
│ 📣 Marketing messages: 🔔 On       │
├────────────────────────────────────┤
│ ↩️ Back                             │
└────────────────────────────────────┘
~~~

---

# 4. Language Settings

Selecting **Language** opens the language-selection screen.

The bot currently displays:

> **Choose your language:**

The currently visible language options are:

1. 🇮🇷 **فارسی**
2. 🇬🇧 **English**
3. 🇫🇷 **Français**
4. 🇷🇺 **Русский**
5. 🇮🇳 **हिन्दी**

### Current language menu

~~~text
Choose your language:

┌─────────────────────────────┐
│ 🇮🇷 فارسی                    │
├─────────────────────────────┤
│ 🇬🇧 English                  │
├─────────────────────────────┤
│ 🇫🇷 Français                 │
├─────────────────────────────┤
│ 🇷🇺 Русский                  │
├─────────────────────────────┤
│ 🇮🇳 हिन्दी                   │
└─────────────────────────────┘
~~~

## 4.1 Current language inventory

| UI label | Language | Code/status |
|---|---|---|
| فارسی | Persian / Farsi | Current option |
| English | English | Current option |
| Français | French | Current option |
| Русский | Russian | Current option |
| हिन्दी | Hindi | Current option |

> The screenshots confirm that these five options are displayed. They do **not** by themselves confirm that every screen and every bot message has been fully translated into all five languages.

## 4.2 Language-selection flow

The currently observed navigation is:

~~~text
Main Menu
   ↓
Settings
   ↓
Language
   ↓
Choose your language
   ↓
Persian / English / French / Russian / Hindi
~~~

The exact post-selection behavior is not documented here yet because the provided screenshots do not show the result of selecting a language.

When that behavior is tested, document:

- whether the language is saved immediately;
- whether the current screen is refreshed;
- whether the Main Menu is translated immediately;
- whether the language is stored per user;
- what happens when the user uses /start again;
- fallback behavior when a translation is missing.

---

# 5. Marketing Messages Setting

The Settings screen currently exposes:

> **Marketing messages: 🔔 On**

This confirms that a marketing-message preference exists in the current UI and that its displayed current state in the provided screenshot is **On**.

### Current state

~~~text
Marketing messages = On
~~~

The screenshots do not yet confirm:

- how the toggle is changed;
- whether the state changes between On/Off;
- whether the preference is persisted;
- which messages are classified as marketing;
- whether transactional/operational notifications are separate from marketing messages;
- whether changing language affects marketing-message language.

These details should be added after the setting is tested.

---

# 6. Back Navigation

The Settings screen contains a:

> ↩️ **Back**

button.

The visible intent is navigation back from Settings to the previous/main menu.

The exact callback/navigation implementation is not documented from screenshots alone.

For future implementation, preserve the principle that navigation should return the user to the appropriate previous bot state rather than creating an unnecessary new conversation branch.

---

# 7. Current Bot Navigation Map

Based only on the currently observed UI:

~~~text
/start
  │
  ▼
Main Menu
  │
  ├── 🏠 Create Listing
  │      └── Flow not yet captured in current-state documentation
  │
  ├── 🔍 Search Listings
  │      └── Flow not yet captured in current-state documentation
  │
  ├── Your saved searches
  │      └── Flow not yet captured in current-state documentation
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
         └── Flow not yet captured in current-state documentation
~~~

---

# 8. Current UI Copy

The following strings are confirmed from the provided screenshots.

| Context | Current text |
|---|---|
| Main menu prompt | What would you like to do? |
| Main menu | Create Listing |
| Main menu | Search Listings |
| Main menu | Your saved searches |
| Main menu | Settings |
| Main menu | Help |
| Settings | Settings |
| Settings | Language |
| Settings | Marketing messages: 🔔 On |
| Settings | Back |
| Language | Choose your language: |
| Language | English |
| Language | Français |
| Language | Русский |
| Language | हिन्दी |
| Language | فارسی |

---

# 9. What Is Confirmed vs. What Still Needs Capture

## Confirmed from current UI

- /start is an active entry point.
- Main Menu is displayed after /start.
- Main Menu has five visible actions.
- Settings is accessible from Main Menu.
- Settings has Language, Marketing messages and Back.
- Language has five visible language choices.
- Marketing messages currently displays **On**.
- The bot uses Telegram button-based menu interactions for these menu screens.

## Not yet confirmed in this document

The following need to be captured in later flow documentation:

- New-user registration flow.
- Phone verification flow.
- Create Listing flow.
- Category selection.
- Listing form fields.
- Image upload behavior.
- Listing preview/edit/confirm.
- Listing submission/moderation.
- Search Listings flow.
- Search filters.
- Listing details.
- Contact flow.
- Saved Search creation/edit/delete.
- Saved Search notification behavior.
- Help content.
- Language persistence and fallback behavior.
- Marketing-message toggle behavior.
- User profile behavior.
- My Listings behavior, if exposed elsewhere in the implementation.
- Error, cancel, back and restart behavior across multi-step flows.

---

# 10. Documentation Rule for Future Development

This file is the **current implementation baseline**.

When a future change is requested:

### Before implementation

1. Identify the affected current state in this document.
2. Identify whether the requested behavior is new or a modification of an existing behavior.
3. Define the desired new flow separately.
4. Implement it on the feature branch.

### After implementation

Update this document when the change becomes part of the implemented bot flow.

Use the following distinction:

- **Current implementation** → behavior that exists in the bot.
- **Planned flow** → behavior agreed for future development but not implemented yet.
- **Not confirmed** → behavior that has not been tested or provided as evidence.
- **Deprecated** → previously implemented behavior that has been replaced.

This prevents future development tasks from mixing current code behavior with product assumptions.

---

# 11. Next Flow Capture

The next bot areas should be documented as separate detailed flows when their screenshots/requirements are provided:

1. **Create Listing**
2. **Search Listings**
3. **Your saved searches**
4. **Help**
5. **Language selection result**
6. **Marketing message toggle**

For each flow, record:

- entry point;
- user action;
- bot response;
- buttons;
- possible states;
- Back behavior;
- Cancel behavior;
- validation;
- error states;
- data collected;
- data persisted;
- API/DB side effects where known;
- successful completion state;
- restart behavior.
