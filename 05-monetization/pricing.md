# Pricing

## Pricing Policy

تمام هزینه‌های سرویس‌ها باید به‌صورت Dynamic از Admin Panel قابل تنظیم باشند، از جمله:
- Early Access
- Boost
- Extend / Renew
- Urgent
- Escrow
- سایر خدمات پولی

Source تصریح می‌کند اعداد قیمت‌گذاری ذکرشده در سند **نمونه** هستند و قیمت نهایی باید بر اساس این عوامل تعیین یا بازنگری شود:
- Country
- Category
- Supply & Demand
- User behavior
- Unit Economics results

قیمت‌ها در نسخه‌های مختلف می‌توانند چندبار بازنگری شوند تا بین Conversion، Revenue و User Satisfaction تعادل ایجاد شود.

## Coin Reference

Source در Coin Economy تعریف می‌کند:

**10 Coin = $1**

این نسبت در نمونه Wallet نیز با 250 Coin = $25 سازگار نمایش داده شده است.

## Source-Defined Example Prices

| Service / Rule | Source amount | Notes |
|---|---:|---|
| Early Access contact view | 1 Coin | در Revenue Loop و Bot Workflow آمده؛ Pricing کلی Admin-configurable است و Timing آن Conflict دارد |
| Boost | 3 Coin | Dynamic by Admin |
| Extend — Jobs & Social, first 30 days | 35 Coin | Dynamic by Admin |
| Extend — Housing, first 30 days | 65 Coin | Dynamic by Admin |
| Extend — Jobs & Social, second 30 days and later | 55 Coin | Dynamic by Admin |
| Extend — Housing, second 30 days and later | 85 Coin | Dynamic by Admin |
| Cargo ticket Verified | 20 Coin | Admin Support verification |
| Repeat listing in same Category | 5 Coin | در Coin Economy برای ثبت مجدد پس از یک ماه ذکر شده |
| Historical MVP listing publication | $2 | داده واقعی MVP؛ نه قیمت نهایی Product |

برای Conflict زمانی Early Access به [Early Access](./early-access.md) مراجعه شود.

## Coin Packages — Examples

| Package | Coin | Price | Bonus |
|---|---:|---:|---:|
| Essential | 50 | $5 | ندارد |
| Plus | 220 | $20 | 20 Coin |
| Premium | 550 | $50 | 50 Coin |

این Packageها در Source به‌عنوان **نمونه** آمده‌اند. Admin باید بتواند:
- Package جدید ایجاد کند
- Price را تغییر دهد
- Coin amount را تغییر دهد
- Bonus را تعیین کند
- Package را فعال یا غیرفعال کند


## Approved Product Pricing Decisions

> Product Decision — 24 Sep 2026. These values/rules were approved after the original Source Document and are intentionally separated from Source-defined example pricing.

### Identity Verification

Initial price:

**USD $8 equivalent**

Payment paths:
- Advertio Coins
- other supported Advertio payment methods

Using the currently documented reference **10 Coin = $1**, the initial reference amount is:

**80 Coin**

The canonical pricing configuration should remain the source of truth. Frontends must not independently hardcode conversion logic.

The fee pays for the identity-verification service/review process. Payment by itself does not grant **Identity Verified**; the badge requires successful admin approval.

See [Paid Identity Verification](./identity-verification.md).

### Independent Listing Inspection

There is **no fixed global price** for the initial inspection service.

Backoffice must support per-request quoting because cost can vary based on:
- Category
- Country / City / Location
- Travel distance
- Inspection complexity
- Required expertise
- Requested tests/evidence
- Urgency
- Operational cost

The quote can be recorded in currency and, where applicable, as a Coin equivalent.

See [Independent Listing Inspection](./independent-listing-inspection.md).

## Discounts / Incentives

### Full Verification → Extend discount
Status: Proposed / Example

Source مثال می‌زند User با «احراز کامل» برای Extend می‌تواند **35% تخفیف** دریافت کند.

### Verified users → Coin Package discount
Status: Proposed / Future

Source برای افراد احرازشده **20% کاهش قیمت Coin Package** را مطرح کرده و می‌گوید این Feature می‌تواند بعداً توسط Plugin یا Partner ثالث انجام شود.

این دو Rule درباره دو Service متفاوت هستند و در Source به‌عنوان یک تخفیف واحد تعریف نشده‌اند.

## No Exact Price Defined

Source برای موارد زیر قیمت نهایی مشخص نمی‌کند:
- Urgent
- Premium Account
- Escrow
- Business Landing Page subscription / plans
- Targeted promotion negotiated with Admin
- Bank-account verification reward amount
- بسیاری از Categoryهای دیگر برای Extend

## Historical Validation Price

در MVP اولیه:
- 2 User پرداخت‌کننده وجود داشته است.
- مبلغ هر Listing: $2.
- مجموع درآمد: $4.
- این پرداخت برای انتشار Listing روی Website + Telegram Bot + Telegram Channel بوده است.

این داده Historical/Validated است و نباید به‌عنوان قیمت فعلی Early Access یا Listing در Product اصلی تفسیر شود.
