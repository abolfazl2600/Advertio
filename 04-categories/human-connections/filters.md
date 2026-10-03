# Human Connections — Active Filters

> Active Filters are the primary structured discovery mechanism for Human Connections.
>
> There is no person-to-person matching engine.

## 1. Primary filter row

Recommended V1:

1. Connection Type
2. Location / Remote
3. Date
4. Activity
5. More Filters

## 2. Connection Type

Values can include:

- Any
- Travel
- Study
- Daily Life
- Health & Fitness
- Sports & Outdoor
- Social Activity
- Family & Kids
- Other

Selecting a Connection Type narrows the available Activity values.

## 3. Location / Remote

Recommended selector:

```text
Any
In person
Remote
Either
```

For In person:

- Country
- Province/State
- City
- optional Area

Reuse Advertio canonical location data.

## 4. Date

Support:

- Any date
- Exact date
- Date range

Potential convenience presets:

- Today
- This week
- This weekend
- Next 7 days

Presets must resolve to explicit dates in the query state.

## 5. Activity

Activity values depend on Connection Type.

Example:

```text
Sports & Outdoor
→ Tennis
→ Padel
→ Running
→ Hiking
...
```

Activity is a normal filter, not a match signal.

## 6. More Filters

Potential filters:

- Availability
- Language
- Group size
- Verified user only
- Posted within

Only expose a filter when its underlying attribute/state is normalized and reliable.

## 7. Filter logic

Across independent filter dimensions:

```text
AND
```

Example:

```text
Sports & Outdoor
AND Tennis
AND North York
AND This Weekend
```

Within a multi-select value list:

```text
OR
```

unless the UI clearly specifies otherwise.

## 8. Active Filter state

The UI should make active filters visible.

Example chips:

```text
Sports & Outdoor
Tennis
North York
This Weekend
```

Users should be able to:

- remove one filter;
- edit a filter;
- Reset All;
- Save Filter.

## 9. Search + Active Filters

A free-text query can be combined with active filters.

Example:

```text
Search: beginner tennis
Filters:
City = North York
Date = This Weekend
```

Search handles text relevance.

Filters enforce structured constraints.

No match percentage is produced.

## 10. Result semantics

A listing appears when it satisfies the active structured constraints plus the search query behavior.

Do not:

- calculate a 70% filter match;
- display 85%/95% compatibility;
- silently ignore an active hard filter;
- silently broaden the query.

## 11. Saved Filter

The complete filter state should be serializable.

Example:

```json
{
  "connection_type": "sports_outdoor",
  "activity_type": "tennis",
  "participation_mode": "in_person",
  "country": "CA",
  "province": "ON",
  "city": "north_york",
  "date_from": "2026-10-10",
  "date_to": "2026-10-11"
}
```

Field names are illustrative until API implementation is finalized.

## 12. Notifications

A new Listing can trigger a Saved Filter alert when it satisfies the saved filter conditions.

This is deterministic filter satisfaction, not matching.

## 13. Zero results

Show:

- active filters;
- Reset All;
- controls to remove/modify filters.

Suggestions to loosen a filter can be shown, but Advertio should not silently change the filter state.

## 14. Back-navigation state

When user opens a Listing and returns:

- preserve Search query;
- preserve Active Filters;
- preserve scroll/page position where feasible.

## 15. Acceptance criteria

- [ ] Discovery works with Active Filters only.
- [ ] Active filters remain visible/editable.
- [ ] AND/OR semantics are deterministic.
- [ ] No match percentage exists.
- [ ] No 70% threshold exists.
- [ ] Saved Filter serializes the same query state.
- [ ] Alert eligibility is based on saved-filter satisfaction.
- [ ] Zero-result handling never silently changes filters.
