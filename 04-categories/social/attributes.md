# Social & Events — Attributes & Data Contract

> Status: **Development specification**
>
> Source explicitly establishes Social `events` and `meetups`, but does not provide a complete field schema. The structured schema below is the proposed implementation contract.

## 1. Core fields

| Field | Type | Required | Filterable | Notes |
| --- | --- | ---: | ---: | --- |
| `title` | string | Yes | Search | Listing/event title |
| `description` | text | Yes | Search | Full details |
| `social_type` | enum | Yes | Yes | event / meetup / community_activity |
| `activity_topic` | enum/string | No | Yes/Search | Topic/category |
| `participation_mode` | enum | Yes | Yes | in_person / online / hybrid |
| `start_at` | datetime | Yes | Yes | Canonical start |
| `end_at` | datetime | Conditional | Yes | Must be >= start_at |
| `timezone` | IANA timezone | Yes | No | Required for correct date behavior |
| `schedule_type` | enum | Yes | Yes | one_time / recurring |
| `recurrence_rule` | structured object/string | Conditional | Soft | Required for recurring |
| `country` | canonical country | Conditional | Yes | In-person/hybrid |
| `province` | canonical region | Conditional | Yes | where applicable |
| `city` | canonical city | Conditional | Yes | In-person/hybrid |
| `area` | canonical/string area | No | Soft | Neighborhood |
| `venue_name` | string | No | Search | Public venue name |
| `admission_type` | enum | Yes | Yes | free / paid / donation / unspecified |
| `admission_price` | decimal | Conditional | Range | Informational in V1 |
| `currency` | ISO-4217 | Conditional | Yes | Numeric admission |
| `capacity` | integer | No | Soft | Optional attendance capacity |
| `registration_type` | enum | Yes | Yes | none / contact / external |
| `registration_url` | HTTPS URL | Conditional | No | External registration |
| `language_preferences` | array | No | Soft | Optional |
| `tags` | array | No | Search/Soft | Controlled later |
| `contact_method` | enum | Yes | No | Official CTA |

## 2. Social Type

Canonical:

```text
event
meetup
community_activity
```

Do not use:

- study_partner
- sports_partner
- other_partner
- p2p_exchange_request

inside Social.

## 3. Participation Mode

```text
in_person
online
hybrid
```

### In-person / Hybrid

Require usable location:

- Country
- Province/State where applicable
- City

Exact private addresses should not be required as a public filter attribute.

### Online

Physical location can be omitted.

Do not expose private meeting links as public structured filter values.

## 4. Date and timezone

Every Social Listing needs a meaningful start time.

Store:

```text
start_at
timezone
```

`end_at` is optional only when the event naturally has no stated end.

Validation:

```text
end_at >= start_at
```

Use timezone-aware timestamps.

## 5. Recurrence

```text
schedule_type:
- one_time
- recurring
```

Recurring activities must have a recurrence representation.

Do not create many duplicate Listings solely to represent each recurrence unless implementation deliberately materializes occurrences.

## 6. Admission

```text
admission_type:
- free
- paid
- donation
- unspecified
```

For paid admission:

- amount > 0;
- currency required.

Admission price is organizer/event information.

It is not Advertio Coin/contact pricing.

## 7. Registration

```text
registration_type:
- none
- contact
- external
```

External registration requires a valid HTTPS URL.

Advertio V1 does not need to become a ticketing platform.

## 8. Organizer

Native Social Listing ownership uses the normal `owner_user_id`.

Potential display signals can come from User/Profile:

- verification;
- member since;
- rating/history where enabled.

Do not duplicate user verification as editable Listing attributes.

## 9. System fields

Shared Listing fields include:

- listing_id
- owner_user_id
- category_key
- status
- supply_source
- published_at
- expires_at
- moderation state/audit
- boost/promotion state

Category-specific Social data belongs in versioned Listing `attributes` according to the accepted Category Attribute storage decision.

## 10. Validation

- canonical `social_type`;
- valid participation mode;
- valid timezone;
- start date not already irrelevantly past at first publication;
- `end_at >= start_at`;
- in-person/hybrid has usable location;
- paid admission has valid amount/currency;
- external registration uses HTTPS;
- capacity > 0 when provided;
- partner-seeking requests should be redirected to Human Connections.

## 11. Acceptance criteria

- [ ] Events/Meetups/Community Activities share one Social schema.
- [ ] Timezone-aware start/end fields exist.
- [ ] Online/in-person/hybrid are distinguishable.
- [ ] Admission and Advertio monetization are separate concepts.
- [ ] Recurring activities are representable.
- [ ] Partner requests are not stored as Social subtypes.
