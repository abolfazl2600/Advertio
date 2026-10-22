#!/usr/bin/env bash
set -euo pipefail
repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"
base_ref="${1:-HEAD}"
git rev-parse --verify "${base_ref}^{commit}" >/dev/null
failed=0
check_paths() {
  local file
  while IFS= read -r -d '' file; do
    case "$file" in
      android/*) ;;
      *) printf 'OUT-OF-SCOPE: %s\n' "$file" >&2; failed=1 ;;
    esac
  done
}
# Check both ends of a rename and include staged, unstaged and untracked paths.
check_paths < <(git diff --no-renames --name-only -z "$base_ref" --)
check_paths < <(git diff --no-renames --cached --name-only -z --)
check_paths < <(git ls-files --others --exclude-standard -z)
if (( failed )); then
  printf 'Scope check FAILED. Only android/ paths are allowed.\n' >&2
  exit 1
fi
printf 'Scope check PASS: all changed/untracked files are under android/.\n'
