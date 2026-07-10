# Learnings

Durable operational lessons for future agents and maintainers.

## Helm Installer

- `helm repo update` without a repository name updates every repo configured on the user's machine. This can fail because of unrelated broken repos and block the installer even when `https://charts.aurva.ai/` is healthy.
- Installer logic should configure Aurva with `helm repo add aiostack https://charts.aurva.ai/ --force-update` and then run `helm repo update aiostack`.
- When Helm commands fail in installer scripts, print Helm's actual stderr/stdout so users are not left with a generic error.

## Helm Chart Repository

- Root `index.yaml` and root `aiostack-*.tgz` files form the chart repository.
- Keep `index.yaml` aligned with packages that exist at repo root.
- Current retention policy: keep `aiostack` chart versions `>= 3.0.0`; do not reintroduce `1.x` or `2.x` chart packages unless explicitly asked.

## Docs Site Build

- The docs app lives in `newdocs/` and uses Bun.
- The docs Docker image should use Debian slim, not Alpine, because native dependencies like `better-sqlite3` can fall back to musl/native builds and fail in `node-gyp`.
- The docs Dockerfile currently targets Node 26.
- Do not run local Docker builds unless explicitly asked.
- The GitHub workflow `Build & Publish — Docs Site` is `.github/workflows/bake.yaml` and is manually dispatchable with a `tag` input.

## Kubernetes Docs Deployment

- `kc` is not guaranteed to exist; use `kubectl`.
- Confirm context before patching Kubernetes.
- Known staging docs target:
  - namespace: `aiostack-docs`
  - deployment: `aiostack-docs`
  - container: `aiostack-docs`
  - image repository: `asia-south1-docker.pkg.dev/aurva-gcp/aiostack-docs/aiostack-docs`
- After patching, run `kubectl rollout status deployment/aiostack-docs -n aiostack-docs --timeout=180s`.
