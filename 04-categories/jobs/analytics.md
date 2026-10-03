# Jobs — Analytics

> Status: **Jobs V1 analytics specification**.

## Core events

Recommended event names:

- `jobs_feed_viewed`
- `job_search_executed`
- `job_filter_applied`
- `job_listing_viewed`
- `job_listing_saved`
- `job_contact_clicked`
- `job_apply_clicked`
- `job_listing_created`
- `job_listing_submitted`
- `job_listing_approved`
- `job_listing_rejected`
- `job_listing_activated`
- `job_listing_filled`
- `job_listing_deactivated`
- `job_listing_expired`
- `job_listing_extended`
- `job_listing_boosted`

## Common event properties

Where applicable:

- listing_id
- user_id
- poster_user_id
- supply_source (native/crawled)
- job_category
- city
- employment_type
- work_arrangement
- salary_disclosed
- application_method
- timestamp

Do not duplicate sensitive content in analytics payloads unnecessarily.

## Marketplace KPIs

### Supply

- Active Jobs
- Native Active Jobs
- Crawled Active Jobs
- Native Jobs %
- Jobs created per week
- Jobs approved per week

### Quality

- Jobs with salary %
- Jobs with company name %
- Jobs with complete location %
- Rejection rate
- Fraud/takedown rate
- Possible duplicate rate

### Demand

- Jobs feed users
- Search → Detail CTR
- Detail → Contact rate
- Detail → Apply rate
- Unique job viewers
- Saved Jobs
- Saved Search adoption when implemented

### Employer value

- Jobs receiving ≥1 contact/apply
- Median time to first contact/apply
- Contacts/applications per active Job
- Filled rate when employers use Filled state

### Crawler health

- Crawled vs Native view share
- Crawled vs Native contact/apply share
- Native supply growth
- Stale crawler listing rate

## North-star candidate

A useful Jobs marketplace outcome metric:

```text
Successful Job Connections per Week
```

If/when a reliable hiring/deal confirmation exists, a later metric can be:

```text
Confirmed Hires per Week
```

Do not claim confirmed hires before the product actually captures them.

## Acceptance criteria

- [ ] Feed/detail/contact/apply funnel is measurable.
- [ ] Native and crawled cohorts can be compared.
- [ ] Employer-side value can be measured.
- [ ] Listing quality/rejection/fraud metrics exist.
- [ ] Analytics does not rely solely on MAU.
- [ ] Event payloads avoid unnecessary sensitive data.
