# AI Observability Stack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.24+-blue.svg)](https://kubernetes.io/)

> **Real-time tracing and observability for AI agents, LLM calls, and ML libraries in Kubernetes environments using eBPF**

AI Observability Stack is an open-source observability tool that automatically discovers, traces, and monitors AI/ML workloads running in Kubernetes clusters. Using eBPF technology, it provides deep visibility into LLM API calls, ML library usage, and AI agent behavior without requiring code changes or application restarts.

## 🚀 Features

- **Zero-instrumentation tracing**: Automatic detection of AI/ML libraries and LLM calls by workloads using eBPF
- **Kubernetes-native**: One click deploy as DaemonSet with RBAC and security best practices. One click uninstall.
- **Multi-runtime support**: Python, Node.js, Java, and Go applications
- **LLM provider coverage**: OpenAI, Anthropic, Cohere, Hugging Face, and more
- **ML library detection**: PyTorch, TensorFlow, scikit-learn, transformers, langchain
- **Real-time dashboards**: Built-in Grafana dashboards and Prometheus/VictoriaMetrics metrics
- **Real-Time Shadow AI Detection**: Identify unsanctioned AI tool usage and LLM calls from unexpected sources
- **Agent workflow visualization**: Trace multi-step AI agent executions

## 🏗️ Architecture

// TODO: Add architecture diagram

## 📋 Prerequisites

- Kubernetes 1.24+ with eBPF support ( EKS, GKE, AKS, etc. )
- Linux kernel 4.18+ (5.4+ recommended)
- Helm 3.0+ (for installation)
- Cluster admin privileges for eBPF programs

## ⚡ Quick Start

### Install with Helm

```bash
# Add the AI Observability Stack Helm repository
helm repo add av-ai-observability-stack https://github.com/aurva-io/ai-observability-stack/helm-charts

# Update repository
helm repo update

# Install AI Observability Stack
helm install av-ai-observability-stack av-ai-observability-stack/av-ai-observability-stack \
  --namespace ai-tracing \
  --create-namespace \
  --set config.enablePrometheus=true
```

### Install with kubectl

```bash
# Clone the repository
git clone https://github.com/aurva-io/ai-observability-stack.git
cd ai-observability-stack

# Deploy to Kubernetes
kubectl apply -f manifests/
```

### Verify Installation

```bash
# Check if pods are running
kubectl get pods -n av-ai-observability-stack

# View traces
kubectl port-forward -n av-ai-observability-stack svc/av-ai-observability-stack-ui 7470:7470
# Open http://localhost:7470/metrics in your browser
```

## 🔧 Configuration

The AI Observability Stack can be configured via ConfigMap or Helm values:

```yaml
# config.yaml
tracing:
  sampling_rate: 1.0
  buffer_size: "64MB"

providers:
  openai:
    enabled: true
  anthropic:
    enabled: true
  huggingface:
    enabled: true

libraries:
  - pytorch
  - tensorflow
  - scikit-learn
  - transformers
  - langchain
  - llamaindex

# Metrics can be exported to Prometheus, VictoriaMetrics, or Grafana
# Only tracks agent performance, no sensitive data is stored.
metrics:
  enabled: true
```

## 📊 Monitoring & Dashboards

### Prometheus Metrics

The AI Observability Stack exposes the following metrics:

- `ai_llm_requests_total` - Total LLM API requests
- `ai_llm_request_duration_seconds` - LLM request latency
- `ai_llm_tokens_used_total` - Token consumption by provider
- `ai_llm_costs_usd_total` - Estimated costs in USD
- `ai_ml_library_usage_total` - ML library function calls
- `ai_agent_workflow_steps_total` - Agent workflow step count

## 🛠️ Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/aurva-io/ai-observability-stack.git
cd ai-observability-stack

# Build eBPF programs
make build-ebpf

# Build cross-compiled Go binary
make build

# Build Docker image
make docker-build
```

### Running Locally

```bash
# Run tests
make test

# Run locally (requires sudo for eBPF) and lima VM for arm64 Macs
sudo ./bin/av-ai-observability-stack --config config.yaml
```

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📖 Documentation

- **[Installation Guide](https://github.com/aurva-io/ai-observability-stack/blob/main/docs/installation.md)** - Detailed setup instructions
- **[Troubleshooting](https://github.com/aurva-io/ai-observability-stack/blob/main/docs/troubleshooting.md)** - Common issues and solutions

## 🔐 Security Considerations

- eBPF programs run in kernel space with appropriate capabilities
- No application data is stored, only metadata and metrics
- TLS/SSL traffic is decoded at the syscall level
- Supports network policies and Pod Security Standards
- API keys and sensitive data are never logged
- We are working on a security audit and will release a security report soon
- We support EKS, GKE for now, other cloud providers coming soon and best effort

## 🤝 Community & Support

- **Documentation**: https://github.com/aurva-io/ai-observability-stack/blob/main/docs/README.md
- **Issues**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aurva-io/ai-observability-stack/discussions)
- **Slack**: [Join our community](https://join.slack.com/t/av-ai-observability/shared_invite/zt-24000000000000000000000000000000)

## 📝 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [eBPF community](https://ebpf.io/) for the foundational technology
- [Kubernetes SIG Instrumentation](https://github.com/kubernetes/community/tree/master/sig-instrumentation) for observability standards
- Contributors and early adopters who helped shape this project

## ⭐ Star History

### [![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)](https://star-history.com/#aurva-io/ai-observability-stack&Date)

**Made with ❤️ by the Aurva**
