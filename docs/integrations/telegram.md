# Telegram integration — current behavior and operational boundaries

> **Reviewed:** 2026-10-20 against GitLab `master`. Provider credentials, bot token, webhook configuration, host/TLS and Production rollout remain environment-specific.

## 1. Mini App SDK

The Web app initializes the Telegram Mini App SDK once before React mounts, and only when it is running inside Telegram. This corrected a prior initialization order problem.

The SDK-backed features include:

- Requesting the user's own phone contact.
- Opening Telegram invoice URLs for Stars payments.
- Opening Telegram links.
- Haptic feedback.
- Mini App mount/readiness behavior.

The browser version must not call Telegram-only methods as if the Telegram host exists. Browser sign-in uses the bot hand-off instead.

Implementation reference: [SDK initialization fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/a58379f404c621e8f7c05da2e946f176686f8bf5).

## 2. Authentication

### Inside Telegram

The Mini App posts Telegram's launch credential (`initData`) to the server provider-auth endpoint. The server validates it before linking the session to the Advertio user.

### Browser sign-in

The current browser sign-in paths are:

- Telegram hand-off via a deep link and one-time code; the user confirms the code in the bot and shares their own phone contact.
- Phone-code login delivered through the linked Advertio Telegram bot. This is not SMS.
- Google sign-in when the Google client ID is configured. Google alone does not establish a verified phone number.

A session without a verified phone can browse, but phone-gated listing and financial actions remain blocked.

## 3. Bot commands and startup

The bot publishes its command menu from code at startup when `Telegram:RegisterCommands` is enabled. It registers the public commands and separately publishes `/adminreport` to active admins' private chats. Actual authorization is checked by the command handler on every use.

The bot can run with long polling for development or a webhook for Production; those modes must not run simultaneously. The webhook must validate Telegram's configured secret-token header. The bot token, webhook secret, allowed admin IDs, Mini App URL and payment-provider configuration are deployment settings, not hardcoded product capabilities.

## 4. Payment integration

- Telegram Stars is the online rail exposed inside the Telegram Mini App.
- Stripe Checkout and Stars are offered in the ordinary browser when configured.
- `/paysupport` is registered for Telegram Stars payment support.
- The server/webhook confirmation is authoritative. Returning from a checkout URL is not enough to credit coins.
- Payment state and wallet coin transactions are separate records.
- Manual payment is a separate human-reviewed path; receipt details are sent through the bot and coins are credited only after admin approval.

See [Mini App wallet](../mini-app/wallet.md), [Backoffice Payments](../backoffice/payments.md) and [Telegram payment workflow](../telegram-bot/payments-and-verification.md).

## 5. Conversation and notifications

Telegram is the notification/relay channel for native user-created listing conversations. Bot routing checks for an active conversation reply before interpreting text as a Search/Saved-search wizard answer.

Other current Telegram features include:

- Instant saved-search alerts and daily digest alerts.
- Promotion Broadcasts with one-tap Stop promotions.
- Automatic channel publication for matching listings (channel bot must have posting rights in the destination).
- Manual payment and identity-verification review cards.
- Daily management report and six-hour operational lead digest for linked admin chats.

Broadcasts and channel publication are different systems: Broadcasts sends a direct message to users; Channels publishes listing posts to configured destinations.

## 6. Admin Telegram linking and reports

Backoffice **Your account → Telegram reports** provides a one-time deep link to link the signed-in admin account to their Telegram chat. Scheduled reports require a reachable linked chat.

Two report workers exist:

- Daily management report: default 06:00 UTC; display timezone defaults to Asia/Tehran.
- Operational lead digest: 00:00, 06:00, 12:00 and 18:00 Tehran time for configured `Admin:UserIds`.

See [Admin report details](../telegram-bot/admin-report.md) and [Backoffice account](../backoffice/account.md).

## 7. Operational verification checklist

Before treating the integration as Production-ready, verify:

- Correct bot token and webhook secret are configured.
- Exactly one bot update mode is active (polling or webhook).
- Telegram webhook is reachable and validates the secret.
- The Mini App URL and allowed origins are correct.
- Stripe/Stars provider configuration and webhook delivery are working.
- The bot has posting permission in each configured channel.
- Admin accounts that need reports/review cards have linked Telegram chats.
- DNS, TLS and edge rate limits for the API/ingest hostname are live and current.

Code merged to GitLab `master` does not prove these environment checks have passed.
