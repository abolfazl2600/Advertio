# Extraction → canonical Advertio mapping (2026-10-21)

This page describes how a Telclaw-like exporter must populate the **implemented** Advertio API, **not** a historical or proposed Cargo taxonomy. The upstream Telclaw `transferlist` and Advertio `passenger-cargo` are not synonymous field schemas. Preserve original source text/metadata in the collector; only send backend-accepted category attributes in `attributesJson`.

## Shared envelope

| From collected record | To Advertio |
| --- | --- |
| Stable channel/source namespace | `sourceName`, 2–32 characters; lowercase/digit/hyphen; stable across runs |
| Message ID unique within channel | `externalId` string; key is (`sourceName`, `externalId`) |
| Original public link | `sourceUrl` |
| Actual author's contact | `contactHandle` (preferred redirect if present) |
| Actual verified author user ID | `posterTelegramUserId` number if available |
| Deterministically cleaned source text | `description` (retain information that distinguishes individual people/posts) |
| Category-specific canonical title | `title` |
| Category key and supported fields | `categorySlug` and **serialized string** `attributesJson` |
| Resolved catalog origin location | `countryCode`, `province`, `city` |
| Ingested photo keys | `mediaKeys`, Housing only as currently specified |
| Manual moderation choice | `autoPublish=false` for unverified sources |

## Cargo: `passenger-cargo`

**Required:** `origin_country` / `origin`, `destination_country` / `destination`. Countries allowed: `IR`, `CA`, `US`, `DE`, `IT`, `GB`, `FR`. Resolve a city by **country-specific catalog code or English name**; Persian city input must be translated/verified against the catalog's `nameFa`. Envelope location corresponds to **origin**. Reject ambiguous London/unknown city instead of guessing.

**Optional:** `travel_date` (specific Gregorian date only), `role` (normally omit; default `traveler`), `cargo_type` (array of enum item types), `weight_kg` (0.1–30), `price`, `price_negotiable`, `currency`. New data **must not require role or date**. Cargo type new form e.g. `["documents","electronics"]`; old single scalar remains accepted by backend. Price without role means **per-kg**, not a flat quote; a total/unknown currency amount must stay in description only. Construct title `Origin → Destination` with optional ` · d MMM` date.

Telclaw extraction may have fields such as airline, flight number, quantity or volume. Unless the *live* category schema adds and accepts corresponding attributes, **do not pass these unknown fields** in `attributesJson` (would receive `400`). Preserve them in cleaned description or raw/provenance for future schema extensions. See [legacy prelaunch mapping](../../04-categories/cargo/crawler-mapping.md), explicitly distinct from current API.

## Housing / Jobs

Housing retains its Canadian location, field-specific property/price requirements and optional 10 photos from `POST /api/ingest/media`; its first key is the cover. Jobs requires `role=employer|seeker`, `job_category`, `job_type`; may supply `job_title`, `work_arrangement`, `salary` and `salary_period` in **CAD**, and requires a real Canadian city even if remote. Deprecated Jobs keys are rejected. Do not send Cargo's optional role behavior to Jobs.

Fetch `GET /api/categories/{slug}/attributes` and all referenced catalog locations before each mapping-version rollout. Full allowed enum sets and examples are in [canonical wire contract](../../docs/integrations/crawler.md).
