# Jobs — General Jobs Launch Scope

> Status: **Product strategy + Jobs V1 scope**
>
> Source-derived:
> - Advertio identifies Jobs as the second category priority after Housing.
> - The original product source specifically references **General Jobs / daily work**.
> - The source includes an older internal Canada sizing exercise and explicitly warns that native supply should quickly become more important than crawler supply.
>
> Proposed:
> - The rest of this document converts that direction into a launchable General Jobs scope.

## 1. What "General Jobs" means in Advertio

General Jobs should mean:

> Common, high-frequency job openings that can be represented by one shared Jobs schema and discovered primarily by location, role category, employment type, pay and work arrangement.

It should **not** mean "anything employment-related."

## 2. Why this is the initial Jobs segment

General Jobs fits Advertio's current strengths:

- local/community distribution;
- Telegram supply discovery;
- newcomer/community user base;
- frequent job-post turnover;
- location-sensitive matching;
- relatively simple contact/application flows;
- lower need for complex professional-profile features;
- suitable for structured filters and Saved Search alerts.

## 3. Initial V1 category set

Recommended initial canonical categories:

### Core launch group

- General Labour
- Warehouse
- Delivery & Driver
- Restaurant & Food
- Retail
- Cleaning
- Construction
- Office & Administration
- Customer Service
- Sales
- Skilled Trades
- Other

### Supported taxonomy but not a special launch focus

- Healthcare Support
- Beauty & Personal Care
- Childcare
- IT & Tech
- Design & Creative
- Education

These can use the common Jobs schema without custom flows.

## 4. What is out of General Jobs V1

Do not build special workflows yet for:

- executive recruiting;
- regulated professional credential verification;
- medical licensing workflows;
- government hiring;
- union dispatch;
- freelance project marketplace;
- gig-task bidding;
- commission-only marketplace;
- job-seeker resumes/profiles;
- immigration sponsorship matching.

Listings from some of these categories can potentially exist later, but V1 should not promise specialized product support.

## 5. General Jobs user personas

### 5.1 Local job seeker

Typical needs:

- work near current city;
- quick start;
- clear pay;
- full-time/part-time;
- shift availability;
- simple Apply/Contact.

### 5.2 Newcomer / community job seeker

Typical needs:

- local trusted discovery;
- language-aware listings;
- clear work location;
- reduced scam risk;
- fast notifications.

Advertio should not infer immigration status or expose sensitive identity data.

### 5.3 Small local employer

Typical needs:

- simple post;
- quick local applicants;
- no ATS complexity;
- ability to mark Filled.

### 5.4 Staffing/recruiting poster

Needs:

- multiple simultaneous job posts;
- recruiter identity distinct from employer identity;
- measurable responses.

## 6. Critical Jobs-specific rule: multiple active listings

General Jobs exposes why the generic one-active-listing-per-category rule cannot remain unchanged.

A legitimate employer may have:

```text
Warehouse Associate
Forklift Operator
Delivery Driver
```

active simultaneously.

Recommended Jobs rule:

- allow multiple active Jobs per trusted employer/recruiter;
- apply rate limits/anti-spam rules;
- optionally limit low-trust/new accounts;
- use moderation and duplicate detection.

This is a launch-blocking decision.

## 7. Minimum information quality

A General Job should not become Active if it lacks the information required to understand the opportunity.

Recommended native minimum:

- Job Title
- Company Name
- Job Category
- Employment Type
- Work Arrangement
- Country
- Province where applicable
- City for On-site/Hybrid
- Salary Type
- Description
- Application Method

Salary amount may be optional if Salary Type is `not_disclosed` or `negotiable`.

## 8. Recommended quality score inputs

A future internal quality score can consider:

- salary disclosed;
- complete location;
- meaningful description;
- company identity present;
- employment type present;
- work arrangement present;
- no suspicious URL;
- no duplicate signals;
- media/logo present;
- verified poster.

Do not expose a fake "quality score" to users before it has a clear meaning.

## 9. Cold-start supply strategy

### 9.1 Crawler

Use crawler to seed relevant community Jobs.

Rules:

- selected sources;
- stable provenance;
- new sources default to review;
- structured extraction;
- no guessed fields;
- stale-source deletion;
- crawler/native analytics split.

### 9.2 Native employer acquisition

Crawler alone is not a marketplace.

Parallel native-supply effort should recruit:

- small local businesses;
- restaurants;
- warehouses/logistics;
- cleaning companies;
- construction/trades;
- retail;
- staffing agencies.

## 10. Native Listing Ratio

Track a category-specific ratio:

```text
Native Active Jobs
÷
All Active Jobs
```

The original source direction is clear: crawler should solve cold start, not remain the long-term product.

Do not use a hard percentage target in this file unless leadership adopts one.

## 11. Geographic rollout

General Jobs should launch city-by-city/region-by-region.

A launch market should have enough supply that filters do not collapse the feed to near-zero.

Operational decision framework:

- existing Advertio user/community presence;
- crawler source availability;
- native employer access;
- city-level job volume;
- moderation capacity;
- contact/apply activity.

Avoid a superficial Canada-wide launch with low local density.

