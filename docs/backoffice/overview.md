# Advertio Backoffice — current implementation

> **Reviewed:** 2026-10-20 against the executable Backoffice in GitLab `master`. This is code-level implementation documentation, not a Production deployment audit.

## Navigation and feature map

| Backoffice area | Current purpose | Detailed documentation |
|---|---|---|
| Gate A | Marketplace validation, supply/contact/payment funnel and instrumentation health | [Gate A](./gate-a.md) |
| Listings | Moderation, live listing inspection, reports, possible duplicates and listing performance | [Listings](./listings.md) |
| Policy & pricing | Per-category action prices, paid-contact phase, early window, listing TTL and boost duration; service prices | [Policy & pricing](./policy-pricing.md) |
| Inspections | Operational inspection requests, quotes/payments, visit/evidence/report/publication workflow | [Inspections](./inspections.md) |
| Crawled sources | Monitor ingestion freshness and deactivate a source's listings | [Crawled sources](./crawled-sources.md) |
| Channels | Automatic publication of matching listings to Telegram channels/groups | [Channels](./channels.md) |
| Users | Search/filter users, inspect accounts, direct Telegram message and hand selected users to Broadcasts | [Users](./users.md) |
| Broadcasts | One Telegram message to all, filtered or selected users, with recipient preview and delivery report | [Broadcasts](./broadcasts.md) |
| Verifications | Review paid identity-verification requests and evidence | [Verifications](./verifications.md) |
| Payments | Online payment history, refunds and manual-payment review/delivery | [Payments](./payments.md) |
| Coin flow | Credit/debit ledger of Advertio Coins | [Coin flow](./coin-flow.md) |
| Wallet actions | Audited admin coin credit and payment refund tools | [Wallet actions](./wallet-actions.md) |
| Your account | Admin username/password and Telegram report connection | [Account](./account.md) |

## Important distinctions

- **Payment** means money moved through a provider. **Coin flow** means Advertio Coins moved in a wallet. They are separate records and can be linked by a payment reference.
- **Channels** publish matching listings to configured Telegram destinations. **Broadcasts** send a message directly to selected users through the Advertio bot. They are different delivery features.
- **Crawled listings** are not user-created supply: they do not deduct coins to reach the original Telegram contact and are excluded from Gate A user-generated listing/contact metrics, except the explicit crawled-supply substitution comparison.
- **Identity verification** is not phone verification. It is a paid document/video workflow reviewed by an admin.
- Category action prices are configurable. A zero price means free; values shown in documentation as seed defaults are not necessarily the current live configuration.

## Current product scope

The three live Web journeys are Housing (`housing`), Cargo (`passenger-cargo`) and Jobs (`jobs`). Cargo and Jobs were enabled by product-owner decision before Gate A; that decision does not mean Gate A passed. The current one-active-listing-per-user-per-category rule still applies.

## Source and deployment boundary

The reviewed behavior is present in GitLab `master` as of 2026-10-20. This documentation does not establish that the same revision has been deployed to Production or that every environment has all provider secrets/configuration set.
