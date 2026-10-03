# Jobs — Filter & Query Contract

> Status: **Jobs V1 proposed specification**
>
> Current state:
> - Jobs is still Coming Soon in the Mini App.
> - This document defines the intended Jobs filtering behavior for implementation.
> - It reuses interaction patterns already proven in Housing where practical.

## 1. Product goal

Jobs filters should let a user narrow a large feed without requiring complicated query syntax.

Primary question:

```text
"Show me the jobs that actually fit where, how and for how much I want to work."
```

## 2. Filter layers

### Layer A — primary filters

Always easy to reach:

1. Location
2. Job Category
3. Employment Type
4. Salary
5. Work Arrangement
6. More Filters

### Layer B — More Filters

Secondary criteria:

- Experience Level
- Shift
- Schedule
- Languages
- Start Date
- Posted Within
- Poster Type
- Verified Employer — only after real verification exists
- Salary Disclosed
- Skills — later if taxonomy/search support is good enough

## 3. Default state

Default:

```text
Location: Any / current category scope
Job Category: Any
Employment Type: Any
Salary: Any
Work Arrangement: Any
More Filters: none
Sort: relevance/freshness default defined by Jobs feed
```

No default filter should silently exclude valid Jobs unless the product explicitly scopes geography.

## 4. Location filter

### 4.1 Location hierarchy

Reuse canonical Advertio geography:

```text
Country
→ Province/State
→ City
→ Area
```

### 4.2 V1 UI

Primary chip should usually show:

```text
All cities
Toronto
Richmond Hill
Vancouver
...
```

based on the current geographic scope.

### 4.3 Remote semantics

Remote must be handled deliberately.

A Remote Job may have:

```text
work_arrangement = remote
country = CA
city = null
```

If user filters City = Toronto, product must decide whether Canada-wide remote Jobs should also appear.

Recommended V1 behavior:

- City filter applies to On-site/Hybrid city.
- Remote Jobs appear only when:
  - Work Arrangement includes Remote; and
  - their geographic scope includes the user's selected country/region.
- Do not inject all remote Jobs into every city filter automatically.

This avoids irrelevant results.

### 4.4 Hybrid

Hybrid must have a city.

## 5. Job Category filter

Source:

[Job Taxonomy](./job-taxonomy.md)

UI:

- single-select in V1 for simplicity;
- multi-select can be added later if demand exists.

Default:

```text
Any category
```

## 6. Employment Type filter

V1:

- Any
- Full-time
- Part-time
- Contract
- Temporary
- Internship
- Casual

Recommended semantics:

- single-select initially;
- multi-select later if necessary.

## 7. Work Arrangement filter

- Any
- On-site
- Remote
- Hybrid

Can become multi-select later.

## 8. Salary filter

Salary filtering is the highest-risk filter for incorrect matching because Jobs can use different pay periods.

## 8.1 V1 salary filter contract

Use:

- Salary disclosed only: boolean
- Salary Period: hour/day/week/month/year
- Minimum salary
- Maximum salary

Example:

```text
Period: Hour
Minimum: 20 CAD
Maximum: Any
```

## 8.2 No silent cross-period comparison

Do not compare:

```text
$25/hour
vs
$4,000/month
vs
$60,000/year
```

unless Advertio has an explicit normalization formula and assumptions.

V1 query should compare only records with compatible `salary_period`.

## 8.3 Salary state behavior

If:

```text
salary_type = not_disclosed
```

it should not match a numeric minimum salary filter.

If:

```text
salary_type = negotiable
```

it should not match numeric salary constraints unless product explicitly defines negotiable matching.

## 8.4 Range overlap

For a requested salary range, use an explicit overlap rule.

Example user filter:

```text
$20–$30/hour
```

Job:

```text
$25–$35/hour
```

Recommended:

- range overlaps → candidate matches.

For minimum-only:

```text
min requested <= job salary_max
```

when salary range exists.

Exact backend formula should be implemented consistently and tested.

## 9. Experience Level

- Any
- Entry
- Mid
- Senior
- Lead / Manager

If experience level is missing from a Job:

- it does not match an explicit Experience Level filter;
- it can still appear when filter = Any.

## 10. Shift

Multi-select:

- Morning
- Evening
- Night
- Weekend

Recommended within-filter semantics:

```text
OR
```

Example:

```text
Morning OR Weekend
```

Across independent filters, use AND.

## 11. Schedule

- Any
- Fixed
- Flexible

## 12. Language Requirements

Use canonical language values.

Recommended multi-select semantics must be explicit.

V1 recommendation:

- listing matches when it contains **all user-selected required languages** only if the user is expressing capability;
- if user is merely browsing by "Jobs requiring Persian OR English", use OR.

Because these represent different user intent, do not implement language filtering until the UX copy makes the semantics clear.

For first launch, language can remain in More Filters or Search rather than becoming a mandatory primary filter.

