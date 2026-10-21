# Authentication and endpoint security (2026-10-21)

The ingest API is an **external server-to-server boundary**, not the native user's `POST /api/leads` route.

1. Include `X-Ingest-Key` on **every** request to `/api/ingest`. The server obtains its secret from `INGEST_API_KEY`. Key must be at least 32 characters; use a cryptographically random value provisioned through environment/secret management.
2. Do not place this key in GitHub/GitLab, client JavaScript, public documentation, request body, query string, structured logs, traces or error dumps. Redact headers on HTTP failure.
3. Wrong/missing key → `401`; when the receiver's key is *not configured* at all, the whole route group can be absent and return `404`. Distinguish this from a `404` returned **for a deleted/not-found source identity**.
4. The integration guide specifies a configurable `api.advertio.ir` hostname rather than hardcoding app origin. GitLab marks its DNS/TLS/Cloudflare rollout as **unverified live** in the source document. Validate name resolution, TLS and `GET /health` before redirecting actual crawler deliveries.
5. Media upload's `source` must match lead `sourceName`, and `mediaKeys` must come from that same source's uploads; the server rejects mismatched keys.
6. Only sender identity actually exposed by Telegram may populate `posterTelegramUserId`; never substitute a channel/chat ID or fabricate ownership.

The receiving endpoint is intentionally outside the standard app rate bucket. The source documents nginx **10 requests/sec, burst 20** per IP and an approximate Cloudflare **1,000 requests/day** shared across all crawler journeys; both depend on edge deployment/configuration, so verify before treating them as a service guarantee.

See [full auth/response table](../../docs/integrations/crawler.md), [retry policy](./errors-retries.md).
