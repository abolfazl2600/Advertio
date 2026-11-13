# Public landing page, Apps Hub and Web localization

> **Current implementation:** GitLab master through 2026-11-13. See [November 13 source audit](../releases/2026-11-13.md).

## 1. Public entry point and category directory

The public website entry point is the Landing page at `/`. It is a product introduction, not the in-app category Hub.

The Landing page currently contains:

- Advertio brand/header.
- Product headline and introductory copy.
- Calls to action to open the Apps directory or Search.
- A grid of the currently live journeys.
- A short three-step explanation of using Advertio.
- A phone-verification note.

The in-app category directory is `/apps`. The Apps tab in the shared tab bar points there. The Landing page at `/` hides the tab bar; journey pages also hide it and use their own navigation.

## 2. Current route contract

| Route | Purpose |
|---|---|
| `/` | Public Landing page |
| `/apps` | Apps Hub / live category directory |
| `/search` | Global Search |
| `/wallet` | Wallet |
| `/profile` | Profile |
| `/saved` | Saved listings |
| `/my-listings` | Owner listings |
| `/post` | Journey chooser when multiple journeys are live |
| `/apps/housing` | Housing feed |
| `/apps/passenger-cargo` | Cargo feed |
| `/apps/jobs` | Jobs feed |
| `/apps/<slug>/new` | Journey create form |
| `/apps/<slug>/:id` | Journey listing detail |
| `/my-listings/:id/performance` | Owner-only listing performance report |

The canonical journey slugs remain the backend category slugs: `housing`, `passenger-cargo` and `jobs`. Cargo is the display name; do not replace the canonical slug with `cargo`.

**Legacy route boundary:** root-level journey URLs such as `/housing`, `/jobs` and `/passenger-cargo` are not kept as redirects. Update external links, channel messages and campaigns to the `/apps/` structure.

## 3. Five-language Web localization

The Web app supports the same five locales as the Telegram bot:

| Locale | Display name | HTML language | Direction |
|---|---|---|---|
| `fa-IR` | فارسی | `fa` | RTL |
| `en-CA` | English | `en` | LTR |
| `fr-FR` | Français | `fr` | LTR |
| `ru-RU` | Русский | `ru` | LTR |
| `hi-IN` | हिन्दी | `hi` | LTR |

### Locale selection order

1. The authenticated account's saved locale.
2. The browser-stored locale for this device.
3. The first-visit language picker, shown before the rest of the site.

The language choice is available in Profile. A signed-in user changing language writes the locale to the account and the browser. Telegram and Web use the same User.Locale field, so the preference is shared between the bot and Web app. Telegram's language_code can seed a locale when an account is first created; an explicit later user choice takes precedence.

### Translation behavior

- The document's lang and dir are set before the first translated screen is painted.
- Persian is RTL. English, French, Russian and Hindi are LTR.
- Static Web interface strings use Web translation catalogs.
- API errors with localization codes use the corresponding backend locale catalogs.
- Category attribute labels and location names use Persian label/name fields when the active locale is Persian and those fields are available.
- Missing translation keys and unsupported localized labels fall back to English.
- User-authored listing titles and descriptions remain in the author's language; the app does not automatically translate listing content.

## 4. Product/architecture decisions

- [ADR 0013 — Web localization](../adr/ADR-0013-web-localization.md)
- [ADR 0014 — Journey paths under /apps/](../adr/ADR-0014-journey-apps-prefix.md)

Source merge requests: [Web localization, MR !50](https://gitlab.com/advertio/platform/advertio-monorepo/-/merge_requests/50) · [Landing page and journey URL prefix, MR !51](https://gitlab.com/advertio/platform/advertio-monorepo/-/merge_requests/51).

## 5. Deployment boundary

The behavior described here is present in merged GitLab master source. It does not establish that the current master revision is deployed to Production or that every environment has the same configuration.
