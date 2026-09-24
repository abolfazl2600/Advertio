# Wallet & Coin Interaction

Wallet سیستم اعتبار داخلی Advertio است.

Source Wallet را در **Version 1.1 — Wallet & Monetization Base** قرار می‌دهد؛ Conflict Versioning آن در [Overview](./overview.md) ثبت شده است.

## Telegram Bot Scope

Source Main Menu ثبت‌شده این گزینه‌ها را دارد:
- View Listings
- Post Listing
- My Profile
- My Listings

گزینه مستقل Wallet در Main Menu ذکر نشده است.

در عین حال، Wallet/Coin در Flowهای Telegram Bot برای این موارد اثر دارد:
- Early Access / Contact view
- Boost
- Extend
- Low Balance
- Referral / Review rewards
- Verification rewards
- بعضی Payment requestها

Source UI دقیق Wallet داخل Telegram Bot را مشخص نمی‌کند.

## Wallet Data

هر Wallet شامل:
- Balance
- Coin count
- Equivalent value
- Transaction history

Example:
- 250 Coins
- Equivalent Value: $25

Source Coin ratio:
- 10 Coin = $1

## Coin Types

### Purchased Coins
- خریداری‌شده توسط User
- قابل استفاده برای Serviceهای Platform
- بدون محدودیت زمانی طبق Business Policy

### Bonus Coins
Sources:
- Signup
- Referral
- Campaign
- Discount

Rules:
- Expiry دارند.
- قبل از Purchased Coins مصرف می‌شوند.
- برای بعضی Revenue Serviceها ممکن است محدود/غیرفعال باشند.

## Coin Purchase Flow

Source generic flow:

    User Wallet
      ↓
    Select Coin Package
      ↓
    Payment Gateway
      ↓
    Payment Confirmation
      ↓
    Add Coins To Wallet

Source مشخص نمی‌کند این Flow دقیقاً داخل Telegram Bot، Web App یا هر دو اجرا می‌شود.

## Payment Methods

### Initial / Manual
- Canada bank account transfer / transaction verification
- USDT / Ton
- Telegram Stars — در Version اول Manual review
- Iran rial/card transfer — در Version اول Manual

### Future
- Stripe
- PayPal
- System verification برای Telegram Stars
- Online banking gateway برای Iran

## Coin Package Examples

| Package | Coin | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | ندارد |
| Plus | 220 | $20 | 20 Coin |
| Premium | 550 | $50 | 50 Coin |

این اعداد Example هستند و Pricing Dynamic است.

## Wallet Actions Defined in Source

Wallet page actions:
- Buy Coins
- Transaction History

Source جای دقیق این Page در Telegram Bot را تعیین نمی‌کند.

## Transaction History

Fields:
- Date
- Type
- Description
- Amount

Examples:
- 09 Jul — Purchase — Business Package — +6000 Coins
- 09 Jul — Usage — Job Early Access — -50 Coins
- 08 Jul — Bonus — Referral Reward — +100 Coins

Transaction states:
- Pending
- Successful
- Failed
- Refunded

## Low Balance

Condition:

    Balance < Required Coins

Message:

    Your wallet balance is low. Recharge your wallet to continue.

Action:
- View Packages

این Rule برای Flowهایی مانند Contact/Early Access قابل اعمال است، اما Source Surface دقیق نمایش Message در Bot را مشخص نمی‌کند.

## Coin Consumption Relevant to Bot

- Early Access / Contact info
- Boost
- Extend / Renew
- Repeat Listing rule در همان Category
- Advertiser-sponsored contact cost
- Targeted Bot message by Region
- Cargo ticket Verification
- Future Google Ads / Telegram Ads promotion

## Reward Sources Relevant to Telegram User

- Phone Verification gift coin — مقدار مشخص نشده
- Referral signup/verification — 3 Coin برای هر طرف
- Referral after Package purchase — Example: 100 Coin برای هر طرف
- Review after confirmed paid-contact Deal — 1 Coin
- Verification rewards — Source Conflict دارد؛ See [Verification](./verification.md)
- Reach 10 Deals — 20 Coin + Badge
- Social/Email verification rewards طبق Source

## Payment Request Notification

Source Notification Trigger ثبت می‌کند:
- اگر Applicant Coin نداشته باشد، می‌تواند از Advertiser درخواست پرداخت Message/contact cost کند.

Source Flow مالی کامل، Approval behavior و UI این sponsorship را بیشتر تعریف نکرده است.

## Admin Wallet Management

Admin باید بتواند:
- Balance Userها را ببیند.
- Coin را دستی Add کند.
- Coin را Remove کند.
- Transaction history را ببیند.
- Package ایجاد/ویرایش/فعال/غیرفعال کند.
- Price، Coin amount و Bonus را تغییر دهد.
