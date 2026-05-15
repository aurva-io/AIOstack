<script setup lang="ts">
const copyLabel = ref('COPY')
const installCmd = 'curl -fsSL https://aurva.ai/install.sh | bash'

function handleCopy() {
  navigator.clipboard?.writeText(installCmd)
  copyLabel.value = 'COPIED'
  setTimeout(() => { copyLabel.value = 'COPY' }, 1200)
}

type Tone = 'white' | 'dim' | 'accent' | 'alert'
interface NodeProps { x: number; y: number; w: number; h: number; title: string; sub: string; mark: string; tone?: Tone }

const strokeMap: Record<Tone, string> = {
  white: 'rgba(255,255,255,.55)',
  dim: 'rgba(255,255,255,.22)',
  accent: 'rgba(64,203,81,.7)',
  alert: 'rgba(225,118,90,.65)',
}
const fgMap: Record<Tone, string> = {
  white: 'rgba(255,255,255,.95)',
  dim: 'rgba(255,255,255,.55)',
  accent: 'rgba(170,220,138,.95)',
  alert: 'rgba(245,170,135,.95)',
}

const nodes: NodeProps[] = [
  { x: 70, y: 60, w: 130, h: 56, title: 'pii-analyzer', sub: 'bedrock · agent', mark: 'A1', tone: 'white' },
  { x: 235, y: 60, w: 130, h: 56, title: 'doc-classifier', sub: 'langchain · agent', mark: 'A2', tone: 'white' },
  { x: 400, y: 60, w: 130, h: 56, title: 'aurva-ocr', sub: 'onnx · service', mark: 'S1', tone: 'dim' },
  { x: 70, y: 220, w: 170, h: 56, title: 'dataplane-sa', sub: 'kube · serviceaccount', mark: 'ID·1', tone: 'accent' },
  { x: 275, y: 220, w: 170, h: 56, title: 'iam: pii-analyzer', sub: 'aws · role · 12 perms', mark: 'ID·2', tone: 'white' },
  { x: 480, y: 220, w: 70, h: 56, title: 'okta-svc', sub: 'federated', mark: 'ID·3', tone: 'dim' },
  { x: 50, y: 380, w: 130, h: 56, title: 'bedrock.invoke', sub: 'claude-3-haiku', mark: 'EP·1', tone: 'white' },
  { x: 195, y: 380, w: 130, h: 56, title: 'openai/embed', sub: 'external', mark: 'EP·2', tone: 'alert' },
  { x: 340, y: 380, w: 100, h: 56, title: 'rds: docs', sub: 'postgres · pii', mark: 'DS·1', tone: 'white' },
  { x: 455, y: 380, w: 95, h: 56, title: 's3: pii/*', sub: 'bucket · obj', mark: 'DS·2', tone: 'white' },
]

const layers = [
  { y: 60, label: 'L4 · APPLICATION', tag: 'k8s' },
  { y: 220, label: 'L3 · IDENTITY', tag: 'iam' },
  { y: 380, label: 'L2 · DATA', tag: 'rds·s3·vec' },
  { y: 540, label: 'L1 · KERNEL · eBPF', tag: 'syscall' },
]

const ebpfTags = ['sock_ops', 'kprobe', 'tc', 'uprobe', 'FSM']
</script>

