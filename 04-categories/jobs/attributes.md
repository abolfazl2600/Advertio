# Jobs — Attributes

> This file records only Jobs attributes directly supported by the current project source or verified platform behavior. It intentionally does not invent a complete employment schema.

## Platform-level listing fields

The generic Advertio listing form defines:

- Title
- Description
- Images
- Location
- Category-specific optional fields

The shared location step includes:

- Country
- Province / State
- City
- Area / neighborhood when applicable
- Telegram location sharing is mentioned in the source flow

## Jobs-specific field explicitly defined by the source

The original listing-form documentation explicitly gives:

```text
نوع کار (jobs)
```

or **Job Type** as an example of a category-specific Jobs field.

This is currently the only Jobs-specific structured attribute explicitly defined in the source material reviewed for this folder.

## Current supported attribute documentation

| Attribute | Status | Notes |
| --- | --- | --- |
| Title | Source-defined | Generic listing field |
| Description | Source-defined | Generic listing field |
| Images | Source-defined | Generic listing field |
| Country | Source-defined | Generic location field |
| Province / State | Source-defined | Generic location field |
| City | Source-defined | Generic location field |
| Area / neighborhood | Source-defined | Optional generic location field |
| Job Type | Source-defined | Explicitly named Jobs-specific field |

## Attributes not defined canonically yet

The reviewed project source does **not** define a canonical Jobs schema for fields such as:

- employer/company;
- salary/pay range;
- pay frequency;
- employment type enum;
- full-time / part-time;
- contract / temporary;
- shift;
- remote / hybrid / onsite;
- required experience;
- education;
- language requirements;
- benefits;
- visa/work-permit requirements;
- application deadline;
- job category/profession taxonomy.

These may be useful product fields, but they should not be documented as current or source-defined until a Jobs schema decision is made and implemented.

## Data-quality rule

Do not encode a field as canonical Jobs metadata merely because it appears in free-text description.

When a future Jobs schema is introduced:

- use canonical attribute keys;
- use controlled values where appropriate;
- keep filtering attributes structured;
- avoid guessing unavailable values;
- preserve raw description separately.

## Crawler/import rule

Crawler-generated Jobs records should only populate structured attributes that can be reliably extracted and validated against the canonical Advertio category schema.

Unknown required values should be held/rejected rather than fabricated.

## Related

- [Jobs filters](./filters.md)
- [Jobs rules](./rules.md)
- [Crawler normalization](../../09-crawler/data-normalization.md)
