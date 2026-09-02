---
title: 'What Aurva Sees at Runtime'
description: Learn about what we detect, what we output, coverage categories, and how coverage is maintained.
date: 2026-02-13
author: AIOStack Team
readTime: 5 min read
keywords: ["ai security", "catalog", "specs", "uses"]
---



## What we detect

### 1. Local AI and ML workloads

We identify AI-active workloads by detecting runtime signals that indicate ML training and inference environments and model usage, including:

- Framework and runtime usage (training and inference)
- Model artifact presence and model format usage
- Orchestration and workflow tooling used to run pipelines and chains

### 2. Agentic systems and tool use

We surface agentic activity and coordination signals where in scope, including:

- Agent communication protocols and endpoints (for example MCP, ACP, A2A)
- Tool invocation and resource access signals associated with agent workflows
- Agent-to-service and service-to-service activity that participates in agentic execution

### 3. External AI services and platforms

We detect outbound usage of third-party AI services and platforms, including:

- API-based AI usage (SaaS AI providers and managed AI platforms)
- SDK-driven activity when endpoints or routing are dynamic
- Hybrid and multi-cloud AI usage attribution (local and cloud)

### 4. Enterprise AI tools and copilots

We detect usage of enterprise AI assistants and productivity tools, including:

- Enterprise search and knowledge platforms (for example Glean, Wisdom)
- AI-powered automation and workflow tools (for example n8n)
- Internal copilot and assistant deployments

### 5. Vector retrieval and embedding workflows

We detect vector retrieval and embedding activity where observable, including:

- Vector store endpoints and retrieval or index operations
- Embedding-related activity patterns that indicate RAG-style workflows

### 6. AI-adjacent data and security context

We correlate AI signals with surrounding runtime context needed for observability and security:

- Workload and service identity and environment context (host, pod, namespace)
- Downstream dependencies and external destinations (egress)
- Data stores and services accessed by AI-active workloads

---

## Outputs

Aurva produces two complementary outputs from its discovery subsystem.

### Unified inventory

A continuously updated inventory of:

- AI-active workloads and services (by host, pod, or namespace)
- AI services and platforms in use (local and external)
- Agent protocol endpoints and tool signals (where in scope)
- Vector retrieval events (where in scope)

### Runtime event stream

A structured stream of events enriched with AI context, enabling:

- Attribution: which workload or service initiated an AI call or retrieval
- Correlation: AI activity linked to downstream services and destinations
- Governance and investigations: visibility into what ran, where it communicated, and what it accessed, at a metadata level

---

## Coverage

Coverage is maintained as a catalog of AI services, frameworks, model formats, protocols, and commonly observed AI workflow components. The catalog is continuously expanding.

The lists below are representative examples, not exhaustive.

### AI providers and managed platforms

Common AI providers and managed platforms detected via API-level traffic:

- OpenAI, Anthropic, Cohere,Hugging Face
- AWS Bedrock, AWS SageMaker
- Azure AI, Azure ML
- Google Vertex AI

### Enterprise AI tools

Enterprise AI assistants, copilots, and productivity tools:

- Glean, Wisdom
- n8n
- Additional enterprise AI tools as observed in customer environments

### Agent protocols

Agent coordination and tool interaction protocols (where in scope):

- MCP (Model Context Protocol)
- ACP (Agent Communication Protocol)
- A2A (Agent-to-Agent)

### ML and DL frameworks and runtimes

Frameworks and runtimes commonly used for training and inference:

PyTorch, TensorFlow, Keras, Scikit-learn, XGBoost, LightGBM, CatBoost, Ollama and more

### Agentic and LLM toolkits

Toolkits and workflow components used to build agentic and LLM applications:

- LangChain, LangGraph
- MLflow (experiment tracking and pipelines)
- Common automation and orchestration layers (varies by environment)

### Model formats and artifacts

Model formats commonly observed in modern environments:

ONNX, TorchScript, Safetensors, GGUF, GGML, TFRecord and similar dataset or model artifacts

### Vector stores and retrieval components

Vector stores and retrieval infrastructure detected via runtime traffic patterns. The system observes vector store activity regardless of the specific store in use. Commonly validated examples include:

- Redis (vector workloads)
- Pinecone, Milvus, Weaviate and more
- MongoDB (vector search)

---

## Coverage maintenance

Coverage is maintained through three complementary mechanisms.

### Automated discovery

Runtime discovery surfaces previously unknown or internal AI services and endpoints as they appear in real environments. This means coverage is not limited to a static list.

### Curated catalog updates

We continuously update the catalog of services, protocols, and formats as the ecosystem evolves. When new technologies emerge, coverage is extended via controlled updates to collectors and parsers.

### Customer-driven expansion

New services observed in customer deployments are triaged and added to the catalog to improve coverage over time.

### Provider metadata enrichment

Where applicable, we enrich model inventory using provider metadata (for example Hugging Face Hub model identifiers and revisions) to keep inventory consistent with upstream model sources and to improve attribution and change tracking.

---

## Deployment

Aurva sensors can be deployed across Kubernetes clusters and VM or bare metal hosts.

- Kubernetes deployments typically run as a DaemonSet
- VM and bare metal deployments run as host-level binaries (often embedded into a golden image)

No application code changes are required. Sensors operate at the kernel level using eBPF and begin producing discovery signals immediately after deployment.

---

## Data handling and privacy

Aurva is designed to be privacy-aware. The system focuses on producing structured metadata and runtime signals needed for visibility and security. It does not capture or store application payload data beyond what is needed for classification and attribution. Data collection and forwarding behavior can be configured to align with customer requirements.

--- 

## Community availability

A community edition is available via AIOStack. This document describes the high-level discovery surface and outputs. For deeper implementation details and enterprise deployment guidance, contact Aurva.

- AIOStack: https://github.com/aurva-io/AIOstack
- Aurva: https://aurva.ai
