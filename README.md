# Aurva AIOStack

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.24+-blue.svg)](https://kubernetes.io/)
[![eBPF](https://img.shields.io/badge/eBPF-Powered-green.svg)](https://ebpf.io/)
[![Go Report Card](https://goreportcard.com/badge/github.com/aurva-io/ai-observability-stack)](https://goreportcard.com/report/github.com/aurva-io/ai-observability-stack)

> **🔍 See AI that doesn't want to be seen**  
> Real-time discovery and monitoring of AI/ML workloads in Kubernetes using eBPF - no code changes required.


## What is AIOStack?

**AIOStack** brings AI activity under runtime security oversight inside your environment. It discovers AI components, monitors model/API calls and model downloads, flags sensitive-data exposure and risky egress, ties actions to accountable owners, and produces evidence for investigations, **without code changes** and **running in-cluster**.

## The Problem:
Teams spin up and wire AI components independently to move fast. The result isn’t malice; it’s pace and decentralization. But security and platform owners are left without an authoritative picture of **what AI exists, what it’s doing, what data it touches, and who is accountable.**

Unknown and unmanaged AI creates real gaps: model calls to third-party LLMs that no one reviews, quiet model downloads into sensitive environments, agents taking actions beyond intent, and data flowing across boundaries without a clear record. 

When something goes wrong, basic questions - **who did what, with which model, and where did the data go?** - take hours, not minutes.

- **Unknown inventory:** AI apps, agents, MCP servers/clients, and automations appear across teams with no central register.
- **Opaque usage & flow:** Model/API calls, volumes, and data movement aren’t visible in a way security can act on quickly.
- **Unreviewed egress & spend:** Third-party LLM interactions occur without consistent oversight or audit evidence, creating risk and driving up LLM costs.
- **Autonomous actions:** Agents execute and propagate access on their own, increasing blast radius when intent drifts.
- **Sensitive data exposure:** AI components access or move data beyond policy, with no runtime proof to confirm or contain it.
- **No accountable owner:** Activities aren’t tied back to a clear workload or service identity.

## How Aurva AIOstack solves this:

**eBPF**-powered visibility that sees AI at the kernel level - every LLM call, every ML library import, every AI data flow, every data access; automatically classified and monitored in real-time.

```bash
# After AIOStack (60 seconds later)
✅ 3 containers discovered
🤖 2 AI applications detected
⚠️ 1 shadow AI tool found (data-processor using OpenAI)
📊 147 LLM API calls in last hour
💰 $23.45 estimated AI spend today // coming soon
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
- **LLM Providers**: OpenAI, Anthropic, Cohere, Hugging Face, Ollama, Azure OpenAI
- **ML Libraries**: PyTorch, TensorFlow, scikit-learn, transformers, LangChain, llamaindex
- **AI Frameworks**: MLflow, Weights & Biases, Ray, Kubeflow
- **Runtime Support**: Python, Node.js, Java, Go applications

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

### Prerequisites
- Kubernetes 1.24+ 
- Linux kernel 4.18+ (5.4+ recommended)
- Cluster admin privileges (DaemonSet with eBPF capabilities)
- BTF-enabled kernel

### One-Command Installation
```bash
# Install with Helm
helm repo add aiostack https://charts.aiostack.io
helm install aiostack aiostack/ai-observability-stack
```

### Verify Installation
```bash
# Check if AIOStack pods are running
kubectl get pods -n aiostack

# Port-forward to access the UI
kubectl port-forward -n aiostack svc/aiostack-ui 3000:3000

# Open http://localhost:3000 in your browser
```

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

## 🔧 Configuration

Read the [Configuration Guide](https://ai.staging.aurva.io/docs/installation) to get started.

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
- eBPF programs run with minimal required capabilities
- No application data persistence (metadata only)
- TLS traffic decoded at syscall level (no key access needed)
- Supports Kubernetes security contexts and Pod Security Standards

### Reporting Security Issues
Please report security vulnerabilities to security@aurva.io

### Security Audit
Audit results will be published upon completion.

## 📚 Documentation

- **[Installation Guide](https://ai.staging.aurva.io/docs/installation)** - Complete setup walkthrough
- **[Configuration Reference](https://ai.staging.aurva.io/docs/installation/steps)** - All configuration options
- **[API Documentation](https://ai.staging.aurva.io/docs/api)** - REST API reference
- **[Troubleshooting](https://ai.staging.aurva.io/docs/troubleshooting)** - Common issues and solutions
- **[eBPF Deep Dive](https://ai.staging.aurva.io/docs/ebpf)** - Technical implementation details


## 💬 Community & Support

- **📖 Documentation**: https://ai.staging.aurva.io
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/aurva-io/ai-observability-stack/discussions)
- **💬 Community Chat**: [Join our Slack](https://join.slack.com/t/av-ai-observability/shared_invite/zt-xyz)
- **📧 Enterprise Support**: enterprise@aurva.io

## Supported Environments

| Platform | Support Level | Notes |
|----------|---------------|-------|
| EKS (AWS) | ✅ Full | Tested on EKS 1.24+ |
| GKE (Google) | ✅ Full | Tested on GKE 1.24+ |
| AKS (Azure) | ✅ Enterprise Version
| Kind/Minikube | ✅ Full | Development only |
| Bare Metal | ✅ Full | Kernel 5.4+ recommended |

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [eBPF Foundation](https://ebpf.io/) for the incredible technology
- [Kubernetes SIG Instrumentation](https://github.com/kubernetes/community/tree/master/sig-instrumentation) for observability standards
- Our amazing [contributors](https://github.com/aurva-io/ai-observability-stack/graphs/contributors)
- Early adopters who provided invaluable feedback

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)](https://star-history.com/#aurva-io/ai-observability-stack&Date)

---

**Made with ❤️ by the [Aurva Team](https://aurva.io)**

*"See what others can't. Secure what others miss."*
