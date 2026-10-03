# Jobs — Category Overview

> Category documentation prepared from the current Advertio product documentation, reviewed Telegram Bot state, Mini App current state, and the original project source as of **3 Oct 2026**.

## Current implementation status

Jobs is an Advertio product category, but it is **not yet a fully verified live Mini App category experience**.

Current verified state:

- **Telegram Bot — Create Listing** shows **Jobs** in the category-selection screen.
- **Mini App Home** shows **Jobs** as **Coming Soon**.
- No dedicated Jobs feed UI has been verified.
- No dedicated Jobs filter UI has been verified.
- No dedicated Jobs listing-detail UI has been verified.
- No completed Jobs-specific Mini App implementation issue has been identified in the current repository review.

Therefore, this folder separates:

1. **Current verified behavior**
2. **Source-defined product rules**
3. **Not-yet-defined Jobs schema/product decisions**

## Product priority

The original product source identifies Jobs as the **second category priority after Housing**.

Source rationale:

- high demand;
- serious/high-intent users;
- monetization opportunity on the job-seeker side;
- focus on General Jobs / daily work.

The source also contains an internal General Jobs Canada market-sizing exercise. Those numbers are historical planning assumptions and are not treated here as current externally verified market data.

## Current surfaces

### Telegram Bot

Current verified category-selection UI includes:

```text
Housing & Roommate
Passenger Cargo
Jobs
Services
Social & Events
```

The Jobs button itself is visible.

The next Jobs-specific posting steps are **not verified** from the reviewed Telegram screenshots.

### Mini App

Current Home status:

```text
Jobs → Coming Soon
```

Housing remains the currently verified live category experience.

### Search

Global Search exists in the Mini App.

A future Telegram Quick Search task (#33) defines Jobs as one of the categories that should participate in global search and uses:

```text
💼
```

as the Jobs category emoji.

Issue #33 is not treated as implemented in this category documentation until separately verified.

## Source-defined listing flow

The generic Advertio listing flow applies to Jobs:

```text
Choose category
→ eligibility check
→ title
→ description
→ images
→ location
→ category-specific fields
→ preview
→ confirm
→ Pending
→ Admin moderation
→ Approved / Published
→ lifecycle
```

The original source explicitly names **job type** as a Jobs-specific field.

No complete canonical Jobs attribute schema is defined in the current source.

## Lifecycle relationship

The shared product source places Jobs inside the listing lifecycle that can include:

- Pending
- Admin moderation
- Approved / Published
- Active
- Expired
- Extend
- Boost
- Urgent

The source also says Early Access applies to Jobs, but two incompatible Early Access timing models exist. See [monetization.md](./monetization.md).

## Supply model

The general Advertio supply distinction applies:

- user-generated/native listings;
- crawled listings for initial supply.

Crawled listings must remain distinguishable from native Jobs listings.

The original source explicitly warns that crawler supply must not become the permanent product and that real/native supply should grow beyond crawled supply.

## Documentation status

This folder does **not** invent a finished Jobs product schema.

Where the source is incomplete, the files say so explicitly.

## Related documentation

- [Jobs attributes](./attributes.md)
- [Jobs filters](./filters.md)
- [General Jobs](./general-jobs.md)
- [Jobs monetization](./monetization.md)
- [Jobs rules](./rules.md)
- [Product overview](../../03-product/product-overview.md)
- [Product rules](../../03-product/product-rules.md)
- [Listing lifecycle](../../03-product/listing-lifecycle.md)
- [Telegram Bot current state](../../docs/telegram-bot/overview.md)
- [Mini App current state](../../docs/mini-app/overview.md)
