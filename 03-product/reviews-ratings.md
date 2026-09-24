# Reviews & Ratings

## Version scope

Roadmap:
- Version 1.5 includes Review + Rating + Badges.

Feature prioritization:
- Rating & Review in Phase 2.

## Deal confirmation requirement

Source:
- Listing page contains a button for Advertiser and Requester to indicate agreement/deal.
- Review becomes available after both parties confirm that Deal occurred.

Trust loop:

```text
Chat / interaction
→ Deal
→ both parties click "deal completed"
→ both Users can review
→ rate out of 5
→ Trust increases
```

## Rating

- Rating scale: 5 stars.
- Average Rating shown in User Profile.

## Reviews

User Profile stores:
- Reviews
- Average Rating
- Deals Count

Deals Count:
- successful deals confirmed by both parties.

## Review Coin reward

For paid-contact interaction:
- User who paid Early Access
- completes Deal
- leaves Review
- receives 1 Coin

Restrictions:
- reward cannot repeat for same User/case.
- Free-contact Listings can still receive Review.
- Free-contact Listings do not grant this Coin reward.

## Post-deal workflow variant

Another workflow says:
- Review optional
- Comment optional
- if User submits Comment and Review, +1 Coin

> ⚠️ Source Conflict
>
> One section defines the reward as 1 Coin for a Review after a paid Early Access deal.
>
> Another workflow states 1 Coin when Comment and Review are submitted.
>
> Source does not clarify whether Comment is required for the reward.

## Badges

Source lists:
- Top Rated
- Financial Verified
- Phone Verified
- Quick Responder
- New Member
- 1 Year Member
- 10 Deals
- +20 Deals

Badges are added across Versions and are not all Version 1 features.

### Top Rated
Requirements:
- Average Rating ≥ 4.5 / 5
- minimum 15 Reviews
- no Dispute or Report

### 10 Deals
Coin Economy:
- reaching 10 successful deals:
  - +20 Coins
  - 10 Deals Badge

## Review visibility in profile/history

Listing History section says:
- without Early Access: Preview
- with Early Access: all Ratings, Comments and old Listings can be shown

Source does not define exact privacy/visibility logic beyond this statement.

## Crawled Listing exception

Crawled Listings:
- Review disabled
- because User is redirected directly to Telegram advertiser and Advertio-specific interaction features are not active.

## Missing definitions

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source does not define:
- rating edit/delete rules
- review moderation workflow
- review dispute workflow
- anonymous reviews
- review window expiration
- rating weighting
