/* AIOStack Docs — sidebar + components */

const DOCS_NAV = [
  {
    section: "Get started",
    items: [
      { id: "introduction", label: "Introduction", href: "docs.html" },
      { id: "quickstart", label: "Quickstart", href: "docs-quickstart.html" },
      { id: "system-requirements", label: "System requirements", href: "#" },
      { id: "architecture", label: "Architecture overview", href: "#" },
    ],
  },
  {
    section: "Discovery",
    items: [
      { id: "shadow-ai", label: "Shadow AI detection", href: "#" },
      { id: "ai-inventory", label: "AI inventory", href: "#" },
      { id: "aibom", label: "AIBOM (Bill of Materials)", href: "#" },
      { id: "data-lineage", label: "Data lineage", href: "#" },
    ],
  },
  {
    section: "Identity",
    items: [
      { id: "identity-graph", label: "Identity graph", href: "#" },
      { id: "iam-mapping", label: "IAM role mapping", href: "#" },
      { id: "policy-lineage", label: "Policy lineage", href: "#" },
      { id: "risk-classification", label: "Risk classification", href: "#" },
    ],
  },
  {
    section: "Tracing",
    items: [
      { id: "prompts", label: "Prompt capture", href: "#" },
      { id: "responses", label: "Response capture", href: "#" },
      { id: "redaction", label: "PII redaction", href: "#" },
      { id: "replay", label: "Session replay", href: "#" },
    ],
  },
  {
    section: "Operate",
    items: [
      { id: "config", label: "Configuration", href: "#" },
      { id: "upgrades", label: "Upgrades", href: "#" },
      { id: "uninstall", label: "Uninstall", href: "#" },
    ],
  },
  {
    section: "Reference",
    items: [
      { id: "cli", label: "CLI", href: "#" },
      { id: "api", label: "API reference", href: "#" },
      { id: "events", label: "Event schema", href: "#" },
    ],
  },
];

const DocsSidebar = ({ activeId }) => (
  <aside className="docs-side">
    <div style={{
      display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
      padding: "8px 10px", border: "1px solid var(--space-line-2)", borderRadius: 7,
      fontSize: 12.5, color: "var(--space-text-3)",
      fontFamily: "var(--font-mono)",
    }}>
      <Icon name="search" size={13}/>
      <span>Search docs…</span>
      <span style={{ marginLeft: "auto", padding: "1px 5px", border: "1px solid var(--space-line-2)", borderRadius: 4, fontSize: 10.5 }}>⌘K</span>
    </div>
    {DOCS_NAV.map((s, i) => (
      <div key={i}>
        <h6>{s.section}</h6>
        {s.items.map(item => (
          <a key={item.id} href={item.href} className={activeId === item.id ? "active" : ""}>
            {item.label}
          </a>
        ))}
      </div>
    ))}
  </aside>
);

const DocsBreadcrumb = ({ trail }) => (
  <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--space-text-3)", marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
    {trail.map((t, i) => (
      <React.Fragment key={i}>
        <span style={{ color: i === trail.length - 1 ? "var(--space-text-2)" : undefined }}>{t}</span>
        {i < trail.length - 1 && <span style={{ opacity: .5 }}>/</span>}
      </React.Fragment>
    ))}
  </div>
);

const DocsCallout = ({ kind = "tip", title, children }) => (
  <div className="docs-callout">
    <span className="ic">{kind === "tip" ? "i" : kind === "warn" ? "!" : "?"}</span>
    <div>
      {title && <strong style={{ display: "block", color: "var(--space-text)", marginBottom: 4, fontSize: 14 }}>{title}</strong>}
      {children}
    </div>
  </div>
);

const DocsCodeBlock = ({ label, children }) => (
  <div className="code-block" style={{ margin: "16px 0" }}>
    <div className="code-head">
      <div className="dots"><i/><i/><i/></div>
      {label && <span className="label">{label}</span>}
      <span className="copy">copy</span>
    </div>
    <div className="code-body" style={{ whiteSpace: "pre" }}>
      {children}
    </div>
  </div>
);

const DocsCard = ({ icon, title, body, href }) => (
  <a href={href} className="docs-card" style={{
    display: "block",
    padding: 20,
    border: "1px solid var(--space-line)",
    borderRadius: 10,
    background: "var(--space-card)",
    transition: "border-color .15s, background .15s",
    textDecoration: "none",
  }}
  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.18)"; e.currentTarget.style.background = "var(--space-card-2)"; }}
  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--space-line)"; e.currentTarget.style.background = "var(--space-card)"; }}>
    <span style={{
      width: 32, height: 32, borderRadius: 7,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: "rgba(64,203,81,.12)",
      border: "1px solid rgba(64,203,81,.25)",
      color: "var(--aio-primary-300)",
    }}>
      <Icon name={icon} size={16}/>
    </span>
    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 14, color: "var(--space-text)" }}>{title}</div>
    <div style={{ fontSize: 13.5, color: "var(--space-text-2)", lineHeight: 1.55, marginTop: 6 }}>{body}</div>
  </a>
);

Object.assign(window, { DOCS_NAV, DocsSidebar, DocsBreadcrumb, DocsCallout, DocsCodeBlock, DocsCard });
