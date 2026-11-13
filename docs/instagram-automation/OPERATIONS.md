# Operations

## Leave it off

The seeded rule `Cargo Reel - Comment to DM` is disabled and in dry-run. Do not enable it until the checklist below is true.

1. `INSTAGRAM_APP_SECRET`, `INSTAGRAM_VERIFY_TOKEN`, `INSTAGRAM_ACCESS_TOKEN`, and `INSTAGRAM_META_ACCOUNT_ID` are set on the server, not in git.
2. `INSTAGRAM_GRANTED_PERMISSIONS` is `instagram_basic,instagram_manage_comments,instagram_manage_messages`.
3. `INSTAGRAM_PUBLIC_WEB_BASE_URL` is `https://advertio.ir` (or the real web origin).
4. `INSTAGRAM_CARGO_REEL_MEDIA_ID` is the Reel's media id, and the rule's media id in the backoffice is that same value.
5. The webhook handshake from Meta succeeded.
6. A tester comment produced a `DryRun` execution and no outbound call.

## Turn on future comments

1. Open Backoffice → Instagram.
2. Confirm the connection card is not `NotConfigured` or `PermissionsMissing`.
3. Update the rule so `isDryRun` is false. The enable button only toggles `isEnabled`. Dry-run stays on until the rule is updated through `PUT /api/admin/instagram/rules/{id}`.
4. Enable the rule.
5. Comment from a tester account and confirm one private reply, then one public reply only if the private reply succeeded.

A second webhook for the same comment is stored as a duplicate and does not send again. A timeout or a dropped process marks the reservation `Uncertain` and does not retry the private reply.

## Historical comments

Do not POST a batch. For one comment:

1. `POST /api/admin/instagram/comments/preview` with the comment id, text, media id, and timestamp.
2. Send only when the preview says the comment is inside 7 days and `confirm` is true on `POST /api/admin/instagram/comments/private-reply`.

There is no job that walks old comments.

## Failures

`instagram.webhook_events.processing_status` is `Received`, `Processing`, `Processed`, `Ignored`, `Failed`, `RetryPending`, or `AwaitingDelivery`.

Temporary failures before a private-reply reservation is taken are retried with backoff, up to 5 attempts. After a send is attempted, failure and uncertainty are not retried automatically.

Logs include event ids and error codes. They do not include the access token. Avoid raising webhook log level in production if the payload excerpt is sensitive. The raw payload column is cleared after a processed or ignored event.

`Instagram:WorkerEnabled=false` stops processing without dropping accepted rows. Set it back to true to drain the queue.

## What is not measured

Redirect clicks are counted. Registrations and new listings are not attributed to Instagram yet. The automation must not tell a person that Advertio carries the cargo or guarantees a seat.
