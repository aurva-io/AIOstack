<script setup lang="ts">
const steps = [
  {
    n: '01',
    title: 'Install in one command.',
    body: 'A single curl provisions the AIOStack agent across your nodes via Helm. No SDK to import, no proxy in front of your model, no sidecar. Your applications will never know we are there.',
    sigs: ['curl', 'helm', 'daemonset', 'in-vpc'],
  },
  {
    n: '02',
    title: 'eBPF observes from below.',
    body: 'Probes attached to socket and syscall paths capture every flow, every identity context, every payload boundary. Including agents and models nobody told security about — shadow AI surfaces the moment it runs.',
    sigs: ['sock_ops', 'kprobe', 'tc', 'uprobe'],
  },
  {
    n: '03',
    title: 'Cloud APIs draw the rest.',
    body: 'Read-only IAM, CloudTrail, Bedrock, and metadata APIs map ServiceAccounts → roles → policies → resources. The full identity graph behind every AI agent, generated automatically.',
    sigs: ['iam', 'cloudtrail', 'bedrock', 'k8s api'],
  },
  {
    n: '04',
    title: 'AI reasons over the trace.',
    body: 'An LLM-backed analyzer baselines every identity, narrates every drift, and explains every alert in plain language with linked evidence — so triage stops being archaeology.',
    sigs: ['baseline', 'narrate', 'explain', 'rank'],
  },
]

const sources = [
  { x: 40,  w: 200, label: 'K8S API',         sub: 'pods · sa · svc',          accent: false },
  { x: 260, w: 200, label: 'CLOUDTRAIL',       sub: 'iam · audit',              accent: false },
  { x: 480, w: 200, label: 'eBPF · syscall',   sub: 'sock_ops · kprobe',        accent: false },
  { x: 700, w: 240, label: 'eBPF · NET FSM',   sub: 'pg · mysql · http · grpc', accent: true  },
  { x: 960, w: 200, label: 'BEDROCK / VERTEX', sub: 'model invoke',             accent: false },
]

const stages = [
  { x: 70,  label: 'INSTALL',   title: 'curl · helm',    sub: 'daemonset · 1 cmd' },
  { x: 360, label: 'OBSERVE',   title: 'eBPF + FSM',     sub: 'flows · queries · payloads' },
  { x: 650, label: 'CORRELATE', title: 'identity graph', sub: 'sa → role → resource' },
  { x: 940, label: 'REASON',    title: 'AI analyzer',    sub: 'baseline · narrate · rank' },
]

const outputs = [
  { x: 70,  t: 'LIVE INVENTORY',  s: 'apps · models · ids · ds' },
  { x: 360, t: 'DATA-FLOW MAP',   s: 'who reads what · pii' },
  { x: 650, t: 'RIGHT-SIZED IAM', s: 'granted vs. used' },
  { x: 940, t: 'NARRATED ALERTS', s: 'plain language · evidence' },
]
</script>

