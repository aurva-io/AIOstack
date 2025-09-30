# AIOStack

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.29+-blue.svg)](https://kubernetes.io/)
[![eBPF](https://img.shields.io/badge/eBPF-Powered-green.svg)](https://ebpf.io/)

## Find Shadow AI in your cloud

AIOStack automatically discovers AI components you didn't know existed and ties each to an owner. **No code changes required.** Runs in-cluster via eBPF.

## Features

**Discovery**
- Shadow AI across namespaces/clusters
- AI agents, MCP servers/clients, LLM endpoints, Vector DBs
- Orphaned/unused (“zombie”) AI services

**Monitoring & Analytics**
- Model/API calls (OpenAI, Anthropic, Gemini, etc.)
- Model downloads and runtime inventory
- Cost & usage insights

**Security & Compliance**
- Sensitive-data exposure cues and risky egress paths
- Evidence for investigations with owner attribution (Pods/Deployments/ServiceAccounts)

#

### Supported Environments

- **Kubernetes** 1.29+ with eBPF support  
  *(EKS, GKE, AKS already satisfy this)*
- **Linux kernel** 5.15+

### Installation Requirements
- **Helm** 3.x
- **kubectl** configured


## Quick Start

### 1. Create your Free Account
1. **Sign up** at [app.aurva.ai](https://app.aurva.ai) (takes 30 seconds)
2. **Copy your credentials** from the email sent to you:
   - Company ID
   - AIOStack Validation Key

### 2) Install via Helm

**Step 1: Configure Your Credentials**

```bash
helm repo add aiostack https://charts.aurva.ai/
helm repo update

# Extract the default values file
helm show values aiostack/aiostack > values.yaml
```
Edit ```values.yaml``` and set your credentials/placeholders:

```yaml
outpost:
  env:
    - name: COMMANDER_URL
      value: "aiostack-commander.<YOUR_NAMESPACE>.svc.cluster.local:7470"
    - name: COMPANY_ID
      value: "<YOUR_COMPANY_ID>"
    - name: AIOSTACK_VALIDATION_KEY
      value: "<YOUR_VALIDATION_KEY>"

observer:
  env:
    - name: OUTPOST_URL
      value: "aiostack-outpost.<YOUR_NAMESPACE>.svc.cluster.local:7471"
    - name: IS_OUTPOST_URL_SECURE
      value: "false"
```

*Optional: pin to the newest components by setting ```version: latest``` :*

```yaml
observer:
  version: latest
  ...

outpost:
  version: latest
  ...
```

**Step 2: Deploy to Your Cluster**
```bash
# Create namespace
kubectl create namespace aiostack

# Install with your configured values
helm install myaiostack aiostack/aiostack --namespace aiostack --values values.yaml
```

**Step 3: Verify Installation**
```bash
# Check if pods are running
kubectl get pods -n aiostack
```

**Step 4: View the Dashboard**
That's it! You can now access your Shadow AI inventory at [app.aurva.io](https://app.aurva.ai) and login with your credentials (your username is the email you signed up with).


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

## 🤝 Contributing
We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Add** tests where applicable
4. **Run** checks locally (make test)
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request with a clear description


## Documentation & Support

- **📖 Documentation**: https://aurva.ai/docs/home
- - **[Installation Guide](https://aurva.ai/docs/installation/steps)** - Complete setup walkthrough
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **📧 Support**: support@aurva.io


## 🔒 Security

### Security Model
- eBPF programs use only required, minimal capabilities.
- Aligned with Kubernetes Security Contexts and Pod Security Standards.

**Reporting Vulnerabilities:** support@aurva.io<br>
**Security Audit:** Results will be continously published (as available).

### Aurva Cloud Data Handling and Privacy

- No TLS key access required; observability happens at syscall level.
- In-cluster operation. Data remains in your environment.
- Metadata Only:
  - Request/response bodies are not stored.
  - Sensitive values are classified in runtime.

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## ⭐ Star History

![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)

---

**Made with ❤️ by [Aurva](https://aurva.io)**
*"See what others can't. Secure what others miss."*
