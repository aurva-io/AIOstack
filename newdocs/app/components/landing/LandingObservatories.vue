<script setup lang="ts">
const observatories = [
  {
    index: '01',
    title: 'Apps & Models',
    sub: 'every model invocation, observed',
    rows: [
      ['claude-3-haiku',      'bedrock',   '12,408 calls · 24h'],
      ['claude-3-sonnet',     'bedrock',   '1,820 calls · 24h'],
      ['text-embedding-3-sm', 'openai',    '84,012 calls · 24h'],
      ['llama-3-70b',         'self-host', '412 calls · 24h'],
      ['gemini-1.5-flash',    'vertex',    '0 calls · 24h'],
    ],
    ledger: [
      ['catalog',      '12 distinct models · 4 providers'],
      ['unsanctioned', '2 models invoked off-list'],
      ['traffic',      '98,652 invocations · last 24h'],
      ['data',         'prompts, completions, tokens, latency'],
    ],
  },
  {
    index: '02',
    title: 'Identities',
    sub: 'every identity that touched AI',
    rows: [
      ['dataplane-sa',      'k8s-sa',    '12 perms · 3 used'],
      ['iam: pii-analyzer', 'aws-role',  'drift · 1 new perm 24h'],
      ['okta-svc',          'federated', '2 calls · sanctioned'],
      ['scheduler-cron',    'k8s-sa',    'bedrock only · OK'],
      ['ci-runner',         'aws-role',  'first seen 2d ago'],
    ],
    ledger: [
      ['catalog',  '47 identities · 6 service accounts'],
      ['drift',    '3 identities with new perms this week'],
      ['baseline', '90d · least privilege computed'],
      ['data',     'sa → role → resource, per call'],
    ],
  },
  {
    index: '03',
    title: 'Endpoints',
    sub: 'every URL the AI talks to',
    rows: [
      ['api.openai.com/v1/embeddings', 'egress',   'external · sanctioned'],
      ['bedrock.amazonaws.com',        'egress',   'in-vpc · sanctioned'],
      ['38.142.21.7:443',              'egress',   'novel · 3d ago'],
      ['pinecone.io/vectors/upsert',   'egress',   'external · sanctioned'],
      ['internal: rds.docs:5432',      'internal', 'in-cluster'],
    ],
    ledger: [
      ['catalog', '147 endpoints reached in 30d'],
      ['new',     '8 endpoints first-seen this week'],
      ['traffic', '1.2 TB egress · 24h'],
      ['data',    'destination, payload, mTLS, identity'],
    ],
  },
  {
    index: '04',
    title: 'Datasources',
    sub: 'every byte of sensitive data, traced',
    rows: [
      ['rds: docs.users',      'postgres',  'pii · 24,108 reads · 24h'],
      ['s3://pii-vault/*',     'object',    'pii · 1.8 GB read'],
      ['pinecone: emb-prod',   'vector',    '3.4M queries · embeddings'],
      ['redis: session-cache', 'kv',        'tokens · in-cluster'],
      ['snowflake: analytics', 'warehouse', '4 columns · pii'],
    ],
    ledger: [
      ['catalog', '38 datasources · 11 carry pii'],
      ['fsm',     'network FSMs parse pg · mysql · http · grpc'],
      ['flow',    'agent → query → row → exfil, mapped'],
      ['data',    'queries, columns, rows, payload size'],
    ],
  },
]
</script>

