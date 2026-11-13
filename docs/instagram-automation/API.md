# HTTP API

Admin routes require the existing `AdminOnly` policy. Webhook and redirect routes do not use the Advertio JWT.

## Webhook

`GET /api/integrations/meta/instagram/webhook`

Query: `hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`. A match returns the challenge as text. Anything else is HTTP 403.

`POST /api/integrations/meta/instagram/webhook`

Header: `X-Hub-Signature-256: sha256=<hex>`. Body limit 256 KB. Duplicate provider keys are accepted again with HTTP 200 and not processed twice. Invalid JSON is HTTP 400. A bad signature is HTTP 401.

## Click redirect

`GET /api/integrations/meta/instagram/r/{attributionId}`

Records one click and redirects to the stored Advertio path with `utm_source=instagram`, `utm_medium=organic_social`, `utm_campaign`, and `utm_content` when the media id is a safe token. Unknown ids are HTTP 404.

## OAuth

`POST /api/admin/instagram/connect`

Returns the Facebook Login for Business authorize URL when app id, config id, and redirect URI are set.

`GET /api/integrations/meta/instagram/oauth/callback`

Checks `state`. It does not return or store an access token. The response tells the operator to set `Instagram:AccessToken`.

## Admin

| Method | Path | Body |
|---|---|---|
| GET | `/api/admin/instagram/diagnostics` | Connection and permission flags. No token value. |
| GET | `/api/admin/instagram/rules` | |
| POST | `/api/admin/instagram/rules` | Rule draft. |
| PUT | `/api/admin/instagram/rules/{id}` | Rule draft. |
| POST | `/api/admin/instagram/rules/{id}/enabled` | `{ "isEnabled": true }` |
| POST | `/api/admin/instagram/rules/preview` | `{ "text", "mediaId", "trigger" }` |
| POST | `/api/admin/instagram/comments/preview` | `{ "commentId", "text", "mediaId", "commentedAtUtc" }` |
| POST | `/api/admin/instagram/comments/private-reply` | Same fields plus `"confirm": true`. Refuses without confirm, outside 7 days, in dry-run, or when a reservation exists. |
| GET | `/api/admin/instagram/conversations` | |
| GET | `/api/admin/instagram/conversations/{id}/messages` | |
| POST | `/api/admin/instagram/conversations/{id}/mode` | `{ "mode": "pause" \| "human" \| "resume" }` |
| GET | `/api/admin/instagram/executions` | |
| GET | `/api/admin/instagram/analytics` | Counts of stored events, replies, and redirect clicks. |

Rule draft fields: `name`, `triggerType` (`Comment`, `DirectMessage`, `Postback`), `matchMode` (`Exact`, `Contains`, `AnyKeyword`, `AllKeywords`), `keywords`, `priority`, `isEnabled`, `isDryRun`, `flowKey` (`cargo`, `housing`, `jobs`), `mediaId`, `publicReplyText`, `privateReplyText`, `linkCampaign`, `cooldownSeconds`, `maxExecutions`.

Private reply JSON sent to Meta:

```json
{
  "recipient": { "comment_id": "<comment-id>" },
  "message": { "text": "...", "quick_replies": [] }
}
```

The public confirmation is a separate `POST /{comment-id}/replies` and is sent only after the private reply returns a message id.
