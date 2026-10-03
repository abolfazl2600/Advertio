# Human Connections — Attributes & Data Contract

> Status: **Development specification**
>
> The original source provides only a small number of explicit fields for this area: travel date, study/exam period, and location or remote participation.
>
> The broader schema below makes Human Connections usable through structured Active Filters.

## 1. Design principle

Every important discovery dimension should be represented as structured data when practical.

The structured fields below provide the discovery dimensions used by Active Filters.

## 2. Core fields

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `title` | string | Yes | Search | concise request title |
| `description` | text | Yes | Search | full context |
| `connection_type` | enum | Yes | Yes | broad use-case group |
| `activity_type` | enum/string | Conditional | Yes/Search | specific activity |
| `participation_mode` | enum | Yes | Yes | in_person / remote / either |
| `country` | canonical country | Conditional | Yes | required for in-person where applicable |
| `province` | canonical region | Conditional | Yes | where applicable |
| `city` | canonical city | Conditional | Yes | normally required for in-person |
| `area` | string/canonical area | No | Soft | neighborhood/local area |
| `date_type` | enum | Yes | Yes | anytime / exact / range / recurring |
| `start_date` | date | Conditional | Yes | exact/range/recurring |
| `end_date` | date | Conditional | Yes | range |
| `availability` | structured/text | No | Soft | time/day availability |
| `language_preferences` | array | No | Soft | optional |
| `group_size_preference` | integer/range | No | Soft | optional |
| `contact_method` | enum | Yes | No | standard Advertio contact path |

## 3. Connection Type

Recommended broad values:

```text
travel
study
daily_life
health_fitness
sports_outdoor
social_activity
family_kids
other
```

These are structured filter values.

## 4. Activity Type

Activity Type refines Connection Type.

Examples:

### Travel

- travel_companion
- airport_companion
- trip_activity

### Study

- study_partner
- exam_preparation
- language_practice
- study_group

### Daily Life

- shopping_buddy
- document_runner
- pet_care_exchange

### Health & Fitness

- gym_partner
- running_partner
- diet_accountability
- hiking_group

### Sports & Outdoor

- tennis
- padel
- badminton
- table_tennis
- basketball
- swimming
- cycling
- skiing_snowboarding
- climbing
- yoga

### Social Activity

- event_buddy
- board_games
- gaming
- book_club
- photography_walk

### Family & Kids

- babysitting_exchange
- school_pickup_rotation

The source presents many of these as ideas. They should become canonical enum values only when the product enables them.

## 5. Participation Mode

```text
in_person
remote
either
```

The original source explicitly requires support for location selection or remote participation.

### In-person

Normally requires:

- country;
- province where applicable;
- city.

### Remote

Location can be omitted from the public discovery constraint unless the listing intentionally restricts geography.

### Either

Can appear in both remote and relevant local browsing, according to filter semantics.

## 6. Date model

The original source specifically identifies:

- travel date;
- study/exam period.

Use a general date model rather than creating incompatible schemas.

### Anytime

```text
date_type = anytime
```

### Exact date

```text
date_type = exact
start_date = YYYY-MM-DD
```

### Date range

```text
date_type = range
start_date
end_date
```

### Recurring

```text
date_type = recurring
availability = structured recurrence
```

Do not fabricate dates when the user has not supplied them.

## 7. Availability

Recommended V1 representation can include:

- weekdays/weekends;
- morning/afternoon/evening;
- free-text note when structured recurrence is insufficient.

Do not create a complex calendar scheduler for V1.

## 8. Language preferences

Optional.

Use canonical language identifiers when implemented.

Language preference is an optional structured filter preference.

## 9. Profile-derived trust data

Do not copy mutable User Profile trust values into listing attributes as user-authored data.

Potential display/filter signals come from the owning User/Profile:

- verification status;
- rating;
- deals/history;
- last active;
- badges.

Only expose filters for states that actually exist in the runtime.

## 10. Sensitive-data boundary

Do not create unnecessary filter fields for sensitive personal traits.

Avoid making the category depend on:

- inferred personality;
- attractiveness;
- political/religious profiling;
- health status;
- other sensitive profiling.

If a future use case legitimately requires a sensitive attribute, it needs an explicit safety/product review.

## 11. System fields

System-controlled:

- listing_id
- owner_user_id
- status
- created_at
- published_at
- expires_at
- moderation_state
- boost_status
- supply_source

## 12. Validation

- title and description must be meaningful;
- connection_type canonical;
- activity_type valid for the selected connection type when controlled;
- participation mode canonical;
- in-person location complete enough for discovery;
- date range has `start_date <= end_date`;
- past-only date windows cannot be published as active requests;
- optional values remain null/omitted rather than fabricated.

## 13. Acceptance criteria

- [ ] Human Connections has structured fields sufficient for Active Filters.
- [ ] Location/Remote is explicit.
- [ ] Travel and Study date requirements are representable.
- [ ] Activity Type can narrow use cases through Active Filters.
- [ ] Profile trust signals remain system/profile data.
- [ ] No compatibility or personality score is required.
