# Jobs — Job Taxonomy

> Status: **Proposed canonical Jobs V1 taxonomy**.

## Purpose

Job category answers:

> What kind of work is this?

It is separate from:

- Employment Type — Full-time, Part-time, Contract, etc.
- Work Arrangement — On-site, Remote, Hybrid.

## Proposed canonical values

| Key | UI label |
| --- | --- |
| `general_labour` | General Labour |
| `warehouse` | Warehouse |
| `construction` | Construction |
| `delivery_driver` | Delivery & Driver |
| `restaurant_food` | Restaurant & Food |
| `retail` | Retail |
| `cleaning` | Cleaning |
| `office_admin` | Office & Administration |
| `customer_service` | Customer Service |
| `sales` | Sales |
| `healthcare_support` | Healthcare Support |
| `beauty_personal_care` | Beauty & Personal Care |
| `childcare` | Childcare |
| `skilled_trades` | Skilled Trades |
| `it_tech` | IT & Tech |
| `design_creative` | Design & Creative |
| `education` | Education |
| `other` | Other |

## Rules

- Persist canonical keys, not translated labels.
- UI labels can be localized.
- Crawler/AI classification must return canonical keys.
- Unknown or low-confidence classification should map to `other` only when that is genuinely supported; otherwise hold for review.
- Do not create new categories from arbitrary AI output.
- Taxonomy changes should be versioned/migrated deliberately.

## Employment Type

Separate canonical values:

- `full_time`
- `part_time`
- `contract`
- `temporary`
- `internship`
- `casual`

## Work Arrangement

Separate canonical values:

- `on_site`
- `remote`
- `hybrid`

## Acceptance criteria

- [ ] Job Category, Employment Type and Work Arrangement are stored separately.
- [ ] UI localization does not change persisted canonical keys.
- [ ] Crawler/native listings share the same taxonomy.
- [ ] Unknown AI-generated category text cannot create uncontrolled taxonomy values.
