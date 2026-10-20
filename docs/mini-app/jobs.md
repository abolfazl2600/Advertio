# Jobs — current implementation

> **Status:** implemented in GitLab `master` on 2026-10-19. Current geography is Canada only. This is implementation status, not a Production deployment audit.

## 1. Purpose and roles

- Canonical category slug: `jobs`.
- Market: Canada only.
- The category supports both sides of the market:
  - **Hiring** (`role=employer`): an employer describes an opening.
  - **Looking for work** (`role=seeker`): a person describes the work they are seeking.
- Both roles use one category and one listing model.

## 2. Create a job or job-seeker listing

The create form is one screen. Four choices are required: role, job field, city and hours. The title is generated from these answers; free-text input is not required.

### Required fields

| Field | Options / rule |
|---|---|
| `role` | Hiring or Looking for work |
| `job_category` | Closed taxonomy of 18 fields listed below |
| `city` | City from the Canadian location catalog; province comes with the selected city |
| `job_type` | Full-time, Part-time, Contract or Temporary |

### Job category taxonomy (18 values)

1. Restaurant & Food
2. Construction
3. Cleaning
4. Delivery & Driving
5. Retail & Store
6. Beauty & Salon
7. Office & Admin
8. IT & Tech
9. General Labour
10. Warehouse
11. Skilled Trades
12. Customer Service
13. Sales
14. Healthcare & Care
15. Childcare
16. Teaching & Tutoring
17. Design & Creative
18. Other

The form initially surfaces the first eight common fields as chips and provides a “more fields” affordance for the rest. The backend taxonomy is closed: arbitrary free-text field names are not accepted as category values.

### Optional details

| Field | Behavior |
|---|---|
| `job_title` | Optional custom title, maximum 60 characters |
| `work_arrangement` | On-site, Hybrid or Remote |
| `salary` | Optional positive CAD amount; schema range 1–1,000,000 |
| `salary_period` | Per hour, per month or per year |
| `description` | Optional note/details |

Work arrangement and employment hours are distinct fields. “Remote” is a location arrangement, not an employment type. Salary is always CAD because Jobs is Canada-only. If salary is omitted, the UI does not invent a “Negotiable” label.

## 3. Feed, filters and detail

The Jobs feed filters server-side by:

- Role: Hiring, Job seekers or All.
- Job category/field.
- City, with an “Anywhere” option.

The feed uses paged loading, skeletons and an empty state that allows filters to be cleared. The city selector uses the Canadian reference catalog; the province is derived from the selected city.

The detail page shows the role, headline, field when applicable, hours, work arrangement, city/province, salary if disclosed, description and publisher/trust information. For job-seeker listings, the description is labelled as “About me”; for employer listings it is “About the job”. The page shows a job-scam warning and uses the shared contact, save and report interactions.

## 4. Integration with the platform

Jobs appears in Hub, Post chooser, global Search, Saved and My listings. Its listing-based Gate A metrics are selectable independently from Housing and Cargo. Contact/unlock, conversation, save, report, renew and boost use the shared listing layer. The initial Jobs pricing/policy rows copy Housing's then-current values if missing; administrators can tune Jobs independently afterward.

## 5. Explicit gaps

The following are not part of JOBS-01 and must not be described as shipped:

- Multiple active Jobs listings per employer/user within the category; the one-active-listing-per-user-per-category rule remains.
- Jobs crawler ingestion.
- A dedicated `Filled` status/lifecycle.
- External application URL or email fields.
- Jobs-specific scam signals in the Backoffice.
- Production deployment confirmation.

## Source commits

- [Jobs schema and category attributes](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8afb46d93a1902f06649823bf5c06b012dd7775b)
- [Jobs Web journey](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/06ed02799052eadb900ea16ed8ebaacf2bd8450b)
