"use client"

import Link from "next/link";
import { Shield, Target, Users, Zap, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

export default function About() {
    const { setTheme, theme: currentTheme } = useTheme();
    React.useEffect(() => {
        const previousTheme = currentTheme;
        setTheme('dark');
        return () => { if (previousTheme) { setTheme(previousTheme); } };
    }, [setTheme]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                            About <span className="text-emerald-600 dark:text-emerald-300">AIOStack</span>
                        </h1>

                        <p className="mx-auto max-w-4xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            We&apos;re building the runtime security layer for enterprise AI infrastructure.
                            Our mission is to make AI adoption safe, visible, and compliant—without slowing down innovation.
                        </p>
                    </div>
                </div>
            </section>


            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
                                Securing AI at runtime, not just in theory
                            </h2>
                            <div className="space-y-4 text-base leading-relaxed text-muted-foreground ">
                                <p>
                                    Organizations are adopting AI faster than they can secure it. Shadow AI services appear overnight,
                                    accessing production databases and calling third-party APIs without security oversight.
                                </p>
                                <p>
                                    Traditional security tools weren&apos;t built for this AI-first world. AIOStack was purpose-built
                                    to discover, monitor, and secure every AI component in your infrastructure—automatically and continuously.
                                </p>
                                <p>
                                    Using eBPF technology, we provide complete visibility into your AI attack surface with zero code changes,
                                    helping security teams stay ahead of Shadow AI before it becomes a compliance nightmare.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-emerald-500/20 opacity-50 blur-2xl" />
                            <div className="relative rounded-2xl border border-border bg-card p-8 ring-1 ring-border">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
                                            <Zap size={24} className="text-emerald-600 dark:text-emerald-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Zero Code Changes</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Deploy in minutes with eBPF. No SDKs, no code modifications, no developer friction.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
                                            <Shield size={24} className="text-emerald-600 dark:text-emerald-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Comprehensive Discovery</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Automatically find every AI agent, LLM call, and database connection—even the ones you don&apos;t know about.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
                                            <Users size={24} className="text-emerald-600 dark:text-emerald-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">Built for Teams</h3>
                                            <p className="text-sm text-muted-foreground">
                                                From startups to enterprises, security teams trust AIOStack to protect their AI infrastructure.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 sm:py-24 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400/20">
                            <Users size={14} />
                            <span>The Team</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                            Built by security engineers, for security engineers
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            We&apos;ve spent years securing cloud infrastructure. Now we&apos;re applying that expertise to the AI security challenge.
                        </p>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-8">
                            Backed by leading investors who believe in our mission
                        </p>
                        <div className="flex justify-center">
                            <div className="rounded-2xl border border-border bg-card p-8 ring-1 ring-border">
                                <Image
                                    src="/nexus_logo.png"
                                    alt="Nexus Venture Partners"
                                    width={200}
                                    height={100}
                                    className="h-auto w-full max-w-[180px] opacity-90"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-32">
                <div className="relative px-8 py-16 sm:px-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        Ready to secure your AI infrastructure?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
                        Join security teams who trust AIOStack to discover and protect their AI services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/#install"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500"
                        >
                            Get Started Free
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-emerald-900/40 dark:ring-white-300 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

            </section>
        </main>
    );
}
