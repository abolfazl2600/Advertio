# Jobs — Crawler Mapping

> Status: **Jobs V1 proposed mapping**, using the existing Advertio/Telclaw crawler principles documented under 09-crawler.

## Goal

Crawler Jobs should seed supply while preserving source provenance and never pretending to be native employer postings.

## Source identity

Use the crawler identity contract:

```text
(sourceName, externalId)
```

For Telegram:

```text
externalId = stable Telegram message ID
```

Do not use content hash as Advertio lead identity.

## Recommended extracted Jobs payload

```json
{
  "job_title": null,
  "job_category": null,
  "employment_type": null,
  "work_arrangement": null,
  "company_name": null,
  "poster_type": null,
  "country": null,
  "province": null,
  "city": null,
  "area": null,
  "salary_type": null,
  "salary_min": null,
  "salary_max": null,
  "salary_currency": null,
  "salary_period": null,
  "experience_level": null,
  "skills": [],
  "language_requirements": [],
  "shift": [],
  "schedule": null,
  "start_date": null,
  "application_deadline": null,
  "application_method": "telegram",
  "description": null
}
```

## Unknown values

Core rule:

```text
unknown ≠ guessed
```

If salary is absent:

```text
salary_type = not_disclosed
salary_min = null
salary_max = null
```

Do not infer salary from profession averages.

If company is not reliably present, do not invent one.

## Validation

Before Advertio ingest:

- category = Jobs;
- taxonomy value must be canonical;
- location values must be canonical when present/required;
- structured enums must be valid;
- source URL/contact handle must satisfy crawler contract;
- required values must meet the approved Jobs crawler policy.

## Moderation default

For unproven/new crawler sources:

```text
autoPublish = false
```

so Jobs enters review before becoming active.

## Duplicate protections

### Crawler deterministic duplicate

Use existing Telclaw collection duplicate rules.

### Ingest idempotency

Use:

```text
(sourceName, externalId)
```

### Marketplace fuzzy duplicate

Possible candidate features:

- normalized title;
- company;
- city;
- employment type;
- content similarity.

Do not collapse fuzzy candidates automatically.

## Contact

Crawler Jobs should use source contact:

- Telegram handle where available;
- otherwise source URL according to crawler contract.

No native paid contact monetization.

## Stale posts

If the original source post is deleted/withdrawn, crawler lifecycle should deactivate the corresponding Advertio record according to the existing crawler deletion contract.

## Acceptance criteria

- [ ] Stable Telegram message ID is used as external ID.
- [ ] AI extraction cannot create arbitrary enum values.
- [ ] Unknown values remain null/not disclosed.
- [ ] Crawled Jobs remain a separate supply cohort.
- [ ] Crawled Jobs do not receive native paid-contact monetization.
- [ ] New/untrusted sources default to review.
- [ ] Deleted source posts can deactivate stale Jobs.
