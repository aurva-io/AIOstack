# Local Agent Memory

Copy this file to `memory.md` for private local notes. Do not commit `memory.md`.

Allowed content:

- Preferred local branch naming.
- Non-secret Kubernetes context names.
- Non-secret namespace/deployment/container names.
- User preferences, such as "do not run Docker locally unless explicitly asked".
- Common commands that are specific to your machine.

Never store:

- Credentials, tokens, passwords, kubeconfig contents, secret values, private keys, or session cookies.
- Customer data or sensitive production data.

Example:

```md
# Local Agent Memory

- Do not run Docker locally unless explicitly asked.
- Use `kubectl`, not `kc`.
- Staging docs context: `gke_aurva-gcp_asia-south1_aurva-default-staging-gke`
- Docs deployment: namespace `aiostack-docs`, deployment `aiostack-docs`, container `aiostack-docs`.
```
