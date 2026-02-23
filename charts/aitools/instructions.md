# n8n deployment (GCP / GKE) with the aitools chart

These commands assume you are in `charts/aitools` and already have `kubectl` and `helm` installed.

## 1) Get cluster credentials (GKE)

```bash
gcloud container clusters get-credentials <CLUSTER_NAME> \
  --region <REGION> \
  --project <PROJECT_ID>
```

If your cluster is zonal, use:

```bash
gcloud container clusters get-credentials <CLUSTER_NAME> \
  --zone <ZONE> \
  --project <PROJECT_ID>
```

## 2) Create the namespace

```bash
kubectl create namespace n8n
```

## 3) (Optional) Create a values override file

Create `n8n-values.yaml` if you want to set ingress, storage class, or env vars:

```yaml
n8n:
  enabled: true
  persistence:
    enabled: true
    storageClass: "<GKE_STORAGE_CLASS>" # e.g. standard-rwo
  service:
    type: ClusterIP
  ingress:
    enabled: false
  extraEnv:
    - name: N8N_HOST
      value: "n8n.example.com"
    - name: N8N_PROTOCOL
      value: "https"
```

## 4) Install the chart

From the `charts/aitools` directory:

```bash
helm install n8n . \
  --namespace n8n \
  --create-namespace
```

If you created `n8n-values.yaml`, use:

```bash
helm install n8n . \
  --namespace n8n \
  --create-namespace \
  -f n8n-values.yaml
```

## 5) Verify resources

```bash
kubectl get all -n n8n
kubectl get pvc -n n8n
```

## 6) Access n8n (ClusterIP via port-forward)

```bash
kubectl port-forward -n n8n svc/n8n-aitools-n8n 5678:5678
```

Then open `http://localhost:5678`.

## 7) Uninstall

```bash
helm uninstall n8n -n n8n
```
