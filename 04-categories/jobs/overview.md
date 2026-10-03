# Jobs — Product & Development Overview

> Status: **Development specification**
>
> Evidence boundary as of **3 Oct 2026**
>
> **Current verified**
> - Jobs is visible in Telegram Bot category selection.
> - Jobs is still marked **Coming Soon** in the Mini App.
> - No dedicated live Jobs feed, Jobs filter UI, Jobs detail UI, or Jobs posting completion flow has been verified.
>
> **Source-defined**
> - Jobs is the second category priority after Housing.
> - The original product source emphasizes General Jobs / daily work.
> - The generic listing flow includes title, description, images, location and category-specific fields.
> - The source explicitly names **Job Type** as a Jobs-specific field.
>
> **Jobs V1 proposed**
> - The remainder of this document turns those source-level ideas into a concrete implementation contract.
> - Proposed behavior must not be described elsewhere as "currently implemented" until shipped and verified.

## 1. Product objective

Jobs V1 should solve one narrow marketplace problem well:

> An employer, recruiter or legitimate individual poster publishes a structured job opening; a job seeker can discover it quickly using location, job category, employment type, compensation and work arrangement; then the seeker uses an official Advertio Apply/Contact action.

The first version is a **job-listing marketplace**, not a recruiting suite.

## 2. Primary users

### 2.1 Job seeker

Needs to:

- find recent and relevant local jobs quickly;
- distinguish full-time, part-time, contract and other work types;
- understand salary when disclosed;
- know whether work is on-site, remote or hybrid;
- identify the employer/poster and available trust signals;
- avoid obvious scam posts;
- contact/apply through a clear, measurable action;
- save searches and receive new-job alerts later.

### 2.2 Employer / company poster

Needs to:

- create a structured job post quickly;
- provide enough information to attract relevant applicants;
- publish after moderation;
- receive measurable contact/application activity;
- deactivate a role when filled;
- later promote/extend the job where monetization is enabled.

### 2.3 Recruiter / staffing poster

Needs the same posting flow as an employer, but the product must keep:

```text
poster identity
≠
employer/company identity
```

A recruiter should not automatically appear as the employer.

### 2.4 Admin / moderator

Needs to:

- review the poster and job data;
- inspect crawler provenance;
- detect duplicate/spam/scam patterns;
- approve/reject/take down;
- view application/contact method;
- inspect suspicious external URLs or Telegram source links.

## 3. Jobs-to-be-done

### Job seeker JTBD

```text
"When I need work, show me relevant, recent and trustworthy openings
without making me search many Telegram groups or generic websites."
```

### Employer JTBD

```text
"When I need to hire, let me publish once and reach relevant local users
through Advertio and its distribution channels."
```

These align with Advertio's broader problem statement around fragmented community listings, low trust, poor searchability and delayed discovery.

## 4. Jobs V1 scope

Jobs V1 includes:

- employer/recruiter openings;
- Canada-first geography using Advertio canonical location data;
- General Jobs-oriented taxonomy;
- native posting;
- crawler-assisted cold-start supply;
- canonical Jobs attributes;
- admin moderation;
- Jobs feed;
- structured Jobs filters;
- Job detail;
- official Apply/Contact action;
- duplicate detection;
- Jobs-specific fraud signals;
- Active / Filled / Expired lifecycle;
- analytics;
- support for future Saved Search alerts.

## 5. Explicit V1 non-goals

Do **not** block V1 on:

- CV/resume builder;
- resume parsing;
- applicant tracking system;
- interview scheduling;
- employer inbox/CRM;
- AI candidate ranking;
- automated CV screening;
- skill assessment;
- employer subscription plans;
- company landing pages;
- LinkedIn import;
- visa eligibility engine;
- payroll;
- offer-letter workflows;
- public "job seeker looking for work" listings.

These can be separate later products.

## 6. Listing role decision

For Jobs V1:

```text
listing_role = job_opening
```

Only job openings are in scope.

