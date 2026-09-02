<script setup lang="ts">
withDefaults(defineProps<{
  titleLines?: string[]
  copy?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryHref?: string
}>(), {
  titleLines: () => ['Agentic AI is already here.', 'Bring it under control.'],
  copy: 'Discover every AI system, understand every action, and enforce policy before risk becomes impact. Zero friction. Zero code changes.',
  primaryLabel: 'Install in 10 mins',
  primaryTo: '/docs/getting-started/introduction',
  secondaryLabel: 'Contact sales',
  secondaryHref: '/contact/sales',
})
</script>

<template>
  <section class="v4-closing">
    <div class="v4-closing-field" aria-hidden="true" />
    <div class="v4-closing-inner">
      <h2 class="v4-closing-title">
        <template v-for="(line, index) in titleLines" :key="line">
          {{ line }}<br v-if="index < titleLines.length - 1">
        </template>
      </h2>
      <p class="v4-closing-copy">{{ copy }}</p>
      <div class="v4-closing-actions">
        <NuxtLink class="v4-closing-button v4-closing-button-primary" :to="primaryTo">
          {{ primaryLabel }}
        </NuxtLink>
        <a class="v4-closing-button v4-closing-button-secondary" :href="secondaryHref">
          {{ secondaryLabel }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v4-closing {
  position: relative;
  margin-inline: -24px;
  min-height: 520px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
  background: #08090b;
}

.v4-closing-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 42%, rgba(255,255,255,.055), transparent 32%),
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: auto, 40px 40px, 40px 40px;
  mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent);
  opacity: .65;
}

.v4-closing-inner {
  position: relative;
  z-index: 1;
  width: min(960px, calc(100% - 48px));
  padding: 96px 0;
  text-align: center;
}

.v4-closing-title {
  margin: 0;
  color: var(--v4-fg);
  font-family: var(--v4-sans);
  font-size: clamp(44px, 5.8vw, 64px);
  font-weight: 500;
  line-height: 1.03;
  letter-spacing: -.035em;
  text-wrap: balance;
}

.v4-closing-copy {
  max-width: 620px;
  margin: 28px auto 0;
  color: var(--v4-fg-2);
  font-family: var(--v4-sans);
  font-size: 17px;
  line-height: 1.55;
  text-wrap: pretty;
}

.v4-closing-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}

.v4-closing-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 24px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 0;
  font-family: var(--v4-sans);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color .15s, background .15s, color .15s;
}

.v4-closing-button-primary {
  color: #08090b;
  background: rgba(255,255,255,.94);
  border-color: rgba(255,255,255,.94);
}

.v4-closing-button-primary:hover {
  background: #fff;
  border-color: #fff;
}

.v4-closing-button-secondary {
  color: rgba(255,255,255,.88);
  background: rgba(255,255,255,.045);
}

.v4-closing-button-secondary:hover {
  color: #fff;
  border-color: rgba(255,255,255,.3);
  background: rgba(255,255,255,.07);
}

@media (max-width: 768px) {
  .v4-closing {
    margin-inline: -10px;
    min-height: 440px;
  }

  .v4-closing-inner {
    width: min(100% - 32px, 680px);
    padding: 72px 0;
  }

  .v4-closing-title {
    font-size: clamp(36px, 10vw, 52px);
  }

  .v4-closing-copy {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .v4-closing {
    margin-inline: -6px;
  }

  .v4-closing-actions {
    flex-direction: column;
  }
}
</style>
