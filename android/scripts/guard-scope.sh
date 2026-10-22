#!/usr/bin/env bash
# Fail if an AI agent modifies any tracked/untracked path outside android/.
# Usage from any directory: bash android/scripts/guard-scope.sh [BASE_REF]
set -euo pipefail
repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"
base_ref="${1:-HEAD}"
failed=0

check_path() {
  local file="$1"
  # Git paths are NUL-delimited and remain UTF-8, independent of core.quotepath.
  case "$file" in
    "android/"*) ;;
    *)
      printf 'OUT-OF-SCOPE: %s\n' "$file" >&2
      failed=1
      ;;
  esac
}
while IFS= read -r -d '' file; do check_path "$file"; done < <(
  git diff --name-only -z "$base_ref" -- 2>/dev/null
)
while IFS= read -r -d '' file; do check_path "$file"; done < <(
  git ls-files --others --exclude-standard -z
)
if (( failed )); then
  printf 'Scope check FAILED. Only android/ paths are allowed.\n' >&2
  exit 1
fi
printf 'Scope check PASS: all changed/untracked files are under android/.\n'
