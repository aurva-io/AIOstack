"use client"

import { useState } from "react"
import Link from "next/link"
import { V4Icon } from "./V4Icon"

type Tone = "white" | "dim" | "accent" | "alert"

function SchematicNode({
  x, y, w, h, title, sub, mark, tone = "white",
}: {
  x: number; y: number; w: number; h: number
  title: string; sub: string; mark: string; tone?: Tone
}) {
  const stroke = {
    white: "rgba(255,255,255,.55)",
    dim: "rgba(255,255,255,.22)",
    accent: "rgba(64,203,81,.7)",
    alert: "rgba(225,118,90,.65)",
  }[tone]
  const fg = {
    white: "rgba(255,255,255,.95)",
    dim: "rgba(255,255,255,.55)",
    accent: "rgba(170,220,138,.95)",
    alert: "rgba(245,170,135,.95)",
  }[tone]
  return (
    <g>
      {/* corner brackets */}
      <path d={`M ${x} ${y + 8} L ${x} ${y} L ${x + 8} ${y}`} fill="none" stroke={stroke} strokeWidth="1.2" />
      <path d={`M ${x + w - 8} ${y} L ${x + w} ${y} L ${x + w} ${y + 8}`} fill="none" stroke={stroke} strokeWidth="1.2" />
      <path d={`M ${x} ${y + h - 8} L ${x} ${y + h} L ${x + 8} ${y + h}`} fill="none" stroke={stroke} strokeWidth="1.2" />
      <path d={`M ${x + w - 8} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - 8}`} fill="none" stroke={stroke} strokeWidth="1.2" />
      <rect x={x} y={y} width={w} height={h} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5" />
      <text x={x + 10} y={y + 18} className="v4-svg-mark" style={{ fill: "rgba(255,255,255,.45)" }}>{mark}</text>
      <text x={x + 10} y={y + 36} className="v4-svg-title" style={{ fill: fg }}>{title}</text>
      <text x={x + 10} y={y + 50} className="v4-svg-sub" style={{ fill: "rgba(255,255,255,.45)" }}>{sub}</text>
    </g>
  )
}