## 12. Minimum launch liquidity

Do not use listing count alone.

Before calling a market healthy, inspect:

- active relevant Jobs;
- % with recent publish date;
- % receiving at least one detail view;
- % receiving at least one Apply/Contact;
- median time to first response/action;
- zero-result rate on common filters;
- native vs crawler demand share.

## 13. Feed freshness

Jobs decays quickly.

Freshness controls should include:

- `published_at`;
- `application_deadline`;
- expiry;
- Filled;
- source-post deletion for crawler records.

A job should not remain discoverable just because the record still exists.

## 14. Application model for General Jobs

General Jobs benefits from simple application paths.

Preferred V1 methods:

- Advertio contact;
- Telegram;
- external company application URL;
- email.

Avoid building ATS/application forms in V1.

## 15. Trust and scam prevention

General Jobs is particularly exposed to:

- fake local employers;
- upfront-fee scams;
- cheque/money-transfer scams;
- identity-document harvesting;
- Telegram impersonation;
- suspicious "easy income" claims.

Moderation must treat these as category-specific risk signals.

## 16. Crawler content quality

A raw Telegram post may be incomplete.

Examples:

```text
Need worker ASAP DM me
```

should not automatically become a high-quality structured Job if:

- employer unknown;
- job unclear;
- location absent;
- job type ambiguous.

Unknown values stay unknown or record stays in review.

## 17. Search behavior

General Jobs free-text Search should work well for:

- title: `driver`
- role: `warehouse`
- company name
- skills: `forklift`
- city: `Toronto`

Structured filters then narrow exact constraints.

## 18. Saved Search examples

High-value future saved searches:

```text
Toronto + Warehouse + Full-time + $20+/hour
Richmond Hill + Restaurant + Part-time
Vancouver + Cleaning + Morning shift
Canada + Remote + Customer Service
```

Jobs is a strong fit for new-listing alerts because freshness matters.

## 19. Monetization rollout

Recommended sequencing:

### Stage 1

- free native posting;
- free Apply/Contact;
- free crawler contact.

Goal:

- validate liquidity and contact behavior.

### Stage 2

- Boost;
- Extend;
- optional Urgent.

### Stage 3

- paid contact/Early Access only after:
  - canonical timing model is decided;
  - user willingness-to-pay is tested;
  - free liquidity is strong enough not to damage adoption.

This sequencing is proposed; old source monetization rules remain documented separately.

## 20. Historical internal market assumptions

The original project source contains a General Jobs Canada planning exercise using figures attributed there to Job Bank and Kijiji.

It records:

- General Jobs share estimates around 16.6–19.9%;
- an internal average around 18%;
- Telegram/job-seeker assumptions;
- an internal potential-user calculation around 19,400 General Jobs users.

These are **historical internal assumptions**.

They have not been revalidated in this documentation and must not be presented as current market facts.

## 21. Marketplace-health KPIs

### Supply

- Active Jobs
- Native Active Jobs
- Crawled Active Jobs
- Native Jobs %
- New Native Jobs/week

### Freshness

- median active-job age
- % published in last 7 days
- stale Jobs count
- Filled/Expired cleanup rate

### Demand

- unique Jobs viewers
- Search → Detail CTR
- Detail → Apply/Contact
- Jobs with ≥1 Apply/Contact
- median time to first Apply/Contact

### Quality

- salary disclosure %
- complete location %
- complete company identity %
- rejection %
- takedown/scam %
- duplicate %

### Crawler dependence

- crawler share of active supply
- crawler share of views
- crawler share of contacts
- native share of contacts

## 22. Expansion criteria

Add profession-specific workflows only when:

- meaningful volume exists;
- current shared schema is insufficient;
- users repeatedly need profession-specific filters;
- a new field materially improves matching/conversion.

Example:

A Driver sub-flow might eventually need:

- license class;
- vehicle requirement;
- route type.

Do not add those fields globally before evidence exists.

## 23. Product risks

### Risk: crawler becomes the product

Mitigation:

- native supply KPI;
- native employer acquisition;
- separate crawler cohort.

### Risk: too many categories too early

Mitigation:

- start with General Jobs;
- shared schema;
- avoid profession-specific forms.

### Risk: spam/scams

Mitigation:

- moderation;
- trust;
- URL/contact checks;
- duplicate detection;
- takedown.

### Risk: stale jobs

Mitigation:

- expiry;
- Filled;
- deadline;
- source deletion sync.

### Risk: empty filtered feeds

Mitigation:

- geographic density;
- sensible primary filters;
- zero-result UX;
- staged launch.

## 24. Acceptance criteria

- [ ] General Jobs has a precise V1 scope.
- [ ] Core and non-core categories are distinguished.
- [ ] Multi-active-job employer behavior is explicitly resolved before launch.
- [ ] Minimum content-quality requirements are defined.
- [ ] Crawler and native supply strategies run in parallel.
- [ ] City-level liquidity is measured.
- [ ] Stale Jobs have multiple cleanup signals.
- [ ] Jobs can launch without ATS/resume complexity.
- [ ] Historic market-sizing figures are clearly labeled as unverified planning assumptions.
