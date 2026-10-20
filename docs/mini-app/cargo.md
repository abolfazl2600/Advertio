# Cargo — current implementation

> **Status:** implemented in GitLab `master` on 2026-10-19. This is implementation status, not a Production deployment audit.

## 1. Identity and purpose

- User-facing label: **Cargo**.
- Canonical backend category slug: `passenger-cargo`.
- Purpose: match a traveller who has luggage capacity with someone who wants to send an item. It is not a passenger ride-share product or a commercial freight-management system.
- One listing model with a `role` attribute; traveller and sender are two sides of the same category, not separate categories.

## 2. Create a trip

The entire form is on one screen. Four choices are required: role, origin city, destination city and travel date. The title is generated from the choices, so a free-text title is not required.

### Required fields

| Field | Values / rule |
|---|---|
| `role` | `traveler` (Travelling) or `sender` (Sending) |
| `origin_country` + `origin` | Pick a country and a city from the location catalog |
| `destination_country` + `destination` | Pick a country and a city from the location catalog |
| `travel_date` | Required travel date |

The supported country list is Iran, Canada, United States, Germany, Italy, United Kingdom and France. City names are validated server-side against the selected country; a city outside the catalog is rejected. The listing's own location is resolved from the origin city.

### Optional details

| Field | Behavior |
|---|---|
| `cargo_type` | Documents, Clothes, Electronics, Food or Other |
| `weight_kg` | Optional weight; schema range is 0.1–30 kg |
| `price` | Optional positive amount |
| `price_negotiable` | Set when the publisher has not supplied a numeric price |
| `description` | Optional note, shown on the detail page |

The optional section is collapsed by default. Price input is role-aware: a traveller quotes a **price per kilogram**, while a sender quotes a **total offer**.

### Currency rules

Currency is derived from the route rather than requested as another required choice:

- Canada → CAD
- United States → USD
- United Kingdom → GBP
- Germany, Italy and France → EUR
- Iran has no currency mapping in the Cargo price selector. The non-Iran end determines the currency; if both ends are foreign, the origin country is used. If no mapped foreign country is available, the code falls back to CAD.

The UI formats amounts with currency symbols and suppresses unnecessary trailing decimals for whole amounts.

## 3. Feed and route filters

The Cargo feed exposes:

- Role filter: All, Travellers or Senders.
- Origin filter: any city or a selected catalog city.
- Destination filter: any city or a selected catalog city.
- A swap action exchanges the selected origin and destination.
- Infinite/paged feed loading, loading skeletons and an empty state that offers to clear filters.

Trips whose `travel_date` is before the user's current local calendar date are hidden from the feed. **This is feed filtering only:** the underlying listing still follows the normal listing TTL/lifecycle, seeded at 30 days. The system does not automatically expire the listing status just because the trip date has passed.

## 4. Detail page

The detail view shows the route with country flags, travel date, traveller/sender role, price, cargo type/weight when provided, optional note, publisher, trust badges and the shared contact section. It includes a reminder to consider destination customs rules. The page supports save/unsave, report and contact/conversation interactions through the shared listing layer.

For traveller listings, weight is presented as available capacity (for example, “Up to … kg”); for sender listings it is the package weight.

## 5. Shared behavior

- Cargo uses the same category pricing/policy provider as Housing; the initial Cargo policy rows are copied from Housing's then-current values when missing, then can be tuned independently.
- Contact, unlock, conversation, save, report, renew and boost use shared listing infrastructure.
- Cargo participates in Hub, Post chooser, global Search, Saved, My listings and category-scoped Gate A metrics.
- Listing creation, contact unlock, renew and boost prices are read from server policy/pricing; a zero price means the action is free.

## 6. Explicit gaps

The following are **not** included in CARGO-01:

- Cargo crawler ingestion. The documented crawler ingestion contract is Housing-only.
- Multiple active Cargo listings per user; the current one-active-listing-per-user-per-category rule remains.
- Lifecycle expiration based on travel date.
- A dedicated Cargo-specific route/date search wizard in the Telegram bot. The bot has a generic category search wizard, but its attribute matching is limited to supported scalar attributes.
- Production deployment confirmation.

## Source commits

- [Cargo backend and route schema](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/585a1fdb98bfc028e7fa9738a6298116e6543e46)
- [Cargo Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/09b569dcf117ccfa4bcfde0e5e41ed1b51901845)
