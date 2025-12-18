# AI ML Pipeline on Kubernetes - Project AIBender

A complete ML pipeline infrastructure deployment on Kubernetes designed for testing network observability tools. This setup creates realistic service-to-service communication patterns across 13+ different ML services.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Namespace: aibender                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │           Infrastructure Layer                          │  │
│  │                                                          │  │
│  │  ┌──────────┐  ┌────────────┐  ┌───────┐  ┌──────┐   │  │
│  │  │  MinIO   │  │ PostgreSQL │  │ Redis │  │ etcd │   │  │
│  │  │ (S3 API) │  │   (SQL)    │  │(Cache)│  │(KV)  │   │  │
│  │  └────┬─────┘  └─────┬──────┘  └───┬───┘  └───┬──┘   │  │
│  └───────┼──────────────┼──────────────┼──────────┼──────┘  │
│          │              │              │          │          │
│  ┌───────┼──────────────┼──────────────┼──────────┼──────┐  │
│  │       │    ML Services Layer        │          │      │  │
│  │       │              │              │          │      │  │
│  │  ┌────▼────┐    ┌───▼────┐    ┌───▼───┐  ┌───▼───┐ │  │
│  │  │ LakeFS  │    │ MLFlow │    │ Feast │  │Milvus │ │  │
│  │  │ (Data   │    │ (Exp.  │    │(Feature│ │(Vector│ │  │
│  │  │Version) │    │Track)  │    │ Store) │ │  DB)  │ │  │
│  │  └─────────┘    └────────┘    └────────┘  └───────┘ │  │
│  │                                                       │  │
│  │  ┌─────────┐    ┌────────┐    ┌────────┐           │  │
│  │  │ Qdrant  │    │Airflow │    │Jupyter │           │  │
│  │  │(Vector  │    │(Orch.) │    │ (Dev)  │           │  │
│  │  │  DB)    │    │        │    │        │           │  │
│  │  └─────────┘    └────────┘    └────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            Workload Layer                             │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────┐        │  │
│  │  │   Sample Training Job (generates traffic)│        │  │
│  │  └──────────────────────────────────────────┘        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Network Traffic Patterns

This deployment generates diverse network traffic for observability testing:

- **HTTP REST API calls**: MLFlow, LakeFS, Qdrant, Airflow, Feast
- **gRPC traffic**: Milvus (19530), Qdrant (6334)
- **PostgreSQL protocol**: Multiple services connecting to shared database
- **Redis protocol**: Feast online feature store cache
- **S3 API calls**: MinIO for artifact storage (MLFlow, LakeFS, Airflow, Feast)
- **etcd client protocol**: Milvus metadata storage

## Prerequisites

Before deploying, ensure you have:

- **Kubernetes cluster** (v1.24+)
  - Minikube, kind, Docker Desktop, or cloud-managed cluster
  - At least 8GB RAM and 4 CPU cores available
- **kubectl** (v1.24+)
- **Helm** (v3.10+)
- **Storage class** configured for persistent volumes

### Quick Prerequisites Check

```bash
kubectl version --client
helm version
kubectl cluster-info
```

## Quick Start

### 1. Clone or Navigate to Project

```bash
cd ai-flow
```

### 2. Deploy Everything

```bash
./deploy.sh
```

The script will:
1. Check prerequisites
2. Create the `aibender` namespace
3. Add required Helm repositories
4. Deploy infrastructure layer (MinIO, PostgreSQL, Redis, etcd)
5. Deploy ML services layer (LakeFS, MLFlow, Qdrant, Milvus, Airflow, Feast, Jupyter)
6. Wait for all services to be ready
7. Display access instructions
8. Optionally run the sample training job

Deployment typically takes 5-10 minutes depending on your cluster and internet connection.

### 3. Verify Deployment

```bash
kubectl get pods -n aibender
kubectl get svc -n aibender
```

All pods should be in `Running` state.

## Services and Endpoints

