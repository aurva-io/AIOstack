<script setup lang="ts">
import '~~/assets/css/defense-landing.css'

const installCommand = 'curl -fsSL https://aurva.ai/install.sh | bash'
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
let copyReset: ReturnType<typeof setTimeout> | undefined

async function copyInstallCommand() {
  if (copyReset) clearTimeout(copyReset)
  try {
    await navigator.clipboard.writeText(installCommand)
    copyState.value = 'copied'
    copyReset = setTimeout(() => {
      copyState.value = 'idle'
    }, 2000)
  } catch {
    copyState.value = 'failed'
  }
}

onUnmounted(() => {
  if (copyReset) clearTimeout(copyReset)
})

const paused = ref(false)
const customers = ['yubi', 'meesho', 'slice', 'razorpay', 'nykaa', 'instacart']
const customerNames: Record<string, string> = {
  yubi: 'Yubi',
  meesho: 'Meesho',
  slice: 'slice',
  razorpay: 'Razorpay',
  nykaa: 'Nykaa',
  instacart: 'Instacart',
}
</script>

<template>
  <div class="df-page dark" :class="{ 'df-paused': paused }">
    <a class="df-skip" href="#main">Skip to content</a>
    <LandingNavbar />

    <main id="main">
      <section class="df-hero df-shell" aria-labelledby="hero-title">
        <div class="df-hero-copy">
          <h1 id="hero-title">Control what agents<br />do with your data.</h1>
          <p class="df-hero-description">
            Trace agents from the identities they use to the records they read
            and the models they call. Find shadow AI, investigate unexpected
            access, and block or redact sensitive data on protected requests.
          </p>
          <div class="df-install">
            <span aria-hidden="true">$</span>
            <code>{{ installCommand }}</code>
            <button
              type="button"
              aria-label="Copy installation command"
              @click="copyInstallCommand"
            >
              {{ copyState === 'copied' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <p class="df-copy-status" role="status">
            {{
              copyState === 'failed'
                ? 'Copy unavailable. Select and copy the command above.'
                : copyState === 'copied'
                  ? 'Installation command copied.'
                  : ''
            }}
          </p>
          <div class="df-actions">
            <NuxtLink to="/docs/getting-started/introduction" class="df-button">
              Install · 10 min <span aria-hidden="true">→</span>
            </NuxtLink>
            <a href="#technology" class="df-text-link">
              <span aria-hidden="true">↓</span> How it works
            </a>
          </div>
        </div>
        <div class="df-hero-visual">
          <LandingDefenseField :paused="paused" />
        </div>
        <div class="df-hero-bottom">
          <button
            type="button"
            class="df-motion-toggle"
            :aria-pressed="paused"
            @click="paused = !paused"
          >
            {{ paused ? 'Resume motion' : 'Pause motion' }}
          </button>
        </div>
      </section>

      <section
        class="df-trust df-shell"
        aria-label="Trusted by security and platform teams"
      >
        <p class="df-eyebrow">IN THE COMPANY OF AMBITIOUS TEAMS</p>
        <div class="df-customer-logos">
          <img
            v-for="customer in customers"
            :key="customer"
            :src="`/logos/${customer}.svg`"
            :alt="customerNames[customer]"
            loading="lazy"
            width="120"
            height="30"
          />
        </div>
      </section>

      <LandingDefenseComparison />

      <LandingAxon />

      <LandingDefenseCapabilities />

      <LandingFinalCTA class="df-restored-closing" />
    </main>

    <LandingFooter class="df-restored-footer" />
  </div>
</template>

<style scoped>
.df-restored-closing {
  margin-inline: 0;
}
.df-restored-footer :deep(.v4-footer-inner) {
  width: min(1120px, calc(100% - 160px));
  max-width: none;
  padding-inline: 0;
}
@media (min-width: 901px) {
  .df-restored-footer :deep(.v4-footer-grid) {
    grid-template-columns: minmax(180px, 1.6fr) repeat(4, minmax(0, 1fr));
    gap: 32px;
  }
}
@media (max-width: 1150px) {
  .df-restored-footer :deep(.v4-footer-inner) { width: calc(100% - 96px); }
}
@media (max-width: 700px) {
  .df-restored-footer :deep(.v4-footer-inner) { width: calc(100% - 40px); }
}
</style>
