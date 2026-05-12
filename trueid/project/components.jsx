// Shared icon set (stroke-based, 16px by default). All single-color so they
// tint to currentColor.
const Icon = ({ name, size = 16, style }) => {
  const s = { width: size, height: size, flexShrink: 0, ...style };
  const sw = 1.6;
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5" /></>,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    ext: <><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>,
    chevDown: <path d="m6 9 6 6 6-6" />,
    chevRight: <path d="m9 6 6 6-6 6" />,
    chevLeft: <path d="m15 6-6 6 6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    zoom: <><circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5M8 11h6" /></>,
    filter: <path d="M3 5h18M6 12h12M10 19h4" />,
    columns: <><rect x="3" y="3" width="7" height="18" rx="1" /><rect x="14" y="3" width="7" height="18" rx="1" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    cube: <><path d="M21 7.5v9l-8 4.5-8-4.5v-9L13 3z" /><path d="m5 7.5 8 4.5 8-4.5" /><path d="M13 12v9" /></>,
    db: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
    file: <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6" />,
    chart: <path d="M3 3v18h18M7 14l3-3 4 4 6-7" />,
    book: <path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z" />,
    shield: <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z" />,
    scan: <path d="M3 7V4h4M21 7V4h-4M3 17v3h4M21 17v3h-4M8 12h8" />,
    idcard: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="12" r="2.5" /><path d="M14 10h4M14 14h4" /></>,
    moon: <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    lockOpen: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0" /></>,
    alert: <path d="M12 3 2 20h20zM12 10v5M12 18v.5" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 8v.5" /></>,
    link: <><path d="M10 14a4 4 0 0 1 0-6l3-3a4 4 0 0 1 6 6l-1.5 1.5" /><path d="M14 10a4 4 0 0 1 0 6l-3 3a4 4 0 0 1-6-6L6.5 11.5" /></>,
    graph: <><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 7l4 9M17 7l-4 9" /></>,
    expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
    check: <path d="m5 12 5 5L20 7" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    flag: <path d="M4 21V4h13l-3 4 3 4H4" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2 2M17.1 17.1l2 2M4.9 19.1l2-2M17.1 6.9l2-2" /></>,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    dot3: <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
    lightning: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    aws: <path d="M4 14a8 8 0 0 1 16 0M4 18h16M7 22h10" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}
         strokeLinecap="round" strokeLinejoin="round" style={s}>
      {paths[name]}
    </svg>
  );
};

/* ============================================================
   Left rail nav (matches screenshots — small vertical icons).
   The "Inventory" entry is the merged page; "Identities" is gone.
============================================================ */
function Rail({ current = 'inventory' }) {
  const items = [
    { id: 'dashboard', icon: 'grid' },
    { id: 'inventory', icon: 'cube' },
    { id: 'data', icon: 'db' },
    { id: 'docs', icon: 'file' },
    { id: 'activity', icon: 'chart' },
    { id: 'library', icon: 'book' },
    { id: 'stack', icon: 'columns' },
    { id: 'posture', icon: 'shield' },
    { id: 'scan', icon: 'scan' },
  ];
  return (
    <div className="rail">
      <div className="rail-logo">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 9h6v6H9z" />
        </svg>
      </div>
      {items.map(it => (
        <div key={it.id} className={`rail-btn ${it.id === current ? 'active' : ''}`}>
          <Icon name={it.icon} size={18} />
        </div>
      ))}
      <div className="rail-spacer" />
      <div className="rail-btn"><Icon name="ext" size={18} /></div>
      <div className="rail-btn"><Icon name="moon" size={18} /></div>
      <div className="rail-dot">5</div>
    </div>
  );
}

/* ============================================================
   Exposure + risk badges
============================================================ */
const ExposureBadge = ({ value }) => {
  if (value === 'External') return <span className="tag external"><Icon name="globe" size={11} />External</span>;
  if (value === 'Public') return <span className="tag external"><Icon name="globe" size={11} />Public</span>;
  return <span className="tag internal"><Icon name="lock" size={11} />Internal</span>;
};

const KindTag = ({ kind }) => {
  const cls = kind === 'Deployment' ? 'deployment' : kind === 'StatefulSet' ? 'statefulset' : 'daemonset';
  return <span className={`tag ${cls}`}>{kind}</span>;
};

const RiskBadge = ({ value }) => {
  if (!value) return <span style={{color: 'var(--text-faint)'}}>—</span>;
  return <span className="risk-cell"><span className="dot red" />{value}</span>;
};

const ReviewBadge = ({ value }) => {
  if (value === 'Reviewed')
    return <span className="tag ok"><Icon name="check" size={11} /> Reviewed</span>;
  return <span className="tag muted">Open</span>;
};

const EndpointsCell = ({ endpoints }) => {
  if (!endpoints || endpoints.length === 0) return <span style={{color: 'var(--text-faint)'}}>—</span>;
  return (
    <span className="endpoints-cell">
      {endpoints.map((ep, i) => (
        <span className="endpoint-logo" key={i}>
          <span className="swatch" style={{ background: ep.color }} />
          {ep.name}
        </span>
      ))}
    </span>
  );
};

const DbEndpointsCell = ({ endpoints }) => {
  if (!endpoints || endpoints.length === 0) return <span style={{color: 'var(--text-faint)'}}>—</span>;
  return (
    <span className="endpoints-cell">
      {endpoints.map((ep, i) => (
        <span className="tag muted" key={i} style={{fontFamily: 'var(--font-mono)', fontSize: '10.5px'}}>{ep.name} ({ep.count})</span>
      ))}
    </span>
  );
};

const IamRoleCell = ({ role }) => {
  if (!role) return <span style={{color: 'var(--text-faint)'}}>—</span>;
  return (
    <span style={{display:'inline-flex', alignItems:'center', gap: 6, fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--text-secondary)'}}>
      <Icon name="shield" size={12} style={{color:'var(--warn)'}} />
      {role.name.length > 32 ? role.name.slice(0,30)+'…' : role.name}
    </span>
  );
};

const PublicCell = ({ value }) => {
  if (value)
    return <span className="tag ok" style={{background:'#e5f6ec', borderColor:'#a9d9c0', color:'#3a7a55'}}><Icon name="globe" size={11} />Yes</span>;
  return <span style={{color:'var(--text-faint)', fontSize:12}}>No</span>;
};

Object.assign(window, {
  Icon, Rail,
  ExposureBadge, KindTag, RiskBadge, ReviewBadge,
  EndpointsCell, DbEndpointsCell, IamRoleCell, PublicCell,
});
