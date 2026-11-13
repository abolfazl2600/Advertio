# Meta setup

Cursor implemented the Advertio side. Every step in the Meta dashboard is still manual. None of those dashboard steps were performed or verified from this repository.

Confirm the Graph API version shown in your app before relying on the default `v26.0`. Set `Instagram:GraphApiVersion` to the version your app uses. Do not mix this setup with Instagram Login (`graph.instagram.com`, `instagram_business_*`).

## 1. App

1. Open [Meta for Developers](https://developers.facebook.com/apps/) and create an app, or open the existing Advertio app.
2. Add the Instagram product and choose the use case that Meta currently labels for the Instagram API with Unified Login.
3. In Facebook Login for Business, create a configuration and copy its `config_id`.
4. Add the OAuth redirect URI exactly: `https://<APP_DOMAIN>/api/integrations/meta/instagram/oauth/callback`.
5. Request these permissions on that configuration:
   - `instagram_basic`
   - `instagram_manage_comments`
   - `instagram_manage_messages`

Advertio reads `Instagram:AppId`, `Instagram:AppSecret`, and `Instagram:ConfigId`. The callback validates `state`. This build does not store the OAuth access token. After the dashboard shows a system user token, put that token in `Instagram:AccessToken`.

## 2. Business Portfolio and the Instagram account

1. Put the Advertio Instagram professional account (Business or Creator, and public) in the Business Portfolio.
2. Assign that Instagram account to the app, and to the system user that will own the token.
3. Generate a system user token that includes the three permissions above.
4. Copy the Instagram professional account id into `Instagram:MetaAccountId`. In the dashboard this is the Instagram account id, not the Facebook Page id. Unified Login sends private replies to `/{instagram-account-id}/messages`.
5. In the Instagram app settings for that professional account, turn on **Allow access to messages**. Without it, messaging calls fail with code 200.

## 3. Webhook

Callback URL:

`https://<APP_DOMAIN>/api/integrations/meta/instagram/webhook`

Verify token: the same string as `Instagram:VerifyToken`.

Subscribe these fields:

- `comments`
- `live_comments`
- `messages`
- `messaging_postbacks`

Meta signs `POST` bodies with `X-Hub-Signature-256` using the app secret. Advertio compares that HMAC in constant time against the raw body. A missing or wrong signature is rejected with HTTP 401. The verify handshake is HTTP 403 when the token does not match.

Also subscribe the Instagram account itself:

`POST /{instagram-account-id}/subscribed_apps?subscribed_fields=comments,messages,messaging_postbacks`

The dashboard webhook entry is not enough on its own.

## 4. Modes and review

Development mode delivers webhooks only for people with a role on the app. Instagram testers must be real professional accounts. Meta test users are not supported for this API.

Live mode, plus Advanced Access for each permission, is required before comments and messages from people who do not have a role on the app are delivered. That requires App Review and Business Verification. Those submissions are not done here.

Standard Access is enough to test with an admin or tester on the app.

## 5. How to test

Comment test: publish a post or Reel from the connected professional account, comment from a tester account, and confirm a row in `instagram.webhook_events`. With the seeded rule left in dry-run, the execution status is `DryRun` and no message is sent.

Private reply test: turn dry-run off only after the token and permissions are set, comment with a keyword such as `بار`, and confirm one `POST /{ig-id}/messages` whose recipient is `comment_id`. A second delivery of the same webhook must not send a second reply.

Direct message test: reply to that private message from the tester account. The Cargo flow should ask whether they are a traveler or sending cargo. Buttons use the payloads `cargo:traveler` and `cargo:sender`.

## 6. Common errors

| What you see | What to check |
|---|---|
| Webhook verification fails | `Instagram:VerifyToken` does not match the dashboard, or the callback URL is not the API host. |
| HTTP 401 on the webhook POST | `Instagram:AppSecret` does not match the app that signed the body. |
| No events while the app is in Development | The commenter is not an app role. |
| No events in Live | The app is not Live, or Advanced Access is missing for the field's permission. |
| Graph error 200 | Message access is off, or the token is missing `instagram_manage_messages`. |
| Graph error 10 or 200 on a private reply | The comment is older than 7 days, already had a private reply, or the account is not the one that owns the media. |
| `(#10) outside of allowed window` on a later DM | More than 24 hours since the person's last message. Do not use Human Agent to send automation outside that window. |
| Sends stay skipped with `permissions_not_confirmed` | `Instagram:GrantedPermissions` does not list all three required permissions. |

## 7. What this repository does not do

- It does not create the Meta app, the configuration, or the system user.
- It does not submit App Review.
- It does not turn the Cargo rule on.
- It does not message the existing comments on the Cargo Reel.
