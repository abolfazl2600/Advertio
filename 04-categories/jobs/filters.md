# Jobs — Filters

> Status: **Jobs V1 proposed filter specification**. Current Mini App Jobs remains Coming Soon.

## Primary filter row

Recommended Jobs V1 primary filters:

1. City / Location
2. Job Category
3. Employment Type
4. Salary
5. Work Arrangement
6. More Filters

The filter row should follow the same reusable Mini App interaction pattern as Housing: horizontal chips/selectors plus a More Filters sheet.

## Location

Recommended values:

- All cities
- canonical cities from Advertio location data

Remote behavior:

- a Remote job should remain discoverable even when no city is set;
- city filters should not incorrectly exclude a remote job when product rules allow nationwide remote work;
- country remains part of the job's structured scope.

## Job Category

Uses the canonical taxonomy from [job-taxonomy.md](./job-taxonomy.md).

## Employment Type

Canonical V1 values:

- Any
- Full-time
- Part-time
- Contract
- Temporary
- Internship
- Casual

## Salary

Jobs salary has period-specific semantics.

Recommended V1:

- Salary disclosed only
- Salary period selector
- Minimum salary
- Maximum salary

Do **not** automatically compare hourly vs monthly vs yearly values unless a canonical salary-normalization service exists.

## Work Arrangement

- Any
- On-site
- Remote
- Hybrid

## More Filters

Recommended V1/next-step fields:

### Experience Level

- Any
- Entry
- Mid
- Senior
- Lead / Manager

### Shift

Multi-select:

- Morning
- Evening
- Night
- Weekend

### Schedule

- Any
- Fixed
- Flexible

### Language Requirements

Multi-select canonical language values.

### Start Date

- Any
- Immediately / as soon as possible
- Date-based filtering when data exists

### Company / Poster Trust

Potential filters:

- Verified employer only
- Company / Recruiter / Individual

Only expose a verification filter once the corresponding trust state exists in the runtime.

### Posted Within

Potential:

- Any
- Last 24 hours
- Last 3 days
- Last 7 days

This should use `published_at`, not listing creation draft time.

## Filter semantics

- `Any` / unset does not constrain results.
- Multiple independent filters use AND semantics.
- Multi-select values inside one filter use the category's intended OR/contains semantics.
- Filters must not mutate listing data.
- Result count must reflect current filters.
- Missing optional listing attributes should not match a filter that explicitly requires that value.

## URL/state behavior

Recommended:

- persist filters in Mini App navigation state when feasible;
- returning from Job Detail should restore the prior Jobs feed state;
- clear/reset returns to the category default.

## Search relationship

Global Search and Jobs filters are separate:

- Search answers broad free-text intent.
- Jobs filters provide exact structured narrowing.

Issue #33 defines a Telegram Quick Search design where a simple term such as `Designer` can return a Jobs result without category preselection.

## Acceptance criteria

- [ ] Primary filter row includes Location, Category, Employment Type, Salary, Work Arrangement and More Filters.
- [ ] Unset/Any filters do not constrain results.
- [ ] Multiple active filters combine predictably.
- [ ] Salary filtering never silently compares incompatible periods.
- [ ] Remote listings are handled consistently with location rules.
- [ ] Clear/Reset restores the default Jobs feed.
- [ ] Filtered result count updates correctly.
- [ ] Returning from Job Detail preserves filter state where the platform navigation architecture supports it.