A future "I am looking for work" marketplace should not reuse the same listing model without a separate product decision because:

- supply/demand direction is reversed;
- filters differ;
- privacy risk differs;
- moderation differs;
- contact behavior differs.

## 7. Core end-to-end flows

### 7.1 Native employer flow

```text
Post
→ Jobs
→ Enter structured job data
→ Preview
→ Submit
→ Pending
→ Admin review
→ Active
→ Search/Feed discovery
→ Detail
→ Apply/Contact
→ Filled / Deactivated / Expired
```

### 7.2 Job seeker flow

```text
Jobs
→ Browse or Search
→ Apply structured filters
→ Open Job
→ Review employer/job details
→ Apply/Contact
```

### 7.3 Crawled job flow

```text
Telegram source
→ Crawler
→ Preserve raw source/provenance
→ Classify as Jobs
→ Extract canonical attributes
→ Validate
→ Advertio ingest
→ PendingReview/Active according to source policy
→ Jobs discovery
→ Telegram/source contact
```

## 8. Supply model

Jobs must preserve two distinct supply cohorts:

```text
native
crawled
```

### Native

Created by an Advertio account.

Can support:

- native ownership;
- trust profile;
- moderation;
- future monetization;
- future reviews/business verification.

### Crawled

Imported from an external source.

Must preserve:

- sourceName;
- externalId;
- source URL;
- Telegram/contact provenance;
- crawler/native analytics distinction.

Crawled supply must not silently become native supply.

## 9. Cold-start strategy

The crawler can seed Jobs, but product health should move toward native employer supply.

Recommended launch sequence:

### Phase J0 — schema and moderation

Before public Jobs launch:

- canonical fields finalized;
- taxonomy finalized;
- moderation view ready;
- crawler mapping ready;
- analytics ready.

### Phase J1 — controlled supply

- crawl selected trusted sources;
- keep new crawler sources in review;
- manually recruit a small number of native employers;
- launch in one geographic market first.

### Phase J2 — discovery

- enable Jobs feed;
- enable category filters;
- enable Job detail;
- enable official contact/apply;
- measure Search → Detail → Contact/Apply.

### Phase J3 — retention

- Saved Search;
- new Jobs satisfying Saved Filters alerts;
- employer performance reporting.

### Phase J4 — monetization

Only after meaningful liquidity:

- Boost;
- Extend;
- Urgent;
- evaluate paid contact/Early Access only after the conflicting source model is resolved and willingness-to-pay is validated.

## 10. Geographic launch rule

Jobs liquidity is local.

Do not optimize for a large Canada-wide listing count if users cannot find enough relevant jobs in their city.

Recommended operational principle:

```text
dense city-level supply
>
thin country-wide supply
```

The first launch market should reuse the geography where Advertio already has strongest community/distribution access.

The documentation does not hard-code a city as a permanent product rule.

## 11. Discovery model

Jobs discovery should have two layers.

### 11.1 Quick/global Search

Free text can search:

- job title;
- company;
- job category;
- city;
- skills;
- description where supported.

### 11.2 Jobs structured filters

Precise constraints:

- Location;
- Job Category;
- Employment Type;
- Salary;
- Work Arrangement;
- More Filters.

See [filters.md](./filters.md).

## 12. Trust model

Jobs should reuse Advertio trust primitives.

Potential displayed trust information, only when actually available:

- Phone Verified;
- Identity Verified;
- Business Verified;
- Member since;
- Last active;
- Review/Rating;
- Response behavior.

Important:

```text
typed company name ≠ verified company
```

Business Verification remains separate from basic company-name display.

## 13. Safety model

Jobs requires category-specific safety controls because employment scams may involve:

- upfront fees;
- fake employers;
- financial-transfer requests;
- suspicious external URLs;
- identity-document harvesting;
- pyramid/MLM patterns;
- unrealistic compensation;
- duplicate/spam campaigns.

See [moderation-safety.md](./moderation-safety.md).

