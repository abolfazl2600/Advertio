# Wallet and payments — current implementation

> The Wallet page and top-up sheet are implemented. Prices, packs, payment state and refund eligibility come from the server; this document does not claim a specific live package price or provider configuration.

## 1. Access and balance

- Wallet is a top-level Mini App destination.
- A phone-verified account is required to load the wallet.
- The page shows the coin balance and purchase/payment history.
- If the balance/history request fails, the UI provides a retry state.
- Coin packages and manual-payment options are fetched from the server; the client does not hardcode the authoritative package catalogue.

## 2. Payment rails

The available rail depends on platform context and server configuration.

| Context | Available online rail |
|---|---|
| Inside Telegram Mini App | Telegram Stars only; this is the Telegram digital-goods requirement |
| Ordinary browser | Stripe Checkout and Telegram Stars are offered by the current UI when configured |
| Other/manual methods | Shown only if the server has at least one configured manual method and an active admin with a linked Telegram account to review it |

The default selected rail is Stars inside Telegram and Stripe in an ordinary browser. The UI can display the other eligible rail outside Telegram.

### Online top-up flow

1. Load coin packs from the wallet API.
2. Choose a pack.
3. Start checkout using the selected provider.
4. The client opens the returned checkout URL.
5. The app waits for the server-confirmed wallet balance/payment outcome. A return to the app is not itself proof of successful payment.
6. The UI shows credited, pending or failed state. Pending is neither success nor failure; the app may need another moment for the provider webhook to confirm.

Payment statuses used in purchase history are `Pending`, `Succeeded`, `Failed` and `Refunded`.

## 3. Manual payment

Manual payment is a separate path from online checkout and does not credit coins immediately:

1. The app checks whether manual methods are configured and available.
2. The user starts a manual-payment request.
3. The app opens the Advertio bot in Telegram.
4. The user sends payment details and/or a photo of the receipt.
5. The request is sent to active admins with linked Telegram chats for human review.
6. The bot informs the user of the decision. Coins are credited only after approval.

The Backoffice Payments page lists manual requests, their status, whether text/proof was received, the decision and delivery attempts to admins. Admins can resend a request that failed to reach its reviewers.

## 4. Refunds

- Purchase history exposes **Refund** only when the server says that payment is eligible.
- The user self-service path is limited to payments whose coins remain unspent.
- The refund is sent through the rail that accepted the original payment; the associated coins are removed from the Advertio wallet.
- The server is authoritative for refund eligibility and outcome. The UI asks for confirmation and reports failures rather than assuming the refund succeeded.
- Admin refunds are available in Backoffice and intentionally bypass the user-facing “coins not spent” eligibility rule. They are still audited and remove the refunded coins.

## 5. What coins can pay for

The category policy system supports configurable coin prices for:

- Listing creation.
- Contact unlock.
- Listing renewal.
- Listing boost.

A separate service price exists for identity verification. A zero action price means the action is free. The seeded defaults have contact unlock priced at 20 coins and create/renew/boost at zero; these are initial defaults, not a guarantee of the live configured values. Cargo and Jobs inherit the then-current Housing policy values when their category rows are first seeded, then can be tuned independently.

The seeded default for identity verification is 80 coins. Backoffice **Policy & pricing → Services** is the source for the current service price.

The current top-up sheet copy says coins are spent only on contact unlock; the server's configurable action-price model also permits the actions above. Use the Backoffice policy and actual server response as the source of truth for charges.

## 6. Coin expiry and ledger

The UI states that purchased coins do not expire. Each wallet change is recorded as a coin transaction with a type, amount, reason, reference and timestamp. A payment record tracks movement of money; a coin transaction tracks movement of Advertio Coins. They are related but are not the same record.

## Related pages

- [Authentication and phone verification](./authentication.md)
- [Shared listing interactions](./listing-interactions.md)
- [Backoffice Payments](../backoffice/payments.md)
- [Backoffice Coin flow](../backoffice/coin-flow.md)
- [Backoffice Wallet actions](../backoffice/wallet-actions.md)
- [Backoffice Policy & pricing](../backoffice/policy-pricing.md)
- [Telegram bot payment/verification flow](../telegram-bot/payments-and-verification.md)
