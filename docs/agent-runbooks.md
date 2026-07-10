# Agent Runbooks

Use these recipes for common maintenance tasks. Confirm destructive or production-affecting operations with the user before running them.

## Fix Installer Scripts

1. Edit the root script.
2. Mirror relevant changes into the hosted docs copy.
3. Validate syntax.

```bash
bash -n install.sh
bash -n newdocs/public/install.sh
```

For uninstall changes:

```bash
bash -n uninstall.sh
bash -n newdocs/public/uninstall.sh
```

Installer Helm repo setup should update only the Aurva repo:

```bash
helm repo update aiostack
```

Avoid global `helm repo update` in installer code.

## Verify Docs App Changes

```bash
cd newdocs
bun install --frozen-lockfile
bun run build
```

Do not run Docker locally unless explicitly asked.

## Publish Docs Image

Workflow: `.github/workflows/bake.yaml` (`Build & Publish — Docs Site`)

Default target registry: Google Artifact Registry.

```bash
scripts/publish-docs-image.sh <image-tag> [branch]
```

Equivalent raw command:

```bash
gh workflow run bake.yaml --ref <branch> -f tag=<image-tag>
```

Check the run:

```bash
gh run list --workflow bake.yaml --branch <branch> --limit 5
gh run view <run-id>
```

## GitHub Tickets And Pull Requests

Use `gh` for GitHub issue, PR, workflow, and CI operations when available.

Inspect tickets:

```bash
gh issue view <number>
gh issue list --state open --limit 20
```

Create a ticket with a body file:

```bash
cat > /tmp/issue-body.md <<'EOF'
## Problem
What is broken or needed.

## Evidence
- Exact logs, command output, screenshots, links, or reproduction steps.

## Impact
Who or what is blocked; severity and scope.

## Expected Behavior
What should happen instead.

## Proposed Direction
The smallest known viable fix or investigation path.

## Open Questions
Decisions or missing data needed to proceed.
EOF

gh issue create --title "<specific engineering title>" --body-file /tmp/issue-body.md
```

Create a PR with a body file:

```bash
cat > /tmp/pr-body.md <<'EOF'
## Problem
What failed or what gap exists. Include exact error text or affected workflow when possible.

## Root Cause
Why it happened, or state the current best hypothesis if not fully proven.

## Change
- Concrete implementation change 1.
- Concrete implementation change 2.

## Verification
- `command that passed`
- `command that was intentionally not run` and why.

## Risk / Rollback
Expected blast radius and how to revert.
EOF

gh pr create --draft --title "<specific engineering title>" --body-file /tmp/pr-body.md
```

Avoid vague issue or PR bodies. Lead with reproducible facts, impact, and validation.

## Patch Docs Deployment

Only do this when explicitly asked. Confirm the context first.

```bash
kubectl config current-context
kubectl get deploy aiostack-docs -n aiostack-docs -o wide
scripts/patch-docs-image.sh <image-tag>
```

Raw command:

```bash
kubectl set image deployment/aiostack-docs \
  aiostack-docs=asia-south1-docker.pkg.dev/aurva-gcp/aiostack-docs/aiostack-docs:<image-tag> \
  -n aiostack-docs

kubectl rollout status deployment/aiostack-docs -n aiostack-docs --timeout=180s
```

Rollback to the previous ReplicaSet if needed:

```bash
kubectl rollout undo deployment/aiostack-docs -n aiostack-docs
kubectl rollout status deployment/aiostack-docs -n aiostack-docs --timeout=180s
```

## Regenerate Helm Chart Repository

Package the main chart:

```bash
./regenerate-helm.sh
```

Package a specific chart:

```bash
./regenerate-helm-advanced.sh aiostack 4.0.1
```

Validate repository consistency:

```bash
scripts/verify-helm-repo.sh
```

Before committing, check:

```bash
git diff -- index.yaml
ls -1 aiostack-*.tgz
```

Current retention policy: keep `aiostack >= 3.0.0`.

## Rebase A PR Branch

```bash
git status -sb
git pull --rebase origin main
```

If `index.yaml` conflicts, preserve newer chart metadata from `main` while enforcing the retention policy.

After resolving:

```bash
git add <resolved-files>
GIT_EDITOR=true git rebase --continue
git push --force-with-lease
```
