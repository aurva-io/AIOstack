<template>
  <section class="v4-section v4-bordered v4-control-loop-section">
    <div class="v4-container">
      <div class="v4-control-loop-head">
        <h2 class="v4-h2">
          Control the known.<br>
          Neutralize the unknown.
        </h2>
        <p class="v4-section-lead">
          Aurva's inline control plane enforces policy on sanctioned AI traffic while the Aurva runtime sensor
          watches the entire environment, including shadow routes that bypass the control path.
          Runtime findings become policy in real time, so Aurva can block, redact, reroute, or revoke
          access without waiting for manual triage.
        </p>
      </div>

      <div
        class="v4-control-loop-map"
        role="img"
        aria-label="Aurva controls sanctioned AI traffic inline while the Aurva runtime sensor discovers bypass routes and sends evidence back as enforcement policy."
      >
        <svg class="v4-control-loop-lines" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="control-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10Z" fill="rgba(255,255,255,.54)" />
            </marker>
            <marker id="control-loop-alert-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10Z" fill="#e66f71" />
            </marker>
          </defs>

          <path class="v4-loop-route" d="M348 170H438" marker-end="url(#control-loop-arrow)" />
          <path class="v4-loop-route" d="M762 170H852" marker-end="url(#control-loop-arrow)" />
          <text class="v4-loop-route-label" x="393" y="153" text-anchor="middle">INSPECT</text>
          <text class="v4-loop-route-label" x="807" y="153" text-anchor="middle">ENFORCE</text>

          <path class="v4-loop-shadow" d="M290 106C476 14 724 14 910 106" marker-end="url(#control-loop-alert-arrow)" />
          <g class="v4-loop-alert-glyph" transform="translate(421 14)">
            <path d="M6 0 12 11H0Z" />
            <path d="M6 3.2v3.5M6 8.5v.4" />
          </g>
          <text class="v4-loop-shadow-label" x="616" y="24" text-anchor="middle">SHADOW ROUTE · BYPASSED INLINE CONTROL</text>

          <path class="v4-loop-observe" d="M204 226V350" />
          <path class="v4-loop-observe" d="M600 238V350" />
          <path class="v4-loop-observe" d="M996 226V350" />
          <path class="v4-loop-observe" d="M204 350H996" />
          <path class="v4-loop-observe" d="M300 350V424" marker-end="url(#control-loop-arrow)" />
          <text class="v4-loop-observe-label" x="318" y="383">RUNTIME VISIBILITY · ALWAYS ON</text>

          <path class="v4-loop-evidence" d="M548 505H652" marker-end="url(#control-loop-arrow)" />
          <text class="v4-loop-route-label" x="600" y="489" text-anchor="middle">THREAT FINDING</text>

          <path class="v4-loop-policy-path" d="M900 424V338C900 300 870 276 830 276H650C618 276 600 258 600 238" marker-end="url(#control-loop-arrow)" />
          <text class="v4-loop-policy-label" x="784" y="260">POLICY UPDATE</text>

          <g fill="rgba(255,255,255,.7)">
            <circle cx="204" cy="350" r="3" />
            <circle cx="600" cy="350" r="3" />
            <circle cx="996" cy="350" r="3" />
          </g>
        </svg>

        <article class="v4-loop-node v4-loop-node--applications">
          <span class="v4-loop-eyebrow">TRAFFIC ORIGIN</span>
          <strong>Agents and applications</strong>
          <small>sanctioned + shadow traffic</small>
        </article>

        <article class="v4-loop-node v4-loop-node--control">
          <span class="v4-loop-eyebrow">INLINE CONTROL</span>
          <strong>Aurva control plane</strong>
          <small>policy at every model access</small>
          <div class="v4-loop-actions" aria-label="Available enforcement actions">
            <span>ROUTE</span>
            <span>REDACT</span>
            <span>BLOCK</span>
            <span>REVOKE</span>
          </div>
        </article>

        <article class="v4-loop-node v4-loop-node--providers">
          <span class="v4-loop-eyebrow">DESTINATIONS</span>
          <strong>Models and providers</strong>
          <small>approved + unsanctioned</small>
        </article>

        <article class="v4-loop-node v4-loop-node--sensor">
          <span class="v4-loop-eyebrow">RUNTIME DISCOVERY</span>
          <strong>Aurva runtime sensor</strong>
          <p>Sees routed traffic and bypass paths, including request contents, identities, and data, without application changes.</p>
          <div class="v4-loop-finding">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1 15 14H1Z" />
              <path d="M8 5v4.5M8 12v.5" />
            </svg>
            <span>shadow client · sensitive data · unsanctioned provider</span>
          </div>
        </article>

        <article class="v4-loop-node v4-loop-node--policy">
          <span class="v4-loop-eyebrow">AUTONOMOUS RESPONSE</span>
          <strong>Findings become policy</strong>
          <p>Identity, data, destination, and behavior determine the next control.</p>
          <div class="v4-loop-decision">
            <span>BLOCK ROUTE</span>
            <span>REVOKE KEY</span>
            <small>APPLIED AUTOMATICALLY</small>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v4-control-loop-section {
  padding-top: 112px;
  padding-bottom: 112px;
}

.v4-control-loop-head {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(420px, 1fr);
  align-items: end;
  gap: 72px;
  margin-bottom: 56px;
}

.v4-control-loop-head .v4-section-lead {
  max-width: 680px;
  margin: 0;
}

.v4-control-loop-map {
  position: relative;
  min-height: 620px;
  overflow: visible;
}

.v4-control-loop-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.v4-loop-route,
.v4-loop-observe,
.v4-loop-evidence,
.v4-loop-policy-path,
.v4-loop-shadow {
  fill: none;
  vector-effect: non-scaling-stroke;
}

