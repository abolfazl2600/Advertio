# Jobs — Category Rules

> Status: **Development rules** combining current platform invariants, source-defined behavior and Jobs V1 decisions.

## Availability

- Telegram Bot: Jobs category button is verified.
- Mini App: Jobs is currently Coming Soon.
- Dedicated Jobs feed/filter/detail is a development target.

## V1 listing role

Jobs V1 should focus on employer/recruiter openings.

Public Job Seeker / "I am looking for work" listings are out of scope for the initial category unless separately designed.

## Ownership

Every native Job has an owning Advertio user.

Crawled Jobs retain crawler provenance and are not silently reassigned as native ownership.

## Moderation

Native Jobs follow mandatory Admin approval before publication under current platform rules.

## One-active-listing rule

The current broad product source says one Active Listing per User per Category.

This base rule conflicts with realistic employers needing multiple simultaneous Jobs.

Therefore Jobs implementation **must explicitly resolve this platform rule before launch**.

Recommended Jobs rule:

- employer/recruiter accounts may have multiple active Jobs;
- limits/rate controls can be introduced separately;
- do not apply Housing-style one-active-listing semantics blindly to Jobs.

This is an important Jobs-specific product decision.

## Structured data

Filterable Jobs attributes must be structured.

Do not store Salary, Employment Type or Work Arrangement only in description text if canonical fields exist.

## Missing data

Optional data:

- null/omit;
- never fabricate.

## Contact

Every Active Job must have a valid primary application/contact method.

Crawled Jobs use external/source contact and remain non-monetized.

## Expiry / Filled

Jobs supports a Jobs-specific `Filled` inactive state.

Expired/Filled/TakenDown jobs cannot expose an active Apply CTA.

## Duplicate handling

Use:

- deterministic crawler duplicate protection;
- ingest idempotency;
- marketplace fuzzy duplicate review.

Do not auto-delete legitimate similar openings solely because titles are similar.

## Fraud/safety

Jobs moderation should specifically detect suspicious payment requests, company impersonation, financial credential requests, suspicious links and other employment-scam patterns.

## Ranking

Shared source model includes:

1. Boosted
2. Newest
3. Verified users
4. Other

Jobs runtime ranking should eventually combine relevance/freshness/trust, but no unverified algorithm should be documented as current.

## Acceptance criteria

- [ ] Native Jobs always have an owner.
- [ ] Crawled Jobs preserve source identity.
- [ ] Jobs-specific multi-listing rule is resolved before production launch.
- [ ] Active Jobs always have a valid application method.
- [ ] Inactive Jobs cannot be applied to.
- [ ] Missing optional fields are never fabricated.
- [ ] Fraud and duplicate review rules exist before Jobs is enabled publicly.
