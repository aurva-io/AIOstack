import Link from "next/link"
import { ArrowRight, Binoculars, Fingerprint, GitBranch, Radar, ShieldCheck, SlidersHorizontal } from "lucide-react"

const capabilities = [
  ["Discover", "Inventory", "Find agents, AI apps, MCP servers, tools, vector stores, LLM calls, service accounts, and unmanaged deployments.", Binoculars],
  ["Map", "Identity chain", "Connect human initiators, agents, orchestrators, sub-agents, service accounts, APIs, databases, and destinations.", GitBranch],
  ["Observe", "Runtime access", "See what agents and NHIs actually do with data: queries, operations, sensitive fields, movement, and timing.", Radar],
  ["Detect", "Appropriateness", "Surface behavior that is authorized but contextually wrong for workflow, data sensitivity, timing, or destination.", ShieldCheck],
  ["Govern", "Least privilege", "Compare allowed access with actual usage and right-size permissions using runtime evidence.", SlidersHorizontal],
  ["Investigate", "Triage", "Group identity, data, workflow, anomaly, and movement signals into investigation bundles.", Fingerprint],
] as const

export default function PlatformPage() {
  return (
    <main className="bg-[#F7F5EF] text-[#111411]">
      <section className="border-b border-[#E2DED5] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="type-eyebrow type-eyebrow-light border-transparent bg-transparent px-0 py-0">Platform</p>
          <h1 className="type-hero mt-5 max-w-5xl">
            Runtime security for agentic data access.
          </h1>
          <p className="type-body-lg mt-8 max-w-3xl text-[#686D64]">
            Aurva keeps agents, identities, data access, and downstream movement in one runtime context so teams can decide what matters.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {capabilities.map(([title, eyebrow, text, Icon]) => (
            <div key={title} className="rounded-lg border border-[#D3D0C6] bg-[#FFFDF8] p-6 shadow-[0_16px_44px_rgba(31,34,31,0.06)]">
              <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#8A8F86]">{eyebrow}</div>
              <Icon size={21} className="text-[#4B8E35]" />
            </div>
              <h2 className="type-section-title mt-10">{title}</h2>
              <p className="type-body-sm mt-4 text-[#686D64]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#E2DED5] bg-[#FFFDF8] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <h2 className="type-section-title-large">Built around one question.</h2>
          <p className="text-xl font-light leading-8 text-[#686D64] md:text-2xl md:leading-10">
            Was this data access appropriate for the agent, identity, workflow, data sensitivity, timing, and destination?
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center rounded-[10px] border border-[#C9C6BC] bg-white/70 px-5 py-3 text-sm font-medium text-[#171A18] transition hover:bg-white">
            Explore solutions
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </main>
  )
}
