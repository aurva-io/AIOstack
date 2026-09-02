<script setup lang="ts">
interface RosterEntry {
  name: string
  logo?: string
}

const roster: RosterEntry[] = [
  { name: 'Yubi', logo: '/logos/yubi.svg' },
  { name: 'Meesho', logo: '/logos/meesho.svg' },
  { name: 'slice', logo: '/logos/slice.svg' },
  { name: 'Razorpay', logo: '/logos/razorpay.svg' },
  { name: 'Nykaa', logo: '/logos/nykaa.svg' },
  { name: 'Rapyuta', logo: '/logos/rapyuta.svg' },
  { name: 'R Systems', logo: '/logos/rsi.svg' },
  { name: 'CansoAI', logo: '/logos/canso.svg' },
  { name: 'Yugen AI', logo: '/logos/yugen.svg' },
  { name: 'Instacart', logo: '/logos/instacart.svg' },
  { name: 'smallest.ai' },
  { name: 'WisdomAI' },
]
</script>

<template>
  <section class="v4-section v4-bordered v4-roster">
    <div class="v4-container">
      <div class="v4-roster-head">
        <div>
          <h2 class="v4-roster-title">
            Trusted by security and platform teams.
          </h2>
        </div>
      </div>

      <div class="v4-logo-grid">
        <div v-for="r in roster" :key="r.name" class="v4-logo-cell">
          <img v-if="r.logo" :src="r.logo" :alt="r.name" class="v4-logo-img" />
          <span v-else class="v4-logo-text">{{ r.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v4-roster-head {
  display: block;
  padding-bottom: 0;
  border-bottom: 0;
  text-align: center;
}

.v4-roster-title {
  max-width: none;
  margin: 0 auto;
  font-size: clamp(30px, 3vw, 40px);
  line-height: 1.16;
  letter-spacing: -.022em;
}

.v4-logo-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  margin-top: 32px;
  border-top: 1px solid rgba(255,255,255,.1);
  border-left: 1px solid rgba(255,255,255,.1);
}

.v4-logo-cell {
  display: flex;
  min-width: 0;
  height: 108px;
  align-items: center;
  justify-content: center;
  padding: 22px;
  border-right: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.008);
  transition: background .15s, border-color .15s;
  box-sizing: border-box;
}

.v4-logo-cell:hover {
  border-color: rgba(255,255,255,.18);
  background: rgba(255,255,255,.025);
}

.v4-logo-img {
  height: 30px;
  width: auto;
  max-width: 82%;
  max-height: 34px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: .62;
  transition: opacity 0.15s;
}

.v4-logo-cell:hover .v4-logo-img {
  opacity: 0.9;
}

.v4-logo-text {
  font-family: var(--v4-sans);
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,.62);
  letter-spacing: -.01em;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .v4-logo-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .v4-roster-title {
    font-size: 28px;
  }

  .v4-logo-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .v4-logo-cell {
    height: 88px;
    padding: 16px;
  }
}

@media (max-width: 400px) {
  .v4-logo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
