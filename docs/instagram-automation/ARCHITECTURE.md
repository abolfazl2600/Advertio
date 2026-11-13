# Instagram automation

The module lives in the Advertio API. It is not a separate service.

```
backend/src/Modules/Instagram/
  Advertio.Modules.Instagram.Domain
  Advertio.Modules.Instagram.Application
  Advertio.Modules.Instagram.Infrastructure
backend/src/Advertio.Api/Modules/Instagram/InstagramEndpoints.cs
backend/src/Advertio.Api/BackgroundServices/InstagramWebhookWorker.cs
apps/backoffice/src/features/instagram/
```

PostgreSQL schema: `instagram`, on the same database as the rest of the API. EF Core migration `AddInstagramModule` creates it. The API applies that migration on boot, the same way it applies every other module.

## What runs where

The webhook endpoint checks the Meta signature, stores one row per event, and returns. `InstagramWebhookWorker` prepares a send in a database transaction, then calls `graph.facebook.com`, then records the result in a second transaction. A private reply that might already have been accepted is not sent again.

Rules, conversation state, and the Cargo flow are code in the Application project. Keyword text and reply text are rows. Changing a keyword does not need a deploy.

## Authentication model

This module speaks only the Instagram API with Unified Login:

- Host: `https://graph.facebook.com`
- Token: a system user access token, supplied as `Instagram:AccessToken`
- Permissions: `instagram_basic`, `instagram_manage_comments`, `instagram_manage_messages`

It does not call `graph.instagram.com` and it does not use `instagram_business_*` permissions. Those belong to Instagram Login, which Meta no longer offers for a new app.

The access token is not written to the database and is not returned by admin APIs. The account row stores a reference name, `config:Instagram:AccessToken`.

## Default behavior

On first boot the seeder inserts `Cargo Reel - Comment to DM` with `IsEnabled = false` and `IsDryRun = true`. Nothing is sent until an admin turns dry-run off and enables the rule, and the access token and permissions are present.

Historical comments are never scanned or messaged on startup. An admin can preview one comment and send only with `confirm: true`.

## Flows

`FlowEngine` runs Cargo, and the same engine has short Housing and Jobs paths. Only Cargo is seeded. A direct message continues an existing conversation even when the new text does not match a keyword. A new conversation starts only when a rule matches.

Advertio links use the real site paths `/apps/passenger-cargo`, `/apps/passenger-cargo/new`, `/apps/housing`, `/apps/housing/new`, `/apps/jobs`, and `/apps/jobs/new`. The message carries `/api/integrations/meta/instagram/r/{id}`. That redirect records a click and sends the browser to the path with UTM parameters. The module does not record registrations or listing creation.
