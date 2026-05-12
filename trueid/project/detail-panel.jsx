// Unified detail side panel. Tabs: Overview, Connections, Identity, Policies.
// Used by all 3 design directions so they only differ in the list/page layout
// above the panel.

function DetailPanel({ row, onClose, initialTab = 'overview' }) {
  const [tab, setTab] = React.useState(initialTab);
  if (!row) return null;

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog">
        <div className="sheet-head">
          <button className="sheet-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={14} />
          </button>
          <div className="sheet-title">
            <h2>{row.name}</h2>
            <div className="sub">
              <KindTag kind={row.kind} />
              <span style={{marginLeft: 8}}>Namespace: <b style={{color: 'var(--text)'}}>{row.namespace}</b></span>
            </div>
          </div>
          <div className="sheet-head-side">
            {row.isAI && <span className="tag aiapp">AI App</span>}
            <ExposureBadge value={row.exposure} />
            <button className="btn"><Icon name="ext" size={13} /> Open</button>
          </div>
        </div>

        <div className="sheet-tabs">
          <div className={`sheet-tab ${tab==='risks'?'active':''}`} onClick={()=>setTab('risks')}>
            <Icon name="alert" size={13} /> Risks
            {row.risks && row.risks.length > 0 && (
              <span className="count" style={{marginLeft: 4, background: window.SEV_COLORS[[...row.risks].sort((a,b)=>window.sev(b.sev)-window.sev(a.sev))[0].sev].bg, color: window.SEV_COLORS[[...row.risks].sort((a,b)=>window.sev(b.sev)-window.sev(a.sev))[0].sev].fg, padding:'0 6px', borderRadius: 999, fontSize: 10, fontWeight: 700}}>{row.risks.length}</span>
            )}
          </div>
          <div className={`sheet-tab ${tab==='overview'?'active':''}`} onClick={()=>setTab('overview')}>
            <Icon name="info" size={13} /> Overview
          </div>
          <div className={`sheet-tab ${tab==='graph'?'active':''}`} onClick={()=>setTab('graph')}>
            <Icon name="graph" size={13} /> Connections
          </div>
          <div className={`sheet-tab ${tab==='identity'?'active':''}`} onClick={()=>setTab('identity')}>
            <Icon name="link" size={13} /> Identity chain
          </div>
          <div className={`sheet-tab ${tab==='policies'?'active':''}`} onClick={()=>setTab('policies')}>
            <Icon name="shield" size={13} /> Policies
            {row.iamRole && <span className="count" style={{marginLeft: 4, background:'var(--bg-muted)', color:'var(--text-muted)', padding:'0 6px', borderRadius: 999, fontSize: 10, fontWeight: 600}}>{row.iamRole.policies.length}</span>}
          </div>
        </div>

        <div className="sheet-body">
          {tab === 'risks' && <RisksTab row={row} />}
          {tab === 'overview' && <OverviewTab row={row} />}
          {tab === 'graph' && <ConnectionsTab row={row} />}
          {tab === 'identity' && <IdentityTab row={row} />}
          {tab === 'policies' && <PoliciesTab row={row} />}
        </div>
      </div>
    </>
  );
}

