# Native Google Sign-In (#46 / Jira AD-49)

Original local Capacitor plugin AdvertioGoogleSignIn uses AndroidX Credential Manager, its Play Services provider and GetSignInWithGoogleOption (explicit user button). No GIS script, OAuth URL, embedded WebView or fallback browser login is used. Android-only useGoogleLogin preserves the existing button-ref interface but invokes native credential UI. The ID token is passed unchanged to the existing auth provider API; only the resulting Advertio user id/token is accepted by #45's secure session. PhoneGate remains unmodified and phone verification is never set by the Google client.

Dependencies pinned: credentials / credentials-play-services-auth 1.6.0, googleid 1.1.1. Module installed by #45's native installer into the public #41 skeleton. Private build accepts --google-client-id, feeds a native Android resource via environment/Gradle property, and does not inject a client id from WebView JS. Missing config disables the button; no insecure fallback. No real OAuth identifiers, secrets or signing material are committed.

Logout dispatches native clearCredentialState; a request generation/cancellation guard rejects late credentials and duplicate requests. The JS coordinator also rejects late API results after local logout. No raw plugin exception, ID token or API credential is logged. Clear failure does not restore a locally logged-out session.

## Owner/cloud runbook — BLOCKED for actual login

1. Approve final package identity; development identity is not Play-approved.
2. Create Android OAuth clients with SHA-1 and SHA-256 for debug, upload, and Play App Signing certificates; use a Web/server client id as the native request audience.
3. Supply the id privately using --google-client-id or advertioGoogleWebClientId on the authorized runner. No client secret belongs in Android.
4. API owner must verify signature, issuer, audience, expiry and supported account-linking semantics. No endpoint/audience bypass is implemented. Backend nonce/replay behavior requires owner verification; a client-only nonce would not prove replay protection, so no unsupported nonce endpoint is invented.
5. Test existing/new/linked accounts, wallet/listings identity, unverified-phone PhoneGate, cancellation, 401, logout, multiple accounts, debug and Play-internal install. Replay rejection is an explicit server test, not claimed from mock tests.

References: https://developer.android.com/identity/sign-in/credential-manager-siwg-implementation ; https://developer.android.com/reference/androidx/credentials/CredentialManager ; https://developer.android.com/jetpack/androidx/releases/credentials ; https://advertio24.atlassian.net/browse/AD-49 . Official API signatures reviewed on 2026-10-22. Jira source content is not reproduced in this public document.

Verification: `node --test android/tests/auth/google.test.mjs` passes backend-identity-only, cancellation, concurrent request, 401 and late-credential/API-result cases. Native Java/Gradle compile and real credential UI NOT RUN (JDK21/SDK36/device and foundation #41 pending); cloud client/signing/audience/account/linking/Play/replay tests NOT RUN; #63 CORS remains blocking. No real Google login, duplicate-account guarantee or Play acceptance is claimed. Refs #46 until all acceptance passes. Rollback: revert module/hook/fragment and rebuild privately.
