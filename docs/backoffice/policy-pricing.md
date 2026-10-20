# Backoffice — Policy & pricing

> Policy & pricing is the source of truth for category action prices and the timing rules that apply to listings. The page is configuration-driven; check the live value rather than assuming a seed default.

## 1. Category policy overview

The page loads policies for categories and shows a comparison table. Selecting a category opens its editor. Unsaved changes are tracked per category; an admin can save that category or discard the draft. A “not set” marker identifies values supplied by a default rather than an explicit category override.

The current live Web journeys are Housing, Cargo and Jobs. Other seeded category records may appear in backend category data but do not automatically become live Web journeys.

## 2. Action prices

Each category has four action prices, denominated in Advertio Coins:

| Action key | Meaning | Charge timing |
|---|---|---|
| `create_listing` | Post a new listing | When the user submits a new listing |
| `renew_listing` | Renew an active/expired listing | At the renewal action |
| `boost_listing` | Boost an active listing in the feed | At the boost action |
| `contact_unlock` | Unlock/contact a listing | Determined by the listing's stored contact cost and paid phase |

**Zero means free:** the wallet is not touched and a user with no balance can still perform the action.

The editor validates whole-number coin prices in the configured range. The page shows the approximate USD equivalent using the product's current display convention (10 coins ≈ $1); this is a display reference, not a currency conversion service.

### Price snapshot semantics

- A listing's contact-unlock price is snapshotted when a moderator approves it. Changing `contact_unlock` later does not re-price listings already live.
- Create, renew and boost prices are read at the time the action is performed. Changes therefore affect subsequent actions on existing listings.
- The backend rechecks price and listing state at action time; a stale price displayed in a browser is not authoritative.

## 3. Paid phase and early window

Each category configures the phase in which contact becomes paid:

- **Early:** the first window is paid; after the early window the listing transitions to the public phase.
- **Late:** the first window is free; contact becomes paid after the early window.

The **Early window in hours** controls the length of that first window. The seeded default is 72 hours. This setting and the selected phase are per-category. Existing listing state transitions are server-driven; the UI does not decide the charge based on local time alone.

## 4. Listing TTL and boost duration

- **Days a renewal adds / listing TTL:** the number of days a renewal adds. Seeded default is 30 days. The editor supports 1–365 days.
- **Hours a boost lasts:** boost duration. Seeded default is 72 hours. The editor supports 1–720 hours.

The normal listing expiry is not automatically the Cargo travel date. Cargo feed code hides past-date trips, but the listing lifecycle remains tied to its configured TTL.

## 5. Service prices

The Services card configures prices outside category policies. Identity verification is the current service using this mechanism.

- Prices are whole-number coins from 0 to 100,000.
- The card labels prices as approximate USD equivalent using 10 coins ≈ $1.
- A new price applies to identity-verification requests started after the change.
- An already-paid request retains the price/coins charged for that request.

Seed defaults are not a guarantee of live values. The seeded identity-verification price is 80 coins; the seeded category defaults use 20 coins for contact unlock and zero for create/renew/boost. Cargo and Jobs initially copy Housing policy values if their category policy rows are missing, then can be edited independently.

## 6. Business-rule boundaries

- One active user-created listing per user per category is a server rule, not an editable policy field.
- Policy prices do not imply that every category has crawler ingestion.
- Crawled listing contact redirects to the original source and never charges Advertio Coins.
- Changes in this page should be coordinated with Gate A metrics because charging to post can reduce new user-generated supply.

## Related pages

- [Wallet](../mini-app/wallet.md)
- [Shared listing interactions](../mini-app/listing-interactions.md)
- [Gate A](./gate-a.md)
- [Payments](./payments.md)