/* -------------------- OVERVIEW -------------------- */
function OverviewTab({ row }) {
  return (
    <div>
      <div className="ov-section">
        <div className="ov-label">Workload</div>
        <div className="ov-grid">
          <div className="ov-row"><span className="k">Name</span><span className="v">{row.name}</span></div>
          <div className="ov-row"><span className="k">Kind</span><span className="v"><KindTag kind={row.kind} /></span></div>
          <div className="ov-row"><span className="k">Namespace</span><span className="v">{row.namespace}</span></div>
          <div className="ov-row"><span className="k">Cluster</span><span className="v">{row.cluster}</span></div>
          <div className="ov-row"><span className="k">Region</span><span className="v">{row.region}</span></div>
          <div className="ov-row"><span className="k">Exposure</span><span className="v"><ExposureBadge value={row.exposure} /></span></div>
        </div>
      </div>

      {row.isAI && (
        <>
          <div className="ov-section">
            <div className="ov-label">AI Runtime</div>
            <div className="ov-grid">
              <div className="ov-row"><span className="k">AI Type</span><span className="v"><span className="tag aiapp">AI App</span></span></div>
              <div className="ov-row"><span className="k">Zombie AI</span><span className="v"><span className="risk-cell"><span className="dot red" />Yes</span></span></div>
              <div className="ov-row"><span className="k">Review Status</span><span className="v"><ReviewBadge value={row.review} /></span></div>
              <div className="ov-row"><span className="k">Owner</span><span className="v">{row.owner}</span></div>
              {row.volume && <>
                <div className="ov-row"><span className="k">Data Volume</span><span className="v">{row.volume.data}</span></div>
                <div className="ov-row"><span className="k">Call Count</span><span className="v">{row.volume.calls}</span></div>
              </>}
            </div>
          </div>

          <div className="ov-section">
            <div className="ov-label">AI Endpoints</div>
            <EndpointsCell endpoints={row.aiEndpoints} />
          </div>

          {row.ai && (
            <div className="ov-section">
              <div className="ov-label">AI Components</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'14px 24px'}}>
                {row.ai.modelFormats && <ChipGroup title="Model File Formats" items={row.ai.modelFormats} />}
                {row.ai.dl && <ChipGroup title="Deep Learning" items={row.ai.dl} />}
                {row.ai.frameworks && <ChipGroup title="Frameworks" items={row.ai.frameworks} />}
                {row.ai.genai && <ChipGroup title="GenAI Models" items={row.ai.genai} />}
                {row.ai.ml && <ChipGroup title="ML Techniques" items={row.ai.ml} />}
                {row.ai.tools && <ChipGroup title="Toolkits" items={row.ai.tools} />}
              </div>
            </div>
          )}

          <div className="ov-section">
            <div className="ov-label">Database Protocols</div>
            <DbEndpointsCell endpoints={row.dbEndpoints} />
          </div>
        </>
      )}

      <div className="ov-section">
        <div className="ov-label">Identity & Access</div>
        <div className="ov-grid">
          <div className="ov-row"><span className="k">Service Account</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.serviceAccount || '—'}</span></div>
          <div className="ov-row"><span className="k">IAM Role</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.iamRole ? row.iamRole.name : '—'}</span></div>
          <div className="ov-row"><span className="k">Potentially Public</span><span className="v"><PublicCell value={row.potentiallyPublic} /></span></div>
          {row.host && <div className="ov-row"><span className="k">Host</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.host}</span></div>}
          {row.loadBalancer && <div className="ov-row" style={{gridColumn:'1 / -1'}}><span className="k">Load Balancer</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.loadBalancer}</span></div>}
        </div>
      </div>
    </div>
  );
}

const ChipGroup = ({ title, items }) => (
  <div>
    <div style={{fontSize: 11.5, color:'var(--text-muted)', marginBottom: 6, fontWeight: 500}}>{title}</div>
    <div className="chip-list">
      {items.map(x => <span className="tag muted" key={x}>{x}</span>)}
    </div>
  </div>
);

