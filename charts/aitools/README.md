# AITools Helm Chart

A Helm chart for deploying AI tools on Kubernetes, including MindsDB and n8n.

## What is MindsDB?

MindsDB is an AI platform that enables you to use machine learning predictions directly in your database using SQL queries. It automates and integrates ML models into databases, making AI accessible through familiar SQL syntax.

## What is n8n?

n8n (pronounced n-eight-n) is a fair-code licensed workflow automation tool. It allows you to connect various services and automate tasks through a visual interface. With n8n, you can integrate AI models, databases, APIs, and more into powerful automated workflows.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- PV provisioner support in the underlying infrastructure (if persistence is enabled)

## Installing the Chart

To install the chart with the release name `my-aitools`:

```bash
helm install my-aitools ./charts/aitools
```

Or from the repository root:

```bash
helm install my-aitools ./charts/aitools --namespace aitools --create-namespace
```

## Uninstalling the Chart

To uninstall/delete the `my-aitools` deployment:

```bash
helm uninstall my-aitools --namespace aitools
```

## Configuration

The following table lists the configurable parameters of the AITools chart and their default values.

### MindsDB Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `mindsdb.enabled` | Enable MindsDB deployment | `true` |
| `mindsdb.replicaCount` | Number of MindsDB replicas | `1` |
| `mindsdb.image.repository` | MindsDB image repository | `mindsdb/mindsdb` |
| `mindsdb.image.tag` | MindsDB image tag | `v23.12.4.0` |
| `mindsdb.image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `mindsdb.service.type` | Kubernetes service type | `ClusterIP` |
| `mindsdb.service.port` | Service port | `47334` |
| `mindsdb.persistence.enabled` | Enable persistence | `true` |
| `mindsdb.persistence.size` | Size of persistent volume | `10Gi` |
| `mindsdb.persistence.storageClass` | Storage class for PVC | `""` (default) |
| `mindsdb.resources.limits.cpu` | CPU limit | `2000m` |
| `mindsdb.resources.limits.memory` | Memory limit | `4Gi` |
| `mindsdb.resources.requests.cpu` | CPU request | `500m` |
| `mindsdb.resources.requests.memory` | Memory request | `2Gi` |
| `mindsdb.ingress.enabled` | Enable ingress | `false` |
| `mindsdb.ingress.hosts` | Ingress hosts configuration | See values.yaml |

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
helm install mindsdb ./charts/aitools
```

### Installation with Custom Values

```bash
helm install mindsdb ./charts/aitools \
  --set mindsdb.service.type=LoadBalancer \
  --set mindsdb.persistence.size=20Gi
```

### Installation with Ingress

Create a custom values file `custom-values.yaml`:

```yaml
mindsdb:
  ingress:
    enabled: true
    className: nginx
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
    hosts:
      - host: mindsdb.example.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: mindsdb-tls
        hosts:
          - mindsdb.example.com
```

Then install:

```bash
helm install mindsdb ./charts/aitools -f custom-values.yaml
```

### Disable Persistence (For Testing)

```bash
helm install mindsdb ./charts/aitools --set mindsdb.persistence.enabled=false
```

### Install Both MindsDB and n8n

```bash
helm install aitools ./charts/aitools --namespace aitools --create-namespace
```

### Install Only n8n

```bash
helm install n8n ./charts/aitools \
  --set mindsdb.enabled=false \
  --set n8n.enabled=true
```

### Install with n8n Ingress

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

## Accessing MindsDB

### Port Forward (for ClusterIP)

```bash
kubectl port-forward svc/my-aitools-mindsdb 47334:47334
```

Then access at: http://localhost:47334

### Using kubectl exec

```bash
kubectl exec -it <mindsdb-pod-name> -- python -m mindsdb
```

## Using MindsDB

Once deployed, you can:

1. Access the MindsDB Studio UI at the configured endpoint
2. Connect via MySQL protocol on port 47334
3. Connect via MongoDB protocol
4. Use the HTTP API

Example MySQL connection:

```bash
mysql -h <mindsdb-host> -P 47334 -u mindsdb
```

## Accessing n8n

### Port Forward (for ClusterIP)

```bash
kubectl port-forward svc/my-aitools-n8n 5678:5678 -n aitools
```

Then access at: http://localhost:5678

On first access, you'll be prompted to create an owner account.

## Using n8n

Once deployed, you can:

1. Access the n8n web UI at the configured endpoint
2. Create automated workflows visually
3. Connect to various services (databases, APIs, AI models, etc.)
4. Schedule workflow executions
5. Monitor workflow runs and logs

n8n can integrate with MindsDB to create powerful AI-powered automation workflows.

## Troubleshooting

### Check Pod Status

```bash
# MindsDB
kubectl get pods -l app.kubernetes.io/component=mindsdb

# n8n
kubectl get pods -l app.kubernetes.io/component=n8n

# All AI tools
kubectl get pods -n aitools
```

### View Logs

```bash
# MindsDB logs
kubectl logs -l app.kubernetes.io/component=mindsdb -f

# n8n logs
kubectl logs -l app.kubernetes.io/component=n8n -f
```

### Check Service

```bash
# MindsDB service
kubectl get svc -l app.kubernetes.io/component=mindsdb

# n8n service
kubectl get svc -l app.kubernetes.io/component=n8n
```

### Persistence Issues

If you're having issues with persistence:

1. Check if PVC is bound:
   ```bash
   kubectl get pvc
   ```

2. Check PV status:
   ```bash
   kubectl get pv
   ```

3. Describe PVC for events:
   ```bash
   kubectl describe pvc <pvc-name>
   ```

## Resources

### MindsDB
- [MindsDB Documentation](https://docs.mindsdb.com/)
- [MindsDB GitHub](https://github.com/mindsdb/mindsdb)
- [MindsDB Community](https://community.mindsdb.com/)

### n8n
- [n8n Documentation](https://docs.n8n.io/)
- [n8n GitHub](https://github.com/n8n-io/n8n)
- [n8n Community](https://community.n8n.io/)

## License

This Helm chart is provided as-is for deploying AI tools on Kubernetes.
