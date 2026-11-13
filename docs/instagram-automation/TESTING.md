# Testing

Unit tests are in `backend/tests/Advertio.UnitTests/InstagramAutomationTests.cs`. They do not call Meta and do not need a token.

```bash
dotnet test backend/tests/Advertio.UnitTests/Advertio.UnitTests.csproj --filter InstagramAutomationTests
```

Last run during implementation: 18 passed.

Covered:

- Valid and invalid `X-Hub-Signature-256`
- Signed comment payload and a stable provider key
- Persian normalization (`ي/ی`, `ك/ک`, ZWNJ, digits, case, punctuation)
- Keyword match, non-match, per-media selection, disabled rules
- Dry-run, existing reservation, comment older than 7 days
- Cargo state transitions and an invalid date
- 24-hour messaging window
- Human handoff
- Missing, expired, and under-permissioned credentials
- HTTP 429, 5xx, and timeout outcomes
- Private reply body uses `recipient.comment_id`
- Echo messages are not a trigger
- Real `/apps/passenger-cargo/new` URL and UTM parameters
- Local send budget

Integration tests set `Instagram__WorkerEnabled=false` so the worker does not run beside other API tests. A full webhook round-trip against PostgreSQL was not executed in this pass.

Live Instagram delivery, App Review, and a real Cargo Reel media id were not tested. Those need the Meta app and the production account.
