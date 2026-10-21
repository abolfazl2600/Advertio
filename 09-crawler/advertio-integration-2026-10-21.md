# Crawler ↔ Advertio: verified implementation reconciliation (2026-10-21)

> **Status:** reviewed against GitLab `advertio/platform/advertio-monorepo`, `master` at `e36ba877d416cc763f2093c6d38eaf940a3a5e11` and the October 21 feature commits. Describes the **Advertio receiving API and downstream behavior**, not proof that the independently maintained **Telclaw collector** has deployed any corresponding changes. The older `09-crawler/` documents describe Telclaw behavior at [`63fbc01`](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92); do not present that pinned snapshot as the currently deployed collector.
>
> **Contract of record:** [complete crawler ingest API guide](../docs/integrations/crawler.md), synchronized from [GitLab `docs/CRAWLER-INTEGRATION.md`](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/e36ba877d416cc763f2093c6d38eaf940a3a5e11/docs/CRAWLER-INTEGRATION.md) with the verified `cargo_type` MultiSelect correction. Use the **live** `GET /api/categories/{slug}/attributes` response and backend validation as the final schema authority.

## 1. System boundaries and status

| Component | Current evidence | Responsibility |
| --- | --- | --- |
| Telclaw (separate repository) | Historical pinned source reviewed in this documentation set | Collect Telegram messages, preserve original text and source IDs, classify/extract/normalize, queue delivery, handle source deletion and retries |
| Advertio ingest API | GitLab `master` 2026-10-21, implementation + ingestion contract | Authenticate and validate crawler requests, resolve catalog data, deduplicate, persist `supplySource=Crawled`, optionally publish |
| Advertio publishing + Mini App | GitLab October 21 changes | Post channel cover photos when available; preserve old channel posts when listings end; show canonical listing state through API / app |
| GitHub `abolfazl2600/Advertio` | This documentation repository | Describe those boundaries; **does not contain the running Advertio monorepo or the Telclaw runtime** |

Sequence: Telegram → Telclaw raw storage → cleaning → classification → category-specific extraction → validation → optional deferred media handling → authenticated Advertio ingest → deduplication / moderation → feed, Telegram channel distribution, Mini App.

Never assume the ingest receiver automatically re-crawls, updates existing posts, deletes missing source posts, or converts unrecognized Telclaw-specific extra fields. Those are separate upstream integration responsibilities.

## 2. Supported categories and mandatory payload shape

`POST /api/ingest/leads` accepts the same envelope for `housing`, `passenger-cargo` and `jobs`. Each requires `sourceName`, stable `externalId`, `title`, `categorySlug`, `attributesJson` (a **JSON-encoded string**, not a nested object), canonical `countryCode`, `province` and `city`. Include at least one of `sourceUrl` or `contactHandle`. Include `posterTelegramUserId` **only** when Telegram exposed the actual human author's positive numeric user ID. `mediaKeys` is an array, up to 10; `autoPublish` defaults to `false`.

- `sourceName`: 2–32 lowercase characters/digits/hyphens, regex `^[a-z0-9][a-z0-9-]{1,31}$`; stable across runs. The media-upload `source` must be identical.
- Idempotency: `(sourceName, externalId)` is unique; Telegram's `message_id` is unique **within its source**, not globally. Stable source namespace + message ID is essential. Content hashes are not IDs.
- Never reuse one `sourceName` for unrelated channels or categories: `DELETE /api/ingest/sources/{sourceName}` deactivates every associated listing.
- `contactHandle` takes precedence over `sourceUrl` for Telegram contact; supply a real author handle, never invent one.
- Native user listings use `POST /api/leads`, **not** crawler ingest. Ingested leads remain `Crawled`, have no paid contact charge or verification badge, and are excluded from Gate A.
- Use `autoPublish:false` for new/unverified sources. It must remain a deliberate source-level quality decision.

## 3. Critical Cargo changes on October 21

The canonical Advertio slug is **`passenger-cargo`**, not `transferlist` or `cargo`. Current required attributes are only:

| Required key | Type / validation |
| --- | --- |
| `origin_country` | select: `IR`, `CA`, `US`, `DE`, `IT`, `GB`, `FR` |
| `origin` | catalog English city name or code **within** `origin_country` |
| `destination_country` | same allowed country list |
| `destination` | catalog English city name or code within `destination_country` |

Optional fields now behave as follows:

