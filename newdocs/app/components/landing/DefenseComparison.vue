<script setup lang="ts">
const fibers = Array.from({ length: 9 }, (_, i) => ({
  left: `M250 ${190 + i * 5}C315 ${190 + i * 5} 350 ${205 + i * 2} 395 ${205 + i * 2}`,
  right: `M605 ${205 + i * 2}C650 ${205 + i * 2} 685 ${190 + i * 5} 750 ${190 + i * 5}`,
}))
</script>

<template>
  <section id="platform" class="defense-context df-shell" aria-labelledby="context-title">
    <div class="context-intro">
      <h2 id="context-title">Control the paths you know.<br />See the ones you don’t.</h2>
      <p>Apply policy to traffic routed through Aurva. Observe agent activity beyond that path. Bring both together to find exposed data and decide where to act.</p>
    </div>

    <figure class="defense-flow" aria-labelledby="flow-caption">
      <figcaption id="flow-caption"><span>Inline control. Runtime visibility.</span><span>Illustrative architecture</span></figcaption>
      <div class="flow-stage">
        <svg class="flow-connections" viewBox="0 0 1000 600" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="platform-core-glow"><stop stop-color="#ffffff" stop-opacity=".075"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
            <linearGradient id="platform-fiber"><stop stop-color="#bdbdbd" stop-opacity=".1"/><stop offset=".5" stop-color="#dedede" stop-opacity=".5"/><stop offset="1" stop-color="#bdbdbd" stop-opacity=".1"/></linearGradient>
          </defs>
          <ellipse cx="500" cy="215" rx="205" ry="180" fill="url(#platform-core-glow)"/>
          <g stroke="#ffffff04"><path d="M125 45V565M500 45V565M875 45V565M30 215H970M30 390H970"/></g>
          <g stroke="url(#platform-fiber)"><template v-for="(fiber, i) in fibers" :key="i"><path :d="fiber.left"/><path :d="fiber.right"/></template></g>
          <path class="flow-packet" pathLength="100" d="M250 210C315 210 350 213 395 213"/>
          <path class="flow-packet flow-outbound" pathLength="100" d="M605 213C650 213 685 210 750 210"/>
          <path class="flow-bypass" d="M125 155C125 20 875 20 875 155"/>
          <path class="flow-packet flow-shadow" pathLength="100" d="M125 155C125 20 875 20 875 155"/>
          <g stroke="#ffffff13"><circle cx="500" cy="215" r="105"/><circle cx="500" cy="215" r="117"/></g>
          <circle class="flow-core-orbit" cx="500" cy="215" r="117" stroke="#cfcfcf" stroke-opacity=".4" stroke-dasharray="24 711"/>
          <path class="flow-observe" d="M125 305V345Q125 375 155 375H845Q875 375 875 345V305M500 333V375M235 375V440"/>
          <path class="flow-packet flow-telemetry" pathLength="100" d="M875 305V345Q875 375 845 375H235V440"/>
          <path class="flow-wire" d="M470 515H530"/>
          <path class="flow-packet" pathLength="100" d="M470 515H530"/>
          <path class="flow-observe" d="M765 440V412Q765 395 745 395H525Q500 395 500 375"/>
          <g fill="#bdbdbd"><circle cx="125" cy="305" r="2"/><circle cx="875" cy="305" r="2"/><circle cx="500" cy="375" r="2"/></g>
        </svg>

        <div class="flow-route-label"><span />Activity outside the inline path</div>
        <div class="flow-node flow-origin">
          <h3>Agents &amp; applications</h3>
          <div class="flow-source"><span>Support agent</span><i aria-hidden="true" /></div>
          <div class="flow-source"><span>Internal automation</span><i aria-hidden="true" /></div>
        </div>
        <div class="flow-control">
          <span class="flow-core-label">Aurva</span>
          <p>Policy enforcement</p>
          <div class="flow-controls"><span>Allow</span><span>Redact</span><span>Block</span></div>
        </div>
        <div class="flow-node flow-destination">
          <h3>Models &amp; providers</h3>
          <div class="flow-source"><span>Model APIs</span><i aria-hidden="true" /></div>
          <div class="flow-source"><span>External services</span><i aria-hidden="true" /></div>
        </div>
        <div class="flow-node flow-runtime">
          <div class="flow-node-heading"><h3>Runtime observation</h3><span class="flow-live">Observing both paths</span></div>
          <p>Connect activity to the identity, data, and destination behind it.</p>
          <div class="flow-record"><span>Unregistered agent</span><span>Sensitive data</span><span>External model</span></div>
        </div>
        <div class="flow-node flow-response">
          <h3>A finding you can act on.</h3>
          <p>Investigate exposure, inform policy, and keep the evidence together.</p>
          <div class="flow-response-record"><span class="flow-record-line" aria-hidden="true"/><span>Activity</span><span>Decision</span><span>Evidence</span></div>
        </div>
      </div>
    </figure>
  </section>
