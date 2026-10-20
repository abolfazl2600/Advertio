# Backoffice — Your account

> Account settings apply to the admin account currently signed in.

## 1. Username and password

The account form lets the admin set/update their own username and password.

- Username: 3–50 characters; lowercase letters, digits, dot, dash and underscore.
- Password: minimum 12 characters.
- Password confirmation must match.
- On save, the new credentials replace the old ones; the old password stops working.
- Errors are shown inline; the form does not report success until the server confirms the update.

If the session belongs to the seeded development administrator, the page displays a security warning that the development password is public and should be changed.

## 2. Telegram reports

The **Telegram reports** card links the current Backoffice admin account to their Telegram chat.

1. Click Connect Telegram.
2. The server returns a one-time Telegram deep link and expiry.
3. Open the link in Telegram and complete the link flow.
4. The Backoffice polls the current user profile every few seconds while waiting for confirmation.
5. When the linked Telegram identity is observed, the card shows the connected username.

The link is necessary for scheduled Telegram reports/digests to reach that admin. Connecting Telegram does not grant admin permissions; the Backoffice account must already be authorized.

## 3. Report schedules

Two operational reports use different targeting rules:

- Daily management report: default 06:00 UTC, configured by `AdminReport:DailyHourUtc`, with displayed timestamps defaulting to Asia/Tehran. Sent to active admins with linked Telegram chats.
- Operational lead digest: four times a day at 00:00, 06:00, 12:00 and 18:00 Tehran time, sent to configured `Admin:UserIds` accounts with linked Telegram chats.

See [Admin report](../telegram-bot/admin-report.md).

## Related pages

- [Telegram bot overview](../telegram-bot/overview.md)
- [Users](./users.md)
