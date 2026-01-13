"use client"

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Shield, Eye, Network, Lock, Activity, ArrowDown } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const features: Feature[] = [
  {
    id: "discovery",
    title: "Automatic Discovery",
    description: "Automatically identify which services in your Kubernetes cluster are making AI API calls, track their dependencies, and understand your complete AI landscape in real-time.",
    image: "/screens/inv1.png",
    icon: Eye,
  },
  {
    id: "aibom",
    title: "AI Bill of Materials (AIBOM)",
    description: "Every discovery becomes part of your AIBOM - a complete, continuously updated inventory of AI services, providers, dependencies, and data flows. Answer compliance questions effortlessly.",
    image: "/screens/aibom.png",
    icon: Shield,
  },
  {
    id: "lineage",
    title: "Intelligent Data Lineage",
    description: "Connect each AI service to the databases it accesses. Visualize which services are touching PII, customer data, or regulated information before making LLM calls. Understand your data flow at a glance.",
    image: "/screens/ds2.png",
    icon: Network,
  },
  {
    id: "shadow-ai",
    title: "Shadow AI Detection",
    description: "Flag services with no owner tags, first-seen behavior in production, or unusual volumes. Detect unauthorized AI services before they become a compliance nightmare. Get alerts on anomalous patterns.",
    image: "/screens/inv2.png",
    icon: Lock,
  },
  {
    id: "runtime",
    title: "Real-time Monitoring",
    description: "Monitor AI service behavior in real-time with zero code changes. Track API calls and new deployments as they happen. Set up alerts for policy violations and anomalies with eBPF-powered observability.",
    image: "/screens/threat.png",
    icon: Activity,
  },
];

export default function FeatureAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const activeFeature = features[activeIndex];

  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeIndex;

            return (
              <div key={feature.id}>
                <button
                  onClick={() => handleAccordionClick(index)}
                  aria-expanded={isActive}
                  className={`w-full text-left rounded-2xl ${isActive
                    ? "border border-emerald-100/40 bg-card  cursor-default hover:bg-card/95"
                    : " border-border bg-card/50 hover:bg-card/500 shadow-lg shadow-emerald-500/10 cursor-pointer"
                    }`}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className={`flex items-center justify-center h-8 w-8 flex-shrink-0 transition-all duration-300`}>
                          <Icon
                            size={16}
                            className={`transition-colors duration-100 ${isActive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-emerald-600 dark:text-emerald-300"
                              }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-base font-semibold transition-colors duration-100 ${isActive ? "text-foreground" : "text-foreground/80"}`} >
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight
                        size={20}
                        className={`flex-shrink-0 text-emerald-600 dark:text-emerald-300 transition-all duration-100 ${isActive ? "opacity-0" : "opacity-100"
                          }`}
                      />
                    </div>

                    {/* Expandable Description */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-1 ml-11 text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>

                        {/* Mobile Image - Only show on small screens */}
                        <div className="mt-4  lg:hidden">
                          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted ring-1 ring-border">
                            <Image
                              src={activeFeature.image}
                              alt={activeFeature.title}
                              fill
                              className="object-cover object-left"
                              sizes="(max-width: 1024px) 100vw, 0vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Feature Image - Hidden on mobile */}
        <div className="hidden lg:block sticky top-8 h-full">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl ring-1 ring-border">
            {/* Gradient overlay for aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none z-10" />

            <Image
              key={activeFeature.id}
              src={activeFeature.image}
              alt={activeFeature.title}
              fill
              className="object-cover object-left transition-opacity duration-500"
              sizes="(max-width: 1024px) 0vw, 50vw"
              priority
            />

            {/* Feature label overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm px-4 py-3 ring-1 ring-border/50">
                <div className="flex items-center gap-3">
                  {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-400/30">
                    {React.createElement(activeFeature.icon, {
                      size: 16,
                      className: "text-emerald-600 dark:text-emerald-400"
                    })}
                  </div> */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {activeFeature.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
