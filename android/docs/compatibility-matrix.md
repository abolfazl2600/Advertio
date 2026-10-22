# Required Android compatibility / verification status (#39)

This matrix restates public acceptance scope only. Source-derived observations are withheld pending permission; it must not be used as a completed private-code audit.

| Public requirement | Implementation lane | Acceptance status |
|---|---|---|
| Three listing journeys, search and details | Reuse UI in authorized private staging | Real UI/device NOT RUN |
| Saved/profile/post/my listings | Existing accounts and API | NOT RUN |
| PhoneGate/OTP and same accounts | Follow-up #45 | NOT RUN |
| Native Google login | Deferred #46 / PR #70; disabled in current version | Gate only when enabled in a later version |
| No purchase/top-up paths | Follow-up #47 | Release gate |
| Android back/lifecycle/haptic/links | Original overlay #43 | Synthetic unit tests PASS; device NOT RUN |
| HTTPS API/media | Original networking #44 | Policy unit tests PASS; deployment CORS BLOCKED #63 |
| Keystore session vault | Follow-up #45/#53 | Release gate |
| Native debug shell | Foundation #41 | cap sync/typecheck PASS; Gradle download FAIL; install NOT RUN |

No row asserts that source inspection or synthetic tests prove physical-device behavior.
