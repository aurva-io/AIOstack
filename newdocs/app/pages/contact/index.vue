<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

useSeoMeta({
  title: 'Contact Aurva Security',
  description: 'Talk to Aurva Security about product evaluation, deployment, runtime architecture, eBPF, integrations, or AI security research.',
  ogTitle: 'Contact Aurva Security',
  ogDescription: 'Start a conversation with the Aurva sales or engineering team.',
})

const paths = [
  {
    label: 'SALES',
    title: 'Contact sales.',
    copy: 'Find the right plan for your team, get deployment and onboarding help, and join the Aurva security community.',
    details: ['Choose the right plan', 'Plan deployment and onboarding', 'Join the community'],
    to: '/contact/sales',
    action: 'Talk to sales',
  },
  {
    label: 'ENGINEERING',
    title: 'Contact engineering.',
    copy: 'Bring us technical issues, product questions, integration details, and the hard runtime security problems you are working through.',
    details: ['Runtime architecture', 'Technical integrations', 'Research collaboration'],
    to: '/contact/engineering',
    action: 'Talk to engineering',
  },
]
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />

    <main class="v4-frame v4-frame-borderless contact-index">
      <section class="contact-index-hero">
        <div class="v4-container">
          <h1 class="v4-display">Start a conversation.</h1>
          <p class="v4-lead">
            Whether you are evaluating Aurva or want to understand the systems behind it, reach the
            team best equipped to help.
          </p>
        </div>
      </section>

      <section class="contact-paths v4-bordered">
        <div class="v4-container">
          <div class="contact-path-grid">
            <NuxtLink v-for="path in paths" :key="path.label" :to="path.to" class="contact-path-card">
              <div class="contact-card-corners" aria-hidden="true" />
              <span class="contact-path-label">{{ path.label }}</span>
              <h2>{{ path.title }}</h2>
              <p>{{ path.copy }}</p>
              <ul>
                <li v-for="detail in path.details" :key="detail">{{ detail }}</li>
              </ul>
              <div class="contact-path-action">
                <span>{{ path.action }}</span>
                <span aria-hidden="true">→</span>
              </div>
            </NuxtLink>
          </div>

          <p class="contact-direct">
            Prefer email? <a href="mailto:sales@aurva.io">sales@aurva.io</a>
          </p>
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>

<style scoped>
.contact-index-hero {
  padding: 112px 0 88px;
}

.contact-index-hero .v4-display {
  max-width: 920px;
  margin-top: 0;
}

.contact-index-hero .v4-lead {
  max-width: 660px;
}

.contact-paths {
  padding: 64px 0 96px;
}

.contact-path-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.contact-path-card {
  position: relative;
  display: flex;
  min-height: 420px;
  flex-direction: column;
  padding: 38px 40px 32px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.14);
  background:
    linear-gradient(rgba(255,255,255,.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.014) 1px, transparent 1px),
    rgba(255,255,255,.01);
  background-size: 28px 28px;
  color: var(--v4-fg);
  text-decoration: none;
  transition: border-color .18s, background .18s, transform .18s;
}

.contact-path-card:hover {
  border-color: rgba(255,255,255,.34);
  background-color: rgba(255,255,255,.024);
  transform: translateY(-2px);
}

.contact-card-corners::before,
.contact-card-corners::after {
  position: absolute;
  width: 24px;
  height: 24px;
  content: '';
  pointer-events: none;
}

.contact-card-corners::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(255,255,255,.66);
  border-left: 2px solid rgba(255,255,255,.66);
}

.contact-card-corners::after {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid rgba(255,255,255,.66);
  border-bottom: 2px solid rgba(255,255,255,.66);
}

.contact-path-label {
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .14em;
}

.contact-path-card h2 {
  margin: 42px 0 0;
  font-size: clamp(32px, 3.3vw, 46px);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: -.03em;
}

.contact-path-card > p {
  max-width: 560px;
  margin: 20px 0 0;
  color: var(--v4-fg-2);
  font-size: 16px;
  line-height: 1.55;
}

.contact-path-card ul {
  display: grid;
  gap: 9px;
  margin: 34px 0 0;
  padding: 0;
  list-style: none;
}

.contact-path-card li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .06em;
}

.contact-path-card li::before {
  width: 14px;
  height: 1px;
  background: rgba(255,255,255,.34);
  content: '';
}

.contact-path-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,.1);
  font-size: 14px;
  font-weight: 600;
}

.contact-path-action span:last-child {
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  transition: color .18s, transform .18s;
}

.contact-path-card:hover .contact-path-action span:last-child {
  color: var(--v4-fg);
  transform: translateX(4px);
}

.contact-direct {
  margin: 30px 0 0;
  color: var(--v4-fg-3);
  font-size: 13px;
  text-align: center;
}

.contact-direct a {
  color: var(--v4-fg-2);
  text-underline-offset: 3px;
}

@media (max-width: 760px) {
  .contact-index-hero {
    padding: 80px 0 64px;
  }

  .contact-path-grid {
    grid-template-columns: 1fr;
  }

  .contact-path-card {
    min-height: 360px;
  }
}

@media (max-width: 480px) {
  .contact-paths {
    padding-top: 48px;
  }

  .contact-path-card {
    min-height: 340px;
    padding: 28px 24px 24px;
  }
}
</style>