</template>

<style scoped>
.defense-context { padding-block: 104px 88px; }
.context-intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: start; }
.context-intro h2 { font-size: clamp(30px, 3vw, 42px); line-height: 1.16; letter-spacing: -.04em; text-wrap: balance; }
.context-intro p { color: #a5a5a5; font-size: 16px; line-height: 1.75; text-wrap: pretty; }
.defense-flow { margin: 44px 0 0; padding: 0 26px 30px; background: linear-gradient(150deg, #ffffff04, transparent 65%), #0b0b0b; border: 1px solid #ffffff17; border-radius: 12px; }
.defense-flow figcaption { display: flex; justify-content: space-between; gap: 16px; padding-block: 20px; border-bottom: 1px solid #ffffff0e; color: #b0b0b0; font-size: 11px; }
.defense-flow figcaption > span:last-child { color: #777; font-size: 10px; }
.flow-stage { position: relative; aspect-ratio: 1000 / 600; }
.flow-connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.flow-wire { stroke: #ffffff30; }
.flow-observe { stroke: #ffffff30; stroke-dasharray: 3 6; }
.flow-bypass { stroke: #ffffff35; stroke-dasharray: 3 7; }
.flow-packet { stroke: #e0e0e0; stroke-width: 1.5; stroke-dasharray: 5 95; animation: flow-travel 6s linear infinite; }
.flow-outbound { animation-delay: -3s; }
.flow-shadow { stroke: #b4b4b4; animation-duration: 9s; }
.flow-telemetry { animation-duration: 10s; animation-delay: -5s; }
.flow-core-orbit { transform-origin: 500px 215px; animation: flow-orbit 24s linear infinite; }
.flow-route-label { position: absolute; top: 4.5%; left: 25%; width: 50%; display: flex; justify-content: center; align-items: center; gap: 8px; color: #888; font-size: 10px; }
.flow-route-label > span { width: 16px; border-top: 1px dashed #999; }
.flow-node { position: absolute; padding: 20px; border: 1px solid #ffffff21; background: linear-gradient(145deg, #ffffff05, transparent), #101010; border-radius: 8px; }
.flow-node h3 { font-size: 16px; letter-spacing: -.025em; line-height: 1.3; }
.flow-node p { margin-top: 11px; color: #9c9c9c; font-size: 12px; line-height: 1.65; }
.flow-origin { left: 0; top: 25.83%; width: 25%; min-height: 25%; }
.flow-destination { right: 0; top: 25.83%; width: 25%; min-height: 25%; }
.flow-source { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-top: 12px; color: #929292; font-size: 11px; }
.flow-source + .flow-source { border-top: 1px solid #ffffff0c; margin-top: 12px; }
.flow-source i { width: 4px; height: 4px; border-radius: 50%; background: #aaa; box-shadow: 0 0 7px #ffffff28; }
.flow-control { position: absolute; left: 39.5%; top: 18.33%; width: 21%; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: radial-gradient(circle at 40% 30%, #ffffff0c, #101010 72%); border: 1px solid #ffffff25; box-shadow: inset 0 1px 20px #ffffff05; }
.flow-core-label { color: #e3e3e3; font-size: 29px; letter-spacing: -.045em; }
.flow-control p { margin-top: 7px; color: #999; font-size: 11px; }
.flow-controls { display: flex; gap: 10px; margin-top: 20px; color: #b6b6b6; font-size: 10px; }
.flow-controls span + span { border-left: 1px solid #ffffff20; padding-left: 10px; }
.flow-runtime { left: 0; top: 73.33%; width: 47%; min-height: 26.67%; }
.flow-response { right: 0; top: 73.33%; width: 47%; min-height: 26.67%; }
.flow-node-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.flow-live { color: #8e8e8e; font-size: 9px; }
.flow-record { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 19px; }
.flow-record > span { border: 1px solid #ffffff17; padding: 5px 7px; border-radius: 4px; color: #aaa; background: #ffffff03; font-size: 9px; }
.flow-response-record { position: relative; display: flex; justify-content: space-between; gap: 12px; padding-top: 19px; margin-top: 10px; }
.flow-response-record > span:not(.flow-record-line) { position: relative; color: #aaa; font-size: 10px; }
.flow-response-record > span:not(.flow-record-line)::before { content: ''; position: absolute; top: -13px; left: 0; width: 4px; height: 4px; border-radius: 50%; background: #bdbdbd; }
.flow-record-line { position: absolute; top: 8px; left: 0; right: 0; height: 1px; background: #ffffff20; }
@keyframes flow-travel { to { stroke-dashoffset: -100; } }
@keyframes flow-orbit { to { transform: rotate(360deg); } }
@media (max-width: 1050px) {
  .context-intro { gap: 32px; }
  .defense-flow { padding-inline: 20px; padding-bottom: 40px; }
  .flow-stage { aspect-ratio: 1000 / 650; }
  .flow-connections { height: 92.31%; }
  .flow-origin, .flow-destination { top: 23.85%; }
  .flow-control { top: 16.92%; }
  .flow-runtime, .flow-response { top: 67.69%; }
  .flow-node { padding: 16px; }
  .flow-node-heading { flex-direction: column; gap: 5px; }
  .flow-node h3 { font-size: 14px; }
  .flow-core-label { font-size: 25px; }
  .flow-controls { gap: 6px; font-size: 9px; margin-top: 12px; }
  .flow-controls span + span { padding-left: 6px; }
}
@media (max-width: 760px) {
  .defense-context { padding-block: 64px; }
  .context-intro { grid-template-columns: 1fr; gap: 20px; }
  .context-intro p { font-size: 15px; }
  .defense-flow { margin-top: 32px; padding: 0 20px 24px; }
  .defense-flow figcaption { flex-direction: column; gap: 6px; }
  .flow-stage { display: grid; grid-template-columns: 1fr; gap: 24px; aspect-ratio: auto; margin-top: 24px; border-left: 1px dashed #ffffff22; padding-left: 20px; }
  .flow-connections, .flow-route-label { display: none; }
  .flow-node, .flow-control { position: relative; inset: auto; width: auto; min-height: 0; padding: 20px; }
  .flow-node h3 { font-size: 17px; }
  .flow-control { width: 180px; justify-self: center; }
  .flow-node:not(:last-child)::after, .flow-control::after { content: ''; position: absolute; bottom: -25px; left: 50%; height: 24px; border-left: 1px solid #ffffff35; }
  .flow-runtime::before { content: ''; width: 21px; position: absolute; left: -21px; top: 50%; border-top: 1px dashed #ffffff40; }
  .flow-runtime .flow-live { font-size: 10px; }
  .flow-controls { font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) { .flow-packet, .flow-core-orbit { animation: none; } .flow-packet { stroke-dasharray: none; opacity: .3; } }
</style>
