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

## Marketing messages

The Settings screen currently displays:

```text
Marketing messages: 🔔 On
```

This confirms that the preference is displayed with the current visible state **On**.

## Back navigation

A **Back** control is visible on the Settings screen.

The reviewed UI shows:

```text
Settings
   ↓
Back
   ↓
Main Menu
```

## Not Verified

The screenshots do not establish:

- language persistence;
- what happens immediately after selecting a language;
- whether the Settings screen is refreshed;
- whether the selected language affects `/start`;
- fallback behavior for untranslated strings;
- how the marketing-message preference is toggled;
- whether an **Off** state is available;
- whether the marketing-message preference is persisted;
- what messages are classified as marketing;
- exact state-management or callback behavior for **Back**.

No executable Telegram Bot source files are present in the reviewed branch, so implementation-level handler names and persistence/API behavior are **Not Verified**.
