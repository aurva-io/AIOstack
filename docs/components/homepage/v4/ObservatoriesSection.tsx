"use client"

function ModelsDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="v4-mini-svg">
      <defs>
        <marker id="m4-a1" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.5)"/>
        </marker>
      </defs>
      {/* caller */}
      <g>
        <rect x={12} y={64} width={70} height={32} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
        <text x={47} y={84} textAnchor="middle" className="v4-svg-title">caller</text>
      </g>
      {/* model bus */}
      <line x1={82} y1={80} x2={140} y2={80} stroke="rgba(255,255,255,.5)" markerEnd="url(#m4-a1)"/>
      <text x={111} y={72} textAnchor="middle" className="v4-svg-tag">invoke</text>
      {/* models */}
      {[
        { y: 16,  name: "claude-3-haiku", tag: "bedrock" },
        { y: 60,  name: "embedding-3-sm", tag: "openai" },
        { y: 104, name: "llama-3-70b",    tag: "self-host" },
      ].map((m, i) => (
        <g key={i}>
          <line x1={140} y1={80} x2={170} y2={m.y + 16} stroke="rgba(255,255,255,.3)"/>
          <rect x={170} y={m.y} width={130} height={32} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.4)"/>
          <text x={178} y={m.y + 14} className="v4-svg-mark" style={{ fill: "rgba(255,255,255,.45)" }}>{m.tag.toUpperCase()}</text>
          <text x={178} y={m.y + 26} className="v4-svg-title">{m.name}</text>
        </g>
      ))}
      {/* eBPF tick */}
      <text x={12} y={150} className="v4-svg-coord">SEEN BY · eBPF KPROBE / SOCK_OPS</text>
    </svg>
  )
}

function EndpointsDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="v4-mini-svg">
      <defs>
        <pattern id="e4-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,.04)"/>
        </pattern>
      </defs>
      <rect x={4} y={4} width={312} height={140} fill="url(#e4-grid)"/>
      {/* cluster boundary */}
      <rect x={12} y={20} width={140} height={110} fill="none" stroke="rgba(255,255,255,.3)" strokeDasharray="3 3"/>
      <text x={20} y={32} className="v4-svg-mark">CLUSTER</text>
      {/* nodes */}
      <circle cx={50}  cy={70} r={5} fill="rgba(255,255,255,.85)"/>
      <circle cx={88}  cy={92} r={5} fill="rgba(255,255,255,.85)"/>
      <circle cx={120} cy={56} r={5} fill="rgba(255,255,255,.85)"/>
      {/* external bus */}
      <line x1={152} y1={75} x2={185} y2={75} stroke="rgba(255,255,255,.4)"/>
      <text x={168} y={68} textAnchor="middle" className="v4-svg-tag">egress</text>
      {/* external endpoints */}
      {[
        { y: 26,  name: "api.openai.com", tag: "OK",  alert: false },
        { y: 60,  name: "bedrock.aws",    tag: "OK",  alert: false },
        { y: 94,  name: "38.142.21.7",    tag: "NEW", alert: true  },
        { y: 122, name: "pinecone.io",    tag: "OK",  alert: false },
      ].map((e, i) => (
        <g key={i}>
          <line x1={185} y1={75} x2={205} y2={e.y + 6} stroke={e.alert ? "rgba(225,118,90,.7)" : "rgba(255,255,255,.25)"}/>
          <rect x={205} y={e.y} width={108} height={14} fill="none" stroke={e.alert ? "rgba(225,118,90,.7)" : "rgba(255,255,255,.4)"}/>
          <text x={211} y={e.y + 10} className="v4-svg-title"
            style={{ fill: e.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.85)" }}>{e.name}</text>
          <text x={307} y={e.y + 10} textAnchor="end" className="v4-svg-tag"
            style={{ fill: e.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.4)" }}>{e.tag}</text>
        </g>
      ))}
      <text x={12} y={150} className="v4-svg-coord">SEEN BY · TC · SOCK_OPS</text>
    </svg>
  )
}

function IdentitiesDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="v4-mini-svg">
      {[
        { x: 12,  label: "actor",    sub: "human/sched" },
        { x: 84,  label: "agent",    sub: "k8s pod" },
        { x: 156, label: "sa→role",  sub: "iam chain" },
        { x: 230, label: "resource", sub: "rds·s3·model" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={50} width={70} height={44} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
          <text x={n.x + 6} y={66} className="v4-svg-mark" style={{ fill: "rgba(255,255,255,.45)" }}>0{i + 1}</text>
          <text x={n.x + 6} y={80} className="v4-svg-title">{n.label}</text>
          <text x={n.x + 6} y={90} className="v4-svg-sub">{n.sub}</text>
          {i < 3 && <line x1={n.x + 70} y1={72} x2={n.x + 84} y2={72} stroke="rgba(255,255,255,.5)"/>}
        </g>
      ))}
      {/* drift annotation */}
      <line x1={156} y1={50} x2={156} y2={28} stroke="rgba(225,118,90,.7)" strokeDasharray="2 2"/>
      <rect x={120} y={14} width={130} height={14} fill="none" stroke="rgba(225,118,90,.7)"/>
      <text x={185} y={24} textAnchor="middle" className="v4-svg-tag-alert">drift · 1 new perm 24h</text>
      {/* tick */}
      <text x={12} y={130} className="v4-svg-coord">JOIN · K8S API · CLOUDTRAIL · IAM</text>
      <text x={12} y={146} className="v4-svg-coord">PER · IDENTITY · 90D BASELINE</text>
    </svg>
  )
}

function DatasourcesDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="v4-mini-svg">
      <defs>
        <marker id="d4-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0L7 4L0 8z" fill="rgba(170,220,138,.85)"/>
        </marker>
      </defs>
      {/* agent */}
      <rect x={10} y={64} width={64} height={32} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
      <text x={42} y={78} textAnchor="middle" className="v4-svg-title">agent</text>
      <text x={42} y={90} textAnchor="middle" className="v4-svg-sub">pii-analyzer</text>
      {/* FSM gate */}
      <line x1={74} y1={80} x2={108} y2={80} stroke="rgba(255,255,255,.5)"/>
      <rect x={108} y={58} width={84} height={44} fill="rgba(0,0,0,.4)" stroke="rgba(170,220,138,.7)"/>
      <text x={114} y={72} className="v4-svg-mark" style={{ fill: "rgba(170,220,138,.95)" }}>eBPF · FSM</text>
      <text x={114} y={86} className="v4-svg-title" style={{ fontSize: 10 }}>parses query</text>
      <text x={114} y={97} className="v4-svg-sub">SELECT · cols · rows</text>
      <line x1={192} y1={80} x2={216} y2={80} stroke="rgba(170,220,138,.85)" markerEnd="url(#d4-arr)"/>
      {/* datasources */}
      {[
        { y: 16,  name: "rds: docs", tag: "PII", alert: true  },
        { y: 50,  name: "s3: pii/*", tag: "PII", alert: true  },
        { y: 84,  name: "pinecone",  tag: "VEC", alert: false },
        { y: 118, name: "redis",     tag: "KV",  alert: false },
      ].map((d, i) => (
        <g key={i}>
          <rect x={216} y={d.y} width={92} height={20} fill="none"
            stroke={d.alert ? "rgba(225,118,90,.65)" : "rgba(255,255,255,.4)"}/>
          <text x={222} y={d.y + 14} className="v4-svg-title"
            style={{ fontSize: 10, fill: d.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.85)" }}>{d.name}</text>
          <text x={302} y={d.y + 14} textAnchor="end" className="v4-svg-tag"
            style={{ fill: d.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.4)" }}>{d.tag}</text>
        </g>
      ))}
      <text x={12} y={150} className="v4-svg-coord">SEEN BY · NETWORK FSM · PG · MYSQL · HTTP · GRPC</text>
    </svg>
  )
}

