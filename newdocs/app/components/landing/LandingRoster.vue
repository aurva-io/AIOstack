<script setup lang="ts">
interface RosterEntry {
  name: string
  tag: string
  loc: string
  logo?: string
  textFallback?: boolean
}

const roster: RosterEntry[] = [
  { name: 'Yubi',             tag: 'finops',  loc: 'asia-south', logo: '/logos/yubi.svg' },
  { name: 'Meesho',          tag: 'd2c',     loc: 'asia-south', logo: '/logos/meesho.svg' },
  { name: 'slice',           tag: 'fin',     loc: 'asia-south', logo: '/logos/slice.svg' },
  { name: 'Razorpay',        tag: 'fin',     loc: 'asia-mixed', logo: '/logos/razorpay.svg' },
  { name: 'Nykaa',           tag: 'd2c',     loc: 'asia-south', logo: '/logos/nykaa.svg' },
  { name: 'Rapyuta',         tag: 'core',    loc: 'asia-east',  logo: '/logos/rapyuta.svg' },
  { name: 'R Systems',       tag: 'data',    loc: 'us-east',    logo: '/logos/rsi.svg' },
  { name: 'CansoAI',         tag: 'ml-hub',  loc: 'us-west',    logo: '/logos/canso.svg' },
  { name: 'Yugen AI',        tag: 'ml-hub',  loc: 'us-east',    logo: '/logos/yugen.svg' },
  { name: 'Instacart',       tag: 'eng',     loc: 'us-west',    logo: '/logos/instacart.svg' },
  { name: 'smallest.ai',    tag: 'ai',      loc: 'us-west',    textFallback: true },
  { name: 'WisdomAI',        tag: 'ai',      loc: 'us-east',    textFallback: true },
]
</script>

<template>
  <section class="v4-section v4-bordered v4-roster">
    <div class="v4-container">
      <div class="v4-roster-head">
        <div>
          <span class="v4-section-num">§ AIO · DEPLOYED AT</span>
          <h2 class="v4-roster-title">
            Security &amp; platform teams running AIOStack.
          </h2>
        </div>
        <div class="v4-roster-meta">
          <div>
            <span class="v4-mono v4-mono-dim">deploy</span>
            <span>self-hosted · saas · in-vpc</span>
          </div>
          <div>
            <span class="v4-mono v4-mono-dim">since</span>
            <span>2025</span>
          </div>
        </div>
      </div>

      <div class="v4-logo-grid">
        <div v-for="r in roster" :key="r.name" class="v4-logo-cell">
          <div class="v4-logo-top">
            <img v-if="r.logo" :src="r.logo" :alt="r.name" class="v4-logo-img" />
            <span v-else class="v4-logo-text">{{ r.name }}</span>
          </div>
          <div class="v4-logo-tags">
            <span class="v4-sig">{{ r.tag }}</span>
            <span class="v4-sig">{{ r.loc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v4-logo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 40px;
}

.v4-logo-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: calc((100% - 4px * 5) / 6);
  height: 88px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.02);
  padding: 14px 16px 10px;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.v4-logo-top {
  display: flex;
  align-items: center;
  flex: 1;
}

.v4-logo-tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.v4-logo-cell:hover {
  border-color: rgba(255,255,255,.18);
  background: rgba(255,255,255,.04);
}

.v4-logo-img {
  height: 28px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.65;
  transition: opacity 0.15s;
}

.v4-logo-cell:hover .v4-logo-img {
  opacity: 0.9;
}

.v4-logo-text {
  font-family: var(--v4-mono);
  font-size: 12px;
  color: rgba(255,255,255,.55);
  letter-spacing: .06em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .v4-logo-cell {
    width: calc((100% - 4px * 3) / 4);
  }
}

@media (max-width: 600px) {
  .v4-logo-cell {
    width: calc((100% - 4px * 2) / 3);
  }
}

@media (max-width: 400px) {
  .v4-logo-cell {
    width: calc((100% - 4px) / 2);
  }
}
</style>
