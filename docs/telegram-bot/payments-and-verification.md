# Telegram bot — payments and identity-verification workflows

> Current implementation behavior from GitLab `master`. Provider credentials, manual payment methods and admin Telegram linking are environment/configuration dependent.

## 1. Telegram Stars

The Mini App starts an online top-up and opens the provider checkout URL. Inside Telegram, Telegram Stars is the only online rail exposed by the current UI. The bot registers `/paysupport`, the command Telegram requires for Stars-enabled bots, through the shared command dispatcher.

Payment completion is server-confirmed; opening/returning from a checkout URL is not itself proof of success. Payment state and wallet coin transactions are separate records.

## 2. Manual payment top-up

Manual payment is shown only when the server has at least one enabled manual method and an active admin with a linked Telegram chat to review it.

Flow:

1. The user starts a manual-payment request from the Wallet top-up sheet.
2. The Mini App opens the Advertio bot.
3. The user sends payment details as text and/or a receipt photo.
4. The request becomes submitted and is sent to active admins with linked Telegram chats.
5. Admins approve or reject it from Telegram. The user is notified of the decision.
6. Coins are credited only after approval; starting the request or sending a receipt does not itself add coins.

The Backoffice Payments page shows Draft/Submitted/Approved/Rejected state, payment method, whether text and receipt proof were received, decision details and delivery status for admins. A request that failed to reach admins can be sent again from Backoffice.

Manual payment review is human-controlled; it is not an automatic bank/e-transfer reconciliation system.

## 3. Identity verification

Identity verification is distinct from phone verification.

1. The user must first have a phone-verified account and a linked Telegram identity.
2. The user pays the configured identity-verification price in Advertio Coins.
3. The bot receives an identity document and a short challenge video.
4. The challenge includes a generated code and requested gesture; the reviewer checks the evidence against the challenge.
5. The request and evidence are delivered to active admin Telegram chats. An admin can also request that evidence be sent to their own chat from the Backoffice.
6. Admin approves or rejects. The user is informed in Telegram. Approval grants the Identity Verified badge on profile/listings; rejection can include a reason.

The document and video are kept in Telegram, not uploaded through the Mini App. Payment does not guarantee approval. The price is configured in Backoffice **Policy & pricing → Services** and may change for future requests; a paid request keeps its recorded charge.

## 4. Native listing conversations

For user-created listings, the Mini App contact action opens/reuses a shared conversation. Telegram is used to notify/relay replies. The bot routes a reply to an active conversation before interpreting text as a Search/Saved-search wizard answer. Crawled listings use the original source/contact redirect instead of the native conversation unlock path.

## 5. Promotion opt-out

Promotion Broadcasts include a one-tap Stop promotions button. Tapping it stores `MarketingOptIn=false`, confirms the change and removes the opt-out button from that message. This does not delete or pause saved-search alerts.

## Related pages

- [Wallet](../mini-app/wallet.md)
- [Authentication and verification](../mini-app/authentication.md)
- [Backoffice Payments](../backoffice/payments.md)
- [Backoffice Verifications](../backoffice/verifications.md)
- [Backoffice Broadcasts](../backoffice/broadcasts.md)
