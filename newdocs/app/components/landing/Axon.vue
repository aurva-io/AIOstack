<script setup lang="ts">
// Abstract signal illustration: no internal topology or detection logic.
const strands = Array.from({ length: 33 }, (_, i) => {
  const group = Math.floor(i / 11)
  const spread = ((i % 11) - 5) * 5
  const y = 110 + group * 140 + spread
  return {
    path: `M145 ${y} C275 ${y}, 325 ${250 + spread * 2}, 447 ${250 + spread * 0.35}`,
    opacity: 0.12 + (i % 4) * 0.07,
    delay: `${-i * 0.37}s`,
  }
})
const decisions = [
  { y: 110, label: 'Investigate', path: 'M453 250C570 250 580 110 716 110' },
  { y: 250, label: 'Enforce', path: 'M453 250H716' },
  { y: 390, label: 'Substantiate', path: 'M453 250C570 250 580 390 716 390' },
]
</script>

<template>
  <section id="technology" class="axon-section" aria-labelledby="axon-title">
    <div class="df-shell">
      <div class="axon-composition">
        <div class="axon-copy">
          <h2 id="axon-title">AXON<span>.</span></h2>
          <p class="axon-name">Aurva eXplainability and Observation Network</p>
          <p class="axon-description">
            One connected record of who acted, what they accessed, and which
            policy applied.
          </p>
          <a href="#capabilities" class="df-text-link">Explore the capabilities</a>
        </div>

        <figure class="axon-visual">
          <svg
            viewBox="0 0 860 500"
            fill="none"
            role="img"
            aria-labelledby="axon-graphic-title axon-graphic-desc"
          >
            <title id="axon-graphic-title">
              Separate signals. Connected intelligence.
            </title>
            <desc id="axon-graphic-desc">
              An abstract illustration of agent, identity, and data signals
              converging through AXON, then supporting investigation,
              enforcement, and evidence.
            </desc>
            <defs>
              <radialGradient id="axon-focus-light">
                <stop stop-color="#e6e8ef" stop-opacity=".13" />
                <stop offset="1" stop-color="#e6e8ef" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="axon-fiber-light">
                <stop stop-color="#e6e8ef" stop-opacity=".08" />
                <stop offset=".85" stop-color="#e6e8ef" stop-opacity=".7" />
                <stop offset="1" stop-color="#fff" />
              </linearGradient>
              <linearGradient id="axon-lens-light" x1="0" y1="0" x2="1" y2="0">
                <stop stop-color="#fff" stop-opacity=".08" />
                <stop offset=".5" stop-color="#fff" stop-opacity=".8" />
                <stop offset="1" stop-color="#fff" stop-opacity=".1" />
              </linearGradient>
            </defs>
            <ellipse
              cx="450"
              cy="250"
              rx="205"
              ry="210"
              fill="url(#axon-focus-light)"
            />
            <g stroke="#ffffff" stroke-opacity=".045">
              <path
                d="M145 40V460M300 40V460M450 40V460M600 40V460M716 40V460"
              />
              <path d="M130 110H735M130 250H735M130 390H735" />
            </g>
            <g v-for="(strand, i) in strands" :key="i">
              <path
                :d="strand.path"
                stroke="url(#axon-fiber-light)"
                :opacity="strand.opacity"
              />
              <path
                v-if="i % 4 === 0"
                :d="strand.path"
                class="axon-signal"
                pathLength="100"
                stroke="#e8eaf0"
                stroke-width="1.2"
                :style="{ animationDelay: strand.delay }"
              />
            </g>
            <g
              class="axon-lens"
              stroke="url(#axon-lens-light)"
              stroke-width=".8"
            >
              <ellipse
                v-for="i in 19"
                :key="i"
                cx="450"
                cy="250"
                :rx="6 + i * 2.8"
                :ry="112 - i * 1.6"
                :transform="`rotate(${(i - 10) * 3} 450 250)`"
                :opacity="0.22 + (i % 5) * 0.12"
              />
            </g>
            <path d="M450 206V294" stroke="#f3f4f8" stroke-width="1.3" />
            <circle cx="450" cy="250" r="4" fill="#f3f4f8" />
            <g v-for="(decision, i) in decisions" :key="decision.label">
              <path :d="decision.path" stroke="#d4d6de" stroke-opacity=".22" />
              <path
                :d="decision.path"
                class="axon-signal axon-decision-signal"
                pathLength="100"
                :stroke="i === 1 ? '#dba79b' : '#e8eaf0'"
                :style="{ animationDelay: `${-i * 2}s` }"
              />
              <circle
                cx="716"
                :cy="decision.y"
                r="4"
                :fill="i === 1 ? '#dba79b' : '#c9cbd2'"
              />
              <circle
                cx="716"
                :cy="decision.y"
                r="11"
                :stroke="i === 1 ? '#dba79b' : '#c9cbd2'"
                stroke-opacity=".25"
              />
              <text x="740" :y="decision.y + 5" fill="#c6c7cc" font-size="14">
                {{ decision.label }}
              </text>
            </g>
            <g fill="#b6b7be" font-size="14">
              <text x="18" y="115">Agents &amp; models</text>
              <text x="18" y="255">Identity</text>
              <text x="18" y="395">Data</text>
            </g>
            <g stroke="#8b8d98" stroke-opacity=".5">
              <path d="M440 72H460M450 62V82M440 428H460M450 418V438" />
            </g>
          </svg>
          <figcaption>
            <span>Separate signals.</span><span>Connected intelligence.</span>
          </figcaption>
        </figure>
      </div>

      <div class="axon-principles">
        <article>
          <h3>Grounded in execution.</h3>
          <p>
            Discover AI from its runtime activity, including the systems outside
            your approved inventory.
          </p>
        </article>
        <article>
          <h3>Connected by context.</h3>
          <p>
            Bring behavior, identity, and data exposure together to make
            isolated events meaningful.
          </p>
        </article>
        <article>
          <h3>Accountable in action.</h3>
          <p>
            Apply policy to protected traffic and retain the evidence behind
            each security decision.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.axon-section {
  padding: 88px 0 64px;
  border-block: 1px solid var(--df-line);
  background: #0b0c0f;
}
.axon-composition {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.6fr);
  align-items: center;
  gap: 42px;
}
.axon-copy h2 {
  font-size: clamp(44px, 4.4vw, 62px);
  letter-spacing: -0.055em;
  line-height: 1;
}
.axon-copy h2 span {
  color: #888b95;
}
.axon-copy .axon-name {
  margin-top: 16px;
  max-width: 280px;
  color: #a6a8b0;
  font-size: 14px;
  line-height: 1.65;
}
.axon-copy .axon-description {
  color: #a6a8b0;
  margin-top: 20px;
  font-size: 15px;
  line-height: 1.8;
  max-width: 345px;
}
.axon-copy .df-text-link {
  margin-top: 25px;
  font-size: 12px;
}
.axon-visual {
  margin: 0 -22px 0 0;
  min-width: 0;
}
.axon-visual svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  font-family: var(--v4-sans);
}
.axon-visual figcaption {
  display: flex;
  justify-content: space-between;
  margin: 0 5% 0 17%;
  padding-top: 20px;
  border-top: 1px solid #ffffff12;
  font-size: 12px;
  color: #8d909b;
}
.axon-visual figcaption span:last-child {
  color: #d0d2d9;
}
.axon-signal {
  stroke-dasharray: 4 96;
  animation: axon-signal-flow 7s linear infinite;
}
.axon-decision-signal {
  stroke-dasharray: 6 94;
  animation-duration: 6s;
}
.axon-principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 54px;
  margin-top: 70px;
  border-top: 1px solid var(--df-line);
  padding-top: 30px;
}
.axon-principles h3 {
  font-size: 19px;
  letter-spacing: -0.02em;
}
.axon-principles p {
  margin-top: 12px;
  color: #9d9fa8;
  font-size: 14px;
  line-height: 1.75;
  max-width: 325px;
}
@keyframes axon-signal-flow {
  to {
    stroke-dashoffset: -100;
  }
}
@media (max-width: 1000px) {
  .axon-composition {
    grid-template-columns: minmax(220px, 0.85fr) minmax(0, 1.3fr);
    gap: 24px;
  }
  .axon-visual {
    margin-right: 0;
  }
  .axon-principles {
    gap: 30px;
  }
}
@media (max-width: 760px) {
  .axon-section {
    padding-block: 56px 44px;
  }
  .axon-composition {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .axon-copy .axon-name {
    max-width: none;
    font-size: 13px;
  }
  .axon-copy .axon-description {
    max-width: 480px;
    margin-top: 16px;
  }
  .axon-visual {
    margin: 0;
  }
  .axon-visual figcaption {
    margin-inline: 0;
    font-size: 11px;
    padding-top: 12px;
  }
  .axon-principles {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 40px;
    padding-top: 26px;
  }
  .axon-principles p {
    max-width: none;
    margin-top: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .axon-signal {
    animation: none;
  }
}
</style>
