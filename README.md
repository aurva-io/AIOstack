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
#### Defaults that matter

- Runs in-cluster; no sensitive data leaves the environment
- Metadata-only by default; payload capture off; redaction on
- No application code changes required

## Key Features

#### 🕵️ **Zero-Touch Discovery**
- Automatically detects AI/ML applications without code changes
- Identifies shadow AI tools and unauthorized LLM usage
- Maps AI data flows across your entire infrastructure

#### 🧠 **AI-Aware Monitoring**
- **LLM Providers**: OpenAI, Anthropic, Cohere, Hugging Face, Ollama, Azure OpenAI, Gemini
- **ML Libraries**: Scikit-learn, transformers, LangChain, Llamaindex
- **AI Frameworks**: PyTorch, TensorFlow, Keras
- **MLOps & Orchestration Tools**: MLflow, Ray, Kubeflow
- **Runtime Support**: Python, Node.js, Java, Golang

#### 📊 **Rich Observability**
- Real-time dashboards with all the features you need to monitor your AI infrastructure
- AI agent workflow visualization and tracing
- Cost estimation and usage analytics
- Shadow AI detection
- Data flow monitoring
- PII/sensitive data detection
- Unauthorized model downloads
- Zero sensitive data storage - metadata only

#### 🔒 **Security & Compliance**
- Detects AI data exfiltration attempts
- Monitors for PII/sensitive data in AI calls
- Tracks unauthorized models running in your cluster
- Zero sensitive data storage - metadata only

## Quick Start

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

## Monitoring & Dashboards

### Built-in Dashboards
- **AI Application Discovery**: Live inventory of all AI/ML workloads.
- **LLM API Analytics**: Track services calling LLM APIs, with request metadata and provider visibility (OpenAI, Anthropic, etc.).
- **Security Overview**: Shadow AI detection, data flow monitoring.


## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Write** tests for your changes
4. **Ensure** all tests pass (`make test`)
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

## 🔒 Security

### Security Model
- eBPF programs use only required, minimal capabilities.
- Aligned with Kubernetes Security Contexts and Pod Security Standards.

**Reporting Vulnerabilities:** business@aurva.io<br>
**Security Audit:** Results will be published as available.

### Aurva Cloud Data Handling and Privacy

- No TLS key access required. TLS traffic decoded at syscall level.
- In-cluster operation. Data remains in your environment.
- Metadata Only:
  - Request/response bodies are not stored.
  - Sensitive values are classified in runtime.

## Documentation

- **[Installation Guide](https://aurva.ai/docs/installation/steps)** - Complete setup walkthrough



## Support

- **📖 Documentation**: https://aurva.ai
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **📧 Support**: business@aurva.io

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## ⭐ Star History

![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)

---

**Made with ❤️ by [Aurva](https://aurva.io)**
*"See what others can't. Secure what others miss."*