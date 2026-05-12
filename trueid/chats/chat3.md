# AIOStack messaging framework

_Started 2026-05-08 07:45 UTC_

---

## User

The current page had some nice wording :
Every AI in your stack.
Mapped. Traced. Governed.
AIOStack auto-discovers every model, agent, and AI service running across your Kubernetes and cloud — with eBPF and read-only cloud APIs. Zero code changes. Zero sidecars. Live in ten minutes.
One platform, every layer of the AI stack.
Built for security, platform, and AI teams who can't afford to find out about an AI agent from a postmortem. Drop AIOStack in once and observe everything — from the eBPF kernel up to the embedding endpoint.

One curl. Ten minutes.
A single install script provisions the AIOStack agent across your nodes via Helm. Default config, sane policies, ready to observe.

02
eBPF watches the kernel.
Zero application changes. The agent attaches probes to socket and syscall paths, capturing flows, identities, and AI traffic with no measurable overhead.

03
Cloud APIs fill the picture.
Read-only IAM, RDS, and metadata APIs map ServiceAccounts → IAM roles → policies → resources. The full identity graph, generated automatically.

Truly zero code changes.
No SDKs to import. No proxies in front of your model. No service-mesh sidecar. The agent sits one layer below your application — your services don't know it's there, but you see everything they do.

Works with EKS, GKE, AKS, and self-managed Kubernetes

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: update_todos]_

_[tool: snip]_

_[tool: write_file]_

I have the system. Building a new variant focused on the runtime-behavior-vs-static-policy positioning. The aesthetic stays consistent with the existing dark space treatment, but I'll introduce a third color (warm amber) to distinguish the AI reasoning layer from runtime (green) and cloud context (purple), and a horizontal "chain" motif as a visual through-line.

Let me start by writing the new sections file.

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: update_todos]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Built a third variant — **Hero V3 (Behavior Graph)** — added as a new artboard alongside V1 and V2 in the design canvas.

The positioning shift: V1/V2 lead with "discover every AI." V3 leads with the harder claim — *authorized but inappropriate* — and shows the gap between the IAM identity graph and the runtime behavior graph as the through-line of the entire page.

**What's in V3:**
- **Hero** — the breach narrative ("12 allowed, 2 used, a third one touched Tuesday, 50k rows, gone in 8s") rendered as an IAM-says/Runtime-says split panel, with the actor→agent→service→data→destination chain motif introduced underneath
- **Three layers (eBPF · cloud context · AI reasoning)** — stacked overlapping cards instead of three side-by-side products, with green/purple/amber distinguishing the layers per your color brief
- **Outcomes** — six-tab grid (Discovery, Visibility, Risk, Investigation, Governance, AI-native) each with five concrete shippable items
- **Policy vs. Behavior** — full split-screen comparison: granted permissions vs. live syscall stream, both ending in opposing verdicts
- **AI-specific security** — six cards (Bedrock inventory, agent blast radius, prompt-injection impact mapping, model baselines, NHI governance, anomalous chains) each with a concrete stat
- **Governance as outcome** — the "8 granted → 2 used → revoke 6" before/after permission diff with evidence bundle and "Apply as policy diff" CTA

Tone follows the brief: no shields/locks, no "single pane of glass," every claim grounded in a specific signal source. Color language: green = runtime/eBPF, purple = cloud context, amber = AI reasoning.

## User

too many buzzwords, nobody is gona understand that this secures ai. i also don't like the visual design, its too generic ai themed. scrap it, make it something Palantir would build, modern design, lines, etc. I also don't like that we have so much content only around identity, what about Models and endpoints too . techincal yet minimal that is awe inspiring. that shuld be key, for example, i reall liked the how it works portion

## Assistant

_[tool: snip]_

_[tool: list_files]_

_[tool: delete_file]_

_[tool: read_file]_

_[tool: update_todos]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Replaced V3 with **V4 — Hero (Schematic)** in the canvas. The aesthetic borrows from Palantir/engineering schematics: near-black surfaces, off-white type, mono small-caps labels, fine grids with coordinate ticks, corner-bracket node frames, and a thin frame around the entire page.

**What changed structurally:**
- Hero pairs a terse bulletin ("See every model, agent, and endpoint running in your cluster") with a giant 4-band schematic (L4 application → L3 identity → L2 data → L1 kernel/eBPF) — every node drawn with bracket corners, every band labeled with a coordinate tick
- **§ 02 — Three observatories**: Models, Endpoints, *and* Identities now sit side-by-side with equal weight, each with its own schematic, signal table, and ledger
- **§ 03 — How it works** kept the rhythm you liked but reframed as a 4-step grid + a matching schematic terminal
- **§ 04 — Six outcomes** as a precise 3×2 schematic grid
- **§ END** — closing CTA with a control-plane ledger on the right

