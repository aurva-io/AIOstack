"use client"

import React, { useMemo, useState } from "react";
import { Check, Clipboard, ClipboardCheck, ExternalLink, Github, Shield, Zap, Eye, Play, Server, Activity, Cloud, Lock, Database, Network, Gauge, ArrowRight, Rocket, FileText, LineChart, Book, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wide text-foreground backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500 ${className}`}
    >
      {children}
    </a>
  );
}

function GhostButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-emerald-900/40 dark: ring-white-300 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
    >
      {children}
    </a>
  );
}

function Pill({ icon: Icon, text }: { icon?: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400/20">
      {Icon ? <Icon size={14} className="shrink-0" /> : null}
      <span>{text}</span>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-xl bg-muted px-2 py-1 font-mono text-[13px] text-emerald-600 dark:text-emerald-200 ring-1 ring-border">
      {children}
    </code>
  );
}

function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title?: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border">
          <span>{eyebrow}</span>
        </div>
      )}
      {title && (
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CopyField({ label, value, footnote }: { label?: string; value: string; footnote?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative w-full">
      {label ? (
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
      ) : null}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-muted p-3 ring-1 ring-border">
        <pre className="scrollbar-none m-0 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] leading-6 text-emerald-600 dark:text-emerald-200">
          {value}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-background text-foreground ring-1 ring-border transition hover:bg-accent"
          aria-label="Copy to clipboard"
        >
          {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
        </button>
      </div>
      {footnote ? (
        <div className="mt-2 text-[11px] text-muted-foreground">{footnote}</div>
      ) : null}
    </div>
  );
}

const callsData = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  calls: Math.round(200 + Math.sin(i / 2) * 80 + Math.random() * 50),
}));

const inventoryRows = [
  {
    service: "invoice-ai",
    ns: "prod-finance",
    role: "sa-invoice-ai",
    exposure: "external",
    endpoint: "OpenAI",
    calls7d: 4812,
    bytes7d: "1.2 GB",
    lastSeen: "2m ago",
    owner: "finance-ml",
    confidence: 0.92,
    egress: "third-party",
    vectors: "PSQL,MySQL",
  },
  {
    service: "webapp-next",
    ns: "prod-app",
    role: "sa-frontend",
    exposure: "external",
    endpoint: "Anthropic",
    calls7d: 3821,
    bytes7d: "860 MB",
    lastSeen: "6m ago",
    owner: "unknown",
    confidence: 0.88,
    egress: "third-party",
    vectors: "Oracle(2)",
  },
  {
    service: "auth-mgr",
    ns: "dev-ai",
    role: "sa-recon",
    exposure: "internal",
    endpoint: "Vertex AI",
    calls7d: 1210,
    bytes7d: "340 MB",
    lastSeen: "13m ago",
    owner: "platform-ai",
    confidence: 0.86,
    egress: "private/VPC",
    vectors: "PSQL (x3)",
  },
];

const shadowFlags = [
  {
    id: 1,
    title: "Prod service 'webapp-nextjs' calling OpenAI",
    why: [
      "No owner tags found",
      "Interacts with 2 medium sensitivity apps",
      "Egress volume much higher than your baseline.",
    ],
    severity: "High",
    lastSeen: "6m ago",
  },
  {
    id: 2,
    title: "'auth-mgr' reading user tables + calling Vertex",
    why: ["No security_reviewed tag", "Accesses 4 low risk DBs with PII", "Accesses 1 DB identified to hold user data"],
    severity: "Medium",
    lastSeen: "22m ago",
  },
];

function Metric({ icon: Icon, label, value, helper }: { icon: React.ComponentType<{ size?: number }>; label: string; value: string; helper?: string }) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4 ring-1 ring-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-400/20">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="truncate text-lg font-semibold text-foreground">{value}</div>
        {helper ? <div className="text-xs text-muted-foreground">{helper}</div> : null}
      </div>
    </div>
  );
}


export default function Home() {
  const [installTab, setInstallTab] = useState("helm");

  const helmCmd = `helm repo add aurva https://charts.aurva.io\nhelm install aurva-ai-inventory aurva/ai-inventory \\n  --namespace aurva --create-namespace \\
  --set clusterName=<your-cluster> --set env=prod`;

  const tfCmd = ` Coming Soon :) `

  const ctrCmd = `docker run --rm -d \\
  --name aurva-ai-inventory \\
  --privileged --pid=host --net=host \\
  -e AURVA_CLUSTER=\"<your-cluster>\" \\
  -e AURVA_ENV=\"prod\" \\
  ghcr.io/aurva/ai-inventory:latest`;

  const installBlock = useMemo(() => {
    if (installTab === "helm") return helmCmd;
    return tfCmd;
  }, [installTab]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">

      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <Container>

          <div className="mb-6 flex flex-wrap items-center gap-2 hidden sm:inline">
            <Badge>Open-core • Metadata-only</Badge>
            <Badge>eBPF • Kubernetes Native</Badge>
            <Badge>One line install</Badge>
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                See every AI call in your cloud <span className="text-emerald-600 dark:text-emerald-300">in 10 minutes</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Auto-discover AI agents, LLM egress, and ownership gaps across your cloud — with read-only eBPF sensors.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Inventory today; lineage and control when you need it.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryButton href="/docs/installation/steps" >
                  <Play size={16} className="mr-2" /> Install Free
                </PrimaryButton>
                {/* <GhostButton href="#sample">
                    <Eye size={16} className="mr-2" /> View Sample Report
                  </GhostButton> */}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-white/70">
                <Pill icon={Gauge} text="TTFF ≤ 10 min" />
                <Pill icon={Lock} text="No content capture" />
                <Pill icon={Activity} text="<2% CPU • <50 MB" />
              </div>
            </div>
            {/* Preview card */}
            <div className="relative">
              <div className="rounded-3xl border border-border bg-card p-4 ring-1 ring-border">
                <div className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-foreground">AI Calls (last 14d)</div>
                  <div className="text-xs text-muted-foreground">demo data</div>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer>
                    <AreaChart data={callsData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
                          <stop offset="100%" stopColor="#34d399" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#e2e8f0" }} itemStyle={{ color: "#34d399" }} />
                      <Area type="monotone" dataKey="calls" stroke="#34d399" fill="url(#g1)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-3">
                  <Metric icon={Server} label="Agents detected" value="37" />
                  <Metric icon={Network} label="LLM providers" value="OpenAI, Anthropic, Bedrock" />
                  <Metric icon={Shield} label="Shadow AI flags" value="6" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Inventory */}
      <section id="inventory" className="py-10 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Runtime inventory"
            title="Find every service calling an LLM"
            subtitle="We fingerprint outbound TLS + process hints to attribute LLM usage to real services, namespaces, and IAM roles."
          />

          <div className="overflow-hidden rounded-2xl border border-border ring-1 ring-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Namespace</th>
                  <th className="px-4 py-3">SA / IAM Role</th>
                  <th className="px-4 py-3">Exposure</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Calls (7d)</th>
                  <th className="px-4 py-3">Bytes (7d)</th>
                  <th className="px-4 py-3">Last seen</th>
                  <th className="px-4 py-3">Owner (lite)</th>
                  {/* <th className="px-4 py-3">Confidence</th> */}
                  <th className="px-4 py-3">Egress</th>
                  <th className="px-4 py-3">Databases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {inventoryRows.map((r) => (
                  <tr key={r.service} className="text-sm">
                    <td className="px-4 py-3 font-medium text-foreground">{r.service}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.ns}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.role}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${r.exposure === "external"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-200 ring-rose-400/20"
                        : "bg-sky-500/10 text-sky-600 dark:text-sky-200 ring-sky-400/20"
                        }`}>{r.exposure}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.endpoint}</td>
                    <td className="px-4 py-3 text-foreground">{r.calls7d.toLocaleString()}</td>
                    <td className="px-4 py-3 text-foreground">{r.bytes7d}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.lastSeen}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.owner}</td>
                    {/* <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded bg-white/10">
                          <div
                            className="h-1.5 rounded bg-emerald-400"
                            style={{ width: `${Math.round(r.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/70">{Math.round(r.confidence * 100)}%</span>
                      </div>
                    </td> */}
                    <td className="px-4 py-3 text-muted-foreground">{r.egress}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.vectors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Pill icon={Info} text="Owner (lite) is inferred from labels/tags" />
            <Pill icon={Info} text="Confidence blends endpoint + SNI + process hints" />
            <Pill icon={Info} text="Privacy: metadata only — no prompts or outputs" />
          </div>
        </Container>
      </section>

      {/* Shadow AI */}
      <section id="shadow" className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Shadow AI detection"
            title="Behavioral risk signals when no review exists"
            subtitle="Flag services making LLM calls without owner or review tags, first-seen behavior in prod, or 3P egress with external exposure."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {shadowFlags.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-foreground">{f.title}</div>
                  <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${f.severity === "High"
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-200 ring-rose-400/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-200 ring-amber-400/20"
                    }`}>{f.severity}</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {f.why.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-300" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">Last seen {f.lastSeen}</div>
                <div className="mt-4 flex items-center gap-2">
                  <GhostButton href="#install" className="!px-3 !py-1.5">
                    See details <ArrowRight size={14} className="ml-1" />
                  </GhostButton>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="Read-only sensors. Real-time results."
            subtitle="Node eBPF collectors observe outbound connects and process hints. A curated endpoint catalog attributes LLM usage with confidence scoring."
            center
          />
          <div className="grid gap-4 md:grid-cols-4">
            {[{ icon: Cloud, title: "Deploy", text: "Helm one-liner installs DaemonSet on your cluster." },
            { icon: Network, title: "Observe", text: "Traffic on your cluster +  process hints." },
            { icon: Eye, title: "Attribute", text: "To providers like OpenAI, Anthropic, Bedrock and many more." },
            { icon: Shield, title: "Flag", text: "Shadow AI: no owner/review, newly seen, unusually high volumes" }].map((s, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-5 ring-1 ring-border">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-400/20">
                  <s.icon size={18} />
                </div>
                <div className="text-sm font-semibold text-foreground">{s.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Install */}
      <section id="install" className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Install"
            title="Get signal in minutes"
            subtitle="Use Helm to install in a jiffy. Don't like it ? Uninstall is one command."
          />

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted/50 p-1 ring-1 ring-border">
            {(["helm", "terraform"]).map((t) => (
              <button
                key={t}
                onClick={() => setInstallTab(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${installTab === t
                  ? "bg-emerald-500 text-white"
                  : "text-foreground hover:bg-muted"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          <CopyField
            label={installTab === "helm" ? "Helm" : installTab === "terraform" ? "Terraform" : "Container"}
            value={installBlock}
            footnote="Preserves privacy: we send connection metadata only (no prompts, outputs, or secrets)."
          />

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <Pill icon={Lock} text="mTLS to control plane" />
            <Pill icon={Zap} text="One-command uninstall" />
            <Pill icon={Activity} text="Minimal performance overhead" />
          </div>
        </Container>
      </section>

      {/* Security & Performance */}
      <section id="security" className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Privacy & performance"
            title="Metadata-only by design"
            subtitle="We never collect prompts, responses, or secrets. Sensors are read-only and bounded."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <Metric icon={Lock} label="Sensitive Content captured" value="None" helper="Metadata only" />
            <Metric icon={Activity} label="CPU overhead" value="< 2%" helper="p95 < 5%" />
            <Metric icon={Gauge} label="Fast" value="< 10 mins" helper="MTTV" />
          </div>
        </Container>
      </section>

      {/* Pricing / Add-on value */}
      <section id="pricing" className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Add-on value"
            title="Upgrade to AI Data Guard when you need lineage and control"
            subtitle="Keep the free runtime inventory. Add sensitive→LLM lineage, intent policies, and regulated alerts when you're ready."
          />
          <div className="grid items-start gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 ring-1 ring-border">
              <div className="mb-2 text-sm font-semibold text-foreground">Free — AI Runtime Inventory</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Auto-discover AI agents and LLM endpoints",
                  "Shadow AI flags (no owner/review, first-seen in prod)",
                  "Owner (lite) inference from labels/tags",
                  "Database fingerprints (Oracle, PSQL, MySQL, Redis and more)",
                  "Data classification and sensitivity labels (lite) ",
                  "Standard Login",
                  "7-day lookback, community support",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-300" />{li}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <GhostButton href="/docs/home">
                  Read Docs <Book size={14} className="ml-2" />
                </GhostButton>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 ring-1 ring-emerald-400/30">
              <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200">
                <Rocket size={16} /> Paid v1 — AI Data Guard
              </div>
              <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-100">
                {[
                  "Sensitive→LLM lineage (Snowflake, Postgres, Redshift, Athena)",
                  "Intent policies by team/service and provider allowlists",
                  "Regulated egress alerts with evidence",
                  "SIEM export • 30-90 day retention",
                  "SSO support",
                  "Deep Data Classification and Sensitive data scans",
                  "24/7 Support"
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-300" />{li}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <PrimaryButton href="#contact">
                  Talk to Sales <ArrowRight size={14} className="ml-2" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 sm:py-20">
        <Container>
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          <div className="grid gap-4 md:grid-cols-2">
            {[{
              q: "Do you collect prompts, responses, or secrets?",
              a: "No. We collect connection metadata only (dest domain/SNI, ports, process hints, and service identity).",
            },
            {
              q: "What environments are supported?",
              a: "Kubernetes(EKS/GKE) is the primary path. Feel free to reach out to us for your needs.",
            },
            {
              q: "Can I uninstall easily?",
              a: "Yes. One Helm uninstall detaches all kernel hooks. No residual processes remain. Although do note that we will be sad to see you go :(",
            },
            {
              q: "How do you infer owner (lite)?",
              a: "We derive owner from Kubernetes labels/namespaces and AWS tags. Verified ownership is part of the paid add-on.",
            },
            {
              q: "I am a large finacial org and need a PaaS option.",
              a: "While we encourage SaaS, we'd be happy to help you out with a PaaS deployment if you have the genuine need. Reach out to our team for more info :)",
            },
            {
              q: "I read through all this, but didn't understand what AIOStack does.",
              a: "No problem.  AIOStack is an eBPF based tool that you can deploy to Kubernetes to discover, track and monitor AI services no matter what they are named or claim to be. Additionally we can tell you what databases, applications and external domains they communicate with and if you should be concerned about its behaviour.",
            },
            {
              q: "I really liked the product and want alerts, SSO and integration with Slack and Jira.",
              a: "We are thrilled that you liked our product ! Reach out to us so that we can upgrade you to the Data Guard plan.",
            },
            {
              q: "I see a lot of \"AI\" here, will the Data Guard plan cost me a bomb ?",
              a: "Haha, not really. We know that pricing can be scary, reach out to us and expect to be pleasantly surprised by how much we can save you   :)",
            },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 ring-1 ring-border">
                <div className="text-sm font-semibold text-foreground">{f.q}</div>
                <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}