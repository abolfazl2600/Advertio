# Advertio Ingest API — Crawler Integration Guide

**Audience:** whoever is writing the crawler.
**Server-side status:** ✅ built and tested (ADR-0009). This document is a contract, not a proposal.
**Last updated:** 2026-08-20

## Base URLs

Throughout this document, `{base_url}` means the API's own domain — today that's
**`api.advertio.ir`**. Keep it as a **config variable** in the crawler and never hardcode it;
it may change.

| | URL | |
|---|---|---|
| API | `https://{base_url}/api/…` | every endpoint in this document |
| Media | `https://media.advertio.ir/advertio-media/…` | read-only. The crawler never reads from here |

> `api.advertio.ir` is a separate hostname from the one the web app runs on, fronting the
> same backend. It exists so external traffic (this crawler, and any future partner
> integration) sits behind its own edge rate-limit bucket instead of sharing one with real
> users — see ADR-0012. The path shape is unchanged: still `/api/…`, only the host moved.

> ⚠️ **`api.advertio.ir` is not live yet.** DNS, the TLS certificate, and the Cloudflare
> rate-limit rule are still being rolled out (ADR-0012, Migration path). Confirm with the
> backend team that it resolves and answers `GET /health` before pointing a real crawler run
> at it — until then it will fail closed, not silently degrade.

---

## 0. Before anything else — this cohort is separate and must stay separate

Any listing created through this path gets `supplySource = Crawled`. This is not a cosmetic
label — three behaviors are tied to it:

| | User-submitted listing | Listing from this path |
|---|---|---|
| Contact | up to 20 coins are deducted | **coins are never deducted** — the user is redirected to Telegram |
| Gate A metric | counted | **fully excluded** |
| Display | "Verified" badge | "From Telegram" badge |

The reasoning is in `.specify/memory/constitution.md` §IV and is NON-NEGOTIABLE. For you, this
means: **never send a real user's listing through this path.** If someone signed up with us
directly, their path is `POST /api/leads`, not this one.

---

## 1. Authentication

Send the `X-Ingest-Key` header on **every** request:

```
X-Ingest-Key: <key>
```

| | |
|---|---|
| Where to get the key | from the backend team. On the server it's `INGEST_API_KEY` |
| Minimum length | 32 characters (`openssl rand -hex 32`) |
| Wrong key or missing header | `401` |
| **Getting a `404`** | means the key isn't configured on the server, so the whole route group isn't mapped. That's on us, not you — tell the team |

