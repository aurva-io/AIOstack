<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const stripCols = [
  { label: 'COVERAGE',  val: 'AGENTS · MODELS · MCP · VEC'    },
  { label: 'OBSERVE',   val: 'EBPF · KERNEL · ZERO-CODE'      },
  { label: 'IDENTITY',  val: 'IAM · NHI · IRSA · WI'          },
  { label: 'DATA',      val: 'PII · PHI · PCI · SECRETS'      },
  { label: 'EGRESS',    val: 'LLM APIS · VECTOR STORES'       },
  { label: 'POSTURE',   val: 'LEAST-PRIV · DRIFT · DLP'       },
]

const cases = [
  {
    mark: 'UC·01',
    industry: 'FINTECH · 800 ENG',
    title: 'Shadow AI in production',
    persona: 'CISO · public fintech',
    problem: 'Six product teams shipped LLM features in a quarter — three never went through security review. Nobody had a list of every model, key, and downstream endpoint actually in use.',
    approach: 'AIOStack discovered 41 distinct LLM-calling workloads from kernel traffic alone — including a customer-support summarizer routing transcripts to a personal OpenAI key, and an Anthropic call buried inside a vendor SDK.',
    outcome: [
      '41 AI workloads inventoried in 36 hours',
      '3 unsanctioned providers retired the same week',
      '0 code changes, 0 developer interrupts',
    ],
  },
  {
    mark: 'UC·02',
    industry: 'HEALTHTECH · HIPAA',
    title: 'PHI leaving the environment',
    persona: 'Head of Platform Security',
    problem: 'A clinical-notes agent embedded patient records against a vector store. Embeddings were going to a third-party provider with no BAA in place. No one knew until a compliance audit.',
    approach: 'AIOStack parses embedding-API protocols at the kernel, classifies request bodies as PHI in real-time, and flags any sensitive payload heading to an unapproved destination.',
    outcome: [
      'PHI-touching agents reduced 31 → 4',
      'Vendor BAA tracking automated from runtime evidence',
      'Audit closed with runtime trace, not just config',
    ],
  },
  {
    mark: 'UC·03',
    industry: 'D2C · ASIA',
    title: 'Agent permissions exploded',
    persona: 'Cloud Security Architect',
    problem: 'A support agent had been given a broad IAM role months ago "just to ship". By the time anyone looked, that role had 48 permissions, and the agent was using 6.',
    approach: 'AIOStack maps every permission granted against every permission actually exercised at runtime. Over-provisioned roles surface automatically with proposed least-privilege scopes.',
    outcome: [
      '42 unused permissions removed across 8 NHIs',
      '6 of 8 service accounts now meet least-privilege',
      'Drift detection runs continuously, not yearly',
    ],
  },
  {
    mark: 'UC·04',
    industry: 'AI INFRA · US',
    title: 'MCP & tool-use opacity',
    persona: 'Engineering Manager · agent platform',
    problem: 'Multi-step agents chained MCP tools, vector lookups, and external APIs in ways nobody could reproduce post-incident. Logs from each tool existed; the workflow did not.',
    approach: 'AIOStack reconstructs full agent workflows at the kernel layer — every MCP invocation, tool call, model hop, and downstream egress is stitched into a single evidence chain.',
    outcome: [
      'Mean incident time-to-cause: 3d → 22m',
      'Replay of every multi-step agent workflow',
      'MCP server inventory generated automatically',
    ],
  },
  {
    mark: 'UC·05',
    industry: 'FINANCIAL SERVICES',
    title: 'SOC 2 evidence, on demand',
    persona: 'GRC Lead',
    problem: 'Auditors wanted proof that AI access to customer financial records was authorized and appropriate. Existing controls produced policy docs, not runtime evidence.',
    approach: 'AIOStack records every sensitive data access by every agent, with full identity chain, purpose, and timing. Evidence packages export directly for audit. (DAM-grade detail available with Aurva Enterprise.)',
    outcome: [
      'SOC 2 evidence pack auto-generated weekly',
      '4 quarters of access history queryable in seconds',
      'No agent code modified to produce trail',
    ],
  },
  {
    mark: 'UC·06',
    industry: 'D2C · GLOBAL',
    title: 'Novel egress destinations',
    persona: 'Detection & Response Lead',
    problem: 'A workload started sending data to an endpoint nobody recognized at 3am. By the time the SIEM flagged volume, 90 minutes of traffic had already left.',
    approach: 'AIOStack baselines every workload\'s expected destinations and flags first-time egress to a novel endpoint in real-time — with the originating agent, role, and data class attached.',
    outcome: [
      'Novel-destination alerts within 30s of first call',
      'Originating identity chain attached to every finding',
      '6 unsanctioned egress paths shut down in month 1',
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
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />

        <!-- full-bleed coverage strip -->
        <div class="v4-uc-strip">
          <div class="v4-uc-strip-col" v-for="col in stripCols" :key="col.label">
            <span class="v4-uc-strip-label">{{ col.label }}</span>
            <span class="v4-uc-strip-val">{{ col.val }}</span>
          </div>
        </div>

        <div class="v4-coordinates" />
        <div class="v4-container">
          <span class="v4-section-num">§ AURVA · USE CASES</span>
          <h1 class="v4-display" style="margin-top:16px">
            What you find<br>
            <span class="v4-em">when you read the kernel.</span>
          </h1>
          <p class="v4-lead" style="margin-top:28px;max-width:640px">
            Six patterns we see again and again across security and platform teams running AI in production —
            and what AIOStack actually does about them.
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
                <span class="v4-uc-row-label">problem</span>
                <p class="v4-uc-row-body">{{ c.problem }}</p>
              </div>

              <div class="v4-uc-row">
                <span class="v4-uc-row-label">approach</span>
                <p class="v4-uc-row-body">{{ c.approach }}</p>
              </div>

              <div class="v4-uc-outcome">
                <span class="v4-uc-outcome-label">outcome</span>
                <ul class="v4-uc-outcome-list">
                  <li v-for="o in c.outcome" :key="o">{{ o }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ── CTA ── -->
      <section class="v4-section v4-bordered v4-uc-cta">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-uc-cta-inner">
            <div>
              <span class="v4-section-num">§ NEXT</span>
              <h2 class="v4-h2" style="margin-top:14px">
                Read your own kernel.<br>
                <span class="v4-em">Ten minutes.</span>
              </h2>
              <p class="v4-section-lead" style="max-width:560px">
                One curl. Read-only. In-VPC. Your AI inventory, identity chains, and egress map — built from runtime evidence, not slide decks.
              </p>
            </div>
            <div class="v4-uc-cta-links">
              <NuxtLink class="v4-btn v4-btn-primary" to="/docs/getting-started/introduction">
                Install AIOStack
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </NuxtLink>
              <a class="v4-btn v4-btn-ghost" href="mailto:contact@aurva.io">
                contact@aurva.io
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>

    <LandingFooter />
  </div>
</template>

<style scoped>
/* ── Hero ── */
.v4-uc-hero {
  padding: 0 0 64px;
}

.v4-uc-strip {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,.08);
  margin-bottom: 56px;
}
.v4-uc-strip-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px 20px;
  border-right: 1px solid rgba(255,255,255,.06);
}
.v4-uc-strip-col:last-child { border-right: none; }
.v4-uc-strip-label {
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .1em;
  color: rgba(255,255,255,.28);
  text-transform: uppercase;
}
.v4-uc-strip-val {
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .05em;
  color: rgba(255,255,255,.7);
  text-transform: uppercase;
  white-space: nowrap;
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

/* ── CTA ── */
.v4-uc-cta { padding: 60px 0; }
.v4-uc-cta-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}
.v4-uc-cta-links {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .v4-uc-strip-col:nth-child(n+5) { display: none; }
  .v4-uc-strip-col { padding: 18px 14px; }
  .v4-uc-grid { grid-template-columns: 1fr; }
  .v4-uc-cta-inner { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 540px) {
  .v4-uc-strip-col:nth-child(n+3) { display: none; }
}
</style>
