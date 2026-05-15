<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const founders = [
  {
    mark: 'F·01',
    name: 'Apurv Garg',
    title: 'CEO & Co-Founder',
    bio: 'Built and led AI systems at Meta. Understands how production models behave with sensitive data at scale.',
    tone: 'white',
  },
  {
    mark: 'F·02',
    name: 'Krishna Bagadia',
    title: 'CTO & Co-Founder',
    bio: 'Built security infrastructure at Meta focused on access linked to real identities and context.',
    tone: 'white',
  },
  {
    mark: 'F·03',
    name: 'Akash Mandal',
    title: 'Architect & Co-Founder',
    bio: 'Systems architect shaping the data plane and eBPF-based observation layer.',
    tone: 'white',
  },
]

const team = [
  { mark: 'T·01', name: 'Akshay Singhal', title: 'Head of Engineering' },
  { mark: 'T·02', name: 'Pooja Gupta', title: 'Head of Product' },
  { mark: 'T·03', name: 'Tushar Haralkar', title: 'Field CISO' },
  { mark: 'T·04', name: 'Ninad Wirmalwar', title: 'Business Head, India & MEA' },
  { mark: 'T·05', name: 'Shubham Ojha', title: 'Founding Engineer' },
  { mark: 'T·06', name: 'Swapnil Nair', title: 'Head of Research' },
]

const stripCols = [
  { label: 'ENTITY',    val: 'AURVA · INC'              },
  { label: 'FOUNDED',   val: '2023'                      },
  { label: 'HQ',        val: 'SUNNYVALE · CA'            },
  { label: 'OFFICE',    val: 'BANGALORE · IN'            },
  { label: 'FOCUS',     val: 'RUNTIME AI SECURITY'       },
  { label: 'DEPLOY',    val: 'IN-VPC · SELF-HOSTED'      },
  { label: 'KERNEL',    val: 'EBPF · DAEMONSET'          },
  { label: 'STATUS',    val: 'GA · 2025'                 },
]

const investors = [
  { name: 'Nexus Venture Partners', logo: '/investors/nexus.png' },
  { name: 'Dreamit', logo: '/investors/dreamit.png' },
  { name: 'DeVC', logo: '/investors/devc.png' },
]

