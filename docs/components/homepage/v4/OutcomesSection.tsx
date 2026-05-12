"use client"

export default function OutcomesSection() {
  const cells = [
    {
      i: "01",
      t: "Inventory",
      s: "Every model, agent, endpoint, identity. Live. Without you asking.",
    },
    {
      i: "02",
      t: "Trace",
      s: "One actor → one model → one endpoint → one row. End-to-end, in plain language.",
    },
    {
      i: "03",
      t: "Drift",
      s: "First time an identity touches a new resource. First time a model is called from a new caller. First time data leaves.",
    },
    {
      i: "04",
      t: "Blast radius",
      s: "What a compromised agent can actually reach — computed from observed behavior, not granted policy.",
    },
    {
      i: "05",
      t: "Right-size",
      s: "Permissions trimmed to what was actually used in the last 90 days. With evidence attached.",
    },
    {
      i: "06",
      t: "Audit",
      s: "Every action — call, query, egress — attributed to an identity, packaged for review.",
    },
  ]

  return (
    <section className="v4-section v4-bordered">
      <div className="v4-container">
        <div className="v4-section-head">
          <span className="v4-section-num">§ 04</span>
          <h2 className="v4-h2">
            Six outcomes.<br/>One install.
          </h2>
        </div>
        <div className="v4-outcomes">
          {cells.map((c, i) => (
            <div key={i} className="v4-outcome">
              <div className="v4-outcome-num">{c.i}</div>
              <div className="v4-outcome-t">{c.t}</div>
              <div className="v4-outcome-s">{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
