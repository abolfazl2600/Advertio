# Configuration

All values are empty in `appsettings.json`. Production reads them from the environment. None of these are required for the API to boot. Leave them empty and the webhook rejects unsigned calls, and the worker does not send.

| Key | Environment variable | Purpose |
|---|---|---|
| `Instagram:GraphApiVersion` | `INSTAGRAM_GRAPH_API_VERSION` | Default `v26.0`. Set the version shown on the Meta app. |
| `Instagram:AppId` | `INSTAGRAM_APP_ID` | Meta app id. |
| `Instagram:AppSecret` | `INSTAGRAM_APP_SECRET` | Verifies `X-Hub-Signature-256`. Never commit it. |
| `Instagram:VerifyToken` | `INSTAGRAM_VERIFY_TOKEN` | Webhook handshake. Choose a long random string. |
| `Instagram:AccessToken` | `INSTAGRAM_ACCESS_TOKEN` | System user token. The only send credential. |
| `Instagram:MetaAccountId` | `INSTAGRAM_META_ACCOUNT_ID` | Instagram professional account id. Seeds the account row. |
| `Instagram:Username` | `INSTAGRAM_USERNAME` | Display only. |
| `Instagram:ConfigId` | `INSTAGRAM_CONFIG_ID` | Facebook Login for Business configuration id. Used to build the authorize URL. |
| `Instagram:OAuthRedirectUri` | `INSTAGRAM_OAUTH_REDIRECT_URI` | Must match the dashboard redirect. |
| `Instagram:PublicWebBaseUrl` | `INSTAGRAM_PUBLIC_WEB_BASE_URL` | Site origin, for example `https://advertio.ir`. Falls back to `Notification:WebAppBaseUrl`. |
| `Instagram:CargoReelMediaId` | `INSTAGRAM_CARGO_REEL_MEDIA_ID` | Media id of the Cargo Reel. Empty until you paste the real id. |
| `Instagram:GrantedPermissions` | `INSTAGRAM_GRANTED_PERMISSIONS` | Comma-separated. Sends are blocked until this lists `instagram_basic`, `instagram_manage_comments`, and `instagram_manage_messages`. |
| `Instagram:OutboundPerMinute` | `INSTAGRAM_OUTBOUND_PER_MINUTE` | Local cap, 1–200, default 30. A Graph `429` is still honored. |
| `Instagram:WorkerEnabled` | `INSTAGRAM_WORKER_ENABLED` | `false` stops the background processor. Tests set this. |
| `Instagram:PersistTokens` | — | Kept `false`. This build does not store OAuth tokens. |

`Instagram:PublicWebBaseUrl` must be the real site. The link builder refuses to emit a URL when it is missing.

The seeded rule name is `Cargo Reel - Comment to DM`. It stays disabled and in dry-run. Set the Reel media id on that rule before enabling it, otherwise a null media id matches every comment on the account.
