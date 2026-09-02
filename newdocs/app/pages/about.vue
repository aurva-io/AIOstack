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
  { name: 'Akshay Singhal', title: 'Head of Engineering' },
  { name: 'Pooja Gupta', title: 'Head of Product' },
  { name: 'Ninad Wirmalwar', title: 'Business Head, India & MEA' },
  { name: 'Shubham Ojha', title: 'Founding Engineer' },
  { name: 'Swapnil Nair', title: 'Head of Research' },
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
        <div class="v4-container">
          <h1 class="v4-display v4-about-title">
            AI changed what software can do.<br>
            <span class="v4-about-title-shift">Security must change with it.</span>
          </h1>
          <p class="v4-lead v4-about-intro">
            Aurva was founded by former Meta leaders in AI and security to protect a new kind of
            runtime, where agents use legitimate identities, reach sensitive data, and take actions
            static controls cannot fully predict.
          </p>
          <div class="v4-about-facts">
            <div class="v4-about-fact">
              <span class="v4-about-fact-label">Founded by</span>
              <span class="v4-about-fact-value">Former Meta AI and security leaders</span>
            </div>
            <div class="v4-about-fact">
              <span class="v4-about-fact-label">Built in</span>
              <span class="v4-about-fact-value">Sunnyvale and Bangalore</span>
            </div>
            <div class="v4-about-fact">
              <span class="v4-about-fact-label">Our mission</span>
              <span class="v4-about-fact-value">Make agentic AI safe to trust</span>
            </div>
          </div>
        </div>
      </section>

      <div class="v4-about-separator" aria-hidden="true">
        <span class="v4-about-separator-line" />
        <span class="v4-about-separator-mark">
          <img src="/logo.svg" alt="">
        </span>
        <span class="v4-about-separator-line" />
      </div>

      <!-- ── TEAM ── -->
      <section class="v4-section v4-about-founders">
        <div class="v4-container">
          <div class="v4-about-section-head">
            <div>
              <h2 class="v4-about-section-title">We move as one.</h2>
            </div>
            <p class="v4-about-section-copy">
              Research, engineering, product, and go-to-market working as one unit.
              <a class="v4-about-hiring-link" href="https://aurva.io/careers">
                We're hiring
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>
          <div class="v4-about-founders-grid">
            <article v-for="f in founders" :key="f.mark" class="v4-about-founder-card">
              <!-- corner brackets -->
              <svg class="v4-card-corners" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 12 L0 0 L12 0" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M88 0 L100 0 L100 12" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M0 88 L0 100 L12 100" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M88 100 L100 100 L100 88" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
              </svg>
              <div class="v4-about-founder-topline">
                <span class="v4-about-founder-mark">{{ f.mark }}</span>
                <span class="v4-about-founder-status">Founding team</span>
              </div>
              <div class="v4-about-founder-body">
                <div class="v4-about-founder-name">{{ f.name }}</div>
                <div class="v4-about-founder-title">{{ f.title }}</div>
                <p class="v4-about-founder-bio">{{ f.bio }}</p>
              </div>
            </article>
          </div>
          <div class="v4-about-team-roster">
            <div v-for="m in team" :key="m.name" class="v4-about-team-member">
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
            <h2 class="v4-h2">
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
                <img
                  :src="inv.logo"
                  :alt="`${inv.name} logo`"
                  :aria-label="`${inv.name} logo`"
                  class="v4-investor-img"
                />
              </div>
            </div>
          </div>

          <div class="v4-backing-block">
            <p class="v4-backing-label">Industry Veterans</p>
            <div class="v4-advisor-grid">
              <div v-for="adv in advisors" :key="adv.name" class="v4-advisor-cell">
                <img
                  :src="adv.logo"
                  :alt="`${adv.name} logo`"
                  :aria-label="`${adv.name} logo`"
                  class="v4-advisor-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFinalCTA
        :title-lines="['The future is agentic.', 'Help us secure it.']"
        copy="Join the team building the defense layer for the next generation of enterprise AI."
        primary-label="View open roles"
        primary-to="https://aurva.io/careers"
        secondary-label="Contact us"
        secondary-href="/contact"
      />

    </div>

    <LandingFooter />
  </div>
</template>

<style scoped>
/* ── Hero ── */
.v4-about-hero {
  padding: 96px 0 72px;
}

.v4-about-title {
  max-width: 1000px;
  margin: 0;
}

.v4-about-title-shift {
  color: rgba(255, 255, 255, .42);
}

.v4-about-intro {
  max-width: 700px;
  margin-top: 32px;
}

.v4-about-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, .12);
}

