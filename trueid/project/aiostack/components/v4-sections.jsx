/* ============================================================
   AIOStack — V4 (Palantir-flavored technical schematic)
   Aesthetic: precise lines, off-white on near-black, fine grids,
   coordinate ticks, blueprint-style diagrams, mono small-caps.
   Covers Identity · Models · Endpoints with equal weight.
   ============================================================ */

/* ===== Hero — bulletin/schematic ===== */
const HeroV4 = () => (
  <section className="v4-section v4-hero">
    <div className="v4-rule v4-rule-h" style={{ top: 0 }}/>
    <div className="v4-rule v4-rule-h" style={{ bottom: 0 }}/>
    <div className="v4-coordinates"/>
    <div className="container">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 80, alignItems: "stretch" }}>
        {/* LEFT — copy column */}
        <div className="v4-col">
          <div className="v4-stamp">
            <span>AIOSTACK</span>
            <span className="v4-stamp-divider"/>
            <span>V1.0 · 2026.05</span>
          </div>

          <h1 className="v4-display">
            Every AI in your stack.<br/>
            <span className="v4-em">Discovered. Mapped. Secured.</span>
          </h1>

          <p className="v4-lead">
            AIOStack secures the AI agents, models, and services running in your environment — including the ones nobody told you about. It reads your kernel and your cloud, maps every app, identity, endpoint, and datasource, and watches what each one actually does. Zero code changes. Your applications will not know we exist.
          </p>

          <div className="v4-install">
            <div className="v4-install-head">
              <span className="v4-mono v4-mono-dim">$ install · 1 cmd</span>
              <button className="v4-install-copy" type="button" onClick={(e) => { navigator.clipboard?.writeText('curl -fsSL https://aurva.ai/install.sh | bash'); e.currentTarget.textContent = 'COPIED'; setTimeout(() => { e.currentTarget.textContent = 'COPY'; }, 1200); }}>COPY</button>
            </div>
            <code className="v4-install-cmd">curl -fsSL https://aurva.ai/install.sh | bash</code>
          </div>

          <div className="v4-cta-row">
            <a className="v4-btn v4-btn-primary" href="docs-quickstart.html">
              Install <span className="v4-mono">·</span> 10&nbsp;min
              <Icon name="arrow-right" size={14}/>
            </a>
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
        <HeroSchematic/>
      </div>
    </div>
  </section>
);

