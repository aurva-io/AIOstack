#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

echo "== git whitespace =="
git diff --check

echo "== shell syntax =="
bash -n install.sh
bash -n uninstall.sh
bash -n newdocs/public/install.sh
bash -n newdocs/public/uninstall.sh

if command -v helm >/dev/null 2>&1; then
  echo "== helm lint =="
  helm lint charts/aiostack
  helm lint charts/aiostack-docs
  scripts/verify-helm-repo.sh
else
  echo "WARN: helm not found; skipping Helm checks" >&2
fi

if command -v bun >/dev/null 2>&1; then
  echo "== docs dependencies/build =="
  (
    cd newdocs
    bun install --frozen-lockfile
    bun run build
  )
else
  echo "WARN: bun not found; skipping docs checks" >&2
fi
