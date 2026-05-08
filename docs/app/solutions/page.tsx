import { ArrowRight, Database, FileSearch, KeyRound, ShieldAlert } from "lucide-react"

const solutionGroups = [
  ["Agentic Security", "Discover agents, map identity chains, monitor runtime data access, and detect inappropriate use in context.", ["Agentic Access Monitoring", "MCP and Tool Security", "Prompt Injection Data Access"], ShieldAlert],
  ["Runtime Data Security", "See which identities, applications, and agents touch sensitive data across databases, APIs, and downstream destinations.", ["Data Detection and Response", "Database Activity Monitoring", "Data Flow Monitoring"], Database],
  ["Identity Security", "Use runtime evidence to govern service accounts, NHIs, excessive permissions, and agent access paths.", ["NHI Least Privilege", "Identity Chaining", "Permission Review"], KeyRound],
  ["Privacy and Compliance", "Prove what sensitive data was accessed, by whom, through which workflow, and where it moved.", ["AI Privacy Manager", "Compliance Readiness", "Investigation Evidence"], FileSearch],
] as const

export default function SolutionsPage() {
  return (
    <main className="bg-[#050605] text-white">
      <section className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#79d957]">Solutions</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
            Secure sensitive data use across AI, identities, and runtime workflows.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {solutionGroups.map(([title, text, links, Icon]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <Icon size={23} className="text-[#79d957]" />
              <h2 className="mt-10 text-3xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/48">{text}</p>
              <div className="mt-8 grid gap-2">
                {links.map((link) => (
                  <a key={link} href="/use-cases" className="flex items-center justify-between border-t border-white/10 py-3 text-sm font-semibold text-white/78">
                    {link}
                    <ArrowRight size={15} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
