"use client"

const ROSTER = [
  { name: "Razorpay", tag: "fin", loc: "asia-mixed" },
  { name: "Nykaa", tag: "d2c", loc: "asia-south" },
  { name: "6Sense", tag: "data", loc: "us-west" },
  { name: "Rapyuta Robotics", tag: "core", loc: "asia-east-1" },
  { name: "PolicyBazaar", tag: "insurtech", loc: "asia-south" },
  { name: "Cyware", tag: "ops", loc: "us-west" },
  { name: "YugenAI", tag: "ml-hub", loc: "us-east" },
  { name: "Yubi", tag: "finops", loc: "asia-south" },
  { name: "Aurva", tag: "security", loc: "global" },
  { name: "Undisclosed", tag: "ai-tool", loc: "us-west" },
  { name: "Undisclosed", tag: "fintech", loc: "us-west" },
  { name: "Undisclosed", tag: "obs", loc: "us-east" },
]

export default function RosterSection() {
  return (
    <section className="v4-section v4-bordered v4-roster">
      <div className="v4-container">
        <div className="v4-roster-head">
          <div>
            <span className="v4-section-num">§ AIO · DEPLOYED AT</span>
            <h2 className="v4-roster-title">
              Security &amp; platform teams running AIOStack.
            </h2>
          </div>
          <div className="v4-roster-meta">
            <div>
              <span className="v4-mono v4-mono-dim">count</span>
              <span>12 of {ROSTER.length}+ shown</span>
            </div>
            <div>
              <span className="v4-mono v4-mono-dim">since</span>
              <span>2025.04 · GA</span>
            </div>
            <div>
              <span className="v4-mono v4-mono-dim">scope</span>
              <span>self-hosted · in-vpc</span>
            </div>
          </div>
        </div>

        <div className="v4-roster-grid">
          {ROSTER.map((r, i) => (
            <div key={i} className="v4-roster-cell">
              <div className="v4-roster-idx">A{String(i + 1).padStart(2, "0")}</div>
              <div className="v4-roster-name">{r.name}</div>
              <div className="v4-roster-tags">
                <span className="v4-sig">{r.tag}</span>
                <span className="v4-sig">{r.loc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
