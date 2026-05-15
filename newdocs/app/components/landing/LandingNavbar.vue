<script setup lang="ts">
const textLinks = [
  { label: 'Docs',  to: '/docs/getting-started/introduction', external: false },
  { label: 'Us',    to: '/about', external: false },
  { label: 'aurva', to: 'https://aurva.io', external: true },
]
</script>

<template>
  <header class="navbar-bar navbar-bar--home">
    <div class="navbar-inner">
      <!-- Logo -->
      <NuxtLink to="/" aria-label="AIOStack home"
        style="display:flex; align-items:center; gap:10px; text-decoration:none;">
        <img src="/logo.svg" alt="AIOStack" width="20" height="20" style="filter:invert(1); opacity:0.85;" />
        <span class="v4-mono" style="font-size:13px; color:white; letter-spacing:.06em;">AIOStack</span>
      </NuxtLink>

      <!-- Nav links -->
      <nav style="display:flex; align-items:center; gap:4px;">
        <NuxtLink v-for="link in textLinks" :key="link.label" :to="link.to"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="navbar-link" style="display:inline-flex; align-items:center; gap:3px;">
          {{ link.label }}
          <svg v-if="link.external" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </NuxtLink>

        <!-- GitHub icon link -->
        <a href="https://github.com/aurva-io/ai-observability-stack" target="_blank" rel="noopener noreferrer"
          class="navbar-link" aria-label="GitHub" style="display:inline-flex; align-items:center; padding:6px 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z"/>
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>
