# Profile — current implementation

> Current Web profile behavior as of 2026-10-20.

## 1. Sign-in state

The Profile page handles these session states:

- **Needs login:** shows sign-in choices.
- **Authenticating / loading:** shows a loading state.
- **Failed:** shows the server/client sign-in error and a retry action.
- **Authenticated:** loads the current profile and displays profile controls.

Profile data is loaded from the current-user endpoint. A profile failure has its own retry action; it does not silently display a different user's cached data.

## 2. Identity card

The identity card displays:

- Avatar or initials fallback.
- Display name, or **Unnamed** when no name is set.
- Telegram username when a Telegram identity is linked.
- Edit action for the display name.
- Change-photo action for the avatar.

The display name is the name shown on listings. The name form validates a minimum length and surfaces server validation errors. Avatar upload accepts a file up to 8 MiB at the client, then sends it to the server for validation/processing; rate-limit and file-processing errors are shown to the user.

The profile does not currently provide ratings, reviews or deal-history screens.

## 3. Phone number

The phone row shows a verified phone number when the account passes the phone-verification gate. Otherwise it explains why verification is needed and provides the available route:

- Inside Telegram: request the user's own Telegram contact through the Mini App SDK.
- In an ordinary browser: continue the verification hand-off in Telegram.

Phone verification is separate from identity-document verification. It is the account/trading gate used by listing creation, contact/paid actions and wallet access.

## 4. Identity verification

The Identity verification card shows the current request and the action appropriate to its state.

| State | User-facing next step |
|---|---|
| No request / rejected request eligible to restart | Review the price and requirements, then start a request |
| `AwaitingPayment` | Pay the configured service price in Advertio Coins |
| `AwaitingSubmission` | Continue in Telegram and send the requested identity document and challenge video |
| `Submitted` | Wait for manual admin review; the bot notifies the user |
| `Approved` | Identity Verified badge is shown on the profile and listings |
| `Rejected` | The rejection reason is shown when available; the next action depends on current request state |

Identity verification requires a phone-verified account and a linked Telegram identity. Evidence stays in Telegram; it is not uploaded through the Mini App form. Payment does not guarantee approval. See [Authentication and verification](./authentication.md) and [Backoffice Verifications](../backoffice/verifications.md).

## 5. Account links

For an authenticated user, Profile links to:

- **My listings:** all of the user's own listings across live journeys, grouped by status.
- **Saved listings:** listings bookmarked across live journeys.
- **Sign out:** clears the current local session and returns the user to a non-authenticated state.

These are listing bookmarks and listing ownership views, not saved-search alerts. Saved-search alerts are managed through the Telegram bot.

## 6. Appearance

The Appearance control has three choices:

- **System:** follow the platform/Telegram theme.
- **Light**
- **Dark**

The preference is held by the theme store and synchronized with the host platform where supported.

## Related pages

- [Authentication](./authentication.md)
- [Wallet](./wallet.md)
- [Shared listing interactions](./listing-interactions.md)
- [Telegram bot settings](../telegram-bot/settings.md)
