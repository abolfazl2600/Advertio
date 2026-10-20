# Telegram Integration — Current Status

> Last reviewed: 2026-10-20. This page records implementation evidence from GitLab master; it is not a production deployment audit.

## Mini App SDK

On 2026-10-09, the Web app was changed to initialize the Telegram Mini App SDK once before React mounts, and only when launched inside Telegram. This fixes the SDK initialization failure that prevented the share-phone dialog from opening and affected other version-checked methods:

- Requesting the user's phone number through Telegram.
- Opening invoice URLs through Telegram's invoice API.
- Opening Telegram links.
- Haptics.
- Mini App mounting.

Source: [Telegram SDK initialization fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a58379f404c621e8f7c05da2e946f176686f8bf5).

## Authentication and updates

The GitLab README documents these implemented development paths:

- Mini App sign-in using Telegram initData.
- Browser sign-in through a Telegram deep link.
- Returning browser sign-in with a one-time code delivered through Telegram.
- Optional Google sign-in when configured; Google sign-in alone does not establish a verified phone number.
- The bot can use long polling in development or a webhook in production. These modes must not run simultaneously.

Phone verification is part of the shared contact and paid-action path. The exact login and webhook configuration is environment-dependent; see the [GitLab monorepo README](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/README.md) and [deployment guide](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/master/docs/DEPLOY.md).

## Notifications

Telegram is the channel used by the currently implemented notification surfaces, including admin direct messages and Broadcasts. Broadcasts supports audience selection, recipient-count confirmation, rate-limited asynchronous delivery, per-recipient outcomes and a one-tap opt-out for Promotions.

See [Backoffice Notifications](../08-backoffice/notifications.md) and [Current Implementation Status](../03-product/current-capabilities.md).

## Deployment boundary

This document does not claim that the latest GitLab master has been deployed to production. Verify the deployed revision and environment configuration before treating a code-level capability as production-available.
