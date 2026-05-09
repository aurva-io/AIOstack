import { ArrowRight, Database, FileSearch, KeyRound, ShieldAlert } from "lucide-react"

const solutionGroups = [
  ["Agentic Security", "Discover agents, map identity chains, monitor runtime data access, and detect inappropriate use in context.", ["Agentic Access Monitoring", "MCP and Tool Security", "Prompt Injection Data Access"], ShieldAlert],
  ["Runtime Data Security", "See which identities, applications, and agents touch sensitive data across databases, APIs, and downstream destinations.", ["Data Detection and Response", "Database Activity Monitoring", "Data Flow Monitoring"], Database],
  ["Identity Security", "Use runtime evidence to govern service accounts, NHIs, excessive permissions, and agent access paths.", ["NHI Least Privilege", "Identity Chaining", "Permission Review"], KeyRound],
  ["Privacy and Compliance", "Prove what sensitive data was accessed, by whom, through which workflow, and where it moved.", ["AI Privacy Manager", "Compliance Readiness", "Investigation Evidence"], FileSearch],
] as const

export default function SolutionsPage() {
  return (
    <main className="bg-[#F7F5EF] text-[#111411]">
      <section className="border-b border-[#E2DED5] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="type-eyebrow type-eyebrow-light border-transparent bg-transparent px-0 py-0">Solutions</p>
          <h1 className="type-hero mt-5 max-w-5xl">
            Secure sensitive data use across AI, identities, and runtime workflows.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {solutionGroups.map(([title, text, links, Icon]) => (
            <article key={title} className="rounded-lg border border-[#D3D0C6] bg-[#FFFDF8] p-6 shadow-[0_16px_44px_rgba(31,34,31,0.06)]">
              <Icon size={23} className="text-[#4B8E35]" />
              <h2 className="type-section-title mt-10">{title}</h2>
              <p className="type-body-sm mt-4 max-w-xl text-[#686D64]">{text}</p>
              <div className="mt-8 grid gap-2">
                {links.map((link) => (
                  <a key={link} href="/use-cases" className="flex items-center justify-between border-t border-[#E2DED5] py-3 text-sm font-medium text-[#2A2F2A]">
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
