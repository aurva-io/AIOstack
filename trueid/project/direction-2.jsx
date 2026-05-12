/* Balanced direction — 4-column table, prioritized by risk severity. */

const SEV_COLORS = window.SEV_COLORS;

function RiskCell({ row, onClick }) {
  const r = row.risks || [];
  if (r.length === 0) {
    return <span style={{color:'var(--text-faint)', fontStyle:'italic', fontSize: 12.5}}>No risks</span>;
  }
  const top = [...r].sort((a,b) => window.sev(b.sev) - window.sev(a.sev))[0];
  const c = SEV_COLORS[top.sev];
  return (
    <div style={{display:'flex', flexDirection:'column', gap: 6}} onClick={onClick}>
      <div style={{display:'flex', gap: 6, alignItems:'center'}}>
        <span style={{
          display:'inline-flex', alignItems:'center', gap: 5,
          padding:'2px 8px', borderRadius: 4,
          fontSize: 11, fontWeight: 600,
          background: c.bg, color: c.fg, border:`1px solid ${c.border}`,
          textTransform:'capitalize'
        }}>
          <span className="dot" style={{background: c.dot}} />
          {top.sev}
        </span>
        <span style={{fontSize: 12.5, fontWeight: 500, color:'var(--text)'}}>{top.type}</span>
        {r.length > 1 && <span className="tag muted" style={{fontSize: 10}}>+{r.length - 1}</span>}
      </div>
      <div style={{fontSize: 11.5, color:'var(--text-muted)', display:'flex', gap: 4, alignItems:'center'}}>
        {Object.entries(row.riskCounts || {}).sort((a,b)=>window.sev(b[0])-window.sev(a[0])).map(([s, n]) => (
          <span key={s} style={{display:'inline-flex', alignItems:'center', gap: 3}}>
            <span className="dot" style={{background: SEV_COLORS[s].dot, width: 5, height: 5}} />{n}
          </span>
        ))}
      </div>
    </div>
  );
}

function CloudBadge({ cloud }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap: 4,
      padding:'1px 6px', borderRadius: 3,
      fontSize: 10, fontWeight: 600,
      background:'#fff4e0', color:'#8a5a15', border:'1px solid #f0d9a5'
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M4 14a8 8 0 0 1 16 0v2H4z"/></svg>
      {cloud}
    </span>
  );
}