| Attribute | Correct current mapping |
| --- | --- |
| `role` | **Not required; not a public or channel filter.** Omit for new cargo deliveries. The backend defaults omission to `traveler`. Legacy `traveler`/`sender` values are still accepted and preserved, affecting preexisting price semantics. **Jobs `role` is unchanged and required.** |
| `travel_date` | Optional Gregorian `YYYY-MM-DD`. Convert precise Jalali dates; for vague/missing dates **omit**. Never infer an arbitrary date. Skip dates already in the past; the feed suppresses dated trips after departure, but omitting a date keeps a trip eligible for display until its ordinary lifecycle ends. |
| `cargo_type` | **MultiSelect (not Select).** Canonical new form is an array such as `["documents","clothes"]` from `documents` / `clothes` / `electronics` / `food` / `other`. A legacy single string is accepted and canonicalized to a one-element list; old stored single-value records remain readable. [Migration `CargoTypeIsAList`](https://gitlab.com/advertio/platform/advertio-monorepo/-/blob/e36ba877d416cc763f2093c6d38eaf940a3a5e11/backend/src/Modules/Category/Advertio.Modules.Category.Infrastructure/Migrations/20261021133000_CargoTypeIsAList.cs). |
| `weight_kg` | Optional numeric `0.1–30`, measured in kilograms |
| `price` + `currency` | New no-role cargo prices mean **price per kg**, not total. Send price only if source states a per-kg price **and** supported currency (`CAD`/`USD`/`EUR`/`GBP`). Never convert a lump-sum quote to per-kg or infer money from the route; leave it in description instead. Legacy `sender` rows keep total-price semantics. |
| `price_negotiable` | Optional boolean, only if source explicitly says negotiable; do not send together with `price` |

Generate `title` as `Origin → Destination · d MMM` (date known), or `Origin → Destination` (no date). Keep the **cleaned original post content** as `description`, with significant information intact. Do not create empty or templated descriptions, because otherwise independent cargo posts with the same route/date/price can be deduplicated incorrectly.

**Location integrity:** read `GET /api/locations/cities?countryCode=XX&limit=200` for the catalog (`code`, English `name`, Persian `nameFa`, `provinceCode`). Map Persian/alias input to a verified catalog code by **country**; the backend does not accept Persian names directly as cargo city values. The envelope `countryCode` / `province` / `city` must reflect the **origin** city's country / returned province code / code, not destination. Reject unresolved or ambiguous cities rather than substituting the nearest one. The seven countries above are currently for cargo routes; housing and jobs target Canada.

**Matching:** stored Cargo `role` channel/saved-search filters are retained but ignored so historical searches do not hide either older senders or new rows. `cargo_type` channel and saved-search matching checks **membership** in an array, retaining compatibility with old one-value records. New bot filter wizards do not offer multi-select choices; already-saved single item filters continue to match.

## 4. Housing and Jobs crawler mapping

**Housing** remains in the Canadian housing journey with its own required category schema (for example `listing_type`, `property_type`, `bedrooms`, `price` unless the negotiated-price rule applies). Photos are supported: upload via `POST /api/ingest/media?source={sourceName}` and include returned **media key(s)**, not URL(s). Crawled media is stored **thumbnail only**. First usable key is the cover. Preserve the original source and avoid guessing a catalog location.

**Jobs** uses slug `jobs`; `role` **is required** (`employer` / `seeker`), alongside `job_category` and `job_type`. Canadian origin location is mandatory even for remote postings. `job_type=remote` is invalid; use `work_arrangement=remote` plus a real `job_type`. There is no `salary_negotiable`, `salary_min`, `field` or `experience_years` field. If salary has no explicit CAD amount/period, omit both `salary` and `salary_period`. Construct a meaningful `Hiring / Looking for work · role/field · city` title, and send the post text as description. The complete allowed enums are in the synchronized [API contract](../docs/integrations/crawler.md).

The October 21 API guidance says **do not upload crawler photos for Cargo or Jobs**, and to send `mediaKeys: []` for these journeys. The separately implemented Telegram channel cover-photo feature works for listings **that have** media and does not imply the crawler should start uploading photos for every journey.

## 5. Duplicate and re-delivery semantics

| Receiver response | Meaning / required sender behavior |
| --- | --- |
| `201` and `alreadyExisted:false` | New listing; track `leadId` and status (`PendingReview` or `Active`) |
| `200` and `alreadyExisted:true` | Successful no-op. Can mean **same source ID** or **a different post** that content/link/similarity detection matched. Do not retry as a failure. For a first-ever send of this external ID, log external ID and returned lead ID to investigate false positives. |
| `400` | Permanent bad request/schema/location/media, quarantine for correction — no blind retries |
| `401` | Incorrect or missing `X-Ingest-Key`, operator/configuration action required |
| `404` on ingest route | Could indicate `INGEST_API_KEY` not configured and route group not mapped; verify API server configuration. `404` on deletion means source identity may not exist. These are different contexts. |
| `429` | Edge/daily budget throttling; stop/slow down, respect retry guidance. Do not retry immediately in a loop |
| `5xx` / transport timeout | Retry with bounded exponential backoff and the *same* idempotency pair; do not assume a timeout means no write happened |

Server-level similarity (at time of reference) evaluates normalized source link, same-category title/description/price/city, and weighted similarity for recent same-category/same-city candidates. Above the high threshold it can suppress creation even for a **different** source record. Thresholds are configurable: inspect cases and metrics rather than treating values as invariants. A cross-source dedup response does **not** create a source-identity mapping; `DELETE` against that not-created pair returns `404`.

**No in-place upsert:** reposting the same source/external ID neither overwrites an existing approved decision nor resurrects a deactivated record. When the original Telegram post is deleted, send `DELETE /api/ingest/leads/{sourceName}/{externalId}`. For complete source shutdown use `DELETE /api/ingest/sources/{sourceName}` carefully. No automatic Telegram edit or deletion sync is implied by the Advertio backend.

## 6. Media, channel posts and ended listings

On October 21 the Telegram channel publisher began attaching a listing's **first nonblank media key** as its cover photo when present. For `Crawled` records it requests `thumb.webp`, rather than the missing `full.webp`. Native listings use full-size media. One photo post contains the caption and Mini App buttons; a listing without media is a normal text post.

A **definitive Telegram HTTP 400 photo refusal**, when no photo post was created, triggers one text fallback; its `PhotoError` reason is saved and Backoffice history labels it “Sent without its photo.” Timeouts, connection drops, `429` or ambiguous Telegram outcomes do **not** trigger a second text post: the photo send stays failed and worker retry applies, avoiding accidental duplicates. Telegram accepting WebP by URL was explicitly **not verified** in real Telegram by that commit.

When an Active listing later becomes Expired/Deactivated, its **existing Telegram channel post is no longer edited**. A consumer opening `View Listing` reaches the Mini App, whose `GET /api/leads/{id}` for previously published expired/deactivated leads returns `410` with `code=lead.no_longer_available`, `status`, `categorySlug` and `expiresAtUtc` (for expiry). Never-public or otherwise unavailable resources return `404`; publisher self-access can still show their own record. The Mini App shows a terminal state with alternatives, without retrying `404`/`410`. These are downstream behaviors, **not** instructions to stop source deletion cleanup.

## 7. Security, budgets and verification checklist

- Supply `X-Ingest-Key` on every ingest call; store `INGEST_API_KEY` securely and never embed it in logs or Markdown. API host must be configurable. The source document marks `api.advertio.ir` DNS/TLS/rate-rule rollout as **not verified live**; verify `GET /health` before switching the crawler.
- The documented edge cap is **10 requests/sec, burst 20** per IP; its shared Cloudflare daily budget is approximately **1,000 requests across all journeys**, with suggested concurrency **2–3**. These are documented rollout/configuration values, **not independently checked production rate-limit configuration**.
- The default source moderation switch should be `autoPublish=false`. Validate schema against actual category attribute API before uploading, do not fabricate missing values, and preserve original Telegram provenance.
- Test: missing Cargo `role`, no date, precise date, Jalali conversion, multiple cargo types, old single cargo type, old `sender` pricing, multilingual city normalization, unknown city rejection, mismatched origin envelope, same-id replay, cross-source duplicate, failed media upload, ambiguous Telegram response, expired lead `410` and missing `404`.
- Operational logging should include sourceName, externalId, leadId where available, category, HTTP status, processing stage, retry count and safe failure category; exclude keys and unnecessary personal data.

## 8. Implementation evidence and maintenance

- [GitLab crawler ingest contract](../docs/integrations/crawler.md), source `docs/CRAWLER-INTEGRATION.md` at `e36ba877`.
- [Optional Cargo role/date; validator defaults](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/b2ade2686d62a629f2fa2b32a31eb925f788d556).
- [Cargo MultiSelect and old-list compatibility](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/448a94f55c945efc99840a4b39453f9fab7f0ef6).
- [Telegram photo fallback and persisted PhotoError](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8b807d5029dbfc6f43ae623fbe99da12e05aeb5c).
- [410 Gone / preserve channel posts](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/f8cb1f389cdfbc704ae7ded1a5bdfbf9e93dcf59).
- [Full day-by-day implementation summary](../docs/releases/2026-10-21.md).
- [Telclaw source-only architecture (pinned, historical)](./overview.md).

**Rule when documents conflict:** current GitLab implementation and live API schema → current GitLab/GitHub ingestion contract → dated implementation reconciliation → older Telclaw source study / prelaunch product design. Do not silently rewrite historical decisions as implemented features.