function HeroSchematic() {
  return (
    <div className="v4-schematic-wrap">
      <div className="v4-schematic-chrome">
        <span className="v4-mono v4-mono-dim">FIG.&nbsp;01</span>
        <span className="v4-mono v4-mono-dim">aiostack · runtime map</span>
        <span className="v4-mono v4-mono-dim">cluster: aurva-prod</span>
      </div>

      <svg viewBox="0 0 600 720" className="v4-schematic" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="v4-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="0.5" />
          </pattern>
          <marker id="v4-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.55)" />
          </marker>
          <marker id="v4-arrow-dim" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.25)" />
          </marker>
        </defs>

        <rect width="600" height="720" fill="url(#v4-grid)" />

        {/* Frame ticks */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <line x1={120 * i} y1={0} x2={120 * i} y2={6} stroke="rgba(255,255,255,.3)" />
            <line x1={120 * i} y1={714} x2={120 * i} y2={720} stroke="rgba(255,255,255,.3)" />
            <line x1={0} y1={120 * i} x2={6} y2={120 * i} stroke="rgba(255,255,255,.3)" />
            <line x1={594} y1={120 * i} x2={600} y2={120 * i} stroke="rgba(255,255,255,.3)" />
          </g>
        ))}

        {/* Layer bands */}
        {[
          { y: 60, label: "L4 · APPLICATION", tag: "k8s" },
          { y: 220, label: "L3 · IDENTITY", tag: "iam" },
          { y: 380, label: "L2 · DATA", tag: "rds·s3·vec" },
          { y: 540, label: "L1 · KERNEL · eBPF", tag: "syscall" },
        ].map((b, i) => (
          <g key={i}>
            <line x1={20} y1={b.y - 22} x2={580} y2={b.y - 22} stroke="rgba(255,255,255,.07)" strokeDasharray="2 4" />
            <text x={24} y={b.y - 28} className="v4-svg-label">{b.label}</text>
            <text x={576} y={b.y - 28} textAnchor="end" className="v4-svg-label-dim">{b.tag}</text>
          </g>
        ))}

        {/* L4 — APPLICATION */}
        <SchematicNode x={70} y={60} w={130} h={56} title="pii-analyzer" sub="bedrock · agent" mark="A1" tone="white" />
        <SchematicNode x={235} y={60} w={130} h={56} title="doc-classifier" sub="langchain · agent" mark="A2" tone="white" />
        <SchematicNode x={400} y={60} w={130} h={56} title="aurva-ocr" sub="onnx · service" mark="S1" tone="dim" />

        {/* L3 — IDENTITIES */}
        <SchematicNode x={70} y={220} w={170} h={56} title="dataplane-sa" sub="kube · serviceaccount" mark="ID·1" tone="accent" />
        <SchematicNode x={275} y={220} w={170} h={56} title="iam: pii-analyzer" sub="aws · role · 12 perms" mark="ID·2" tone="white" />
        <SchematicNode x={480} y={220} w={70} h={56} title="okta-svc" sub="federated" mark="ID·3" tone="dim" />

        {/* L2 — ENDPOINTS / DATASOURCES */}
        <SchematicNode x={50} y={380} w={130} h={56} title="bedrock.invoke" sub="claude-3-haiku" mark="EP·1" tone="white" />
        <SchematicNode x={195} y={380} w={130} h={56} title="openai/embed" sub="external" mark="EP·2" tone="alert" />
        <SchematicNode x={340} y={380} w={100} h={56} title="rds: docs" sub="postgres · pii" mark="DS·1" tone="white" />
        <SchematicNode x={455} y={380} w={95} h={56} title="s3: pii/*" sub="bucket · obj" mark="DS·2" tone="white" />

        {/* L1 — eBPF */}
        <g>
          <rect x={40} y={540} width={520} height={74} rx={2}
            fill="rgba(255,255,255,.02)"
            stroke="rgba(255,255,255,.18)" strokeWidth="0.8" />
          <text x={56} y={562} className="v4-svg-mark">L1</text>
          <text x={56} y={580} className="v4-svg-title">aiostack-agent · DaemonSet</text>
          <text x={56} y={594} className="v4-svg-sub">eBPF probes · sock_ops · kprobe · tc · uprobe</text>
          <text x={56} y={608} className="v4-svg-tag-accent">+ network FSM · parses queries · maps sensitive data flow</text>
          <g transform="translate(380, 552)">
            {["sock_ops", "kprobe", "tc", "uprobe", "FSM"].map((t, i) => (
              <g key={i} transform={`translate(${i * 36}, 0)`}>
                <rect x={0} y={0} width={32} height={26} fill="none"
                  stroke={t === "FSM" ? "rgba(170,220,138,.7)" : "rgba(255,255,255,.16)"} />
                <text x={16} y={17} textAnchor="middle" className="v4-svg-tag"
                  style={{ fill: t === "FSM" ? "rgba(170,220,138,.95)" : undefined }}>{t}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Connections: application -> identity */}
        <line x1={135} y1={116} x2={155} y2={220} stroke="rgba(255,255,255,.5)" strokeWidth="0.9" markerEnd="url(#v4-arrow)" />
        <line x1={300} y1={116} x2={210} y2={220} stroke="rgba(255,255,255,.5)" strokeWidth="0.9" markerEnd="url(#v4-arrow)" />
        <line x1={465} y1={116} x2={235} y2={220} stroke="rgba(255,255,255,.25)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)" />

        {/* identity chain */}
        <line x1={240} y1={248} x2={275} y2={248} stroke="rgba(255,255,255,.55)" strokeWidth="0.9" markerEnd="url(#v4-arrow)" />
        <line x1={445} y1={248} x2={480} y2={248} stroke="rgba(255,255,255,.25)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)" />

        {/* application -> endpoints */}
        <path d="M 135 116 L 135 360 L 125 380" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="0.9" markerEnd="url(#v4-arrow)" />
        <path d="M 300 116 L 300 360 L 290 380" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="0.9" strokeDasharray="3 3" markerEnd="url(#v4-arrow)" />
        <path d="M 465 116 L 415 380" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="0.7" strokeDasharray="3 3" markerEnd="url(#v4-arrow-dim)" />
        <path d="M 465 116 L 510 380" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)" />

        {/* eBPF observation arrows */}
        {[100, 220, 360, 500].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={540} x2={x} y2={446} stroke="rgba(64,203,81,.55)" strokeWidth="0.6" strokeDasharray="2 3" />
            <circle cx={x} cy={540} r={2} fill="rgba(64,203,81,.7)" />
            <text x={x + 6} y={530} className="v4-svg-tag-accent">obs</text>
          </g>
        ))}

        {/* External call-out highlight */}
        <g>
          <rect x={216} y={376} width={148} height={64} fill="none" stroke="rgba(225,118,90,.55)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x={290} y={460} textAnchor="middle" className="v4-svg-tag-alert">novel destination · 3 days ago</text>
        </g>

        {/* coords corner */}
        <text x={580} y={702} textAnchor="end" className="v4-svg-coord">600·720 / RUNTIME · LIVE</text>
        <text x={20} y={702} className="v4-svg-coord">0,0</text>
      </svg>
    </div>
  )
}

