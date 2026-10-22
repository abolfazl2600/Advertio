# Reviewed Android overlays

Public payloads contain original Android integration code only. An external private source lock maps every target to its expected SHA-256, or `ABSENT` for a new file. Public `manifest.json` binds each payload to its own SHA-256. The runner checks every entry before writing and refuses missing/changed pins, traversal, symlink escapes and duplicate targets.

No automatic fuzzy patching. Review a new source revision privately, rerun tests, then update the private lock/approval. A manifest is supplied with the adapter/networking work (#43/#44). Until then full UI builds intentionally fail closed.
