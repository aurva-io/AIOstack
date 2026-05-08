"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  Clipboard,
  Cloud,
  Database,
  FileText,
  Fingerprint,
  Globe2,
  Layers3,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react"

import { ContactModal } from "@/components/navigation/core-ui"

type CustomerLogo = {
  name: string
  src?: string
  text?: string
  className?: string
}

const customers: CustomerLogo[] = [
  { name: "Smallest.ai", text: "smallest.ai", className: "font-light" },
  { name: "WisdomAI", text: "WisdomAI", className: "font-semibold" },
  { name: "Yubi", text: "Yubi", className: "font-semibold" },
  { name: "Meesho", src: "/customer-logos/meesho.svg" },
  { name: "slice", src: "/customer-logos/slice.png" },
  { name: "Razorpay", src: "/customer-logos/razorpay.png" },
  { name: "Nykaa", src: "/aiostack-logos/nykaa.svg" },
  { name: "Rapyuta Robotics", src: "/aiostack-logos/rapyuta.svg" },
  { name: "Cyware", text: "CYWARE", className: "font-semibold tracking-[0.02em]" },
  { name: "R Systems", text: "R Systems", className: "font-semibold" },
  { name: "CansoAI", src: "/customer-logos/canso.svg" },
  { name: "Yugen AI", src: "/aiostack-logos/yugen.svg" },
  { name: "Instacart", src: "/customer-logos/instacart.svg" },
]

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 md:px-8", className)}>{children}</div>
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[9px] border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em]",
        dark ? "border-[#80CB51]/25 bg-[#80CB51]/10 text-[#80CB51]" : "border-[#80CB51]/30 bg-[#80CB51]/10 text-[#3F7D2D]"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#80CB51]" />
      {children}
    </div>
  )
}

function Button({
  children,
  href,
  onClick,
  variant = "primary",
  dark = false,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  dark?: boolean
}) {
  const className = cn(
    "group inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-sm font-medium transition sm:w-auto",
    variant === "primary"
      ? "bg-[#80CB51] text-[#07100B] shadow-[0_12px_30px_rgba(128,203,81,0.22)] hover:brightness-105"
      : dark
        ? "border border-white/[0.16] bg-white/[0.035] text-white hover:bg-white/[0.07]"
        : "border border-[#C9C6BC] bg-white/70 text-[#171A18] hover:bg-white"
  )

  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
    </>
  )

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  )
}

