# AITools Helm Chart

A Helm chart for deploying n8n on Kubernetes.

## What is n8n?

n8n (pronounced n-eight-n) is a fair-code licensed workflow automation tool. It lets you connect services and automate tasks through a visual interface.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- PV provisioner support in the underlying infrastructure (if persistence is enabled)

## Installing the Chart

From this directory:

```bash
helm install n8n . --namespace n8n --create-namespace
```

## Uninstalling the Chart

```bash
helm uninstall n8n --namespace n8n
```

## Configuration

The following table lists the configurable parameters of the chart and their default values.

### n8n Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `n8n.enabled` | Enable n8n deployment | `true` |
| `n8n.replicaCount` | Number of n8n replicas | `1` |
| `n8n.image.repository` | n8n image repository | `n8nio/n8n` |
| `n8n.image.tag` | n8n image tag | `latest` |
| `n8n.image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `n8n.service.type` | Kubernetes service type | `ClusterIP` |
| `n8n.service.port` | Service port | `5678` |
| `n8n.persistence.enabled` | Enable persistence | `true` |
| `n8n.persistence.size` | Size of persistent volume | `10Gi` |
| `n8n.persistence.storageClass` | Storage class for PVC | `""` (default) |
| `n8n.resources.limits.cpu` | CPU limit | `1000m` |
| `n8n.resources.limits.memory` | Memory limit | `2Gi` |
| `n8n.resources.requests.cpu` | CPU request | `250m` |
| `n8n.resources.requests.memory` | Memory request | `512Mi` |
| `n8n.ingress.enabled` | Enable ingress | `false` |
| `n8n.ingress.hosts` | Ingress hosts configuration | See values.yaml |

## Examples

### Basic Installation

```bash
helm install n8n . --namespace n8n --create-namespace
```

### Installation with Custom Values

```bash
helm install n8n . --namespace n8n --create-namespace \
  --set n8n.service.type=LoadBalancer \
  --set n8n.persistence.size=20Gi
```

### Installation with Ingress

Create a custom values file `custom-values.yaml`:

```yaml
n8n:
  ingress:
    enabled: true
    className: nginx
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
    hosts:
      - host: n8n.example.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: n8n-tls
        hosts:
          - n8n.example.com
```

Then install:

```bash
helm install n8n . --namespace n8n --create-namespace -f custom-values.yaml
```

### Disable Persistence (For Testing)

```bash
helm install n8n . --namespace n8n --create-namespace --set n8n.persistence.enabled=false
```

## Accessing n8n

### Port Forward (for ClusterIP)

```bash
kubectl port-forward -n n8n svc/n8n-aitools-n8n 5678:5678
```

Then access at: http://localhost:5678

## n8n Links

- Documentation: https://docs.n8n.io/
- GitHub: https://github.com/n8n-io/n8n
