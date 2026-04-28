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

# AI agents always look authorized. AIOStack tells you when they're not.
 
AI agents act on behalf of users. They use real credentials, make real API calls, invoke tools, access APIs, and touch production systems.
Most security tools see this activity as legitimate because, technically, it is.

>The real problem is not only unauthorized access.<br>
The bigger problem is when **authorized access becomes inappropriate at runtime**.

AIOStack is Aurva’s free community runtime visibility layer for AI workloads. It helps security and platform teams discover shadow AI, map agent identities, trace LLM and tool activity, and understand how AI systems behave inside Kubernetes environments.

No application code changes. No SDK dependency. No sidecars. Runtime visibility where AI workloads actually run.

---
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
---
 
## What AIOStack answers
 
| Question | What you get |
|---|---|
| **What agents exist?** | Auto-discover AI agents, LLM calls, shadow AI, and AI services running across your cluster |
| **What identities do they use?** | Map each agent to its Kubernetes pod, namespace, service account, and workload identity |
| **What AI systems are involved?** | Visibility into LLM APIs, model endpoints, vector databases, and MCP servers |
| **What actions are they taking?** | Runtime metadata for AI calls — model, provider, token usage, destination, latency |
| **How are calls chained?** | AI call lineage across services, tools, and agent workflows |
| **Who owns the activity?** | Attribution to services, namespaces, and teams |
  
---

## Key Features

- **Zero-instrumentation discovery**: Automatically detect LLM API calls, model downloads, vector databases, MCP servers, and AI agents across all pods — without touching application code.
- **AI Bill of Materials (AIBOM)**: Complete runtime inventory of models, APIs, and AI dependencies in your infrastructure. Know what's running before an incident tells you.
- **Agent identity mapping**: Correlate AI traffic to Kubernetes service accounts, namespaces, and workload identities. When an agent does something unexpected, you know exactly which one.
- **Prompt and call monitoring**: Capture LLM request metadata, model routing, and token usage per service. No request bodies are stored — only the signals that matter for security.
- **AI call lineage**: Trace multi-step agent workflows across services. See the full chain of calls an agent made, not just individual events.
- **Cost and usage attribution**: Map API usage and token consumption to teams, namespaces, and service accounts. Useful for platform teams managing shared AI infrastructure.
- **Compliance audit trails**: Generate pod-level evidence for GDPR, SOC2, and internal audits — timestamped, attributed, and queryable.
- **Minimal overhead**: <2% CPU impact per node using kernel-level filtering. Built for production.


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

---
 
## Community vs. Enterprise
 
AIOStack is free to use. All core eBPF-based features are available in the community edition with no feature gating.
 
Enterprise adds integrations and support for teams running AI workloads outside of standard Kubernetes environments:
 
| Feature | Community | Enterprise |
|---|---|---|
| Shadow AI discovery | ✅ | ✅ |
| AIBOM | ✅ | ✅ |
| Agent identity mapping | ✅ | ✅ |
| Prompt and call monitoring | ✅ | ✅ |
| AI call lineage | ✅ | ✅ |
| Cost and usage attribution | ✅ | ✅ |
| Compliance audit trails | ✅ | ✅ |
| Managed UI + dashboards | ✅ via [app.aurva.ai](https://app.aurva.ai) | ✅ |
| AWS CloudWatch log integration | — | ✅ |
| AWS Bedrock log integration (agentless) | — | ✅ |
| Azure AI Foundry log integration (agentless) | — | ✅ |
| Alerting and policy enforcement | — | ✅ |
| SSO + RBAC | — | ✅ |
| Dedicated support SLA | — | ✅ |
 
> **Note:** eBPF is not available on Bedrock, Vertex, Databricks or other managed PaaS runtimes. For those environments, contact us for Enterprise agentless based integrations.
 
[Talk to us about Enterprise →](https://aurva.io)

---

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
