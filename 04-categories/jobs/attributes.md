# Jobs — Attributes & Data Contract

> Status: **Jobs V1 proposed schema**
>
> Source boundary:
> - The existing Advertio source explicitly defines generic Listing fields and mentions **Job Type** as a Jobs-specific field.
> - The complete Jobs schema below is a proposed canonical implementation contract.
> - It must not be described as existing runtime data until implemented.

## 1. Design principles

1. **Structured first for filterable facts.**
2. **Raw description remains separate.**
3. **Unknown is not guessed.**
4. **Native and crawled Jobs use the same public canonical schema.**
5. **Crawler-only provenance is stored separately from public Jobs attributes.**
6. **Canonical keys are language-independent.**
7. **UI localization changes labels, not stored enum values.**
8. **Derived/system fields cannot be user-authored.**
9. **Sensitive/private data should not be placed into public structured fields.**

## 2. Field classification

Jobs data is divided into:

- Core content
- Job classification
- Employer/poster
- Location
- Compensation
- Requirements
- Schedule/timing
- Application/contact
- Media
- System/lifecycle
- Crawler provenance
- Derived/search fields

## 3. Core content

| Field | Type | Required | Searchable | User editable | Notes |
| --- | --- | ---: | ---: | ---: | --- |
| `job_title` | string | Yes | Yes | Yes | Position title |
| `description` | text | Yes | Yes | Yes | Main job description |
| `job_category` | enum | Yes | Yes | Yes | Canonical taxonomy |
| `employment_type` | enum | Yes | Yes | Yes | Contract/work relationship |
| `work_arrangement` | enum | Yes | Yes | Yes | On-site/Remote/Hybrid |

### 3.1 Job title validation

Recommended:

- min 5 chars;
- max 120 chars;
- trim surrounding whitespace;
- collapse obvious repeated whitespace;
- no phone/email stuffing in title;
- no salary-only title;
- no all-caps enforcement unless moderation policy requires it.

Examples:

Good:

```text
Warehouse Associate
Graphic Designer
Restaurant Line Cook
```

Poor:

```text
CALL NOW 416-...
$5000 WEEKLY!!!
JOB JOB JOB
```

### 3.2 Description

Should contain the substantive job details.

Recommended minimum product requirement:

- meaningful text;
- not just a phone number/link;
- no credentials/passwords/banking data;
- external application instructions may exist, but the official Advertio CTA should still be structured separately.

## 4. Job classification

### 4.1 Job Category

See [job-taxonomy.md](./job-taxonomy.md).

Persist keys such as:

```text
warehouse
restaurant_food
cleaning
office_admin
```

not localized labels.

### 4.2 Employment Type

Canonical V1:

```text
full_time
part_time
contract
temporary
internship
casual
```

### 4.3 Work Arrangement

Canonical V1:

```text
on_site
remote
hybrid
```

### 4.4 Why these are separate

Example:

```text
Job Category: Design & Creative
Employment Type: Part-time
Work Arrangement: Hybrid
```

Combining these into one `job_type` field would make search/filtering ambiguous.

## 5. Employer/poster fields

| Field | Type | Required | Public | Notes |
| --- | --- | ---: | ---: | --- |
| `company_name` | string | Yes | Yes | Display employer/company |
| `poster_type` | enum | Yes | Yes | company / recruiter / individual |
| `owner_user_id` | internal ID | Native only | No/raw | Advertio owner |
| `company_verified` | system boolean/state | No | Yes | Derived from verification, never user-authored |

### 5.1 Poster Type

```text
company
recruiter
individual
```

### 5.2 Company-name rule

```text
company_name
≠
business verification
```

Typing "Amazon" must never create a verified-company state.

## 6. Location fields

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `country` | canonical country | Yes | Yes | Country scope |
| `province` | canonical region | Conditional | Yes | Required where applicable |
| `city` | canonical city | Conditional | Yes | Required for on-site/hybrid |
| `area` | canonical/string area | No | Soft | Neighborhood/local area |
| `geo_location` | lat/lng | No | Future | Map/radius use |

### 6.1 Requiredness matrix

| Work Arrangement | Country | Province | City |
| --- | ---: | ---: | ---: |
| On-site | Required | Required where applicable | Required |
| Hybrid | Required | Required where applicable | Required |
| Remote | Required | Optional/Scope dependent | Optional |

Remote should normally show geographic scope such as:

```text
Remote — Canada
```

not only `Remote`.

## 7. Compensation model

### 7.1 Fields

| Field | Type | Required | Notes |
| --- | --- | ---: | --- |
| `salary_type` | enum | Yes | exact / range / negotiable / not_disclosed |
| `salary_min` | decimal | Conditional | Exact or range |
| `salary_max` | decimal | Conditional | Range |
| `salary_currency` | ISO currency | Conditional | CAD for Canadian paid Jobs in most cases |
| `salary_period` | enum | Conditional | hour/day/week/month/year |

### 7.2 Salary Type

```text
exact
range
negotiable
not_disclosed
```

### 7.3 Salary Period

```text
hour
day
week
month
year
```

### 7.4 Requiredness

#### exact

```text
salary_min = required
salary_max = null
currency = required
period = required
```

#### range

```text
salary_min = required
salary_max = required
currency = required
period = required
salary_min <= salary_max
```

#### negotiable

Amounts may be null.

#### not_disclosed

Amounts/currency/period should be null unless product explicitly supports storing hidden salary.

### 7.5 Display examples

```text
$22/hour
$20–$25/hour
$4,000–$5,000/month
Negotiable
Salary not disclosed
```

Never display:

```text
$0
$null
Unknown salary
```

as if it were real compensation.

### 7.6 Salary normalization

