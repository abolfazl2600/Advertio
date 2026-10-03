# Advertio Telegram Bot — Current State

> Current-state documentation as of **3 Oct 2026**.
>
> This document records behavior confirmed from the reviewed Telegram Bot UI, repository documentation, and completed/published product tasks.

## Evidence reviewed

- Telegram Bot screenshots supplied for this review.
- Existing documentation under `docs/telegram-bot/`.
- Repository tree for `feature/telegram-bot-flow`.
- Completed GitHub Issue #31 and its published real-world admin report example.

The reviewed branch contains documentation files but no executable Telegram Bot source files (`.py`, `.js`, `.ts`, `.tsx`, or equivalent). Therefore, handler/function names and implementation-level callback behavior are **Not Verified** from this branch unless separately confirmed by a completed/published task.

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

## Admin Management Report

The Telegram Bot currently includes a completed and published **Admin Management Report** feature.

### Current behavior

- A management report is generated automatically every **24 hours** for authorized admins.
- Authorized admins can request the same report on demand using `/adminreport`.
- Administrative report data is restricted to authorized admin users.
- The report clearly separates **current totals/state** from **last 24 hours** activity.
- The report includes its generation timestamp and timezone.
- Metrics that are not reliably tracked are explicitly omitted/noted rather than populated with invented values.

### Current report coverage

The published report currently includes:

- **Users**
  - Activated users
  - Phone/identity verification totals
  - Total accounts
  - Disabled accounts
  - New accounts in the last 24 hours
  - Newly activated users
  - Newly verified users

- **Listings**
  - Total active listings
  - User-posted vs crawled listings
  - Pending review
  - Expired, deactivated, and rejected listings
  - New listings in the last 24 hours
  - Listings grouped by category
  - Listings grouped by city

- **Active listings by city**

- **Saved searches**
  - Enabled saved searches
  - New saved searches in the last 24 hours

- **Listing reports**
  - Reports awaiting review
  - Reports submitted in the last 24 hours

- **Crawler activity**
  - Completed crawls
  - New vs already-known listings
  - Failed/rejected/server-error outcomes
  - Last successful crawl time

### Published example

A real published example recorded in GitHub Issue #31 included:

```text
📊 Advertio Admin Report
🕒 Generated 3 Oct 2026, 13:22 · Asia/Tehran (UTC+03:30)

👥 Users — now
• Activated users: 53
• Verified users: 3 phone · 0 identity
• Total accounts: 53 · disabled: 0

📋 Listings — now
• Total active listings: 174 (0 user-posted · 174 crawled)
• Pending review: 24
• Inactive: 223 expired · 44 deactivated · 11 rejected

🆕 Listings — last 24 h
• New listings: 13 (0 user-posted · 13 crawled)

🔎 Saved searches
• Enabled now: 3

🕷 Crawling
• Crawls completed: 14
• Crawls failed: 1
```

The production report contains additional city/category breakdowns and timestamps. The GitHub issue notes that metrics not tracked by the current system, such as number of searches and reported users, are not reported.

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
| Admin | /adminreport |

## Not Verified

The following are not established by the reviewed screenshots or by executable code in the reviewed documentation branch:

- Registration and phone-verification flow.
- Exact handler/callback names.
- Backend/API calls.
- Persistence behavior for the reviewed user-facing flows.
- Search Listings flow.
- Saved Searches user flow.
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

The Admin Management Report is excluded from this Not Verified list because Issue #31 is recorded as completed/published and includes a real output example.
