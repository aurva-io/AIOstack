# Agent Operating Guide

This repository contains the public AIOStack installer, Helm chart repository files, Helm charts, and the `aurva.ai` docs site.

## Repo Map

- `install.sh`, `uninstall.sh`: root installer scripts used by public install commands.
- `newdocs/public/install.sh`, `newdocs/public/uninstall.sh`: hosted copies served by the docs site. Keep these in sync with the root scripts.
- `newdocs/`: Nuxt/Docus docs site. Uses Bun and `bun.lock`.
- `newdocs/Dockerfile`: docs image build. Do not run Docker locally unless explicitly asked.
- `.github/workflows/bake.yaml`: manual docs image build/publish workflow.
- `charts/aiostack/`: main AIOStack Helm chart.
- `charts/aiostack-docs/`: docs-site Helm chart.
- Root `aiostack-*.tgz` and `index.yaml`: Helm chart repository artifacts served from `https://charts.aurva.ai/`.
- `regenerate-helm.sh`, `regenerate-helm-advanced.sh`: chart packaging helpers.
- `docs/agent-runbooks.md`: task-specific runbooks for agents.
- `LEARNINGS.md`: durable public lessons learned while maintaining this repo.
- `memory.example.md`: template for local, private memory. Copy to `memory.md`; do not commit `memory.md`.

## Source Of Truth Rules

- If you modify `install.sh`, make the same relevant change in `newdocs/public/install.sh`.
- If you modify `uninstall.sh`, make the same relevant change in `newdocs/public/uninstall.sh`.
- `newdocs/bun.lock` is authoritative. Use Bun for docs dependency changes.
- `index.yaml` must not reference chart packages that do not exist at repo root.
- Root chart packages older than the current retention policy should not be reintroduced. Current policy: keep `aiostack >= 3.0.0`.
- Docs image registry is `asia-south1-docker.pkg.dev/aurva-gcp/aiostack-docs/aiostack-docs:<tag>`.

## Safety Rules

- Do not run local Docker builds unless the user explicitly asks.
- Do not patch Kubernetes resources unless the user explicitly asks and you have confirmed `kubectl config current-context`.
- Do not run global `helm repo update` in installer logic; update only the repo being configured.
- Do not commit local environment details, kubeconfig data, credentials, tokens, or secret values.
- Use `kubectl`, not the local-only alias `kc`.
- Prefer explicit file staging over `git add -A`.

## Standard Verification

Run the smallest relevant set for the change. `scripts/verify.sh` runs the broad local checks.

Installer/script changes:

```bash
bash -n install.sh
bash -n uninstall.sh
bash -n newdocs/public/install.sh
bash -n newdocs/public/uninstall.sh
```

Docs changes:

```bash
cd newdocs
bun install --frozen-lockfile
bun run build
```

Helm chart changes:

```bash
helm lint charts/aiostack
helm lint charts/aiostack-docs
scripts/verify-helm-repo.sh
```

Before committing:

```bash
git diff --check
git status -sb
```

## Common Commands

Use GitHub CLI for tickets, PRs, workflow dispatches, and CI inspection when available:

```bash
gh issue view <number>
gh issue create --title "<title>" --body-file <file>
gh pr create --draft --title "<title>" --body-file <file>
gh pr view <number>
gh run view <run-id>
```

Trigger docs image build:

```bash
scripts/publish-docs-image.sh website-v4.2 <branch>
```

Patch docs deployment after image publish:

```bash
scripts/patch-docs-image.sh website-v4.2
```

Regenerate main chart package and index:

```bash
./regenerate-helm.sh
scripts/verify-helm-repo.sh
```

## Pull Request Expectations

- Keep PRs scoped to one operational concern.
- Mention validation commands actually run.
- If Docker was not run locally, state that explicitly.
- If Kubernetes was patched, include context, namespace, deployment, image, and rollout result.
- Use an engineering-first PR body. Prefer concrete facts, commands, logs, and risk over product prose.
- Use `gh` to raise PRs when requested and write the body through `--body-file` to avoid shell interpolation.

Recommended PR body:

```md
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
```

## Issue / Ticket Expectations

Agents may use `gh issue view`, `gh issue list`, and `gh issue create` when asked to inspect or create tickets. Use an engineering-first issue body:

```md
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
```