.v4-loop-route,
.v4-loop-evidence,
.v4-loop-policy-path {
  stroke: rgba(255, 255, 255, .42);
  stroke-width: 1.25;
}

.v4-loop-observe {
  stroke: rgba(255, 255, 255, .24);
  stroke-width: 1;
  stroke-dasharray: 4 7;
}

.v4-loop-shadow {
  stroke: rgba(230, 111, 113, .8);
  stroke-width: 1.25;
  stroke-dasharray: 5 7;
}

.v4-loop-route-label,
.v4-loop-observe-label,
.v4-loop-policy-label,
.v4-loop-shadow-label {
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .14em;
}

.v4-loop-route-label,
.v4-loop-observe-label,
.v4-loop-policy-label {
  fill: rgba(255, 255, 255, .36);
}

.v4-loop-shadow-label {
  fill: rgba(230, 111, 113, .82);
}

.v4-loop-alert-glyph path:first-child {
  fill: rgba(230, 111, 113, .14);
  stroke: #e66f71;
  stroke-width: .8;
}

.v4-loop-alert-glyph path:last-child {
  fill: none;
  stroke: #e66f71;
  stroke-width: 1;
}

.v4-loop-node {
  position: absolute;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, .22);
  background: rgba(8, 9, 11, .88);
  padding: 22px 24px;
}

.v4-loop-node::before,
.v4-loop-node::after {
  position: absolute;
  width: 16px;
  height: 16px;
  content: '';
  pointer-events: none;
}

.v4-loop-node::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(255, 255, 255, .58);
  border-left: 2px solid rgba(255, 255, 255, .58);
}

.v4-loop-node::after {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid rgba(255, 255, 255, .58);
  border-bottom: 2px solid rgba(255, 255, 255, .58);
}

.v4-loop-node strong {
  display: block;
  margin-top: 10px;
  color: var(--v4-fg);
  font-size: 17px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -.01em;
}

.v4-loop-node small,
.v4-loop-node p {
  display: block;
  margin: 7px 0 0;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: .02em;
}

.v4-loop-eyebrow {
  display: block;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .14em;
}

.v4-loop-node--applications {
  top: 106px;
  left: 5%;
  width: 24%;
}

.v4-loop-node--control {
  top: 78px;
  left: 36.5%;
  width: 27%;
  border-color: rgba(255, 255, 255, .42);
  background: rgba(18, 19, 22, .96);
  box-shadow: 0 0 64px rgba(255, 255, 255, .035);
}

.v4-loop-node--providers {
  top: 106px;
  right: 5%;
  width: 24%;
}

.v4-loop-node--sensor {
  bottom: 54px;
  left: 5%;
  width: 40.5%;
  min-height: 142px;
}

.v4-loop-node--policy {
  right: 5%;
  bottom: 54px;
  width: 40.5%;
  min-height: 142px;
}

.v4-loop-actions,
.v4-loop-decision {
  display: flex;
  gap: 6px;
  margin-top: 16px;
}

.v4-loop-actions span,
.v4-loop-decision span {
  border: 1px solid rgba(255, 255, 255, .16);
  padding: 6px 8px;
  color: var(--v4-fg-2);
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .1em;
}

.v4-loop-finding {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 17px;
  padding-top: 13px;
  border-top: 1px solid rgba(255, 255, 255, .1);
  color: var(--v4-fg-2);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .04em;
}

.v4-loop-finding svg {
  width: 14px;
  flex: 0 0 14px;
}

.v4-loop-finding svg path:first-child {
  fill: rgba(230, 111, 113, .14);
  stroke: #e66f71;
}

.v4-loop-finding svg path:last-child {
  fill: none;
  stroke: #e66f71;
  stroke-width: 1.2;
}

.v4-loop-decision span {
  border-color: rgba(230, 111, 113, .38);
  color: #e89899;
}

.v4-loop-decision small {
  align-self: center;
  margin: 0 0 0 auto;
  color: rgba(255, 255, 255, .44);
  font-size: 9px;
  letter-spacing: .1em;
  white-space: nowrap;
}

.v4-loop-shadow,
.v4-loop-policy-path {
  animation: v4-loop-flow 14s linear infinite;
}

.v4-loop-policy-path {
  stroke-dasharray: 6 5;
  animation-duration: 10s;
}

@keyframes v4-loop-flow {
  to {
    stroke-dashoffset: -110;
  }
}

@media (max-width: 1024px) {
  .v4-control-loop-head {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .v4-control-loop-head .v4-section-lead {
    max-width: 720px;
  }

  .v4-loop-node {
    padding: 18px;
  }

  .v4-loop-node strong {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .v4-control-loop-section {
    padding-top: 72px;
    padding-bottom: 72px;
  }

  .v4-control-loop-map {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 12px;
    padding: 0;
  }

  .v4-control-loop-lines {
    display: none;
  }

  .v4-loop-node {
    position: relative;
    inset: auto;
    width: auto;
    min-height: 0;
  }

  .v4-loop-node--applications {
    order: 1;
  }

  .v4-loop-node--control {
    order: 2;
  }

  .v4-loop-node--providers {
    order: 3;
  }

  .v4-loop-node--sensor {
    order: 4;
    margin-top: 12px;
    border-color: rgba(255, 255, 255, .42);
  }

  .v4-loop-node--policy {
    order: 5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .v4-loop-shadow,
  .v4-loop-policy-path {
    animation: none;
  }
}

@media (max-width: 480px) {
  .v4-control-loop-head {
    margin-bottom: 36px;
  }

  .v4-loop-actions,
  .v4-loop-decision {
    flex-wrap: wrap;
  }
}
</style>
