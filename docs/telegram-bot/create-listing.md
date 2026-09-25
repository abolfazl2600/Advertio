# Advertio Telegram Bot — Create Listing Current State

> Current-state documentation as of **25 Sep 2026**.
>
> This document records only UI behavior visible in the supplied Telegram Bot screenshots. It does not infer hidden state transitions or backend behavior.

## Entry point

The reviewed Create Listing flow starts from the Main Menu:

```text
Main Menu
   ↓
🏠 Create Listing
```

The bot then displays:

> **Which category?**

## Category selection

The currently visible category buttons are:

- **Housing & Roommate**
- **Passenger Cargo**
- **Jobs**
- **Services**
- **Social & Events**
- **Cancel**

### Current UI

```text
Which category?

Housing & Roommate
Passenger Cargo
Jobs
Services
Social & Events
✖ Cancel
```

The exact button labels above are transcribed from the supplied screenshot.

## Housing & Roommate

The supplied screenshots include a subsequent screen with:

> **Listing Type**

The visible buttons are:

- **Rent**
- **Roommate**
- **Skip**
- **Cancel**

### Current UI

```text
Listing Type

Rent
Roommate
Skip
Cancel
```

The screenshots do not show the user's tap between the category screen and this screen. Therefore, the exact callback/state transition is **Not Verified**.

## City selection

The next reviewed screen displays:

> **Which city? Type a name, or tap Any.**

The visible buttons are:

- **Any**
- **Cancel**

### Current UI

```text
Which city? Type a name, or tap Any.

Any
Cancel
```

The screenshot sequence does not show which Listing Type button was selected immediately before this screen. Therefore, the exact Listing Type → City transition is **Not Verified**.

The message itself confirms that the screen accepts a city name as typed input or provides an **Any** button. The screenshots do not show the result of either action.

## Current reviewed flow

Only the following screens are confirmed by the supplied screenshots:

```text
Main Menu
   ↓
🏠 Create Listing
   ↓
Which category?
   ├── Housing & Roommate
   ├── Passenger Cargo
   ├── Jobs
   ├── Services
   ├── Social & Events
   └── Cancel

Housing & Roommate
   ↓
Listing Type
   ├── Rent
   ├── Roommate
   ├── Skip
   └── Cancel

[following reviewed screen]
   ↓
Which city? Type a name, or tap Any.
   ├── Any
   └── Cancel
```

The bracketed transition is intentionally not assigned to a specific button because the supplied screenshots do not show the intervening user action.

## Not Verified

The reviewed material does not establish:

- callback data or handler names;
- the exact transition from each category;
- the exact transition from each Listing Type option;
- the result of **Any**;
- city-name validation;
- what happens after a city is entered;
- additional listing fields;
- image upload behavior;
- listing preview;
- listing submission;
- moderation status;
- persistence/API calls;
- error messages;
- **Cancel** behavior;
- back navigation inside the Create Listing flow.

The `feature/telegram-bot-flow` branch contains no executable Telegram Bot source files, so implementation-level handler references cannot be verified from the repository.
