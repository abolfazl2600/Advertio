# Funnels

این فایل Funnelها و Loopهایی را که Source Document صراحتاً توصیف کرده است Consolidate می‌کند.

## Acquisition → registration → listing funnel

Flow قابل استخراج از Telegram Bot workflow:

```text
Start Bot
→ check existing registration
→ Phone Verification
→ create account
→ select default province/city
→ Main Menu
→ Post Listing
→ select Category
→ eligibility check
→ complete Listing form
→ Preview & Confirm
→ Pending
→ Admin moderation
→ Publish
```

Source برای هر Stage conversion rate واقعی ارائه نکرده است.

## Listing interaction / monetization funnel

Source چند Flow برای حرکت User از Listing به Contact و Payment ثبت کرده است.

### Revenue Loop

```text
Listing
→ request advertiser contact
→ pay 1 Coin
→ access contact
```

Source این Flow را با عنوان:
- Listing → Message → Payment

ثبت می‌کند و Payment را Early Access می‌نامد.

### Search interaction loop

```text
Search / view Listing
→ request contact directly or via Early Access
→ advertiser contact methods become visible
```

### Listing workflow monetization model

یک بخش دیگر Source می‌گوید:
- Day 1–3: Free Interaction
  - Contact info رایگان
  - پیام بدون Coin
- Day 4+: Contact view = 1 Coin

### Lifecycle Early Access model

بخش دیگری می‌گوید:
- Listingهای جدید حدود 30 ساعت در Early Access هستند.
- در این مدت Full access برای Userهای Early Access است.
- بعد از آن Listing و Contact access عمومی/رایگان می‌شود.

> ⚠️ Source Conflict
>
> یک بخش Monetization را بعد از Free Day 1–3 قرار می‌دهد و Day 4+ را 1 Coin تعریف می‌کند.
>
> بخش Lifecycle جهت معکوس دارد: Early Access پولی/محدود در ساعات ابتدایی و سپس Free access.
>
> Revenue Loop نیز Contact request را مستقیماً به Payment 1 Coin وصل می‌کند.
>
> این Funnel بدون تصمیم نهایی Product/Business یک Rule واحد محسوب نمی‌شود.

## Low response → Boost loop

```text
Low listing response
→ User buys Boost
→ Listing returns to top
→ Listing gets visibility again
```

Source برای این Loop conversion rate یا uplift واقعی ارائه نکرده است.

## Expiry → Extend loop

```text
Listing expires
→ User still has need
→ User pays Extend
→ Listing returns to publication lifecycle
```

## Deal → Review → Coin loop

```text
Deal completed
→ User submits Review
→ receives 1 Coin
→ Coin can be spent again
```

در بخش Trust loop:
```text
Chat / interaction
→ Deal completed
→ both parties click "deal completed"
→ Users review each other
→ rate out of 5
→ Trust increases
```

Source می‌گوید Review reward برای Userی که paid Early Access داشته و پس از Deal Review ثبت می‌کند 1 Coin است؛ Free-contact Listingها Review دارند ولی Coin reward ندارند.

## Referral funnel

دو Referral trigger در Source وجود دارد:

### Package-purchase referral

```text
Invite Friend
→ Friend purchases Package
→ both users receive reward
```

Example:
- Both receive 100 Coins

### Signup / verification referral

```text
Referral link
→ new user registers / verifies
→ both users receive 3 Coins
```

Source مشخص نکرده این دو Referral funnel مستقل و cumulative هستند یا Alternative versions.

## Wallet purchase funnel

```text
User Wallet
→ Select Coin Package
→ Payment Gateway
→ Payment Confirmation
→ Add Coins to Wallet
```

Conversion Metrics تعریف‌شده برای این Funnel:
- Package viewers
- Coin purchasers
- Purchase Conversion Rate
- Repeat Purchase Rate

جزئیات در [Revenue KPIs](./revenue-kpis.md).

## Saved Search engagement loop

```text
User creates Filter
→ enables Telegram notification
→ matching/new Listing appears
→ daily summary/link is sent
→ User returns to Listing
```

اگر Result ارسال نشود:
- System پیشنهاد کاهش Filterها را می‌دهد تا Result بیشتری ایجاد شود.

Source threshold ثبت‌شده:
- حدود 70% Match می‌تواند برای User ارسال شود.

## Social Proof loop

```text
Stronger profile
→ more trust
→ more interaction
```

Facebook login با Reward نمونه 5 Coin به‌عنوان Mechanism تقویت Trust مطرح شده است.

## Funnel measurement gap

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source برای Funnelهای بالا Stage-by-stage conversion rate واقعی، drop-off، median time-to-step یا cohort breakdown ارائه نکرده است، به‌جز MVP interaction/payment conversion ثبت‌شده در [MVP Results](./mvp-results.md).
