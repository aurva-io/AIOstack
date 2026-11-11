# Security remediation — 2026-11-11

## Dependency audit

`bun audit` initially reported **199 advisories** (7 critical, 82 high,
84 moderate, 26 low). After remediation it reports **1 low advisory**;
no critical, high, or moderate advisories remain in the locked dependency tree.
These are scanner-reported counts, not a claim about exploitability or the
security of deployed container images.

- Nuxt: 4.4.5 → 4.6.4; better-sqlite3: 12.10.0 → 12.11.1.
- Docus is constrained to `^5.15.0` instead of the unbounded `latest` tag.
- Refreshed all transitive resolutions and pinned Bun to 1.3.14 in the manifest,
  Docker build, and CI.
- Temporary overrides: esbuild 0.28.2, glob 14.0.4, minimatch 11.0.7, Zod 4.6.7.
  Upstream constraints otherwise retain affected versions. These cross some
  upstream major/minor constraints; production build and content smoke checks
  passed, including blog author/read-time fields and generated collection types.
  Remove overrides when parent packages admit patched releases, then re-audit
  and rebuild. Never remove them solely to silence peer warnings.

### Unresolved upstream advisory

`@rollup/plugin-node-resolve` still requires `deepmerge@4.3.1`, affected by
[GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).
The advisory lists **no patched release**. It is used in the build dependency
chain; this is not an accepted risk or a suppression. Recheck the upstream
resolver/merge package before the customer audit. The new CI audit intentionally
fails while this finding remains, including low-severity findings.

## Other changes

- Publish workflow actions pinned to immutable commits. Image tags pass through
  an environment variable and strict Docker-tag validation before shell use.
  Checkout no longer persists credentials; removed unused OIDC permission and
  unrelated AWS login during GCP-only publishing. This follows
  [GitHub's workflow hardening guidance](https://docs.github.com/en/actions/reference/security/secure-use).
- Added weekly Dependabot updates for Bun, Docker, and Actions, plus PR/push/
  weekly audit and build checks. These become active after landing on GitHub.
- Excluded local environment files from Git and secrets/generated files from
  the docs Docker build context.
- Replaced AI-flow example credentials with Kubernetes Secret references,
  added a private-file credential generator and regression tests, disabled
  Airflow configuration exposure, and added namespace-only ingress policy.
  Existing installations require coordinated credential migration/rotation;
  see the AI-flow README. No live credentials or cluster resources were changed.

## Verification

- `bun install --frozen-lockfile`: passed.
- `bun run build`: passed with the patched dependency graph.
- Built Node server: HTTP 200 and expected content on `/`, `/blog`,
  `/blog/introducing-aiostack`, and `/docs/getting-started/introduction`.
- Generated blog collection types retain author, readTime, and keywords.
- Credential generator: randomness/connection consistency, file mode 0600,
  overwrite refusal, and symlink refusal passed; 30 environment Secret
  references resolve to generated keys.
- Image-tag checks accepted valid/default tags and rejected invalid tags,
  newline injection, and shell command substitution without executing them.
- YAML parsing, shell syntax, both main/docs Helm lints, Helm repository
  consistency, and `git diff --check`: passed.
- Trivy filesystem secret scan found no secrets in scanned files. Local
  `creds.env`, Git history, and generated dependency/build directories were
  excluded. The configuration scan used embedded rules because the installed
  Docker credential helper was unavailable; it is not an up-to-date full audit.
- No Docker build or Kubernetes deployment was performed.

## Remaining audit scope

This repository is **not yet free of all security findings**:

1. Resolve or formally assess the remaining deepmerge advisory above.
2. Scan the actual published docs, observer, outpost, n8n, and ML example image
   digests (OS and language packages). Their internals are not covered by Bun's
   lockfile audit. Several example images use `latest`, Airflow is still 2.8.1,
   etcd is 3.5.12, and Python packages install at startup. Upgrading this sample
   platform needs integration testing, especially Airflow database/CLI changes.
3. Trivy flags privileged mode, host PID/host mounts and SYS_ADMIN on the eBPF
   observer, plus missing container restrictions elsewhere. Review these with
   the observer implementation and supported kernels; changing them blindly
   can disable instrumentation. Historical published chart archives retain
   their original settings and were not rewritten.
4. The ML examples remain disposable traffic generators, with some
   unauthenticated internal services. Namespace isolation requires an enforcing
   CNI and does not replace authentication, TLS, or production hardening.
5. GitHub returned no Dependabot alerts or open PRs, and no CodeQL analysis.
   Automatic Dependabot security updates and secret scanning/push protection
   were disabled at inspection. Reading secret-scanning alerts requires the
   `admin:repo_hook` scope missing from this CLI token. An administrator should
   enable the relevant features and review Git history; settings were not changed.
6. Publish and deploy patched images after review. Local source changes do not
   remediate already-running workloads. No findings were dismissed or hidden.
