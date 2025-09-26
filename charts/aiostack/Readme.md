## AIOStack Helm Chart

The command to deploy the chart is ( all from the root folder )
```bash
helm install aiostack ./charts/aiostack -n aiostack
```

## Uninstall

```bash
helm uninstall aiostack -n aiostack
```

## Update

```bash
helm upgrade aiostack ./charts/aiostack -n aiostack
```


## The command to deploy only the Load Balancer Gateway is:

```bash
helm install aiostack ./charts/aiostack/alb.yaml -n aiostack
```

```bash
helm template aiostack-gateways ./charts/aiostack -f ./charts/aiostack/values.yaml -f ./charts/aiostack/alb.yaml/staging.yaml --namespace aiostack-test --show-only templates/alb.yaml | kubectl apply -f -
```

```bash
helm upgrade --install aiostack ./charts/aiostack -n aiostack-test --create-namespace -f ./charts/aiostack/values.yaml -f ./charts/aiostack/alb.yaml/staging.yaml
```