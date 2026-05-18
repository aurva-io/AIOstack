<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.status === 404)

const title = computed(() => is404.value ? 'Page not found' : 'Something went wrong')
const subtitle = computed(() =>
  is404.value
    ? 'The route you requested does not seem to exist. '
    : props.error.message || 'An unexpected error occurred.'
)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Docs', to: '/docs/getting-started/introduction' },
  { label: 'Use cases', to: '/use-cases' },
  { label: 'Blog', to: '/blog' },
]

function handleClearError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="v4-page dark err-page">
    <!-- decorative grid -->
    <div class="err-grid" aria-hidden="true" />

    <!-- corner brackets -->
    <div class="err-bracket err-bracket--tl" aria-hidden="true" />
    <div class="err-bracket err-bracket--tr" aria-hidden="true" />
    <div class="err-bracket err-bracket--bl" aria-hidden="true" />
    <div class="err-bracket err-bracket--br" aria-hidden="true" />

    <div class="err-inner">
      <!-- top meta row -->
      <div class="err-meta">
        <NuxtLink to="/" class="err-logo" aria-label="AIOStack home">
          <img src="/logo.svg" alt="AIOStack" width="18" height="18" style="filter:invert(1); opacity:0.8;" />
          <span class="v4-mono err-logo-text">AIOStack</span>
        </NuxtLink>
        <span class="v4-mono err-tag">STATUS · {{ error.status }}</span>
      </div>

      <!-- main content -->
      <div class="err-body">
        <div class="err-code v4-mono" aria-hidden="true">{{ error.status }}</div>

        <div class="err-content">
          <h1 class="err-title">{{ title }}</h1>
          <p class="err-subtitle">{{ subtitle }}</p>

          <div class="err-actions">
            <button class="err-btn err-btn--primary" @click="handleClearError">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M5 12l6-6M5 12l6 6" />
              </svg>
              Return home
            </button>
          </div>

          <div class="err-divider" />

          <nav class="err-nav" aria-label="Quick links">
            <span class="v4-mono err-nav-label">Quick links</span>
            <div class="err-nav-links">
              <NuxtLink v-for="link in navLinks" :key="link.label" :to="link.to" class="err-nav-link"
                @click="clearError()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                {{ link.label }}
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>

      <!-- bottom bar -->
      <div class="err-footer">
        <span class="v4-mono err-footer-text">AIOStack &copy; {{ new Date().getFullYear() }} Aurva</span>
        <a href="https://github.com/aurva-io/ai-observability-stack" target="_blank" rel="noopener noreferrer"
          class="v4-mono err-footer-link">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z" />
          </svg>
          aurva-io / ai-observability-stack
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.err-page {
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;
}

/* ── Grid ── */
.err-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(0deg, transparent 0, transparent 39px, rgba(255, 255, 255, .03) 39px, rgba(255, 255, 255, .03) 40px),
    repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(255, 255, 255, .03) 39px, rgba(255, 255, 255, .03) 40px);
}

/* ── Corner brackets ── */
.err-bracket {
  position: fixed;
  width: 16px;
  height: 16px;
  border-color: rgba(170, 220, 138, .3);
  border-style: solid;
  pointer-events: none;
  z-index: 10;
}

.err-bracket--tl {
  top: 16px;
  left: 16px;
  border-width: 1px 0 0 1px;
}

.err-bracket--tr {
  top: 16px;
  right: 16px;
  border-width: 1px 1px 0 0;
}

.err-bracket--bl {
  bottom: 16px;
  left: 16px;
  border-width: 0 0 1px 1px;
}

.err-bracket--br {
  bottom: 16px;
  right: 16px;
  border-width: 0 1px 1px 0;
}

/* ── Layout ── */
.err-inner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* ── Top meta row ── */
.err-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  margin-bottom: 0;
}

.err-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.err-logo-text {
  font-size: 13px;
  color: rgba(255, 255, 255, .85);
  letter-spacing: .06em;
}

.err-tag {
  font-size: 11px;
  color: rgba(170, 220, 138, .7);
  letter-spacing: .1em;
  border: 1px solid rgba(170, 220, 138, .2);
  padding: 4px 10px;
}

/* ── Body ── */
.err-body {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 64px;
  padding: 80px 0 60px;
}

/* ── Big code ── */
.err-code {
  font-size: clamp(96px, 14vw, 180px);
  font-weight: 800;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(170, 220, 138, .2);
  letter-spacing: -.04em;
  user-select: none;
  flex-shrink: 0;
}

/* ── Content side ── */
.err-content {
  flex: 1;
  min-width: 0;
}

.err-title {
  font-family: var(--v4-sans);
  font-size: 32px;
  font-weight: 600;
  color: var(--v4-fg);
  letter-spacing: -.02em;
  margin: 0 0 12px;
  line-height: 1.15;
}

.err-subtitle {
  font-family: var(--v4-sans);
  font-size: 15px;
  color: var(--v4-fg-2);
  line-height: 1.6;
  margin: 0 0 32px;
}

/* ── Actions ── */
.err-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.err-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--v4-mono);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 10px 18px;
  border: 1px solid;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  background: none;
}

.err-btn--primary {
  border-color: rgba(170, 220, 138, .5);
  color: rgba(170, 220, 138, .9);
}

.err-btn--primary:hover {
  background: rgba(170, 220, 138, .08);
  border-color: rgba(170, 220, 138, .8);
  color: #aadc8a;
}

/* ── Divider ── */
.err-divider {
  height: 1px;
  background: rgba(255, 255, 255, .07);
  margin-bottom: 28px;
}

/* ── Nav ── */
.err-nav-label {
  display: block;
  font-size: 10px;
  color: var(--v4-fg-3);
  letter-spacing: .12em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.err-nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.err-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--v4-sans);
  font-size: 13px;
  color: rgba(255, 255, 255, .55);
  text-decoration: none;
  transition: color 0.15s;
}

.err-nav-link svg {
  opacity: 0.5;
  transition: opacity 0.15s, transform 0.15s;
}

.err-nav-link:hover {
  color: rgba(170, 220, 138, .9);
}

.err-nav-link:hover svg {
  opacity: 1;
  transform: translateX(2px);
}

/* ── Footer ── */
.err-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  font-size: 11px;
}

.err-footer-text {
  color: var(--v4-fg-3);
  letter-spacing: .06em;
}

.err-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: rgba(255, 255, 255, .35);
  text-decoration: none;
  letter-spacing: .05em;
  font-size: 11px;
  transition: color 0.15s;
}

.err-footer-link:hover {
  color: rgba(170, 220, 138, .8);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .err-inner {
    padding: 24px 20px;
  }

  .err-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 48px 0 40px;
  }

  .err-code {
    font-size: 80px;
    -webkit-text-stroke-width: 1px;
  }

  .err-title {
    font-size: 24px;
  }

  .err-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
