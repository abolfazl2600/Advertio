# Private debug build runner (#42)

Depends on #40 source workspace and #41 mobile project; merge foundation PRs first. Script: `scripts/build-private.py`. This is a manually invoked external/private runner, never public GitHub Actions. It checks immutable SHA, exact payload/source hashes, owner decision bound to source-lock hash, HTTPS API origin allowlist, upstream frozen pnpm lock and npm mobile lock; then Vite -> local www -> cap sync -> Gradle debug. Finally removes all staging. No GitLab write/push and no public source/bundle upload.

Inputs are outside Git: source lock, mode-0600 deploy token, approval record, new private output path. Source lock extends the example with `files: { "apps/web/target.ts": "<sha256>", "apps/web/new.ts": "ABSENT" }`. These hashes must be reviewed privately, never learned/updated automatically at build time. Approval has `owner`, `approvalReference`, `privateRunner`, `privateArtifactPolicy`, `purpose: "private-debug-build"`, `sourceLockSha256`. The script validates record shape/binding; the operator must verify owner authorization and ACLs. It cannot establish organizational approval from a JSON file alone.

```bash
python3 android/scripts/build-private.py \
  --source-lock /secure/source-lock.json --approval /secure/owner-decision.json \
  --token-file /secure/read-token --output /secure/output/build-001 \
  --api-origin https://api.example.invalid --api-allowlist https://api.example.invalid --media-origins https://media.example.invalid
```

The example API is deliberately invalid. Set the verified production origin/allowlist privately. Use Node 24.19.0/npm 11.9.0, Corepack with pnpm 11.9.0, JDK 21 and SDK 36. Deploy token username is ADVERTIO_GITLAB_USER. No release signing supported.

Build twice to distinct output directories. Compare sourceLockSha256, overlayManifestSha256 and webAssets in the two private manifests. Record actual package/tool versions and APK hashes; do not promise byte-identical APKs (debug signing/timestamps may vary). Manifests themselves include private source metadata and stay private. Both real UI/APK runs and device launch are NOT RUN/BLOCKED pending owner decision, runner and private token. The synthetic test proves deterministic overlay application only, not APK reproducibility.

Run tests: `python3 -m unittest discover -s android/tests/pipeline -v`. Rollback: revert runner/overlay commit. No server changes or external CI workflows.