/* -------------------- CONNECTIONS GRAPH -------------------- */
function ConnectionsTab({ row }) {
  // Freeform node graph (like screenshot 2): show this service in the middle,
  // surrounding nodes for connected services, databases, and external endpoints.
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 12, color:'var(--text-muted)', fontSize: 12.5}}>
        <Icon name="info" size={13} />
        Data flows and service dependencies inside and outside the cluster.
      </div>
      <div className="graph-canvas" style={{minHeight: 460}}>
        <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#9a9a9a"/>
            </marker>
          </defs>
          <path d="M 420 240 L 220 140" className="chain-line" markerEnd="url(#arr)" />
          <path d="M 420 240 L 680 140" className="chain-line" markerEnd="url(#arr)" />
          <path d="M 420 240 L 220 380" className="chain-line" markerEnd="url(#arr)" />
          <path d="M 420 240 L 680 380" className="chain-line" markerEnd="url(#arr)" />
          <path d="M 420 240 L 420 80" className="chain-line" markerEnd="url(#arr)" />
          <path d="M 420 240 L 420 420" className="chain-line" markerEnd="url(#arr)" />
        </svg>

        {/* center */}
        <div className="graph-node" style={{left: '42%', top: '46%', borderColor: 'var(--accent)', background: 'var(--accent-tint)'}}>
          <span className="ic" style={{background:'var(--accent-soft)', color:'var(--accent-strong)'}}><Icon name="cube" size={14}/></span>
          <div className="lbl"><div className="t">{row.name}</div><div className="st">{row.kind}</div></div>
        </div>

        {/* Endpoints */}
        {(row.aiEndpoints || []).slice(0,2).map((ep, i) => (
          <div key={ep.name} className="graph-node" style={{left: i === 0 ? '12%' : '68%', top: '22%'}}>
            <span className="ic" style={{background: ep.color + '22', color: ep.color}}><Icon name="cube" size={14}/></span>
            <div className="lbl"><div className="t">{ep.name}</div><div className="st">External AI endpoint</div></div>
          </div>
        ))}

        {/* DBs */}
        {(row.dbEndpoints || []).map((db, i) => (
          <div key={db.name} className="graph-node" style={{left: i === 0 ? '12%' : '68%', top: '66%'}}>
            <span className="ic" style={{background:'#eaf1f8', color:'#34638f'}}><Icon name="db" size={14}/></span>
            <div className="lbl"><div className="t">{db.name}</div><div className="st">{db.count} destination{db.count>1?'s':''}</div></div>
          </div>
        ))}

        {/* Upstream */}
        <div className="graph-node" style={{left: '39%', top: '5%'}}>
          <span className="ic" style={{background:'#fceeee', color:'#8a3a3a'}}><Icon name="globe" size={14}/></span>
          <div className="lbl"><div className="t">Internet</div><div className="st">ingress</div></div>
        </div>

        {/* Downstream service */}
        <div className="graph-node" style={{left: '38%', top: '82%'}}>
          <span className="ic" style={{background:'var(--bg-muted)', color:'var(--text-secondary)'}}><Icon name="cube" size={14}/></span>
          <div className="lbl"><div className="t">aurva-doc-classifier</div><div className="st">cluster service</div></div>
        </div>
      </div>

      <div style={{marginTop: 14, display:'flex', gap: 6, flexWrap:'wrap'}}>
        <span className="chip"><span className="dot green" /> This service</span>
        <span className="chip"><span className="dot" style={{background:'#34638f'}} /> Database</span>
        <span className="chip"><span className="dot" style={{background:'#8a3a3a'}} /> External</span>
        <span className="chip"><span className="dot gray" /> Internal service</span>
      </div>
    </div>
  );
}

/* -------------------- IDENTITY CHAIN -------------------- */
function IdentityTab({ row }) {
  if (!row.serviceAccount && !row.iamRole && !row.potentiallyPublic) {
    return <EmptyState icon="idcard" title="No identity data" message="This workload has no IAM role, service account, or external exposure detected." />;
  }
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 12, color:'var(--text-muted)', fontSize: 12.5}}>
        <Icon name="info" size={13} />
        Ingress → Workload → Service Account → IAM Role → Policies → Cloud Resources. Branches show every asset this workload can potentially reach.
      </div>
      <IdentityChain row={row} />
      <div style={{marginTop: 20}}>
        <div className="ov-label">Inbound</div>
        <div className="ov-grid">
          {row.host && <div className="ov-row"><span className="k">Host</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.host}</span></div>}
          {row.loadBalancer && <div className="ov-row" style={{gridColumn:'1 / -1'}}><span className="k">Load Balancer</span><span className="v" style={{fontFamily:'var(--font-mono)', fontSize:12}}>{row.loadBalancer}</span></div>}
          <div className="ov-row"><span className="k">Potentially Public</span><span className="v"><PublicCell value={row.potentiallyPublic} /></span></div>
          <div className="ov-row"><span className="k">Exposure</span><span className="v"><ExposureBadge value={row.exposure} /></span></div>
        </div>
      </div>
    </div>
  );
}

