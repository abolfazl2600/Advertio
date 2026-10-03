# Jobs — Listing Detail

> Status: **Jobs V1 proposed detail-page specification**.

## Information architecture

Recommended order:

### Header

- Job Title
- Company Name
- Location / Remote scope
- verification/trust badge when available

### Primary facts

- Salary
- Employment Type
- Work Arrangement
- Published time

### About the job

Full description.

### Job details

- Job Category
- Experience Level
- Minimum experience
- Schedule
- Shift
- Start Date
- Application Deadline
- Vacancies

Only show available values.

### Requirements

- Skills
- Languages
- Education
- Licenses/certifications
- Work authorization when product policy supports it

### Benefits

Structured benefits when supplied.

### About the employer

- employer/poster display name;
- poster type;
- verification indicators;
- member since;
- relevant reputation/history if those platform trust features exist.

### Contact / Apply

One canonical primary action based on `application_method`.

See [application-contact.md](./application-contact.md).

## Official action requirement

Advertio should instrument the primary Apply/Contact action.

Avoid hiding the main conversion behind untracked free-text instructions in the description.

## Crawled Jobs

For a crawled Job:

- preserve provenance;
- route contact/application to source/Telegram according to crawler rules;
- do not imply the external poster is a verified native Advertio employer;
- do not charge native contact monetization when crawler monetization is disabled.

## Safety signals

If the listing is removed/taken down/expired/filled, the detail page should not present a normal active Apply action.

## Acceptance criteria

- [ ] Detail page displays core job facts without fake placeholders.
- [ ] Native and crawled source behavior is correctly separated.
- [ ] Primary Apply/Contact is measurable.
- [ ] Inactive/Expired/Filled/TakenDown Jobs cannot behave like active openings.
- [ ] Employer trust data is shown only when genuinely available.
