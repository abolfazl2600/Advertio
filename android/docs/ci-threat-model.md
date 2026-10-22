# Public repository CI threat model (#40)

| Threat | Control | Evidence |
|---|---|---|
| Fork/PR receives private token | Reviewed manual external runner only; no secret-backed public CI | No root workflow added |
| Moving source / drift | Full SHA and clean checkout | Synthetic negative tests |
| Credential in remote/error/config | External mode-0600 file + askpass; disabled helper/tracing/TLS exception; suppressed subprocess output | Command review; real token NOT RUN |
| Private source tracked | Staging outside any worktree; scope guard includes untracked and both rename ends | Location test and guard |
| Private output/log leakage | No public artifacts/cache/release; external private output | Operator ACL attestation required |
| Dependency script exfiltration | Reviewed lock, isolated disposable runner, restricted egress, no fetch token in build env | Operator responsibility; not guaranteed by script alone |
| Failed build leaves data | Finally cleanup; destroy runner after hard kill | Success/exception cleanup tests |
| Upstream writes | No upstream push/commit/tag; no branch remote added | Command review |

Public synthetic tests require no credentials. Owner approval and private artifact entitlement are release/private-build gates.
