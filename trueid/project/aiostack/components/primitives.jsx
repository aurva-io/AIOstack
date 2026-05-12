/* Shared primitives + icons for AIOStack site
   Exposes: Icon, Logo, NavBar, Footer, StarLayer, GlowBg, Eyebrow,
            DarkChip, CodeBlock, Tabs, ButtonRow, SectionHeader
*/

/* ===== Icons (line, 20px viewBox, 1.6 stroke) ===== */
const Icon = ({ name, size = 18, className = "", ...rest }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
    className, ...rest,
  };
  switch (name) {
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right":
      return <svg {...common}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case "check":
      return <svg {...common}><path d="M5 12l4 4 10-10"/></svg>;
    case "x":
      return <svg {...common}><path d="M6 6l12 12M18 6l-12 12"/></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>;
    case "eye":
      return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "graph":
      return <svg {...common}><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.5 7.5l3 9M16.5 7.5l-3 9M8 6h8"/></svg>;
    case "list":
      return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case "terminal":
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>;
    case "zap":
      return <svg {...common}><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/></svg>;
    case "cube":
      return <svg {...common}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12l-8-4.5M12 12v9"/></svg>;
    case "key":
      return <svg {...common}><circle cx="8" cy="15" r="3"/><path d="M10.5 13L20 3.5M16 7l3 3M14 9l3 3"/></svg>;
    case "database":
      return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>;
    case "book":
      return <svg {...common}><path d="M4 4.5A2 2 0 016 3h13v15H6a2 2 0 00-2 2V4.5z"/><path d="M4 17.5A2 2 0 016 16h13"/></svg>;
    case "github":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" className={className} {...rest}><path d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z"/></svg>;
    case "discord":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" className={className} {...rest}><path d="M19.6 5.4A17 17 0 0015.6 4l-.2.4a13.4 13.4 0 016.6 1.5 14.8 14.8 0 011.7 8.4 13.5 13.5 0 01-4 2 9 9 0 01-1.2-1.9c.5-.2 1-.4 1.5-.7l-.2-.2c-3.7 1.7-7.7 1.7-11.5 0l-.2.2c.5.3 1 .5 1.5.7a9 9 0 01-1.2 1.9 13.5 13.5 0 01-4-2A14.8 14.8 0 014 5.9 13.4 13.4 0 0110.6 4.4L10.4 4a17 17 0 00-4 1.4 17.3 17.3 0 00-3 11.6 13 13 0 004 2 10 10 0 001.7-2.7l-.1-.1a8.5 8.5 0 01-1.3-.6c.1-.1.2-.2.4-.2 2.4 1.1 5 1.7 7.6 1.7 2.7 0 5.3-.6 7.6-1.7l.4.2-1.3.6-.1.1a10 10 0 001.7 2.7c1.4-.5 2.7-1.2 4-2a17.3 17.3 0 00-3-11.6zM9.7 13.7c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6zm4.6 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6z"/></svg>;
    case "play":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" className={className} {...rest}><path d="M8 5v14l11-7-11-7z"/></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>;
    case "alert":
      return <svg {...common}><path d="M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>;
    case "package":
      return <svg {...common}><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M3 8l9 5 9-5"/></svg>;
    case "share":
      return <svg {...common}><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
    case "dollar":
      return <svg {...common}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
    case "cpu":
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>;
    case "copy":
      return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>;
    case "rocket":
      return <svg {...common}><path d="M5 19c0-1.5 1-3 2-4l2 2c-1 1-2.5 2-4 2zM14 4l6 6-9 9-6-1-1-6 9-8z"/><circle cx="14" cy="10" r="1.5"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

/* ===== Logo ===== */
const Logo = ({ size = 28, withWord = true, sub }) => (
  <span className="nav-brand">
    <span className="mark" style={{ width: size, height: size }}>
      <span className="glyph"></span>
    </span>
    {withWord && (
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 0 }}>
        <span style={{ fontWeight: 600 }}>AIO</span>
        <span style={{ fontWeight: 600, color: "var(--aio-primary-400)" }}>Stack</span>
      </span>
    )}
    {sub && <span className="sub">{sub}</span>}
  </span>
);

