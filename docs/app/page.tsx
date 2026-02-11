"use client"

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Check, Clipboard, ClipboardCheck, CircleDollarSign, Shield, Zap, Eye, Server, Activity, Cloud, Lock, Database, Network, Gauge, ArrowRight, Rocket, FileText, Globe, Book, Info, IdCard, Bot, X } from "lucide-react";
import FeatureAccordion from "@/components/FeatureAccordion";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { PrimaryButton, GhostButton } from "@/components/navigation/buttons";
import { VideoPlayer } from "@/components/navigation/video";
import { SectionHeader, ContactModal, CopyField, Container } from "@/components/navigation/core-ui";
import { InvestorSection } from "@/components/homepage/InvestorSection";
import { UFOAnimation } from "@/components/homepage/UFOAnimation";
import { InstallSection } from "@/components/homepage/InstallSection";
import { SupportedLogoWall } from "@/components/homepage/LogoWall";
import { BigOctopus } from "@/components/homepage/BigOctopus";
import { FeatureGridSection } from "@/components/homepage/FeatureGrid";




function FeatureDoublePane() {
  return (
    <section className="py-4 sm:pt-16">
      <Container>
        <SectionHeader
          eyebrow=""
          title=" Everything you need to secure AI on your cloud"
          subtitle="Our eBPF-powered system delivers all of this - with ZERO code changes"
          center
        />
        <FeatureAccordion />
      </Container>
    </section>
  )
}

