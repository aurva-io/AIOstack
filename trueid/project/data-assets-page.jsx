/* Data Assets — 4-column information-dense layout matching AI Inventory.
   Columns:
     1. Datasource — engine + ARN + hosting + account + region + cluster role
     2. Sensitive data — locked: "Connect to Aurva for this" CTA
     3. Applications — workload list, query volume, data size
     4. Risks & threats — severity-sorted, with secondary breakdown
   Each column click opens its corresponding tab in the side panel.
   Cluster rows are still expandable so readers nest under the writer. */

const SEV = window.SEV_COLORS;

function DataAssetsPage({ initialSelected = null, initialTab: forcedTab = 'overview' }) {
  const [selected, setSelected] = React.useState(initialSelected);
  const [initialTab, setInitialTab] = React.useState(forcedTab);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('risk');
  const [expanded, setExpanded] = React.useState(() => new Set(['arn:aws:rds:ap-south-1:145689162369:cluster:aurva-aws-default-production-rds']));

  const all = window.DA_ROWS;

  const matches = (r) => {
    if (search) {
      const q = search.toLowerCase();
      const hay = [r.displayName, r.name, r.host, r.accountId, r.region, r.type].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.hosting?.length && !filters.hosting.includes(r.hosting)) return false;
    if (filters.serviceType?.length && !filters.serviceType.includes(r.serviceType)) return false;
    if (filters.type?.length && !filters.type.includes(r.type)) return false;
    if (filters.account?.length && !filters.account.includes(r.accountId)) return false;
    if (filters.management?.length && !filters.management.includes(r.management)) return false;
    if (filters.status?.length && !filters.status.includes(r.status)) return false;
    if (filters.sev?.length && !r.risks?.some(x => filters.sev.includes(x.sev))) return false;
    if (filters.public?.includes(true) && !r.publicIP && !(r.metadata && r.metadata.acl === 'public-read')) return false;
    return true;
  };

  let groups = window.groupDataAssets(all)
    .map(g => ({ ...g, children: g.children.filter(matches) }))
    .filter(g => matches(g.row) || g.children.length > 0);

  if (sortBy === 'risk') {
    groups.sort((a,b) => (b.row.maxSev||0) - (a.row.maxSev||0) || a.row.displayName.localeCompare(b.row.displayName));
  } else {
    groups.sort((a,b) => a.row.displayName.localeCompare(b.row.displayName));
  }

  const totalVisible = groups.reduce((n,g)=> n + 1 + (expanded.has(g.row.name)?g.children.length:0), 0);
  const totalCrit = all.filter(r => r.risks?.some(x => x.sev==='critical')).length;
  const totalHigh = all.filter(r => r.risks?.some(x => x.sev==='high')).length;
  const totalPublic = all.filter(r => r.publicIP || (r.metadata && r.metadata.acl === 'public-read')).length;
  const totalUntracked = all.filter(r => r.status === 'NotSeen').length;

  const openRow = (r, tab='overview') => { setInitialTab(tab); setSelected(r); };
  const toggle = (id) => setExpanded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const accounts = [...new Set(all.map(r => r.accountId))];
  const types = [...new Set(all.map(r => r.type))];
  const services = [...new Set(all.map(r => r.serviceType))];
  const hostings = [...new Set(all.map(r => r.hosting))];

  return (
    <div className="app-shell">
      <Rail current="data" />
      <div className="content">
        <div className="page-header">
          <h1>Data Assets</h1>
          <div className="sub">Datasources prioritized by risk — sensitive data, applications, and threats at a glance.</div>
        </div>

        <div className="toolbar">
          <div className="search">
            <Icon name="search" size={15} />
            <input placeholder="Search by name, ARN, host, account..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <button className="btn" onClick={()=>setFiltersOpen(true)}>
            <Icon name="filter" size={14}/> Filters
            {Object.values(filters).flat().length > 0 && <span style={{background:'var(--accent)', color:'white', borderRadius:999, padding:'0 6px', fontSize:11, fontWeight:700}}>{Object.values(filters).flat().length}</span>}
          </button>
          <div className="col-toggle">
            <div className="btn-group">
              <button className={sortBy==='risk'?'on':''} onClick={()=>setSortBy('risk')}>Sort: Risk</button>
              <button className={sortBy==='name'?'on':''} onClick={()=>setSortBy('name')}>Name</button>
            </div>
          </div>
        </div>

        <div style={{padding:'10px 28px 0', display:'flex', gap:6, flexWrap:'wrap'}}>
          <span className={`chip ${(filters.sev||[]).includes('critical')?'active':''}`}
                onClick={()=>setFilters(f=>({...f, sev:(f.sev||[]).includes('critical')?[]:['critical']}))}>
            <span className="dot" style={{background:SEV.critical.dot}}/>Critical risks <span className="count">{totalCrit}</span>
          </span>
          <span className={`chip ${(filters.sev||[]).includes('high')?'active':''}`}
                onClick={()=>setFilters(f=>({...f, sev:(f.sev||[]).includes('high')?[]:['high']}))}>
            <span className="dot" style={{background:SEV.high.dot}}/>High risks <span className="count">{totalHigh}</span>
          </span>
          <span className={`chip ${filters.public?.includes(true)?'active':''}`}
                onClick={()=>setFilters(f=>({...f, public: f.public?.includes(true)?[]:[true]}))}>
            <Icon name="globe" size={11}/>Public exposure <span className="count">{totalPublic}</span>
          </span>
          <span className={`chip ${(filters.status||[]).includes('NotSeen')?'active':''}`}
                onClick={()=>setFilters(f=>({...f, status:(f.status||[]).includes('NotSeen')?[]:['NotSeen']}))}>
            Untracked <span className="count">{totalUntracked}</span>
          </span>
          <span style={{width:1, background:'var(--border)', margin:'0 4px'}}/>
          {hostings.map(h => (
            <span key={h} className={`chip ${(filters.hosting||[]).includes(h)?'active':''}`}
                  onClick={()=>setFilters(f=>({...f, hosting:(f.hosting||[]).includes(h)?f.hosting.filter(x=>x!==h):[...(f.hosting||[]),h]}))}>
              {h} <span className="count">{all.filter(r=>r.hosting===h).length}</span>
            </span>
          ))}
          <span style={{width:1, background:'var(--border)', margin:'0 4px'}}/>
          {services.filter(s=>s!=='None').map(s => (
            <span key={s} className={`chip ${(filters.serviceType||[]).includes(s)?'active':''}`}
                  onClick={()=>setFilters(f=>({...f, serviceType:(f.serviceType||[]).includes(s)?f.serviceType.filter(x=>x!==s):[...(f.serviceType||[]),s]}))}>
              {s} <span className="count">{all.filter(r=>r.serviceType===s).length}</span>
            </span>
          ))}
        </div>

        <div className="results-row">
          <span>
            {totalVisible} datasources •
            <b style={{color:'#a02828', marginLeft:4}}>{totalCrit}</b> critical
            • <b style={{color:'#8a5a15'}}>{totalHigh}</b> high
            • {totalPublic} public-reachable • {totalUntracked} untracked
          </span>
          <div className="pager">
            <button><Icon name="chevLeft" size={12}/></button>
            <button className="active">1</button>
            <button>2</button>
            <button>…</button>
            <button><Icon name="chevRight" size={12}/></button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table balanced-table">
            <thead>
              <tr>
                <th style={{width:'27%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <Icon name="db" size={12} style={{color:'var(--accent-strong)'}}/> DATASOURCE
                  </div>
                </th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'22%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <Icon name="lock" size={12} style={{color:'#6b3a8a'}}/> SENSITIVE DATA
                  </div>
                </th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'27%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <Icon name="cube" size={12} style={{color:'#34638f'}}/> APPLICATIONS &amp; VOLUME
                  </div>
                </th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'22%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <Icon name="alert" size={12} style={{color:'#d14343'}}/> RISKS &amp; THREATS
                  </div>
                </th>
                <th style={{width:28}}/>
              </tr>
            </thead>
            <tbody>
              {groups.map(g => (
                <React.Fragment key={g.row.id}>
                  <DARow row={g.row} hasChildren={g.children.length>0}
                         expanded={expanded.has(g.row.name)}
                         onToggle={()=>toggle(g.row.name)}
                         selected={selected?.id===g.row.id}
                         onOpen={(tab)=>openRow(g.row, tab)} />
                  {expanded.has(g.row.name) && g.children.map(c => (
                    <DARow key={c.id} row={c} child
                           selected={selected?.id===c.id}
                           onOpen={(tab)=>openRow(c, tab)} />
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {selected && <DADetail row={selected} onClose={()=>setSelected(null)} initialTab={initialTab}/>}
        <DAFilterDrawer open={filtersOpen} onClose={()=>setFiltersOpen(false)}
                        filters={filters} setFilters={setFilters} rows={all}
                        accounts={accounts} types={types} services={services} hostings={hostings} />
      </div>
    </div>
  );
}

/* ============ Row ============ */
function DARow({ row, hasChildren, expanded, onToggle, child, selected, onOpen }) {
  const sevKey = row.risks?.length ? [...row.risks].sort((a,b)=>window.daSev(b.sev)-window.daSev(a.sev))[0].sev : 'none';
  const sevC = SEV[sevKey];
  return (
    <tr className={selected?'selected':''}
        style={{boxShadow: selected ? undefined : `inset 3px 0 0 ${sevC.dot}`}}>
      <td onClick={() => onOpen('overview')} style={{verticalAlign:'top'}}>
        <DACellDatasource row={row} child={child} hasChildren={hasChildren} expanded={expanded} onToggle={onToggle}/>
      </td>
      <td onClick={(e)=>{e.stopPropagation(); onOpen('sensitive');}} style={{borderLeft:'1px solid var(--border)', verticalAlign:'top'}}>
        <DACellSensitive row={row} />
      </td>
      <td onClick={(e)=>{e.stopPropagation(); onOpen('applications');}} style={{borderLeft:'1px solid var(--border)', verticalAlign:'top'}}>
        <DACellApps row={row} />
      </td>
      <td onClick={(e)=>{e.stopPropagation(); onOpen('risks');}} style={{borderLeft:'1px solid var(--border)', verticalAlign:'top'}}>
        <DACellRisks row={row} />
      </td>
      <td onClick={() => onOpen('overview')} style={{verticalAlign:'top'}}>
        <Icon name="chevRight" size={14} style={{color:'var(--text-faint)'}}/>
      </td>
    </tr>
  );
}

/* ---------- Cell 1: Datasource ---------- */
function DACellDatasource({ row, child, hasChildren, expanded, onToggle }) {
  const eng = window.ENGINE_INFO[row.type] || { label: row.type, color:'#888' };
  const isPublic = !!row.publicIP || (row.metadata && row.metadata.acl === 'public-read');
  return (
    <div style={{display:'flex', flexDirection:'column', gap:4, paddingLeft: child?22:0, position:'relative', minWidth: 0}}>
      {child && <span style={{position:'absolute', left:6, top:0, bottom:0, width:1, background:'var(--border)'}}/>}
      {child && <span style={{position:'absolute', left:6, top:14, width:12, height:1, background:'var(--border)'}}/>}
      <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
        {hasChildren && (
          <span onClick={(e)=>{e.stopPropagation(); onToggle();}} style={{cursor:'pointer', display:'inline-flex', color:'var(--text-muted)'}}>
            <Icon name={expanded ? 'chevDown' : 'chevRight'} size={14}/>
          </span>
        )}
        <span className="swatch" style={{background: eng.color, width:12, height:12, borderRadius:3, flexShrink:0}}/>
        <span style={{fontWeight:600, color:'var(--accent-strong)', fontSize:13}}>{row.displayName}</span>
        {row.version && <span style={{fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)'}}>{eng.label} {row.version}</span>}
        {!row.version && <span style={{fontSize:11, color:'var(--text-muted)'}}>{eng.label}</span>}
        {row.isCluster && <span className="tag muted" style={{fontSize:10, background:'#eef2fb', color:'#445599', borderColor:'#cdd3ee'}}>Cluster</span>}
        {row.function === 'Reader' && <span className="tag muted" style={{fontSize:10}}>Reader</span>}
        {row.function === 'Writer' && !row.isCluster && <span className="tag muted" style={{fontSize:10, background:'#eef2fb', color:'#445599', borderColor:'#cdd3ee'}}>Writer</span>}
      </div>
      <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'100%'}}>
        {row.name}
      </div>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center', marginTop:2}}>
        <span style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          padding:'1px 6px', borderRadius:3, fontSize:10, fontWeight:700,
          background: row.hosting === 'AWS' ? '#fff4e0' : row.hosting === 'GCP' ? '#e8f0fe' : row.hosting === 'NativeSaaS' ? '#f0e9fb' : '#f5f5f4',
          color: row.hosting === 'AWS' ? '#8a5a15' : row.hosting === 'GCP' ? '#1a73e8' : row.hosting === 'NativeSaaS' ? '#6b3a8a' : '#78716c',
          border:`1px solid ${row.hosting === 'AWS' ? '#f0d9a5' : row.hosting === 'GCP' ? '#b8cde0' : row.hosting === 'NativeSaaS' ? '#d6b6e8' : '#e7e5e4'}`,
        }}>{row.hosting === 'NativeSaaS' ? 'SaaS' : row.hosting.toUpperCase()}</span>
        {row.location === 'InsideK8s' && <span className="tag muted" style={{fontSize:10}}>K8s</span>}
        <span style={{fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)'}}>{row.region}</span>
        <span style={{fontSize:11, color:'var(--text-faint)'}}>·</span>
        <span style={{fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)'}}>
          {String(row.accountId).length > 12 ? String(row.accountId).slice(0,4)+'…'+String(row.accountId).slice(-4) : row.accountId}
        </span>
        {isPublic && <span className="tag external" style={{fontSize:10}}><Icon name="globe" size={10}/>Public</span>}
        {row.status === 'NotSeen' && <span className="tag muted" style={{fontSize:10, color:'#a86b1a', background:'#fdecd2', borderColor:'#eac78a'}}>NotSeen</span>}
      </div>
    </div>
  );
}

/* ---------- Cell 2: Sensitive Data (locked CTA) ---------- */
function DACellSensitive({ row }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', gap:6,
      padding:'8px 10px', borderRadius:6,
      background: 'repeating-linear-gradient(45deg, #faf6fd, #faf6fd 6px, #f4ecfa 6px, #f4ecfa 12px)',
      border:'1px dashed #d6b6e8', minHeight: 64,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:6}}>
        <Icon name="lock" size={12} style={{color:'#6b3a8a'}}/>
        <span style={{fontSize:11.5, fontWeight:600, color:'#6b3a8a', letterSpacing:'.02em'}}>SENSITIVE DATA SCAN</span>
      </div>
      <div style={{fontSize:12, color:'var(--text-secondary)', lineHeight:1.45}}>
        PII / PHI / PCI classification not available.
      </div>
      <span style={{
        display:'inline-flex', alignItems:'center', gap:5, alignSelf:'flex-start',
        fontSize:11.5, fontWeight:600, color:'#6b3a8a',
        padding:'2px 8px', borderRadius:4, background:'white', border:'1px solid #d6b6e8',
        cursor:'pointer'
      }}>
        Connect to Aurva <Icon name="arrow" size={11}/>
      </span>
    </div>
  );
}

/* ---------- Cell 3: Applications & Volume ---------- */
function DACellApps({ row }) {
  const wl = row.workloads || [];
  const dv = row.dataVolume;
  if (wl.length === 0 && !dv) {
    return <span style={{color:'var(--text-faint)', fontStyle:'italic', fontSize:12.5}}>No active applications</span>;
  }
  return (
    <div style={{display:'flex', flexDirection:'column', gap:6}}>
      {/* Volume row */}
      {dv && (
        <div style={{display:'flex', gap:10, fontSize:11.5, color:'var(--text-muted)', flexWrap:'wrap', alignItems:'center'}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:4}}>
            <Icon name="db" size={11}/><b style={{color:'var(--text)'}}>{dv.size}</b>
          </span>
          {dv.tables && (<><span>·</span><span><b style={{color:'var(--text)'}}>{dv.tables}</b> tables</span></>)}
          {dv.collections && (<><span>·</span><span><b style={{color:'var(--text)'}}>{dv.collections}</b> collections</span></>)}
          {dv.objects && (<><span>·</span><span><b style={{color:'var(--text)'}}>{dv.objects}</b> objects</span></>)}
          {dv.queriesPerDay && dv.queriesPerDay !== '—' && (<><span>·</span><span><b style={{color:'var(--text)'}}>{dv.queriesPerDay}</b> q/day</span></>)}
        </div>
      )}
      {/* Workloads */}
      {wl.length > 0 ? (
        <div style={{display:'flex', flexDirection:'column', gap:3}}>
          {wl.slice(0, 3).map((w,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:6, fontSize:12, minWidth:0}}>
              <Icon name="cube" size={11} style={{color:'var(--accent-strong)', flexShrink:0}}/>
              <span style={{fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{w.name}</span>
              <span style={{fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', flexShrink:0}}>{w.role}</span>
              {w.queries && w.queries !== '—' && <span style={{fontSize:10.5, color:'var(--text-muted)', marginLeft:'auto', flexShrink:0}}>{w.queries}</span>}
            </div>
          ))}
          {wl.length > 3 && (
            <span style={{fontSize:11, color:'var(--text-muted)', fontWeight:500}}>+{wl.length - 3} more</span>
          )}
        </div>
      ) : row.isCluster ? (
        <span style={{fontSize:11.5, color:'var(--text-faint)', fontStyle:'italic'}}>Workloads aggregate at cluster level</span>
      ) : (
        <span style={{fontSize:11.5, color:'var(--text-faint)', fontStyle:'italic'}}>No connecting applications</span>
      )}
    </div>
  );
}

/* ---------- Cell 4: Risks ---------- */
function DACellRisks({ row }) {
  const r = row.risks || [];
  if (r.length === 0) {
    return <span style={{color:'var(--text-faint)', fontStyle:'italic', fontSize:12.5}}>No risks detected</span>;
  }
  const sorted = [...r].sort((a,b) => window.daSev(b.sev) - window.daSev(a.sev));
  const top = sorted[0];
  const c = SEV[top.sev];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:6}}>
      <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>
        <span style={{
          display:'inline-flex', alignItems:'center', gap:5,
          padding:'2px 8px', borderRadius:4,
          fontSize:11, fontWeight:600,
          background:c.bg, color:c.fg, border:`1px solid ${c.border}`,
          textTransform:'capitalize'
        }}>
          <span className="dot" style={{background:c.dot}}/>{top.sev}
        </span>
        <span style={{fontSize:12.5, fontWeight:500, color:'var(--text)'}}>{top.type}</span>
        {r.length > 1 && <span className="tag muted" style={{fontSize:10}}>+{r.length-1}</span>}
      </div>
      <div style={{fontSize:11.5, color:'var(--text-muted)', lineHeight:1.4}}>
        {top.note}
      </div>
      {r.length > 1 && (
        <div style={{display:'flex', gap:8, fontSize:11, color:'var(--text-muted)', alignItems:'center'}}>
          {Object.entries(row.riskCounts || {}).sort((a,b)=>window.daSev(b[0])-window.daSev(a[0])).map(([s,n])=>(
            <span key={s} style={{display:'inline-flex', alignItems:'center', gap:3}}>
              <span className="dot" style={{background:SEV[s].dot, width:5, height:5}}/>{n} {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ Filter drawer ============ */
function DAFilterDrawer({ open, onClose, filters, setFilters, rows, accounts, types, services, hostings }) {
  if (!open) return null;
  const isOn = (k,v) => (filters[k]||[]).includes(v);
  const toggle = (k,v) => setFilters(f => {
    const cur = f[k] || []; return {...f, [k]: cur.includes(v) ? cur.filter(x=>x!==v) : [...cur, v]};
  });
  const cnt = (pred) => rows.filter(pred).length;
  const Group = ({title, children}) => <div className="filter-group"><div className="label">{title}</div>{children}</div>;
  const Opt = ({k,v,label,count}) => (
    <label className="filter-option">
      <input type="checkbox" checked={isOn(k,v)} onChange={()=>toggle(k,v)}/>
      {label}<span className="count">{count}</span>
    </label>
  );
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} style={{zIndex:11}}/>
      <div className="drawer">
        <div className="drawer-head"><h3>Filters</h3>
          <button className="sheet-close" style={{marginLeft:'auto'}} onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <div className="drawer-body">
          <Group title="Severity">
            {['critical','high','medium','low'].map(s => <Opt key={s} k="sev" v={s} label={<span style={{textTransform:'capitalize'}}>{s}</span>} count={cnt(r=>r.risks?.some(x=>x.sev===s))}/>)}
          </Group>
          <Group title="Hosting">
            {hostings.map(h => <Opt key={h} k="hosting" v={h} label={h} count={cnt(r=>r.hosting===h)}/>)}
          </Group>
          <Group title="Service Type">
            {services.map(s => <Opt key={s} k="serviceType" v={s} label={s} count={cnt(r=>r.serviceType===s)}/>)}
          </Group>
          <Group title="Engine type">
            {types.map(t => <Opt key={t} k="type" v={t} label={t} count={cnt(r=>r.type===t)}/>)}
          </Group>
          <Group title="Account">
            {accounts.map(a => <Opt key={a} k="account" v={a} label={<span style={{fontFamily:'var(--font-mono)', fontSize:12}}>{a}</span>} count={cnt(r=>r.accountId===a)}/>)}
          </Group>
          <Group title="Management">
            {['ProviderManaged','SelfManaged'].map(m => <Opt key={m} k="management" v={m} label={m} count={cnt(r=>r.management===m)}/>)}
          </Group>
          <Group title="Status">
            {['Seen','NotSeen'].map(s => <Opt key={s} k="status" v={s} label={s} count={cnt(r=>r.status===s)}/>)}
          </Group>
          <Group title="Exposure">
            <label className="filter-option">
              <input type="checkbox" checked={isOn('public',true)} onChange={()=>toggle('public',true)}/>
              Has public IP / public ACL <span className="count">{cnt(r=>r.publicIP||(r.metadata&&r.metadata.acl==='public-read'))}</span>
            </label>
          </Group>
        </div>
        <div className="drawer-foot">
          <button className="btn" onClick={()=>setFilters({})}>Reset</button>
          <button className="btn primary" onClick={onClose}>Apply</button>
        </div>
      </div>
    </>
  );
}

window.DataAssetsPage = DataAssetsPage;
