<template>
  <section class="v4-section v4-bordered v4-contrast-section">
    <div class="v4-container">
      <div class="v4-contrast-head">
        <h2 class="v4-h2">
          Traditional security wasn't built for agentic AI.
        </h2>
        <p class="v4-section-lead">
          Agentic risk lives in the sequence. A newly deployed agent can use a valid identity,
          access permitted data, invoke an approved tool, and call a model directly. Every action
          can look legitimate alone. Together, they can violate the agent's intended purpose.
        </p>
      </div>

      <div class="v4-incident">
        <div class="v4-incident-label">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1 15 14H1Z" />
            <path d="M8 5v4.5M8 12v.5" />
          </svg>
          <span>THE SAME EXECUTION</span>
        </div>
        <div class="v4-incident-steps" aria-label="New agent uses a valid role to access customer data, invoke an approved tool, and call a model directly">
          <span>NEW AGENT</span>
          <i>→</i>
          <span>VALID ROLE</span>
          <i>→</i>
          <span>CUSTOMER DATA</span>
          <i>→</i>
          <span>APPROVED TOOL</span>
          <i>→</i>
          <span>DIRECT MODEL CALL</span>
        </div>
        <strong>INDIVIDUALLY ALLOWED · COLLECTIVELY UNSAFE</strong>
      </div>

      <div class="v4-limitations">
        <article class="v4-limitation">
          <div class="v4-limitation-type">
            <strong>AI GATEWAY</strong>
            <span>ROUTED TRAFFIC ONLY</span>
          </div>
          <h3>It never sees the call.</h3>
          <p>
            The new agent calls the provider directly. Because the request never reaches the
            gateway, there is nothing to inspect, inventory, or control.
          </p>
          <small>NO ROUTE → NO VISIBILITY → NO POLICY</small>
        </article>

        <article class="v4-limitation">
          <div class="v4-limitation-type">
            <strong>FIREWALL</strong>
            <span>NETWORK TRAFFIC ONLY</span>
          </div>
          <h3>It sees an allowed connection.</h3>
          <p>
            A permitted TLS connection does not reveal which agent initiated it, what source data
            it carries, why it is happening, or whether the sequence has drifted from intent.
          </p>
          <small>CONNECTION SEEN · INTENT UNKNOWN</small>
        </article>

        <article class="v4-limitation">
          <div class="v4-limitation-type">
            <strong>MANUAL SECURITY</strong>
            <span>HUMAN RESPONSE LOOP</span>
          </div>
          <h3>It reconstructs the incident later.</h3>
          <p>
            Teams can correlate logs, update inventory, write a rule, and route a ticket. The agent
            can complete the sequence before that control cycle begins.
          </p>
          <small>INVENTORY → CORRELATION → TICKET → RULE</small>
        </article>
      </div>

      <div class="v4-versus" aria-hidden="true">
        <span>VERSUS</span>
      </div>

      <article class="v4-aurva-answer">
        <div class="v4-aurva-answer-copy">
          <span class="v4-aurva-label">RUNTIME DEFENSE</span>
          <h3>Aurva Security</h3>
          <p>
            Control what is actually happening. Aurva discovers new deployments from the runtime,
            connects identity, data, tools, models, and destinations, then evaluates the sequence
            against expected behavior. It can block activity, restrict access, and apply policy
            while the agent is still operating.
          </p>
        </div>
      </article>

      <p class="v4-contrast-hero-line">
        Gateways depend on routed traffic. Firewalls stop at the connection.<br>
        Manual security follows the incident.<br>
        <strong>Aurva moves at agent speed.</strong>
      </p>
    </div>
  </section>
</template>

<style scoped>
.v4-contrast-section {
  padding-top: 112px;
  padding-bottom: 112px;
}

.v4-contrast-head {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(440px, 1.1fr);
  align-items: end;
  gap: 72px;
}

.v4-contrast-head .v4-section-lead {
  max-width: 720px;
  margin: 0;
}

.v4-incident {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 28px;
  margin-top: 56px;
  padding: 18px 20px;
  border-top: 1px solid var(--v4-line-2);
  border-bottom: 1px solid var(--v4-line-2);
  background: rgba(255, 255, 255, .018);
}

.v4-incident-label,
.v4-incident-steps {
  display: flex;
  align-items: center;
}

.v4-incident-label {
  gap: 9px;
  color: rgba(230, 111, 113, .88);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .13em;
  white-space: nowrap;
}

.v4-incident-label svg {
  width: 14px;
}

.v4-incident-label svg path:first-child {
  fill: rgba(230, 111, 113, .12);
  stroke: #e66f71;
}

.v4-incident-label svg path:last-child {
  fill: none;
  stroke: #e66f71;
  stroke-width: 1.2;
}

.v4-incident-steps {
  justify-content: center;
  gap: 10px;
  min-width: 0;
  color: var(--v4-fg-2);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .06em;
  white-space: nowrap;
}

.v4-incident-steps i {
  color: var(--v4-fg-3);
  font-style: normal;
}

