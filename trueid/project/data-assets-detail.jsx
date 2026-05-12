/* Data Assets — side detail panel.
   Tabs: Overview, Sensitive Data (locked), Applications, Risks, Metadata. */

const SEV_D = window.SEV_COLORS;

function DADetail({ row, onClose, initialTab = 'overview' }) {
  const [tab, setTab] = React.useState(initialTab);
  React.useEffect(() => setTab(initialTab), [initialTab, row?.id]);
  if (!row) return null;
  const eng = window.ENGINE_INFO[row.type] || { label: row.type, color:'#888' };
  const isPublic = !!row.publicIP || (row.metadata && row.metadata.acl === 'public-read');
  const riskCount = (row.risks || []).length;
  const wlCount = (row.workloads || []).length;

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog">
        <div className="sheet-head">
          <button className="sheet-close" onClick={onClose}><Icon name="x" size={14}/></button>
          <div className="sheet-title">
            <h2 style={{display:'flex', alignItems:'center', gap: 8}}>
              <span className="swatch" style={{background: eng.color, width: 12, height: 12, borderRadius: 3}} />
              {row.displayName}
            </h2>
            <div className="sub" style={{fontFamily:'var(--font-mono)', fontSize: 11.5}}>{row.name}</div>
          </div>
          <div className="sheet-head-side">
            <span className="tag muted" style={{fontSize: 11}}>{eng.label}{row.version?` ${row.version}`:''}</span>
            {row.isCluster && <span className="tag aiapp" style={{background:'#eef0fb', color:'#445599', borderColor:'#cdd3ee'}}>Cluster</span>}
            {isPublic && <span className="tag external"><Icon name="globe" size={11}/>Public</span>}
            <button className="btn"><Icon name="ext" size={13}/> Open</button>
          </div>
        </div>

        <div className="sheet-tabs">
          <Tab active={tab==='overview'} onClick={()=>setTab('overview')} icon="info">Overview</Tab>
          <Tab active={tab==='sensitive'} onClick={()=>setTab('sensitive')} icon="lock">Sensitive Data</Tab>
          <Tab active={tab==='applications'} onClick={()=>setTab('applications')} icon="cube" count={wlCount}>Applications</Tab>
          <Tab active={tab==='risks'} onClick={()=>setTab('risks')} icon="alert" count={riskCount}>Risks</Tab>
          <Tab active={tab==='metadata'} onClick={()=>setTab('metadata')} icon="file">Metadata</Tab>
        </div>

        <div className="sheet-body">
          {tab==='overview' && <DAOverview row={row} eng={eng} />}
          {tab==='sensitive' && <DASensitive row={row} />}
          {tab==='applications' && <DAApplications row={row} />}
          {tab==='risks' && <DARisks row={row} />}
          {tab==='metadata' && <DAMetadata row={row} />}
        </div>
      </div>
    </>
  );
}

function Tab({ active, onClick, icon, children, count }) {
  return (
    <div className={`sheet-tab ${active?'active':''}`} onClick={onClick}>
      <Icon name={icon} size={13}/> {children}
      {count > 0 && <span style={{marginLeft: 4, background:'var(--bg-muted)', padding:'0 6px', borderRadius:999, fontSize: 10, fontWeight: 600}}>{count}</span>}
    </div>
  );
}

function DAOverview({ row, eng }) {
  const Row = ({ k, v, mono }) => (
    <div className="ov-row"><span className="k">{k}</span><span className="v" style={mono?{fontFamily:'var(--font-mono)', fontSize:12}:{}}>{v ?? '—'}</span></div>
  );
  return (
    <div>
      <div className="ov-section">
        <div className="ov-label">Identity</div>
        <div className="ov-grid">
          <Row k="Display name" v={row.displayName} />
          <Row k="Engine" v={`${eng.label}${row.version?' · '+row.version:''}`} />
          <Row k="Service type" v={row.serviceType} />
          <Row k="Management" v={row.management} />
          <Row k="Function" v={row.function} />
          <Row k="Status" v={<StatusPill v={row.status} />} />
        </div>
      </div>
      <div className="ov-section">
        <div className="ov-label">Location</div>
        <div className="ov-grid">
          <Row k="Hosting" v={row.hosting} />
          <Row k="Where" v={row.location} />
          <Row k="Region" v={row.region} mono />
          <Row k="Account" v={row.accountId} mono />
          <Row k="Outpost" v={row.outpostId ? row.outpostId.slice(0,8)+'…' : '—'} mono />
          <Row k="Creation source" v={<CreationSourcePill v={row.creationSource} />} />
        </div>
      </div>
      <div className="ov-section">
        <div className="ov-label">Networking</div>
        <div className="ov-grid">
          <Row k="Host" v={row.host} mono />
          <Row k="Connection endpoint" v={row.connectionEndpoint || row.host} mono />
          <Row k="Port" v={row.port} mono />
          <Row k="Public IP" v={row.publicIP || '—'} mono />
          <Row k="Private IP" v={row.privateIP || '—'} mono />
        </div>
      </div>
      <div className="ov-section">
        <div className="ov-label">Discovery</div>
        <div className="ov-grid">
          <Row k="First found" v={row.firstFoundAt?.replace('T',' ').replace('Z',' UTC') || '—'} mono />
          <Row k="Last updated" v={row.updatedAt?.replace('T',' ').replace('Z',' UTC') || '—'} mono />
        </div>
      </div>
    </div>
  );
}

