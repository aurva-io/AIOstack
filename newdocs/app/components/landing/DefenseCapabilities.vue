<template>
  <section id="capabilities" class="defense-capabilities df-shell" aria-labelledby="capabilities-title">
    <div class="capabilities-heading">
      <h2 id="capabilities-title">See what’s running.<br />Control what happens.</h2>
      <span>Illustrative workflows</span>
    </div>
    <div class="capability-grid">
      <article class="capability-card">
        <figure class="capability-art discovery-art" aria-label="Runtime signals connect an agent to its identity, data, and model destination.">
          <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <defs><radialGradient id="discovery-halo"><stop stop-color="#c5c5c5" stop-opacity=".11"/><stop offset="1" stop-color="#c5c5c5" stop-opacity="0"/></radialGradient></defs>
            <circle cx="160" cy="112" r="106" fill="url(#discovery-halo)"/>
            <g stroke="#ffffff0c"><circle cx="160" cy="112" r="48"/><circle cx="160" cy="112" r="80"/><path d="M20 112H300M160 20V205"/></g>
            <circle class="discovery-scan" cx="160" cy="112" r="42" stroke="#bcbcbc" stroke-opacity=".5"/>
            <g stroke="#b6b6b6" stroke-opacity=".3"><path d="M160 112L65 58M160 112L255 58M160 112V178"/></g>
            <g class="signal-path" stroke="#dedede" stroke-width="1.5" stroke-dasharray="5 95"><path pathLength="100" d="M65 58L160 112"/><path pathLength="100" d="M255 58L160 112"/><path pathLength="100" d="M160 178V112"/></g>
            <g fill="#161616" stroke="#757575"><rect x="127" y="96" width="66" height="32" rx="5"/><circle cx="65" cy="58" r="5"/><circle cx="255" cy="58" r="5"/><circle cx="160" cy="178" r="5"/></g>
            <g class="art-text"><text x="160" y="116" text-anchor="middle" fill="#e4e4e4">Agent</text><text x="65" y="40" text-anchor="middle">Identity</text><text x="255" y="40" text-anchor="middle">Data</text><text x="160" y="204" text-anchor="middle">Model destination</text></g>
          </svg>
          <figcaption><span class="art-status" />Activity discovered. Context connected.</figcaption>
        </figure>
        <div class="capability-copy">
          <h3>Discover the unseen.</h3>
          <p>Find agents and AI services from their runtime activity. See the identities they use, the data they touch, and the destinations you didn’t know about.</p>
          <NuxtLink to="/docs/getting-started/introduction">Explore discovery</NuxtLink>
        </div>
      </article>

      <article class="capability-card">
        <figure class="capability-art protection-art" aria-label="A sensitive field is redacted as an AI request passes through a policy boundary.">
          <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <defs><linearGradient id="policy-light"><stop stop-color="#cdcdcd" stop-opacity="0"/><stop offset=".5" stop-color="#cdcdcd" stop-opacity=".6"/><stop offset="1" stop-color="#cdcdcd" stop-opacity="0"/></linearGradient></defs>
            <path d="M15 112H305" stroke="#ffffff1c"/>
            <path class="signal-path" d="M15 112H305" pathLength="100" stroke="#dedede" stroke-width="1.5" stroke-dasharray="6 94"/>
            <rect x="32" y="66" width="104" height="94" rx="5" fill="#141414" stroke="#ffffff2c"/>
            <rect x="184" y="66" width="104" height="94" rx="5" fill="#141414" stroke="#ffffff2c"/>
            <g stroke="#a4a4a4" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"><path d="M47 85H114M47 99H95M199 85H266M199 99H247M47 143H100M199 143H252"/></g>
            <rect x="45" y="113" width="77" height="16" rx="2" fill="#8a8a8a20" stroke="#96969655"/>
            <text x="83" y="124" text-anchor="middle" fill="#adadad" class="art-text">Sensitive field</text>
            <rect class="redacted-field" x="197" y="113" width="77" height="16" rx="2" fill="#b4b4b424"/>
            <path class="redaction-bars" d="M204 121H212M217 121H225M230 121H238M243 121H251M256 121H264" stroke="#b8b8b8" stroke-width="4"/>
            <path d="M160 30V191" stroke="url(#policy-light)"/>
            <rect class="policy-pulse" x="153" y="83" width="14" height="58" rx="7" fill="#cbcbcb15"/>
            <g class="art-text" text-anchor="middle"><text x="84" y="45">Request</text><text x="236" y="45">Protected output</text><text x="160" y="207">Policy boundary</text></g>
          </svg>
          <figcaption><span class="art-status" />Sensitive fields redacted before sending.</figcaption>
        </figure>
        <div class="capability-copy">
          <h3>Protect what matters.</h3>
          <p>Turn identity and data context into control. Block unsafe requests or redact sensitive content on protected traffic before it reaches the wrong destination.</p>
          <NuxtLink to="/contact/engineering">Explore enforcement</NuxtLink>
        </div>
      </article>

      <article class="capability-card">
        <figure class="capability-art evidence-art" aria-label="Observed activity, a policy decision, and supporting evidence form a connected investigation record.">
          <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <path d="M47 48V177" stroke="#ffffff25"/>
            <path class="evidence-trace" d="M47 48V177" pathLength="100" stroke="#cacaca" stroke-width="1.4" stroke-dasharray="30 70"/>
            <g v-for="(item, index) in ['Activity observed', 'Policy applied', 'Evidence linked']" :key="item" class="evidence-entry" :style="{ '--entry': index }">
              <circle cx="47" :cy="51 + index * 60" r="4" fill="#b7b7b7"/>
              <rect x="67" :y="31 + index * 60" width="216" height="42" rx="4" fill="#141414" stroke="#ffffff20"/>
              <text x="82" :y="56 + index * 60" class="art-text" fill="#cdcdcd">{{ item }}</text>
              <path :d="`M246 ${51 + index * 60}h19`" stroke="#b7b7b7" stroke-opacity=".6"/>
            </g>
          </svg>
          <figcaption><span class="art-status" />One traceable record, from action to outcome.</figcaption>
        </figure>
        <div class="capability-copy">
          <h3>Explain every decision.</h3>
          <p>Bring the agent, identity, data, and policy into one investigation. Give security and compliance teams the evidence behind what happened and how you responded.</p>
          <NuxtLink to="/contact/sales">Explore investigation</NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.defense-capabilities { padding-block: 96px 88px; }
