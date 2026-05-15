<template>
  <section class="v4-section v4-cta v4-bordered">
    <div class="v4-rule v4-rule-h" :style="{ top: 0 }"/>
    <div class="v4-container">
      <div class="v4-cta-grid">
        <div>
          <span class="v4-section-num">§ END</span>
          <h2 class="v4-h2" :style="{ marginTop: '14px' }">
            Every AI in your stack.<br>
            <span class="v4-em">Discovered. Mapped. Secured.</span>
          </h2>
          <p class="v4-section-lead">
            One curl. Ten minutes. Your AI inventory, your endpoint inventory, your identity chains — read from the kernel up. Zero friction. Zero code changes.
          </p>
          <div class="v4-cta-row" :style="{ marginTop: '28px' }">
            <NuxtLink class="v4-btn v4-btn-primary" to="/docs/getting-started/introduction">
              Install <span class="v4-mono">·</span> 10 min
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </NuxtLink>
            <NuxtLink class="v4-btn v4-btn-ghost" to="/docs/getting-started/introduction">
              Read architecture
            </NuxtLink>
          </div>
        </div>
        <div class="v4-cta-side">
          <div class="v4-cta-side-row">
            <span class="v4-mono v4-mono-dim">RUNTIME</span>
            <span>kernel · eBPF probes</span>
          </div>
          <div class="v4-cta-side-row">
            <span class="v4-mono v4-mono-dim">CONTROL</span>
            <span>iam · cloudtrail · bedrock</span>
          </div>
          <div class="v4-cta-side-row">
            <span class="v4-mono v4-mono-dim">DEPLOY</span>
            <span>self-hosted · in-vpc · read-only</span>
          </div>
          <div class="v4-cta-side-row">
            <span class="v4-mono v4-mono-dim">COMPLIANCE</span>
            <span>soc 2 · iso 27001</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
