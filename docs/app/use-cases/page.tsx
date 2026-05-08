import { Activity, ArrowRight, Bot, Database, GitBranch, KeyRound } from "lucide-react"

const useCases = [
  ["Agentic Access Monitoring", "See which agents exist, what identities they use, what data they touch, and whether behavior matches the intended workflow.", Bot],
  ["AI Data Exposure", "Detect when sensitive data is retrieved by an agent and sent to an LLM, external API, third-party tool, or unexpected destination.", Database],
  ["Identity Chaining", "Trace user-to-agent-to-service-account-to-database activity so approved credentials no longer hide agentic risk.", GitBranch],
  ["NHI Least Privilege", "Compare what non-human identities can access with what they actually use, then reduce excessive permissions with runtime evidence.", KeyRound],
  ["Runtime Appropriateness", "Prioritize the changes that matter: first-time sensitive data access, new destinations, unusual volumes, and purpose drift.", Activity],
] as const

export default function UseCasesPage() {
  return (
    <main className="bg-[#050605] text-white">
      <section className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#79d957]">Use cases</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
            Start with the risk your security team needs to answer.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
            {useCases.map(([title, text, Icon]) => (
              <article key={title} className="grid gap-6 p-6 md:grid-cols-[220px_1fr_auto] md:items-center">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-white/35">
                  <Icon size={18} className="text-[#79d957]" />
                  Use case
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/48">{text}</p>
                </div>
                <a href="/solutions" className="inline-flex items-center text-sm font-semibold text-white/78">
                  Solution
                  <ArrowRight size={15} className="ml-2" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