## 14. Lifecycle model

Jobs should support:

- Draft
- Pending
- Active
- Filled
- Deactivated
- Expired
- Rejected
- TakenDown

`Filled` is Jobs-specific and should remove the opening from active discovery while preserving history.

See [lifecycle.md](./lifecycle.md).

## 15. Important platform-rule conflict

The existing generic Advertio rule says:

```text
one Active Listing per User per Category
```

That is unsuitable for normal employers who may hire for multiple jobs simultaneously.

### Jobs V1 decision required

Recommended rule:

- employer/recruiter can have multiple active Jobs;
- rate limits, trust thresholds or plan limits can constrain abuse;
- do not apply Housing-style one-active-listing semantics to Jobs.

This is a **blocking product decision before production launch**.

## 16. Monetization state

Source-defined Jobs monetization includes:

- Early Access/contact monetization;
- Boost;
- Extend;
- Urgent.

But the source contains opposite Early Access timing models.

Therefore:

- no canonical paid-contact behavior should be implemented only from old documentation;
- crawler Jobs remain non-monetized;
- Jobs V1 can validate liquidity with free contact/apply first;
- paid contact should be a later explicit experiment.

See [monetization.md](./monetization.md).

## 17. Success model

Jobs success is not just MAU.

### Supply health

- Active Jobs
- Native Active Jobs
- Crawled Active Jobs
- Native Jobs %
- Jobs approved per week
- Jobs expired/stale per week

### Demand health

- Unique Jobs viewers
- Search → Detail CTR
- Detail → Apply/Contact rate
- Jobs receiving ≥1 apply/contact
- Median time to first contact/apply

### Quality and trust

- Jobs with salary %
- Jobs with company name %
- complete-location %
- moderation rejection rate
- scam/takedown rate
- duplicate rate

### Marketplace balance

- Native vs Crawled view share
- Native vs Crawled contact/apply share
- Native supply growth

### North-star candidate

```text
Successful Job Connections per Week
```

A future `Confirmed Hires per Week` metric should only be used after Advertio actually captures reliable hire confirmation.

## 18. Launch gates

Do not mark Jobs generally available until:

- schema is implemented;
- moderation is implemented;
- at least one useful geographic market has sufficient supply;
- filter/search returns meaningful results;
- Apply/Contact is measurable;
- stale/filled jobs leave active discovery;
- crawler/native cohorts are distinguishable;
- fraud/duplicate review exists;
- analytics funnel is live.

## 19. Documentation map

- [attributes.md](./attributes.md) — data contract
- [filters.md](./filters.md) — filter/query contract
- [general-jobs.md](./general-jobs.md) — initial market/scope strategy
- [job-taxonomy.md](./job-taxonomy.md) — canonical category taxonomy
- [posting-flow.md](./posting-flow.md) — posting experience
- [listing-card.md](./listing-card.md) — feed card
- [listing-detail.md](./listing-detail.md) — detail UI
- [employer-model.md](./employer-model.md) — employer/poster identity
- [application-contact.md](./application-contact.md) — Apply/Contact behavior
- [moderation-safety.md](./moderation-safety.md) — trust/safety
- [crawler-mapping.md](./crawler-mapping.md) — crawler mapping
- [lifecycle.md](./lifecycle.md) — lifecycle
- [analytics.md](./analytics.md) — events/KPIs
- [monetization.md](./monetization.md) — monetization
- [rules.md](./rules.md) — invariants

## 20. Acceptance criteria

- [ ] Current verified behavior is clearly separated from proposed Jobs V1 behavior.
- [ ] Jobs V1 has one clear listing role: job opening.
- [ ] Native and crawled supply are distinct.
- [ ] End-to-end poster and seeker flows are defined.
- [ ] Launch gates exist.
- [ ] Jobs-specific multi-listing conflict is explicitly resolved before production.
- [ ] Jobs can measure its supply/demand/contact funnel.
- [ ] No ATS/resume scope is required for initial launch.
