#!/usr/bin/env bash
set -euo pipefail

tag="${1:-}"
branch="${2:-$(git branch --show-current)}"

if [[ -z "$tag" ]]; then
  echo "usage: $0 <image-tag> [branch]" >&2
  exit 1
fi

if [[ -z "$branch" ]]; then
  echo "ERROR: branch is empty; pass a branch explicitly" >&2
  exit 1
fi

gh workflow run bake.yaml --ref "$branch" -f tag="$tag"