/* ===== Hero schematic — full-stack wireframe ===== */
const HeroSchematic = () => {
  // Layout in viewBox 600x720 — drawn precise.
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
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="0.5"/>
          </pattern>
          <marker id="v4-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.55)"/>
          </marker>
          <marker id="v4-arrow-dim" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.25)"/>
          </marker>
        </defs>

        <rect width="600" height="720" fill="url(#v4-grid)"/>

        {/* Frame ticks */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <line x1={120 * i} y1={0} x2={120 * i} y2={6} stroke="rgba(255,255,255,.3)"/>
            <line x1={120 * i} y1={714} x2={120 * i} y2={720} stroke="rgba(255,255,255,.3)"/>
            <line x1={0} y1={120 * i} x2={6} y2={120 * i} stroke="rgba(255,255,255,.3)"/>
            <line x1={594} y1={120 * i} x2={600} y2={120 * i} stroke="rgba(255,255,255,.3)"/>
          </g>
        ))}

        {/* === Layer bands === */}
        {[
          { y: 60,  label: "L4 · APPLICATION",      tag: "k8s" },
          { y: 220, label: "L3 · IDENTITY",          tag: "iam" },
          { y: 380, label: "L2 · DATA",              tag: "rds·s3·vec" },
          { y: 540, label: "L1 · KERNEL · eBPF",     tag: "syscall" },
        ].map((b, i) => (
          <g key={i}>
            <line x1={20} y1={b.y - 22} x2={580} y2={b.y - 22} stroke="rgba(255,255,255,.07)" strokeDasharray="2 4"/>
            <text x={24} y={b.y - 28} className="v4-svg-label">{b.label}</text>
            <text x={576} y={b.y - 28} textAnchor="end" className="v4-svg-label-dim">{b.tag}</text>
          </g>
        ))}

        {/* === L4 — APPLICATION (agents/services) === */}
        <SchematicNode x={70} y={60} w={130} h={56}
          title="pii-analyzer" sub="bedrock · agent" mark="A1" tone="white"/>
        <SchematicNode x={235} y={60} w={130} h={56}
          title="doc-classifier" sub="langchain · agent" mark="A2" tone="white"/>
        <SchematicNode x={400} y={60} w={130} h={56}
          title="aurva-ocr" sub="onnx · service" mark="S1" tone="dim"/>

        {/* === L3 — IDENTITIES === */}
        <SchematicNode x={70} y={220} w={170} h={56}
          title="dataplane-sa" sub="kube · serviceaccount" mark="ID·1" tone="accent"/>
        <SchematicNode x={275} y={220} w={170} h={56}
          title="iam: pii-analyzer" sub="aws · role · 12 perms" mark="ID·2" tone="white"/>
        <SchematicNode x={480} y={220} w={70} h={56}
          title="okta-svc" sub="federated" mark="ID·3" tone="dim"/>

        {/* === L2 — ENDPOINTS / DATASOURCES === */}
        <SchematicNode x={50} y={380} w={130} h={56}
          title="bedrock.invoke" sub="claude-3-haiku" mark="EP·1" tone="white"/>
        <SchematicNode x={195} y={380} w={130} h={56}
          title="openai/embed" sub="external" mark="EP·2" tone="alert"/>
        <SchematicNode x={340} y={380} w={100} h={56}
          title="rds: docs" sub="postgres · pii" mark="DS·1" tone="white"/>
        <SchematicNode x={455} y={380} w={95} h={56}
          title="s3: pii/*" sub="bucket · obj" mark="DS·2" tone="white"/>

        {/* === L1 — eBPF === */}
        <g>
          <rect x={40} y={540} width={520} height={74} rx={2}
            fill="rgba(255,255,255,.02)"
            stroke="rgba(255,255,255,.18)" strokeWidth="0.8"/>
          <text x={56} y={562} className="v4-svg-mark">L1</text>
          <text x={56} y={580} className="v4-svg-title">aiostack-agent · DaemonSet</text>
          <text x={56} y={594} className="v4-svg-sub">eBPF probes · sock_ops · kprobe · tc · uprobe</text>
          <text x={56} y={608} className="v4-svg-tag-accent">+ network FSM · parses queries · maps sensitive data flow</text>
          {/* tick legend */}
          <g transform="translate(380, 552)">
            {["sock_ops", "kprobe", "tc", "uprobe", "FSM"].map((t, i) => (
              <g key={i} transform={`translate(${i * 36}, 0)`}>
                <rect x={0} y={0} width={32} height={26} fill="none" stroke={t==="FSM" ? "rgba(170,220,138,.7)" : "rgba(255,255,255,.16)"}/>
                <text x={16} y={17} textAnchor="middle" className="v4-svg-tag" style={{ fill: t==="FSM" ? "rgba(170,220,138,.95)" : undefined }}>{t}</text>
              </g>
            ))}
          </g>
        </g>

        {/* === Connections === */}
        {/* application -> identity */}
        <line x1={135} y1={116} x2={155} y2={220} stroke="rgba(255,255,255,.5)" strokeWidth="0.9" markerEnd="url(#v4-arrow)"/>
        <line x1={300} y1={116} x2={210} y2={220} stroke="rgba(255,255,255,.5)" strokeWidth="0.9" markerEnd="url(#v4-arrow)"/>
        <line x1={465} y1={116} x2={235} y2={220} stroke="rgba(255,255,255,.25)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)"/>

        {/* identity chain */}
        <line x1={240} y1={248} x2={275} y2={248} stroke="rgba(255,255,255,.55)" strokeWidth="0.9" markerEnd="url(#v4-arrow)"/>
        <line x1={445} y1={248} x2={480} y2={248} stroke="rgba(255,255,255,.25)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)"/>

        {/* application -> endpoints */}
        <path d="M 135 116 L 135 360 L 125 380" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="0.9" markerEnd="url(#v4-arrow)"/>
        <path d="M 300 116 L 300 360 L 290 380" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="0.9" strokeDasharray="3 3" markerEnd="url(#v4-arrow)"/>
        <path d="M 465 116 L 415 380" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="0.7" strokeDasharray="3 3" markerEnd="url(#v4-arrow-dim)"/>
        <path d="M 465 116 L 510 380" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="0.7" markerEnd="url(#v4-arrow-dim)"/>

        {/* eBPF observation arrows (looking up) */}
        {[100, 220, 360, 500].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={540} x2={x} y2={446} stroke="rgba(64,203,81,.55)" strokeWidth="0.6" strokeDasharray="2 3"/>
            <circle cx={x} cy={540} r={2} fill="rgba(64,203,81,.7)"/>
            <text x={x + 6} y={530} className="v4-svg-tag-accent">obs</text>
          </g>
        ))}

        {/* External call-out highlight */}
        <g>
          <rect x={216} y={376} width={148} height={64} fill="none" stroke="rgba(225,118,90,.55)" strokeWidth="0.8" strokeDasharray="2 2"/>
          <text x={290} y={460} textAnchor="middle" className="v4-svg-tag-alert">novel destination · 3 days ago</text>
        </g>

        {/* coords corner */}
        <text x={580} y={702} textAnchor="end" className="v4-svg-coord">600·720 / RUNTIME · LIVE</text>
        <text x={20} y={702} className="v4-svg-coord">0,0</text>
      </svg>
    </div>
  );
};

