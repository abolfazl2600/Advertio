# Shared listing interactions

> Current shared behavior for Housing, Cargo and Jobs. Shared listing code was extracted from Housing on 2026-10-19 so journeys reuse one contact/save/report/action path.

## 1. Listing states and lifecycle

The backend listing lifecycle includes:

- `PendingReview`: awaiting moderation.
- `Active`: published and available in the feed.
- `Rejected`: rejected by moderation.
- `Deactivated`: taken down or withdrawn.
- `Expired`: the configured listing TTL elapsed.
- A draft-like state may exist in Backoffice/domain workflows, but public user-created listings enter review on creation.

A listing is approved with a snapshot of its contact-unlock coin cost and expiry TTL. Seeded defaults are 30 days for listing TTL and 72 hours for boost duration; the Backoffice can change policy. A changed policy does not silently rewrite the existing listing's snapshotted contact cost/expiry.

**Current limit:** a user may have at most one active listing in a given category. The rule is enforced by the server, not only the UI. Cargo and Jobs do not yet support multiple active listings per user in their category.

## 2. Contact and unlock behavior

### User-created listings

- The user opens the Contact section on the listing detail page.
- The shared confirmation sheet reads the current contact/unlock cost and the user's available coin balance from the API.
- If the balance is insufficient, the UI offers a top-up instead of sending a doomed unlock request.
- The server decides whether the contact action is free or paid from the listing's stored phase/contact cost and category policy. The UI does not determine the authoritative charge.
- A successful contact action opens or reuses the shared conversation path. The advertiser's Telegram username is not simply exposed as a substitute for the native conversation.
- The API emits contact funnel events, including contact-abandoned and message-button-click events, for conversion/failure attribution.

### Crawled listings

- Contacting a crawled listing never deducts Advertio coins.
- The UI routes the user to the original Telegram contact handle when available, otherwise to the original source URL.
- The listing retains `supplySource=Crawled` even if its real owner later claims it.
- Crawled listing traffic is excluded from Gate A's user-generated supply/contact-conversion cohort.

## 3. Conversations

The shared conversation panel loads a conversation for a listing and lets the user send/reply through the platform. Telegram is the notification/relay channel for the current bot integration. A user's reply is handled before the bot interprets a text message as a search-wizard answer, preventing ordinary conversation text from being swallowed by a wizard.

Conversation UI and message actions are shared by Housing, Cargo and Jobs. Do not assume every crawled listing has a native Advertio conversation: crawled contacts follow the source redirect behavior above.

## 4. Save and unsave

- A bookmark on a listing toggles the user's saved state.
- The Saved page aggregates listings from every live journey and renders each with its category-specific card.
- Saving requires a signed-in account. Saved listings are not the same feature as saved searches: a saved listing is a bookmark; a saved search is a filter plus a Telegram alert schedule.
- Unsave updates the detail/card state and the saved-list query cache.

## 5. Report a listing

The detail page offers **Report listing** for another user's listing; it is not offered on the user's own listing. Report reasons are:

- Scam
- Wrong information
- Duplicate
- Already rented
- Offensive
- Other

A report can include a note up to 500 characters. The API returns a receipt and indicates if the same user already has a report waiting for review, so a repeated submit does not create a second pending report. Backoffice **Listings → Reports** is the review surface.

## 6. Owner actions: renew and boost

- **Renew** is offered for an expired listing or an active listing within 7 days of expiry. The server permits renewal for active/expired states only. Renew extends from the current expiry if it is still in the future, otherwise from now; an expired listing returns to Active.
- **Boost** is offered for an active listing. While a boost is still active, the UI shows a countdown/status instead of offering another boost. Seeded duration is 72 hours, but the Backoffice policy is authoritative.
- The UI displays the server-reported category action price when it is non-zero. The server rechecks the price and listing state at action time; stale client price/state must not override the server.
- Taken-down/rejected listings do not get renew/boost buttons because the server refuses those actions.
- If an action fails because the balance is too low, the UI can open the coin top-up flow.

## 7. Duplicate detection

Duplicate detection runs before the create action charges coins or writes the new listing.

- An exact duplicate is rejected and should not leave a row or charge the user.
- Similarity findings can be recorded for moderator review.
- For a bare user-created listing with no description/photos, the exact fingerprint includes the publisher identity. This permits two different users to create identical generated Cargo/Jobs titles without blocking each other.
- A same-user double submission still collides.
- Similarity alone does not automatically mean an exact duplicate. Backoffice provides a Possible Duplicate queue for review.

## 8. Trust indicators

Listing detail pages can show phone-verified and identity-verified indicators from the publisher's trust data. Identity verification is separate from phone verification and is reviewed manually. The crawled-source badge/contact behavior is separate from user identity badges.

## Related pages

- [Housing](./housing.md) · [Cargo](./cargo.md) · [Jobs](./jobs.md)
- [Authentication and phone verification](./authentication.md) · [Profile](./profile.md) · [Wallet](./wallet.md)
- [Backoffice Listings](../backoffice/listings.md) · [Backoffice Policy & pricing](../backoffice/policy-pricing.md)
