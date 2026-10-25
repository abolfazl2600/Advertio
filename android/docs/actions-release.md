# GitHub Actions: signed APK artifact

Owner explicitly authorized the root workflow exception and then requested that the APK be delivered in GitHub Actions itself, after being informed this repository is public. This supersedes the earlier external/private object-storage delivery design. Only the verified signed APK may be uploaded; source checkouts, private source locks, signing keys/passwords, recovery files and raw build logs remain prohibited in GitHub artifacts/commits. Refs #58.

## One-time setup

1. Settings → Environments → `android-release`: restrict deployment to main and configure required reviewers. Review secret-backed changes before approval.
2. Add the nine environment Secrets below. Do not put values in workflow inputs, files, issues or Variables.
3. Actions → Android signed release APK → Run workflow → main; approve the environment deployment if required.
4. After all steps succeed, open the run Summary, scroll to Artifacts and download `Advertio-release-<run number>`. Extract its ZIP to obtain `Advertio-release.apk`. Artifacts are retained for three days; download before expiration. Repository readers with the necessary GitHub sign-in/access can retrieve the artifact; this is not private delivery. Platform storage quotas/retention policies still apply.

| Secret | Value |
| --- | --- |
| `ADVERTIO_SOURCE_LOCK_JSON` | Reviewed private source lock with schema, repository, immutable full SHA, packageManager pnpm@11.9.0, webPath apps/web and original SHA256/ABSENT pins for every overlay target |
| `ADVERTIO_GITLAB_USER` | Read-only deploy-token username |
| `ADVERTIO_GITLAB_TOKEN` | Token with read_repository for private source |
| `ADVERTIO_KEYSTORE_BASE64` | Base64 of the owner's retained encrypted release PKCS12, not a debug key |
| `ADVERTIO_RELEASE_STORE_PASSWORD` | Release store password |
| `ADVERTIO_RELEASE_KEY_ALIAS` | Release alias |
| `ADVERTIO_RELEASE_KEY_PASSWORD` | Release key password |
| `ADVERTIO_API_ORIGIN` | Reviewed exact HTTPS API origin |
| `ADVERTIO_MEDIA_ORIGINS` | Comma-separated reviewed HTTPS media origins |

`ADVERTIO_APK_UPLOAD_URL` and `ADVERTIO_APK_UPLOAD_HOST` are no longer used or required; remove obsolete values if previously configured. No external storage account is required. Existing users who configured seven entries need only the two GitLab read credentials to complete the configuration. Keep the same signing key and increase versionCode for later installed-app updates.

## Implementation and verification

Manual main-only job, protected environment, read-only GitHub permissions, SHA-pinned actions, no persisted checkout credentials, checksum-pinned SDK CLI22, Node24.19.0/npm11.9.0/pnpm11.9.0/JDK21/SDK36, reviewed immutable GitLab source, source/payload hash verification, frozen dependencies, TypeScript/Vite/native/sync/release build, apksigner and non-debuggable validation. Only after those checks does the builder copy the APK into a dedicated artifact directory. Upload uses an exact single APK path, fails if absent, and runs only after a successful build. Signing inputs are not passed to dependency installation; private tool output stays suppressed. Artifact and private staging directories are cleaned after upload/failure. No public GitHub Release or Play publication is performed.

PASS: eight pipeline tests, including APK-only staging, symlink rejection, secret-value non-disclosure and nine-entry configuration without an external destination; YAML parsing and artifact path/config checks; diff check. Existing source/hash tests remain included. Hosted end-to-end artifact upload NOT RUN for this revision: it requires configured environment Secrets and a new main dispatch. Earlier runs passed public tests/SDK setup but stopped at missing Secrets. Keep #58 open until actual protected build/upload and failure-path acceptance.

Rollback: revert this change, delete any generated artifacts if desired, and restore a reviewed delivery strategy. Never delete/revoke the retained app signing key needed for future upgrades. The legacy Android-only guard is unchanged; explicit owner authorization covers the single root workflow path.
