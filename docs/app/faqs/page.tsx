function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    );
}

function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title?: string; subtitle?: string; center?: boolean }) {
    return (
        <div className={`mb-8 ${center ? "text-center" : ""}`}>
            {eyebrow && (
                <div className="type-eyebrow type-eyebrow-light mb-3">
                    <span>{eyebrow}</span>
                </div>
            )}
            {title && (
                <h2 className="type-section-title text-foreground">
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="type-body mt-3 text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default function FAQSection() {
    return (
        <section id="pricing" className="min-h-screen py-14 sm:py-16">

            <Container>
                <SectionHeader
                    eyebrow=""
                    title="Frequently Asked Questions"
                    subtitle="There are no wrong questions"
                    center
                />
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
                <div className="grid gap-4 md:grid-cols-1">
                    {[
                        {
                            q: "I really liked the product and want Slack and Jira integration",
                            a: "We're thrilled that you liked our product ! Please reach out so that we can upgrade you to the Data Guard plan.",
                        }, {
                            q: "Do you collect prompts, responses, or secrets?",
                            a: "Never. We're metadata-only by design. To elucidate, we see that you called OpenAI, not what you sent.",
                        },
                        {
                            q: "What environments are supported?",
                            a: "Kubernetes(EKS/GKE) is the primary path. Feel free to reach out to us for your needs.",
                        },

                        {
                            q: "How is this different from Wiz or Datadog?",
                            a: "Wiz does cloud security posture. Datadog does observability. Neither shows AI-specific visibility like PII exposure in LLM calls or Shadow AI detection.",
                        },
                        {
                            q: "I am a large finacial org and need a PaaS option.",
                            a: "While we encourage SaaS, we'd be happy to help you out with a PaaS deployment if you have the genuine need. Reach out to our team for more info :)",
                        },

                        {
                            q: "I see a lot of \"AI\" here, will the Data Guard plan cost me a bomb ?",
                            a: "Haha, not really. We know that pricing can be scary, reach out to us and expect to be pleasantly surprised by how much we can save you   :)",
                        },
                    ].map((f, i) => (
                        <div key={i} className="rounded-2xl border border-border bg-card p-5 ring-1 ring-border">
                            <div className="text-sm font-semibold text-foreground">{f.q}</div>
                            <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
                        </div>
                    ))}
                </div>

                <h1 className="text-center pt-12 text-base font-semibold text-sm">
                    Still have questions? Mail us as <span className="text-foreground font-bold">support@aurva.io</span>
                </h1>
            </Container>
        </section>
    )
}