/* Helper for hero schematic nodes */
const SchematicNode = ({ x, y, w, h, title, sub, mark, tone = "white" }) => {
  const stroke = {
    white:  "rgba(255,255,255,.55)",
    dim:    "rgba(255,255,255,.22)",
    accent: "rgba(64,203,81,.7)",
    alert:  "rgba(225,118,90,.65)",
  }[tone];
  const fg = {
    white:  "rgba(255,255,255,.95)",
    dim:    "rgba(255,255,255,.55)",
    accent: "rgba(170,220,138,.95)",
    alert:  "rgba(245,170,135,.95)",
  }[tone];
  return (
    <g>
      {/* corner brackets */}
      <path d={`M ${x} ${y + 8} L ${x} ${y} L ${x + 8} ${y}`} fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d={`M ${x + w - 8} ${y} L ${x + w} ${y} L ${x + w} ${y + 8}`} fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d={`M ${x} ${y + h - 8} L ${x} ${y + h} L ${x + 8} ${y + h}`} fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d={`M ${x + w - 8} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - 8}`} fill="none" stroke={stroke} strokeWidth="1.2"/>
      <rect x={x} y={y} width={w} height={h} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
      <text x={x + 10} y={y + 18} className="v4-svg-mark" style={{ fill: "rgba(255,255,255,.45)" }}>{mark}</text>
      <text x={x + 10} y={y + 36} className="v4-svg-title" style={{ fill: fg }}>{title}</text>
      <text x={x + 10} y={y + 50} className="v4-svg-sub" style={{ fill: "rgba(255,255,255,.45)" }}>{sub}</text>
    </g>
  );
};

