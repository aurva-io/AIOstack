<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'License', href: 'https://github.com/aurva-io/ai-observability-stack/blob/main/LICENSE', external: true },
  { label: 'Docs', href: '/docs/getting-started/introduction', external: false },
  { label: 'GitHub', href: 'https://github.com/aurva-io/ai-observability-stack', external: true },
]
</script>

<template>
  <footer class="footer-bar">
    <div class="footer-inner">
      <div style="display:flex; align-items:center; gap:12px;">
        <a href="https://aurva.io" target="_blank" rel="noopener noreferrer">
          <img src="/logo.svg" alt="Aurva Logo" width="18" height="18" class="footer-logo" />
        </a>
        <span class="footer-text">
          AIOStack &copy; {{ year }}
          <a href="https://aurva.io" class="footer-link">Aurva</a>
        </span>
      </div>
      <div style="display:flex; align-items:center; gap:20px;">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="footer-link"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>
