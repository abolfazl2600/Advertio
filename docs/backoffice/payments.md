# Backoffice — Payments

> Payment records represent provider money movement. Coin flow represents Advertio Coins movement. A successful payment can create a coin credit, but these are different records and have different statuses.

## 1. Online payment table

The Payments page lists online provider payments, paginated at 25 rows per page. Filters:

- All
- Pending
- Succeeded
- Failed
- Refunded

A `userId` URL filter can scope the table to one user (for example, when navigating from the Users page). In the general view, columns include status, amount/currency, coin package amount, provider/rail, failure/refund information, user and creation time.

- Telegram Stars payments use currency `XTR` and are formatted as Stars.
- Other providers use the provider's currency and stored minor-unit amount.
- Failed payments show the provider/server failure reason when available.
- Refunded payments show the refunded coin amount and who initiated the refund.
- Only successful payments show the standard row-level Refund action.

The table supports pagination and status filtering; it is not a list of every coin ledger entry.

## 2. Admin refund

An admin can refund a successful payment from the row or use the standalone refund form in Wallet actions.

- The refund goes through the original payment rail.
- The corresponding coins are removed from the user's wallet.
- The admin path intentionally bypasses the end-user rule that coins must remain unspent.
- The refund is an explicit action with confirmation; failures remain visible to the admin.
- Refund details are visible on the payment and in linked coin-flow records.

Do not use a direct wallet credit/debit as a substitute for refunding a provider payment: it does not reverse the original money movement.

## 3. Manual payments

Manual payments are shown in a separate card on the Payments page. Filters:

- Awaiting review (internal status `Submitted`)
- Approved
- Rejected
- All

The table shows user, request status, submission date, method, whether payment details text and/or a receipt photo were supplied, decision details and delivery status to admins.

Statuses:

- `Draft`: user has started but not completed the submission.
- `Submitted`: awaiting human admin review.
- `Approved`: admin approved the request and coins were credited.
- `Rejected`: admin rejected the request; reason may be recorded.

The decision itself is made in Telegram. The Backoffice tracks who decided, when, how many coins were approved, and whether each active admin with a linked Telegram chat received the review card. A submitted request that failed to reach admins exposes **Send again** to re-deliver it.

Manual payment is not automatically reconciled with a bank. Evidence/details must be reviewed by a human.

## 4. What is not the Payments page

- **Coin flow** is the wallet ledger of credits/debits and reasons.
- **Wallet actions** creates a support/admin credit or requests a refund by payment ID.
- **Policy & pricing** controls how many coins a category action or service costs.
- **Broadcasts** sends Telegram messages and is not a payment channel.

## Related pages

- [Coin flow](./coin-flow.md)
- [Wallet actions](./wallet-actions.md)
- [Policy & pricing](./policy-pricing.md)
- [Mini App wallet](../mini-app/wallet.md)
- [Telegram payments and verification](../telegram-bot/payments-and-verification.md)
