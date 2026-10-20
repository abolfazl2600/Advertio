# Telegram bot — admin management report

> Current implementation as of 2026-10-20. Two scheduled admin reports exist for different operational needs; do not conflate them.

## 1. `/adminreport` management report

- Command is published in active admins' private Telegram command menus.
- Only an active Advertio admin can use it, and only in a private chat with the bot. The handler checks the sender on every call; hiding the command from non-admin menus is not the security boundary.
- The report is built fresh when requested.
- A daily scheduled send is enabled by default at **06:00 UTC**. `AdminReport:DailyHourUtc` can change the hour; `AdminReport:ScheduleEnabled=false` disables the scheduled send but does not disable the command.
- Report timestamps are displayed in the configured IANA timezone; default is `Asia/Tehran`. The timezone affects display, not the UTC schedule.
- Scheduled delivery targets active admins with linked Telegram chats. Unreachable chats and Telegram delivery failures are logged; one failed send does not stop the next day's run.

### Report sections

| Section | Values |
|---|---|
| Users — now | Activated accounts; phone-verified and identity-verified counts; total accounts and disabled accounts |
| Users — last 24 h | New accounts; newly activated users; newly phone/identity-verified users |
| Listings — now | Total active listings split user-posted/crawled; pending review; expired, deactivated and rejected |
| Active listings by city | Current counts for the leading cities, with remaining cities grouped |
| Listings — last 24 h | New listing count split user-posted/crawled, with category/city breakdowns |
| Saved searches | Enabled now; created in last 24 h |
| Listing reports | Awaiting review now; submitted in last 24 h |
| Crawling | Last success time, accepted crawl requests, newly created vs already-known listings, rejected/failed requests |

The report explicitly states that search counts and reported-user counts are not tracked and therefore are not reported.

## 2. Operational lead digest (separate worker)

A separate Persian-language operational digest is sent to configured admin user IDs at four fixed Tehran times:

- 00:00
- 06:00
- 12:00
- 18:00

Each digest covers the preceding six-hour window and includes new listings split between user-created and crawled, listing status counts, current active/pending totals, user/crawled supply, claimed crawled listings and top cities. It is sent only to configured admins whose Telegram chat is linked and reachable.

This six-hour digest uses the `Admin:UserIds` deployment allowlist. The daily `/adminreport` management report uses the active admin roster. They are different reports with different configuration and data sections.

## 3. Connecting an admin's Telegram

Backoffice **Your account → Telegram reports** provides a one-time deep link to connect the current admin account to Telegram. The page polls for the link to be completed and then shows the linked Telegram username. Linking is needed to receive scheduled Telegram digests/reports.

## Related pages

- [Backoffice account](../backoffice/account.md)
- [Bot overview](./overview.md)
