# Mini App — Wallet Current State

> Current implementation documented from the Mini App/Web App UI review on 24 Sep 2026.

This document describes the Wallet and coin-purchase experience currently visible in Advertio.

## Wallet entry point

Wallet is available from the persistent bottom navigation.

The current Wallet screen contains:

- Wallet title
- Current wallet balance
- **Add coins** primary action
- Purchases section
- Wallet/payment information notice

## Wallet balance

The current screen displays the user's available coin balance prominently.

An observed example balance was:

- **50 Coins**

## Add Coins

Selecting **Add coins** opens a bottom sheet.

The sheet currently explains that payment is made with **Telegram Stars** and that coins are used when unlocking a listing's contact details.

## Current Telegram Stars packages

The following packages were observed:

| Coins | Telegram Stars |
|---:|---:|
| 20 | 100 |
| 60 | 280 |
| 150 | 650 |

A **Not now** action is available to dismiss the purchase sheet.

## Purchases section

The current Wallet screen includes a purchase-history area.

Observed purchase rows display:

- Coin amount
- Telegram Stars amount
- Status
- Date

Observed example states included:

- 60 Coins / 280 Stars — **Not completed** — Aug 23
- 20 Coins / 100 Stars — **Not completed** — Aug 23

## Current product messaging visible in the UI

The Wallet currently tells the user that:

- Coins are spent when unlocking a listing's contact details.
- Telegram Stars keeps payment inside Telegram.
- No card details or separate payment account are required in this flow.
- Coins do not expire.
- Unspent coins can be refunded back to the user's Stars balance at any time.

This section documents the message currently displayed in the Mini App. It should not be interpreted as a separate legal/payment-policy specification.

## Current interaction model

Observed flow:

1. User opens **Wallet**.
2. User sees the current coin balance.
3. User selects **Add coins**.
4. The Telegram Stars package sheet opens.
5. User chooses one of the available coin packages.
6. Purchase activity can appear in the Purchases section with status, date, coin amount, and Stars amount.

## Documentation boundary

This current-state document does not add or assume:

- bonus coin logic;
- package labels such as Best Value;
- detailed transaction drill-down;
- low-balance purchase prompts;
- alternate payment methods;
- revised purchase-status terminology;
- refund UI beyond the informational text currently shown.

Those should be documented only after implementation or tracked separately as future work.