| Service | Purpose | Internal Port | UI Port | Credentials |
|---------|---------|--------------|---------|-------------|
| MinIO | S3-compatible object storage | 9000 | 9001 | minioadmin / minioadmin123 |
| PostgreSQL | Shared SQL database | 5432 | - | postgres / postgres123, mluser / mlpassword123 |
| Redis | Cache and online feature store | 6379 | - | redis123 |
| etcd | Milvus metadata storage | 2379 | - | none |
| LakeFS | Data version control | 8000 | 8000 | (initial setup required) |
| MLFlow | Experiment tracking | 5000 | 5000 | none |
| Qdrant | Vector database | 6333, 6334 | 6333 | none |
| Milvus | Vector database | 19530, 9091 | - | none |
| Airflow Webserver | Workflow orchestration UI | 8080 | 8080 | admin / admin123 |
| Airflow Scheduler | Background task scheduler | - | - | none |
| Feast | Feature store server | 6566 | - | none |
| Jupyter Lab | Development environment | 8888 | 8888 | aibender123 |

## Accessing Services

All services are ClusterIP by default. Use `kubectl port-forward` to access them locally:

### MinIO Console (S3 Storage UI)

```bash
kubectl port-forward svc/minio -n aibender 9001:9001
```

Open http://localhost:9001 and login with `minioadmin` / `minioadmin123`

### MLFlow (Experiment Tracking)

```bash
kubectl port-forward svc/mlflow -n aibender 5000:5000
```

Open http://localhost:5000

### Airflow (Orchestration UI)

```bash
kubectl port-forward svc/airflow -n aibender 8080:8080
```

Open http://localhost:8080 and login with `admin` / `admin123`

### Jupyter Lab (Development)

```bash
kubectl port-forward svc/jupyter -n aibender 8888:8888
```

Open http://localhost:8888 and use token `aibender123`

### LakeFS (Data Version Control)

```bash
kubectl port-forward svc/lakefs -n aibender 8000:8000
```

Open http://localhost:8000

### Qdrant (Vector Database Dashboard)

```bash
kubectl port-forward svc/qdrant -n aibender 6333:6333
```

Open http://localhost:6333/dashboard

## Generating Network Traffic

### Run the Sample Training Job

The sample training job simulates a realistic ML workflow and generates traffic across services:

```bash
kubectl apply -f training-job/12-sample-training-job.yaml -n aibender
```

Watch the job logs:

```bash
kubectl logs -f -n aibender -l app=training-job
```

The job will:
1. Connect to MLFlow and log a training experiment
2. Train a Random Forest classifier on synthetic data
3. Store embeddings in Qdrant vector database
4. Perform similarity search in Milvus
5. Generate S3 traffic to MinIO for artifact storage

### Run Multiple Times

To generate sustained traffic, run the job multiple times:

```bash
for i in {1..5}; do
  kubectl delete job sample-training-job -n aibender --ignore-not-found
  sleep 2
  kubectl apply -f training-job/12-sample-training-job.yaml -n aibender
  sleep 30
done
```

### Custom Development with Jupyter

Access Jupyter Lab and create your own notebooks:

```bash
kubectl port-forward svc/jupyter -n aibender 8888:8888
```

Pre-installed packages:
- `mlflow` - Experiment tracking
- `feast` - Feature store client
- `apache-airflow` - Workflow orchestration
- `qdrant-client` - Qdrant vector DB
- `pymilvus` - Milvus vector DB
- `lakefs-client` - LakeFS data versioning
- `boto3` - S3/MinIO access

Example notebook code:

```python
import mlflow
import numpy as np
from qdrant_client import QdrantClient

# Configure MLFlow
mlflow.set_tracking_uri("http://mlflow:5000")
mlflow.set_experiment("my-experiment")

# Start an experiment
with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_metric("accuracy", 0.95)

# Connect to Qdrant
qdrant = QdrantClient(host="qdrant", port=6333)
print(qdrant.get_collections())
```

## Database Connections

### PostgreSQL

Databases created:
- `lakefs` - LakeFS metadata
- `mlflow` - MLFlow experiments and runs
- `feast` - Feast registry (optional)
- `airflow` - Airflow metadata and task history

