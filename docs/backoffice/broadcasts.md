# Backoffice — Broadcasts

> **Implemented:** the Broadcasts page and delivery backend were merged to GitLab `master` on 2026-10-09. Broadcasts sends a direct Telegram message to users; it is not the same as publishing listings to Telegram channels.

## 1. Broadcast list

The list is paginated (25 rows per page), newest first, and shows:

- Internal broadcast name.
- Kind: Announcement or Promotion.
- Status: Draft, Sending, Completed or Cancelled.
- Audience type.
- Recipient count (not shown as zero for a draft that has not queued recipients).
- Creator and created timestamp.
- Send start/completion/cancellation information and delivery progress when available.

An admin can create a new broadcast or open a draft/report.

## 2. Message and content limits

- Internal name: required, up to 100 characters; never sent to users.
- Message text: required, trimmed, maximum 4,096 characters.
- Optional single button: label required when enabled, maximum 40 characters; it opens the configured Mini App entry.
- Promotion messages include a localized one-tap **Stop promotions** button.
- Message preview approximates the Telegram message and optional button before send.
- Test send sends the saved draft to the acting admin's own Telegram chat.

The v1 editor is text-only. Rich media, HTML/Markdown templates, variables and language-specific message variants are not implemented.

## 3. Broadcast kind

| UI kind | Internal kind | Delivery rule |
|---|---|---|
| Announcement | `Transactional` | Reaches the resolved audience regardless of marketing opt-in; for service news, downtime, rules or price changes |
| Promotion | `Marketing` | Reaches only users who opted in to promotions and includes Stop promotions |

Both kinds exclude disabled accounts and accounts without a linked Telegram chat.

## 4. Audience types

### All users

Resolves the user population, then reports exclusions. Disabled accounts, users without Telegram and—when the kind is Promotion—users who have not opted in are not sent the message.

### Filtered

At least one filter is required. Supported filters include:

- Phone verified: Yes / No / Any.
- Identity verified: Yes / No / Any.
- Has posted: Yes / No / Any; “posted” means the user has created a listing of their own.
- Language: English, Persian, French, Russian or Hindi. English also includes users who never selected a locale.
- Joined from / joined to: inclusive UTC calendar dates.
- Saved-search interest: category, country, province and city based on users with an active saved search that fits. A saved search without a city can match any city.

The country/province/city selectors use the same reference data as listing/channel filters.

### Selected users

The admin selects users from Backoffice **Users** and presses **Message selected** to hand them to a new Broadcast composer. A Selected audience must contain at least one user and supports up to 500 user IDs. The composer can preserve the selection while the admin edits the message.

## 5. Live audience preview and exclusions

The preview resolves the current audience and shows:

- Recipients eligible to receive the message.
- Disabled accounts excluded.
- Accounts without Telegram excluded.
- Users excluded for not opting into Promotions.

If no one would receive the message, the preview explains the largest exclusion reason. A Filtered audience with no actual filter and a Selected audience with no selected users cannot be sent.

## 6. Send guardrails

1. The composer saves the current form as a draft before testing or sending.
2. The admin previews the current audience and sees the exact recipient count.
3. Sending requires a final confirmation.
4. From 100 recipients onward, the admin must type the exact count (ASCII and Persian digits are accepted).
5. The server re-resolves the audience at send time and compares it with the confirmed count. If it changed, the send is rejected and the dialog asks the admin to review and confirm the new count.
6. A zero-recipient send is blocked.
7. The composer prevents accidental double submission; server-side guards remain authoritative.

These protections matter because a send is not recallable.

## 7. Delivery and report

Delivery runs asynchronously with rate limiting. Telegram 429 responses honor the retry-after interval; transient failures are retried with bounded attempts. A failed worker cycle does not stop future delivery cycles.

Per-recipient statuses include:

- Pending
- Retrying
- Sent
- No Telegram
- Not opted in
- Failed
- Cancelled

The report shows progress and counts for sent, unreachable/blocked, failed, pending/retrying and skipped recipients. It includes per-user delivery attempts and timestamps, and the admin can filter the recipient table by outcome.

Available actions:

- Cancel an in-progress broadcast.
- Retry failed deliveries (except when the broadcast is cancelled).
- Duplicate a broadcast into a new draft.
- Open recipient/user details from the report.

Creation/sending actors and timestamps are recorded. A retry re-queues failed deliveries; it does not pretend a previously failed delivery was sent.

## 8. Explicit v1 exclusions

Not implemented:

- Scheduled/future sends.
- Rich media, HTML/Markdown formatting or message variables.
- Per-language message variants.
- Recall or edit after sending.
- Click/open attribution.
- Frequency capping.
- A/B testing.

## Related pages

- [Users](./users.md)
- [Settings and marketing opt-in](../telegram-bot/settings.md)
- [Telegram channel publishing](./channels.md)