function DASensitive({ row }) {
  return (
    <div>
      <div style={{
        padding:'28px', borderRadius:10,
        background:'repeating-linear-gradient(45deg, #faf6fd, #faf6fd 8px, #f4ecfa 8px, #f4ecfa 16px)',
        border:'1px dashed #d6b6e8',
        display:'flex', flexDirection:'column', alignItems:'flex-start', gap:14,
      }}>
        <div style={{
          width:48, height:48, borderRadius:10,
          background:'white', border:'1px solid #d6b6e8',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#6b3a8a',
        }}>
          <Icon name="lock" size={22}/>
        </div>
        <div>
          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:'#4a2966'}}>Sensitive data scan unavailable</h3>
          <div style={{fontSize:13, color:'var(--text-secondary)', marginTop:6, maxWidth: 540, lineHeight:1.55}}>
            Connect this datasource to Aurva to discover and classify <b>PII</b>, <b>PHI</b>, <b>PCI</b>,
            secrets, and other sensitive fields. Once scanned, you'll see column-level findings,
            sample values, and exposure paths to applications and identities.
          </div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
          <button className="btn primary" style={{background:'#6b3a8a', borderColor:'#6b3a8a'}}>
            <Icon name="link" size={13}/> Connect to Aurva
          </button>
          <button className="btn">Learn more</button>
          <span style={{fontSize:11.5, color:'var(--text-muted)', marginLeft:6}}>Feature in development</span>
        </div>
      </div>

      <div className="ov-section" style={{marginTop:24}}>
        <div className="ov-label">What you'll get</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10}}>
          {[
            {ic:'idcard', t:'Field-level classification', d:'Names, emails, phone numbers, SSNs, payment cards, health records.'},
            {ic:'graph', t:'Exposure mapping', d:'Which apps and identities can read each sensitive column.'},
            {ic:'shield', t:'Compliance tagging', d:'Auto-tag against GDPR, HIPAA, PCI-DSS, DPDP scopes.'},
            {ic:'alert', t:'Drift alerts', d:'Notification when new sensitive fields appear in this datasource.'},
          ].map((f,i)=>(
            <div key={i} style={{display:'flex', gap:10, padding:12, background:'var(--bg-subtle)', borderRadius:8, border:'1px solid var(--border)'}}>
              <Icon name={f.ic} size={16} style={{color:'#6b3a8a', flexShrink:0, marginTop:2}}/>
              <div>
                <div style={{fontSize:12.5, fontWeight:600}}>{f.t}</div>
                <div style={{fontSize:11.5, color:'var(--text-muted)', marginTop:2, lineHeight:1.45}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DAApplications({ row }) {
  const wl = row.workloads || [];
  const dv = row.dataVolume;
  return (
    <div>
      {dv && (
        <div className="ov-section">
          <div className="ov-label">Volume &amp; activity</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
            {[
              {label:'Storage size', v:dv.size},
              dv.tables && {label:'Tables', v:dv.tables},
              dv.collections && {label:'Collections', v:dv.collections},
              dv.objects && {label:'Objects', v:dv.objects},
              {label:'Queries / day', v:dv.queriesPerDay || '—'},
              {label:'Growth', v:dv.growth || '—'},
            ].filter(Boolean).slice(0,4).map((s,i)=>(
              <div key={i} style={{padding:12, background:'var(--bg-subtle)', borderRadius:8, border:'1px solid var(--border)'}}>
                <div style={{fontSize:10.5, fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.06em'}}>{s.label}</div>
                <div style={{fontSize:18, fontWeight:700, marginTop:4, fontFamily:'var(--font-mono)'}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ov-section">
        <div className="ov-label">Applications connecting to this datasource ({wl.length})</div>
        {wl.length === 0 ? (
          <div style={{color:'var(--text-faint)', fontStyle:'italic', fontSize:13, padding:'10px 0'}}>
            {row.isCluster ? 'Cluster aggregates connections — see member instances.' : 'No connecting applications detected.'}
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {wl.map((w,i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:6}}>
                <Icon name="cube" size={16} style={{color:'var(--accent-strong)'}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:600}}>{w.name}</div>
                  <div style={{fontSize:11.5, color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginTop:2}}>{w.ns}</div>
                </div>
                <div style={{display:'flex', gap:14, alignItems:'center'}}>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:11, color:'var(--text-muted)'}}>Role</div>
                    <div style={{fontSize:12, fontFamily:'var(--font-mono)', fontWeight:500}}>{w.role}</div>
                  </div>
                  {w.queries && w.queries !== '—' && (
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:11, color:'var(--text-muted)'}}>Queries</div>
                      <div style={{fontSize:12, fontWeight:500}}>{w.queries}</div>
                    </div>
                  )}
                </div>
                <button className="btn" style={{height:30, fontSize:11.5}}><Icon name="ext" size={12}/> Open</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DARisks({ row }) {
  const r = row.risks || [];
  if (r.length === 0) {
    return <EmptyState icon="check" title="No risks detected" message="No misconfigurations, CVEs, or unusual activity have been flagged on this datasource."/>;
  }
  const sorted = [...r].sort((a,b) => window.daSev(b.sev) - window.daSev(a.sev));
  return (
    <div>
      <div className="ov-section">
        <div className="ov-label">{r.length} risk{r.length===1?'':'s'} detected</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {sorted.map((x,i) => {
            const c = SEV_D[x.sev];
            return (
              <div key={i} style={{
                display:'flex', gap:14, padding:'14px 16px',
                background:'var(--bg)', border:`1px solid ${c.border}`,
                borderLeft:`3px solid ${c.dot}`, borderRadius:6,
              }}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4, minWidth:64}}>
                  <span style={{
                    padding:'2px 8px', borderRadius:4, fontSize:10.5, fontWeight:700,
                    background:c.bg, color:c.fg, border:`1px solid ${c.border}`, textTransform:'uppercase'
                  }}>{x.sev}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5, fontWeight:600}}>{x.type}</div>
                  <div style={{fontSize:12.5, color:'var(--text-muted)', marginTop:4, lineHeight:1.5}}>{x.note}</div>
                </div>
                <button className="btn" style={{height:28, fontSize:11.5}}>Investigate</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DAMetadata({ row }) {
  if (!row.metadata) return <EmptyState icon="file" title="No metadata" message="The discovery source did not attach additional metadata to this asset." />;
  const json = JSON.stringify(row.metadata, null, 2);
  return (
    <div>
      <div className="ov-section">
        <div className="ov-label">Provider metadata (JSON)</div>
        <pre style={{margin:0, padding:14, background:'#1f1d1a', color:'#e7e3da', fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.55, borderRadius:8, overflow:'auto', maxHeight: 360}}>{json}</pre>
      </div>
    </div>
  );
}

function StatusPill({ v }) {
  if (v === 'Seen') return <span className="tag ok"><span className="dot" style={{background:'#3a7a55'}}/>Seen</span>;
  return <span className="tag muted" style={{color:'#a86b1a', background:'#fdecd2', borderColor:'#eac78a'}}><span className="dot" style={{background:'#d98f00'}}/>NotSeen</span>;
}

function CreationSourcePill({ v }) {
  const map = { CloudAPI:{c:'#34638f', l:'Cloud API'}, EBPF:{c:'#6b3a8a', l:'eBPF'}, Manual:{c:'#78716c', l:'Manual'} };
  const x = map[v] || { c:'#78716c', l:v };
  return <span style={{display:'inline-flex', alignItems:'center', gap:5, fontSize:11.5}}><span className="dot" style={{background:x.c}}/>{x.l}</span>;
}

Object.assign(window, { DADetail, StatusPill, CreationSourcePill });
