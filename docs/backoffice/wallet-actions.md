# Backoffice — Wallet actions

> Wallet actions are privileged operations. They affect balances and must leave an explicit reason/reference trail.

## 1. Credit a wallet

The Credit a wallet form contains:

- **User ID** — required; can be prefilled from the Users page.
- **Amount (coins)** — required positive whole number.
- **Reason** — required, at least three characters; this is the audit explanation.
- **Reference ID** — optional, for example a bank trace/reference number.

Submitting creates coins without a payment record. This is intended for support, correcting an error or crediting a verified manual transfer after the necessary human review. It is the only documented path that creates coins without a provider payment.

After success, the form resets its amount/reason/reference while retaining the user ID for follow-up operations.

## 2. Refund a payment

The Refund a payment form accepts a payment ID. It is intended for a payment ID obtained from an external provider dashboard or another source when the payment row is not already open in Backoffice.

- Refund is sent through the rail used for the original payment.
- The corresponding coins are removed from the user's wallet.
- The admin path bypasses the user self-service requirement that coins remain unspent.
- Use the refund action on Payments/Coin flow when the payment is already visible there; this form is for an externally sourced ID.

## 3. Audit and safety rules

- Never credit coins to compensate for a payment that should be refunded; those are different financial operations.
- Always provide a meaningful credit reason. An empty/generic reason removes the useful audit trail.
- Verify the user and amount before submitting. The operation is not a draft.
- Treat success/error feedback from the server as authoritative; do not assume a balance changed before the API confirms it.

## Related pages

- [Coin flow](./coin-flow.md)
- [Payments](./payments.md)
- [Users](./users.md)
