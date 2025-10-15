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
    vectors: "Oracle(x2)",
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
  {
    service: "content-moderator",
    ns: "prod-safety",
    role: "sa-moderation",
    exposure: "internal",
    endpoint: "OpenAI",
    calls7d: 2156,
    bytes7d: "520 MB",
    lastSeen: "18m ago",
    owner: "trust-safety",
    confidence: 0.94,
    egress: "third-party",
    vectors: "MongoDB",
  },
  {
    service: "recommendation-api",
    ns: "prod-ml",
    role: "sa-ml-service",
    exposure: "external",
    endpoint: "Bedrock",
    calls7d: 6240,
    bytes7d: "2.8 GB",
    lastSeen: "5m ago",
    owner: "ml-platform",
    confidence: 0.91,
    egress: "third-party",
    vectors: "Redis,PSQL",
  },
  {
    service: "data-pipeline",
    ns: "staging-analytics",
    role: "sa-etl-worker",
    exposure: "internal",
    endpoint: "Cohere",
    calls7d: 892,
    bytes7d: "180 MB",
    lastSeen: "31m ago",
    owner: "unknown",
    confidence: 0.79,
    egress: "third-party",
    vectors: "Snowflake",
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

  const helmCmd = `
helm repo add aiostack https://charts.aurva.ai/
helm repo update

# Extract the default values file
helm show values aiostack/aiostack > values.yaml

# Edit the values.yaml file and replace:
# In Outpost:
# - name: COMMANDER_URL
#   value: "aiostack-commander.<YOUR NAMESPACE>.svc.cluster.local:7470"
# - name: COMPANY_ID
#   value: "<YOUR COMPANY ID>"
# - name: AIOSTACK_VALIDATION_KEY
#   value: "<YOUR AIOSTACK VALIDATION KEY>"

# In Observer:
# - name: OUTPOST_URL
#   value: "aiostack-outpost.<YOUR NAMESPACE>.svc.cluster.local:7471"
# - name: IS_OUTPOST_URL_SECURE
#   value: "false"

# Create namespace 
kubectl create namespace aiostack

# Install with your configured values
helm install myaiostack aiostack/aiostack  --namespace aiostack  --values values.yaml

`;

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

          <div className="mb-6 hidden sm:flex flex-wrap items-center gap-2">
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
              {/* Animated border glow */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-emerald-500/20 opacity-75 blur-sm animate-border-glow" />

              <div className="relative rounded-3xl border border-border bg-card overflow-hidden ring-1 ring-border">
                {/* Header */}
                <div className="relative flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground">Live Detection</span>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-0 divide-y divide-border/50">
                  {[
                    { service: "invoice-ai", provider: "OpenAI", ns: "prod-finance", calls: "1.2k", time: "2m ago", shadow: false },
                    { service: "webapp-next", provider: "Anthropic", ns: "prod-app", calls: "847", time: "4m ago", shadow: true },
                    { service: "auth-mgr", provider: "Vertex AI", ns: "dev-ai", calls: "340", time: "9m ago", shadow: false },
                    { service: "chat-svc", provider: "Bedrock", ns: "prod-chat", calls: "2.1k", time: "12m ago", shadow: false },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative px-4 py-3 transition hover:bg-muted/30 animate-in fade-in slide-in-from-right-4"
                      style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'backwards' }}
                    >
                      {/* Subtle pulse overlay for first item */}
                      {idx === 0 && (
                        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" style={{ animationDuration: '3s' }} />
                      )}

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-mono text-sm font-medium text-foreground">{item.service}</span>
                            {item.shadow && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-medium text-rose-600 dark:text-rose-300 ring-1 ring-rose-400/20 animate-in fade-in zoom-in-50" style={{ animationDelay: `${idx * 150 + 200}ms`, animationFillMode: 'backwards' }}>
                                <Shield size={10} className="animate-pulse" />
                                shadow
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Server size={11} className="animate-pulse" style={{ animationDuration: '4s' }} />
                              {item.ns}
                            </span>
                            <span>•</span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-300">{item.provider}</span>
                            <span>•</span>
                            <span className="tabular-nums">{item.calls} calls</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Footer */}
                <div className="border-t border-border bg-muted/30 px-4 py-3 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground tabular-nums">37</span> agents
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground tabular-nums">5</span> providers
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-rose-600 dark:text-rose-300 tabular-nums animate-pulse" style={{ animationDuration: '3s' }}>6</span> shadow AI
                      </span>
                    </div>
                    <span className="text-muted-foreground">last 14d</span>
                  </div>
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

          {/* App Mockup */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl ring-1 ring-border">
            {/* App Header with macOS Traffic Lights */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-3">
              <div className="flex items-center gap-4">
                {/* macOS Traffic Lights */}
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                {/* App Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/20">
                    <Database size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">AI Runtime Inventory</div>
                    <div className="text-xs text-muted-foreground">6 services detected</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border transition hover:bg-muted/50">
                  <Activity size={12} />
                  <span>Live</span>
                </button>
              </div>
            </div>

            {/* Table Content with Horizontal Scroll on Mobile */}
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-border" style={{ minWidth: '800px' }}>
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 whitespace-nowrap">Service</th>
                    <th className="px-4 py-3 whitespace-nowrap">Namespace</th>
                    <th className="px-4 py-3 whitespace-nowrap">SA / IAM Role</th>
                    <th className="px-4 py-3 whitespace-nowrap">Exposure</th>
                    <th className="px-4 py-3 whitespace-nowrap">Endpoint</th>
                    <th className="px-4 py-3 whitespace-nowrap">Calls (7d)</th>
                    <th className="px-4 py-3 whitespace-nowrap">Bytes (7d)</th>
                    <th className="px-4 py-3 whitespace-nowrap">Last seen</th>
                    <th className="px-4 py-3 whitespace-nowrap">Owner (lite)</th>
                    <th className="px-4 py-3 whitespace-nowrap">Egress</th>
                    <th className="px-4 py-3 whitespace-nowrap">Databases</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {inventoryRows.map((r) => (
                    <tr key={r.service} className="text-sm hover:bg-muted/30 transition">
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{r.service}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.ns}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${r.exposure === "external"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-200 ring-rose-400/20"
                          : "bg-sky-500/10 text-sky-600 dark:text-sky-200 ring-sky-400/20"
                          }`}>{r.exposure}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.endpoint}</td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap tabular-nums">{r.calls7d.toLocaleString()}</td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">{r.bytes7d}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.lastSeen}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.owner}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.egress}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.vectors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scroll hint for mobile */}
          <div className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
            ← Scroll horizontally to see all columns →
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Pill icon={Info} text="Owner (lite) is inferred from labels/tags" />
            <Pill icon={Info} text="Confidence blends endpoint + SNI + process hints" />
            <Pill icon={Info} text="Privacy: metadata only — no prompts or outputs" />
          </div>
        </Container>
      </section>

      {/* Decorative Motif 1 */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-24">
            {/* Floating particles */}
            <div className="absolute left-[10%] top-4 h-3 w-3 rounded-full bg-emerald-500/30 animate-[float_6s_ease-in-out_infinite]" />
            <div className="absolute left-[25%] top-8 h-2 w-2 rounded-full bg-emerald-400/40 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <div className="absolute left-[45%] top-2 h-4 w-4 rounded-full bg-emerald-500/20 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute right-[35%] top-6 h-2.5 w-2.5 rounded-full bg-emerald-400/35 animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
            <div className="absolute right-[15%] top-10 h-3 w-3 rounded-full bg-emerald-500/25 animate-[float_7.5s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

            {/* Glowing orbs */}
            <div className="absolute left-[15%] top-6 h-16 w-16 rounded-full bg-emerald-500/10 blur-xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
            <div className="absolute right-[20%] top-4 h-20 w-20 rounded-full bg-emerald-400/15 blur-2xl animate-[pulse-glow_5s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>

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

      {/* Decorative Motif 2 */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-32">
            {/* Network connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
              <line x1="20%" y1="50%" x2="40%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" />
              <line x1="40%" y1="30%" x2="60%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
              <line x1="60%" y1="50%" x2="80%" y2="40%" stroke="currentColor" strokeWidth="1" className="text-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            </svg>

            {/* Animated nodes */}
            <div className="absolute left-[20%] top-[50%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/40 ring-2 ring-emerald-500/20 animate-[float-slow_5s_ease-in-out_infinite]" />
            <div className="absolute left-[40%] top-[30%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/50 ring-2 ring-emerald-400/30 animate-[float-slow_6s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <div className="absolute left-[60%] top-[50%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/40 ring-2 ring-emerald-500/20 animate-[float-slow_5.5s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute left-[80%] top-[40%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/45 ring-2 ring-emerald-400/25 animate-[float-slow_6.5s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />

            {/* Gradient blobs */}
            <div className="absolute left-1/4 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500/5 to-emerald-400/10 blur-2xl animate-[pulse-glow_6s_ease-in-out_infinite]" />
            <div className="absolute right-1/4 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-l from-emerald-500/10 to-emerald-400/5 blur-3xl animate-[pulse-glow_7s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Metrics"
            title="Get comprehensive visibility into your AI usage"
            subtitle="Track AI calls, detect patterns, and monitor your infrastructure in real-time."
            center
          />

          <div className="rounded-3xl border border-border bg-card p-6 ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">AI Calls (last 14d)</h3>
              <div className="text-xs text-muted-foreground">demo data</div>
            </div>

            <div className="h-64 w-full">
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

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Metric icon={Server} label="Agents detected" value="37" helper="Active services" />
              <Metric icon={Network} label="LLM providers" value="5" helper="OpenAI, Anthropic, Bedrock, Vertex, Custom" />
              <Metric icon={Shield} label="Shadow AI flags" value="6" helper="Requires attention" />
            </div>
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

      {/* Decorative Motif 3 */}
      <div className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-28">
            {/* Scattered sparkles */}
            <div className="absolute left-[12%] top-4 h-2 w-2 rotate-45 bg-emerald-500/40 animate-[float_5s_ease-in-out_infinite]" />
            <div className="absolute left-[28%] top-12 h-1.5 w-1.5 rotate-45 bg-emerald-400/50 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <div className="absolute left-[42%] top-6 h-2.5 w-2.5 rotate-45 bg-emerald-500/35 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute left-[58%] top-10 h-2 w-2 rotate-45 bg-emerald-400/45 animate-[float_5.5s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
            <div className="absolute left-[72%] top-5 h-1.5 w-1.5 rotate-45 bg-emerald-500/40 animate-[float_6.5s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
            <div className="absolute left-[88%] top-8 h-2 w-2 rotate-45 bg-emerald-400/50 animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }} />

            {/* Circular rings */}
            <div className="absolute left-[30%] top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10 animate-[pulse-glow_5s_ease-in-out_infinite]" />
            <div className="absolute left-[30%] top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/15 animate-[pulse-glow_5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />

            <div className="absolute right-[30%] top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10 animate-[pulse-glow_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute right-[30%] top-1/2 h-18 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/15 animate-[pulse-glow_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

            {/* Background gradient orb */}
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl animate-[pulse-glow_8s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

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

      {/* Install */}
      <section id="install" className="py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Install"
            title="Get signal in minutes"
            subtitle="Use Helm to install in a jiffy. Don't like it ? Uninstall is one command."
            center
          />

          {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted/50 p-1 ring-1 ring-border">
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
          /> */}

          <div className="flex justify-center">
            <PrimaryButton href="/docs/installation/steps">
              <Book size={16} className="mr-2" /> Go to Docs
            </PrimaryButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
            <Pill icon={Lock} text="mTLS to control plane" />
            <Pill icon={Zap} text="One-command uninstall" />
            <Pill icon={Activity} text="Minimal performance overhead" />
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