/* ===== Eyebrow ===== */
const Eyebrow = ({ children, color = "green" }) => (
  <span className={`eyebrow ${color === "purple" ? "purple" : ""}`}>
    <span className="dot"></span>
    <span>{children}</span>
  </span>
);

/* ===== Star layer ===== */
const StarLayer = ({ count = 28, seed = 1 }) => {
  // deterministic-ish positioning
  const rnd = (i) => {
    const x = Math.sin(i * 9301 + seed * 49297) * 233280;
    return x - Math.floor(x);
  };
  const stars = [];
  for (let i = 0; i < count; i++) {
    const left = rnd(i * 2 + 1) * 100;
    const top = rnd(i * 2 + 2) * 100;
    const delay = rnd(i + 7) * 4;
    const dur = 3 + rnd(i + 11) * 4;
    const sz = 1 + rnd(i + 13) * 1.4;
    stars.push(
      <span key={i} className="star" style={{
        left: `${left}%`, top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${dur}s`,
        width: `${sz}px`, height: `${sz}px`,
      }}/>
    );
  }
  return <div className="starfield-twinkle" aria-hidden="true">{stars}</div>;
};

/* ===== Nav ===== */
const NavBar = ({ active = "home", currentSection, hrefBase = "" }) => (
  <nav className="nav">
    <div className="nav-inner">
      <a href={`${hrefBase}index.html`} className="nav-brand" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span className="mark"><span className="glyph"></span></span>
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 0, fontWeight: 600, fontSize: 16 }}>
          <span>AIO</span>
          <span style={{ color: "var(--aio-primary-400)" }}>Stack</span>
        </span>
      </a>
      <div className="nav-links">
        <a className="nav-link" href={`${hrefBase}index.html#capabilities`}>Product</a>
        <a className="nav-link" href={`${hrefBase}index.html#how-it-works`}>How&nbsp;it&nbsp;works</a>
        <a className="nav-link" href={`${hrefBase}index.html#identity`}>Identity&nbsp;graph</a>
        <a className="nav-link" href={`${hrefBase}docs.html`} style={active === "docs" ? { color: "var(--space-text)" } : {}}>Docs</a>
      </div>
      <span className="nav-spacer"></span>
      <div className="nav-actions">
        <a className="btn btn-ghost btn-sm" href="#">
          <Icon name="github" size={16}/> GitHub
        </a>
        <a className="btn btn-primary btn-sm" href={`${hrefBase}docs.html`}>
          Install in 10 min <Icon name="arrow-right" size={15} className="arr"/>
        </a>
      </div>
    </div>
  </nav>
);

/* ===== Footer ===== */
const Footer = ({ hrefBase = "" }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <a href={`${hrefBase}index.html`} className="nav-brand" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span className="mark"><span className="glyph"></span></span>
            <span style={{ fontWeight: 600, fontSize: 16 }}>AIO<span style={{ color: "var(--aio-primary-400)" }}>Stack</span></span>
          </a>
          <p style={{ color: "var(--space-text-2)", fontSize: 13.5, lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
            Runtime AI observability for the modern enterprise. Discover, trace, and govern every AI service across your environment — without touching a single line of application code.
          </p>
          <div style={{ marginTop: 22 }}>
            <a className="aurva-mark" href="https://aurva.io">
              An <strong style={{ color: "var(--space-text-2)", fontWeight: 500, marginLeft: 2 }}>Aurva</strong> sub-brand
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Product</h5>
          <ul>
            <li><a href="#capabilities">Capabilities</a></li>
            <li><a href="#identity">Identity graph</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#enterprise">Enterprise</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Developers</h5>
          <ul>
            <li><a href={`${hrefBase}docs.html`}>Documentation</a></li>
            <li><a href={`${hrefBase}docs-quickstart.html`}>Quickstart</a></li>
            <li><a href="#">API reference</a></li>
            <li><a href="#">CLI</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="https://aurva.io">Aurva.io</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Trust center</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Community</h5>
          <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">X / Twitter</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Aurva, Inc. AIOStack is a free product from Aurva.</span>
        <span style={{ display: "inline-flex", gap: 16 }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Icon, Logo, NavBar, Footer, StarLayer, Eyebrow });
