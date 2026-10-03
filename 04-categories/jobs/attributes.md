# Jobs — Attributes

> Status: **Jobs V1 proposed schema**, except where marked source-defined/current.

## Design principles

- Filterable information should be structured.
- Missing information must remain null/omitted; never fabricate values.
- Free-text description remains separate from structured fields.
- Crawler/AI output must validate against the same canonical schema used by native Jobs listings.
- Country/province/city should reuse Advertio canonical location data.

## Core fields

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `job_title` | string | Yes | Search | Position title |
| `description` | text | Yes | Search | Full job description |
| `job_category` | enum | Yes | Yes | See job-taxonomy.md |
| `employment_type` | enum | Yes | Yes | Full-time, Part-time, Contract, Temporary, Internship, Casual |
| `work_arrangement` | enum | Yes | Yes | On-site, Remote, Hybrid |
| `company_name` | string | Yes | Search | Employer/company display name |
| `poster_type` | enum | Yes | Yes/soft | Company, Recruiter, Individual |
| `country` | canonical country | Yes | Yes | Reuse Advertio location catalog |
| `province` | canonical region | Yes* | Yes | Required where applicable |
| `city` | canonical city | Conditional | Yes | Required for On-site/Hybrid |
| `area` | string/canonical area | No | Soft | Neighborhood/area |
| `salary_type` | enum | Yes | Soft | Exact, Range, Negotiable, Not disclosed |
| `salary_min` | decimal | Conditional | Range | Required for Exact/Range as applicable |
| `salary_max` | decimal | Conditional | Range | Required for Range |
| `salary_currency` | ISO currency | Conditional | Yes | e.g. CAD |
| `salary_period` | enum | Conditional | Yes | Hour, Day, Week, Month, Year |
| `experience_level` | enum | No | Yes | Entry, Mid, Senior, Lead/Manager |
| `experience_years_min` | integer | No | Range | Minimum relevant years |
| `education_level` | enum | No | Soft | Optional |
| `language_requirements` | array | No | Soft | Canonical language values |
| `skills` | array | No | Search/soft | Structured tags |
| `shift` | array | No | Soft | Morning, Evening, Night, Weekend |
| `schedule` | enum | No | Soft | Fixed, Flexible |
| `start_date` | date | No | Soft | Planned start |
| `application_deadline` | date | No | Yes | If supplied |
| `vacancies` | integer | No | Soft | Number of openings |
| `benefits` | array | No | Soft | Structured benefits |
| `license_requirements` | array | No | Soft | Driver/trade/professional requirements |
| `work_authorization` | enum | No | Soft | Optional product decision |
| `application_method` | enum | Yes | No | Advertio contact, Telegram, external URL, email |
| `application_url` | URL | Conditional | No | Required for external URL method |
| `application_email` | email | Conditional | No | Required for email method |

## Source-defined field

The original Advertio listing-form source explicitly mentions **Job Type** as a Jobs category-specific field.

For development clarity, Jobs V1 maps that broad source concept into:

- `job_category` — what kind of work this is;
- `employment_type` — contract/work relationship;
- `work_arrangement` — where work happens.

This is an intentional schema refinement for implementation.

## Salary model

```text
salary_type:
- exact
- range
- negotiable
- not_disclosed

salary_period:
- hour
- day
- week
- month
- year
```

Examples:

```text
$22/hour
$20–$25/hour
$4,000–$5,000/month
Negotiable
Salary not disclosed
```

Do not show `$0` for missing salary.

## Location rules

For `on_site` or `hybrid`:

- country required;
- province required where the country uses it;
- city required.

For `remote`:

- country remains required because remote jobs may still have legal/tax/work-authorization boundaries;
- city may be omitted.

## Optional display rule

Missing optional data must be omitted.

Bad:

```text
Company: Unknown
Salary: $0
Experience: 0 years
```

Correct:

```text
Graphic Designer
XYZ Studio
Richmond Hill, Ontario
Part-time · Hybrid
```

## Validation rules

- `job_title`: 5–120 characters.
- `description`: must contain meaningful text; exact minimum can be configured.
- `salary_min <= salary_max`.
- Salary fields are required only when salary type requires them.
- `application_deadline >= today` when supplied.
- External application URLs must use HTTPS.
- On-site/Hybrid listings require city.
- Company name is required for employer/recruiter Jobs V1.
- Unknown structured values must be rejected/held rather than guessed.

## Acceptance criteria

- [ ] Native and crawled Jobs use the same canonical structured schema.
- [ ] Required fields are validated before submission.
- [ ] Missing optional fields render as omitted, not fake defaults.
- [ ] Salary Exact/Range/Negotiable/Not disclosed states are represented without ambiguity.
- [ ] On-site/Hybrid location validation differs correctly from Remote.
- [ ] Invalid enum values cannot be persisted through normal application flows.
