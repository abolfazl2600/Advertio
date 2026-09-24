# Wallet Management

Wallet سیستم اعتبار داخلی Advertio است که User از طریق Coin/Credit هزینه Serviceهای پلتفرم را پرداخت می‌کند.

## Version scope

Roadmap:
- Version 1.1: Wallet + Coin System کامل و Manual Payment

در بخش دیگری از Source، «سیستم سکه» جزو MVP آمده است. این Version conflict در [Overview](./overview.md) ثبت شده است.

## Wallet data

هر User Wallet شامل:
- Wallet Balance
- تعداد Coinهای موجود
- Equivalent value
- Transaction History

Source baseline:
- 10 Coins = $1

Example:
- Wallet Balance: 250 Coins
- Equivalent Value: $25

## Credit types

### Purchased Coins
- User آن‌ها را خریداری می‌کند.
- قابل استفاده برای تمام Serviceهای پلتفرم.
- طبق Business Policy محدودیت زمانی ندارند.

### Bonus Coins
برای Promotion، Incentive و Engagement:
- ممکن است در بعضی Revenue serviceها محدود یا غیرفعال باشند.
- Expiry دارند.
- قبل از Purchased Coins مصرف می‌شوند.

Sources:
- Initial signup
- Referral Program
- Advertising campaigns
- Discounts

## Wallet charging

### Direct purchase
```text
User Wallet
→ Select Coin Package
→ Payment Gateway
→ Payment Confirmation
→ Add Coins To Wallet
```

### Gift / discount code
```text
Enter code
→ Validate
→ Add Coin
→ Record Transaction
```

Example code در Source:
- PROMO2026

روش‌های Payment و Versioning در [Transactions](./transactions.md) ثبت شده‌اند.

## Coin package examples

| Package | Coins | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | ندارد |
| Plus | 220 | $20 | 20 |
| Premium | 550 | $50 | 50 |

Admin می‌تواند Packageها را:
- ایجاد کند.
- Price را تغییر دهد.
- Coin amount را تغییر دهد.
- Bonus تعیین کند.
- Active/Inactive کند.

## Wallet page actions

Source برای Wallet page:
- Buy Coins
- Transaction History

Example balance:
- 2,450 Coins

## Low balance behavior

Condition:
```text
Balance < Required Coins
```

Message:
> Your wallet balance is low. Recharge your wallet to continue.

Action:
- View Packages

## Admin Wallet Management

Admin باید بتواند:
- User balance را مشاهده کند.
- Coin را دستی اضافه کند.
- Coin را حذف کند.
- Transaction History را مشاهده کند.

Transaction fields و states در [Transactions](./transactions.md).

## Coin uses / monetization

Source این Coin uses را ثبت کرده است:
- Contact info / Early Access
- Boost
- Extend
- بعضی Repeat Listingها
- Advertiser pays communication cost
- Targeted bot message بر اساس Region
- Google Ads / Telegram Ads promotion — Future
- Cargo ticket Verification

## Coin rewards

Source rewardهای مختلف ثبت کرده است:
- Referral
- Verification
- Review after confirmed deal
- Social verification
- Work/university email verification
- 10 successful deals

### Review reward
- اگر User که Early Access paid contact داشته پس از Deal Review ثبت کند: 1 Coin.
- برای همان User تکراری نیست.
- Free-contact Listingها Review دارند ولی این Coin reward را ندارند.

### 10 deals
- 20 Coins
- 10 Deals Badge

### Referral rules
1. Friend purchases Package → both users receive 100 Coins — Example.
2. Signup/verification referral → 3 Coins برای New User و Referrer.

Triggerهای این دو Rule متفاوت‌اند و Source درباره cumulative بودن آن‌ها چیزی نمی‌گوید.

### Verification rewards
مقادیر Source با یکدیگر Conflict دارند؛ به [Verification](./verification.md) مراجعه شود.

## Pricing relationship

تمام هزینه‌های Serviceها و بسیاری از Coin amounts باید Dynamic/Configurable باشند. جزئیات در [Pricing Management](./pricing-management.md).