function RuntimeMatrix() {
  const rows = [
    { label: "Actor", value: "claims_ops", icon: UserRound, states: [1, 1, 0, 0, 0] },
    { label: "Agent", value: "claims assistant", icon: Bot, states: [0, 1, 1, 0, 0] },
    { label: "Identity", value: "svc_claims", icon: Fingerprint, states: [0, 1, 1, 1, 0] },
    { label: "Data", value: "KYC + balance", icon: Database, states: [0, 0, 1, 1, 1] },
    { label: "Destination", value: "external API", icon: Globe2, states: [0, 0, 0, 1, 2] },
  ]

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#D5D1C7] bg-[#0E1514] p-5 shadow-[0_24px_64px_rgba(31,34,31,0.14)] md:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(128,203,81,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(128,203,81,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#80CB51]">AIOStack</div>
        <div className="rounded-[8px] border border-white/[0.12] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Runtime view</div>
      </div>

      <div className="relative mt-5 grid gap-2">
        {rows.map(({ label, value, icon: Icon, states }) => (
          <div key={label} className="grid min-h-[58px] grid-cols-[116px_42px_1fr] items-center gap-4 rounded-[12px] border border-white/[0.045] bg-white/[0.018] px-3 sm:grid-cols-[128px_42px_1fr]">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white">{label}</div>
              <div className="mt-0.5 text-[11px] leading-4 text-slate-500">{value}</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#80CB51]/20 bg-[#80CB51]/[0.07] text-[#80CB51]">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </div>
            <div className="grid grid-cols-5 items-center gap-2">
              {states.map((state, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={cn("h-px flex-1", state === 2 ? "bg-[#A058AE]/75" : state === 1 ? "bg-[#80CB51]/48" : "bg-white/[0.10]")} />
                  <div className={cn("h-2.5 w-2.5 rounded-full border", state === 2 ? "border-[#A058AE] bg-[#A058AE]" : state === 1 ? "border-[#80CB51] bg-[#80CB51]" : "border-white/25 bg-[#0E1514]")} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-4 grid grid-cols-[1fr_auto] items-center gap-4 rounded-[12px] border border-[#A058AE]/22 bg-[#A058AE]/[0.075] px-4 py-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#E2B9EB]">Context break</div>
          <div className="mt-1 text-sm text-slate-300">Sensitive data exits the expected workflow.</div>
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-[#A058AE]" />
      </div>
    </div>
  )
}

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(128,203,81,0.08),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(160,88,174,0.08),transparent_26%)]" />
      <Shell className="relative flex flex-col justify-center gap-9 py-10 sm:py-12 lg:min-h-[calc(100svh-4rem)] lg:gap-12 xl:gap-14">
        <div className="grid items-center gap-9 md:gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Runtime security for agentic data access</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[42px] font-light leading-[1.03] text-[#111411] sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[76px]">
              Authorized <span className="text-[#4B8E35]">≠</span> appropriate.
            </h1>
            <p className="mt-5 max-w-2xl text-[20px] font-light leading-8 text-[#2A2F2A] md:text-[26px] md:leading-10 lg:text-[28px]">
              AI agents can have the right permissions and still use sensitive data in the wrong context.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#686D64] md:text-lg">
              AIOStack follows every agentic access path from actor to identity to DB principal to sensitive data to destination, so teams can see when trusted access becomes risky.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="https://aurva.ai/#install">Try AIOStack Free</Button>
              <Button onClick={onDemo} variant="secondary">
                Talk to an Engineer
              </Button>
            </div>
          </div>
          <RuntimeMatrix />
        </div>
        <TrustRail />
      </Shell>
    </section>
  )
}

function LogoTile({ customer, compact = false }: { customer: CustomerLogo; compact?: boolean }) {
  return (
    <div className={cn("flex shrink-0 items-center justify-center overflow-hidden", compact ? "h-10 w-full px-2" : "h-14 w-[172px] px-5 sm:w-[196px]")}>
      {customer.src ? (
        <Image
          src={customer.src}
          alt={`${customer.name} logo`}
          width={172}
          height={52}
          className={cn("h-auto w-auto object-contain", compact ? "max-h-7 max-w-[130px]" : "max-h-8 max-w-[150px] sm:max-w-[170px]")}
        />
      ) : (
        <span className={cn("whitespace-nowrap leading-none text-[#111411]", compact ? "text-[18px]" : "text-[22px]", customer.className)}>{customer.text}</span>
      )}
    </div>
  )
}

function TrustRail() {
  const rail = [...customers, ...customers]

  return (
    <div className="pb-2 pt-1 sm:pb-3">
      <div className="text-center text-[10px] font-medium uppercase tracking-[0.28em] text-[#858A80]">Trusted by teams building with AI, data, and automation</div>
      <div className="mt-5 grid grid-cols-2 items-center gap-x-8 gap-y-5 px-2 sm:hidden">
        {customers.slice(0, 6).map((customer) => (
          <LogoTile compact customer={customer} key={customer.name} />
        ))}
      </div>
      <div className="relative mt-6 hidden overflow-hidden py-2 sm:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F7F5EF] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F7F5EF] to-transparent md:w-28" />
        <div className="flex w-max animate-[customer-marquee_42s_linear_infinite] items-center gap-4">
          {rail.map((customer, index) => (
            <LogoTile customer={customer} key={`${customer.name}-${index}`} />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes customer-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

function RailStep({
  icon: Icon,
  title,
  meta,
  status,
  risk = false,
  isLast = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  meta: string
  status: string
  risk?: boolean
  isLast?: boolean
}) {
  return (
    <div className="relative flex min-w-[150px] flex-1 items-center">
      <div className={cn("relative z-10 h-full min-h-[108px] w-full rounded-[14px] border p-4", risk ? "border-[#A058AE]/42 bg-[#A058AE]/[0.08]" : "border-white/[0.08] bg-white/[0.035]")}>
        <div className="flex items-center justify-between gap-3">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-[10px]", risk ? "bg-[#A058AE]/10 text-[#DFA6EB]" : "bg-[#80CB51]/10 text-[#80CB51]")}>
            <Icon className="h-5 w-5" strokeWidth={1.45} />
          </div>
          <span className={cn("rounded-[8px] px-2 py-1 text-[10px] font-medium", risk ? "bg-[#A058AE]/12 text-[#E2B9EB]" : "bg-[#80CB51]/10 text-[#80CB51]")}>{status}</span>
        </div>
        <div className="mt-5 text-sm font-medium text-white">{title}</div>
        <div className="mt-1 text-xs leading-5 text-slate-500">{meta}</div>
      </div>
      {!isLast && (
        <div className="relative z-20 -mx-1 hidden h-px w-7 shrink-0 bg-[#80CB51]/45 md:block">
          <span className="absolute -right-0.5 -top-[3px] h-1.5 w-1.5 rotate-45 border-r border-t border-[#80CB51]/55" />
        </div>
      )}
    </div>
  )
}

function RuntimeChain() {
  const nodes = [
    { icon: UserRound, title: "User", meta: "claims_ops", status: "Authorized" },
    { icon: Bot, title: "Agent", meta: "claims assistant", status: "Authorized" },
    { icon: Wrench, title: "Tool", meta: "MCP lookup", status: "Authorized" },
    { icon: Database, title: "DB principal", meta: "customer_ro", status: "Authorized" },
    { icon: FileText, title: "Sensitive data", meta: "KYC + balance", status: "Observed" },
    { icon: Globe2, title: "New destination", meta: "external API", status: "Context break", risk: true },
  ]

  return (
    <section className="bg-[#08100F] py-14 text-white md:py-16">
      <Shell>
        <div className="max-w-3xl">
          <Eyebrow dark>Trusted evidence chain</Eyebrow>
          <h2 className="mt-5 text-[30px] font-light leading-tight md:text-[42px]">
            Every hop is authorized. <span className="text-[#A058AE]">The break is where data leaves context.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            A single runtime path showing who acted, which identity and DB principal were used, what sensitive data was touched, and where it moved.
          </p>
        </div>

        <div className="mt-8 rounded-[18px] border border-white/[0.09] bg-[#111A19] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.20)] md:p-6">
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-[1020px] items-stretch">
              {nodes.map((node, index) => (
                <RailStep key={node.title} {...node} isLast={index === nodes.length - 1} />
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="rounded-[12px] border border-[#80CB51]/12 bg-[#80CB51]/[0.026] px-4 py-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#80CB51]">Expected path</div>
              <div className="mt-1 text-sm leading-6 text-slate-400">Every individual hop is authorized by policy.</div>
            </div>
            <div className="rounded-[12px] border border-[#A058AE]/28 bg-[#A058AE]/[0.09] px-4 py-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#E2B9EB]">Context break</div>
              <div className="mt-1 text-sm leading-6 text-slate-300">The final movement is wrong.</div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}

function EvidenceArtifact() {
  const rows = [
    ["Start", "User prompt to resolve customer ticket", "Sets the intent and model context for the chain.", "text-[#2B2E2A]"],
    ["Identity", "jon.doe@co.com -> svc-gpt-pipeline -> db-principal-prod", "Shows the trust path behind the action.", "text-[#7A3F8C]"],
    ["Access behavior", "230K rows returned from customer records", "High-volume access outside normal scope.", "text-[#7A3F8C]"],
    ["Data touched", "PII: customer email, NPS score", "Sensitive data was accessed in this flow.", "text-[#7A3F8C]"],
    ["Destination", "External endpoint: api.openai.com", "Flag: data left the trusted boundary.", "text-[#9A6A12]"],
    ["Behavior", "Volume spike above baseline", "Behavior drifted.", "text-[#B42318]"],
  ]

  return (
    <section className="bg-[#F7F1E6] py-14 text-[#111411] md:py-16">
      <Shell>
        <div className="max-w-2xl">
          <Eyebrow>Runtime proof</Eyebrow>
          <h2 className="mt-5 max-w-xl text-[30px] font-light leading-[1.08] md:text-[42px]">See what Aurva captures in one runtime pass.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#626860]">
            Aurva reconstructs the full chain from prompt to identity to DB principal to access behavior to sensitive data to destination, without relying on app proxies or code changes.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[18px] border border-[#D8D2C3] bg-[#FFFDF8] shadow-[0_22px_70px_rgba(37,28,8,0.075)]">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <aside className="border-b border-[#E1D9C7] bg-[#FBF7EF] p-6 lg:border-b-0 lg:border-r">
              <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#7A5815]">Incident summary</div>
              <p className="mt-6 text-base leading-7 text-[#2E302D]">A support engineer&apos;s AI agent queried 230K customer records and routed PII to an external LLM.</p>
              <div className="mt-6 grid gap-4 text-sm">
                {[
                  ["Initiated by", "jon.doe@co.com", "text-[#6A3472]"],
                  ["Agent", "svc-gpt-pipeline", "text-[#6A3472]"],
                  ["Destination", "api.openai.com", "text-[#9A6A12]"],
                ].map(([label, value, color]) => (
                  <div key={label} className="border-t border-[#E7DFCD] pt-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#777B73]">{label}</div>
                    <div className={cn("mt-1 font-medium", color)}>{value}</div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="min-w-0 overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[150px_minmax(260px,1fr)_minmax(280px,0.9fr)] bg-[#EEE9DD] px-5 py-3.5 text-sm font-medium text-[#2B2E2A]">
                  <div>Layer</div>
                  <div>Evidence</div>
                  <div>Why it matters</div>
                </div>
                {rows.map(([layer, evidence, why, color]) => (
                  <div key={layer} className="grid grid-cols-[150px_minmax(260px,1fr)_minmax(280px,0.9fr)] border-t border-[#E2DDD0] bg-[#FFFDF8] px-5 py-3.5 text-sm leading-6">
                    <div className={cn("font-medium", color)}>{layer}</div>
                    <div className="pr-4 text-[#3E423C]">{evidence}</div>
                    <div className={cn("text-[#5A6057]", layer === "Destination" && "font-medium text-[#9A6A12]", layer === "Behavior" && "font-medium text-[#B42318]")}>{why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}

function Differentiation() {
  const rows = [
    { icon: Layers3, label: "IAM / NHI posture", title: "What access exists?", text: "You see who could access, not what actually happened." },
    { icon: Cloud, label: "Cloud activity", title: "What control-plane events were logged?", text: "You see activity, not the full runtime story." },
    { icon: Database, label: "Aurva runtime layer", title: "What actually happened to sensitive data?", text: "You see actor, identity, DB principal, query behavior, data touched, destination, and drift.", aurva: true },
  ]

  return (
    <section className="py-14 md:py-16">
      <Shell className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <Eyebrow>Why posture is not enough</Eyebrow>
          <h2 className="mt-6 max-w-xl text-[30px] font-light leading-[1.08] text-[#111411] md:text-[42px] lg:text-[50px]">
            Access graphs show what can happen. Aurva shows what <span className="italic text-[#4B8E35]">did</span> happen.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#686D64] md:text-lg">
            IAM and NHI tools are essential. But agentic risk appears when trusted access moves beyond permission into DB use, query behavior, sensitive data, and downstream movement.
          </p>
        </div>
        <div className="space-y-3">
          {rows.map(({ icon: Icon, label, title, text, aurva }) => (
            <div key={label} className={cn("grid grid-cols-[48px_1fr] gap-4 rounded-[16px] border bg-white p-5 shadow-[0_10px_30px_rgba(26,27,24,0.04)]", aurva ? "border-[#80CB51]/45 bg-[#F5FBF0]" : "border-[#E4E0D8]")}>
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-[12px]", aurva ? "bg-[#80CB51]/15 text-[#4B8E35]" : "bg-[#F3F1EB] text-[#777D74]")}>
                <Icon className="h-5 w-5" strokeWidth={1.55} />
              </div>
              <div>
                <div className={cn("text-[10px] font-medium uppercase tracking-[0.28em]", aurva ? "text-[#4A8B35]" : "text-[#8A8F86]")}>{label}</div>
                <div className="mt-2 text-lg font-medium text-[#171A18]">{title}</div>
                <p className="mt-2 text-sm leading-6 text-[#676C65]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  )
}

function CategoryBand() {
  const layers = [
    ["IAM / NHI", "Who has access", "What they did with sensitive data"],
    ["Cloud logs", "Control-plane events", "DB principal, query behavior, data touched"],
    ["Agent gateways", "Traffic that passes through them", "Runtime access outside the gateway path"],
    ["AIOStack", "Runtime data access chain", "Actor, identity, DB principal, query, data, destination, drift"],
  ]

  return (
    <section className="bg-[#FBFAF6] py-12 md:py-14">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Category boundary</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[28px] font-light leading-[1.08] text-[#111411] md:text-[38px]">
              Built for the runtime layer others do not see.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#656B63]">
              IAM stops at permission. NHI stops at identity. Cloud logs stop at control-plane activity. Gateways see only traffic that passes through them.
            </p>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-[#D8D2C3] bg-white shadow-[0_14px_44px_rgba(26,27,24,0.045)]">
            <div className="hidden grid-cols-[140px_1fr_1.2fr] bg-[#EEE9DD] px-5 py-3.5 text-sm font-medium text-[#2B2E2A] md:grid">
              <div>Layer</div>
              <div>Sees</div>
              <div>Misses</div>
            </div>
            {layers.map(([layer, sees, misses]) => {
              const isAurva = layer === "AIOStack"
              return (
                <div
                  key={layer}
                  className={cn(
                    "grid gap-2 border-t border-[#E2DDD0] px-5 py-4 text-sm leading-6 first:border-t-0 md:grid-cols-[140px_1fr_1.2fr] md:gap-0",
                    isAurva && "bg-[#F5FBF0]"
                  )}
                >
                  <div className={cn("font-medium", isAurva ? "text-[#3F7D2D]" : "text-[#2B2E2A]")}>{layer}</div>
                  <div className="text-[#3E423C] md:pr-5">{sees}</div>
                  <div className={isAurva ? "text-[#3F7D2D]" : "text-[#686D64]"}>{misses}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Shell>
    </section>
  )
}

function Mechanism() {
  const capabilities = [
    { icon: Layers3, num: "01", title: "Runtime evidence layer", text: "Connect agents, identities, DB principals, data touched, destinations, and behavior into one explainable chain.", dark: true },
    { icon: Bot, num: "02", title: "Agent discovery", text: "See agents, MCP servers, tools, vector DBs, and unmanaged deployments." },
    { icon: Fingerprint, num: "03", title: "Identity chain mapping", text: "Trace user to agent to service account to DB principal." },
    { icon: Braces, num: "04", title: "Multi-agent lineage", text: "Reconstruct tool calls, data touched, and downstream actions." },
    { icon: Globe2, num: "05", title: "Sensitive data movement", text: "Understand what data was touched, where it moved, and whether the destination was expected." },
    { icon: ShieldCheck, num: "06", title: "Governance from behavior", text: "Right-size permissions and reduce drift using observed runtime evidence." },
  ]

  return (
    <section className="py-14 md:py-16">
      <Shell>
        <div className="max-w-3xl">
          <Eyebrow>What AIOStack does</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[30px] font-light leading-[1.06] text-[#111411] md:text-[42px]">Full agentic security in one runtime layer.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#656B63]">AIOStack turns fragmented agent activity into an evidence-backed map of identities, tools, data, behavior, and risk.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, num, title, text, dark }) => (
            <div key={title} className={cn("min-h-[246px] rounded-[16px] border p-6 shadow-[0_10px_28px_rgba(26,27,24,0.035)]", dark ? "relative overflow-hidden border-[#D8D2C3] bg-[#111A19] text-white shadow-[0_20px_60px_rgba(26,27,24,0.14)]" : "border-[#E2DED5] bg-white text-[#111411]")}>
              {dark && <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_90%,rgba(128,203,81,0.11),transparent_34%)]" />}
              <div className="relative">
                <div className={cn("flex items-center justify-between border-b pb-4", dark ? "border-white/[0.08]" : "border-[#E8E4DA]")}>
                  <div className={cn("font-mono text-sm", dark ? "text-[#80CB51]" : "text-[#4B8E35]")}>{num}</div>
                  <div className="h-1 w-10 rounded-full bg-[#80CB51]" />
                </div>
                <div className={cn("mt-7 flex h-10 w-10 items-center justify-center rounded-[12px] border", dark ? "border-[#80CB51]/25 bg-[#80CB51]/10 text-[#80CB51]" : "border-[#D8D2C3] bg-[#F7F5EF] text-[#4B8E35]")}>
                  <Icon className="h-5 w-5" strokeWidth={1.55} />
                </div>
                <h3 className={cn("mt-6 text-xl", dark ? "font-light text-white" : "font-medium text-[#111411]")}>{title}</h3>
                <p className={cn("mt-3 text-sm leading-6", dark ? "text-slate-400" : "text-[#656B63]")}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  )
}

function InstallSection({ onDemo }: { onDemo: () => void }) {
  const [activeCommand, setActiveCommand] = useState<"install" | "uninstall">("install")
  const [copied, setCopied] = useState(false)
  const command = activeCommand === "install" ? "curl -fsSL https://aurva.ai/install.sh | bash" : "curl -fsSL https://aurva.ai/uninstall.sh | bash"

  async function copyCommand() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="install" className="relative overflow-hidden bg-[#08100F] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(128,203,81,0.10),transparent_30%),radial-gradient(circle_at_78%_35%,rgba(160,88,174,0.10),transparent_28%)]" />
      <Shell className="relative max-w-[980px] text-center">
        <Eyebrow dark>Install AIOStack</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-3xl text-[32px] font-light leading-[1.07] md:text-[48px]">
          Get started in minutes, not weeks
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Start with runtime visibility for local and cloud deployments. Install when you are ready, or talk to an engineer for a guided rollout.
        </p>

        <div className="mx-auto mt-10 max-w-[760px] rounded-[22px] border border-white/[0.10] bg-[#111A19]/88 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-5">
          <div className="grid grid-cols-2 border-b border-white/[0.10] text-base font-medium text-white/48 md:text-lg">
            {[
              ["install", "Install"],
              ["uninstall", "Uninstall"],
            ].map(([value, label]) => {
              const active = activeCommand === value
              return (
                <button
                  key={value}
                  onClick={() => setActiveCommand(value as "install" | "uninstall")}
                  className={cn("relative px-4 pb-4 transition", active ? "text-[#80CB51]" : "hover:text-white")}
                >
                  {label}
                  {active && <span className="absolute bottom-[-2px] left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-[#80CB51]" />}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex min-h-[84px] items-center gap-4 rounded-[16px] border border-white/[0.08] bg-black/24 p-4 pl-5 text-left md:min-h-[92px] md:pl-6">
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm leading-7 text-[#B9F4C8] md:text-lg">
              {command}
            </code>
            <button
              onClick={copyCommand}
              aria-label="Copy install command"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-white/[0.08] bg-[#08100F] text-white transition hover:bg-[#0E1715] md:h-14 md:w-14"
            >
              {copied ? <Check className="h-5 w-5 text-[#80CB51]" strokeWidth={1.8} /> : <Clipboard className="h-5 w-5" strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={onDemo} variant="secondary" dark>
            Talk to an Engineer
          </Button>
        </div>
      </Shell>
    </section>
  )
}

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F5EF] text-[#111411]">
      <Hero onDemo={() => setIsContactModalOpen(true)} />
      <RuntimeChain />
      <EvidenceArtifact />
      <Differentiation />
      <CategoryBand />
      <Mechanism />
      <InstallSection onDemo={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  )
}
