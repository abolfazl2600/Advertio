# Backoffice — Coin flow

> Coin flow is the ledger of Advertio Coins, not a money-payment list.

## 1. Table and filters

The Coin flow page lists coin transactions, 25 rows per page. Filters:

- All
- Credit
- Debit

A user-specific `userId` URL parameter scopes the page to one account; the Users page can link directly into this view. In the general view, the table shows user identity, transaction type, coin amount, reason, reference and timestamp.

## 2. Transaction semantics

- **Credit:** coins were added to a wallet.
- **Debit:** coins were removed from a wallet.
- **Reason:** human-readable explanation of why the balance changed.
- **Reference ID:** links the transaction to a payment or another source when available.
- **Payment link:** a payment-linked row can expose a refund action that uses the underlying payment ID.

A payment record describes money and provider status; a coin transaction describes wallet balance movement. One payment can be associated with a coin credit and later reversal entries.

## 3. Refund action from Coin flow

When a row can be mapped to an underlying payment, the row can start the refund flow. The admin confirms the refund; the original rail is refunded and the corresponding coins are removed. The standard admin refund path skips the end-user “unspent coins only” rule.

Transactions without a linked payment do not get a provider refund button. For support credits, use Wallet actions and record a clear reason.

## 4. Audit expectations

Coin flow is an audit surface. Do not edit historical ledger rows or use a generic credit/debit to imitate a provider refund. Use the dedicated action so the payment and coin ledger remain reconciled.

## Related pages

- [Payments](./payments.md)
- [Wallet actions](./wallet-actions.md)
- [Mini App wallet](../mini-app/wallet.md)
