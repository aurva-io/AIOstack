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
    <main className="bg-[#050605] text-white">
      <section className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#79d957]">Platform</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
            Runtime security for agentic data access.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/50">
            Aurva keeps agents, identities, data access, and downstream movement in one runtime context so teams can decide what matters.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {capabilities.map(([title, eyebrow, text, Icon]) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/35">{eyebrow}</div>
                <Icon size={21} className="text-[#79d957]" />
              </div>
              <h2 className="mt-10 text-3xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/48">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Built around one question.</h2>
          <p className="text-2xl leading-10 text-white/50">
            Was this data access appropriate for the agent, identity, workflow, data sensitivity, timing, and destination?
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/10">
            Explore solutions
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </main>
  )
}