function DirectionBalanced({ initialSelected = null }) {
  const [selected, setSelected] = React.useState(initialSelected);
  const [initialTab, setInitialTab] = React.useState('overview');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('risk'); // risk | name

  const rows = window.INVENTORY_ROWS;
  const filtered = applyFilters(rows, filters, search);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'risk') return b.maxSev - a.maxSev || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });

  const openRow = (r, tab = 'overview') => { setInitialTab(tab); setSelected(r); };

  return (
    <div className="app-shell">
      <Rail current="inventory" />
      <div className="content">
        <div className="page-header">
          <h1>AI Runtime Inventory</h1>
          <div className="sub">Workloads prioritized by risk — AI posture and identity & access at a glance.</div>
        </div>

        <div className="toolbar">
          <div className="search">
            <Icon name="search" size={15} />
            <input placeholder="Search by name, namespace, service account, cluster..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn" onClick={()=>setFiltersOpen(true)}>
            <Icon name="filter" size={14} /> Filters
            {Object.values(filters).flat().length > 0 && <span style={{background:'var(--accent)', color:'white', borderRadius: 999, padding:'0 6px', fontSize: 11, fontWeight: 700}}>{Object.values(filters).flat().length}</span>}
          </button>
          <div className="col-toggle">
            <div className="btn-group">
              <button className={sortBy==='risk'?'on':''} onClick={()=>setSortBy('risk')}>Sort: Risk</button>
              <button className={sortBy==='name'?'on':''} onClick={()=>setSortBy('name')}>Name</button>
            </div>
          </div>
        </div>

        <div style={{padding:'10px 28px 0', display:'flex', gap: 6, flexWrap:'wrap'}}>
          {[
            { k:'sev', v:'critical', label:'Critical risks', count: rows.filter(r=>r.risks.some(x=>x.sev==='critical')).length, tone:'critical' },
            { k:'sev', v:'high',     label:'High risks',     count: rows.filter(r=>r.risks.some(x=>x.sev==='high')).length, tone:'high' },
            { k:'hasAI', v:true, label:'AI only', count: rows.filter(r=>r.isAI).length },
            { k:'exposure', v:'External', label:'External', count: rows.filter(r=>r.exposure==='External').length },
            { k:'hasIAM', v:true, label:'Has IAM Role', count: rows.filter(r=>r.iamRole).length },
            { k:'public', v:true, label:'Potentially Public', count: rows.filter(r=>r.potentiallyPublic).length },
          ].map(c => (
            <span key={c.label} className={`chip ${(filters[c.k]||[]).includes(c.v)?'active':''}`}
              onClick={()=>setFilters(f => ({...f, [c.k]: (f[c.k]||[]).includes(c.v)?[]:[c.v]}))}>
              {c.tone && <span className="dot" style={{background: SEV_COLORS[c.tone].dot}} />}
              {c.label} <span className="count">{c.count}</span>
            </span>
          ))}
        </div>

        <div className="results-row">
          <span>
            {sorted.length} workloads • <b style={{color:'#d14343'}}>{sorted.filter(r=>r.risks.some(x=>x.sev==='critical')).length}</b> critical
            • <b style={{color:'#d98f00'}}>{sorted.filter(r=>r.risks.some(x=>x.sev==='high')).length}</b> high
            • {sorted.filter(r=>r.isAI).length} AI • {sorted.filter(r=>r.iamRole).length} with IAM
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
                <th style={{width:'24%'}}>Workload</th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'24%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap: 6}}>
                    <Icon name="cube" size={12} style={{color:'var(--accent-strong)'}}/> AI POSTURE
                  </div>
                </th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'26%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap: 6}}>
                    <Icon name="shield" size={12} style={{color:'#8a6820'}}/> IDENTITY & ACCESS
                  </div>
                </th>
                <th style={{borderLeft:'1px solid var(--border)', background:'#fafaf9', width:'22%'}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap: 6}}>
                    <Icon name="alert" size={12} style={{color:'#d14343'}}/> RISKS & THREATS
                  </div>
                </th>
                <th style={{width: 28}} />
              </tr>
            </thead>
            <tbody>
              {sorted.map(r => {
                const sevKey = r.risks.length ? [...r.risks].sort((a,b)=>window.sev(b.sev)-window.sev(a.sev))[0].sev : 'none';
                const sevC = SEV_COLORS[sevKey];
                return (
                  <tr key={r.id} className={selected?.id === r.id ? 'selected' : ''}
                      style={{boxShadow: selected?.id === r.id ? undefined : `inset 3px 0 0 ${sevC.dot}`}}>
                    <td onClick={() => openRow(r)}>
                      <div className="service-cell">
                        <span className="name">
                          <Icon name="ext" size={12} className="ext-icon" />
                          {r.name}
                        </span>
                        <div style={{display:'flex', gap: 6, alignItems:'center', marginTop: 2, flexWrap:'wrap'}}>
                          <KindTag kind={r.kind} />
                          <span className="ns" style={{fontFamily:'var(--font-mono)'}}>{r.namespace}</span>
                        </div>
                        <div style={{display:'flex', gap: 6, alignItems:'center', marginTop: 4, flexWrap:'wrap', fontSize: 11}}>
                          <CloudBadge cloud={r.cloud} />
                          <span style={{color:'var(--text-muted)', fontFamily:'var(--font-mono)'}}>
                            {r.cluster} <span style={{color:'var(--text-faint)'}}>·</span> {r.account.slice(0,4)}…{r.account.slice(-4)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td onClick={() => openRow(r, 'overview')} style={{borderLeft:'1px solid var(--border)'}}>
                      {r.isAI ? (
                        <div style={{display:'flex', flexDirection:'column', gap: 6}}>
                          <div style={{display:'flex', gap: 6, alignItems:'center', flexWrap:'wrap'}}>
                            <span className="tag aiapp">AI App</span>
                            <EndpointsCell endpoints={r.aiEndpoints} />
                          </div>
                          <div style={{display:'flex', gap: 10, fontSize: 11.5, color:'var(--text-muted)', alignItems:'center', flexWrap:'wrap'}}>
                            {r.volume && <><span>{r.volume.calls} calls</span><span>·</span><span>{r.volume.data}</span></>}
                            {r.review && <><span>·</span><ReviewBadge value={r.review} /></>}
                          </div>
                        </div>
                      ) : (
                        <span style={{color:'var(--text-faint)', fontStyle:'italic', fontSize: 12.5}}>No AI activity detected</span>
                      )}
                    </td>

                    <td onClick={() => openRow(r, r.iamRole ? 'policies' : 'identity')} style={{borderLeft:'1px solid var(--border)'}}>
                      {(r.iamRole || r.serviceAccount) ? (
                        <div style={{display:'flex', flexDirection:'column', gap: 6}}>
                          <div style={{display:'flex', gap: 6, alignItems:'center', flexWrap:'wrap'}}>
                            <IamRoleCell role={r.iamRole} />
                            {r.potentiallyPublic && <span className="tag external" style={{fontSize: 10}}><Icon name="globe" size={10}/>Public</span>}
                          </div>
                          <div style={{display:'flex', gap: 8, fontSize: 11.5, color:'var(--text-muted)', alignItems:'center', flexWrap:'wrap'}}>
                            {r.iamRole ? (
                              <>
                                <span style={{display:'inline-flex', alignItems:'center', gap: 4}}>
                                  <Icon name="file" size={11} />
                                  <b style={{color:'var(--text)'}}>{r.policyCount}</b> polic{r.policyCount===1?'y':'ies'}
                                </span>
                                <span>·</span>
                                <span style={{display:'inline-flex', alignItems:'center', gap: 4}}>
                                  <Icon name="cube" size={11} />
                                  <b style={{color:'var(--text)'}}>{r.resourceCount}</b> resource{r.resourceCount===1?'':'s'}
                                </span>
                                {r.dbAccessCount > 0 && (
                                  <>
                                    <span>·</span>
                                    <span style={{display:'inline-flex', alignItems:'center', gap: 4, color:'#34638f', fontWeight: 500}}>
                                      <Icon name="db" size={11} />
                                      <b>{r.dbAccessCount}</b> DB
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <span style={{fontFamily:'var(--font-mono)'}}>SA: {r.serviceAccount}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span style={{color:'var(--text-faint)', fontStyle:'italic', fontSize: 12.5}}>No IAM role attached</span>
                      )}
                    </td>

                    <td onClick={() => openRow(r, 'risks')} style={{borderLeft:'1px solid var(--border)'}}>
                      <RiskCell row={r} />
                    </td>

                    <td onClick={() => openRow(r)}><Icon name="chevRight" size={14} style={{color:'var(--text-faint)'}} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && <DetailPanel row={selected} onClose={() => setSelected(null)} initialTab={initialTab} />}
        <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} setFilters={setFilters} rows={rows} />
      </div>
    </div>
  );
}

window.DirectionBalanced = DirectionBalanced;
window.SEV_COLORS = SEV_COLORS;
