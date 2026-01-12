"use client"

import { Check, ArrowRight, Book, X } from "lucide-react";
import React, { useState } from "react";


function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    );
}

function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title?: string; subtitle?: string; center?: boolean }) {
    return (
        <div className={`mb-8 ${center ? "text-center" : ""}`}>
            {eyebrow && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border">
                    <span>{eyebrow}</span>
                </div>
            )}
            {title && (
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function PrimaryButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; className?: string }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500 ${className}`}
        >
            {children}
        </a>
    );
}

function GhostButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; className?: string }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-emerald-900/40 dark: ring-white-300 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
        >
            {children}
        </a>
    );
}



function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 ring-1 ring-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Talk to an Engineer</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Fill out the form below OR email us at support@aurva.io and a real person will get back to you within 24 hours.

                    </p>
                </div>

                {/* Form */}
                <form action="https://api.staticforms.dev/submit" method="POST" className="space-y-4">
                    <input type="hidden" name="accessKey" value="sf_031a13a2bl7aijbdcjl41i1n" />
                    <input type="hidden" name="redirectTo" value="https://aurva.ai/thank-you" />

                    {/* Honeypot field */}
                    <input
                        type="text"
                        name="honeypot"
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Your company"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Tell us about your AI security needs..."
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}


export default function PricingPage() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <section id="pricing" className="py-14 sm:py-16">

                <Container>
                    <SectionHeader
                        eyebrow=""
                        title="Pricing"
                        subtitle="Free forever. Upgrade when you need it"
                        center
                    />
                    <div className="grid items-stretch gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border">
                            <div className="mb-3 text-xl font-semibold text-foreground">AIOStack Community</div>
                            <div className="mb-4 text-sm font-medium text-muted-foreground">AI Security Posture Management + Runtime Telemetry</div>

                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                The open-core foundation for AI runtime security. Deploy on your Kubernetes cluster in minutes and gain complete visibility into your AI infrastructure.
                            </p>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-foreground">Shadow AI Discovery</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {[
                                        "Automatically discover all AI agents, tools, and MCP servers",
                                        "Map every LLM endpoint and API call",
                                        "Track which data systems your agents access",
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-foreground">Runtime Observability</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {[
                                        "eBPF-based telemetry with no code changes",
                                        "Protocol-aware: MCP, function calling, tool use, A2A",
                                        "Minimal overhead (<2% CPU impact)",

                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-foreground">AI-BOM Generation</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {[
                                        "Complete inventory of AI assets",
                                        "Dependency tracking for models and tools with versions",
                                        "Basic compliance reporting (OWASP, MITRE ATLAS)"
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-foreground">Open Architecture</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {[
                                        "Kubernetes-native (EKS, GKE, AKS)",
                                        "Full control with self-hosted infrastructure",
                                        "Cost estimators for various providers"
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            {/* <div className="mb-4 rounded-xl border border-border/50 bg-muted/30 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">What You Get</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Complete AI asset inventory",
                      "Real-time runtime telemetry",
                      "Data access visibility",
                      "Community support",
                      "Free forever"
                    ].map((li) => (
                      <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                    ))}
                  </ul>
                </div> */}

                            <p className="mt-8 mb-4 text-sm text-muted-foreground">Free forever. No credit card required.</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <GhostButton href="/#install">
                                    Install Now
                                </GhostButton>
                                <GhostButton href="/docs/home">
                                    Read The Docs <Book size={14} className="ml-2" />
                                </GhostButton>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 ring-1 ring-emerald-400/30">
                            <div className="mb-3 text-xl font-semibold text-emerald-700 dark:text-emerald-200">
                                Aurva Enterprise
                            </div>
                            <div className="mb-4 text-sm font-medium text-emerald-700/90 dark:text-emerald-200/90">AISPM + AI Detection & Response (AIDR)</div>

                            <p className="mb-6 text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-100/90">
                                Enterprise-grade threat detection and automated response for production AI systems. Built on AIOStack&apos;s telemetry with advanced security operations.
                            </p>



                            <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                <ul className="text-sm text-emerald-800 dark:text-emerald-100">
                                    {[
                                        "Everything in AIOStack Community, plus",
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200">Advanced Threat Detection</h4>
                                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-100">
                                    {["Prompt injection and jailbreak attempts",
                                        "Sensitive data egress (PII, credentials)",
                                        "Unauthorized tool and database access",
                                        "Anomalous agent behavior patterns",
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200">Automated Response</h4>
                                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-100">
                                    {["Real-time alerting with evidence bundles",
                                        "Customizable response playbooks"
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200">Enterprise Integrations</h4>
                                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-100">
                                    {["SIEM/SOAR: Splunk, Sentinel, Coralogix",
                                        "Identity: Okta, Azure AD and more",
                                        "Ticketing: Jira, ServiceNow, PagerDuty",
                                        "Communication: Slack, Microsoft Teams",
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-5">
                                <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-200">Compliance & Governance</h4>
                                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-100">
                                    {["Compliance workflows (SOC 2, GDPR, HIPAA)",
                                        "Audit logging and reporting",
                                        "SLA support with dedicated CSM and Engineers"
                                    ].map((li) => (
                                        <li key={li} className="flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" /><span>{li}</span></li>
                                    ))}
                                </ul>
                            </div>



                            <div className="mt-4 flex flex-wrap gap-2">

                                <PrimaryButton onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>
                                    Get a Demo <ArrowRight size={14} className="ml-2" />
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

