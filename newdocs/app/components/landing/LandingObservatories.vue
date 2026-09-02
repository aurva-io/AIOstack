<script setup lang="ts">
const observatories = [
  {
    key: 'systems',
    layer: 'L4 · APPLICATION',
    title: 'Agents and Models',
    metric: '12 MODELS · 4 PROVIDERS',
    description: 'Every workload, agent, model, and provider currently active in your environment.',
    signals: [
      { name: 'support-agent', detail: 'bedrock · anthropic', status: 'normal' },
      { name: 'doc-classifier', detail: 'vertex ai · gemini', status: 'normal' },
      { name: 'shadow-copilot', detail: 'openai · personal key', status: 'alert' },
    ],
  },
  {
    key: 'identities',
    layer: 'L3 · IDENTITY',
    title: 'Runtime Identities',
    metric: '47 IDENTITIES · 3 DRIFT',
    description: 'The complete chain from workload to service account, cloud role, and resource.',
    signals: [
      { name: 'support-agent-sa', detail: '12 permissions · 3 used', status: 'normal' },
      { name: 'iam:doc-classifier', detail: '1 new permission · 24h', status: 'alert' },
      { name: 'okta:ai-ops', detail: 'federated · sanctioned', status: 'normal' },
    ],
  },
  {
    key: 'endpoints',
    layer: 'L2 · NETWORK / EGRESS',
    title: 'Endpoints and Providers',
    metric: '147 ENDPOINTS · 8 NEW',
    description: 'Every internal and external destination, including first-seen and unsanctioned routes.',
    signals: [
      { name: 'api.anthropic.com', detail: 'external · sanctioned', status: 'normal' },
      { name: '91.214.77.18:443', detail: 'novel destination · 3d', status: 'alert' },
      { name: 'api.fireworks.ai', detail: 'internal · sanctioned', status: 'normal' },
    ],
  },
  {
    key: 'data',
    layer: 'L1 · DATA',
    title: 'Data Sources',
    metric: '38 SOURCES · 11 SENSITIVE',
    description: 'Queries, objects, vectors, and sensitive fields traced back to the calling identity.',
    signals: [
      { name: 'rds:customers', detail: 'postgres · pii', status: 'alert' },
      { name: 's3://support-uploads/*', detail: 'object · sensitive', status: 'alert' },
      { name: 'vector:customer-context', detail: 'embeddings · sanctioned', status: 'normal' },
    ],
  },
]
</script>

<template>
  <section class="v4-section v4-bordered v4-observatories">
    <div class="v4-container">
      <div class="v4-observatories-head">
        <h2 class="v4-h2">
          Four observatories.<br>
          One runtime truth.
        </h2>
        <p class="v4-section-lead">
          Aurva brings agents and models, runtime identities, endpoints and providers, and data sources
          into one connected evidence graph. See what is running, who is acting, what data it touches,
          and where it goes, directly from the runtime.
          <span class="v4-obs-invisible">Your applications never know Aurva is there.</span>
        </p>
      </div>

      <div class="v4-evidence-frame">
        <div class="v4-evidence-stage">
          <svg class="v4-evidence-connections" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="evidence-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stop-color="rgba(255,255,255,.07)" />
                <stop offset="1" stop-color="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="600" cy="350" r="230" fill="url(#evidence-glow)" />
            <circle cx="600" cy="350" r="118" fill="none" stroke="rgba(255,255,255,.06)" />
            <circle cx="600" cy="350" r="152" fill="none" stroke="rgba(255,255,255,.035)" stroke-dasharray="3 10" />
            <path class="v4-evidence-path" d="M600 350C540 300 500 242 420 208" />
            <path class="v4-evidence-path" d="M600 350C660 300 700 242 780 208" />
            <path class="v4-evidence-path" d="M600 350C540 400 500 458 420 492" />
            <path class="v4-evidence-path v4-evidence-path-alert" d="M600 350C660 400 700 458 780 492" />
            <g fill="rgba(255,255,255,.72)">
              <circle cx="420" cy="208" r="3" />
              <circle cx="780" cy="208" r="3" />
              <circle cx="420" cy="492" r="3" />
            </g>
            <g class="v4-evidence-alert-glyph" transform="translate(772 484)">
              <path d="M8 0 16 15H0Z" />
              <path d="M8 5v5M8 12.5v.5" />
            </g>
          </svg>

          <article
            v-for="observatory in observatories"
            :key="observatory.key"
            class="v4-evidence-card"
            :class="`v4-evidence-card--${observatory.key}`"
          >
            <header class="v4-evidence-card-head">
              <span>{{ observatory.layer }}</span>
              <span>{{ observatory.metric }}</span>
            </header>
            <div class="v4-evidence-card-copy">
              <h3>{{ observatory.title }}</h3>
              <p>{{ observatory.description }}</p>
            </div>
            <div class="v4-evidence-signals">
              <div
                v-for="signal in observatory.signals"
                :key="signal.name"
                class="v4-evidence-signal"
                :class="{ 'v4-evidence-signal--alert': signal.status === 'alert' }"
              >
                <span class="v4-evidence-signal-icon" aria-hidden="true">
                  <svg v-if="signal.status === 'alert'" viewBox="0 0 16 16">
                    <path d="M8 1 15 14H1Z" />
                    <path d="M8 5v4.5M8 12v.5" />
                  </svg>
                  <i v-else />
                </span>
                <span>{{ signal.name }}</span>
                <small>{{ signal.detail }}</small>
              </div>
            </div>
          </article>

          <div class="v4-evidence-core">
            <div class="v4-evidence-core-ring" aria-hidden="true" />
            <span>AURVA SECURITY</span>
            <strong>Unified AI Security</strong>
            <small>RUNTIME + INLINE CONTROL</small>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.v4-observatories-head {
  display: grid;
  grid-template-columns: minmax(0, .8fr) minmax(440px, 1.2fr);
  align-items: end;
  gap: 72px;
  margin-bottom: 56px;
}

.v4-observatories-head .v4-section-lead {
  max-width: 720px;
  margin: 0;
}

@media (max-width: 900px) {
  .v4-observatories-head {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .v4-observatories-head .v4-section-lead {
    max-width: 720px;
  }
}
</style>
