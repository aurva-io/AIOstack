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
    <main className="bg-[#F7F5EF] text-[#111411]">
      <section className="border-b border-[#E2DED5] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="type-eyebrow type-eyebrow-light border-transparent bg-transparent px-0 py-0">Use cases</p>
          <h1 className="type-hero mt-5 max-w-5xl">
            Start with the risk your security team needs to answer.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[#E2DED5] overflow-hidden rounded-lg border border-[#D3D0C6] bg-[#FFFDF8] shadow-[0_16px_44px_rgba(31,34,31,0.06)]">
            {useCases.map(([title, text, Icon]) => (
              <article key={title} className="grid gap-6 p-6 md:grid-cols-[220px_1fr_auto] md:items-center">
                <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#8A8F86]">
                  <Icon size={18} className="text-[#4B8E35]" />
                  Use case
                </div>
                <div>
                  <h2 className="type-card-title">{title}</h2>
                  <p className="type-body-sm mt-2 max-w-2xl text-[#686D64]">{text}</p>
                </div>
                <a href="/solutions" className="inline-flex items-center text-sm font-medium text-[#3F7D2D]">
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
