<script setup lang="ts">
defineProps<{ paused: boolean }>()

// An abstract defense field, not a map of infrastructure or product internals.
const radius = 216
function project(latitude: number, longitude: number) {
  const x = radius * Math.cos(latitude) * Math.sin(longitude)
  const y = radius * Math.sin(latitude)
  const z = radius * Math.cos(latitude) * Math.cos(longitude)
  const tilt = -0.32
  return {
    x: 340 + x * Math.cos(tilt) - y * Math.sin(tilt),
    y: 340 + x * Math.sin(tilt) + y * Math.cos(tilt),
    z,
  }
}
function line(points: ReturnType<typeof project>[]) {
  return points
    .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ')
}
const meridians = Array.from({ length: 24 }, (_, n) =>
  line(
    Array.from({ length: 65 }, (_, i) =>
      project(-Math.PI / 2 + (i * Math.PI) / 64, (n * Math.PI) / 12),
    ),
  ),
)
const parallels = Array.from({ length: 17 }, (_, n) =>
  line(
    Array.from({ length: 97 }, (_, i) =>
      project(((n - 8) * Math.PI) / 18, (i * Math.PI) / 48),
    ),
  ),
)
const points = Array.from({ length: 125 }, (_, n) =>
  project(Math.asin(2 * ((n * 0.61803398875) % 1) - 1), n * 2.39996323),
).filter((p) => p.z > -20)
</script>

<template>
  <div
    class="df-field"
    :class="{ 'df-paused': paused }"
    role="img"
    aria-label="Illustrative defense field: signals converge on AXON and a suspicious outbound connection is intercepted."
  >
    <div class="df-aura" />
    <div class="df-sweep" />
    <svg class="df-globe" viewBox="0 0 680 680" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="df-globe-fill">
          <stop stop-color="#d7d7d7" stop-opacity=".015" />
          <stop offset=".76" stop-color="#d7d7d7" stop-opacity=".025" />
          <stop offset="1" stop-color="#d7d7d7" stop-opacity=".13" />
        </radialGradient>
        <linearGradient id="df-orbit-color">
          <stop stop-color="#d9d9d9" stop-opacity="0" />
          <stop offset=".5" stop-color="#d9d9d9" stop-opacity=".8" />
          <stop offset="1" stop-color="#d9d9d9" stop-opacity=".08" />
        </linearGradient>
      </defs>
      <path
        d="M340 24V104M340 576V656M24 340H104M576 340H656"
        stroke="#dfdfdf"
        stroke-opacity=".2"
      />
      <circle cx="340" cy="340" r="290" stroke="#dfdfdf" stroke-opacity=".09" />
      <circle
        cx="340"
        cy="340"
        r="269"
        stroke="#dfdfdf"
        stroke-opacity=".28"
        stroke-dasharray="1 10"
      />
      <g class="df-orbit">
        <circle
          cx="340"
          cy="340"
          r="254"
          stroke="#d9d9d9"
          stroke-opacity=".22"
          stroke-dasharray="80 220 2 70"
        />
        <circle cx="594" cy="340" r="3" fill="#eeeeee" />
      </g>
      <circle
        cx="340"
        cy="340"
        :r="radius"
        fill="url(#df-globe-fill)"
        stroke="#e2e2e2"
        stroke-opacity=".4"
      />
      <g stroke="#d9d9d9" stroke-width=".65" stroke-opacity=".22">
        <path v-for="(d, i) in meridians" :key="`m${i}`" :d="d" />
        <path v-for="(d, i) in parallels" :key="`p${i}`" :d="d" />
      </g>
      <g fill="#e7e7e7">
        <circle
          v-for="(p, i) in points"
          :key="i"
          :cx="p.x"
          :cy="p.y"
          :r="i % 7 === 0 ? 2.4 : 1"
          :opacity="i % 7 === 0 ? 0.9 : 0.35"
        />
      </g>
      <ellipse
        cx="340"
        cy="340"
        rx="310"
        ry="94"
        transform="rotate(-29 340 340)"
        stroke="url(#df-orbit-color)"
      />
      <ellipse
        cx="340"
        cy="340"
        rx="280"
        ry="104"
        transform="rotate(47 340 340)"
        stroke="#e2e2e2"
        stroke-opacity=".13"
      />
      <path
        class="df-traffic"
        d="M105 457Q280 255 543 230"
        stroke="#eeeeee"
        stroke-width="1.5"
        pathLength="100"
      />
      <path
        class="df-traffic df-traffic-two"
        d="M180 171Q420 297 485 519"
        stroke="#eeeeee"
        stroke-width="1.5"
        pathLength="100"
      />
      <path
        d="M505 91L454 185"
        stroke="#f7a28c"
        stroke-opacity=".45"
        stroke-dasharray="3 6"
      />
      <path
        class="df-threat"
        d="M505 91L454 185"
        stroke="#ffab94"
        stroke-width="2"
        pathLength="100"
      />
      <g transform="translate(454 185)">
        <circle class="df-intercept" r="17" stroke="#f5a48f" />
        <circle r="5" fill="#f5a48f" />
        <path d="M-4-4L4 4M4-4L-4 4" stroke="#141414" stroke-width="1.5" />
      </g>
      <g stroke="#eeeeee" stroke-opacity=".7">
        <path
          d="M319 295V284H330M350 284H361V295M319 317V328H330M350 328H361V317"
        />
        <path d="M331 311L340 292L349 311M335 305H345" stroke-width="1.3" />
      </g>
      <text
        x="340"
        y="361"
        text-anchor="middle"
        fill="#f3f3f3"
        font-size="28"
        letter-spacing="8"
        font-family="monospace"
      >
        AXON
      </text>
    </svg>
  </div>
</template>