const advisors = [
  { name: 'Meta', logo: '/investors/meta.png' },
  { name: 'Anthropic', logo: '/investors/anthropic.png' },
  { name: 'Postman', logo: '/investors/postman.png' },
  { name: 'Harness', logo: '/investors/harness.png' },
  { name: 'Tanium', logo: '/investors/tanium.png' },
  { name: 'Brex', logo: '/investors/brex.png' },
  { name: 'Rubrik', logo: '/investors/rubrik.png' },
  { name: 'Stripe', logo: '/investors/stripe.png' },
]
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />

    <div class="v4-frame">

      <!-- ── HERO ── -->
      <section class="v4-section v4-about-hero">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />

        <!-- full-bleed data strip -->
        <div class="v4-about-strip">
          <div class="v4-about-strip-col" v-for="col in stripCols" :key="col.label">
            <span class="v4-about-strip-label">{{ col.label }}</span>
            <span class="v4-about-strip-val">{{ col.val }}</span>
          </div>
          <div class="v4-about-strip-rule" />
        </div>

        <div class="v4-coordinates" />
        <div class="v4-container">
          <span class="v4-section-num">§ AURVA · ABOUT</span>
          <h1 class="v4-display" style="margin-top:16px">
            The paradigm has shifted.<br>
            <span class="v4-em">Security hasn't kept up.</span>
          </h1>
          <p class="v4-lead" style="margin-top:28px;max-width:640px">
            AI agents and dynamic identities move faster, touch more data, and create more sprawl
            than static controls were designed for. Aurva was founded to answer one question:
            when does legitimate access become inappropriate at runtime?
          </p>
          <div class="v4-about-origin">
            <div class="v4-about-origin-row">
              <span class="v4-mono v4-mono-dim">founded</span>
              <span>former Meta leaders in AI &amp; security</span>
            </div>
            <div class="v4-about-origin-row">
              <span class="v4-mono v4-mono-dim">hq</span>
              <span>Sunnyvale, CA · Bangalore, India</span>
            </div>
            <div class="v4-about-origin-row">
              <span class="v4-mono v4-mono-dim">product</span>
              <span>AIOStack · runtime AI security</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── FOUNDERS ── -->
      <section class="v4-section v4-bordered v4-about-founders">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <span class="v4-section-num"> 01 · FOUNDERS</span>
          <div class="v4-about-founders-grid">
            <div v-for="f in founders" :key="f.mark" class="v4-about-founder-card">
              <!-- corner brackets -->
              <svg class="v4-card-corners" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 12 L0 0 L12 0" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M88 0 L100 0 L100 12" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M0 88 L0 100 L12 100" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M88 100 L100 100 L100 88" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
              </svg>
              <div class="v4-about-founder-mark">{{ f.mark }}</div>
              <div class="v4-about-founder-name">{{ f.name }}</div>
              <div class="v4-about-founder-title">{{ f.title }}</div>
              <p class="v4-about-founder-bio">{{ f.bio }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── TEAM ── -->
      <section class="v4-section v4-bordered v4-about-team">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <span class="v4-section-num"> 02 · TEAM</span>
          <div class="v4-about-team-grid">
            <div v-for="m in team" :key="m.mark" class="v4-about-team-cell">
              <div class="v4-about-team-mark">{{ m.mark }}</div>
              <div class="v4-about-team-name">{{ m.name }}</div>
              <div class="v4-about-team-title">{{ m.title }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── BACKING ── -->
      <section class="v4-section v4-bordered v4-about-backing">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-backing-hero">
            <span class="v4-section-num">§ 03 · BACKING</span>
            <h2 class="v4-h2" style="margin-top:14px">
              Backed by the best.
            </h2>
            <p class="v4-section-lead" style="max-width:520px">
              Built with support from the investors and operators who shaped modern AI, security, and cloud infrastructure.
            </p>
          </div>

          <div class="v4-backing-block">
            <p class="v4-backing-label">World-Class Investors</p>
            <div class="v4-investor-grid">
              <div v-for="inv in investors" :key="inv.name" class="v4-investor-cell">
                <img :src="inv.logo" :alt="inv.name" class="v4-investor-img" />
              </div>
            </div>
          </div>

          <div class="v4-backing-block">
            <p class="v4-backing-label">Industry Veterans</p>
            <div class="v4-advisor-grid">
              <div v-for="adv in advisors" :key="adv.name" class="v4-advisor-cell">
                <img :src="adv.logo" :alt="adv.name" class="v4-advisor-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CTA ── -->
      <section class="v4-section v4-bordered v4-about-cta">
        <div class="v4-rule v4-rule-h" :style="{ top: 0 }" />
        <div class="v4-container">
          <div class="v4-about-cta-inner">
            <div>
              <span class="v4-section-num"> JOIN</span>
              <h2 class="v4-h2" style="margin-top:14px">
                Building the security layer<br>
                <span class="v4-em">the AI era needs.</span>
              </h2>
              <p class="v4-section-lead">
                We're a small team solving a hard problem. If runtime security for AI interests you, reach out.
              </p>
            </div>
            <div class="v4-about-cta-links">
              <NuxtLink class="v4-btn v4-btn-primary" to="/docs/getting-started/introduction">
                Try AIOStack
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
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
.v4-about-hero {
  padding: 0 0 64px;
}

/* full-bleed strip */
.v4-about-strip {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,.08);
  margin-bottom: 56px;
  position: relative;
  overflow: hidden;
}

.v4-about-strip-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px 20px;
  border-right: 1px solid rgba(255,255,255,.06);
}

.v4-about-strip-col:last-child {
  border-right: none;
}

.v4-about-strip-label {
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .1em;
  color: rgba(255,255,255,.28);
  text-transform: uppercase;
}

.v4-about-strip-val {
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .05em;
  color: rgba(255,255,255,.7);
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .v4-about-strip-col:nth-child(n+5) { display: none; }
  .v4-about-strip-col { padding: 18px 14px; }
}

@media (max-width: 540px) {
  .v4-about-strip-col:nth-child(n+3) { display: none; }
}