Connection strings:
```
# As postgres superuser
postgresql://postgres:postgres123@postgresql:5432/<database>

# As mluser (has access to all ML databases)
postgresql://mluser:mlpassword123@postgresql:5432/<database>
```

Connect from a pod:

```bash
kubectl run -it --rm psql --image=postgres:15 -n aibender -- \
  psql postgresql://mluser:mlpassword123@postgresql:5432/mlflow
```

### Redis

```bash
kubectl run -it --rm redis-cli --image=redis:7 -n aibender -- \
  redis-cli -h redis-master -a redis123
```

### MinIO (S3)

Buckets created:
- `lakefs` - LakeFS data blocks
- `mlflow` - MLFlow artifacts
- `airflow` - Airflow task outputs
- `feast` - Feast registry

Access via AWS CLI:

```bash
export AWS_ACCESS_KEY_ID=minioadmin
export AWS_SECRET_ACCESS_KEY=minioadmin123
export AWS_ENDPOINT_URL=http://localhost:9000

aws s3 ls s3://mlflow/ --endpoint-url http://localhost:9000
```

## Troubleshooting

### Pods Not Starting

Check pod status and logs:

```bash
kubectl get pods -n aibender
kubectl describe pod <pod-name> -n aibender
kubectl logs <pod-name> -n aibender
```

Common issues:
- **Insufficient resources**: Scale down replicas or increase cluster resources
- **PVC pending**: Check if StorageClass is configured
- **ImagePullBackOff**: Check internet connectivity and image names

### Services Not Connecting

Verify service endpoints:

```bash
kubectl get endpoints -n aibender
```

Check network policies (if any):

```bash
kubectl get networkpolicies -n aibender
```

### Database Connection Errors

Verify PostgreSQL is ready:

```bash
kubectl logs -n aibender postgresql-0
kubectl exec -it postgresql-0 -n aibender -- psql -U postgres -c '\l'
```

### Storage Issues

Check PVC status:

```bash
kubectl get pvc -n aibender
```

If PVCs are pending, check your StorageClass:

```bash
kubectl get storageclass
```

For local clusters (minikube, kind), you may need to enable storage provisioning.

### MLFlow Can't Access MinIO

Ensure MinIO buckets exist:

```bash
kubectl port-forward svc/minio -n aibender 9001:9001
# Login to MinIO console and verify 'mlflow' bucket exists
```

Test S3 connectivity from MLFlow pod:

```bash
kubectl exec -it deployment/mlflow -n aibender -- \
  python -c "import boto3; s3=boto3.client('s3', endpoint_url='http://minio:9000', aws_access_key_id='minioadmin', aws_secret_access_key='minioadmin123'); print(s3.list_buckets())"
```

## Resource Requirements

### Minimum Resources (for development)

- **CPU**: 4 cores
- **Memory**: 8 GB RAM
- **Storage**: 50 GB

### Recommended Resources (for testing)

- **CPU**: 8 cores
- **Memory**: 16 GB RAM
- **Storage**: 100 GB

### Resource Allocation per Service

| Service | CPU Request | CPU Limit | Memory Request | Memory Limit |
|---------|-------------|-----------|----------------|--------------|
| MinIO | 250m | 300m | 512Mi | 1Gi |
| PostgreSQL | 250m | 350m | 512Mi | 512Mi |
| Redis | 100m | 250m | 256Mi | 512Mi |
| etcd | 100m | 250m | 256Mi | 512Mi |
| LakeFS | 250m | 500m | 512Mi | 1Gi |
| MLFlow | 250m | 500m | 512Mi | 1Gi |
| Qdrant | 250m | 1000m | 512Mi | 2Gi |
| Milvus | 500m | 1000m | 1Gi | 2Gi |
| Airflow Webserver | 250m | 500m | 512Mi | 1Gi |
| Airflow Scheduler | 250m | 500m | 512Mi | 1Gi |
| Feast | 100m | 250m | 256Mi | 512Mi |
| Jupyter | 250m | 500m | 512Mi | 1Gi |

