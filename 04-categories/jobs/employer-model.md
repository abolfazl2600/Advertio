# Jobs — Employer / Poster Model

> Status: **Jobs V1 proposed identity model**.

## Poster Type

Canonical V1:

```text
poster_type:
- company
- recruiter
- individual
```

## Required identity

At minimum for native Jobs V1:

- Advertio user/account owner
- Company Name
- Poster Type
- verified phone/account state according to platform requirements

Optional later:

- Company Website
- Company Email
- Company Phone
- Business Registration
- Business Verification

## Trust layers

Potential Jobs trust presentation should reuse Advertio's platform trust model rather than invent an unrelated Jobs trust score.

Examples when available:

- Phone Verified
- Identity Verified
- Business Verified
- Member since
- Last active
- Reviews / Rating
- Deal/history metrics
- Quick responder

Business Verification is roadmap/future unless separately implemented.

## Company identity vs user identity

A company display name is not proof of business ownership.

Do not mark a company as verified merely because a poster typed the company name.

## Recruiters

Recruiter postings should identify the recruiter/poster relationship without pretending the recruiter is the employer where that is not known.

## Crawled poster identity

Crawler records may include:

- Telegram user ID;
- Telegram username;
- source URL;
- source channel/group;
- message ID.

These are provenance/contact signals, not native Advertio employer verification.

## Future claim flow

If a crawled employer later joins Advertio, any claim/migration should rely on verified identity signals rather than username text alone.

See crawler user-claiming documentation.

## Acceptance criteria

- [ ] Native Jobs has an owning Advertio user.
- [ ] Poster Type and Company Name are stored separately.
- [ ] Typed company name never implies verified business status.
- [ ] Verification badges map to actual platform verification states.
- [ ] Crawled provenance is not presented as native employer verification.
