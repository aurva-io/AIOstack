#!/usr/bin/env bash
set -euo pipefail

tag="${1:-}"
namespace="${DOCS_NAMESPACE:-aiostack-docs}"
deployment="${DOCS_DEPLOYMENT:-aiostack-docs}"
container="${DOCS_CONTAINER:-aiostack-docs}"
repository="${DOCS_IMAGE_REPOSITORY:-asia-south1-docker.pkg.dev/aurva-gcp/aiostack-docs/aiostack-docs}"

if [[ -z "$tag" ]]; then
  echo "usage: $0 <image-tag>" >&2
  exit 1
fi

context="$(kubectl config current-context)"
echo "Kubernetes context: $context"
echo "Patching ${namespace}/${deployment}:${container} to ${repository}:${tag}"

kubectl set image "deployment/${deployment}" "${container}=${repository}:${tag}" -n "$namespace"
kubectl rollout status "deployment/${deployment}" -n "$namespace" --timeout=180s
kubectl get deploy "$deployment" -n "$namespace" -o wide