The app itself does not rate-limit this route (deliberately: the 20-requests-per-minute cap on
other routes would strangle a crawler run). Edge nginx does apply a general cap, though —
**10 requests/second with a burst of 20**, per IP, on `api.advertio.ir` specifically (its own
zone, separate from the app's own traffic — ADR-0012). Following §6 keeps you well under that; a
`429` means you're sending too much in parallel.

That nginx number is a flood absorber, not the real budget. The actual daily ceiling (§6) is
enforced as a Cloudflare Rate Limiting Rule on `api.advertio.ir`, which returns a `429` the same
way — same handling applies.

---

## 2. Ingestion flow — three steps, in this order

This section is deliberately numbered because it really is a sequence.

### Step 1 — upload photos (if the listing has any)

```http
POST /api/ingest/media?source=telegram-rent
Content-Type: multipart/form-data
X-Ingest-Key: <key>

form field: file
```

`200` response:

```json
{
  "key": "leads/crawler-telegram-rent/9f2c1ab34d5e6f708192a3b4c5d6e7f8",
  "url": "https://media.advertio.ir/advertio-media/leads/crawler-telegram-rent/9f2c…/thumb.webp",
  "thumbUrl": "https://media.advertio.ir/advertio-media/leads/crawler-telegram-rent/9f2c…/thumb.webp"
}
```

Keep `key` — that's what you send back in step 2. `url` and `thumbUrl` are only for preview and
**must not be persisted**.

> **Why `url` and `thumbUrl` are identical:** only the 480px variant is stored for this cohort.
> The 1600px variant is never generated, because the user is redirected to Telegram for a
> crawled listing and never actually views it in the app — and 5,000 listings/month with both
> variants would add up to ~30 GB/year on the same disk the database writes to. This is
> intentional, not a bug.

Constraints:

| | |
|---|---|
| Format | JPEG · PNG · WebP (detected from file bytes, not from your `Content-Type`) |
| File size | 8 MB max |
| Dimensions | 50 megapixels max |
| `source` | must match the `sourceName` you send in step 2, or the key is rejected in step 2 |
| Metadata | EXIF/GPS is stripped server-side — no action needed on your end |

### Step 2 — create the listing

```http
POST /api/ingest/leads
Content-Type: application/json
X-Ingest-Key: <key>
```

```jsonc
{
  "sourceName": "telegram-rent",
  "externalId": "4021",
  "sourceUrl": "https://t.me/some_channel/4021",
  "contactHandle": "@landlord",

  "title": "Bright 2-bed near Yonge & Eglinton",
  "description": "Cleaned-up post text",

  "categorySlug": "housing",
  "attributesJson": "{\"listing_type\":\"rent\",\"property_type\":\"apartment\",\"bedrooms\":\"2\",\"price\":2100}",

  "countryCode": "CA",
  "province": "Ontario",
  "city": "Toronto",
  "neighborhood": "Midtown",

  "mediaKeys": ["leads/crawler-telegram-rent/9f2c1ab34d5e6f708192a3b4c5d6e7f8"],
  "autoPublish": false
}
```

Responses:

| Status | Body | Meaning |
|---|---|---|
| `201` | `{"leadId":"…","status":"PendingReview","alreadyExisted":false}` | created |
| `201` | `{"leadId":"…","status":"Active","alreadyExisted":false}` | created and published (`autoPublish: true`) |
| `200` | `{"leadId":"…","status":"…","alreadyExisted":true}` | **already existed. Nothing was changed.** Not an error |
| `400` | a JSON string with the error message | see §5 |
| `401` | — | bad or missing key |

### Step 3 — remove the listing once the source post is gone

**This step is not optional.** A crawled listing has no publisher to mark it "rented," and we
never update an existing listing in place. If you don't remove it, it stays in the feed for up
to 30 days (TTL). For a housing site, a dead listing is the worst thing a user can see.

```http
DELETE /api/ingest/leads/telegram-rent/4021      → 204   (or 404 if not found)
DELETE /api/ingest/sources/telegram-rent          → 200 {"deactivated": 137}
```

The second call deactivates an entire source at once — use it when a channel turns out to be
spam, or the crawler was broken for a while. Use with care.

---

## 3. Field reference

| Field | Required | Rule |
|---|---|---|
| `sourceName` | ✅ | `^[a-z0-9][a-z0-9-]{1,31}$` — lowercase letters, digits and dashes only, 2–32 characters. **Must stay constant**; changing it orphans every previous listing from that source |
| `externalId` | ✅ | the post's id at the source (e.g. the Telegram message id). Max 200 characters. **The idempotency key** — see §4 |
| `sourceUrl` | ⚠️ | link to the original post. Max 500 characters |
| `contactHandle` | ⚠️ | the poster's Telegram handle, with or without `@` (we strip it). Max 64 characters |
| `title` | ✅ | max 200 characters |
| `description` | — | max 2,000 characters |
| `categorySlug` | ✅ | only `housing` is supported today. Live list: `GET /api/categories` |
| `attributesJson` | ✅ | **a JSON string, not an object** — see §7 |
| `countryCode` | ✅ | `CA` |
| `province` | ✅ | name or code (`Ontario` or `ON`) |
| `city` | ✅ | name or code (`Toronto` or `toronto`) |
| `neighborhood` | — | free text, max 100 characters. Not validated |
| `mediaKeys` | — | up to 10 keys from step 1. **The first key is the feed card's cover photo** |
| `autoPublish` | — | defaults to `false` |

⚠️ = **one of `sourceUrl` or `contactHandle` is required.** Without either, the "Open in
Telegram" button has nowhere to go and the listing is a dead end. The server rejects it.

The redirect target is chosen in this order: `t.me/{contactHandle}` if present, otherwise
`sourceUrl`. So if you can extract the poster's handle from the post text, send it — it's a
noticeably better experience for the end user.

> `title`, `description`, `sourceUrl`, `contactHandle` and `neighborhood` are only enforced as
> database column limits, not as an application-level check — a value over the limit is not
> guaranteed to come back as a clean `400` with a friendly message. Truncate or validate these
> client-side before sending.

### `autoPublish` — which one should I send?

| | `false` (default) | `true` |
|---|---|---|
| Status | `PendingReview` — awaiting admin approval | `Active` — immediately in the feed |
| When to use it | **any new source, new crawler, or any change to your extraction logic** | only a channel that has already been manually reviewed and proven reliable |

Start with `false`. Flipping it later is a one-line change.

---

## 4. Idempotency — the most important section in this document

The pair `(sourceName, externalId)` is unique. **Re-running the crawler over the same channel
must be a no-op, and it is.**

- On the second run you get `200` with `alreadyExisted: true`. This is **success**, not an
  error — do not log it as an error and do not retry.
- The existing listing is **not updated** — even if the title or price changed in the original
  post. This is intentional: an approved or rejected listing carries an admin's decision on it,
  and an automatic overwrite would erase that decision.
- If you already deactivated a listing via step 3, re-crawling it **does not bring it back**.
  The key is the same.

So build `externalId` to be stable. A Telegram message id is a good choice. A hash of the post
text is a **bad** one — a small edit to the post creates a duplicate listing.

---

## 5. Errors

The `400` response body is a JSON string, e.g. `"Unknown category 'huosing'."`

**Request-level validation** (checked before `attributesJson` is even parsed):

| Message | Cause |
|---|---|
| `sourceName must be 2–32 characters…` | `sourceName` doesn't match the pattern |
| `externalId is required…` | you sent an empty value |
| `A crawled listing needs somewhere to send the buyer…` | neither `contactHandle` nor `sourceUrl` was sent |
| `Unknown category '…'` | invalid `categorySlug` |
| `That location isn't available…` | city/province not in the catalog — see §8 |
| `A listing can have at most 10 photos.` | more than 10 keys in `mediaKeys` |
| `One or more photos were not uploaded by this source.` | a key belongs to a different `source`, or was tampered with |

**`attributesJson` validation** (see §7 for the attribute schema):

| Message | Cause |
|---|---|
| `Attributes must be a JSON object.` | `attributesJson` isn't valid JSON, or isn't a JSON object |
| `'{key}' is not a valid field for this category.` | unknown attribute key |
| `{Label} is required.` | a required attribute is missing |
| `{Label} must be a number.` / `must be at least {min}.` / `must be at most {max}.` | a `number` attribute is invalid or out of range |
| `'{value}' is not one of the allowed values for {Label}.` | a `select` or `multi-select` value isn't in the enum — **see the value lists in §7** |
| `{Label} must be a list.` | a `multi-select` attribute wasn't sent as an array |
| `{Label} must be yes or no.` | a `boolean` attribute isn't `true`/`false` |
| `{Label} must be a date.` | a `date` attribute isn't a valid `YYYY-MM-DD` |
| `{Label} must be a range with a start and an end.` / `must be a range of numbers.` / `starts after it ends.` / `must start at {min} or above.` / `must end at {max} or below.` | a `range` attribute (e.g. `age_range`) is malformed or out of bounds |
| `{Label} must be {500} characters or fewer.` | a `text` attribute is too long |

`{Label}` is the attribute's display label (e.g. "Monthly Rent (CAD)"), not its key.

**All `400`s are permanent — do not retry.** Reject that listing, log it, and report it to the
team. Only `5xx` is worth retrying.

---

## 6. Volume and concurrency

| | |
|---|---|
| Expected volume | ~1,000 requests/day sustained — revised up from the original ~20,000/month estimate; this is what moved the API to its own domain (ADR-0012) |
| App rate limit | none |
| Edge rate limit (nginx, `api.advertio.ir`) | 10 req/s with a burst of 20, per IP — a flood absorber, not the budget |
| Daily budget (Cloudflare Rate Limiting Rule) | ~1,000 req/day on `api.advertio.ir` |
| **Recommended concurrency** | **2–3** |

Why limit it if there's no hard cap? Every photo upload does a decode and an encode on the same
server that hosts the database and storage. 500 parallel uploads will slow the app down for real
users. Serial, or a concurrency of 3, is more than enough — at this volume you won't come close
to any ceiling anyway.

Listing lifetime: `Early` for 72 hours, then `Public`, expiring 30 days after publication. All
three numbers are read from the database and can change — don't hardcode assumptions about them.

---

## 7. `attributesJson` — it's a string, not an object

The single most likely mistake. This field is a **string** that contains JSON:

```jsonc
// ✅ correct
"attributesJson": "{\"listing_type\":\"rent\",\"price\":2100}"

// ❌ wrong
"attributesJson": { "listing_type": "rent", "price": 2100 }
```

### Attribute types

| Type | Shape |
|---|---|
| `select` | one string from a fixed enum |
| `multi-select` | an array of strings, each from a fixed enum |
| `number` | a JSON number (a numeric string is also accepted, but send a number) |
| `boolean` | `true` / `false` |
| `date` | `YYYY-MM-DD` |
| `range` | `[from, to]`, both numbers from a fixed range |
| `text` | free text, max 500 characters |

### Required attributes for `housing`

| Key | Type | Allowed values |
|---|---|---|
| `listing_type` | select | `rent` · `roommate` |
| `property_type` | select | `apartment` · `condo` · `basement` · `studio` · `room` · `house` |
| `bedrooms` | select | `0` · `1` · `2` · `3` · `4+` (string, not a number) |
| `price` | number | monthly rent in CAD · 100–10,000 |

If you can't extract any one of these from the post, **reject that listing**. Guessing the
price or bedroom count puts bad data in the feed and breaks the filters for everyone.

### Optional attributes

| Key | Type | Allowed values |
|---|---|---|
| `furnishing` | select | `furnished` · `unfurnished` · `partially` |
| `rental_duration` | select | `daily` · `short_term` · `long_term` |
| `area` | number | m² · 5–500 |
| `bathrooms_count` | number | 1–10 · step 0.5 |
| `floor_number` | number | 0–100 |
| `year_built` | select | `0_5` · `5_10` · `10_20` · `20_plus` — an **age bucket**, not a literal year |
| `pets_allowed` | boolean | `true` / `false` |
| `smoking_allowed` | boolean | `true` / `false` |
| `is_owner` | boolean | `true` / `false` |
| `available_from` | date | `YYYY-MM-DD` |
| `amenities` | multi-select | `elevator` · `parking` · `storage` · `balcony` · `terrace` · `garden` · `rooftop` · `security_system` · `cctv` · `doorman` · `renovated` · `kitchen_appliances` · `washing_machine` · `dishwasher` · `air_conditioning` · `heating` · `internet_ready` · `pool` · `sauna` · `gym` |
| `gender_preference` | select | only meaningful for `listing_type: roommate` (not enforced server-side) — `male` · `female` · `family` · `any` |
| `age_range` | range | only meaningful for `listing_type: roommate` — `[from, to]`, bounds 18–70 |
| `lifestyle_tags` | multi-select | only meaningful for `listing_type: roommate` — `quiet` · `early_bird` · `night_owl` · `social` · `party_friendly` · `private` · `student_only` · `professional` · `remote_worker` · `vegetarian` |

**Full, live list:** `GET /api/categories`, then `GET /api/categories/{slug}/attributes`
(e.g. `/api/categories/housing/attributes`).

> The path segment is the category **slug** (`housing`), not the `id` GUID returned by
> `GET /api/categories` — passing the GUID will not match and returns 404.

If this document ever disagrees with that endpoint, **the endpoint is correct.**

Validation rules:
- An unknown key ⇒ the whole listing is rejected. "Send everything and let the server sort it
  out" doesn't work here.
- An empty value (`""` or `null`) ⇒ ignored, not an error. For an optional field you're unsure
  about, either omit it or send it empty.
- Numbers are stored as numbers, not `"2100"`. Both forms are accepted, but send a number.

---

## 8. Location

The country/province/city triple is resolved against a reference catalog:

- The city must actually belong to that province and country.
- Both code and name are accepted.
- What's stored is the **canonical form** — `"toronto"` and `"Toronto"` both become `Toronto`,
  otherwise the feed's filters would treat them as two different cities.
- A city that isn't in the catalog ⇒ `400`. Reject the listing.

Coverage today: **Canada only, but nationwide** — all 13 provinces and territories are seeded,
not just the Toronto area (Toronto/GTA and Vancouver simply get featured UI treatment).

Reference lists:

```http
GET /api/locations/countries
GET /api/locations/provinces?countryCode=CA
GET /api/locations/cities?countryCode=CA&provinceCode=ON
```

(The third parameter is `provinceCode`, not `province`.)

---

## 9. "Done" checklist

- [ ] `sourceName` is fixed and documented
- [ ] `externalId` comes from a stable identifier (not a hash of the post text)
- [ ] one of `contactHandle` / `sourceUrl` is always populated
- [ ] `alreadyExisted: true` is handled as success, not an error
- [ ] `400` does not trigger a retry; only `5xx` does
- [ ] `DELETE` is called when the original post is removed
- [ ] a listing missing price/bedrooms/type is rejected, not guessed
- [ ] concurrency is capped at 2–3
- [ ] starts with `autoPublish: false`
- [ ] the key lives in an environment variable, not in code

---

## Example — one full listing with curl

```bash
KEY="…"
BASE_URL="api.advertio.ir"      # a variable, not hardcoded
BASE="https://$BASE_URL"
SOURCE="telegram-rent"

# 1 — photo
PHOTO=$(curl -sS -X POST "$BASE/api/ingest/media?source=$SOURCE" \
  -H "X-Ingest-Key: $KEY" \
  -F "file=@photo.jpg" | jq -r .key)

# 2 — listing
curl -sS -X POST "$BASE/api/ingest/leads" \
  -H "X-Ingest-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg key "$PHOTO" '{
    sourceName: "telegram-rent",
    externalId: "4021",
    sourceUrl: "https://t.me/some_channel/4021",
    contactHandle: "@landlord",
    title: "Bright 2-bed near Yonge & Eglinton",
    description: "Two bedrooms, 5th floor, available from the 1st",
    categorySlug: "housing",
    attributesJson: ({listing_type:"rent", property_type:"apartment", bedrooms:"2", price:2100} | tostring),
    countryCode: "CA", province: "Ontario", city: "Toronto", neighborhood: "Midtown",
    mediaKeys: [$key],
    autoPublish: false
  }')"

# 3 — later, once the original post is removed
curl -sS -X DELETE "$BASE/api/ingest/leads/$SOURCE/4021" -H "X-Ingest-Key: $KEY"
```

---

## Further reading

- Full API contract: [`specs/001-housing-paid-contact/contracts/api.md`](../specs/001-housing-paid-contact/contracts/api.md) §`/api/ingest`
- Rationale behind the design decisions: [`docs/adr/ADR-0009`](adr/ADR-0009-external-supply-ingestion.md)
- Why the API moved to its own domain: [`docs/adr/ADR-0012`](adr/ADR-0012-api-subdomain.md)
- Code: `backend/src/Advertio.Api/Modules/Lead/LeadIngestEndpoints.cs`
