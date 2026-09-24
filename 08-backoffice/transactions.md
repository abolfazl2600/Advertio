# Transactions

این فایل Transaction data، Payment states و Admin-facing Transaction Management را از Source Document ثبت می‌کند.

## Transaction history — user-facing data

Fields:
- Date
- Type
- Description
- Amount

Source examples:
- 09 Jul — Purchase — Business Package — +6000 Coins
- 09 Jul — Usage — Job Early Access — -50 Coins
- 08 Jul — Bonus — Referral Reward — +100 Coins

این اعداد Example هستند و Pricing نهایی از آن‌ها استنتاج نمی‌شود.

## Admin Transaction Management

Admin باید بتواند این Fields را مشاهده کند:
- User ID
- Transaction ID
- Payment Status
- Amount
- Date
- Gateway Reference

## Transaction states

```text
Pending
Successful
Failed
Refunded
```

Source Refund workflow، dispute handling یا state-transition rules را تعریف نکرده است.

## Direct coin purchase flow

```text
User Wallet
→ Select Coin Package
→ Payment Gateway
→ Payment Confirmation
→ Add Coins To Wallet
```

## Gift / promo code flow

Example code:
```text
PROMO2026
```

Flow:
```text
User enters code
→ validate code
→ add Coin
→ record Transaction
```

## Payment / wallet charging methods

Source روش‌های زیر را نام می‌برد:

### Canada bank payment
- برای شروع: تأیید Transaction با یک Bank account
- Future پس از موفقیت: Online gateways مثل Stripe و PayPal

### Crypto
- USDT
- TON

### Telegram Stars
- Version اول: کاملاً Manual review
- Future: System confirmation

### Iran
- Version اول: واریز ریالی به Card number اعلام‌شده
- Future: Online banking gateway با Auto confirmation

### Version 1.1
Roadmap:
- Wallet + Coin System
- Manual payment شامل واریز ریالی / USDT

## Purchased vs Bonus transaction semantics

### Purchased Coins
- Purchased by User
- قابل استفاده برای تمام Serviceها
- بدون محدودیت زمانی طبق Business Policy

### Bonus Coins
Sources:
- Signup
- Referral
- Campaign
- Discount

Rules:
- Expiry دارد
- اولویت مصرف قبل از Purchased Coins
- ممکن است برای بعضی Revenue services محدود/غیرفعال باشد

## Referral transaction triggers

Source دو Trigger متفاوت ثبت می‌کند:

### Referral after package purchase
```text
Invite Friend
→ Friend Purchases Package
→ Both Users Receive Reward
```

Example:
- هر دو User: 100 Coins

### Referral after signup/verification
در Coin Economy/Acquisition:
- Referrer: 3 Coins
- New User: 3 Coins
- در یک بخش Trigger به Registration with verification وابسته شده است.

Source مشخص نکرده این دو Reward می‌توانند هم‌زمان/cumulative باشند یا نه؛ بنابراین بدون ادغام حفظ شده‌اند.

## Financial analytics linkage

Transaction data مبنای Dashboardهایی است که Source برای:
- Total Revenue
- Revenue per Package
- Average Purchase Value
- MRR
- Purchase Conversion Rate
- Repeat Purchase Rate

نام برده است. جزئیات Analytics در [Analytics](./analytics.md).
