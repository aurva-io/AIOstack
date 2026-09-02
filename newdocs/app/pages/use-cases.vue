<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const cases = [
  {
    mark: 'UC·01',
    industry: 'DISCOVERY',
    title: 'Find shadow AI at runtime',
    persona: 'AI discovery and governance',
    risk: 'Teams adopt models, SDKs, agents, and personal API keys faster than security inventories can track them.',
    defense: 'Aurva observes AI traffic from the runtime and maps every workload, model, provider, credential, and destination without application changes.',
    result: [
      'Inventory sanctioned and unsanctioned AI',
      'Attribute activity to workloads and identities',
      'Reroute or retire unapproved usage',
    ],
  },
  {
    mark: 'UC·02',
    industry: 'DATA PROTECTION',
    title: 'Stop sensitive data from leaving',
    persona: 'Data security and compliance',
    risk: 'Prompts, responses, and embeddings can carry regulated data to providers and destinations that security never approved.',
    defense: 'Aurva classifies sensitive content in motion, evaluates the destination and identity, then applies the right policy inline.',
    result: [
      'Detect PII, PHI, PCI data, and secrets',
      'Redact or block unsafe requests',
      'Preserve runtime evidence for every decision',
    ],
  },
  {
    mark: 'UC·03',
    industry: 'IDENTITY',
    title: 'Constrain agent access',
    persona: 'Identity and cloud security',
    risk: 'Agents often inherit broad roles, long-lived keys, and permissions that exceed what they actually use at runtime.',
    defense: 'Aurva connects each action to its workload and identity, compares access granted with access used, and detects permission drift continuously.',
    result: [
      'Identify excessive agent permissions',
      'Generate least-privilege policy guidance',
      'Revoke credentials when behavior becomes unsafe',
    ],
  },
  {
    mark: 'UC·04',
    industry: 'AGENT SECURITY',
    title: 'Trace agents, tools, and MCP',
    persona: 'Agent platform security',
    risk: 'Multi-step agents cross models, MCP servers, tools, vector stores, and external APIs without leaving one complete evidence trail.',
    defense: 'Aurva reconstructs the workflow from runtime activity and connects every model hop, tool invocation, identity, and downstream destination.',
    result: [
      'Trace complete agent execution paths',
      'Inventory MCP servers and connected tools',
      'Investigate incidents from one evidence chain',
    ],
  },
  {
    mark: 'UC·05',
    industry: 'COMPLIANCE',
    title: 'Prove AI access at runtime',
    persona: 'GRC and audit',
    risk: 'Configuration shows what an AI system was allowed to access. It does not prove what the system actually accessed or why.',
    defense: 'Aurva records sensitive data access with the complete identity chain, destination, policy decision, and timing needed for investigation and audit.',
    result: [
      'Generate evidence from observed behavior',
      'Query historical access by agent and identity',
      'Reduce manual audit preparation',
    ],
  },
  {
    mark: 'UC·06',
    industry: 'RESPONSE',
    title: 'Control novel AI egress',
    persona: 'Detection and response',
    risk: 'A workload can begin sending sensitive data to a new model provider or external endpoint before volume-based controls react.',
    defense: 'Aurva baselines expected destinations, identifies first-time egress, and attaches the originating agent, identity, and data class to the finding.',
    result: [
      'Detect new destinations on the first request',
      'Block or reroute unsafe traffic inline',
      'Give responders the context to act quickly',
    ],
  },
]
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />

    <div class="v4-frame">

      <!-- ── HERO ── -->
      <section class="v4-section v4-uc-hero">
        <div class="v4-container">
          <span class="v4-section-num">AURVA · USE CASES</span>
          <h1 class="v4-display" style="margin-top:16px">
            Secure every AI system.<br>
            <span class="v4-uc-title-shift">From the runtime up.</span>
          </h1>
          <p class="v4-lead" style="margin-top:28px;max-width:640px">
            Discover sanctioned and shadow AI, trace every agent, identity, and data flow, and enforce
            policy across models, tools, and providers without changing application code.
          </p>
        </div>
      </section>

      <!-- ── CASES ── -->
      <section class="v4-section v4-bordered v4-uc-list">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-uc-grid">
            <article v-for="c in cases" :key="c.mark" class="v4-uc-card">
              <!-- corner brackets -->
              <svg class="v4-uc-corners" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 14 L0 0 L14 0" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" />
                <path d="M86 0 L100 0 L100 14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" />
                <path d="M0 86 L0 100 L14 100" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" />
                <path d="M86 100 L100 100 L100 86" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" />
              </svg>

              <header class="v4-uc-head">
                <span class="v4-uc-mark">{{ c.mark }}</span>
                <span class="v4-uc-industry">{{ c.industry }}</span>
              </header>

              <h2 class="v4-uc-title">{{ c.title }}</h2>
              <p class="v4-uc-persona">{{ c.persona }}</p>

              <div class="v4-uc-row">
                <span class="v4-uc-row-label">risk</span>
                <p class="v4-uc-row-body">{{ c.risk }}</p>
              </div>

              <div class="v4-uc-row">
                <span class="v4-uc-row-label">aurva</span>
                <p class="v4-uc-row-body">{{ c.defense }}</p>
              </div>

              <div class="v4-uc-outcome">
                <span class="v4-uc-outcome-label">result</span>
                <ul class="v4-uc-outcome-list">
                  <li v-for="o in c.result" :key="o">{{ o }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <LandingFinalCTA
        :title-lines="['See every AI system.', 'Control every action.']"
        copy="Deploy in your environment and build a live inventory of agents, models, identities, data flows, and destinations. Zero friction. Zero code changes."
        primary-label="Install in 10 mins"
        primary-to="/docs/getting-started/introduction"
        secondary-label="Contact sales"
        secondary-href="/contact/sales"
      />

    </div>

    <LandingFooter />
  </div>
</template>

<style scoped>
/* ── Hero ── */
.v4-uc-hero {
  padding: 80px 0 64px;
}

.v4-uc-title-shift {
  color: rgba(255, 255, 255, .42);
}

/* ── Case grid ── */
.v4-uc-list { padding: 64px 0; }

.v4-uc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.v4-uc-card {
  position: relative;
  padding: 32px 30px;
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.015);
  transition: border-color 0.2s, background 0.2s;
}