<template>
  <section id="how" class="v4-section v4-bordered">
    <div class="v4-container">
      <div class="v4-section-head">
        <h2 class="v4-h2">How it works.</h2>
        <p class="v4-section-lead">
          One install, four signal sources, zero application changes. The agent observes from below; cloud APIs enrich from above; the runtime trace is what you see.
        </p>
      </div>

      <!-- Pipeline diagram -->
      <div class="v4-pipeline">
        <div class="v4-pipeline-chrome">
          <span class="v4-mono v4-mono-dim">FIG.&nbsp;02</span>
          <span class="v4-mono v4-mono-dim">signal pipeline · 5 sources → ai reasoning</span>
          <span class="v4-mono v4-mono-dim">live · 0 dropped events</span>
        </div>
        <svg viewBox="0 0 1200 380" class="v4-pipeline-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="v4p-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="0.5"/>
            </pattern>
            <marker id="v4p-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.6)"/>
            </marker>
            <marker id="v4p-arr-acc" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L7 4L0 8z" fill="rgba(170,220,138,.8)"/>
            </marker>
          </defs>
          <rect width="1200" height="380" fill="url(#v4p-grid)"/>

          <!-- Source band -->
          <text x="40" y="32" class="v4-svg-label">SOURCE · YOUR INFRA</text>
          <text x="1160" y="32" text-anchor="end" class="v4-svg-label-dim">FIVE FEEDS · ALL READ-ONLY</text>
          <line x1="40" y1="42" x2="1160" y2="42" stroke="rgba(255,255,255,.22)"/>

          <g v-for="(s,i) in sources" :key="i">
            <rect :x="s.x" y="56" :width="s.w" height="36" fill="rgba(0,0,0,.4)" :stroke="s.accent ? 'rgba(170,220,138,.7)' : 'rgba(255,255,255,.35)'" stroke-width="0.8"/>
            <text :x="s.x+8" y="72" class="v4-svg-mark" :style="{fill: s.accent ? 'rgba(170,220,138,.95)' : undefined}">{{ s.label }}</text>
            <text :x="s.x+8" y="86" class="v4-svg-sub">{{ s.sub }}</text>
            <line :x1="s.x+s.w/2" y1="92" :x2="s.x+s.w/2" y2="140" :stroke="s.accent ? 'rgba(170,220,138,.7)' : 'rgba(255,255,255,.3)'" stroke-dasharray="2 3"/>
          </g>

          <!-- Merge bus -->
          <line x1="40" y1="140" x2="1160" y2="140" stroke="rgba(255,255,255,.4)"/>
          <text x="1160" y="132" text-anchor="end" class="v4-svg-label-dim">MERGED EVENT BUS</text>

          <!-- Stage band -->
          <g v-for="(s,i) in stages" :key="i">
            <line :x1="s.x+95" y1="140" :x2="s.x+95" y2="186" stroke="rgba(255,255,255,.45)" marker-end="url(#v4p-arr)"/>
            <path :d="`M ${s.x} 198 L ${s.x} 186 L ${s.x+12} 186`" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"/>
            <path :d="`M ${s.x+178} 186 L ${s.x+190} 186 L ${s.x+190} 198`" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"/>
            <path :d="`M ${s.x} 248 L ${s.x} 260 L ${s.x+12} 260`" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"/>
            <path :d="`M ${s.x+178} 260 L ${s.x+190} 260 L ${s.x+190} 248`" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"/>
            <rect :x="s.x" y="186" width="190" height="74" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.08)" stroke-width="0.5"/>
            <text :x="s.x+12" y="206" class="v4-svg-mark">0{{ i+1 }} · {{ s.label }}</text>
            <text :x="s.x+12" y="228" class="v4-svg-title" :style="{fontSize:13}">{{ s.title }}</text>
            <text :x="s.x+12" y="244" class="v4-svg-sub">{{ s.sub }}</text>
            <line v-if="i<3" :x1="s.x+196" y1="222" :x2="s.x+284" y2="222" stroke="rgba(255,255,255,.55)" marker-end="url(#v4p-arr)"/>
            <line :x1="s.x+95" y1="260" :x2="s.x+95" y2="306" stroke="rgba(170,220,138,.5)" stroke-dasharray="2 3"/>
          </g>

          <!-- Output band -->
          <line x1="40" y1="306" x2="1160" y2="306" stroke="rgba(255,255,255,.4)"/>
          <g v-for="(o,i) in outputs" :key="i">
            <rect :x="o.x" y="320" width="190" height="36" fill="rgba(0,0,0,.4)" stroke="rgba(170,220,138,.55)"/>
            <text :x="o.x+12" y="336" class="v4-svg-mark" :style="{fill:'rgba(170,220,138,.95)'}">{{ o.t }}</text>
            <text :x="o.x+12" y="350" class="v4-svg-sub">{{ o.s }}</text>
          </g>

          <text x="40" y="372" class="v4-svg-coord">0,0</text>
          <text x="1160" y="372" text-anchor="end" class="v4-svg-coord">1200·380 / LIVE · 0 EVENTS DROPPED</text>
        </svg>
      </div>

      <!-- Steps grid -->
      <div class="v4-how-grid">
        <div v-for="(s,i) in steps" :key="i" class="v4-how">
          <div class="v4-how-head">
            <span class="v4-section-num">{{ s.n }}</span>
            <span class="v4-rule-thin"/>
          </div>
          <h3 class="v4-h3">{{ s.title }}</h3>
          <p class="v4-body">{{ s.body }}</p>
          <div class="v4-sig-row">
            <span v-for="(g,k) in s.sigs" :key="k" class="v4-sig">{{ g }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
