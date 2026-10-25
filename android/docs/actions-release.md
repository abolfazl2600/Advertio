# GitHub Actions: private signed release

Owner explicitly authorized the root `.github/workflows/android-private-release.yml` exception on 2026-10-25. Other Android work remains under `android/`. Refs #58. The workflow is manual (`workflow_dispatch`), main-only, with read-only GitHub permissions, SHA-pinned actions, no persisted checkout credential, no dependency cache, and no GitHub artifact/Release upload. Raw private tool output and exceptions are suppressed; temporary source/keys are cleaned. GitLab source is read-only and must be pinned/reviewed through the existing external source lock.

## One-time owner setup

1. In repository Settings → Environments create `android-release`. Restrict deployments to `main`, add required reviewers, and disable self approval where available. Review every main change before permitting secret-backed runs. Workflow checks do not replace these account-side controls.
2. Add the environment secrets below. Do not paste values into issues, workflow inputs or repository files.
3. Supply a short-lived HTTPS presigned PUT URL for a **private** object in owner-controlled storage. Do not use a public bucket/container, GitHub artifact or public Release. The workflow cannot establish bucket ACLs; the owner must verify private download access and retention. This upload URL is a capability secret and may need replacing before each run. It must accept Content-Type `application/vnd.android.package-archive`, return 200/201/204, and not redirect. The object host must match the separate host secret exactly.
4. Open Actions → Android private release → Run workflow → main; approve its protected environment deployment. Download the APK from your private storage. The job prints only a completion message and APK SHA256. Reuse the same release keystore and increment versionCode for subsequent app updates.

Required environment Secrets (exact names):

| Secret | Value |
| --- | --- |
| `ADVERTIO_SOURCE_LOCK_JSON` | Reviewed private lock: schema 1, GitLab HTTPS repository, immutable full SHA, `webPath=apps/web`, `packageManager=pnpm@11.9.0`, original source SHA256/ABSENT for every overlay target. See private-build.md. |
| `ADVERTIO_GITLAB_USER` | Read-only deploy-token username |
| `ADVERTIO_GITLAB_TOKEN` | Token with read_repository for the private source; no GitLab write scope |
| `ADVERTIO_KEYSTORE_BASE64` | Base64 of the existing encrypted release PKCS12; use the delivered release-key backup, not the debug key |
| `ADVERTIO_RELEASE_STORE_PASSWORD` | Existing private release store password |
| `ADVERTIO_RELEASE_KEY_ALIAS` | Existing release alias |
| `ADVERTIO_RELEASE_KEY_PASSWORD` | Existing private key password |
| `ADVERTIO_API_ORIGIN` | Reviewed exact HTTPS API origin, no path/query |
| `ADVERTIO_MEDIA_ORIGINS` | Comma-separated reviewed HTTPS media origins |
| `ADVERTIO_APK_UPLOAD_URL` | Short-lived presigned PUT URL to a private APK object |
| `ADVERTIO_APK_UPLOAD_HOST` | Exact hostname of the private upload service, no scheme/path |

The job uses Node24.19.0/npm11.9.0/pnpm11.9.0, runner JDK21 and SDK/build-tools36, the checksum-pinned Gradle wrapper, existing overlay/hash enforcement, actual TypeScript/Vite build, cap sync, signed release build and apksigner/debuggable validation. Public toolchain downloads happen before any private secrets are injected. Source fetch credentials are removed from disk after fetch; signing secrets are not passed to dependency installation. No Play publishing or AAB upload is performed. Package remains the provisional private sideload identity; Play release gates are unchanged.

## Verification and limits

PASS: Python compile, destination URL/redirect rejection tests, existing pipeline tests, YAML parsing and diff checks. NOT RUN: hosted end-to-end Actions build/delivery; required environment protections, private GitLab deploy token and private object-upload URL are not configured by this code change. Existing manual release build evidence is in private-release.md and does not prove the hosted workflow ran. Keep #58 open until a successful protected run, delivery ACL checks and failure-path acceptance are recorded.

The user authorized the single workflow path outside Android; the legacy guard-scope.sh still rejects that exception by design. Review changed paths explicitly rather than weakening the general scope guard. Rollback: disable the workflow, revoke the read token and upload capability, remove environment secrets if necessary, and revert this PR. Never revoke/delete the signing key needed for future installed-app updates.
