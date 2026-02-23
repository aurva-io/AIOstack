# Command Reference
```bash
helm install n8n . \
  --namespace n8n \
  --create-namespace
```

If you created `n8n-values.yaml`, use:

```bash
helm install n8n . -n n8n -f values.yaml
```

```bash
kubectl port-forward -n n8n svc/n8n-aitools-n8n 5678:5678
```

For AWS turn on ingress and turn off httproute
For GCP invert the above