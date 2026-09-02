<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

useSeoMeta({
  title: 'Enterprise AI Security & Runtime Defense',
  description: 'Aurva is the defensive control layer for enterprise AI, combining shadow AI discovery, runtime threat detection, data protection, policy enforcement, and automated remediation.',
  ogTitle: 'The defense layer for enterprise AI.',
  ogDescription: 'Discover sanctioned and shadow AI at runtime, detect threats, and turn security policy into inline enforcement with Aurva.',
})
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />
    <div class="v4-frame v4-frame-borderless">
      <LandingHero />
      <LandingOutcomes />
      <LandingObservatories />
      <LandingControlLoop />
      <LandingRoster />
      <LandingFinalCTA />
    </div>
    <LandingFooter />
  </div>
</template>
