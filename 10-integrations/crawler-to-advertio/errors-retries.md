# Delivery error classification and retries (2026-10-21)

**Do not retry all non-2xx responses blindly.** Preserve raw and cleaned records, last HTTP status, request identity, attempt count and last failure classification in the upstream delivery queue.

| Result | Handling |
| --- | --- |
| `201` | Successful creation; record `leadId`, `status` and `alreadyExisted=false` |
| `200 alreadyExisted=true` | Successful no-op, possibly cross-source duplicate; **record** it, never blindly retry |
| `400` | Permanent schema/location/media/unknown-field rejection; quarantine, correct source mapping or data before manual re-send |
| `401` | Key missing/wrong; stop delivery batch and repair secret, not exponential retry |
| `404` on ingest API route | If no `INGEST_API_KEY` configured, routes may be unmapped; escalate deployment/configuration |
| `404` on `DELETE /leads/...` | No mapping for that source+ID (normal on cross-source-suppressed duplicate); record outcome |
| `429` | Throttling; honor server `Retry-After` if present, otherwise back off with jitter, reduce throughput/concurrency |
| `5xx`, connection errors, timeouts | Transient/ambiguous; bounded exponential backoff with original `sourceName`+`externalId`; server may have created the record before reply was lost |

Documented throughput planning is approximately **1,000 requests/day shared** by Housing, Cargo and Jobs, edge nginx **10/s burst 20**, suggested concurrency **2–3**. These are *documented configuration/rollout targets*, not verified real-time budgets. Include media POSTs in your request planning; do not run uncontrolled parallel uploads.

**Post-publication failures are different.** Telegram channel publishing: when sending a cover photo, only a **definite HTTP 400** rejection with no posted photo permits a text fallback (with stored `PhotoError`). Timeout, network drop, 429 or other ambiguous Telegram response must not trigger a parallel text post; keep/retry the photo send to avoid a duplicate.

**Collector disconnection:** the independent Telclaw crawler's own Telegram session connectivity must be handled in Telclaw; this GitLab receiver review does not prove the Telclaw reconnection code is deployed. Always distinguish collection retries, ingest retries and channel post retries in alerts.

Sources: [API `5–6](../../docs/integrations/crawler.md), [channel image fix](https://gitlab.com/advertio/platform/advertio-monorepo/-/commit/8b807d5029dbfc6f43ae623fbe99da12e05aeb5c).
