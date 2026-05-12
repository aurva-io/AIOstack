"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const DOCS_NAV = [
  {
    section: "Get started",
    items: [
      { id: "home",         label: "Introduction",         href: "/docs/home" },
      { id: "steps",        label: "Quickstart",           href: "/docs/installation/steps" },
      { id: "pre-reqs",     label: "System requirements",  href: "/docs/installation/pre-reqs" },
      { id: "verification", label: "Verification",         href: "/docs/installation/verification" },
      { id: "architecture", label: "Architecture overview", href: "/docs/home/architecture" },
    ],
  },
  {
    section: "Discovery",
    items: [
      { id: "shadow-ai",   label: "Shadow AI detection",      href: "#" },
      { id: "ai-inventory",label: "AI inventory",             href: "#" },
      { id: "aibom",       label: "AIBOM (Bill of Materials)", href: "#" },
      { id: "data-lineage",label: "Data lineage",             href: "#" },
    ],
  },
  {
    section: "Identity",
    items: [
      { id: "identity-graph",     label: "Identity graph",       href: "#" },
      { id: "iam-mapping",        label: "IAM role mapping",      href: "#" },
      { id: "policy-lineage",     label: "Policy lineage",        href: "#" },
      { id: "risk-classification",label: "Risk classification",   href: "#" },
    ],
  },
  {
    section: "Tracing",
    items: [
      { id: "prompts",    label: "Prompt capture",   href: "#" },
      { id: "responses",  label: "Response capture", href: "#" },
      { id: "redaction",  label: "PII redaction",    href: "#" },
      { id: "replay",     label: "Session replay",   href: "#" },
    ],
  },
  {
    section: "Operate",
    items: [
      { id: "config",   label: "Configuration", href: "#" },
      { id: "upgrades", label: "Upgrades",       href: "#" },
      { id: "uninstall",label: "Uninstall",      href: "#" },
    ],
  },
  {
    section: "Reference",
    items: [
      { id: "cli",    label: "CLI",           href: "#" },
      { id: "api",    label: "API reference", href: "#" },
      { id: "events", label: "Event schema",  href: "#" },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "#") return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="docs-side">
      <div className="docs-side-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <span>Search docs…</span>
        <span className="docs-side-search-kbd">⌘K</span>
      </div>

      {DOCS_NAV.map((section, i) => (
        <div key={i}>
          <h6>{section.section}</h6>
          {section.items.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  )
}