.v4-about-fact {
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
  padding: 0 32px;
  border-right: 1px solid rgba(255, 255, 255, .09);
}

.v4-about-fact:first-child {
  padding-left: 0;
}

.v4-about-fact:last-child {
  padding-right: 0;
  border-right: 0;
}

.v4-about-fact-label {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .4);
}

.v4-about-fact-value {
  max-width: 260px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.45;
  color: rgba(255, 255, 255, .86);
}

.v4-about-fact:first-child .v4-about-fact-value {
  max-width: none;
  white-space: nowrap;
}

.v4-about-separator {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: center;
  gap: 18px;
  width: min(100% - 96px, 1780px);
  height: 72px;
  margin: 0 auto;
}

.v4-about-separator-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .18));
}

.v4-about-separator-line:last-child {
  transform: scaleX(-1);
}

.v4-about-separator-mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .16);
  background: #08090b;
}

.v4-about-separator-mark img {
  width: 18px;
  height: 18px;
  filter: invert(1);
  opacity: .62;
}

/* ── Founders ── */
.v4-about-founders {
  padding: 56px 0 80px;
}

.v4-about-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 48px;
}

.v4-about-section-title {
  max-width: 660px;
  margin: 0;
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: -.04em;
  color: rgba(255, 255, 255, .94);
}

.v4-about-section-copy {
  max-width: 410px;
  margin: 0 0 4px;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, .5);
}

.v4-about-hiring-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, .88);
  text-decoration: none;
  transition: color .2s ease, gap .2s ease;
}

.v4-about-hiring-link:hover {
  gap: 11px;
  color: #fff;
}

.v4-about-founders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 48px;
}

.v4-about-founder-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 310px;
  background:
    linear-gradient(rgba(255, 255, 255, .016) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .016) 1px, transparent 1px),
    rgba(255, 255, 255, .018);
  background-size: 24px 24px;
  border: 1px solid rgba(255, 255, 255, .12);
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
  color: rgba(255, 255, 255, .48);
  letter-spacing: .08em;
}

.v4-about-founder-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .09);
}

.v4-about-founder-status {
  font-family: var(--v4-mono);
  font-size: 9px;
  line-height: 1;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .3);
}

.v4-about-founder-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 28px 24px 24px;
}

.v4-about-founder-name {
  font-family: var(--v4-sans);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -.025em;
  color: rgba(255, 255, 255, .92);
  margin-bottom: 7px;
}

.v4-about-founder-title {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, .48);
}

.v4-about-founder-bio {
  margin: auto 0 0;
  padding-top: 32px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, .6);
}

/* ── Team roster ── */
.v4-about-team-roster {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.v4-about-team-member {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 88px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, .1);
  background:
    linear-gradient(rgba(255, 255, 255, .012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .012) 1px, transparent 1px),
    rgba(255, 255, 255, .015);
  background-size: 20px 20px;
  transition: border-color .2s ease, background-color .2s ease;
}

.v4-about-team-member:hover {
  border-color: rgba(255, 255, 255, .2);
  background-color: rgba(255, 255, 255, .025);
}

.v4-about-team-name {
  font-size: 17px;
  font-weight: 550;
  color: rgba(255, 255, 255, .9);
}

.v4-about-team-title {
  margin-top: 7px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, .48);
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

/* ── Responsive ── */
@media (max-width: 900px) {
  .v4-about-section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .v4-about-section-copy {
    max-width: 620px;
  }

  .v4-about-founders-grid {
    grid-template-columns: 1fr;
  }

  .v4-about-founder-card {
    min-height: 260px;
  }

  .v4-about-team-roster {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .v4-about-team-member:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .v4-advisor-cell {
    width: calc((100% - 4px * 3) / 4);
  }

}

@media (max-width: 600px) {
  .v4-about-hero {
    padding: 64px 0 56px;
  }

  .v4-about-separator {
    grid-template-columns: 1fr 36px 1fr;
    gap: 12px;
    width: calc(100% - 32px);
    height: 64px;
  }

  .v4-about-separator-mark {
    width: 36px;
    height: 36px;
  }

  .v4-about-facts {
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: 40px;
    padding-top: 0;
  }

  .v4-about-fact,
  .v4-about-fact:first-child,
  .v4-about-fact:last-child {
    padding: 20px 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, .09);
  }

  .v4-about-fact:last-child {
    border-bottom: 0;
  }

  .v4-about-founders {
    padding: 64px 0;
  }

  .v4-about-team-roster {
    grid-template-columns: 1fr;
  }

  .v4-about-team-member:last-child:nth-child(odd) {
    grid-column: auto;
  }

  .v4-about-team-member {
    min-height: 82px;
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
