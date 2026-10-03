# Jobs — Moderation and Safety

> Status: **Jobs V1 proposed category-specific safety rules**, layered on top of Advertio's mandatory listing moderation.

## Why Jobs needs extra safety

Employment scams can ask users for money, banking access, identity documents or unrealistic financial arrangements.

Jobs moderation should therefore include category-specific risk checks in addition to general content moderation.

## High-risk / review signals

Flag for review when detected:

- upfront payment required to get the job;
- deposit/security payment before hiring;
- crypto-only compensation/payment request;
- request to transfer/receive money on behalf of employer;
- bank-account credentials/access request;
- identity-document collection in an unusual/untrusted flow;
- suspiciously high compensation with vague duties;
- MLM/pyramid/recruitment-chain language;
- repeated duplicate Jobs;
- impersonation of a known company;
- suspicious external URL/domain;
- illegal work;
- clearly misleading title/company/location.

A flag is a moderation signal, not automatic proof of fraud unless platform policy says otherwise.

## Admin review

Recommended Jobs review drawer:

- Job Title
- Company Name
- Poster
- Poster verification
- Poster Type
- Job Category
- Employment Type
- Work Arrangement
- Location
- Salary
- Description
- Skills/requirements
- Application method
- External domain/email/Telegram contact
- Source / crawler provenance
- Duplicate indicators
- Fraud/risk flags

Actions:

- Approve
- Reject
- Take Down
- Mark/resolve duplicate
- Open poster/user
- Open source/provenance

## Company impersonation

Do not treat typed company name as verified ownership.

Future Business Verification can reduce impersonation risk but is not assumed as a current feature.

## External link safety

For external application URLs:

- require HTTPS;
- store normalized host;
- reject malformed URLs;
- expose suspicious-domain signals to moderation where tooling supports it.

## Sensitive information

Job descriptions should not encourage users to publish:

- bank credentials;
- passwords;
- government ID numbers;
- other unnecessary sensitive personal data.

## Acceptance criteria

- [ ] Jobs moderation exposes category-specific fraud signals.
- [ ] Typed company name is not equivalent to verification.
- [ ] Suspicious external URLs can be reviewed/rejected.
- [ ] Duplicate Jobs can be reviewed without automatic destructive merging.
- [ ] Take Down removes unsafe active Jobs from normal discovery.
- [ ] Rejected/TakenDown listings cannot keep active application CTAs.
