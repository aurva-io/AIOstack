<script setup lang="ts">
const textLinks = [
  { label: 'Use cases', to: '/use-cases', external: false },
  { label: 'Docs',      to: '/docs/getting-started/introduction', external: false },
  { label: 'Blog',      to: '/blog', external: false },
  { label: 'Us',        to: '/about', external: false },
  { label: 'aurva',     to: 'https://aurva.io', external: true },
]

const open = ref(false)
const route = useRoute()

// Close menu on route change
watch(() => route.fullPath, () => { open.value = false })

// Prevent body scroll when overlay is open
watch(open, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
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

      <!-- Desktop nav links -->
      <nav class="v4-nav-desktop">
        <NuxtLink v-for="link in textLinks" :key="link.label" :to="link.to"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="navbar-link" style="display:inline-flex; align-items:center; gap:3px;">
          {{ link.label }}
          <svg v-if="link.external" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </NuxtLink>

        <a href="https://github.com/aurva-io/ai-observability-stack" target="_blank" rel="noopener noreferrer"
          class="navbar-link" aria-label="GitHub" style="display:inline-flex; align-items:center; padding:6px 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z"/>
          </svg>
        </a>
      </nav>

      <!-- Mobile menu toggle -->
      <button
        type="button"
        class="v4-nav-toggle"
        :aria-expanded="open"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span>{{ open ? 'CLOSE' : 'MENU' }}</span>
        <span class="v4-nav-toggle-icon">
          <span :class="['v4-nav-toggle-bar', { open }]" />
          <span :class="['v4-nav-toggle-bar', { open }]" />
        </span>
      </button>
    </div>

    <!-- Mobile overlay -->
    <Teleport to="body">
      <Transition name="v4-nav-overlay">
        <div v-if="open" class="v4-nav-overlay" @click="open = false">
          <!-- decorative grid coords -->
          <div class="v4-nav-overlay-coords" />

          <div class="v4-nav-overlay-inner" @click.stop>
            <button
              type="button"
              class="v4-nav-overlay-close"
              aria-label="Close navigation"
              @click="open = false"
            >
              <span>CLOSE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </button>

            <div class="v4-nav-overlay-header">
              <span class="v4-mono v4-mono-dim">§ NAV · INDEX</span>
              <span class="v4-mono v4-mono-dim">{{ String(textLinks.length).padStart(2, '0') }} routes</span>
            </div>

            <nav class="v4-nav-overlay-list">
              <NuxtLink
                v-for="(link, i) in textLinks"
                :key="link.label"
                :to="link.to"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="v4-nav-overlay-link"
                @click="open = false"
              >
                <span class="v4-nav-overlay-mark">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="v4-nav-overlay-label">{{ link.label }}</span>
                <span class="v4-nav-overlay-arrow">
                  <svg v-if="link.external" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </NuxtLink>
            </nav>

            <div class="v4-nav-overlay-footer">
              <a
                href="https://github.com/aurva-io/ai-observability-stack"
                target="_blank"
                rel="noopener noreferrer"
                class="v4-nav-overlay-extra"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z"/>
                </svg>
                <span>github · aurva-io</span>
              </a>
              <span class="v4-mono v4-mono-dim">aurva.ai · v4</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.v4-nav-desktop {
  display: flex;
  align-items: center;
  gap: 4px;
}

.v4-nav-toggle {
  display: none;
  align-items: center;
  gap: 10px;
  background: none;
  border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.85);
  padding: 8px 12px;
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  position: relative;
  z-index: 110;
}
.v4-nav-toggle:hover {
  border-color: rgba(255,255,255,.3);
  background: rgba(255,255,255,.03);
}

.v4-nav-toggle-icon {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  width: 14px;
  height: 12px;
  position: relative;
}

.v4-nav-toggle-bar {
  display: block;
  width: 14px;
  height: 1px;
  background: currentColor;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.v4-nav-toggle-bar:nth-child(1).open {
  transform: translateY(2px) rotate(45deg);
}
.v4-nav-toggle-bar:nth-child(2).open {
  transform: translateY(-2px) rotate(-45deg);
}

/* Overlay */
.v4-nav-overlay {
  position: fixed;
  inset: 0;
  background: #08090b;
  z-index: 100;
  overflow-y: auto;
  font-family: var(--v4-sans);
}

.v4-nav-overlay-coords {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(0deg, transparent 0, transparent 39px, rgba(255,255,255,.03) 39px, rgba(255,255,255,.03) 40px),
    repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(255,255,255,.03) 39px, rgba(255,255,255,.03) 40px);
  opacity: 0.6;
}

.v4-nav-overlay-inner {
  position: relative;
  padding: 80px 24px 32px;
  max-width: 720px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.v4-nav-overlay-close {
  position: absolute;
  top: 20px;
  right: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid rgba(255,255,255,.18);
  color: rgba(255,255,255,.85);
  padding: 8px 12px;
  font-family: var(--v4-mono);
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.v4-nav-overlay-close:hover {
  border-color: rgba(170,220,138,.6);
  color: rgba(170,220,138,.95);
  background: rgba(170,220,138,.05);
}

.v4-nav-overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  font-size: 10px;
}

.v4-nav-overlay-list {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.v4-nav-overlay-link {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid rgba(255,255,255,.06);
  text-decoration: none;
  color: rgba(255,255,255,.92);
  transition: padding 0.2s ease, color 0.15s;
}

.v4-nav-overlay-link:hover {
  padding-left: 8px;
  color: rgba(170,220,138,.95);
}

.v4-nav-overlay-mark {
  font-family: var(--v4-mono);
  font-size: 11px;
  color: rgba(255,255,255,.3);
  letter-spacing: .08em;
  min-width: 24px;
}

.v4-nav-overlay-label {
  flex: 1;
  font-family: var(--v4-sans);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -.01em;
}

.v4-nav-overlay-arrow {
  display: inline-flex;
  align-items: center;
  color: rgba(255,255,255,.35);
  transition: color 0.15s, transform 0.2s;
}

.v4-nav-overlay-link:hover .v4-nav-overlay-arrow {
  color: rgba(170,220,138,.85);
  transform: translateX(4px);
}

.v4-nav-overlay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,.08);
  font-family: var(--v4-mono);
  font-size: 11px;
}

.v4-nav-overlay-extra {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,.55);
  text-decoration: none;
  transition: color 0.15s;
}
.v4-nav-overlay-extra:hover { color: rgba(170,220,138,.9); }

/* Transition */
.v4-nav-overlay-enter-active,
.v4-nav-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.v4-nav-overlay-enter-from,
.v4-nav-overlay-leave-to {
  opacity: 0;
}

.v4-nav-overlay-enter-active .v4-nav-overlay-inner,
.v4-nav-overlay-leave-active .v4-nav-overlay-inner {
  transition: transform 0.25s ease;
}
.v4-nav-overlay-enter-from .v4-nav-overlay-inner,
.v4-nav-overlay-leave-to .v4-nav-overlay-inner {
  transform: translateY(-8px);
}

/* ── Breakpoint ── */
@media (max-width: 768px) {
  .v4-nav-desktop { display: none; }
  .v4-nav-toggle { display: inline-flex; }
}
</style>
