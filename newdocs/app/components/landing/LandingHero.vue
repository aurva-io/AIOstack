<script setup lang="ts">
const copyLabel = ref('COPY')
const installCmd = 'curl -fsSL https://aurva.ai/install.sh | bash'

function handleCopy() {
  navigator.clipboard?.writeText(installCmd)
  copyLabel.value = 'COPIED'
  setTimeout(() => { copyLabel.value = 'COPY' }, 1200)
}
</script>

<template>
  <section class="v4-section v4-hero">
    <div class="v4-rule v4-rule-h" :style="{ bottom: 0 }" />
    <div class="v4-container">
      <div class="v4-hero-grid">
        <!-- LEFT — copy column -->
        <div class="v4-col">
          <h1 class="v4-display v4-display-control">
            <span>The defense layer</span><br>
            <span>for enterprise AI.</span>
          </h1>

          <p class="v4-lead">
            Aurva discovers sanctioned and shadow AI from the runtime, traces every agent, model, identity, and data flow,
            detects threats with AI-powered analysis, and enforces policy by routing, redacting, blocking, or revoking
            access before risk becomes impact.
          </p>

          <div class="v4-install">
            <code class="v4-install-cmd">{{ installCmd }}</code>
            <button class="v4-install-copy" type="button" @click="handleCopy">
              {{ copyLabel }}
            </button>
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

        </div>

        <!-- RIGHT — schematic -->
        <div class="v4-schematic-wrap">
          <svg viewBox="0 0 600 720" class="v4-schematic" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="v4-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="0.5" />
              </pattern>
              <linearGradient id="v4-defense-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="rgba(255,255,255,.025)" />
                <stop offset="1" stop-color="rgba(255,255,255,.005)" />
              </linearGradient>
            </defs>

            <rect width="600" height="720" fill="url(#v4-grid)" />

            <!-- L4 · applications -->
            <text x="40" y="30" class="v4-svg-label">L4 · APPLICATION</text>
            <text x="560" y="30" text-anchor="end" class="v4-svg-label-dim">AGENTS · MODELS · SERVICES</text>
            <line x1="40" y1="42" x2="560" y2="42" stroke="rgba(255,255,255,.18)" />

            <g>
              <rect x="40" y="58" width="160" height="74" fill="rgba(0,0,0,.42)" stroke="rgba(255,255,255,.28)" />
              <circle cx="56" cy="76" r="3" fill="rgba(255,255,255,.55)" />
              <text x="68" y="79" class="v4-svg-mark">AI·01 · APPROVED</text>
              <text x="56" y="103" class="v4-svg-title">support-agent</text>
              <text x="56" y="120" class="v4-svg-sub">bedrock · customer data</text>

              <rect x="220" y="58" width="160" height="74" fill="rgba(0,0,0,.42)" stroke="rgba(255,255,255,.38)" stroke-dasharray="3 3" />
              <circle cx="236" cy="76" r="3" fill="rgba(225,118,90,.85)" />
              <text x="248" y="79" class="v4-svg-mark">AI·02 · SHADOW</text>
              <text x="236" y="103" class="v4-svg-title">unknown-client</text>
              <text x="236" y="120" class="v4-svg-sub">openai · personal key</text>

              <rect x="400" y="58" width="160" height="74" fill="rgba(0,0,0,.42)" stroke="rgba(255,255,255,.28)" />
              <circle cx="416" cy="76" r="3" fill="rgba(255,255,255,.55)" />
              <text x="428" y="79" class="v4-svg-mark">AI·03 · ACTIVE</text>
              <text x="416" y="103" class="v4-svg-title">mcp-runner</text>
              <text x="416" y="120" class="v4-svg-sub">8 tools · 3 stores</text>
            </g>

            <!-- L3 · identities -->
            <text x="40" y="160" class="v4-svg-label">L3 · IDENTITY</text>
            <text x="560" y="160" text-anchor="end" class="v4-svg-label-dim">K8S · IAM · NHI</text>
            <line x1="40" y1="172" x2="560" y2="172" stroke="rgba(255,255,255,.1)" stroke-dasharray="2 4" />
            <line x1="120" y1="132" x2="120" y2="206" stroke="rgba(255,255,255,.34)" />
            <line x1="300" y1="132" x2="300" y2="206" stroke="rgba(255,255,255,.42)" stroke-dasharray="4 4" />
            <line x1="480" y1="132" x2="480" y2="206" stroke="rgba(255,255,255,.34)" />
            <circle cx="120" cy="206" r="2" fill="rgba(255,255,255,.55)" />
            <circle cx="300" cy="206" r="2" fill="rgba(255,255,255,.7)" />
            <circle cx="480" cy="206" r="2" fill="rgba(255,255,255,.55)" />
            <text x="120" y="193" text-anchor="middle" class="v4-svg-sub">support-sa</text>
            <text x="300" y="193" text-anchor="middle" class="v4-svg-sub">unattributed</text>
            <text x="480" y="193" text-anchor="middle" class="v4-svg-sub">mcp-runner-sa</text>

            <!-- Aurva defense layer -->
            <rect x="40" y="206" width="520" height="216" fill="url(#v4-defense-fill)" stroke="rgba(255,255,255,.28)" />
            <path d="M40 222V206H56 M544 206H560V222 M40 406V422H56 M544 422H560V406" fill="none"
              stroke="rgba(255,255,255,.62)" stroke-width="1.2" />
            <text x="60" y="234" class="v4-svg-label">AURVA · DEFENSE LAYER</text>
            <text x="540" y="234" text-anchor="end" class="v4-svg-label-dim">RUNTIME · POLICY · ACTION</text>

            <g>
              <rect x="60" y="256" width="140" height="86" fill="rgba(0,0,0,.34)" stroke="rgba(255,255,255,.22)" />
              <text x="74" y="278" class="v4-svg-mark">01 · OBSERVE</text>
              <text x="74" y="301" class="v4-svg-heading">Runtime truth</text>
              <text x="74" y="320" class="v4-svg-sub">eBPF · cloud</text>

              <rect x="230" y="256" width="140" height="86" fill="rgba(0,0,0,.34)" stroke="rgba(255,255,255,.22)" />
              <text x="244" y="278" class="v4-svg-mark">02 · REASON</text>
              <text x="244" y="301" class="v4-svg-heading">Threat analysis</text>
              <text x="244" y="320" class="v4-svg-sub">behavior · policy</text>

              <rect x="400" y="256" width="140" height="86" fill="rgba(0,0,0,.34)" stroke="rgba(255,255,255,.3)" />
              <text x="414" y="278" class="v4-svg-mark">03 · ENFORCE</text>
              <text x="414" y="301" class="v4-svg-heading">Inline control</text>
              <text x="414" y="320" class="v4-svg-sub">route · redact</text>
            </g>

            <line x1="200" y1="299" x2="230" y2="299" stroke="rgba(255,255,255,.34)" />
            <line x1="370" y1="299" x2="400" y2="299" stroke="rgba(255,255,255,.34)" />
            <circle cx="215" cy="299" r="2" fill="rgba(255,255,255,.5)" />
            <circle cx="385" cy="299" r="2" fill="rgba(255,255,255,.5)" />

            <rect x="60" y="366" width="480" height="34" fill="rgba(255,255,255,.01)" stroke="rgba(255,255,255,.24)" />
            <circle cx="76" cy="383" r="3" fill="rgba(225,118,90,.85)" />
            <text x="88" y="387" class="v4-svg-tag">SHADOW AI · SENSITIVE EGRESS</text>
            <text x="524" y="387" text-anchor="end" class="v4-svg-tag">DECISION: BLOCK + REVOKE KEY</text>

            <!-- L2 · data and egress -->
            <text x="40" y="456" class="v4-svg-label">L2 · DATA / EGRESS</text>
            <text x="560" y="456" text-anchor="end" class="v4-svg-label-dim">RDS · S3 · VECTOR · LLM</text>
            <line x1="470" y1="342" x2="470" y2="442" stroke="rgba(255,255,255,.32)" />
            <circle cx="470" cy="442" r="2" fill="rgba(255,255,255,.6)" />
            <line x1="92" y1="470" x2="508" y2="470" stroke="rgba(255,255,255,.16)" />

            <g>
              <rect x="40" y="486" width="115" height="58" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.24)" />
              <text x="54" y="507" class="v4-svg-mark">A·01</text>
              <text x="54" y="528" class="v4-svg-heading">Route</text>

              <rect x="175" y="486" width="115" height="58" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.24)" />
              <text x="189" y="507" class="v4-svg-mark">A·02</text>
              <text x="189" y="528" class="v4-svg-heading">Redact</text>

              <rect x="310" y="486" width="115" height="58" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.48)" />
              <text x="324" y="507" class="v4-svg-mark">A·03 · ACTIVE</text>
              <text x="324" y="528" class="v4-svg-heading">Block</text>

              <rect x="445" y="486" width="115" height="58" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.24)" />
              <text x="459" y="507" class="v4-svg-mark">A·04</text>
              <text x="459" y="528" class="v4-svg-heading">Revoke</text>
            </g>

            <!-- L1 · kernel -->
            <text x="40" y="574" class="v4-svg-label">L1 · KERNEL · eBPF</text>
            <text x="560" y="574" text-anchor="end" class="v4-svg-label-dim">SYSCALL · TLS · NETWORK</text>
            <rect x="40" y="590" width="520" height="82" fill="rgba(255,255,255,.012)" stroke="rgba(255,255,255,.26)" />
            <text x="58" y="616" class="v4-svg-mark">KERNEL TRUTH · ALWAYS ON</text>
            <text x="58" y="640" class="v4-svg-heading">eBPF runtime sensor</text>
            <text x="58" y="658" class="v4-svg-sub">zero code changes · sees sanctioned + shadow traffic</text>
            <g transform="translate(394 612)">
              <rect x="0" y="0" width="34" height="28" fill="none" stroke="rgba(255,255,255,.18)" />
              <rect x="40" y="0" width="34" height="28" fill="none" stroke="rgba(255,255,255,.18)" />
              <rect x="80" y="0" width="34" height="28" fill="none" stroke="rgba(255,255,255,.28)" />
              <rect x="120" y="0" width="34" height="28" fill="none" stroke="rgba(255,255,255,.42)" />
              <text x="17" y="18" text-anchor="middle" class="v4-svg-tag">SOCK</text>
              <text x="57" y="18" text-anchor="middle" class="v4-svg-tag">TC</text>
              <text x="97" y="18" text-anchor="middle" class="v4-svg-tag">TLS</text>
              <text x="137" y="18" text-anchor="middle" class="v4-svg-tag">FSM</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
