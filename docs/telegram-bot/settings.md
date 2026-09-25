# Advertio Telegram Bot — Settings Current State

> Current-state documentation as of **25 Sep 2026**.
>
> This document records only behavior currently confirmed in the reviewed Telegram Bot UI.

## Entry point

Settings is available from the Main Menu:

```text
Main Menu
   ↓
Settings
```

## Current Settings screen

The Settings screen currently exposes:

- 🌐 **Language**
- 📣 **Marketing messages: 🔔 On**
- ↩️ **Back**

### Current UI

```text
Settings

🌐 Language
📣 Marketing messages: 🔔 On
↩️ Back
```

## Language

Selecting **Language** opens:

> **Choose your language:**

The currently visible options are:

| Option | Language |
|---|---|
| 🇮🇷 فارسی | Persian / Farsi |
| 🇬🇧 English | English |
| 🇫🇷 Français | French |
| 🇷🇺 Русский | Russian |
| 🇮🇳 हिन्दी | Hindi |

### Current navigation

```text
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

### Not yet documented

The current UI review does not establish:

- language persistence;
- what happens immediately after selecting a language;
- whether the screen is refreshed;
- whether the selected language affects `/start`;
- fallback behavior for untranslated strings;
- translation coverage across the remaining bot flows.

## Marketing messages

The Settings screen currently displays:

```text
Marketing messages: 🔔 On
```

This confirms that a marketing-message preference is exposed and that the currently displayed state is **On**.

### Not yet documented

The current UI review does not establish:

- how the preference is toggled;
- whether an **Off** state is available;
- whether the preference is persisted;
- what messages are classified as marketing;
- how marketing messages differ from transactional/system notifications.

## Back navigation

A **Back** control is visible on the Settings screen.

The visible navigation is:

```text
Settings
   ↓
Back
   ↓
Main Menu
```

The exact state-management and callback behavior should be verified from the implementation before being treated as a technical specification.

## Current implementation boundary

This document intentionally does not describe registration, listing creation, search, saved searches, Help, API contracts, persistence, or backend behavior. Those areas require their own current-state review.
