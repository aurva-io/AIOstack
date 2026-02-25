<p align="center">
  <img src="docs/public/aiostack-logo.png" alt="AIOStack Logo" width="400"/>
</p>


<div align=center>

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.29+-blue.svg)](https://kubernetes.io/)
[![eBPF](https://img.shields.io/badge/eBPF-Powered-green.svg)](https://ebpf.io/)

</div>

<div align=center>

[![Website](https://img.shields.io/website?up_message=AVAILABLE&down_message=DOWN&url=https%3A%2F%2Faurva.ai&style=for-the-badge)](https://aurva.ai)

</div>


## How to install (Kubernetes)

```bash
curl -fsSL https://aurva.ai/install.sh | bash
```

The installer will guide you through setup, open [app.aurva.ai](https://app.aurva.ai) for signup, and deploy AIOStack® to your cluster. Your AI inventory appears within 60 seconds.

See the [Installation Guide](https://aurva.ai/docs/installation/steps) for manual Helm installation.


**Uninstall**

```bash
curl -fsSL https://aurva.ai/uninstall.sh | bash
```

<hr/>

### eBPF-based observability for AI workloads in Kubernetes

AIOStack® automatically discovers and monitors AI infrastructure across your Kubernetes clusters using eBPF. It captures AI-related traffic (OpenAI, Anthropic, HuggingFace, vector databases, MCP servers) at the kernel level without requiring code changes or service restarts. Get immediate visibility into shadow AI deployments, per-team cost attribution, and security insights.

## Key Features

- **Zero-instrumentation discovery**: Automatically detect LLM API calls, model downloads, vector databases, and AI agents across all pods
- **AI Bill of Materials (AIBOM)**: Complete inventory of models, APIs, and AI dependencies running in your infrastructure
- **Cost attribution**: Map API usage and token consumption to Kubernetes namespaces, service accounts, and teams
- **Compliance audit trails**: Generate evidence for GDPR, SOC2, and internal audits with pod-level attribution
- **Language-agnostic**: Works with Python, Node.js, Go, Java, or any language making network calls
- **Minimal overhead**: <2% CPU impact per node using kernel-level filtering
- **Security alerts**: Real-time detection of unapproved AI services, data exfiltration patterns, and policy violations (coming soon)

## Prerequisites

- Kubernetes 1.29+ with eBPF support (EKS, GKE, AKS)
- Linux kernel 5.15+
- Helm 3.x
 

## How It Works

AIOStack deploys two components in your cluster:

**Observer (DaemonSet)**: Runs on each node and loads eBPF programs that hook into kernel tracepoints (`tcp_sendmsg`, `tcp_recvmsg`, `execve`, `openat`). These programs capture network metadata, DNS queries, and process execution events, filtering for AI-specific patterns (API endpoints, model downloads, vector DB protocols) before forwarding to userspace.


**Outpost (Deployment)**: Receives events from Observers, parses application protocols (HTTP/1.1, HTTP/2, gRPC), classifies AI services using signature matching, and enriches events with Kubernetes metadata by correlating socket inodes to pod identities via `/proc/net/tcp` and cgroup information.

Traffic is analyzed at the syscall level—before TLS encryption on egress, after decryption on ingress—using uprobes on `SSL_write`/`SSL_read` functions. Only metadata (HTTP headers, payload sizes, latencies) is extracted; request/response bodies are never captured.

Read : [How we escaped the SSL/TLS Trap](https://aurva.io/blog/the-ssl-tls-trap-why-your-database-security-goes-blind-in-production)

## Documentation

**Full documentation**: [aurva.ai/docs](https://aurva.ai/docs/home)

- [Architecture Deep Dive](https://aurva.ai/docs/home/architecture)
- [Installation Guide](https://aurva.ai/docs/installation/steps)
- [Security Model](https://aurva.ai/docs/misc)

## Feedback & Support

We're actively developing AIOStack and would love to hear from you:

- **Feature requests**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **Bug reports**: [GitHub Issues](https://github.com/aurva-io/ai-observability-stack/issues)
- **Questions**: support@aurva.io

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

The hosted version at [app.aurva.ai](https://app.aurva.ai) provides managed ClickHouse® storage and UI hosting. All core observability logic will be open sourced in this repository once approved by our Chief Architect.

## ⭐ Star History

![Star History Chart](https://api.star-history.com/svg?repos=aurva-io/ai-observability-stack&type=Date)

---

**Built by [Aurva](https://aurva.io)**