V1 should **not** silently convert hourly/monthly/yearly salary for filtering unless a canonical normalization service exists.

If annualized salary is added later, store it as a **derived field** with a documented formula, not user input.

## 8. Requirements

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `experience_level` | enum | No | Yes | Entry/Mid/Senior/Lead-Manager |
| `experience_years_min` | integer | No | Soft/range | Minimum relevant experience |
| `education_level` | enum | No | Soft | Optional |
| `language_requirements` | array | No | Soft | Canonical languages |
| `skills` | array | No | Search/Soft | Structured tags |
| `license_requirements` | array | No | Soft | Driver/trade/professional |
| `work_authorization` | enum | No | Soft | Only after policy/legal review |

### 8.1 Experience Level

Recommended:

```text
entry
mid
senior
lead_manager
```

Do not derive experience level from years automatically unless an explicit rule exists.

### 8.2 Skills

Skills should be normalized where possible.

Crawler/AI must not create uncontrolled permanent taxonomy values without review.

## 9. Schedule and timing

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `shift` | array enum | No | Yes | morning/evening/night/weekend |
| `schedule` | enum | No | Yes | fixed/flexible |
| `start_date` | date | No | Yes | Planned start |
| `application_deadline` | date | No | Yes | Must not be in past at creation |
| `vacancies` | integer | No | Soft | Number of openings |

### Shift

```text
morning
evening
night
weekend
```

### Schedule

```text
fixed
flexible
```

## 10. Benefits

`benefits` can be a multi-select structured array later.

Potential values:

- health benefits;
- dental benefits;
- paid time off;
- employee discount;
- meals;
- transit/parking;
- training;
- bonus/commission.

These are **proposed**, not source-defined.

Do not make benefits mandatory for V1.

## 11. Application/contact fields

| Field | Type | Required | Public | Notes |
| --- | --- | ---: | ---: | --- |
| `application_method` | enum | Yes | Yes | primary CTA |
| `application_url` | HTTPS URL | Conditional | Through CTA | External application |
| `application_email` | email | Conditional | Through CTA | Email application |
| `contact_handle` | Telegram/source handle | Conditional | CTA | Telegram contact |

### Application Method

```text
advertio_contact
telegram
external_url
email
```

Only fields relevant to the selected method should be required.

## 12. Media

Jobs V1 may support:

- company logo;
- job/location image;
- optional additional images.

Media is optional unless product later requires employer branding.

Crawler media follows crawler upload limits/rules.

## 13. System fields

These are not user editable.

| Field | Purpose |
| --- | --- |
| `listing_id` | canonical listing identity |
| `category` | Jobs |
| `status` | lifecycle state |
| `supply_source` | native / crawled |
| `created_at` | record creation |
| `submitted_at` | moderation submission |
| `published_at` | public publication time |
| `expires_at` | expiry |
| `filled_at` | Jobs-specific Filled timestamp |
| `deactivated_at` | deactivation |
| `boost_status` | ranking/promotion |
| `moderation_state` | review state |
| `created_by_user_id` | native owner |

## 14. Crawler provenance fields

Crawler-only/internal:

- `source_name`
- `external_id`
- `source_url`
- `source_message_id`
- `source_channel`
- `source_sender_user_id`
- `source_sender_username`
- `raw_source_text`
- `imported_at`

These must not be collapsed into the public job description.

## 15. Derived/search fields

Potential derived values:

- normalized title;
- normalized company name;
- searchable text vector/index;
- normalized city key;
- duplicate fingerprint;
- salary-disclosed boolean;
- application-open boolean.

Derived fields must be recomputable from canonical data.

## 16. Searchability map

Recommended:

### Full-text/search

- job_title
- company_name
- description
- skills
- city label
- job category label

### Exact/filter

- job_category
- employment_type
- work_arrangement
- country
- province
- city
- salary_type
- salary_period
- experience_level
- poster_type

### Range

- salary_min/max within compatible salary period
- experience_years_min
- start_date
- application_deadline
- published_at

## 17. Privacy and sensitive-data rule

Do not create public structured fields for unnecessary sensitive information.

Jobs listings should not request or publish:

- bank credentials;
- passwords;
- SIN/government identification numbers;
- immigration document numbers;
- unnecessary identity-document scans.

Work authorization, if added, should be a coarse eligibility field, not a document repository inside the listing.

## 18. Native vs crawler requiredness

Native poster form can enforce stronger completeness than crawler ingestion.

Example:

- native company name = required;
- crawler company name may be unknown in raw source.

If a crawler record lacks a field that native requires, choose one explicit crawler policy:

1. hold/reject;
2. allow with source-specific relaxed requiredness;
3. map to a clearly defined neutral state.

Do not invent company/salary values.

This policy must be explicit in crawler mapping before Jobs launch.

## 19. Data validation

- title length valid;
- meaningful description;
- enums canonical;
- salary min/max consistent;
- conditional salary fields correct;
- HTTPS for external URL;
- valid email format;
- deadline not in past at creation;
- On-site/Hybrid has city;
- vacancies >= 1 when supplied;
- no arbitrary crawler enum values;
- system fields protected from user writes.

## 20. Acceptance criteria

- [ ] Schema distinguishes user-editable, system, crawler and derived fields.
- [ ] Job Category / Employment Type / Work Arrangement are independent fields.
- [ ] Salary states are unambiguous.
- [ ] Salary range validates `min <= max`.
- [ ] Remote and On-site/Hybrid location requiredness differs correctly.
- [ ] Native and crawler mappings never fabricate unknown values.
- [ ] Optional missing values render as omitted.
- [ ] Application method drives conditional fields.
- [ ] System/provenance fields cannot be overwritten by normal poster input.
- [ ] Search/index behavior is defined for every filterable field.
