"use client"

import React from "react";
import { useTheme } from "next-themes";
import FeatureAccordion from "@/components/FeatureAccordion";

export default function FeaturesPage() {
  const { setTheme, theme: currentTheme } = useTheme();

  React.useEffect(() => {
    const previousTheme = currentTheme;
    setTheme('dark');
    return () => { if (previousTheme) { setTheme(previousTheme); } };
  }, [setTheme, currentTheme]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400/20">
              <span>Platform Features</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Everything you need to secure <span className="text-emerald-600 dark:text-emerald-300">AI infrastructure</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              From automatic discovery to real-time monitoring, AIOStack provides complete visibility
              and control over your AI services—with zero code changes.
            </p>
          </div>

          {/* Feature Accordion */}
          <FeatureAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card ring-1 ring-border">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Ready to get started?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
                Install AIOStack in minutes and start discovering your AI infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#install"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500"
                >
                  Install Now
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
