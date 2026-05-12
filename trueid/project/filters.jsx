/* Filter drawer + chips + toolbar */

function FilterDrawer({ open, onClose, filters, setFilters, rows }) {
  if (!open) return null;
  const counts = (key, val) => rows.filter(r => {
    if (key === 'kind') return r.kind === val;
    if (key === 'exposure') return r.exposure === val;
    if (key === 'namespace') return r.namespace === val;
    if (key === 'hasAI') return val ? r.isAI : !r.isAI;
    if (key === 'hasIAM') return val ? !!r.iamRole : !r.iamRole;
    if (key === 'aiEndpoint') return (r.aiEndpoints||[]).some(e => e.name === val);
    return true;
  }).length;

  const namespaces = [...new Set(rows.map(r => r.namespace))];
  const endpoints = [...new Set(rows.flatMap(r => (r.aiEndpoints||[]).map(e => e.name)))];

  const toggle = (key, val) => {
    setFilters(f => {
      const cur = f[key] || [];
      return { ...f, [key]: cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val] };
    });
  };
  const isOn = (key, val) => (filters[key] || []).includes(val);

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} style={{zIndex: 11}} />
      <div className="drawer">
        <div className="drawer-head">
          <h3>Filters</h3>
          <button className="sheet-close" style={{marginLeft: 'auto'}} onClick={onClose}><Icon name="x" size={14} /></button>
        </div>
        <div className="drawer-body">
          <FilterGroup title="Kind">
            {['Deployment','StatefulSet','DaemonSet'].map(k => (
              <label key={k} className="filter-option">
                <input type="checkbox" checked={isOn('kind', k)} onChange={()=>toggle('kind', k)} />
                {k}
                <span className="count">{counts('kind', k)}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Exposure">
            {['External','Internal'].map(k => (
              <label key={k} className="filter-option">
                <input type="checkbox" checked={isOn('exposure', k)} onChange={()=>toggle('exposure', k)} />
                {k}
                <span className="count">{counts('exposure', k)}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="AI">
            <label className="filter-option">
              <input type="checkbox" checked={isOn('hasAI', true)} onChange={()=>toggle('hasAI', true)} />
              Has AI signals
              <span className="count">{rows.filter(r => r.isAI).length}</span>
            </label>
            <label className="filter-option">
              <input type="checkbox" checked={isOn('risk', 'Zombie AI')} onChange={()=>toggle('risk', 'Zombie AI')} />
              Zombie AI
              <span className="count">{rows.filter(r => r.risk === 'Zombie AI').length}</span>
            </label>
          </FilterGroup>

          {endpoints.length > 0 && (
            <FilterGroup title="AI Endpoints">
              {endpoints.map(ep => (
                <label key={ep} className="filter-option">
                  <input type="checkbox" checked={isOn('aiEndpoint', ep)} onChange={()=>toggle('aiEndpoint', ep)} />
                  {ep}
                  <span className="count">{counts('aiEndpoint', ep)}</span>
                </label>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Identity & Access">
            <label className="filter-option">
              <input type="checkbox" checked={isOn('hasIAM', true)} onChange={()=>toggle('hasIAM', true)} />
              Has IAM Role
              <span className="count">{rows.filter(r => r.iamRole).length}</span>
            </label>
            <label className="filter-option">
              <input type="checkbox" checked={isOn('public', true)} onChange={()=>toggle('public', true)} />
              Potentially Public
              <span className="count">{rows.filter(r => r.potentiallyPublic).length}</span>
            </label>
          </FilterGroup>

          <FilterGroup title="Namespace">
            {namespaces.map(n => (
              <label key={n} className="filter-option">
                <input type="checkbox" checked={isOn('namespace', n)} onChange={()=>toggle('namespace', n)} />
                <span style={{fontFamily:'var(--font-mono)', fontSize: 12}}>{n}</span>
                <span className="count">{counts('namespace', n)}</span>
              </label>
            ))}
          </FilterGroup>
        </div>
        <div className="drawer-foot">
          <button className="btn" onClick={() => setFilters({})}>Reset</button>
          <button className="btn primary" onClick={onClose}>Apply</button>
        </div>
      </div>
    </>
  );
}

const FilterGroup = ({ title, children }) => (
  <div className="filter-group">
    <div className="label">{title}</div>
    {children}
  </div>
);

// Apply filters to rows
function applyFilters(rows, filters, search) {
  return rows.filter(r => {
    if (search) {
      const q = search.toLowerCase();
      if (!(r.name.toLowerCase().includes(q) || r.namespace.toLowerCase().includes(q) || (r.serviceAccount||'').toLowerCase().includes(q))) return false;
    }
    if (filters.kind?.length && !filters.kind.includes(r.kind)) return false;
    if (filters.exposure?.length && !filters.exposure.includes(r.exposure)) return false;
    if (filters.hasAI?.includes(true) && !r.isAI) return false;
    if (filters.risk?.includes('Zombie AI') && r.risk !== 'Zombie AI') return false;
    if (filters.aiEndpoint?.length && !(r.aiEndpoints||[]).some(e => filters.aiEndpoint.includes(e.name))) return false;
    if (filters.hasIAM?.includes(true) && !r.iamRole) return false;
    if (filters.public?.includes(true) && !r.potentiallyPublic) return false;
    if (filters.namespace?.length && !filters.namespace.includes(r.namespace)) return false;
    return true;
  });
}

Object.assign(window, { FilterDrawer, applyFilters });
