# Android without digital purchasing (#47)

Purchases and credit spending are compile-time false in payments/policy.mjs. No remote flag enables them. The wallet page is a static future-version card and has no balance/history queries; Wallet is hidden from the footer. See [welcome-guest.md](welcome-guest.md). Legacy purchase-history adapters remain read-only. All BuyCoinsSheet callers, including insufficient-balance flows, render only «خرید سکه به‌زودی فعال می‌شود» and a dismiss button; provider hooks cannot fetch packs, start top-up/manual payment, await a credit or refund. No Stripe/Stars/manual checkout is created.

Defense layers installed before importing the private React entrypoint:
- Request interceptor rejects purchase/provider routes, all wallet operations except balance/transaction/payment-history GETs, and potentially credit-consuming publishing/renew/boost/contact/identity-verification mutations until policy sign-off. This intentionally blocks even free posting when it shares a potentially charging endpoint; never infer cost client-side.
- Initial/direct/encoded/nested purchase routes, popstate/hash navigation and history writes route to the static future wallet; payment guards still use the exact purchase notice. API and provider guards remain authoritative if a UI handler is invoked directly.
- Payment CTA elements are disabled and replaced by the notice before React click handlers run, including newly mounted elements. This is supplementary to the network/provider boundaries, not the sole defense.
- Native WebView navigation cannot launch remote intents. window.open is routed through native policy. Native external browser links fail closed except a one-use bot login link explicitly granted by the existing HTTPS auth response. No general external browser/purchase link is offered. One-time auth handoff validation is in the #45 bot hook overlay.

The conservative external-link policy also blocks general advertiser/support links until a separately reviewed nonpayment allowlist is implemented; it never assumes that an arbitrary Telegram bot is a safe payment destination. Auth links need one start parameter, a plain Telegram bot path and no encoded/payment/manual-payment tokens. App-link return remains #49.

## Policy decision

Current presentation: balance/history are hidden and Wallet is a future feature. The defensive request policy still allows legacy read-only balance/history GETs; spending and all purchase methods remain disabled pending owner/Play review in #56. No assertion of Google Play approval. Re-enable requires a reviewed implementation/policy change, never a URL, query flag or API payload. Refund handling outside Android is an owner support decision; this app exposes no provider action/link.

Merge #45 native installer and secure session first, plus public foundation #41. manifests/47.json explicitly supersedes only known public overlay hashes; private source pins remain outside Git. The entrypoint waits for native navigation policy installation before starting React. A fixed startup error replaces an unsafe partial start.

Tests: `node --test android/tests/payments/*.test.mjs` covers read-only exceptions, blocked mutations, double-encoded/nested/direct checkout, unknown external URLs, one-shot auth links and manual payment links. Real UI traversal/screenshots, all private UI CTA variations, direct WebView navigation and physical-device provider checks: NOT RUN (authorized private build/device prerequisites and #63). Do not mark all acceptance PASS from policy unit tests. Rollback: revert #47 overlays/module/fragment and rebuild reviewed pins; do not distribute an older payment-enabled build.