function IdentityChain({ row, compact }) {
  // Compact mode (used by the ambitious split-pane ribbon): linear only.
  if (compact) {
    const hasLB = row.loadBalancer || row.host;
    const nodes = [];
    if (row.potentiallyPublic || row.exposure === 'External') nodes.push({ type:'internet', t:'Internet', v: 'Public access' });
    if (hasLB) nodes.push({ type:'lb', t:'Load Balancer', v: row.loadBalancer ? row.loadBalancer.slice(0, 28)+'…' : row.host });
    nodes.push({ type:'deployment', t: row.kind, v: row.name });
    if (row.serviceAccount) nodes.push({ type:'sa', t:'Service Account', v: row.serviceAccount });
    if (row.iamRole) nodes.push({ type:'iam', t:'IAM Role', v: row.iamRole.name });
    return (
      <div className="chain" style={{padding:'4px 0'}}>
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="chain-arrow"><Icon name="arrow" size={16} /></div>}
            <div className={`chain-node ${n.type}`}>
              <div className="nt">{n.t}</div>
              <div className="nv" title={n.v}>{n.v}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
  // Full mode: branching graph with 5 columns.
  return <IdentityChainGraph row={row} />;
}

// Inject chain-graph styles to avoid any caching issues with styles.css.
if (typeof document !== 'undefined' && !document.getElementById('chain-graph-styles')) {
  const s = document.createElement('style');
  s.id = 'chain-graph-styles';
  s.textContent = `
    .chain-graph { position: relative; padding: 8px 0 4px; overflow-x: auto; }
    .chain-graph .lane {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(170px, 1fr)) !important;
      column-gap: 40px; row-gap: 10px;
      align-items: start; position: relative; min-width: 1000px;
    }
    .chain-graph .col-head {
      font-size: 10px; font-weight: 700; letter-spacing: .08em;
      color: var(--text-muted); text-transform: uppercase; padding-bottom: 6px;
    }
    .chain-graph .chain-node { min-width: 0; position: relative; z-index: 1; }
    .chain-graph .chain-node.policy { background:#f4e9fb; border-color:#d6b6e8; color:#6b3a8a; }
    .chain-graph .chain-node.resource { background:#e6eef8; border-color:#a9c2e0; color:#2f5a8a; }
    .chain-graph svg.wires {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 0;
    }
    .chain-graph .wire { stroke: #c8c3bc; stroke-width: 1.5; fill: none; }
    .chain-graph .col { display: flex; flex-direction: column; gap: 10px; }
  `;
  document.head.appendChild(s);
}

function IdentityChainGraph({ row }) {
  const hasLB = row.loadBalancer || row.host;
  // Build column contents
  const c1 = []; // ingress
  if (row.potentiallyPublic || row.exposure === 'External') c1.push({ type:'internet', t:'Internet', v:'Public access' });
  if (hasLB) c1.push({ type:'lb', t:'Load Balancer', v: row.loadBalancer ? row.loadBalancer.slice(0, 28)+'…' : row.host });
  const c2 = [{ type:'deployment', t: row.kind, v: row.name }];
  const c3 = row.serviceAccount ? [{ type:'sa', t:'Service Account', v: row.serviceAccount }] : [];
  const c4 = row.iamRole ? [{ type:'iam', t:'IAM Role', v: row.iamRole.name }] : [];
  const policies = row.iamRole ? row.iamRole.policies : [];
  const resources = row.iamRole ? row.iamRole.policies.flatMap(p => p.resourceList.map(r => ({ ...r, policy: p.name }))) : [];

  // Node refs for wire drawing
  const containerRef = React.useRef(null);
  const nodeRefs = React.useRef({});
  const [wires, setWires] = React.useState([]);

  const setRef = (key) => (el) => { if (el) nodeRefs.current[key] = el; };

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cb = container.getBoundingClientRect();
    const port = (key, side) => {
      const el = nodeRefs.current[key];
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return {
        x: side === 'right' ? b.right - cb.left : b.left - cb.left,
        y: b.top - cb.top + b.height / 2,
      };
    };
    const pairs = [];
    // c1 -> c2
    c1.forEach((_, i) => pairs.push([`c1-${i}`, `c2-0`]));
    // c2 -> c3
    if (c3.length) pairs.push([`c2-0`, `c3-0`]);
    // c3 -> c4
    if (c4.length && c3.length) pairs.push([`c3-0`, `c4-0`]);
    else if (c4.length) pairs.push([`c2-0`, `c4-0`]);
    // c4 -> policies
    policies.forEach((p, i) => pairs.push([`c4-0`, `pol-${i}`]));
    // policies -> resources
    resources.forEach((r, i) => {
      const pIdx = policies.findIndex(p => p.name === r.policy);
      if (pIdx >= 0) pairs.push([`pol-${pIdx}`, `res-${i}`]);
    });

    const segs = pairs.map(([from, to]) => {
      const a = port(from, 'right');
      const b = port(to, 'left');
      if (!a || !b) return null;
      const mx = (a.x + b.x) / 2;
      return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }).filter(Boolean);
    setWires(segs);
  }, [row.id]);

  const Node = ({ keyName, n }) => (
    <div ref={setRef(keyName)} className={`chain-node ${n.type}`}>
      <div className="nt">{n.t}</div>
      <div className="nv" title={n.v}>{n.v}</div>
    </div>
  );

  return (
    <div className="chain-graph" ref={containerRef}>
      <div className="lane">
        <div className="col"><div className="col-head">Ingress</div>
          {c1.length === 0 && <div style={{fontSize:12, color:'var(--text-faint)', fontStyle:'italic'}}>Not exposed</div>}
          {c1.map((n, i) => <Node key={i} keyName={`c1-${i}`} n={n} />)}
        </div>
        <div className="col"><div className="col-head">Workload</div>
          {c2.map((n, i) => <Node key={i} keyName={`c2-${i}`} n={n} />)}
        </div>
        <div className="col"><div className="col-head">Service Account</div>
          {c3.length === 0 && <div style={{fontSize:12, color:'var(--text-faint)', fontStyle:'italic'}}>None</div>}
          {c3.map((n, i) => <Node key={i} keyName={`c3-${i}`} n={n} />)}
        </div>
        <div className="col"><div className="col-head">IAM Role + Policies</div>
          {c4.map((n, i) => <Node key={i} keyName={`c4-${i}`} n={n} />)}
          {policies.map((p, i) => (
            <div key={p.name} ref={setRef(`pol-${i}`)} className="chain-node policy">
              <div className="nt">Policy</div>
              <div className="nv" title={p.name}>{p.name}</div>
              <div style={{fontSize: 10.5, opacity: .75, marginTop: 2}}>{p.statements} stmt · {p.resources} res</div>
            </div>
          ))}
          {policies.length === 0 && c4.length === 0 && <div style={{fontSize:12, color:'var(--text-faint)', fontStyle:'italic'}}>No IAM role</div>}
        </div>
        <div className="col"><div className="col-head">Cloud Resources</div>
          {resources.length === 0 && <div style={{fontSize:12, color:'var(--text-faint)', fontStyle:'italic'}}>—</div>}
          {resources.map((r, i) => (
            <div key={i} ref={setRef(`res-${i}`)} className="chain-node resource">
              <div className="nt">{r.kind}</div>
              <div className="nv" title={r.arn}>{r.arn.length > 32 ? r.arn.slice(0, 30)+'…' : r.arn}</div>
              <div style={{fontSize: 10.5, opacity: .75, marginTop: 2}}>{r.exposure}</div>
            </div>
          ))}
        </div>
      </div>
      <svg className="wires">
        {wires.map((d, i) => <path key={i} d={d} className="wire" />)}
      </svg>
    </div>
  );
}