export default function HeroV4() {
  const [copyLabel, setCopyLabel] = useState("COPY")
  const installCmd = "curl -fsSL https://aurva.ai/install.sh | bash"

  function handleCopy() {
    navigator.clipboard?.writeText(installCmd)
    setCopyLabel("COPIED")
    setTimeout(() => setCopyLabel("COPY"), 1200)
  }

  return (
    <section className="v4-section v4-hero">
      <div className="v4-rule v4-rule-h" style={{ top: 0 }} />
      <div className="v4-rule v4-rule-h" style={{ bottom: 0 }} />
      <div className="v4-coordinates" />
      <div className="v4-container">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 80, alignItems: "stretch" }}>
          {/* LEFT — copy column */}
          <div className="v4-col">

            <h1 className="v4-display">
              Every AI in your stack.<br />
              <span className="v4-em">Discovered. Mapped. Secured.</span>
            </h1>

            <p className="v4-lead">
              AIOStack secures the AI agents, models, and services running in your environment — including the ones nobody told you about. It reads your kernel and your cloud, maps every app, identity, endpoint, and datasource, and watches what each one actually does. Zero code changes. Your applications will not know we exist.
            </p>

            <div className="v4-install">
              <div className="v4-install-head">
                <span className="v4-mono v4-mono-dim">$ install · 1 cmd</span>
                <button className="v4-install-copy" type="button" onClick={handleCopy}>
                  {copyLabel}
                </button>
              </div>
              <code className="v4-install-cmd">{installCmd}</code>
            </div>

            <div className="v4-cta-row">
              <Link className="v4-btn v4-btn-primary" href="/docs/introduction">
                Install <span className="v4-mono">·</span> 10&nbsp;min
                <V4Icon name="arrow-right" size={14} />
              </Link>
              <a className="v4-btn v4-btn-ghost" href="#how">
                <span className="v4-mono">↓</span> How it works
              </a>
            </div>

            {/* Tiny ledger */}
            <div className="v4-ledger">
              <div>
                <span className="v4-ledger-key">discovers</span>
                <span className="v4-ledger-val">shadow AI · agents · models · endpoints</span>
              </div>
              <div>
                <span className="v4-ledger-key">secures</span>
                <span className="v4-ledger-val">identity · data flow · egress · prompts</span>
              </div>
              <div>
                <span className="v4-ledger-key">install</span>
                <span className="v4-ledger-val">curl · helm · zero code changes</span>
              </div>
              <div>
                <span className="v4-ledger-key">deploy</span>
                <span className="v4-ledger-val">in-VPC · read-only · data never leaves</span>
              </div>
            </div>
          </div>

          {/* RIGHT — schematic */}
          <HeroSchematic />
        </div>
      </div>
    </section>
  )
}
