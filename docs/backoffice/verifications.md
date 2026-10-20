# Backoffice — Identity verifications

> Identity verification is a paid document/video review workflow. It is separate from the phone-verified account flag.

## 1. Queue and filters

The Identity verification page is paginated (25 requests per page) and provides these filters:

- **Awaiting review** — `Submitted`.
- **Awaiting evidence** — `AwaitingSubmission`.
- **Approved**.
- **Rejected**.
- **Unpaid** — `AwaitingPayment`.
- **All**.

The queue is ordered for operations with submitted evidence at the front. The table shows the user, request ID, status, phone-verification flag, payment state/coins charged, document/video evidence flags, submission timestamp and prior review/delivery information.

## 2. Request lifecycle

| Status | Meaning |
|---|---|
| `AwaitingPayment` | Request is not paid yet |
| `AwaitingSubmission` | Payment was accepted; user still needs to send document and challenge video in Telegram |
| `Submitted` | Evidence is submitted and awaits manual review |
| `Approved` | Admin approved; Identity Verified badge is granted |
| `Rejected` | Admin rejected; rejection reason may be sent to the user |

Payment status is tracked separately from request status. The request stores the charged coin amount and linked wallet transaction, so changing the service price later does not rewrite a paid request.

## 3. Review drawer

The drawer provides:

- User name, Advertio user ID, Telegram username/user ID and phone-verification state.
- Whether the user is already identity-verified.
- Payment state, coins charged, wallet transaction reference and payment timestamp.
- Video challenge code, requested gesture and challenge issue time/count.
- Evidence availability and delivery history.
- Existing decision, reviewer, review surface and rejection reason.

Evidence is retained in Telegram. The drawer can send the evidence/review card to the current admin's own Telegram chat; this is useful when the original delivery failed or the admin needs to inspect the document/video in Telegram.

## 4. Decide

Only a `Submitted` request can be decided.

- **Approve identity:** grants the Identity Verified state/badge on profile and listings, records reviewer and time, and notifies the user through Telegram.
- **Reject:** requires a reason, records the decision and reason, and notifies the user.
- The confirmation explicitly reminds the reviewer to check the document and video against the challenge before approval.

A failed delivery to admin Telegram chats is visible in the list; if no admin received the review card, the page identifies that condition rather than pretending evidence was delivered.

## 5. Eligibility and price

The user-facing flow requires a phone-verified account and a linked Telegram identity. The price is configured in Policy & pricing → Services. The seeded default is 80 coins, but the live value is authoritative. Paying starts the evidence workflow; it does not guarantee approval.

## Related pages

- [Profile](../mini-app/profile.md)
- [Authentication and verification](../mini-app/authentication.md)
- [Telegram bot payments and verification](../telegram-bot/payments-and-verification.md)
- [Policy & pricing](./policy-pricing.md)
