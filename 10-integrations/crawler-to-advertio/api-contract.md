# API contract — Crawler to Advertio (2026-10-21)

**The authoritative, complete wire specification** is maintained at [`docs/integrations/crawler.md`](../../docs/integrations/crawler.md), synchronized from GitLab `docs/CRAWLER-INTEGRATION.md` at `e36ba877` and corrected for `cargo_type` MultiSelect. This page indexes the contract rather than replacing its detailed field tables, error examples and curl samples.

| Operation | Endpoint | Expected outcome |
| --- | --- | --- |
| Media upload (Housing only under current crawler policy) | `POST /api/ingest/media?source={sourceName}` multipart `file` | `200` + reusable media `key` |
| Create/import | `POST /api/ingest/leads` | `201` new; `200 alreadyExisted=true` idempotent or duplicate |
| Delete a missing-source post | `DELETE /api/ingest/leads/{sourceName}/{externalId}` | `204` or `404` no existing source match |
| Deactivate source | `DELETE /api/ingest/sources/{sourceName}` | `200` and deactivated count |
| Category contract discovery | `GET /api/categories/{slug}/attributes` | Active category schema; takes slug, not GUID |
| Location discovery | `GET /api/locations/countries`, `/provinces`, `/cities` | Canonical city and province codes |
| Health before switching API host | `GET /health` | Verify active target deployment |

All ingest calls require header `X-Ingest-Key`. Envelope values include `sourceName`, `externalId`, `sourceUrl` and/or `contactHandle`, `title`, `description`, `categorySlug`, **string** `attributesJson`, `countryCode`, `province`, `city`, optional `posterTelegramUserId`, optional `mediaKeys` and `autoPublish`.

Cargo `passenger-cargo` required attributes: `origin_country`, `origin`, `destination_country`, `destination`. `role` and `travel_date` are optional; omitted role defaults to `traveler`. `cargo_type` is **MultiSelect**; new clients send arrays, old scalar payloads accepted and normalized. Jobs still requires `role`, `job_category` and `job_type`. Housing follows its own required schema.

`400` is a permanent schema/payload rejection, not transient retry. `200 alreadyExisted` is successful no-op. Details of `401`, `404`, `429` and 5xx are in [errors and retries](./errors-retries.md).

**Version control:** Do not duplicate enums or contract examples across unrelated pages. The complete category enum lists, location edge cases, limits and curls are in the full document linked above; the live category schema is final if documentation diverges.
