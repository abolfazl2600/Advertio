# Cargo — Filters & Search Contract

> Cargo has one feed. Filters narrow listings by role and route; they do not navigate to subcategories.

## 1. Primary filters

Recommended V1:

1. Role
2. From
3. To
4. Date
5. Weight
6. Item Type
7. Price
8. More Filters

## 2. Role

Values:

- Any
- Carrier
- Sender

Role filter only changes which listings are shown.

It does not change the category.

## 3. User-intent shortcut

UI may offer:

```text
I need a carrier
I need a sender
```

These are convenience actions.

Mapping:

```text
I need a carrier → filter role = carrier
I need a sender → filter role = sender
```

Do not create separate category routes.

## 4. Origin / destination

Route filters are directional.

Example:

```text
From Toronto
To Tehran
```

must not match Tehran → Toronto.

Use canonical location data.

## 5. Date

### Browsing Carrier listings

User can choose:

- exact date;
- date range.

Match carrier departure date inside the selected range.

### Browsing Sender listings

Match when the sender's acceptable window overlaps the selected date/range.

## 6. Weight

When browsing Carrier:

```text
Available capacity >= required weight
```

When browsing Sender:

the weight filter represents sender cargo weight.

Suggested UI:

```text
Up to 2 kg
Up to 5 kg
Up to 10 kg
10+ kg
Custom
```

Exact buckets should remain configurable.

## 7. Item Type

Values begin with:

- Documents
- Electronics
- Clothes
- Personal Items
- Other

### Carrier result

Match when carrier `allowed_items` contains the requested item type.

### Sender result

Match sender `item_types`.

## 8. Price

Price must respect `price_type`.

Do not compare per-kg and total prices as if equivalent.

Recommended:

- Price type: Any / Per kg / Total / Negotiable
- Maximum amount where compatible

## 9. More Filters

Potential:

- Verified trip only
- Verified user only
- Published within
- Supply source — admin/internal only
- exact date flexibility

Only expose trust filters if canonical verification states exist.

## 10. Cross-filter semantics

Across different filters:

```text
AND
```

Inside item multi-select:

recommended:

```text
OR
```

unless UI explicitly says "must support all selected item types."

## 11. Search

Free-text Cargo search can consider:

- origin city;
- destination city;
- description;
- item labels;
- role label.

But route filters remain the precise way to search routes.

Do not parse arbitrary text into hard route filters unless the search service explicitly supports it.

## 12. Saved Search

Cargo is a strong Saved Search use case.

Examples:

```text
Carrier · Toronto → Tehran · 18–22 Oct · ≥5 kg
Sender · Vancouver → Tehran · documents
```

Save canonical filter values, not translated labels.

## 13. Zero results

Show active filters and actions:

- Change dates
- Increase date flexibility
- Reduce required capacity
- Remove item restriction
- Reset filters

Do not silently reverse origin/destination.

Do not silently include the opposite role.

## 14. Acceptance criteria

- [ ] Cargo uses one filter surface for both roles.
- [ ] Role filter never creates a separate category/subcategory.
- [ ] Route direction is deterministic.
- [ ] Date matching works for exact carrier dates and sender date windows.
- [ ] Weight semantics change correctly by role.
- [ ] Item compatibility is filterable.
- [ ] Per-kg and total prices are not compared incorrectly.
- [ ] Saved Search can serialize the Cargo filter state.