/* ===== Three observatories — Models · Endpoints · Identities ===== */
const Observatories = () => (
  <section className="v4-section v4-bordered">
    <div className="container">
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

    <div className="container v4-obs-grid">
      <Observatory
        index="01"
        title="Apps & Models"
        sub="every model invocation, observed"
        diagram={<ModelsDiagram/>}
        rows={[
          ["claude-3-haiku",      "bedrock",  "12,408 calls · 24h"],
          ["claude-3-sonnet",     "bedrock",  "1,820 calls · 24h"],
          ["text-embedding-3-sm", "openai",   "84,012 calls · 24h"],
          ["llama-3-70b",         "self-host","412 calls · 24h"],
          ["gemini-1.5-flash",    "vertex",   "0 calls · 24h"],
        ]}
        ledger={[
          ["catalog",   "12 distinct models · 4 providers"],
          ["unsanctioned", "2 models invoked off-list"],
          ["traffic",    "98,652 invocations · last 24h"],
          ["data",       "prompts, completions, tokens, latency"],
        ]}
      />

      <Observatory
        index="02"
        title="Identities"
        sub="every URL the AI talks to"
        diagram={<EndpointsDiagram/>}
        rows={[
          ["api.openai.com/v1/embeddings",  "egress",   "external · sanctioned"],
          ["bedrock.amazonaws.com",         "egress",   "in-vpc · sanctioned"],
          ["38.142.21.7:443",               "egress",   "novel · 3d ago"],
          ["pinecone.io/vectors/upsert",    "egress",   "external · sanctioned"],
          ["internal: rds.docs:5432",       "internal", "in-cluster"],
        ]}
        ledger={[
          ["catalog",   "147 endpoints reached in 30d"],
          ["new",       "8 endpoints first-seen this week"],
          ["traffic",   "1.2 TB egress · 24h"],
          ["data",      "destination, payload, mTLS, identity"],
        ]}
      />

      <Observatory
        index="03"
        title="Endpoints"
        sub="every URL the AI talks to"
        diagram={<EndpointsDiagram/>}
        rows={[
          ["api.openai.com/v1/embeddings",  "egress",   "external · sanctioned"],
          ["bedrock.amazonaws.com",         "egress",   "in-vpc · sanctioned"],
          ["38.142.21.7:443",               "egress",   "novel · 3d ago"],
          ["pinecone.io/vectors/upsert",    "egress",   "external · sanctioned"],
          ["internal: rds.docs:5432",       "internal", "in-cluster"],
        ]}
        ledger={[
          ["catalog",   "147 endpoints reached in 30d"],
          ["new",       "8 endpoints first-seen this week"],
          ["traffic",   "1.2 TB egress · 24h"],
          ["data",      "destination, payload, mTLS, identity"],
        ]}
      />

      <Observatory
        index="04"
        title="Datasources"
        sub="every byte of sensitive data, traced"
        diagram={<DatasourcesDiagram/>}
        rows={[
          ["rds: docs.users",         "postgres",  "pii · 24,108 reads · 24h"],
          ["s3://pii-vault/*",        "object",    "pii · 1.8 GB read"],
          ["pinecone: emb-prod",      "vector",    "3.4M queries · embeddings"],
          ["redis: session-cache",    "kv",        "tokens · in-cluster"],
          ["snowflake: analytics",    "warehouse", "4 columns · pii"],
        ]}
        ledger={[
          ["catalog",   "38 datasources · 11 carry pii"],
          ["fsm",       "network FSMs parse pg · mysql · http · grpc"],
          ["flow",      "agent → query → row → exfil, mapped"],
          ["data",      "queries, columns, rows, payload size"],
        ]}
      />
    </div>
  </section>
);

/* — observatory card — */
const Observatory = ({ index, title, sub, diagram, rows, ledger }) => (
  <div className="v4-obs">
    <div className="v4-obs-head">
      <span className="v4-section-num">§ 02 · {index}</span>
      <span className="v4-mono v4-mono-dim">obs/{title.toLowerCase()}</span>
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
);

/* === Schematic diagrams (small, per-observatory) === */
const ModelsDiagram = () => (
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
      { y: 16,  name: "claude-3-haiku",  tag: "bedrock" },
      { y: 60,  name: "embedding-3-sm",  tag: "openai" },
      { y: 104, name: "llama-3-70b",     tag: "self-host" },
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
);