.v4-about-origin {
  margin-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v4-about-origin-row {
  display: flex;
  gap: 16px;
  font-family: var(--v4-mono);
  font-size: 12px;
}

.v4-about-origin-row span:first-child {
  min-width: 72px;
}


/* ── Founders ── */
.v4-about-founders {
  padding: 60px 0;
}

.v4-about-founders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-top: 32px;
}

.v4-about-founder-card {
  position: relative;
  padding: 28px 24px;
  background: rgba(255, 255, 255, .02);
  border: 1px solid rgba(255, 255, 255, .08);
}

.v4-card-corners {
  position: absolute;
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  pointer-events: none;
}

.v4-about-founder-mark {
  font-family: var(--v4-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, .35);
  letter-spacing: .08em;
  margin-bottom: 14px;
}

.v4-about-founder-name {
  font-family: var(--v4-sans);
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, .92);
  margin-bottom: 4px;
}

.v4-about-founder-title {
  font-family: var(--v4-mono);
  font-size: 11px;
  color: rgba(170, 220, 138, .8);
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.v4-about-founder-bio {
  font-size: 13.5px;
  line-height: 1.65;
  color: rgba(255, 255, 255, .55);
  margin: 0;
}

/* ── Team ── */
.v4-about-team {
  padding: 60px 0;
}

.v4-about-team-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 32px;
}

.v4-about-team-cell {
  width: calc((100% - 4px * 4) / 5);
  padding: 20px 18px;
  border: 1px solid rgba(255, 255, 255, .07);
  background: rgba(255, 255, 255, .02);
  box-sizing: border-box;
}

.v4-about-team-mark {
  font-family: var(--v4-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, .3);
  letter-spacing: .08em;
  margin-bottom: 10px;
}

.v4-about-team-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, .85);
  margin-bottom: 4px;
}

.v4-about-team-title {
  font-family: var(--v4-mono);
  font-size: 10.5px;
  color: rgba(255, 255, 255, .4);
  letter-spacing: .04em;
}

/* ── Backing ── */
.v4-about-backing {
  padding: 80px 0;
}

.v4-backing-hero {
  margin-bottom: 56px;
}

.v4-backing-block {
  margin-top: 36px;
}

.v4-backing-label {
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .35);
  margin: 0 0 8px;
}

/* Investors — large, 3-up */
.v4-investor-grid {
  display: flex;
  gap: 4px;
}

.v4-investor-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .025);
  padding: 32px 40px;
  box-sizing: border-box;
  transition: border-color 0.2s, background 0.2s;
}

.v4-investor-cell:hover {
  border-color: rgba(255, 255, 255, .25);
  background: rgba(255, 255, 255, .05);
}

.v4-investor-img {
  height: 52px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.75;
  transition: opacity 0.2s;
}

.v4-investor-cell:hover .v4-investor-img {
  opacity: 1;
}

/* Advisors — compact, 8-up */
.v4-advisor-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.v4-advisor-cell {
  width: calc((100% - 4px * 7) / 8);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  border: 1px solid rgba(255, 255, 255, .07);
  background: rgba(255, 255, 255, .015);
  padding: 16px;
  box-sizing: border-box;
  transition: border-color 0.15s, background 0.15s;
}

.v4-advisor-cell:hover {
  border-color: rgba(255, 255, 255, .16);
  background: rgba(255, 255, 255, .04);
}

.v4-advisor-img {
  height: 22px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.55;
  transition: opacity 0.15s;
}

.v4-advisor-cell:hover .v4-advisor-img {
  opacity: 0.85;
}

/* ── CTA ── */
.v4-about-cta {
  padding: 60px 0;
}

.v4-about-cta-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.v4-about-cta-links {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  align-items: center;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .v4-about-founders-grid {
    grid-template-columns: 1fr;
  }

  .v4-about-team-cell {
    width: calc((100% - 4px * 2) / 3);
  }

  .v4-advisor-cell {
    width: calc((100% - 4px * 3) / 4);
  }

  .v4-about-cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .v4-about-team-cell {
    width: calc((100% - 4px) / 2);
  }

  .v4-investor-grid {
    flex-direction: column;
  }

  .v4-investor-cell {
    height: 88px;
  }

  .v4-advisor-cell {
    width: calc((100% - 4px * 2) / 3);
  }
}

@media (max-width: 400px) {
  .v4-advisor-cell {
    width: calc((100% - 4px) / 2);
  }
}
</style>