function UsedByWall() {
  return (<section className="py-2 sm:py-0 overflow-hidden">
    <Container>
      <div className="text-center mb-10">
        <p className="text-sm sm:text-base font-medium text-muted-foreground">
          Used by developers from
        </p>
      </div>

      <div className="relative marquee-fade-mask">
        <div className="flex animate-scroll">
          <div className="flex flex-shrink-0">
            {[
              { name: "6sense", file: "6sense.svg" },
              { name: "AskWisdom", file: "askwisdom.svg" },
              { name: "Nykaa", file: "nykaa.svg" },
              { name: "R Systems", file: "rsystems.svg" },
              { name: "Yugen", file: "yugen.svg" },
              { name: "Aurva", file: "aurva-mono.svg" },
              { name: "Rapyuta", file: "rapyuta.svg" },
              { name: "PB", file: "pb.svg" },


            ].map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/aiostack-logos/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[36px]"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex flex-shrink-0">
            {[
              { name: "6sense", file: "6sense.svg" },
              { name: "AskWisdom", file: "askwisdom.svg" },
              { name: "Nykaa", file: "nykaa.svg" },
              { name: "R Systems", file: "rsystems.svg" },
              { name: "Yugen", file: "yugen.svg" },
              { name: "Aurva", file: "aurva-mono.svg" },
              { name: "Rapyuta", file: "rapyuta.svg" },
              { name: "PB", file: "pb.svg" },


            ].map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/aiostack-logos/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[36px]"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>

    <style jsx>{`
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-fade-mask {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.animate-scroll {
  animation: scroll 20s linear infinite;
  display: flex;
  width: fit-content;
}

`}</style>
  </section>)
}

function HeroCard() {

  // Pool of possible services for rotation
  const servicePool = React.useMemo(() => [
    { service: "invoice-ai", provider: "OpenAI", ns: "billing", calls: 1200, time: 2, shadow: false, type: "AI App" },
    { service: "new_frontend", provider: "Anthropic", ns: "preprod", calls: 847, time: 4, shadow: true, type: "MCP Client" },
    { service: "sherlock-svc", provider: "GeminiFlash", ns: "prod-core", calls: 340, time: 9, shadow: false, type: "AI Agent" },
    { service: "customerbot", provider: "Bedrock", ns: "dev-test", calls: 2100, time: 12, shadow: true, type: "MCP Server" },
    { service: "analytics", provider: "OpenAI", ns: "prod-data", calls: 980, time: 3, shadow: false, type: "AI App" },
    { service: "coderabbit", provider: "Claude", ns: "dev-tools", calls: 520, time: 5, shadow: true, type: "AI Agent" },
    { service: "content-gen", provider: "Gemini", ns: "marketing", calls: 1450, time: 7, shadow: false, type: "AI App" },
    { service: "support-chat", provider: "Cohere", ns: "support", calls: 2800, time: 1, shadow: false, type: "MCP Client" },
    { service: "doc-parser", provider: "OpenAI", ns: "stage-doc", calls: 670, time: 6, shadow: true, type: "AI Agent" },
    { service: "sentimentapi", provider: "HuggingFace", ns: "prod-ml", calls: 1100, time: 8, shadow: false, type: "AI App" },
    { service: "query-asst", provider: "Anthropic", ns: "prod-db", calls: 890, time: 4, shadow: false, type: "AI Agent" },
    { service: "ocr-model", provider: "Vertex AI", ns: "prod-cv", calls: 1650, time: 11, shadow: true, type: "MCP Server" },
  ], []);

  // Dynamic activity feed state
  const [activityItems, setActivityItems] = useState([
    servicePool[0],
    servicePool[1],
    servicePool[2],
    servicePool[3],
  ]);

  const [totalAgents, setTotalAgents] = React.useState(14);
  const [newlyDetected, setNewlyDetected] = React.useState<Set<string>>(new Set());



  // Update activity feed periodically
  React.useEffect(() => {
    let updateCount = 0;

    const interval = setInterval(() => {
      updateCount++;

      setActivityItems(prev => {
        if (updateCount % 1 === 0) {
          const randomIndex = Math.floor(Math.random() * prev.length);
          const availableServices = servicePool.filter(poolItem => !prev.some(item => item.service === poolItem.service));

          if (availableServices.length > 0) {
            const newService = availableServices[Math.floor(Math.random() * availableServices.length)];
            const updated = [...prev];
            updated[randomIndex] = {
              ...newService,
              calls: Math.floor(Math.random() * 1000) + 500,
              time: Math.floor(Math.random() * 5) + 1,
            };

            // Mark the new item as newly detected
            setNewlyDetected(prev => new Set([...prev, newService.service]));

            // Remove "newly detected" badge after 6 seconds
            setTimeout(() => {
              setNewlyDetected(prev => {
                const updated = new Set(prev);
                updated.delete(newService.service);
                return updated;
              });
            }, 6000);

            return updated;
          }
        }

        // Otherwise just update the call counts and times
        const updated = prev.map(item => ({
          ...item,
          calls: item.calls + Math.floor(Math.random() * 10) + 1,
          time: Math.max(1, item.time + (Math.random() > 0.7 ? 1 : 0)),
        }));

        return updated;
      });

      // Occasionally update total agents count
      if (Math.random() > 0.5) {
        setTotalAgents(prev => prev + (Math.random() > 0.5 ? 1 : 0));
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [servicePool]);


  return (
    <div className="relative w-full">
      {/* Animated border glow */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-emerald-500/20 opacity-75 blur-sm animate-border-glow" />

      <div className="relative rounded-3xl border border-border bg-card ring-1 ring-border w-full overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground">Live Detection</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-0 divide-y divide-border/50">
          {activityItems.map((item, idx) => (
            <div
              key={item.service}
              className="group relative px-4 py-3 transition-all duration-500 hover:bg-muted/30 animate-in fade-in slide-in-from-right-4 h-[72px]"
              style={{
                animationDuration: '500ms',
                animationFillMode: 'both'
              }}
            >
              {/* Subtle pulse overlay for first item */}
              {idx === 0 && (
                <div className="absolute inset-0 bg-emerald-600/5 animate-pulse" style={{ animationDuration: '3s' }} />
              )}

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                    <span className="font-mono text-sm font-medium text-foreground truncate max-w-[60px] sm:max-w-[150px]">{item.service}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                      <Server size={11} className="animate-pulse" style={{ animationDuration: '4s' }} />
                      {item.ns}
                    </span>
                    {newlyDetected.has(item.service) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-400/30 animate-in fade-in zoom-in-50 flex-shrink-0">
                        <Zap size={10} className="animate-pulse" />
                        NEW
                      </span>
                    )}
                    {item.shadow && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-medium text-rose-600 dark:text-rose-300 ring-1 ring-rose-400/20 animate-in fade-in zoom-in-50 flex-shrink-0" style={{ animationDelay: `${idx * 150 + 200}ms`, animationFillMode: 'backwards' }}>
                        <Shield size={10} className="animate-pulse" />
                        shadow
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground min-w-0 overflow-hidden">
                    <span className="whitespace-nowrap truncate max-w-[60px] sm:max-w-[120px]">{item.type}</span>
                    <span className="flex-shrink-0">•</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-300 whitespace-nowrap truncate max-w-[60px] sm:max-w-[120px]">{item.provider}</span>
                    <span className="flex-shrink-0">•</span>
                    <span className="tabular-nums transition-all duration-500 whitespace-nowrap flex-shrink-0">{item.calls >= 1000 ? `${(item.calls / 1000).toFixed(1)}k` : item.calls} calls</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap tabular-nums transition-all duration-500 flex-shrink-0">{item.time}m ago</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="border-t border-border bg-muted/30 px-4 py-3 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground tabular-nums transition-all duration-500">{totalAgents}</span> agents
              </span>
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground tabular-nums">5</span> providers
              </span>
              <span className="text-muted-foreground">
                <span className="font-semibold text-rose-600 dark:text-rose-300 tabular-nums animate-pulse transition-all duration-500" style={{ animationDuration: '3s' }}>{activityItems.filter(item => item.shadow).length}</span> shadow AI
              </span>
            </div>
            <span className="text-muted-foreground">last 30d</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function InventoryCard() {
  const inventoryRows = [
    {
      service: "invoice-ai",
      ns: "prod-finance",
      role: "sa-invoice-ai",
      exposure: "external",
      endpoint: "OpenAI",
      calls7d: 4812,
      bytes7d: "1.2 GB",
      lastSeen: "2m ago",
      owner: "finance-ml",
      confidence: 0.92,
      egress: "third-party",
      vectors: "PSQL,MySQL",
    },
    {
      service: "webapp-next",
      ns: "prod-app",
      role: "sa-frontend",
      exposure: "external",
      endpoint: "Anthropic",
      calls7d: 3821,
      bytes7d: "860 MB",
      lastSeen: "6m ago",
      owner: "unknown",
      confidence: 0.88,
      egress: "third-party",
      vectors: "Oracle(x2)",
    },
    {
      service: "auth-mgr",
      ns: "dev-ai",
      role: "sa-recon",
      exposure: "internal",
      endpoint: "Vertex AI",
      calls7d: 1210,
      bytes7d: "340 MB",
      lastSeen: "13m ago",
      owner: "platform-ai",
      confidence: 0.86,
      egress: "private/VPC",
      vectors: "PSQL (x3)",
    },
    {
      service: "content-moderator",
      ns: "prod-safety",
      role: "sa-moderation",
      exposure: "internal",
      endpoint: "OpenAI",
      calls7d: 2156,
      bytes7d: "520 MB",
      lastSeen: "18m ago",
      owner: "trust-safety",
      confidence: 0.94,
      egress: "third-party",
      vectors: "MongoDB",
    },
    {
      service: "recommendation-api",
      ns: "prod-ml",
      role: "sa-ml-service",
      exposure: "external",
      endpoint: "Bedrock",
      calls7d: 6240,
      bytes7d: "2.8 GB",
      lastSeen: "5m ago",
      owner: "ml-platform",
      confidence: 0.91,
      egress: "third-party",
      vectors: "Redis,PSQL",
    },
    {
      service: "data-pipeline",
      ns: "staging-analytics",
      role: "sa-etl-worker",
      exposure: "internal",
      endpoint: "Cohere",
      calls7d: 892,
      bytes7d: "180 MB",
      lastSeen: "31m ago",
      owner: "unknown",
      confidence: 0.79,
      egress: "third-party",
      vectors: "Snowflake",
    },
  ];


  return (
    <section id="inventory" className="py-4 sm:py-4">
      <Container>
        <SectionHeader
          eyebrow="Runtime security for AI"
          title="Connect AI to real services, databases and IAM roles"
          subtitle="Even the ones your developers didn't tell you about"
          center
        />

        {/* App Mockup */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl ring-1 ring-border">
          {/* App Header with macOS Traffic Lights */}
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-3">
            <div className="flex items-center gap-4">
              {/* macOS Traffic Lights */}
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              {/* App Info */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/20">
                  <Database size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">AI Runtime Inventory</div>
                  <div className="text-xs text-muted-foreground">6 services detected</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border transition hover:bg-muted/50">
                <Activity size={12} />
                <span>Live</span>
              </button>
            </div>
          </div>

          {/* Table Content with Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-border" style={{ minWidth: '800px' }}>
              <thead className="bg-muted/50">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 whitespace-nowrap">Service</th>
                  <th className="px-4 py-3 whitespace-nowrap">Namespace</th>
                  <th className="px-4 py-3 whitespace-nowrap">SA / IAM Role</th>
                  <th className="px-4 py-3 whitespace-nowrap">Exposure</th>
                  <th className="px-4 py-3 whitespace-nowrap">Endpoint</th>
                  <th className="px-4 py-3 whitespace-nowrap">Calls (7d)</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bytes (7d)</th>
                  <th className="px-4 py-3 whitespace-nowrap">Last seen</th>
                  <th className="px-4 py-3 whitespace-nowrap">Owner (lite)</th>
                  <th className="px-4 py-3 whitespace-nowrap">Databases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {inventoryRows.map((r) => (
                  <tr key={r.service} className="text-sm hover:bg-muted/30 transition">
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{r.service}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.ns}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${r.exposure === "external"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-200 ring-rose-400/20"
                        : "bg-sky-500/10 text-sky-600 dark:text-sky-200 ring-sky-400/20"
                        }`}>{r.exposure}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.endpoint}</td>
                    <td className="px-4 py-3 text-foreground whitespace-nowrap tabular-nums">{r.calls7d.toLocaleString()}</td>
                    <td className="px-4 py-3 text-foreground whitespace-nowrap">{r.bytes7d}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.lastSeen}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.owner}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.vectors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Scroll hint for mobile */}
        <div className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
          ← Scroll horizontally to see all columns →
        </div>


      </Container>
    </section>
  )
}

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { setTheme, theme: currentTheme } = useTheme();

  // Force dark mode on home page only
  React.useEffect(() => {
    const previousTheme = currentTheme;
    setTheme('dark');

    return () => {
      if (previousTheme) {
        setTheme(previousTheme);
      }
    };
  }, [setTheme]);



  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">

      <section className="relative overflow-hidden py-10 sm:py-20">

        <Container>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-center md:text-left text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Secure every AI service in your cloud <span className="text-emerald-600 dark:text-emerald-300">in 10 minutes</span>
              </h1>
              <p className="text-center md:text-left mt-4 max-w-xl text-base text-muted-foreground leading-7 ">
                You can&apos;t secure AI you don&apos;t know exists. AIOStack automatically discovers every AI app, agent, LLM, and self-hosted model across your cloud, then maps their access to sensitive databases and APIs. Get complete visibility into your AI attack surface and secure it—before it becomes your next security incident.              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5 justify-center md:justify-start">
                <PrimaryButton href="#install" >
                  Try AIOStack Free
                </PrimaryButton>
                <GhostButton onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>
                  Talk to an Engineer
                </GhostButton>
              </div>

            </div>

            <HeroCard />
          </div>

        </Container>
      </section>

      <UsedByWall />

      <VideoPlayer />



      <SupportedLogoWall />

      <InventoryCard />

      <section id="animation" className="relative mt-12 overflow-hidden">
        <Container>
          <SectionHeader
            eyebrow=""
            title="Identify risks before they surface"
            subtitle="With ZERO code changes thanks to eBPF"
            center
          />
        </Container>


        <UFOAnimation />
      </section>

      <FeatureDoublePane />

      <BigOctopus />
      <FeatureGridSection />



      <InstallSection />


      <InvestorSection />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

    </main>
  );
}




