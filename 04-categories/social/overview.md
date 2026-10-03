# Social & Events — Product Overview

> Status: **Development specification**
>
> Canonical scope: **Events / Meetups / Community Activities**
>
> Partner-seeking use cases belong to [Human Connections](../human-connections/overview.md).

## 1. Purpose

Social & Events is for publishing and discovering an organized activity that exists at a defined time, place, online location, or recurring schedule.

Core statement:

> "This event / meetup / community activity exists."

This is different from Human Connections:

> "I am looking for a person/group."

## 2. Canonical Social types

```text
social_type:
- event
- meetup
- community_activity
```

These are structured Listing attributes inside one Social & Events category.

They are not separate top-level marketplace categories.

## 3. Event

An organized scheduled event with a defined start time and organizer.

Examples:

- community presentation;
- workshop;
- cultural event;
- public gathering;
- scheduled sports/community event.

See [events.md](./events.md).

## 4. Meetup

A smaller or more informal organized gathering.

Examples:

- language meetup;
- founders meetup;
- local tech meetup;
- board-game meetup;
- recurring interest-group meetup.

See [meetups.md](./meetups.md).

## 5. Community Activity

An organized open or recurring community activity that is not primarily a one-to-one partner request.

Examples:

- community cleanup;
- recurring group walk;
- public group practice;
- volunteer activity;
- community class/session.

See [community-activities.md](./community-activities.md).

## 6. Removed partner structure

The following old Social subtypes are removed:

- `study_partner`
- `sports_partner`
- `other_partner`

Those use cases now belong to Human Connections.

`p2p_exchange_request` is also not a Social subtype. Peer Exchange, if enabled later, remains its own product/category decision.

## 7. Discovery

Social & Events uses:

```text
Search
+ Active Filters
+ Saved Filters
+ Ranking
```

Primary discovery dimensions:

- Social Type
- Date
- Location / Online
- Activity/Topic
- Free/Paid admission
- More Filters

See [filters.md](./filters.md).

## 8. Contact and registration

Source-defined rule:

- Social / Event / Meetup contact does not require Coin.
- The official Contact button should still be used for analytics.

Development model:

- contact/registration CTA is free;
- organizer can optionally provide an external registration URL;
- Advertio V1 does not process event tickets or guarantee attendance;
- any stated admission price is informational unless a future ticketing product is explicitly implemented.

## 9. Lifecycle

Typical lifecycle:

```text
Draft
→ Pending Review
→ Active
→ Event/Activity end
→ Inactive / Expired
```

Admin can reject or take down a Listing.

Recurring activities need explicit recurrence/schedule data rather than copying old events indefinitely.

## 10. Current implementation boundary

The source and Telegram category structure include Social & Events.

This documentation defines the target category contract; it does not claim that the complete Social feed/filter/posting experience is already verified in the current Mini App.

## 11. Documentation map

- [attributes.md](./attributes.md)
- [filters.md](./filters.md)
- [events.md](./events.md)
- [meetups.md](./meetups.md)
- [community-activities.md](./community-activities.md)
- [rules.md](./rules.md)

## 12. Acceptance criteria

- [ ] Social contains only Events, Meetups and Community Activities.
- [ ] Partner requests are not Social subtypes.
- [ ] Social discovery uses structured Active Filters.
- [ ] Date/schedule and participation mode are explicit.
- [ ] Contact/registration CTA is free and measurable.
- [ ] Event admission price is not confused with Advertio contact monetization.