.v4-incident > strong {
  color: rgba(230, 111, 113, .72);
  font-family: var(--v4-mono);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: .1em;
  white-space: nowrap;
}

.v4-limitations {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;
  border: 1px solid var(--v4-line-2);
}

.v4-limitation {
  display: flex;
  min-height: 276px;
  flex-direction: column;
  padding: 30px;
  border-right: 1px solid var(--v4-line-2);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .018), transparent 42%),
    rgba(8, 9, 11, .45);
}

.v4-limitation:last-child {
  border-right: 0;
}

.v4-aurva-label {
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .13em;
}

.v4-limitation-type {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, .18);
}

.v4-limitation-type strong {
  color: var(--v4-fg);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -.01em;
}

.v4-limitation-type span {
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .1em;
  text-align: right;
}

.v4-limitation h3,
.v4-aurva-answer h3 {
  margin: 24px 0 0;
  color: var(--v4-fg);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.18;
  letter-spacing: -.018em;
}

.v4-limitation p,
.v4-aurva-answer-copy p {
  margin: 14px 0 0;
  color: var(--v4-fg-2);
  font-size: 14px;
  line-height: 1.6;
}

.v4-limitation small {
  margin-top: auto;
  padding-top: 24px;
  color: var(--v4-fg-3);
  font-family: var(--v4-mono);
  font-size: 9px;
  letter-spacing: .1em;
}

.v4-aurva-answer {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .38);
  background:
    radial-gradient(circle at 72% 42%, rgba(255, 255, 255, .055), transparent 34%),
    rgba(15, 16, 19, .78);
}

.v4-versus {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 16px 0;
  color: var(--v4-fg-2);
  font-family: var(--v4-mono);
  font-size: 10px;
  letter-spacing: .16em;
}

.v4-versus::before,
.v4-versus::after {
  height: 1px;
  flex: 1;
  background: var(--v4-line-2);
  content: '';
}

.v4-versus span {
  border: 1px solid var(--v4-line-2);
  padding: 6px 10px;
}

.v4-aurva-answer::before,
.v4-aurva-answer::after {
  position: absolute;
  width: 20px;
  height: 20px;
  content: '';
  pointer-events: none;
}

.v4-aurva-answer::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(255, 255, 255, .72);
  border-left: 2px solid rgba(255, 255, 255, .72);
}

.v4-aurva-answer::after {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid rgba(255, 255, 255, .72);
  border-bottom: 2px solid rgba(255, 255, 255, .72);
}

.v4-aurva-answer-copy {
  display: grid;
  grid-template-columns: minmax(280px, .62fr) minmax(0, 1.38fr);
  column-gap: 56px;
  padding: 28px 32px 26px;
}

.v4-aurva-answer-copy .v4-aurva-label {
  grid-column: 1 / -1;
}

.v4-aurva-answer-copy h3 {
  margin-top: 16px;
  font-size: 28px;
  font-weight: 600;
}

.v4-aurva-answer-copy p {
  align-self: end;
  margin-top: 16px;
  max-width: 700px;
}

.v4-contrast-hero-line {
  max-width: 1360px;
  margin: 58px auto 0;
  color: var(--v4-fg-3);
  font-size: clamp(28px, 3.1vw, 44px);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -.025em;
  text-align: center;
  text-wrap: balance;
}

.v4-contrast-hero-line strong {
  display: inline-block;
  color: var(--v4-fg);
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 1180px) {
  .v4-incident {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .v4-incident > strong {
    grid-column: 1 / -1;
    text-align: right;
  }

  .v4-incident-steps {
    justify-content: flex-end;
  }
}

@media (max-width: 900px) {
  .v4-contrast-head {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .v4-contrast-head .v4-section-lead {
    max-width: 720px;
  }

  .v4-incident {
    grid-template-columns: 1fr;
  }

  .v4-incident-steps {
    justify-content: flex-start;
    flex-wrap: wrap;
    white-space: normal;
  }

  .v4-incident > strong {
    grid-column: auto;
    text-align: left;
  }

  .v4-limitations {
    grid-template-columns: 1fr;
  }

  .v4-limitation {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--v4-line-2);
  }

  .v4-limitation:last-child {
    border-bottom: 0;
  }

  .v4-limitation small {
    margin-top: 28px;
  }

  .v4-aurva-answer-copy {
    grid-template-columns: 1fr;
    gap: 0;
  }

}

@media (max-width: 600px) {
  .v4-contrast-section {
    padding-top: 72px;
    padding-bottom: 72px;
  }

  .v4-incident,
  .v4-limitation,
  .v4-aurva-answer-copy {
    padding-right: 20px;
    padding-left: 20px;
  }

  .v4-limitation h3 {
    font-size: 20px;
  }

  .v4-limitation-type {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .v4-limitation-type span {
    text-align: left;
  }

  .v4-aurva-answer-copy h3 {
    font-size: 25px;
  }

  .v4-contrast-hero-line {
    margin-top: 42px;
  }

  .v4-contrast-hero-line strong {
    font-size: clamp(20px, 6vw, 36px);
  }
}
</style>
