# AIOStack

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.29+-blue.svg)](https://kubernetes.io/)
[![eBPF](https://img.shields.io/badge/eBPF-Powered-green.svg)](https://ebpf.io/)

## Find Shadow AI in your cloud

AIOStack automatically discovers AI components you didn't know existed and ties each to an owner. **No code changes required.** Runs in-cluster via eBPF.

## What It Does

**Discovers & Monitors:**
- Shadow AI across namespaces and clusters
- AI agents, MCP servers, LLM endpoints, vector stores
- Model downloads and API calls (OpenAI, Anthropic, etc.)
- Sensitive data exposure and risky egress

**Gives You:**
- Complete map of AI surfaces in your cluster
- Accountable ownership (Pods, Deployments, ServiceAccounts)
- Real-time risk alerts and cost tracking (coming soon)
- Zero sensitive data storage (metadata only)

## Quick Start

### 1. Prerequisites
- Kubernetes 1.29+ with eBPF support ( If you're on EKS, GKE or AKS, this is already met )
- Linux kernel 5.15+ 
- Helm 3.x
- kubectl configured

### 2. Get Your Free Account
1. **Sign up** at [app.aurva.ai](https://app.aurva.ai) (takes 30 seconds)
2. **Copy your credentials** from the email sent to you:
   - Company ID
   - AIOStack Validation Key

### 3. Configure Your Credentials
```bash
# Add Helm repo
helm repo add aiostack https://charts.aurva.ai/
helm repo update

# Extract the default values file
helm show values aiostack/aiostack > values.yaml

# Edit values.yaml and replace:
# In Outpost section:
# - name: COMMANDER_URL
#   value: "aiostack-commander.<YOUR NAMESPACE>.svc.cluster.local:7470"
# - name: COMPANY_ID
#   value: "<YOUR COMPANY ID>"
# - name: AIOSTACK_VALIDATION_KEY
#   value: "<YOUR AIOSTACK VALIDATION KEY>"
#
# In Observer section:
# - name: OUTPOST_URL
#   value: "aiostack-outpost.<YOUR NAMESPACE>.svc.cluster.local:7471"
# - name: IS_OUTPOST_URL_SECURE
#   value: "false"
```

You may specify `latest` as the version of the components if you want to use the latest version.
```yaml
observer:
  version: latest
  ...
  
outpost:
  version: latest
  ...
```

### 4. Deploy to Your Cluster
```bash
# Create namespace
kubectl create namespace aiostack

# Install with your configured values
helm install myaiostack aiostack/aiostack --namespace aiostack --values values.yaml
```

### 5. Verify Installation
```bash
# Check pods are running
kubectl get pods -n aiostack
```

### 6. Access your dashboard !
That's it ! You can now access your dashboard at app.aurva.ai and login with your credentials ( your username is the email you signed up with )


## Supported Platforms

| Platform | Status |
|----------|--------|
| EKS (AWS) | ✅ Full |
| GKE (Google) | ✅ Full |
| Kind/Minikube | ✅ Dev only |

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Applications  │───▶│   eBPF Agents    │───▶│  Data Pipeline  │
│                 │    │                  │    │                 │
│ • Python ML     │    │ • Syscall hooks  │    │ • Classification│
│ • Node.js AI    │    │ • Network trace  │    │ • Enrichment    │
│ • Java services │    │ • Process trace  │    │ • Aggregation   │
│ • Go binaries   │    │ • File I/O trace │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌──────────────────┐             │
│   Dashboards    │◀───│   ClickHouse     │◀────────────┘
│                 │    │                  │
│ • AIOStack UI   │    │ • Time-series DB │
│ • Web Console   │    │ • 7-30 day       │
│ • REST APIs     │    │   retention      │
└─────────────────┘    └──────────────────┘
```

## Documentation

- **[Installation Guide](https://aurva.ai/docs/installation/steps)** - Complete setup walkthrough



## Support

- **📖 Documentation**: https://aurva.ai
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **📧 Support**: support@aurva.io

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## ⭐ Star History

![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)

---

**Made with ❤️ by [Aurva](https://aurva.io)**
*"See what others can't. Secure what others miss."*