# Ingest listing workflow (2026-10-21)

An external Telegram record enters Advertio through **crawler-only** endpoints, not the native publisher's form.

## Preflight per source/record

1. Pin a stable `sourceName` and per-message `externalId`, retain original message URL and original unaltered text in upstream records.
2. Determine category: `housing`, `passenger-cargo` or `jobs`. Do not ingest unlaunched Services/Social just because the category seed includes them.
3. Parse the original post into cleaned descriptive text and category attributes, preserving uncertainty as omission rather than invented values.
4. Resolve country/province/city against `/api/locations`, validate accepted field keys/types from `GET /api/categories/{slug}/attributes`. For Cargo, country/origin/destination are required but **role and date are optional**, and cargo type is a **list**.
5. Require an authentic `sourceUrl` or author `contactHandle` and keep it accurately attributed. Include an author numeric ID only when actually exposed.
6. For eligible Housing photos, upload via `POST /api/ingest/media?source=...`, retain **keys** and put intended cover first. Do not persist temporary URL as media key. For Cargo and Jobs, current external contract says use `mediaKeys: []`.
7. `POST /api/ingest/leads` with header `X-Ingest-Key`, JSON envelope and `attributesJson` **serialized as a JSON string**. Prefer `autoPublish:false` until quality is approved.
8. Record `leadId`, `status` and `alreadyExisted`. `201` means created; `200` means no-op (may be source replay *or* cross-source duplicate).
9. Queue stale-post checks and send explicit `DELETE` when original Telegram message is gone; normal TTL does not replace cleanup.

## Category-specific safety

- **Cargo:** title route + optional date; no role question; exact Gregorian dates only, no invented dates; city catalog English codes/names; per-kg price only with trustworthy supported currency; cleaned original text in description.
- **Jobs:** category role must be employer/seeker, known job taxonomy and job type, Canadian city even when remote; do not send deprecated attributes.
- **Housing:** conditional rent price/negotiable rule, catalog city, up to ten photos, first key cover.

Use [complete example requests and responses](../../docs/integrations/crawler.md) rather than reconstructing requests from screenshots or pre-launch Cargo plans.