.v4-uc-card:hover {
  border-color: rgba(255,255,255,.16);
  background: rgba(255,255,255,.03);
}

.v4-uc-corners {
  position: absolute;
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}
.v4-uc-card:hover .v4-uc-corners { opacity: 1; }

.v4-uc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.v4-uc-mark { color: rgba(255,255,255,.45); }
.v4-uc-industry { color: rgba(170,220,138,.7); }

.v4-uc-title {
  font-family: var(--v4-sans);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -.01em;
  color: rgba(255,255,255,.92);
  margin: 0 0 6px;
}

.v4-uc-persona {
  font-family: var(--v4-mono);
  font-size: 11px;
  color: rgba(255,255,255,.4);
  letter-spacing: .04em;
  margin: 0 0 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.v4-uc-row { margin-bottom: 18px; }

.v4-uc-row-label,
.v4-uc-outcome-label {
  display: block;
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.32);
  margin-bottom: 6px;
}

.v4-uc-row-body {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,.7);
  margin: 0;
}

.v4-uc-outcome {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.06);
}

.v4-uc-outcome-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.v4-uc-outcome-list li {
  font-size: 13.5px;
  line-height: 1.5;
  color: rgba(255,255,255,.78);
  padding-left: 16px;
  position: relative;
}

.v4-uc-outcome-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  font-family: var(--v4-mono);
  color: rgba(170,220,138,.7);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .v4-uc-grid { grid-template-columns: 1fr; }
}
</style>
