"use client"

import Link from "next/link"
import { V4Icon } from "./V4Icon"

export default function FinalCTASection() {
  return (
    <section className="v4-section v4-cta">
      <div className="v4-rule v4-rule-h" style={{ top: 0 }}/>
      <div className="v4-container">
        <div className="v4-cta-grid">
          <div>
            <span className="v4-section-num">§ END</span>
            <h2 className="v4-h2" style={{ marginTop: 14 }}>
              Ten minutes from now,<br/>
              <span className="v4-em">you will have the map.</span>
            </h2>
            <p className="v4-section-lead">
              One curl. One DaemonSet. Your AI inventory, your endpoint inventory, your identity chains — drawn from the kernel up, on top of evidence you can replay.
            </p>
            <div className="v4-cta-row" style={{ marginTop: 28 }}>
              <Link className="v4-btn v4-btn-primary" href="/docs/introduction">
                Install <span className="v4-mono">·</span> 10 min
                <V4Icon name="arrow-right" size={14}/>
              </Link>
              <Link className="v4-btn v4-btn-ghost" href="/docs/architecture">
                Read architecture
              </Link>
            </div>
          </div>
          <div className="v4-cta-side">
            <div className="v4-cta-side-row">
              <span className="v4-mono v4-mono-dim">RUNTIME</span>
              <span>kernel · eBPF probes</span>
            </div>
            <div className="v4-cta-side-row">
              <span className="v4-mono v4-mono-dim">CONTROL</span>
              <span>iam · cloudtrail · bedrock</span>
            </div>
            <div className="v4-cta-side-row">
              <span className="v4-mono v4-mono-dim">DEPLOY</span>
              <span>self-hosted · in-vpc · read-only</span>
            </div>
            <div className="v4-cta-side-row">
              <span className="v4-mono v4-mono-dim">COMPLIANCE</span>
              <span>soc 2 · iso 27001 · hipaa-ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