.capabilities-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 42px; }
.capabilities-heading h2 { font-size: clamp(32px, 3.2vw, 44px); letter-spacing: -.045em; line-height: 1.15; }
.capabilities-heading > span { color: #7e7e7e; font-size: 11px; padding-bottom: 4px; }
.capability-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.capability-card { min-width: 0; display: flex; flex-direction: column; border: 1px solid #ffffff1a; border-radius: 10px; overflow: hidden; background: linear-gradient(145deg, #ffffff04, transparent 65%), #0f0f0f; transition: border-color .25s; }
.capability-card:hover { border-color: #ffffff40; }
.capability-art { margin: 0; position: relative; border-bottom: 1px solid #ffffff12; background: radial-gradient(ellipse at 50% 50%, #b2b2b207, transparent 70%); }
.capability-art svg { display: block; width: 100%; height: auto; }
.art-text { font-family: var(--v4-sans); font-size: 10px; fill: #999999; }
.capability-art figcaption { display: flex; align-items: center; gap: 7px; color: #9a9a9a; font-size: 9px; line-height: 1.5; margin: 0 20px; padding-block: 13px; border-top: 1px solid #ffffff09; }
.art-status { width: 4px; height: 4px; border-radius: 50%; background: #b3b3b3; box-shadow: 0 0 8px #b3b3b350; flex-shrink: 0; }
.capability-copy { display: flex; flex: 1; flex-direction: column; padding: 26px 24px; }
.capability-copy h3 { font-size: 23px; line-height: 1.2; letter-spacing: -.03em; }
.capability-copy p { margin-top: 16px; margin-bottom: 24px; color: #a5a5a5; font-size: 14px; line-height: 1.75; }
.capability-copy a { align-self: flex-start; margin-top: auto; padding-block: 5px; font-size: 12px; color: #d8d8d8; border-bottom: 1px solid #ffffff26; }
.capability-copy a:hover { color: white; border-color: #ffffff80; }
.signal-path { animation: card-signal 6s linear infinite; }
.discovery-scan { transform-origin: 160px 112px; animation: discovery-scan 6s ease-out infinite; }
.policy-pulse { animation: policy-pulse 6s ease-in-out infinite; }
.redaction-bars { animation: redact 6s ease-in-out infinite; }
.evidence-trace { animation: card-signal 7s linear infinite; }
.evidence-entry { animation: evidence-entry 7s ease-in-out infinite; animation-delay: calc(var(--entry) * .7s); }
@keyframes card-signal { to { stroke-dashoffset: -100; } }
@keyframes discovery-scan { 0% { transform: scale(.7); opacity: 0; } 15% { opacity: .7; } 85%, 100% { transform: scale(2.3); opacity: 0; } }
@keyframes policy-pulse { 0%, 100% { opacity: .4; } 50% { opacity: 1; } }
@keyframes redact { 0%, 20%, 100% { opacity: .4; } 45%, 80% { opacity: 1; } }
@keyframes evidence-entry { 0%, 100% { opacity: .78; } 30%, 65% { opacity: 1; } }
@media (max-width: 1000px) { .capability-grid { gap: 12px; } .capability-copy { padding: 22px 18px; } .capability-copy h3 { font-size: 20px; } .capability-art figcaption { margin-inline: 14px; font-size: 8px; } }
@media (max-width: 760px) {
  .defense-capabilities { padding-block: 64px; }
  .capabilities-heading { align-items: start; flex-direction: column; gap: 20px; margin-bottom: 28px; }
  .capability-grid { grid-template-columns: 1fr; gap: 20px; }
  .capability-art svg { max-height: 250px; }
  .capability-copy { padding: 26px; }
  .capability-copy h3 { font-size: 24px; }
  .capability-art figcaption { margin-inline: 26px; font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .capability-card { transition: none; }
  .signal-path, .discovery-scan, .policy-pulse, .redaction-bars, .evidence-trace, .evidence-entry { animation: none; }
  .discovery-scan { opacity: .15; }
}
</style>
