# Notifications

## Version scope

Version 1.0:
- Telegram Notifications

Version 1.2:
- Smart Notifications
- Saved Search + Alerts

Version 2.5:
- WhatsApp Integration

Saved Search:
- Email alerts in Future

## Notification channels named by Source

- Telegram
- WhatsApp
- Email

> ⚠️ Source Conflict
>
> General notification section says notifications are sent through Telegram, WhatsApp and Email.
>
> Roadmap places WhatsApp in Version 2.5 and Saved Search places Email in Future.
>
> Current availability of all three channels is therefore not consistent.

## Notification triggers

Source defines:
- Payment/contact request from applicant to Advertiser when User lacks Coin and asks Advertiser
- New Listing matching active Filter
- Listing performance report
- Expiry warning
- Admin-to-user message
- Targeted advertising
- Early Access lifecycle notification
- Low Wallet balance

## Listing performance notifications

Cadence names:
- Daily
- Weekly
- Total

Metrics in Source:
- Views
- Contact info views
- Contact Requests
- Detail listing view
- Clicks on contact method

Listing Entity says metrics are sent daily even after Expiry for up to one month.

## Expiry warning

- warning begins 3 days before Expiry
- sent every day

Another workflow:
- Telegram Extend notifications up to 15 days after Expiry

> ⚠️ Source Conflict
>
> Performance notifications are described as continuing for one month after Expiry.
>
> Extend Telegram notifications are described as continuing for 15 days.
>
> Source does not say whether these are different streams or inconsistent durations.

## Saved Search notifications

- Telegram Bot
- Daily summary with links
- new matching Listings
- ~70% matching threshold
- Future Email option

See [Saved Search](./saved-search.md).

## Admin notifications

Admin can:
- send message to User
- send targeted advertising/message by:
  - Region
  - Category
  - City
  - Country
- Fee is agreed with Admin

## Low Wallet balance

Condition:
```text
Balance < Required Coins
```

Message:
`Your wallet balance is low. Recharge your wallet to continue.`

Action:
- View Packages

## Early Access lifecycle

Advertiser is informed:
- Listing will enter public/free phase after Early Access
- Boost can be used to maintain visibility

Lifecycle timing conflicts are documented in [Listing Lifecycle](./listing-lifecycle.md).

## Missing notification rules

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source does not define:
- opt-in/out model
- rate limits
- quiet hours
- delivery retry
- read/unread states
- channel preference hierarchy
