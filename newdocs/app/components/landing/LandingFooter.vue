<script setup lang="ts">
const year = new Date().getFullYear()

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'AIOStack', href: '/', external: false },
      { label: 'Use cases', href: '/use-cases', external: false },
      { label: 'Architecture', href: '/docs/getting-started/key-concepts', external: false },
      { label: 'Installation', href: '/docs/getting-started/installation', external: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs/getting-started/introduction', external: false },
      { label: 'Blog', href: '/blog', external: false },
      { label: 'GitHub', href: 'https://github.com/aurva-io/ai-observability-stack', external: true },
      { label: 'License', href: 'https://github.com/aurva-io/ai-observability-stack/blob/main/LICENSE', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about', external: false },
      { label: 'DSPM & DAM', href: 'https://aurva.io', external: true },
      { label: 'Contact', href: '/contact', external: false },
    ],
  },
  {
    title: 'Access',
    links: [
      { label: 'Log in', href: 'https://app.aurva.ai/', external: true },
      { label: 'Sign up', href: 'https://app.aurva.ai/signup', external: true },
    ],
  },
]
</script>

<template>
  <footer class="v4-footer">
    <div class="v4-footer-inner">
      <div class="v4-footer-grid">
        <div class="v4-footer-brand">
          <NuxtLink to="/" class="v4-footer-lockup" aria-label="Aurva Security home">
            <img src="/logo.svg" alt="" width="26" height="26">
            <span>Aurva Security</span>
          </NuxtLink>
          <p>The defense layer for enterprise AI.</p>
        </div>

        <div v-for="group in groups" :key="group.title" class="v4-footer-group">
          <h2>{{ group.title }}</h2>
          <a
            v-for="link in group.links"
            :key="link.label"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </div>
      </div>

      <div class="v4-footer-bottom">
        <span>© {{ year }} Aurva Inc.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.v4-footer {
  background: #08090b;
  color: var(--v4-fg);
}

.v4-footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 72px 48px 32px;
}

.v4-footer-grid {
  display: grid;
  grid-template-columns: minmax(220px, 1.6fr) repeat(4, minmax(120px, 1fr));
  gap: 48px;
  padding-bottom: 72px;
}

.v4-footer-brand {
  padding-right: 24px;
}

.v4-footer-lockup {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--v4-fg);
  font-family: var(--v4-sans);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -.025em;
  text-decoration: none;
}

.v4-footer-lockup img {
  filter: invert(1);
  opacity: .9;
}

.v4-footer-brand p {
  max-width: 240px;
  margin: 20px 0 0;
  color: var(--v4-fg-3);
  font-family: var(--v4-sans);
  font-size: 14px;
  line-height: 1.5;
}

.v4-footer-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.v4-footer-group h2 {
  margin: 0 0 6px;
  color: rgba(255,255,255,.88);
  font-family: var(--v4-sans);
  font-size: 14px;
  font-weight: 600;
}

.v4-footer-group a {
  color: var(--v4-fg-3);
  font-family: var(--v4-sans);
  font-size: 14px;
  text-decoration: none;
  transition: color .15s;
}

.v4-footer-group a:hover {
  color: var(--v4-fg);
}

.v4-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,.1);
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .06em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .v4-footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .v4-footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .v4-footer-inner {
    padding: 56px 24px 28px;
  }

  .v4-footer-grid {
    gap: 40px 24px;
    padding-bottom: 48px;
  }

  .v4-footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
