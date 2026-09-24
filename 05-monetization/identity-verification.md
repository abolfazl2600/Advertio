# Paid Identity Verification

> Product Decision — updated 24 Sep 2026  
> This document records an approved Advertio product/monetization decision. It is not derived from the original Source Document.

## Purpose

Advertio will offer a paid **Identity Verification** service.

A successful verification grants the explicit trust badge:

**Identity Verified**

This badge is separate from **Phone Verified** and any other verification layer.

## Initial price and payment

Initial price:

**USD $8 equivalent**

For the first version, payment is made **only with Advertio Coins**.

Using the currently documented reference:

**10 Coin = $1**

the initial reference price is:

**80 Coins**

The canonical pricing configuration remains the source of truth.

Payment alone does not grant Identity Verified. An authorized admin must approve the verification request.

## Verification flow

1. User starts Identity Verification from Advertio.
2. User pays the verification fee with Coins.
3. User continues to the existing Advertio Telegram bot.
4. The bot shows the verification instructions and the randomized video challenge.
5. User sends:
   - identity-document image;
   - verification video;
   - optional supporting text.
6. The submission is routed to authorized admin Telegram account(s).
7. Admin reviews the evidence in Telegram.
8. Admin may approve/reject from Telegram or Backoffice.
9. Only approval sets the canonical **Identity Verified** status.

## Evidence requirements

The user must provide:

- one supported government-issued identity document;
- one video completing the assigned randomized challenge.

Examples of identity documents may include:

- Passport
- Driver licence
- National identity card

The exact supported document types may evolve.

The randomized challenge should reduce reuse of a static prerecorded video.

## Telegram-first evidence model

For the first version, **Telegram is the media host** for submitted identity evidence.

Advertio should not duplicate raw verification photos/videos into Backoffice storage or a separate Advertio media bucket.

Advertio may persist the operational references/metadata required to manage the request, such as:

- Identity Verification Request ID
- Telegram identity mapping
- Telegram message ID
- Telegram media/file reference
- assigned randomized challenge
- submission timestamp
- verification status
- payment / Wallet transaction reference
- admin decision and timestamp

These references are sensitive operational data and must be restricted to authorized admins.

## Telegram user experience

After payment, the user is sent to the existing Advertio Telegram bot in the correct verification context.

The bot should explain:

- accepted document types;
- how to send a clear document image;
- how to record the verification video;
- the assigned randomized challenge;
- that supporting text may be sent;
- that review is manual;
- that payment does not guarantee approval;
- that approval grants Identity Verified.

## Telegram admin review

Authorized admin Telegram account(s) receive the verification context and submitted evidence.

Admin should be able to see:

- request ID;
- user;
- payment / Coins charged;
- assigned challenge;
- user text;
- identity-document image;
- verification video;
- submission time.

Admin actions:

- Approve Identity
- Reject Identity

Approval/rejection must use the same canonical verification service as Backoffice.

## Backoffice operation

Backoffice provides the operational review queue and secondary approval surface.

Backoffice stores/displays metadata such as:

- request ID;
- user;
- Phone Verification state;
- Coin payment status;
- Coins charged;
- Wallet transaction reference;
- assigned challenge;
- timestamps;
- verification status;
- Telegram evidence/message references;
- reviewing admin;
- review timestamp;
- rejection reason/internal note where applicable.

Backoffice should provide a safe **View/Open in Telegram** path to the original evidence where supported.

Backoffice does **not** store a duplicate copy of the raw document/video in this first version.

Admins can approve/reject from either:

- Telegram; or
- Backoffice.

Both surfaces must update the same canonical request and user verification state.

## Identity Verified semantics

Identity Verified means:

- the verification fee was paid;
- required identity evidence was submitted;
- the assigned video challenge was completed;
- an authorized admin reviewed the evidence;
- the admin approved the request.

Payment by itself is never sufficient.

## Monetization role

Identity Verification is a direct paid Trust-Layer service.

Revenue is generated from the Coin fee paid for the verification/review service.

The user pays for the review process and the opportunity to earn the Identity Verified badge; approval is not guaranteed.

## Security and privacy

Identity evidence is highly sensitive.

Requirements:

- raw evidence remains in Telegram for v1;
- do not duplicate raw media in Advertio storage;
- restrict Telegram evidence to authorized admin identities;
- restrict Backoffice request access to authorized roles;
- never expose Telegram message/file references publicly;
- never log raw document/video contents;
- keep approval server-authoritative;
- audit admin actions and action surface.

## Related implementation

- GitHub issue #28 — Paid Identity Verification via Coins with Telegram evidence review