const EndpointsDiagram = () => (
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
    <circle cx={50} cy={70} r={5} fill="rgba(255,255,255,.85)"/>
    <circle cx={88} cy={92} r={5} fill="rgba(255,255,255,.85)"/>
    <circle cx={120} cy={56} r={5} fill="rgba(255,255,255,.85)"/>

    {/* external bus */}
    <line x1={152} y1={75} x2={185} y2={75} stroke="rgba(255,255,255,.4)"/>
    <text x={168} y={68} textAnchor="middle" className="v4-svg-tag">egress</text>

    {/* external endpoints */}
    {[
      { y: 26, name: "api.openai.com", tag: "OK" },
      { y: 60, name: "bedrock.aws",    tag: "OK" },
      { y: 94, name: "38.142.21.7",    tag: "NEW", alert: true },
      { y: 122, name: "pinecone.io",   tag: "OK" },
    ].map((e, i) => (
      <g key={i}>
        <line x1={185} y1={75} x2={205} y2={e.y + 6} stroke={e.alert ? "rgba(225,118,90,.7)" : "rgba(255,255,255,.25)"}/>
        <rect x={205} y={e.y} width={108} height={14} fill="none" stroke={e.alert ? "rgba(225,118,90,.7)" : "rgba(255,255,255,.4)"}/>
        <text x={211} y={e.y + 10} className="v4-svg-title" style={{ fill: e.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.85)" }}>{e.name}</text>
        <text x={307} y={e.y + 10} textAnchor="end" className="v4-svg-tag" style={{ fill: e.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.4)" }}>{e.tag}</text>
      </g>
    ))}

    <text x={12} y={150} className="v4-svg-coord">SEEN BY · TC · SOCK_OPS</text>
  </svg>
);

const IdentitiesDiagram = () => (
  <svg viewBox="0 0 320 160" className="v4-mini-svg">
    {/* chain */}
    {[
      { x: 12,  label: "actor",    sub: "human/sched" },
      { x: 84,  label: "agent",    sub: "k8s pod" },
      { x: 156, label: "sa→role",  sub: "iam chain" },
      { x: 230, label: "resource", sub: "rds·s3·model" },
    ].map((n, i) => (
      <g key={i}>
        <rect x={n.x} y={50} width={70} height={44} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
        <text x={n.x + 6} y={66} className="v4-svg-mark" style={{ fill: "rgba(255,255,255,.45)" }}>0{i+1}</text>
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
);

const DatasourcesDiagram = () => (
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
      { y: 16, name: "rds: docs", tag: "PII", alert: true },
      { y: 50, name: "s3: pii/*", tag: "PII", alert: true },
      { y: 84, name: "pinecone",  tag: "VEC" },
      { y: 118, name: "redis",    tag: "KV" },
    ].map((d, i) => (
      <g key={i}>
        <rect x={216} y={d.y} width={92} height={20} fill="none" stroke={d.alert ? "rgba(225,118,90,.65)" : "rgba(255,255,255,.4)"}/>
        <text x={222} y={d.y + 14} className="v4-svg-title" style={{ fontSize: 10, fill: d.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.85)" }}>{d.name}</text>
        <text x={302} y={d.y + 14} textAnchor="end" className="v4-svg-tag" style={{ fill: d.alert ? "rgba(245,170,135,.95)" : "rgba(255,255,255,.4)" }}>{d.tag}</text>
      </g>
    ))}

    <text x={12} y={150} className="v4-svg-coord">SEEN BY · NETWORK FSM · PG · MYSQL · HTTP · GRPC</text>
  </svg>
);

/* ===== Pipeline schematic — multi-source signal flow w/ FSM ===== */
const PipelineDiagram = () => {
  const SOURCES = [
    { x: 40,  w: 200, label: "K8S API",    sub: "pods · sa · svc" },
    { x: 260, w: 200, label: "CLOUDTRAIL", sub: "iam · audit" },
    { x: 480, w: 200, label: "eBPF · syscall", sub: "sock_ops · kprobe" },
    { x: 700, w: 240, label: "eBPF · NET FSM",  sub: "pg · mysql · http · grpc", accent: true },
    { x: 960, w: 200, label: "BEDROCK / VERTEX", sub: "model invoke" },
  ];
  const STAGES = [
    { x: 70,   label: "INSTALL",   title: "curl · helm",       sub: "daemonset · 1 cmd" },
    { x: 360,  label: "OBSERVE",   title: "eBPF + FSM",        sub: "flows · queries · payloads" },
    { x: 650,  label: "CORRELATE", title: "identity graph",    sub: "sa → role → resource" },
    { x: 940,  label: "REASON",    title: "AI analyzer",       sub: "baseline · narrate · rank" },
  ];
  return (
  <div className="v4-pipeline">
    <div className="v4-pipeline-chrome">
      <span className="v4-mono v4-mono-dim">FIG.&nbsp;02</span>
      <span className="v4-mono v4-mono-dim">signal pipeline · 5 sources → ai reasoning</span>
      <span className="v4-mono v4-mono-dim">live · 0 dropped events</span>
    </div>
    <svg viewBox="0 0 1200 380" className="v4-pipeline-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="v4p-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="0.5"/>
        </pattern>
        <marker id="v4p-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.6)"/>
        </marker>
        <marker id="v4p-arr-acc" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L7 4L0 8z" fill="rgba(170,220,138,.8)"/>
        </marker>
      </defs>
      <rect width="1200" height="380" fill="url(#v4p-grid)"/>

      {/* SOURCE BAND */}
      <text x={40} y={32} className="v4-svg-label">SOURCE · YOUR INFRA</text>
      <text x={1160} y={32} textAnchor="end" className="v4-svg-label-dim">FIVE FEEDS · ALL READ-ONLY</text>
      <line x1={40} y1={42} x2={1160} y2={42} stroke="rgba(255,255,255,.22)"/>

      {SOURCES.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={56} width={s.w} height={36}
                fill="rgba(0,0,0,.4)"
                stroke={s.accent ? "rgba(170,220,138,.7)" : "rgba(255,255,255,.35)"}
                strokeWidth="0.8"/>
          <text x={s.x + 8} y={72} className="v4-svg-mark" style={{ fill: s.accent ? "rgba(170,220,138,.95)" : undefined }}>{s.label}</text>
          <text x={s.x + 8} y={86} className="v4-svg-sub">{s.sub}</text>
          {/* drop into bus */}
          <line x1={s.x + s.w/2} y1={92} x2={s.x + s.w/2} y2={140}
                stroke={s.accent ? "rgba(170,220,138,.7)" : "rgba(255,255,255,.3)"}
                strokeDasharray="2 3"/>
        </g>
      ))}

      {/* MERGE BUS */}
      <line x1={40} y1={140} x2={1160} y2={140} stroke="rgba(255,255,255,.4)"/>
      <text x={1160} y={132} textAnchor="end" className="v4-svg-label-dim">MERGED EVENT BUS</text>

      {/* STAGE BAND */}
      {STAGES.map((s, i) => (
        <g key={i}>
          <line x1={s.x + 95} y1={140} x2={s.x + 95} y2={186} stroke="rgba(255,255,255,.45)" markerEnd="url(#v4p-arr)"/>
          {/* bracket-cornered node */}
          <path d={`M ${s.x} ${198} L ${s.x} ${186} L ${s.x + 12} ${186}`} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2"/>
          <path d={`M ${s.x + 178} ${186} L ${s.x + 190} ${186} L ${s.x + 190} ${198}`} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2"/>
          <path d={`M ${s.x} ${248} L ${s.x} ${260} L ${s.x + 12} ${260}`} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2"/>
          <path d={`M ${s.x + 178} ${260} L ${s.x + 190} ${260} L ${s.x + 190} ${248}`} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2"/>
          <rect x={s.x} y={186} width={190} height={74} fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
          <text x={s.x + 12} y={206} className="v4-svg-mark">§ 0{i+1} · {s.label}</text>
          <text x={s.x + 12} y={228} className="v4-svg-title" style={{ fontSize: 13 }}>{s.title}</text>
          <text x={s.x + 12} y={244} className="v4-svg-sub">{s.sub}</text>

          {i < 3 && <line x1={s.x + 196} y1={222} x2={s.x + 284} y2={222} stroke="rgba(255,255,255,.55)" markerEnd="url(#v4p-arr)"/>}

          {/* drop into output bus */}
          <line x1={s.x + 95} y1={260} x2={s.x + 95} y2={306} stroke="rgba(170,220,138,.5)" strokeDasharray="2 3"/>
        </g>
      ))}

      {/* OUTPUT BAND */}
      <line x1={40} y1={306} x2={1160} y2={306} stroke="rgba(255,255,255,.4)"/>
      {[
        { x: 70,   t: "LIVE INVENTORY",   s: "apps · models · ids · ds" },
        { x: 360,  t: "DATA-FLOW MAP",    s: "who reads what · pii" },
        { x: 650,  t: "RIGHT-SIZED IAM",  s: "granted vs. used" },
        { x: 940,  t: "NARRATED ALERTS",  s: "plain language · evidence" },
      ].map((o, i) => (
        <g key={i}>
          <rect x={o.x} y={320} width={190} height={36} fill="rgba(0,0,0,.4)" stroke="rgba(170,220,138,.55)"/>
          <text x={o.x + 12} y={336} className="v4-svg-mark" style={{ fill: "rgba(170,220,138,.95)" }}>{o.t}</text>
          <text x={o.x + 12} y={350} className="v4-svg-sub">{o.s}</text>
        </g>
      ))}

      {/* Coordinate ticks */}
      <text x={40} y={372} className="v4-svg-coord">0,0</text>
      <text x={1160} y={372} textAnchor="end" className="v4-svg-coord">1200·380 / LIVE · 0 EVENTS DROPPED</text>
    </svg>
  </div>
  );
};

/* ===== How it works (refined — kept the feel they liked) ===== */
const HowItWorksV4 = () => (
  <section id="how" className="v4-section v4-bordered">
    <div className="container">
      <div className="v4-section-head">
        <span className="v4-section-num">§ 03</span>
        <h2 className="v4-h2">
          How it works.
        </h2>
        <p className="v4-section-lead">
          One install, four signal sources, zero application changes. The agent observes from below; cloud APIs enrich from above; the runtime trace is what you see.
        </p>
      </div>

      <PipelineDiagram/>

      <div className="v4-how-grid">
        {[
          {
            n: "01",
            title: "Install in one command.",
            body: "A single curl provisions the AIOStack agent across your nodes via Helm. No SDK to import, no proxy in front of your model, no sidecar. Your applications will never know we are there.",
            sigs: ["curl", "helm", "daemonset", "in-vpc"],
          },
          {
            n: "02",
            title: "eBPF observes from below.",
            body: "Probes attached to socket and syscall paths capture every flow, every identity context, every payload boundary. Including agents and models nobody told security about — shadow AI surfaces the moment it runs.",
            sigs: ["sock_ops", "kprobe", "tc", "uprobe"],
          },
          {
            n: "03",
            title: "Cloud APIs draw the rest.",
            body: "Read-only IAM, CloudTrail, Bedrock, and metadata APIs map ServiceAccounts → roles → policies → resources. The full identity graph behind every AI agent, generated automatically.",
            sigs: ["iam", "cloudtrail", "bedrock", "k8s api"],
          },
          {
            n: "04",
            title: "AI reasons over the trace.",
            body: "An LLM-backed analyzer baselines every identity, narrates every drift, and explains every alert in plain language with linked evidence — so triage stops being archaeology.",
            sigs: ["baseline", "narrate", "explain", "rank"],
          },
        ].map((s, i) => (
          <div key={i} className="v4-how">
            <div className="v4-how-head">
              <span className="v4-section-num">{s.n}</span>
              <span className="v4-rule-h v4-rule-thin"/>
            </div>
            <h3 className="v4-h3">{s.title}</h3>
            <p className="v4-body">{s.body}</p>
            <div className="v4-sig-row">
              {s.sigs.map((g, k) => <span key={k} className="v4-sig">{g}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ===== Outcomes — six terse outcomes, schematic style ===== */
const OutcomesV4 = () => {
  const cells = [
    { i: "01", t: "Inventory",    s: "Every model, agent, endpoint, identity. Live. Without you asking." },
    { i: "02", t: "Trace",        s: "One actor → one model → one endpoint → one row. End-to-end, in plain language." },
    { i: "03", t: "Drift",        s: "First time an identity touches a new resource. First time a model is called from a new caller. First time data leaves." },
    { i: "04", t: "Blast radius", s: "What a compromised agent can actually reach — computed from observed behavior, not granted policy." },
    { i: "05", t: "Right-size",   s: "Permissions trimmed to what was actually used in the last 90 days. With evidence attached." },
    { i: "06", t: "Audit",        s: "Every action — call, query, egress — attributed to an identity, packaged for review." },
  ];
  return (
    <section className="v4-section v4-bordered">
      <div className="container">
        <div className="v4-section-head">
          <span className="v4-section-num">§ 04</span>
          <h2 className="v4-h2">
            Six outcomes.<br/>One install.
          </h2>
        </div>
        <div className="v4-outcomes">
          {cells.map((c, i) => (
            <div key={i} className="v4-outcome">
              <div className="v4-outcome-num">{c.i}</div>
              <div className="v4-outcome-t">{c.t}</div>
              <div className="v4-outcome-s">{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== CTA ===== */
const FinalCTAV4 = () => (
  <section className="v4-section v4-cta">
    <div className="v4-rule v4-rule-h" style={{ top: 0 }}/>
    <div className="container">
      <div className="v4-cta-grid">
        <div>
          <span className="v4-section-num">§ END</span>
          <h2 className="v4-h2" style={{ marginTop: 14 }}>
            Ten minutes from now,<br/>
            <span className="v4-em">you will have the map.</span>
          </h2>
          <p className="v4-section-lead">
            One curl. One DaemonSet. Your AI inventory, your endpoint inventory, your identity chains — drawn from the kernel up, on top of evidence you can replay.
          </p>
          <div className="v4-cta-row" style={{ marginTop: 28 }}>
            <a className="v4-btn v4-btn-primary" href="docs-quickstart.html">
              Install <span className="v4-mono">·</span> 10 min
              <Icon name="arrow-right" size={14}/>
            </a>
            <a className="v4-btn v4-btn-ghost" href="docs.html">
              Read architecture
            </a>
          </div>
        </div>
        <div className="v4-cta-side">
          <div className="v4-cta-side-row">
            <span className="v4-mono v4-mono-dim">RUNTIME</span>
            <span>kernel · eBPF probes</span>
          </div>
          <div className="v4-cta-side-row">
            <span className="v4-mono v4-mono-dim">CONTROL</span>
            <span>iam · cloudtrail · bedrock</span>
          </div>
          <div className="v4-cta-side-row">
            <span className="v4-mono v4-mono-dim">DEPLOY</span>
            <span>self-hosted · in-vpc · read-only</span>
          </div>
          <div className="v4-cta-side-row">
            <span className="v4-mono v4-mono-dim">COMPLIANCE</span>
            <span>soc 2 · iso 27001 · hipaa-ready</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ===== Roster — schematic registry of customers ===== */
const ROSTER = [
  { name: "Lattice",       tag: "hr",        loc: "us-west" },
  { name: "Chronosphere",  tag: "obs",       loc: "us-east" },
  { name: "Snowflake",     tag: "data",      loc: "us-west" },
  { name: "Cloudflare",    tag: "edge",      loc: "global" },
  { name: "Replicate",     tag: "ml-infra",  loc: "us-west" },
  { name: "Anthropic",     tag: "ai-lab",    loc: "us-west" },
  { name: "Hugging Face",  tag: "ml-hub",    loc: "eu-west" },
  { name: "MongoDB",       tag: "data",      loc: "us-east" },
  { name: "Vercel",        tag: "infra",     loc: "us-west" },
  { name: "LangChain",     tag: "ai-tool",   loc: "us-west" },
  { name: "Stripe",        tag: "fintech",   loc: "us-west" },
  { name: "Datadog",       tag: "obs",       loc: "us-east" },
];
const RosterV4 = () => (
  <section className="v4-section v4-bordered v4-roster">
    <div className="container">
      <div className="v4-roster-head">
        <div>
          <span className="v4-section-num">§ A · DEPLOYED AT</span>
          <h2 className="v4-roster-title">Security & platform teams running AIOStack in production.</h2>
        </div>
        <div className="v4-roster-meta">
          <div><span className="v4-mono v4-mono-dim">count</span><span>12 of {ROSTER.length}+ shown</span></div>
          <div><span className="v4-mono v4-mono-dim">since</span><span>2025.04 · GA</span></div>
          <div><span className="v4-mono v4-mono-dim">scope</span><span>self-hosted · in-vpc</span></div>
        </div>
      </div>

      <div className="v4-roster-grid">
        {ROSTER.map((r, i) => (
          <div key={i} className="v4-roster-cell">
            <div className="v4-roster-idx">A{String(i + 1).padStart(2, "0")}</div>
            <div className="v4-roster-name">{r.name}</div>
            <div className="v4-roster-tags">
              <span className="v4-sig">{r.tag}</span>
              <span className="v4-sig">{r.loc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, {
  HeroV4, Observatories, HowItWorksV4, OutcomesV4, FinalCTAV4, RosterV4,
});
