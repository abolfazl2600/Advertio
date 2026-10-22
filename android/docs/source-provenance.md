# Secure source acquisition (#40)

Source repository and exact SHA belong to an external owner-only lock file, following `../source-lock.example.json`. The public example is deliberately unusable. Never use a moving branch. No private source or audit metadata is published by this implementation.

`source_workspace.py` fetches only the lock's validated HTTPS GitLab repository/SHA into an owner-only ASCII temporary directory outside Git. It has no push/commit/tag command. Deploy-token username is `ADVERTIO_GITLAB_USER`; token is an external mode-0600 file read through askpass, never a URL, CLI argument, config, log or repo file. Provision read_repository only, with expiry and rotation. Connector permissions cannot be exported as a deploy token.

Build scripts execute private code: run reviewed source on a disposable isolated private runner with no unrelated credentials and restricted egress. No private public-Action builds, fork secrets, pull_request_target, public caches/logs/artifacts/releases. Output must remain outside the public worktree. Cleanup covers success/exceptions; SIGKILL requires ephemeral runner destruction.

## Owner decision: BLOCKED

Historical foundation status: the current owner request now authorizes a private debug build and private APK delivery, recorded in the external approval record. See [first-debug.md](first-debug.md) for the pinned connector snapshot path. Public source/bundle/audit disclosure and production release remain outside that debug authorization.

Public repo contains original Android glue only. Source/derived-bundle distribution rights, runner operator, artifact ACL and retention need owner sign-off in an access-controlled system. No approval is inferred. #42 requires an external approval record tied to the source lock, plus private output location. Never paste tokens or agreements into public issues.

Verification: `python3 -m unittest discover -s android/tests/source -v`. Synthetic fixtures test clean SHA, invalid locks, staging location and cleanup. Actual deploy-token fetch and owner decision NOT RUN/BLOCKED. This is infrastructure implementation, not completed distribution approval.
