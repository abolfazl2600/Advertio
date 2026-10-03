# Social & Events — Active Filters

> Status: **Development specification**

## 1. Primary filters

Recommended V1:

1. Social Type
2. Date
3. Location / Online
4. Activity / Topic
5. Admission
6. More Filters

## 2. Social Type

- Any
- Event
- Meetup
- Community Activity

## 3. Date

Recommended presets:

- Today
- Tomorrow
- This Week
- This Weekend
- Next 7 Days
- Custom Date / Range

Presets must resolve to real timezone-aware date boundaries.

Filtering should use event/activity occurrence time, not Listing creation time.

## 4. Location / Online

Values:

- Any
- In person
- Online
- Hybrid

For local browsing:

- Country
- Province/State
- City
- optional Area

## 5. Activity / Topic

Structured topic values can evolve based on demand.

Examples:

- Community
- Education
- Culture
- Technology
- Business
- Sports
- Games
- Volunteering
- Arts
- Other

Do not create uncontrolled permanent enums from arbitrary free text.

## 6. Admission

- Any
- Free
- Paid
- Donation

Optional numeric price range can be added for paid activities once enough data exists.

## 7. More Filters

Potential:

- Language
- One-time / Recurring
- Registration required
- Verified organizer only — only if canonical verification exists
- Posted within

## 8. Filter semantics

Across independent filters:

```text
AND
```

Multi-select values inside a filter use documented OR semantics unless the UI explicitly communicates otherwise.

`Any` / unset does not constrain.

## 9. Saved Filters

Example:

```text
Meetup
Toronto
This Weekend
Technology
Free
```

A new Active Social Listing can trigger an alert when it satisfies the Saved Filter conditions.

## 10. Zero results

Show current Active Filters and allow the User to:

- remove a filter;
- expand date range;
- change location;
- Reset All.

Do not silently change hard filters.

## 11. Acceptance criteria

- [ ] Social Type is filterable.
- [ ] Date uses event/activity time.
- [ ] Online/in-person behavior is explicit.
- [ ] Admission filters are separate from Advertio monetization.
- [ ] Saved Filter uses the same deterministic filter state.