function Observatory({
  index, title, sub, diagram, rows, ledger,
}: {
  index: string
  title: string
  sub: string
  diagram: React.ReactNode
  rows: [string, string, string][]
  ledger: [string, string][]
}) {
  return (
    <div className="v4-obs">
      <div className="v4-obs-head">
        <span className="v4-section-num">§ 02 · {index}</span>
        <span className="v4-mono v4-mono-dim">obs/{title.toLowerCase().replace(/\s+/g, "-")}</span>
      </div>
      <div className="v4-obs-title-row">
        <h3 className="v4-h3">{title}</h3>
        <span className="v4-mono v4-mono-dim">{sub}</span>
      </div>

      <div className="v4-obs-diagram">{diagram}</div>

      <div className="v4-obs-rows">
        <div className="v4-obs-rows-head">
          <span>name</span>
          <span>kind</span>
          <span>signal</span>
        </div>
        {rows.map(([a, b, c], i) => (
          <div key={i} className="v4-obs-row">
            <span className="v4-mono">{a}</span>
            <span className="v4-mono v4-mono-dim">{b}</span>
            <span className="v4-mono v4-mono-dim">{c}</span>
          </div>
        ))}
      </div>

      <div className="v4-obs-ledger">
        {ledger.map(([k, v], i) => (
          <div key={i}>
            <span className="v4-ledger-key">{k}</span>
            <span className="v4-ledger-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ObservatoriesSection() {
  return (
    <section className="v4-section v4-bordered">
      <div className="v4-container">
        <div className="v4-section-head">
          <span className="v4-section-num">§ 02</span>
          <h2 className="v4-h2">
            Four observatories.<br/>
            One agent. Same evidence.
          </h2>
          <p className="v4-section-lead">
            AIOStack does not give you a generic dashboard. It gives you four precise inventories — every app and model running, every identity that ran them, every endpoint they called, every datasource they read — joined onto the same runtime trace.
          </p>
        </div>
      </div>

      <div className="v4-container v4-obs-grid">
        <Observatory
          index="01"
          title="Apps & Models"
          sub="every model invocation, observed"
          diagram={<ModelsDiagram/>}
          rows={[
            ["claude-3-haiku",      "bedrock",   "12,408 calls · 24h"],
            ["claude-3-sonnet",     "bedrock",   "1,820 calls · 24h"],
            ["text-embedding-3-sm", "openai",    "84,012 calls · 24h"],
            ["llama-3-70b",         "self-host", "412 calls · 24h"],
            ["gemini-1.5-flash",    "vertex",    "0 calls · 24h"],
          ]}
          ledger={[
            ["catalog",      "12 distinct models · 4 providers"],
            ["unsanctioned", "2 models invoked off-list"],
            ["traffic",      "98,652 invocations · last 24h"],
            ["data",         "prompts, completions, tokens, latency"],
          ]}
        />

        <Observatory
          index="02"
          title="Identities"
          sub="every identity that touched AI"
          diagram={<IdentitiesDiagram/>}
          rows={[
            ["dataplane-sa",     "k8s-sa",  "12 perms · 3 used"],
            ["iam: pii-analyzer","aws-role", "drift · 1 new perm 24h"],
            ["okta-svc",        "federated","2 calls · sanctioned"],
            ["scheduler-cron",  "k8s-sa",   "bedrock only · OK"],
            ["ci-runner",       "aws-role", "first seen 2d ago"],
          ]}
          ledger={[
            ["catalog",  "47 identities · 6 service accounts"],
            ["drift",    "3 identities with new perms this week"],
            ["baseline", "90d · least privilege computed"],
            ["data",     "sa → role → resource, per call"],
          ]}
        />

        <Observatory
          index="03"
          title="Endpoints"
          sub="every URL the AI talks to"
          diagram={<EndpointsDiagram/>}
          rows={[
            ["api.openai.com/v1/embeddings", "egress",   "external · sanctioned"],
            ["bedrock.amazonaws.com",        "egress",   "in-vpc · sanctioned"],
            ["38.142.21.7:443",              "egress",   "novel · 3d ago"],
            ["pinecone.io/vectors/upsert",   "egress",   "external · sanctioned"],
            ["internal: rds.docs:5432",      "internal", "in-cluster"],
          ]}
          ledger={[
            ["catalog", "147 endpoints reached in 30d"],
            ["new",     "8 endpoints first-seen this week"],
            ["traffic", "1.2 TB egress · 24h"],
            ["data",    "destination, payload, mTLS, identity"],
          ]}
        />

        <Observatory
          index="04"
          title="Datasources"
          sub="every byte of sensitive data, traced"
          diagram={<DatasourcesDiagram/>}
          rows={[
            ["rds: docs.users",      "postgres",  "pii · 24,108 reads · 24h"],
            ["s3://pii-vault/*",     "object",    "pii · 1.8 GB read"],
            ["pinecone: emb-prod",   "vector",    "3.4M queries · embeddings"],
            ["redis: session-cache", "kv",        "tokens · in-cluster"],
            ["snowflake: analytics", "warehouse", "4 columns · pii"],
          ]}
          ledger={[
            ["catalog", "38 datasources · 11 carry pii"],
            ["fsm",     "network FSMs parse pg · mysql · http · grpc"],
            ["flow",    "agent → query → row → exfil, mapped"],
            ["data",    "queries, columns, rows, payload size"],
          ]}
        />
      </div>
    </section>
  )
}