/* -------------------- POLICIES -------------------- */
function PoliciesTab({ row }) {
  if (!row.iamRole) return <EmptyState icon="shield" title="No IAM role attached" message="This workload's service account has no linked IAM role." />;
  const role = row.iamRole;
  return (
    <div>
      <div className="ov-section">
        <div className="ov-label">IAM Role</div>
        <div style={{
          padding: 12, background: '#fef5d7', border: '1px solid #ebd289',
          borderRadius: 8, display: 'flex', alignItems:'center', gap: 10
        }}>
          <Icon name="shield" size={16} style={{color:'#8a6820'}} />
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontWeight: 600, color:'#8a6820', fontFamily:'var(--font-mono)', fontSize: 13}}>{role.name}</div>
            <div style={{fontSize: 11.5, color:'#8a6820', opacity: .8, fontFamily:'var(--font-mono)', marginTop: 2, overflow:'hidden', textOverflow:'ellipsis'}}>{role.arn}</div>
          </div>
          <span className="tag muted">{role.policies.length} polic{role.policies.length === 1 ? 'y' : 'ies'}</span>
        </div>
      </div>

      <div className="ov-section">
        <div className="ov-label">Attached policies</div>
        {role.policies.map(p => <PolicyCard key={p.name} policy={p} />)}
      </div>

      <div className="ov-section">
        <div className="ov-label">Potentially accessible resources</div>
        <div style={{border:'1px solid var(--border)', borderRadius: 8, overflow:'hidden'}}>
          {role.policies.flatMap(p => p.resourceList).map((r, i) => (
            <div key={i} className="resource-row">
              <span className="arn">{r.arn}</span>
              <span style={{display:'flex', gap: 8}}>
                <span className="tag muted">{r.kind}</span>
                <span className={`tag ${r.exposure === 'private' ? 'muted' : 'warn'}`}>{r.exposure}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ policy }) {
  const [open, setOpen] = React.useState(false);
  const json = JSON.stringify(policy.json, null, 2);
  // simple syntax color
  const highlighted = json
    .replace(/("[^"]+":)/g, '<span class="k">$1</span>')
    .replace(/: ("[^"]+")/g, ': <span class="s">$1</span>')
    .replace(/(\[|,)( *"[^"]+")/g, '$1<span class="s">$2</span>');
  return (
    <div className="policy-card">
      <div className="policy-head" onClick={() => setOpen(o => !o)}>
        <Icon name={open ? 'chevDown' : 'chevRight'} size={14} style={{color:'var(--text-muted)'}} />
        <span className="name">{policy.name}</span>
        <span className="tag muted">{policy.type}</span>
        <span className="meta">
          <span>{policy.statements} statement{policy.statements===1?'':'s'}</span>
          <span>·</span>
          <span>{policy.resources} resource{policy.resources===1?'':'s'}</span>
        </span>
      </div>
      {open && (
        <div className="policy-body">
          <pre dangerouslySetInnerHTML={{__html: highlighted}} />
        </div>
      )}
    </div>
  );
}

function RisksTab({ row }) {
  if (!row.risks || row.risks.length === 0) {
    return <EmptyState icon="check" title="No risks detected" message="This workload has no active findings from scanners or policy checks." />;
  }
  const sorted = [...row.risks].sort((a,b)=>window.sev(b.sev)-window.sev(a.sev));
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 14, color:'var(--text-muted)', fontSize: 12.5}}>
        <Icon name="info" size={13} />
        {sorted.length} finding{sorted.length===1?'':'s'}, ordered by severity.
      </div>
      <div style={{display:'flex', flexDirection:'column', gap: 10}}>
        {sorted.map((r, i) => {
          const c = window.SEV_COLORS[r.sev];
          return (
            <div key={i} style={{padding: 14, borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, display:'flex', gap: 12, alignItems:'flex-start'}}>
              <span className="dot" style={{background: c.dot, width: 10, height: 10, marginTop: 5}} />
              <div style={{flex: 1}}>
                <div style={{display:'flex', alignItems:'center', gap: 8}}>
                  <span style={{fontWeight: 700, color: c.fg, textTransform:'capitalize', fontSize: 12}}>{r.sev}</span>
                  <span style={{fontWeight: 600, color:'var(--text)', fontSize: 14}}>{r.type}</span>
                </div>
                <div style={{marginTop: 6, fontSize: 13, color:'var(--text-secondary)', lineHeight: 1.5}}>{r.msg}</div>
                <div style={{marginTop: 10, display:'flex', gap: 8}}>
                  <button className="btn" style={{height: 28, fontSize: 12}}>Investigate</button>
                  <button className="btn" style={{height: 28, fontSize: 12}}>Dismiss</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, message }) {
  return (
    <div style={{padding: '40px 20px', textAlign:'center', color:'var(--text-muted)'}}>
      <div style={{width: 52, height: 52, borderRadius: 999, background: 'var(--bg-muted)', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom: 10}}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{fontWeight: 600, color:'var(--text)', marginBottom: 4}}>{title}</div>
      <div style={{fontSize: 13}}>{message}</div>
    </div>
  );
}

Object.assign(window, { DetailPanel, IdentityChain });