**Total**: ~3.5 CPU cores, ~6.5 GB memory (requests)

## Scaling the Deployment

### Reduce Resources for Constrained Environments

Edit values files and manifests to reduce resource requests/limits:

```yaml
resources:
  requests:
    memory: 256Mi  # Reduced from 512Mi
    cpu: 100m      # Reduced from 250m
```

### Scale Up for Production Testing

Increase replicas for services that support it:

```bash
kubectl scale deployment mlflow --replicas=3 -n aibender
kubectl scale deployment lakefs --replicas=2 -n aibender
```

## Cleanup

### Delete Entire Namespace

```bash
kubectl delete namespace aibender
```

This will remove all deployments, services, and persistent data.

### Uninstall Helm Charts Only

```bash
helm uninstall minio -n aibender
helm uninstall postgresql -n aibender
helm uninstall redis -n aibender
helm uninstall etcd -n aibender
```

### Remove Persistent Volumes

```bash
kubectl delete pvc --all -n aibender
kubectl delete pv --all  # Only if PVs are not automatically deleted
```

## Integration with Observability Tools

This deployment is designed to work with network observability tools. Here are some integration points:

### Service Mesh Integration (Istio, Linkerd)

Deploy a service mesh to capture L7 traffic:

```bash
# Example for Istio
kubectl label namespace aibender istio-injection=enabled
kubectl rollout restart deployment -n aibender
```

### Prometheus Monitoring

Some services expose metrics:
- **Milvus**: Port 9091 (Prometheus format)
- **Qdrant**: Built-in metrics at `/metrics`

### Distributed Tracing (Jaeger, Tempo)

Configure MLFlow and other services to export traces:

```yaml
env:
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://jaeger-collector:4318"
```

### Network Policy Testing

Apply network policies to test connectivity:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: mlflow-egress
  namespace: aibender
spec:
  podSelector:
    matchLabels:
      app: mlflow
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgresql
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: minio
    ports:
    - protocol: TCP
      port: 9000
```

## Advanced Configuration

### Enable Persistence for All Services

All services with state already have persistence enabled. Check PVCs:

```bash
kubectl get pvc -n aibender
```

### Custom Domain Names (Ingress)

Create Ingress resources for external access:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mlflow-ingress
  namespace: aibender
spec:
  rules:
  - host: mlflow.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: mlflow
            port:
              number: 5000
```

### TLS/SSL Configuration

Add TLS certificates for secure communication:

```yaml
spec:
  tls:
  - hosts:
    - mlflow.example.com
    secretName: mlflow-tls
```

## Contributing

This is a reference implementation for testing ML observability. Feel free to:

- Add more ML services
- Enhance the training job
- Add CI/CD pipelines
- Improve resource configurations
- Add monitoring and alerting

## License

MIT License - Free to use for testing and development purposes.

## Security Notice

**WARNING**: This deployment uses hardcoded passwords and insecure defaults for ease of testing.

**DO NOT USE IN PRODUCTION** without:
- Changing all passwords and secrets
- Enabling TLS/SSL
- Implementing proper RBAC
- Securing network policies
- Using proper secret management (Vault, Sealed Secrets, etc.)

## Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review pod logs: `kubectl logs <pod-name> -n aibender`
- Check Kubernetes events: `kubectl get events -n aibender --sort-by='.lastTimestamp'`

## Acknowledgments

Built with:
- [MinIO](https://min.io/) - S3-compatible object storage
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Redis](https://redis.io/) - In-memory data store
- [etcd](https://etcd.io/) - Distributed key-value store
- [LakeFS](https://lakefs.io/) - Data version control
- [MLFlow](https://mlflow.org/) - ML lifecycle management
- [Qdrant](https://qdrant.tech/) - Vector database
- [Milvus](https://milvus.io/) - Vector database
- [Apache Airflow](https://airflow.apache.org/) - Workflow orchestration
- [Feast](https://feast.dev/) - Feature store
- [Jupyter](https://jupyter.org/) - Interactive development

---

**Project AIBender** - Making ML observability testing easier!