## 13. Start Date

Potential V1:

- Any
- Immediately / ASAP
- Before selected date

Avoid arbitrary interpretation of free-text start dates.

## 14. Posted Within

Use:

```text
published_at
```

not:

- draft creation time;
- crawler collection time;
- last edit time.

Values:

- Any
- Last 24 hours
- Last 3 days
- Last 7 days

## 15. Poster Type

- Any
- Company
- Recruiter
- Individual

Use only if `poster_type` is reliably populated.

## 16. Verified Employer

Do not expose:

```text
Verified employer only
```

until Advertio has an actual canonical employer/business verification state.

Phone verification alone should not be renamed "Verified Employer."

## 17. Skills filter

Skills are useful but risky if taxonomy is uncontrolled.

V1 options:

- omit skill filter initially;
- allow free-text Search to match skills;
- add structured skill filter after normalization quality is proven.

## 18. Boolean filter behavior

Example:

```text
Salary disclosed only
```

States:

- unset = any
- true = only disclosed
- false should usually not be exposed as a user-facing filter unless useful

## 19. Cross-filter logic

Across independent filters:

```text
AND
```

Example:

```text
Toronto
AND Warehouse
AND Full-time
AND $20+/hour
AND On-site
```

Within a multi-select field:

```text
OR
```

unless that field's UX explicitly communicates "must contain all."

## 20. Query-state model

Recommended canonical filter state:

```json
{
  "country": "CA",
  "province": "ON",
  "city": "toronto",
  "job_category": "warehouse",
  "employment_type": "full_time",
  "work_arrangement": "on_site",
  "salary_period": "hour",
  "salary_min": 20,
  "salary_max": null,
  "salary_disclosed_only": true,
  "experience_level": null,
  "shift": [],
  "schedule": null,
  "posted_within_days": 7
}
```

This is an illustrative contract, not proof of current API field names.

## 21. Search + filter interaction

Global Search and Jobs filters can combine.

Example:

```text
query = "forklift"
filters:
  city = Toronto
  category = Warehouse
  employment_type = Full-time
```

Search should retrieve relevant text candidates; filters then narrow structured attributes.

Do not force every free-text token into a structured filter.

## 22. Result count

Feed must show count after active filters.

If count is approximate because backend pagination/search cannot provide an exact total, UI must label behavior honestly rather than invent an exact count.

## 23. Clear / reset

### Clear one filter

Returns that filter to Any/unset.

### Reset all

Returns entire Jobs query to category default.

It should not navigate the user away from Jobs.

## 24. Back-navigation state

When user:

```text
Jobs Feed
→ Job Detail
→ Back
```

preserve:

- search query;
- active filters;
- sort;
- pagination/scroll position where technically feasible.

This prevents repetitive filtering.

## 25. Saved Search compatibility

Jobs filters should be serializable so the same state can later be saved.

A Saved Search should store canonical values, not UI labels.

Example:

```text
Toronto
Warehouse
Full-time
$20+/hour
Last 3 days
```

New matching Jobs can later trigger Telegram/email alerts according to Saved Search product rules.

## 26. Zero-results behavior

Do not only show:

```text
0 results
```

Recommended:

- show active filters;
- offer Reset;
- suggest removing the most restrictive filter;
- optionally provide nearby/less strict results only if clearly labeled.

Do not silently broaden filters.

## 27. Sorting

V1 sorting options can be minimal.

Recommended:

- Recommended / Relevance
- Newest

Potential later:

- Salary high to low
- Salary low to high

Salary sort should only compare compatible salary periods or use a documented normalization model.

## 28. Performance/index requirements

Fields used as frequent filters should be indexable/queryable.

Priority:

- category;
- status;
- supply source;
- country/province/city;
- job category;
- employment type;
- work arrangement;
- published_at;
- salary period;
- salary min/max where supported.

Avoid loading all Jobs client-side to filter.

## 29. Analytics

Track:

- filter opened;
- filter applied;
- filter cleared;
- reset all;
- result count after filter;
- Search + filter combination;
- zero-result query.

Do not log sensitive user-entered content unnecessarily.

## 30. Acceptance criteria

- [ ] Primary filters are defined and reusable in Mini App.
- [ ] Any/unset behavior is consistent.
- [ ] Cross-filter logic is AND.
- [ ] Multi-select logic is explicit.
- [ ] Remote location behavior is deterministic.
- [ ] Salary filters never compare incompatible periods silently.
- [ ] Negotiable/not-disclosed salary behavior is defined.
- [ ] Posted Within uses `published_at`.
- [ ] Verified Employer filter is hidden until true employer verification exists.
- [ ] Query state can be serialized for Saved Search.
- [ ] Back-navigation preserves filter state where supported.
- [ ] Zero-results state does not silently change user filters.
- [ ] Backend query/index strategy supports filter scale without client-side full-dataset filtering.
