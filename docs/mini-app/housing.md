# Housing — current implementation

> **Scope:** the live `housing` journey in the Web app. This page follows the category schema seeded by GitLab `master` and supersedes older screenshot-only descriptions where they conflict.

## 1. Journey and market

- Display name: **Housing**.
- Backend slug: `housing`.
- Market: Canada. Housing's form/feed use the Canadian country/location catalog; the additional countries in the shared catalog exist for Cargo.
- Listing types: **Rent** and **Roommate**.
- Housing is the original baseline journey. It uses the shared listing interaction layer, not a private Housing-only contact/save/report implementation.

## 2. Posting flow

The create wizard gathers the listing's core information and schema-defined attributes, lets the user optionally upload photos, and publishes the listing. The backend owns final validation and pricing.

### Required core attributes

| Attribute key | User-facing meaning | Validation / behavior |
|---|---|---|
| `listing_type` | Rent or Roommate | Required select; hard filter |
| `property_type` | Apartment, Condo, Basement, Studio, Room, House | Required select; hard filter |
| `bedrooms` | Studio, 1, 2, 3, 4+ | Required select; hard filter |
| `price` | Monthly rent in CAD | Number 100–10,000; required unless `price_negotiable=true`; hard filter |

A negotiable price must be expressed with `price_negotiable=true`, rather than inventing a numeric rent. The server validates the same schema used to render the form.

### Optional and conditional attributes

| Key | Type / options | Filter behavior |
|---|---|---|
| `price_negotiable` | Boolean | Not a feed filter; declares that no numeric price was quoted |
| `furnishing` | Furnished, Unfurnished, Semi Furnished | Hard filter |
| `gender_preference` | Male, Female, Family, No preference | Hard filter; visible only for Roommate |
| `age_range` | 18–25, 25–35, 35–50, 50+ | Soft filter; visible only for Roommate; range 18–70 |
| `lifestyle_tags` | Multi-select grouped by daily rhythm, social life and who fits | Soft filter; visible only for Roommate |
| `pets_allowed` | Boolean | Soft filter |
| `available_from` | Date | Soft filter |
| `rental_duration` | Daily, Short Term, Long Term | Hard filter |
| `area` | Number, 5–500 m² | Soft filter |
| `bathrooms_count` | Number, 1–10, step 0.5 | Soft filter; filter buckets 1, 2, 3+ |
| `floor_number` | Number, 0–100 | Soft filter |
| `year_built` | 0–5, 5–10, 10–20, 20+ years | Soft filter |
| `is_owner` | Boolean | Soft filter |
| `smoking_allowed` | Boolean | Soft filter |
| `amenities` | Multi-select | Soft filter |

Roommate-only lifestyle values are: Quiet, Early bird, Night owl, Social, Party friendly, Keeps to themselves, Students only, Working professional, Works from home and Vegetarian household.

The amenities options are: Elevator, Parking, Storage Room, Balcony, Terrace, Garden, Rooftop, Security System, CCTV, Doorman, Renovated, Kitchen Appliances, Washing Machine, Dishwasher, Air Conditioning, Heating, Internet Ready, Swimming Pool, Sauna and Gym.

**Hard vs soft filters:** hard filters express core constraints; soft filters express preferences. These flags come from the backend schema and are not independently defined by each screen. Conditional fields are driven by schema metadata, so roommate-only fields should not be shown for Rent listings.

## 3. Location

- Location selection is catalog-backed, not arbitrary free text.
- The shared location API exposes countries, provinces and cities, with optional search query, featured entries and result limits.
- Housing is pinned to Canada even though the shared location catalog also contains Cargo destinations.
- The city stored on the listing is canonicalized by the backend against the reference catalog.

## 4. Photos

- Photos are optional; maximum 10 per listing.
- Client accepts JPEG, PNG and WebP.
- Maximum file size is 8 MiB per image.
- Uploads occur immediately when a file is picked, one at a time. Each successful upload returns an opaque media key and public/thumb URLs for display.
- Publishing sends the opaque media keys, not user-supplied URLs. The server rejects media keys not owned by the current publisher.
- An upload error such as an unsupported image, oversized file or rate limit is shown before the user publishes.

## 5. Feed, filters and detail page

- The feed is paginated and uses server-side category filters.
- The standard filter panel includes the primary listing attributes; **More filters** exposes the optional/soft filters supported by the current schema.
- Cards and details render attribute labels from the schema, so labels/options can be renamed without hardcoding every option into the UI.
- Detail pages show photos/gallery when present, location, price/negotiable state, key attributes, description, publisher and trust indicators.
- The same shared save, report, contact and conversation interactions used by Cargo and Jobs are available on Housing.

## 6. Moderation, pricing and lifecycle

- A newly created user listing enters `PendingReview`; it becomes `Active` only after moderation approves it.
- At approval, the server snapshots the configured contact-unlock cost and listing TTL onto the listing. Later policy edits apply to new approvals; they do not silently rewrite an existing listing's stored contact cost or expiry.
- The seeded default listing TTL is 30 days. Backoffice policy can change it.
- Current limit: one active user-created listing per user in the Housing category.
- Duplicate detection runs before any coin charge or listing write. An exact duplicate is rejected without charging; a similarity finding can be recorded for moderator review without treating every similar listing as an exact duplicate.
- Renew is offered for expired listings and active listings within 7 days of expiry. Boost is available for active listings. Duration and price are server-configured; seeded boost duration is 72 hours.
- Moderator actions include approve, reject with a reason and takedown of an active listing with a reason.

## 7. Current boundaries

- The current Housing user flow is the baseline for the shared listing layer; it does not imply that every category is supported by the crawler.
- The crawler ingestion contract currently supports `housing` only.
- The code-level default policy values are not a guarantee of the live configured values. Check Backoffice **Policy & pricing** for current settings.
- Production deployment of the reviewed GitLab revision is not confirmed by this document.

## Related pages

- [Shared listing interactions](./listing-interactions.md)
- [Global Search](./search.md)
- [Authentication and phone verification](./authentication.md)
- [Crawler ingestion contract](../integrations/crawler.md)
