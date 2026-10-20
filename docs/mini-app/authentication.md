# Authentication, phone verification and identity verification

> Current identity behavior from GitLab `master` as of 2026-10-20. Phone verification and identity verification are two separate trust levels.

## 1. Account identity

Advertio's account model uses a verified phone number as the account identity key. Telegram is an identity provider and delivery channel, not the account's permanent primary key. A user can link an identity provider to the phone-bearing account; the wallet, listing history and saved data remain on the same Advertio account.

The platform exposes these sign-in experiences:

- **Telegram Mini App:** when launched inside Telegram, the Web app reads Telegram's launch credential and posts it to the provider authentication endpoint.
- **Continue with Telegram on the browser:** starts a one-time hand-off to the bot. The browser displays a verification code and deep link; the user checks the same code in Telegram and shares their phone number.
- **Phone-code login:** a phone number can request a code delivered through the Advertio bot to an already linked Telegram identity. The code is entered in the browser; this is not SMS.
- **Google sign-in:** offered only when the Google client ID is configured. Google alone does not provide a verified phone number, so this creates a browsing session until the user completes the phone gate.

Provider availability depends on the environment/configuration. If no usable provider is available, the UI shows an unsupported sign-in state rather than pretending login succeeded.

## 2. Session vs. phone-verified account

A session without a verified phone is allowed to browse, but it is not treated as a fully verified account for actions that can create financial or marketplace state.

Phone-gated operations include posting listings and paid/owner operations, wallet access/top-ups and identity-verification purchase. The exact server policy is authoritative; the client shows a gate with the reason and next action.

Inside Telegram, phone verification uses Telegram's native share-contact request. Outside Telegram, the user is sent through the bot hand-off; the Web app does not display a phone-share button that cannot work in a normal browser.

The API rate-limits phone-code requests at multiple levels (including IP and phone/cooldown protections). Telegram webhook authentication and provider credentials are server configuration; invalid required secrets should fail startup rather than silently bypass verification.

## 3. Profile data

A signed-in user can:

- view their display name, Telegram handle (when linked), phone number and verification state;
- edit their display name;
- upload/change their avatar;
- open My listings and Saved listings;
- open identity verification;
- sign out.

Display name is the name shown on listings. The profile allows the user to correct the name even if the current provider did not supply one. Avatar upload has an 8 MiB client-side limit; the server also validates the file and updates the profile response.

## 4. Phone verification vs identity verification

**Phone verified** means the account has a verified phone number and can pass the phone gate. It does not mean an identity document was reviewed.

**Identity verified** is a separate paid process:

1. The user must have a phone-verified account and linked Telegram.
2. The user starts the request from Profile and pays the configured coin price.
3. The bot asks for an identity document and a short video responding to a challenge. Evidence is sent through Telegram, not uploaded by the Mini App.
4. The request status progresses through payment/submission/review states.
5. An active admin with a linked Telegram chat receives the review evidence; a Backoffice admin can inspect the request, resend evidence to an admin's own Telegram, and approve or reject it with a reason.
6. On approval, the Identity Verified badge appears on the user's profile and their listings. Rejection can display the reason and allow the user to start a new request according to the server's current state rules.

The service price is configured in Backoffice **Policy & pricing → Services**. The seeded default is 80 coins, but the live configured price is authoritative. A paid request retains its recorded payment/price even if the service price later changes.

## 5. Identity verification request states

| State | Meaning |
|---|---|
| `AwaitingPayment` | Request exists but has not been paid |
| `AwaitingSubmission` | Paid; the user must send the document and challenge video in Telegram |
| `Submitted` | Evidence submitted and waiting for human review |
| `Approved` | Admin approved; identity badge is available |
| `Rejected` | Admin rejected; rejection reason may be shown to the user |

Payment state is tracked separately from review state.

## 6. Security boundaries

- Telegram bot webhook requests must carry the configured Telegram secret header.
- Admin authorization is based on the Advertio account/admin identity, not on a Telegram numeric ID alone.
- Telegram phone-sharing must be the user's own contact; a forwarded contact is not an acceptable verified phone credential.
- The browser phone-code flow delivers codes through Telegram; it does not mean SMS is configured.
- Google sign-in alone is not equivalent to phone verification.

## Related pages

- [Profile](./profile.md) · [Wallet and payments](./wallet.md)
- [Telegram bot payments and verification](../telegram-bot/payments-and-verification.md)
- [Backoffice Verifications](../backoffice/verifications.md) · [Backoffice account](../backoffice/account.md)
