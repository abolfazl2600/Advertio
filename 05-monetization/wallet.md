# Wallet

Wallet سیستم اعتبار داخلی Advertio است که User از طریق آن هزینه Serviceهای Platform را با Coin/Credit پرداخت می‌کند.

## Roadmap

در Roadmap، Wallet + Coin System کامل در **Version 1.1 — Wallet & Monetization Base** قرار گرفته است.

Conflict مربوط به اینکه Coin System در بخش دیگری جزو MVP نوشته شده، در [Monetization Model](./monetization-model.md) ثبت شده است.

## Objectives

- ساده‌سازی پرداخت‌های کوچک و پرتکرار
- پشتیبانی از مدل درآمدی Early Access
- خرید Coin Package و مصرف تدریجی اعتبار

## Wallet Data

هر User Wallet شامل:
- Wallet balance
- تعداد Coin موجود
- Equivalent value
- Transaction history

Example:
- Wallet Balance: 250 Coins
- Equivalent Value: $25

نمونه دیگری در UI:
- Wallet Balance: 2,450 Coins

## Credit Types

### Purchased Coins
- Coinهایی که User خریداری کرده است.
- برای تمام Serviceهای Platform قابل استفاده هستند.
- طبق سیاست کسب‌وکار محدودیت زمانی ندارند.

### Bonus Coins
برای Featureهای تبلیغاتی، تشویقی و افزایش Engagement هستند و استفاده از آن‌ها برای بعضی Revenue Serviceها ممکن است محدود یا غیرفعال شود.

منابع ذکرشده:
- Initial signup
- Referral Program
- Campaigns
- Discounts

Rules:
- Expiry دارند.
- قبل از Purchased Coins مصرف می‌شوند.

## Funding Methods

### Direct Coin Purchase
Flow:

    User Wallet → Select Coin Package → Payment Gateway → Payment Confirmation → Add Coins To Wallet

### Promo / Gift Code
Example code: PROMO2026

Flow:

    Validate Code → Add Coin → Record Transaction

### Payment methods described in Source

#### Initial / manual operation
- واریز به حساب بانکی Canada؛ برای شروع Transaction با یک حساب بانکی بررسی می‌شود.
- USDT / Ton
- Telegram Stars؛ در Version اول کاملاً دستی بررسی می‌شود.
- Iran: واریز ریالی به شماره کارت اعلام‌شده در Version اول.
- Roadmap Version 1.1 نیز به پرداخت دستی ریالی / USDT اشاره می‌کند.

#### Future automation
- Stripe و PayPal پس از موفقیت مدل اولیه
- System verification برای Telegram Stars
- Online banking gateway برای Iran

Source ترتیب دقیق فعال‌سازی تمام این روش‌ها را فراتر از توضیحات بالا مشخص نمی‌کند.

## Coin Packages — Examples

| Package | Coins | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | ندارد |
| Plus | 220 | $20 | 20 Coin |
| Premium | 550 | $50 | 50 Coin |

Pricing نهایی Dynamic است. See [Pricing](./pricing.md).

## Wallet Actions

- Buy Coins
- Transaction History

## Transaction History

Fields:
- Date
- Type
- Description
- Amount

Source examples:
- 09 Jul — Purchase — Business Package — +6000 Coins
- 09 Jul — Usage — Job Early Access — -50 Coins
- 08 Jul — Bonus — Referral Reward — +100 Coins

این Exampleها الزاماً با Price exampleهای سایر بخش‌ها یک Rule نهایی ایجاد نمی‌کنند.

## Transaction States

Pending | Successful | Failed | Refunded

Admin Transaction view:
- User ID
- Transaction ID
- Payment Status
- Amount
- Date
- Gateway Reference

## Low Balance

Condition:

    Balance < Required Coins

Message:

    Your wallet balance is low. Recharge your wallet to continue.

Action:

    View Packages

## Admin Panel — Wallet Management

Admin باید بتواند:
- Wallet balance Userها را ببیند.
- Coin را دستی اضافه کند.
- Coin را حذف کند.
- Transaction history را ببیند.

Package management:
- Create Package
- Change Price
- Change Coin amount
- Set Bonus
- Enable / Disable Package

## Wallet Analytics

### Revenue Metrics
- Total Revenue
- Revenue per Package
- Average Purchase Value
- Monthly Recurring Revenue

### Conversion Metrics
- تعداد Userهایی که Packageها را دیده‌اند
- تعداد Userهایی که Coin خریده‌اند
- Purchase Conversion Rate
- Repeat Purchase Rate

## Related

- [Coin Economy](./coin-economy.md)
- [Pricing](./pricing.md)
- [Referral](./referral.md)
