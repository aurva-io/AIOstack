import React, { useMemo, useState } from "react";
import { Check, Clipboard, ClipboardCheck, CircleDollarSign, Shield, Zap, Eye, Server, Activity, Cloud, Lock, Database, Network, Gauge, ArrowRight, Rocket, FileText, Globe, Book, Info, IdCard, Bot, X } from "lucide-react";
import { SectionHeader, CopyField, Container } from "@/components/navigation/core-ui";

export function FeatureGridSection() {
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const features = [
        {
            icon: Eye,
            title: "Automatic AI Agent Discovery",
            description: "Automatically discover every AI service in your infrastructure - OpenAI, Anthropic, Bedrock, self-hosted models, and custom endpoints your security team doesn't know about.",
            comingSoon: false
        },
        {
            icon: Database,
            title: "Automatic Database Dicovery",
            description: "Automatically discover every database in your infrastructureand their accessors. Find PSQL, MySQL, Redis, Milvus, Weaviate or any other databases your applications connect to.",
            comingSoon: false
        },
        {
            icon: FileText,
            title: "AI Bill of Materials (AIBOM)",
            description: "Every discovery becomes part of your AIBOM - a complete inventory of AI services, providers, dependencies, and data flows. Answer compliance instantly.",
            comingSoon: false
        },
        {
            icon: Network,
            title: "Intelligent Data Lineage",
            description: "Connect each service to the databases it accesses. See which ones are touching PII, customer data, or regulated information before making LLM calls.",
            comingSoon: false
        },
        {
            icon: Shield,
            title: "Shadow AI Detection",
            description: "Flag services with no owner tags, first-seen behavior in prod, or unusual volumes. Stop Shadow AI before it becomes a compliance nightmare.",
            comingSoon: false
        },
        {
            icon: Bot,
            title: "Machine Identity",
            description: "Map and secure IAM identities, roles, and service accounts. Discover hidden database access and prune unwanted permissions to reduce your attack surface.",
            comingSoon: true
        },
        {
            icon: Globe,
            title: "Browser DLP",
            description: "Prevent employees from pasting sensitive data into ChatGPT, Claude, or public AI tools. Real-time detection of PII, credentials, and regulated information.",
            comingSoon: true
        },
        {
            icon: Shield,
            title: "Defender",
            description: "Real-time policy enforcement and alerting. Block risky AI calls, enforce data handling rules, and get notified of anomalies before they become incidents.",
            comingSoon: true
        },
        {
            icon: Rocket,
            title: "Security SDK",
            description: "Drop-in SDK for securing AI code at runtime. Add guardrails, input validation, and output filtering directly in your application with a few lines of code.",
            comingSoon: true
        }
    ];

    return (
        <section ref={sectionRef} className="pb-4 sm:pb-4">
            <Container>
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>


                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group relative p-6 rounded-xl border border-border/200 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                                    transitionDelay: `${index * 50}ms`
                                }}
                            >
                                {/* Gradient Border Effect on Hover */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>

                                <div className="relative">
                                    <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-400/20">
                                        <feature.icon size={24} />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {feature.title}
                                        </h3>
                                        {feature.comingSoon && (
                                            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/20">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}