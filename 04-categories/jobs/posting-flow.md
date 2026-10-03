# Jobs — Posting Flow

> Status: **Jobs V1 proposed flow**, built on Advertio's source-defined generic listing workflow.

## Entry

```text
Post
→ Jobs
```

Jobs is already present in Telegram Bot category selection, but a complete Jobs-specific posting experience is not yet verified.

## V1 step flow

Recommended form:

1. Job Title
2. Job Category
3. Employment Type
4. Work Arrangement
5. Company / Poster
6. Location
7. Salary
8. Description
9. Experience / Skills
10. Language Requirements
11. Shift / Schedule
12. Start Date / Application Deadline
13. Application / Contact Method
14. Preview
15. Submit

## MVP required fields

Required:

- Job Title
- Job Category
- Employment Type
- Work Arrangement
- Company Name
- Poster Type
- Country
- Province where applicable
- City for On-site/Hybrid
- Salary Type
- Description
- Application Method

Optional:

- Salary amount/range when Salary Type is Negotiable/Not disclosed
- Skills
- Experience
- Education
- Language requirements
- Shift
- Schedule
- Start date
- Deadline
- Benefits
- Licenses
- Images/company logo

## Preview

Preview must show exactly what will be published.

At minimum:

- title;
- company;
- category;
- employment type;
- arrangement;
- location;
- salary state;
- description;
- contact/apply method.

No hidden default values should be silently added during confirmation.

## Submission

Shared Advertio lifecycle:

```text
Submit
→ Pending
→ Admin moderation
→ Approved / Rejected
```

Approved Jobs can then become Active according to publication rules.

## Duplicate pre-check

Before final publication, the system may flag a likely duplicate based on:

- normalized title;
- company;
- city;
- employment type;
- content similarity;
- source provenance where available.

A fuzzy duplicate match should create a review signal, not automatically delete legitimate openings.

## Error handling

Validation errors should identify the specific field.

Examples:

- salary min greater than max;
- City required for On-site;
- invalid external URL;
- application deadline in the past.

## Acceptance criteria

- [ ] Jobs can be selected from the Post flow when the category is enabled.
- [ ] Required fields cannot be skipped.
- [ ] Conditional fields validate correctly.
- [ ] Preview reflects persisted values.
- [ ] Submission enters Pending rather than publishing directly.
- [ ] Admin approval is required under the current platform moderation rule.
- [ ] Duplicate detection can flag without silently destroying a listing.
- [ ] Validation errors are field-specific and recoverable.
