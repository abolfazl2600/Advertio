# Advertio Telegram Bot — Start & Entry State

> Current-state documentation as of **25 Sep 2026**.
>
> This document records only behavior currently confirmed in the reviewed Telegram Bot UI. It is not a product specification and does not infer backend behavior.

## Entry point

The current bot supports the Telegram `/start` command.

### Current response

After `/start`, the bot displays:

> **What would you like to do?**

The user is then presented with the Main Menu.

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

## Confirmed behavior

The following is confirmed from the current UI review:

- `/start` is available as the bot entry command.
- The Main Menu is displayed after entering the bot.
- The five Main Menu entry points listed above are visible.

## Not yet documented

The current UI review does not establish:

- whether a new user is required to register before seeing the Main Menu;
- whether phone verification is required;
- whether an existing user and a new user receive different `/start` responses;
- whether `/start` accepts or processes deep-link parameters;
- whether the selected language changes the `/start` response;
- what happens when `/start` is invoked repeatedly;
- error handling around `/start`;
- persistence or API calls triggered by `/start`.

These behaviors should be documented only after the corresponding flow is reviewed.

## Related current-state documents

- [Current Bot Overview](./overview.md)
- [Settings](./settings.md)
