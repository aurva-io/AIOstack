<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

const route = useRoute()
const routeTeam = Array.isArray(route.params.team) ? route.params.team[0] : route.params.team

if (routeTeam !== 'sales' && routeTeam !== 'engineering') {
  throw createError({ statusCode: 404, statusMessage: 'Contact page not found.' })
}

const team = routeTeam
const page = team === 'sales'
  ? {
      title: 'Talk to sales.',
      copy: 'Choose the right plan, prepare your deployment, and get your team started with Aurva.',
      points: [
        'Learn which plan is right for your team',
        'Get deployment and onboarding help',
        'Join the Aurva security community',
      ],
      seoTitle: 'Contact Aurva Sales',
      seoDescription: 'Talk to Aurva Security about product evaluation, deployment architecture, pricing, and rollout planning.',
    }
  : {
      title: 'Talk to engineering.',
      copy: 'Discuss runtime architecture, eBPF visibility, identity attribution, policy enforcement, and integrations.',
      points: [
        'eBPF and runtime architecture',
        'Identity, data, and intent attribution',
        'Integrations and research collaboration',
      ],
      seoTitle: 'Contact Aurva Engineering',
      seoDescription: 'Talk to Aurva Engineering about eBPF, runtime identity, data attribution, integrations, and AI policy enforcement.',
    }

useSeoMeta({
  title: page.seoTitle,
  description: page.seoDescription,
  ogTitle: page.seoTitle,
  ogDescription: page.seoDescription,
})
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />

    <main class="v4-frame v4-frame-borderless contact-team-page">
      <section class="contact-team-section">
        <div class="v4-container contact-team-grid">
          <div class="contact-team-copy">
            <NuxtLink to="/contact" class="contact-back">
              <span aria-hidden="true">←</span>
              Contact
            </NuxtLink>

            <h1>{{ page.title }}</h1>
            <p>{{ page.copy }}</p>

            <ul>
              <li v-for="point in page.points" :key="point">{{ point }}</li>
            </ul>

            <p v-if="team === 'sales'" class="contact-team-alternate">
              Technical or product questions?
              <NuxtLink to="/contact/engineering">Contact engineering</NuxtLink>
            </p>
          </div>

          <ContactInquiryForm :kind="team" />
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>

<style scoped>
.contact-team-section {
  padding: 96px 0 112px;
}

.contact-team-grid {
  display: grid;
  grid-template-columns: minmax(320px, .72fr) minmax(520px, 1.28fr);
  align-items: start;
  gap: 84px;
}

.contact-team-copy {
  position: sticky;
  top: 116px;
}

.contact-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .1em;
  text-decoration: none;
  text-transform: uppercase;
}

.contact-back:hover {
  color: var(--v4-fg);
}

.contact-team-copy h1 {
  max-width: 540px;
  margin: 52px 0 0;
  color: var(--v4-fg);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -.035em;
  text-wrap: balance;
}

.contact-team-copy > p {
  max-width: 520px;
  margin: 28px 0 0;
  color: var(--v4-fg-2);
  font-size: 15px;
  line-height: 1.6;
}

.contact-team-copy ul {
  display: grid;
  gap: 13px;
  margin: 38px 0 0;
  padding: 24px 0 0;
  border-top: 1px solid rgba(255,255,255,.12);
  list-style: none;
}

.contact-team-copy li {
  display: flex;
  align-items: center;
  gap: 11px;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  line-height: 1.4;
  letter-spacing: .06em;
}

.contact-team-copy li::before {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(255,255,255,.42);
  content: '';
}

.contact-team-alternate {
  margin: 24px 0 0;
  color: var(--v4-fg-3);
  font-size: 13px;
  line-height: 1.5;
}

.contact-team-alternate a {
  margin-left: 4px;
  color: var(--v4-fg);
  font-weight: 500;
  text-underline-offset: 4px;
}

@media (max-width: 980px) {
  .contact-team-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }

  .contact-team-copy {
    position: static;
  }

}

@media (max-width: 600px) {
  .contact-team-section {
    padding: 72px 0 80px;
  }

  .contact-team-grid {
    gap: 44px;
  }

  .contact-team-copy h1 {
    margin-top: 36px;
    font-size: clamp(34px, 10vw, 44px);
  }
}
</style>
