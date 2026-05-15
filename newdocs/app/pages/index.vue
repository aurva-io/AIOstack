<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})
</script>

<template>
  <div class="v4-page dark">
    <LandingNavbar />
    <div class="v4-frame">
      <LandingHero />
      <LandingObservatories />
      <LandingHowItWorks />
      <LandingOutcomes />
      <LandingRoster />
      <LandingFinalCTA />
    </div>
    <LandingFooter />
  </div>
</template>