<template>
  <section class="v4-section v4-bordered">
    <div class="v4-container">
      <div class="v4-section-head">
        <span class="v4-section-num">§ 02</span>
        <h2 class="v4-h2">
          Four observatories.<br>
          One agent. Same evidence.
        </h2>
        <p class="v4-section-lead">
          AIOStack does not give you a generic dashboard. It gives you four precise inventories — every app and model running, every identity that ran them, every endpoint they called, every datasource they read — joined onto the same runtime trace.
        </p>
      </div>
    </div>

    <div class="v4-container v4-obs-grid">
      <!-- Apps & Models -->
      <div class="v4-obs">
        <div class="v4-obs-head">
          <span class="v4-section-num">§ 02 · 01</span>
          <span class="v4-mono v4-mono-dim">obs/apps-models</span>
        </div>
        <div class="v4-obs-title-row">
          <h3 class="v4-h3">Apps &amp; Models</h3>
          <span class="v4-mono v4-mono-dim">every model invocation, observed</span>
        </div>
        <div class="v4-obs-diagram">
          <svg viewBox="0 0 320 160" class="v4-mini-svg">
            <defs>
              <marker id="m4-a1" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.5)"/>
              </marker>
            </defs>
            <rect x="12" y="64" width="70" height="32" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
            <text x="47" y="84" text-anchor="middle" class="v4-svg-title">caller</text>
            <line x1="82" y1="80" x2="140" y2="80" stroke="rgba(255,255,255,.5)" marker-end="url(#m4-a1)"/>
            <text x="111" y="72" text-anchor="middle" class="v4-svg-tag">invoke</text>
            <g v-for="(m, i) in [{y:16,name:'claude-3-haiku',tag:'bedrock'},{y:60,name:'embedding-3-sm',tag:'openai'},{y:104,name:'llama-3-70b',tag:'self-host'}]" :key="i">
              <line x1="140" y1="80" :x2="170" :y2="m.y+16" stroke="rgba(255,255,255,.3)"/>
              <rect x="170" :y="m.y" width="130" height="32" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.4)"/>
              <text x="178" :y="m.y+14" class="v4-svg-mark" :style="{fill:'rgba(255,255,255,.45)'}">{{ m.tag.toUpperCase() }}</text>
              <text x="178" :y="m.y+26" class="v4-svg-title">{{ m.name }}</text>
            </g>
            <text x="12" y="150" class="v4-svg-coord">SEEN BY · eBPF KPROBE / SOCK_OPS</text>
          </svg>
        </div>
        <div class="v4-obs-rows">
          <div class="v4-obs-rows-head"><span>name</span><span>kind</span><span>signal</span></div>
          <div v-for="(r,i) in observatories[0].rows" :key="i" class="v4-obs-row">
            <span class="v4-mono">{{ r[0] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[1] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[2] }}</span>
          </div>
        </div>
        <div class="v4-obs-ledger">
          <div v-for="(l,i) in observatories[0].ledger" :key="i">
            <span class="v4-ledger-key">{{ l[0] }}</span>
            <span class="v4-ledger-val">{{ l[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Identities -->
      <div class="v4-obs">
        <div class="v4-obs-head">
          <span class="v4-section-num">§ 02 · 02</span>
          <span class="v4-mono v4-mono-dim">obs/identities</span>
        </div>
        <div class="v4-obs-title-row">
          <h3 class="v4-h3">Identities</h3>
          <span class="v4-mono v4-mono-dim">every identity that touched AI</span>
        </div>
        <div class="v4-obs-diagram">
          <svg viewBox="0 0 320 160" class="v4-mini-svg">
            <g v-for="(n,i) in [{x:12,label:'actor',sub:'human/sched'},{x:84,label:'agent',sub:'k8s pod'},{x:156,label:'sa→role',sub:'iam chain'},{x:230,label:'resource',sub:'rds·s3·model'}]" :key="i">
              <rect :x="n.x" y="50" width="70" height="44" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
              <text :x="n.x+6" y="66" class="v4-svg-mark" :style="{fill:'rgba(255,255,255,.45)'}">0{{ i+1 }}</text>
              <text :x="n.x+6" y="80" class="v4-svg-title">{{ n.label }}</text>
              <text :x="n.x+6" y="90" class="v4-svg-sub">{{ n.sub }}</text>
              <line v-if="i<3" :x1="n.x+70" y1="72" :x2="n.x+84" y2="72" stroke="rgba(255,255,255,.5)"/>
            </g>
            <line x1="156" y1="50" x2="156" y2="28" stroke="rgba(225,118,90,.7)" stroke-dasharray="2 2"/>
            <rect x="120" y="14" width="130" height="14" fill="none" stroke="rgba(225,118,90,.7)"/>
            <text x="185" y="24" text-anchor="middle" class="v4-svg-tag-alert">drift · 1 new perm 24h</text>
            <text x="12" y="130" class="v4-svg-coord">JOIN · K8S API · CLOUDTRAIL · IAM</text>
            <text x="12" y="146" class="v4-svg-coord">PER · IDENTITY · 90D BASELINE</text>
          </svg>
        </div>
        <div class="v4-obs-rows">
          <div class="v4-obs-rows-head"><span>name</span><span>kind</span><span>signal</span></div>
          <div v-for="(r,i) in observatories[1].rows" :key="i" class="v4-obs-row">
            <span class="v4-mono">{{ r[0] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[1] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[2] }}</span>
          </div>
        </div>
        <div class="v4-obs-ledger">
          <div v-for="(l,i) in observatories[1].ledger" :key="i">
            <span class="v4-ledger-key">{{ l[0] }}</span>
            <span class="v4-ledger-val">{{ l[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Endpoints -->
      <div class="v4-obs">
        <div class="v4-obs-head">
          <span class="v4-section-num">§ 02 · 03</span>
          <span class="v4-mono v4-mono-dim">obs/endpoints</span>
        </div>
        <div class="v4-obs-title-row">
          <h3 class="v4-h3">Endpoints</h3>
          <span class="v4-mono v4-mono-dim">every URL the AI talks to</span>
        </div>
        <div class="v4-obs-diagram">
          <svg viewBox="0 0 320 160" class="v4-mini-svg">
            <defs>
              <pattern id="e4-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,.04)"/>
              </pattern>
            </defs>
            <rect x="4" y="4" width="312" height="140" fill="url(#e4-grid)"/>
            <rect x="12" y="20" width="140" height="110" fill="none" stroke="rgba(255,255,255,.3)" stroke-dasharray="3 3"/>
            <text x="20" y="32" class="v4-svg-mark">CLUSTER</text>
            <circle cx="50"  cy="70" r="5" fill="rgba(255,255,255,.85)"/>
            <circle cx="88"  cy="92" r="5" fill="rgba(255,255,255,.85)"/>
            <circle cx="120" cy="56" r="5" fill="rgba(255,255,255,.85)"/>
            <line x1="152" y1="75" x2="185" y2="75" stroke="rgba(255,255,255,.4)"/>
            <text x="168" y="68" text-anchor="middle" class="v4-svg-tag">egress</text>
            <g v-for="(e,i) in [{y:26,name:'api.openai.com',tag:'OK',alert:false},{y:60,name:'bedrock.aws',tag:'OK',alert:false},{y:94,name:'38.142.21.7',tag:'NEW',alert:true},{y:122,name:'pinecone.io',tag:'OK',alert:false}]" :key="i">
              <line x1="185" y1="75" x2="205" :y2="e.y+6" :stroke="e.alert ? 'rgba(225,118,90,.7)' : 'rgba(255,255,255,.25)'"/>
              <rect x="205" :y="e.y" width="108" height="14" fill="none" :stroke="e.alert ? 'rgba(225,118,90,.7)' : 'rgba(255,255,255,.4)'"/>
              <text x="211" :y="e.y+10" class="v4-svg-title" :style="{fill: e.alert ? 'rgba(245,170,135,.95)' : 'rgba(255,255,255,.85)'}">{{ e.name }}</text>
              <text x="307" :y="e.y+10" text-anchor="end" class="v4-svg-tag" :style="{fill: e.alert ? 'rgba(245,170,135,.95)' : 'rgba(255,255,255,.4)'}">{{ e.tag }}</text>
            </g>
            <text x="12" y="150" class="v4-svg-coord">SEEN BY · TC · SOCK_OPS</text>
          </svg>
        </div>
        <div class="v4-obs-rows">
          <div class="v4-obs-rows-head"><span>name</span><span>kind</span><span>signal</span></div>
          <div v-for="(r,i) in observatories[2].rows" :key="i" class="v4-obs-row">
            <span class="v4-mono">{{ r[0] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[1] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[2] }}</span>
          </div>
        </div>
        <div class="v4-obs-ledger">
          <div v-for="(l,i) in observatories[2].ledger" :key="i">
            <span class="v4-ledger-key">{{ l[0] }}</span>
            <span class="v4-ledger-val">{{ l[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Datasources -->
      <div class="v4-obs">
        <div class="v4-obs-head">
          <span class="v4-section-num">§ 02 · 04</span>
          <span class="v4-mono v4-mono-dim">obs/datasources</span>
        </div>
        <div class="v4-obs-title-row">
          <h3 class="v4-h3">Datasources</h3>
          <span class="v4-mono v4-mono-dim">every byte of sensitive data, traced</span>
        </div>
        <div class="v4-obs-diagram">
          <svg viewBox="0 0 320 160" class="v4-mini-svg">
            <defs>
              <marker id="d4-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0L7 4L0 8z" fill="rgba(170,220,138,.85)"/>
              </marker>
            </defs>
            <rect x="10" y="64" width="64" height="32" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.5)"/>
            <text x="42" y="78" text-anchor="middle" class="v4-svg-title">agent</text>
            <text x="42" y="90" text-anchor="middle" class="v4-svg-sub">pii-analyzer</text>
            <line x1="74" y1="80" x2="108" y2="80" stroke="rgba(255,255,255,.5)"/>
            <rect x="108" y="58" width="84" height="44" fill="rgba(0,0,0,.4)" stroke="rgba(170,220,138,.7)"/>
            <text x="114" y="72" class="v4-svg-mark" :style="{fill:'rgba(170,220,138,.95)'}">eBPF · FSM</text>
            <text x="114" y="86" class="v4-svg-title" :style="{fontSize:10}">parses query</text>
            <text x="114" y="97" class="v4-svg-sub">SELECT · cols · rows</text>
            <line x1="192" y1="80" x2="216" y2="80" stroke="rgba(170,220,138,.85)" marker-end="url(#d4-arr)"/>
            <g v-for="(d,i) in [{y:16,name:'rds: docs',tag:'PII',alert:true},{y:50,name:'s3: pii/*',tag:'PII',alert:true},{y:84,name:'pinecone',tag:'VEC',alert:false},{y:118,name:'redis',tag:'KV',alert:false}]" :key="i">
              <rect x="216" :y="d.y" width="92" height="20" fill="none" :stroke="d.alert ? 'rgba(225,118,90,.65)' : 'rgba(255,255,255,.4)'"/>
              <text x="222" :y="d.y+14" class="v4-svg-title" :style="{fontSize:10, fill: d.alert ? 'rgba(245,170,135,.95)' : 'rgba(255,255,255,.85)'}">{{ d.name }}</text>
              <text x="302" :y="d.y+14" text-anchor="end" class="v4-svg-tag" :style="{fill: d.alert ? 'rgba(245,170,135,.95)' : 'rgba(255,255,255,.4)'}">{{ d.tag }}</text>
            </g>
            <text x="12" y="150" class="v4-svg-coord">SEEN BY · NETWORK FSM · PG · MYSQL · HTTP · GRPC</text>
          </svg>
        </div>
        <div class="v4-obs-rows">
          <div class="v4-obs-rows-head"><span>name</span><span>kind</span><span>signal</span></div>
          <div v-for="(r,i) in observatories[3].rows" :key="i" class="v4-obs-row">
            <span class="v4-mono">{{ r[0] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[1] }}</span>
            <span class="v4-mono v4-mono-dim">{{ r[2] }}</span>
          </div>
        </div>
        <div class="v4-obs-ledger">
          <div v-for="(l,i) in observatories[3].ledger" :key="i">
            <span class="v4-ledger-key">{{ l[0] }}</span>
            <span class="v4-ledger-val">{{ l[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