No buzzwords ("zero-trust", "single pane of glass", emoji, gradient slop) — every claim is backed by a concrete signal source (sock_ops, kprobe, cloudtrail, k8s api).

## User

the hero text could be better, I liked the one in hero v1 better. Focus on securing. We're missing the visibiity into AI services/agents in their env here. The how it works can ditch the fake terminal and do something fancier and add the AI reasoning to it. Also mention abilities like detecting shadow ai somewhere, and that zero code changes needed, you applications won't know we exisst

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Updated V4 hero + How-it-works:

**Hero copy** — back to the V1 cadence, sharpened for security:
> Every AI in your stack. **Discovered. Mapped. Secured.**
>
> AIOStack secures the AI agents, models, and services running in your environment — including the ones nobody told you about. Zero code changes. Your applications will not know we exist.

**Ledger** now leads with `discovers · shadow AI · agents · models · endpoints` and `secures · identity · data flow · egress · prompts` to surface visibility-into-AI-agents and shadow AI explicitly.

**§ 02 — How it works** — terminal replaced with a proper schematic pipeline diagram (FIG. 02): top spine `SOURCE · YOUR INFRA → eBPF KERNEL · CLOUD CONTROL-PLANE`, four bracket-cornered nodes (Install → Observe → Enrich → **Reason**), bottom spine outputs to `SECURED AI · LIVE INVENTORY · NARRATED ALERTS`. The fourth stage is the new AI reasoning step — baseline, narrate, rank.

**Step copy** also rewritten:
- 01 — "no SDK, no proxy, no sidecar — your applications will never know we are there"
- 02 — "shadow AI surfaces the moment it runs"
- 04 — new step: "AI reasons over the trace" (baseline / narrate / explain / rank)

## User

we forgot to mention that we also trace datasources. We have network level Finite State machines runnign in ebpf to capture query data and help you map sensitive data flow. Our picture is apps, identities (roles, service accounts), endpoints, datasources.  The how it works figure too is rather mundane right now. 
The installation section is missing the curl -fsSL https://aurva.ai/install.sh | bash command that they can run to install

## Assistant

_[tool: snip]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Updated V4 with the four-pillar story and a richer pipeline:

**Hero**
- Lead copy now mentions every app, identity, endpoint, **and datasource** mapped from kernel up
- New install card directly under the lead with the actual command and a one-click COPY button:
  `$ curl -fsSL https://aurva.ai/install.sh | bash`
- Hero schematic L1 band now calls out the **network FSM** alongside sock_ops/kprobe/tc/uprobe with an accent tag — *"parses queries · maps sensitive data flow"*

**§ 02 — Four observatories** (was three)
- **01 Apps & Models** · **02 Identities** · **03 Endpoints** · **04 Datasources**
- Datasources card lists rds/s3/pinecone/redis/snowflake with PII tags, traffic counts, and a custom diagram showing the FSM gate parsing a query into columns + rows before it reaches the datasource (`agent → eBPF·FSM → datasource`)
- Ledger calls out: *fsm parses pg · mysql · http · grpc* and *agent → query → row → exfil, mapped*

**§ 03 — How it works pipeline (FIG. 02)**
Rebuilt as a three-band schematic:
- **SOURCE band** — five read-only feeds (k8s api, cloudtrail, eBPF syscall, **eBPF · NET FSM**, bedrock/vertex) — the FSM source is highlighted in accent
- **MERGED EVENT BUS** spine across the middle
- **STAGE band** — Install → Observe (eBPF + FSM) → Correlate (identity graph) → Reason (AI analyzer)
- **OUTPUT band** — Live Inventory · Data-flow Map · Right-sized IAM · Narrated Alerts

The four step cards below now read Install / eBPF observes from below / Cloud APIs draw the rest / AI reasons over the trace.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Fixed the row layout — observatory rows now stack: name on top, kind+signal as a single mono-dim line below. No overlap at 4-up.

## User

add the trusted by company logos thing here in v4 too, but maybe in a different format.

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Added a **§ A · DEPLOYED AT** registry-style roster instead of a marquee — schematic 6-up grid of 12 customer cards. Each cell has a corner bracket, an ID tag (A01–A12), the company name, and two mono `<sig>` tags for sector + region (e.g. `obs · us-east`). The header pairs a section title with a small ledger (count / since / scope) on the right. Sits between Outcomes and the final CTA, matching the rest of the V4 aesthetic — no marquee, no logos, just a precise manifest.

## User

remove v1 and v2, i'll go ahead with v4

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: delete_file]_

_[tool: done]_

_[tool: snip]_

Done. V4 is now the only landing artboard in the canvas, and the V1/V2 source files (index.html, index-v2.html, heroes.jsx, sections.jsx, product-preview.jsx) are deleted.

