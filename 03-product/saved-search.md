# Saved Search / Saved Filter

## Version scope

Roadmap:

- Version 1.2: Saved Search + Alerts

Feature prioritization:

- Saved Filters in Phase 2

## Product decision

A Saved Filter stores the user's structured Search/Filter state.

New Listing alert eligibility is determined by whether the Listing satisfies the saved filter conditions.

## Core behavior

User:

1. builds Search with desired Filters;
2. saves the Search / Filter state;
3. enables Telegram notification;
4. receives notification when a new Active Listing satisfies the Saved Filter.

A daily summary can contain links to Listings satisfying the Saved Filter.

## Example

```text
Category = Housing
City = Toronto
Monthly Rent <= 1500
Gender Preference = Female
```

A new Listing must satisfy the active conditions according to the category's filter semantics.

## Filter semantics

Each category owns its structured filter semantics.

General rule:

- independent filter dimensions combine with AND;
- multi-select behavior is defined by that filter;
- Any/unset does not constrain;
- Ranking orders eligible results but does not bypass hard filters.

## No-result behavior

If no new Listing satisfies the Saved Filter:

- do not send invented/loosely related results as if they satisfied it;
- UI may recommend loosening Filters;
- user chooses whether to change the Saved Filter.

## Notification channels

Current Saved Search/Filter flow:

- Telegram Bot message

Future:

- User can add Email for alerts

## Admin visibility

- Active Saved Filters are visible in Admin Panel.

## AI Search relationship — Future

AI Search Assistant can:

- understand a natural-language request;
- extract structured Attributes;
- create/edit Active Filters;
- save the resulting filter state.


## Product purpose

Version 1.2 goal:

- improve experience;
- increase engagement;
- reduce repeated manual searching.

Source does not provide actual Saved Filter conversion/retention results.

## Missing rules

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source does not define:

- max Saved Filters per User;
- expiry;
- delete/edit behavior;
- duplicate filter behavior;
- notification deduplication;
- frequency override by User.
