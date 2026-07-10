#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

index_file="index.yaml"

if [[ ! -f "$index_file" ]]; then
  echo "ERROR: $index_file not found" >&2
  exit 1
fi

missing=0

echo "== validating index.yaml package references =="
while IFS= read -r package_name; do
  [[ -z "$package_name" ]] && continue
  if [[ ! -f "$package_name" ]]; then
    echo "ERROR: $index_file references missing package: $package_name" >&2
    missing=1
  fi
done < <(awk '/https:\/\/charts\.aurva\.ai\/.*\.tgz/ { sub(/^.*\//, "", $2); print $2 }' "$index_file" | sort -u)

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "== validating local aiostack packages are indexed =="
shopt -s nullglob
for package_path in aiostack-*.tgz; do
  package_name="$(basename "$package_path")"
  if ! grep -Fq "https://charts.aurva.ai/${package_name}" "$index_file"; then
    echo "ERROR: local package is not indexed: $package_name" >&2
    missing=1
  fi
done
shopt -u nullglob

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "== enforcing aiostack chart retention policy =="
if ls aiostack-1.*.tgz aiostack-2.*.tgz >/dev/null 2>&1; then
  echo "ERROR: aiostack chart packages older than 3.0.0 are present" >&2
  exit 1
fi

if grep -Eq 'aiostack-[12]\.|version: [12]\.' "$index_file"; then
  echo "ERROR: $index_file contains aiostack chart entries older than 3.0.0" >&2
  exit 1
fi

if command -v helm >/dev/null 2>&1; then
  echo "== validating chart archives =="
  shopt -s nullglob
  for package_path in aiostack-*.tgz; do
    helm show chart "$package_path" >/dev/null
  done
  shopt -u nullglob
else
  echo "WARN: helm not found; skipping archive parse check" >&2
fi

echo "Helm repository metadata is consistent."
