# Advertio Telegram Bot — Start & Entry State

> Current-state documentation as of **25 Sep 2026**.
>
> This document records only behavior confirmed in the reviewed Telegram Bot UI.

## Entry point

The reviewed bot supports the Telegram `/start` command.

### Current response

After `/start`, the bot displays:

> **What would you like to do?**

The Main Menu is then visible.

## Main Menu

The currently visible options are:

1. 🏠 **Create Listing**
2. 🔍 **Search Listings**
3. **Your saved searches**
4. ⚙️ **Settings**
5. ❓ **Help**

### Current navigation

```text
/start
  ↓
Main Menu
  ├── Create Listing
  ├── Search Listings
  ├── Your saved searches
  ├── Settings
  └── Help
```

## Confirmed UI

The supplied screenshot confirms:

- `/start` is shown as the user command.
- **What would you like to do?** is displayed by the bot.
- The five Main Menu options above are visible.
- **Create Listing** opens the category-selection screen documented in [create-listing.md](./create-listing.md).

## Additional visible control

A Telegram **Share my phone number** control is visible at the bottom of one supplied screenshot.

The screenshot does not establish:

- what event caused this control to appear;
- whether it is part of registration;
- whether it is required for any Main Menu action;
- what happens after it is selected.

These points are **Not Verified**.

## Not Verified

The reviewed UI does not establish:

- whether a new user must register before seeing the Main Menu;
- whether phone verification is required;
- whether existing and new users receive different `/start` responses;
- whether `/start` accepts or processes deep-link parameters;
- whether the selected language changes the `/start` response;
- what happens when `/start` is invoked repeatedly;
- error handling around `/start`;
- persistence or API calls triggered by `/start`.

No executable Telegram Bot source files are present in the reviewed branch, so handler/function names are also **Not Verified**.
