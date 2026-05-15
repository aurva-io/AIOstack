# AIOStack Installation Guide

This document covers everything you need to install AIOStack on a Kubernetes cluster — the one-line installer, manual Helm installation, cloud IAM setup, and uninstallation.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Cloud IAM Setup](#cloud-iam-setup)
- [Configuration Options](#configuration-options)
- [CLI Reference](#cli-reference)
- [Post-Installation](#post-installation)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)
- [Support](#support)

---

## Quick Start

The fastest path:

```bash
curl -fsSL https://aurva.ai/install.sh | bash
```

The script is interactive — it detects your cluster, asks for Aurva credentials, generates copy-paste IAM commands for AWS/GCP, and runs the Helm install. Plan on 10 minutes end to end.

---

## Prerequisites

### Required tools

- **Helm 3.x** — [helm.sh/docs/intro/install](https://helm.sh/docs/intro/install/)
- **kubectl** — [kubernetes.io/docs/tasks/tools](https://kubernetes.io/docs/tasks/tools/)
- Configured cluster context (`kubectl get nodes` must succeed)

### Cluster requirements

- Kubernetes **1.29+** with eBPF support (EKS, GKE, AKS qualify out of the box)
- Linux kernel **5.15+** on worker nodes

### Aurva account

Sign up at [app.aurva.ai/signup](https://app.aurva.ai/signup) to get a **Company ID** and **Validation Key**. The installer will prompt for these.

### Cloud IAM (recommended)

To enable IAM, RDS, and S3 inventory the outpost needs read-only cloud access:

- **AWS** — IAM Role for Service Account (IRSA) on EKS
- **GCP** — Workload Identity on GKE

The installer prints the exact commands. See [Cloud IAM Setup](#cloud-iam-setup) below.

---

## Installation Methods

### Method 1 — One-line installer (recommended)

```bash
curl -fsSL https://aurva.ai/install.sh | bash
```

What it does:

1. Checks prerequisites (Helm, kubectl, cluster reachability)
2. Detects cluster, region, and cloud provider
3. Prompts for Aurva credentials and namespace
4. Generates pre-populated IAM setup commands (AWS or GCP)
5. Adds the Helm repository
6. Installs the chart
7. Verifies pods are running

### Method 2 — Download and run

```bash
curl -fsSL https://aurva.ai/install.sh -o install.sh
chmod +x install.sh
./install.sh
```

### Method 3 — Clone the repository

```bash
git clone https://github.com/aurva-io/ai-observability-stack.git
cd ai-observability-stack
./install.sh
```

### Method 4 — Manual Helm install

If you prefer to skip the script entirely, see the [docs site](https://aurva.ai/docs/getting-started/installation) for the manual Helm flow. The condensed version:

```bash
helm repo add aiostack https://charts.aurva.ai/
helm repo update

helm install myaiostack aiostack/aiostack \
  --namespace aiostack \
  --create-namespace \
  --set companyId=YOUR_COMPANY_ID \
  --set validationKey=YOUR_VALIDATION_KEY
```

For AWS IRSA or GCP Workload Identity, add the corresponding `serviceAccount.annotations` (see [Cloud IAM Setup](#cloud-iam-setup)).

---

## Cloud IAM Setup

The outpost calls read-only cloud APIs to inventory IAM roles, RDS instances, and S3 buckets. The installer detects your cluster type and prints copy-paste commands. The summary is here for reference.

### AWS — IRSA

Permissions required on the IAM role:

```
IAM:      iam:ListRoles, iam:GetRole, iam:ListAttachedRolePolicies,
          iam:GetPolicy, iam:GetPolicyVersion, iam:ListRolePolicies,
          iam:GetRolePolicy
RDS:      rds:DescribeDBInstances, rds:DescribeDBClusters,
          rds:DescribeDBSubnetGroups, rds:ListTagsForResource
S3:       s3:ListAllMyBuckets, s3:GetBucketLocation,
          s3:GetBucketPublicAccessBlock, s3:GetBucketTagging,
          s3:GetBucketVersioning, s3:GetBucketAcl
```

The installer generates the full `aws iam create-policy`, `create-role`, and trust-policy commands with your account ID and OIDC issuer pre-filled.

After the role is created, install with:

```bash
helm install myaiostack aiostack/aiostack \
  --namespace aiostack \
  --set serviceAccount.annotations."eks\.amazonaws\.com/role-arn"="arn:aws:iam::ACCOUNT:role/aiostack-outpost-secure-readonly-role" \
  --set companyId=... \
  --set validationKey=...
```

### GCP — Workload Identity

The installer generates `gcloud iam service-accounts create`, role binding, and Workload Identity binding commands. Required role: `roles/iam.securityReviewer` plus custom roles for RDS/S3 equivalents.

After the GCP SA is bound, install with:

```bash
helm install myaiostack aiostack/aiostack \
  --namespace aiostack \
  --set serviceAccount.annotations."iam\.gke\.io/gcp-service-account"="aiostack-outpost@PROJECT.iam.gserviceaccount.com" \
  --set companyId=... \
  --set validationKey=...
```

### Skipping IAM

If you skip cloud IAM, AIOStack still runs and observes kernel-level traffic. You won't get the IAM/RDS/S3 datasource inventory until it's enabled.

---

## Configuration Options

### Required values

| Setting          | Description                                  |
| ---------------- | -------------------------------------------- |
| `companyId`      | Your Aurva company identifier                |
| `validationKey`  | Authentication key from [app.aurva.ai](https://app.aurva.ai) |

### Common values

| Setting              | Default                                                   | Description                              |
| -------------------- | --------------------------------------------------------- | ---------------------------------------- |
| `namespace`          | `aiostack`                                                | Kubernetes namespace                     |
| `releaseName`        | `myaiostack`                                              | Helm release name                        |
| `createNamespace`    | `true`                                                    | Create the namespace if missing          |
| `observerVersion`    | `latest`                                                  | Observer (eBPF DaemonSet) image tag      |
| `outpostVersion`     | `trueID-delta`                                            | Outpost (cluster service) image tag      |
| `isOutpostUrlSecure` | `false`                                                   | Use HTTPS for outpost → commander        |
| `skipNamespaces`     | `kube-system,aiostack-test,aiostack,monitoring,gke-mcs`   | Namespaces excluded from observation     |
| `commanderUrl`       | `hq.aurva.ai:443`                                         | Control plane endpoint                   |

### Saved configuration file

The installer can save your config for reuse:

```yaml
# aiostack-config-YYYYMMDD-HHMMSS.yaml
namespace: aiostack
releaseName: myaiostack
companyId: company-abc123
validationKey: key-xyz789...
observerVersion: latest
outpostVersion: trueID-delta
isOutpostUrlSecure: false
skipNamespaces: kube-system,aiostack-test,aiostack,monitoring,gke-mcs
createNamespace: true
```

Load it on a re-run:

```bash
./install.sh --config aiostack-config-20251115-120000.yaml
```

> Saved configs contain credentials. Set `chmod 600` and never commit them.

---

## CLI Reference

```
./install.sh [OPTIONS]

OPTIONS:
  -h, --help              Show help and exit
  -v, --verbose           Print detailed command output
  -c, --config FILE       Load a saved configuration file
      --version           Print installer version and exit
```

Environment overrides:

```bash
VERBOSE=true ./install.sh
CONFIG_FILE=my-config.yaml ./install.sh
```

---

## Post-Installation

### Verify pods

```bash
kubectl get pods -n aiostack
```

Expected:

```
NAME                              READY   STATUS    RESTARTS   AGE
aiostack-observer-xxxxx           1/1     Running   0          2m
aiostack-outpost-xxxxx            1/1     Running   0          2m
```

### View logs

```bash
# observer (eBPF DaemonSet)
kubectl logs -n aiostack -l app.kubernetes.io/name=observer --tail=100

# outpost (cluster service)
kubectl logs -n aiostack -l app.kubernetes.io/name=outpost --tail=100

# everything from this release
kubectl logs -n aiostack -l app.kubernetes.io/instance=myaiostack --all-containers --tail=50
```

### Access the dashboard

Sign in at [app.aurva.ai](https://app.aurva.ai). Within a few minutes you'll see discovered AI workloads, identity chains, and data flows.

---

## Troubleshooting

### Prerequisite checks fail

```bash
# Helm missing
brew install helm                                                         # macOS
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash   # Linux

# kubectl missing or no cluster context
kubectl config current-context
kubectl config get-contexts
kubectl config use-context <name>
```

### Pods pending

```bash
kubectl describe pods -n aiostack
kubectl top nodes
kubectl get events -n aiostack --sort-by='.lastTimestamp'
```

Common causes: node capacity, image pull permissions, missing IRSA/Workload-Identity binding.

### Pods crash-looping

```bash
kubectl logs -n aiostack <pod-name> --previous
kubectl describe pod -n aiostack <pod-name>
```

Most often a credential mismatch — verify `companyId` and `validationKey` in the console.

### Helm repo errors

```bash
helm repo add aiostack https://charts.aurva.ai/
helm repo update
helm search repo aiostack
```

### Permission denied

```bash
kubectl auth can-i create deployments -n aiostack
kubectl auth can-i create daemonsets -n aiostack
```

You need permissions to create namespaces, deployments, daemonsets, service accounts, and (cluster-)role bindings.

### Script hangs

```bash
./install.sh --verbose
kubectl get nodes
```

### Tools

[k9s](https://k9scli.io/) makes inspecting pods and logs significantly faster. Recommended for any non-trivial debugging.

For deeper troubleshooting see the [docs](https://aurva.ai/docs/getting-started/troubleshooting).

---

## Uninstallation

### One-line uninstaller

```bash
curl -fsSL https://aurva.ai/uninstall.sh | bash
```

The uninstaller is also interactive — it finds your release, confirms before removing, and cleans up the namespace.

### Manual removal

```bash
helm uninstall myaiostack -n aiostack
kubectl delete namespace aiostack
helm repo remove aiostack            # optional
```

### Keep a backup of your values

```bash
helm get values myaiostack -n aiostack > my-saved-values.yaml
```

Reinstall later with `./install.sh --config <saved>.yaml` or `helm install -f my-saved-values.yaml`.

> Before uninstalling, we'd appreciate a quick note at [support@aurva.io](mailto:support@aurva.io) about what didn't work. It helps us improve the product.

---

## Support

- **Docs** — [aurva.ai/docs](https://aurva.ai/docs/getting-started/introduction)
- **GitHub** — [github.com/aurva-io/ai-observability-stack](https://github.com/aurva-io/ai-observability-stack)
- **Issues** — [github.com/aurva-io/ai-observability-stack/issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **Email** — [support@aurva.io](mailto:support@aurva.io)
- **Dashboard** — [app.aurva.ai](https://app.aurva.ai)
