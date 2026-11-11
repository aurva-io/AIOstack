<script setup lang="ts">
definePageMeta({
  layout: false,
  header: false,
  footer: false,
})

useSeoMeta({
  title: 'Aurva | AI and Data Security',
  description:
    'Trace agent identities, database access, and model calls. Find shadow AI, investigate unexpected access, and block or redact sensitive data on protected requests.',
  ogTitle: 'Control what agents do with your data.',
  ogDescription:
    'Trace agent identities, database access, and model calls. Find shadow AI, investigate unexpected access, and block or redact sensitive data on protected requests.',
})

useHead({ titleTemplate: '%s' })
</script>

<template>
  <LandingDefense />
</template>