<template>
  <section class="v4-section v4-hero">
    <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
    <div class="v4-rule v4-rule-h" :style="{ bottom: 0 }" />
    <div class="v4-coordinates" />
    <div class="v4-container">
      <div class="v4-hero-grid">
        <!-- LEFT — copy column -->
        <div class="v4-col">
          <h1 class="v4-display">
            <span style="white-space:nowrap">AI threats move fast.</span><br>
            <span class="v4-em">This is your unfair advantage.</span>
          </h1>

          <p class="v4-lead">
            AIOStack helps secure the AI agents, models, and services running in your environment - including the ones nobody
            told you about. It reads your kernel and your cloud, maps every app, identity, endpoint, and datasource, and
            watches what each one actually does. <u>Zero code changes</u>. Your applications will not even know we
            exist.
          </p>

          <div class="v4-install">
            <div class="v4-install-head">
              <span class="v4-mono v4-mono-dim">$ install · 1 cmd</span>
              <button class="v4-install-copy" type="button" @click="handleCopy">
                {{ copyLabel }}
              </button>
            </div>
            <code class="v4-install-cmd">{{ installCmd }}</code>
          </div>

          <div class="v4-cta-row">
            <NuxtLink class="v4-btn v4-btn-primary" to="/docs/getting-started/introduction">
              Install <span class="v4-mono">·</span> 10&nbsp;min
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
            <a class="v4-btn v4-btn-ghost" href="#how">
              <span class="v4-mono">↓</span> How it works
            </a>
          </div>

          <div class="v4-ledger">
            <div>
              <span class="v4-ledger-key">discovers</span>
              <span class="v4-ledger-val">shadow AI · agents · models · endpoints</span>
            </div>
            <div>
              <span class="v4-ledger-key">secures</span>
              <span class="v4-ledger-val">identity · data flow · egress · prompts</span>
            </div>
            <div>
              <span class="v4-ledger-key">install</span>
              <span class="v4-ledger-val">curl · helm · zero code changes</span>
            </div>
            <div>
              <span class="v4-ledger-key">deploy</span>
              <span class="v4-ledger-val">in-VPC · read-only · data never leaves</span>
            </div>
          </div>
        </div>

        <!-- RIGHT — schematic -->
        <div class="v4-schematic-wrap">
          <div class="v4-schematic-chrome">
            <span class="v4-mono v4-mono-dim">FIG.&nbsp;01</span>
            <span class="v4-mono v4-mono-dim">aiostack · runtime map</span>
            <span class="v4-mono v4-mono-dim">cluster: aurva-prod</span>
          </div>

          <svg viewBox="0 0 600 720" class="v4-schematic" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="v4-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="0.5" />
              </pattern>
              <marker id="v4-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.55)" />
              </marker>
              <marker id="v4-arrow-dim" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5"
                orient="auto">
                <path d="M0 0L7 4L0 8z" fill="rgba(255,255,255,.25)" />
              </marker>
            </defs>

            <rect width="600" height="720" fill="url(#v4-grid)" />

            <!-- Frame ticks -->
            <g v-for="i in 5" :key="i">
              <line :x1="120 * (i - 1)" y1="0" :x2="120 * (i - 1)" y2="6" stroke="rgba(255,255,255,.3)" />
              <line :x1="120 * (i - 1)" y1="714" :x2="120 * (i - 1)" y2="720" stroke="rgba(255,255,255,.3)" />
              <line x1="0" :y1="120 * (i - 1)" x2="6" :y2="120 * (i - 1)" stroke="rgba(255,255,255,.3)" />
              <line x1="594" :y1="120 * (i - 1)" x2="600" :y2="120 * (i - 1)" stroke="rgba(255,255,255,.3)" />
            </g>

            <!-- Layer bands -->
            <g v-for="b in layers" :key="b.label">
              <line x1="20" :y1="b.y - 22" x2="580" :y2="b.y - 22" stroke="rgba(255,255,255,.07)"
                stroke-dasharray="2 4" />
              <text x="24" :y="b.y - 28" class="v4-svg-label">{{ b.label }}</text>
              <text x="576" :y="b.y - 28" text-anchor="end" class="v4-svg-label-dim">{{ b.tag }}</text>
            </g>

            <!-- Nodes -->
            <g v-for="n in nodes" :key="n.mark">
              <path :d="`M ${n.x} ${n.y + 8} L ${n.x} ${n.y} L ${n.x + 8} ${n.y}`" fill="none"
                :stroke="strokeMap[n.tone || 'white']" stroke-width="1.2" />
              <path :d="`M ${n.x + n.w - 8} ${n.y} L ${n.x + n.w} ${n.y} L ${n.x + n.w} ${n.y + 8}`" fill="none"
                :stroke="strokeMap[n.tone || 'white']" stroke-width="1.2" />
              <path :d="`M ${n.x} ${n.y + n.h - 8} L ${n.x} ${n.y + n.h} L ${n.x + 8} ${n.y + n.h}`" fill="none"
                :stroke="strokeMap[n.tone || 'white']" stroke-width="1.2" />
              <path :d="`M ${n.x + n.w - 8} ${n.y + n.h} L ${n.x + n.w} ${n.y + n.h} L ${n.x + n.w} ${n.y + n.h - 8}`"
                fill="none" :stroke="strokeMap[n.tone || 'white']" stroke-width="1.2" />
              <rect :x="n.x" :y="n.y" :width="n.w" :height="n.h" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.08)"
                stroke-width="0.5" />
              <text :x="n.x + 10" :y="n.y + 18" class="v4-svg-mark"
                :style="{ fill: 'rgba(255,255,255,.45)' }">{{ n.mark }}</text>
              <text :x="n.x + 10" :y="n.y + 36" class="v4-svg-title"
                :style="{ fill: fgMap[n.tone || 'white'] }">{{ n.title }}</text>
              <text :x="n.x + 10" :y="n.y + 50" class="v4-svg-sub"
                :style="{ fill: 'rgba(255,255,255,.45)' }">{{ n.sub }}</text>
            </g>

            <!-- L1 — eBPF band -->
            <rect x="40" y="540" width="520" height="74" rx="2" fill="rgba(255,255,255,.02)"
              stroke="rgba(255,255,255,.18)" stroke-width="0.8" />
            <text x="56" y="562" class="v4-svg-mark">L1</text>
            <text x="56" y="580" class="v4-svg-title">aiostack-agent · DaemonSet</text>
            <text x="56" y="594" class="v4-svg-sub">eBPF probes · sock_ops · kprobe · tc · uprobe</text>
            <text x="56" y="608" class="v4-svg-tag-accent">+ network FSM · parses queries · maps sensitive data
              flow</text>
            <g v-for="(t, i) in ebpfTags" :key="t" :transform="`translate(${380 + i * 36}, 552)`">
              <rect x="0" y="0" width="32" height="26" fill="none"
                :stroke="t === 'FSM' ? 'rgba(170,220,138,.7)' : 'rgba(255,255,255,.16)'" />
              <text x="16" y="17" text-anchor="middle" class="v4-svg-tag"
                :style="{ fill: t === 'FSM' ? 'rgba(170,220,138,.95)' : undefined }">{{ t }}</text>
            </g>

            <!-- Connections: application -> identity -->
            <line x1="135" y1="116" x2="155" y2="220" stroke="rgba(255,255,255,.5)" stroke-width="0.9"
              marker-end="url(#v4-arrow)" />
            <line x1="300" y1="116" x2="210" y2="220" stroke="rgba(255,255,255,.5)" stroke-width="0.9"
              marker-end="url(#v4-arrow)" />
            <line x1="465" y1="116" x2="235" y2="220" stroke="rgba(255,255,255,.25)" stroke-width="0.7"
              marker-end="url(#v4-arrow-dim)" />

            <!-- Identity chain -->
            <line x1="240" y1="248" x2="275" y2="248" stroke="rgba(255,255,255,.55)" stroke-width="0.9"
              marker-end="url(#v4-arrow)" />
            <line x1="445" y1="248" x2="480" y2="248" stroke="rgba(255,255,255,.25)" stroke-width="0.7"
              marker-end="url(#v4-arrow-dim)" />

            <!-- Application -> endpoints -->
            <path d="M 135 116 L 135 360 L 125 380" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="0.9"
              marker-end="url(#v4-arrow)" />
            <path d="M 300 116 L 300 360 L 290 380" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="0.9"
              stroke-dasharray="3 3" marker-end="url(#v4-arrow)" />
            <path d="M 465 116 L 415 380" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="0.7"
              stroke-dasharray="3 3" marker-end="url(#v4-arrow-dim)" />
            <path d="M 465 116 L 510 380" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="0.7"
              marker-end="url(#v4-arrow-dim)" />

            <!-- eBPF observation arrows -->
            <g v-for="(x, i) in [100, 220, 360, 500]" :key="i">
              <line :x1="x" y1="540" :x2="x" y2="446" stroke="rgba(64,203,81,.55)" stroke-width="0.6"
                stroke-dasharray="2 3" />
              <circle :cx="x" cy="540" r="2" fill="rgba(64,203,81,.7)" />
              <text :x="x + 6" y="530" class="v4-svg-tag-accent">obs</text>
            </g>

            <!-- External call-out highlight -->
            <rect x="216" y="376" width="148" height="64" fill="none" stroke="rgba(225,118,90,.55)" stroke-width="0.8"
              stroke-dasharray="2 2" />
            <text x="290" y="460" text-anchor="middle" class="v4-svg-tag-alert">novel destination · 3 days ago</text>

            <!-- Coords -->
            <text x="580" y="702" text-anchor="end" class="v4-svg-coord">600·720 / RUNTIME · LIVE</text>
            <text x="20" y="702" class="v4-svg-coord">0,0</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
