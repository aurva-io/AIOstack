"use client"

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Check, Clipboard, ClipboardCheck, CircleDollarSign, Shield, Zap, Eye, Server, Activity, Cloud, Lock, Database, Network, Gauge, ArrowRight, Rocket, FileText, Globe, Book, Info, IdCard, Bot, X } from "lucide-react";
import FeatureAccordion from "@/components/FeatureAccordion";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";


function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
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

function Pill({ icon: Icon, text }: { icon?: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400/20">
      {Icon ? <Icon size={14} className="shrink-0" /> : null}
      <span>{text}</span>
    </div>
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

function CopyField({ label, value, footnote }: { label?: string; value: string; footnote?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative w-full">
      {label ? (
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
      ) : null}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-muted p-3 ring-1 ring-border">
        <pre className="scrollbar-none m-0 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] leading-6 text-emerald-600 dark:text-emerald-200">
          {value}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-background text-foreground ring-1 ring-border transition hover:bg-accent"
          aria-label="Copy to clipboard"
        >
          {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
        </button>
      </div>
      {footnote ? (
        <div className="mt-2 text-[11px] text-center text-muted-foreground">{footnote}</div>
      ) : null}
    </div>
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


interface GroundObject {
  id: number;
  x: number;
  y: number;
  text: string;
  opacity: number;
  isBeingZapped: boolean;
}

interface Beam {
  id: number;
  targetObjectId: number;
  opacity: number;
  color: string;
}

function ProblemQuestions() {
  const questions = [
    { text: "Which services in your infrastructure are calling LLMs?", from: "Security Team", icon: Shield },
    { text: "Which ones are accessing databases with PII before making those calls?", from: "Compliance Officer", icon: Lock },
    { text: "Are any of them self-hosted models your secOps team doesn't know about?", from: "CISO", icon: Eye },
    { text: "When we ask for 'AI bill of materials', how long will it take you to produce it?", from: "Audit Team", icon: FileText },
  ];

  const [visibleQuestions, setVisibleQuestions] = React.useState([0, 1, 2]);
  const [fadingOut, setFadingOut] = React.useState<number | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFadingOut(visibleQuestions[0]);

      setTimeout(() => {
        setVisibleQuestions(prev => {
          const newQuestions = [...prev];
          newQuestions.shift();
          const nextIndex = (prev[prev.length - 1] + 1) % questions.length;
          newQuestions.push(nextIndex);
          return newQuestions;
        });
        setFadingOut(null);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [visibleQuestions, questions.length]);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {visibleQuestions.map((qIndex, idx) => {
        const question = questions[qIndex];
        const Icon = question.icon;
        const isFadingOut = fadingOut === qIndex;
        const isNew = idx === visibleQuestions.length - 1 && fadingOut !== null;

        return (
          <div
            key={`${qIndex}-${idx}`}
            className={`group relative rounded-2xl border border-border bg-card ring-1 ring-border ${idx === 0 ? 'border-emerald-400/40 ring-emerald-400/20' : ''}`}
            style={{
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isFadingOut ? 0 : 1,
              transform: isFadingOut
                ? 'translateY(-20px) scale(0.95)'
                : isNew
                  ? 'translateY(0) scale(1)'
                  : 'translateY(0) scale(1)',
              filter: isFadingOut ? 'blur(4px)' : 'blur(0px)',
            }}
          >
            <div className="flex items-start gap-4 p-4">
              {/* Icon */}
              <div
                className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${idx === 0
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-400/30'
                  : 'bg-muted text-muted-foreground'
                  }`}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${idx === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                      }`}
                    style={{
                      transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {question.from}
                  </span>
                  {idx === 0 && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-400/30 animate-pulse"
                      style={{
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    >
                      <Activity size={10} />
                      SENT NOW
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm font-medium leading-relaxed sm:text-base ${idx === 0 ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  style={{
                    transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {question.text}
                </p>
              </div>
            </div>
            {/* {idx === 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 animate-pulse" />
            )} */}
          </div>
        );
      })}
    </div>
  );
}

function FeatureGridSection() {
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
    <section ref={sectionRef} className="py-4 sm:py-0">
      <Container>
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]">
              AIOStack
            </h2>
            <p className="text-base  sm:text-lg text-muted-foreground  max-w-3xl mx-auto">
              The runtime security layer built for enterprise AI.
            </p>
          </div>

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

function AnimatedTextSection() {
  return (
    <section className="relative mt-10 sm:mt-12 flex flex-col items-center justify-start">
      {(
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none">
          <Image
            src="/bg1.svg"
            alt="Background"
            width={1000}
            height={800}
            className="w-full h-auto opacity-50"
          />
        </div>
      )}

      <Container className="relative z-10">
        <div className="relative flex items-center justify-center ease-out" >
          <Image
            src="/aiostack-graph.svg"
            alt="AIOStack heartbeat"
            width={900}
            height={900}
            className="w-full max-w-5xl  opacity-100 h-auto drop-shadow-xl relative z-10"
          />
        </div>
      </Container>
    </section>
  );
}

function UFOAnimation() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [objects, setObjects] = React.useState<GroundObject[]>([]);
  const [beams, setBeams] = React.useState<Beam[]>([]);
  const [ufoX, setUfoX] = React.useState(0);
  const [landscapeOffset, setLandscapeOffset] = React.useState(0);
  const animationFrameRef = React.useRef<number>(0);
  const lastZapTimeRef = React.useRef(0);

  React.useEffect(() => {
    // Customer problems that get zapped away
    const customerProblems = [
      "Shadow AI",
      "Unknown LLM Usage",
      "Untracked AI Agents",
      "No Ownership Tags",
      "Unauthorized API Calls",
      "Hidden AI Services",
      "Compliance Gaps",
      "Unmonitored Egress",
      "Mystery AI Costs",
      "Rogue AI Features",
      "PII Leaks to LLMs",
      "Zero Visibility",
    ];

    const getRandomProblem = () => customerProblems[Math.floor(Math.random() * customerProblems.length)];

    // Initialize ground objects with problem text in a single line
    const initialObjects: GroundObject[] = [];
    const yPosition = 78; // Fixed Y position for single file
    const spacing = 35; // Space between objects (increased for mobile)

    for (let i = 0; i < 8; i++) {
      initialObjects.push({
        id: i,
        x: 110 + (i * spacing), // Start off-screen right, evenly spaced
        y: yPosition,
        text: getRandomProblem(),
        opacity: 1,
        isBeingZapped: false,
      });
    }
    setObjects(initialObjects);

    let lastBeamId = 0;

    const animate = () => {


      // UFO stays stationary in center
      setUfoX(0);

      // Landscape scrolling (reset at 50% since SVG is 200% wide)
      setLandscapeOffset((prev) => (prev + 0.25) % 50);

      // Move objects with landscape - single file at constant spacing
      setObjects((prevObjects) => {
        const yPosition = 78; // Fixed Y position for single file

        return prevObjects.map((obj) => {
          const newX = obj.x - 0.375; // Match foreground landscape speed (0.25 * 1.5)

          // Wrap around when object goes off screen - respawn at constant distance
          if (newX < -10) {
            // Find the rightmost object's X position
            const maxX = Math.max(...prevObjects.map(o => o.x));
            return {
              ...obj,
              x: Math.max(110, maxX + 35), // Spawn 35% after the rightmost object
              y: yPosition,
              text: getRandomProblem(),
              opacity: 1,
              isBeingZapped: false,
            };
          }

          // Fade out if being zapped
          if (obj.isBeingZapped) {
            const newOpacity = obj.opacity - 0.08;
            if (newOpacity <= 0) {
              // Respawn at the end of the line
              const maxX = Math.max(...prevObjects.map(o => o.x));
              return {
                ...obj,
                x: Math.max(110, maxX + 35),
                y: yPosition,
                text: getRandomProblem(),
                opacity: 1,
                isBeingZapped: false,
              };
            }
            // Stop moving when being zapped
            return { ...obj, x: obj.x, opacity: newOpacity };
          }

          return { ...obj, x: newX };
        });
      });

      // Zap objects when they cross the center (where UFO is positioned)
      setObjects((prevObjects) => {
        const ufoXPosition = 50; // UFO is at center
        const zapRange = 5; // Range for center detection

        // Find object that is crossing through the center
        const targetAtCenter = prevObjects.find(
          (obj) =>
            Math.abs(obj.x - ufoXPosition) < zapRange &&
            !obj.isBeingZapped &&
            obj.opacity > 0.5
        );

        if (targetAtCenter) {
          // Create beam that tracks the target object
          const beamColor = Math.random() > 0.5 ? '#10b981' : '#a855f7'; // green or purple
          setBeams((prev) => [
            ...prev,
            {
              id: ++lastBeamId,
              targetObjectId: targetAtCenter.id,
              opacity: 1,
              color: beamColor,
            },
          ]);

          // Mark object as being zapped
          return prevObjects.map((obj) =>
            obj.id === targetAtCenter.id ? { ...obj, isBeingZapped: true } : obj
          );
        }

        return prevObjects;
      });

      // Fade out beams
      setBeams((prevBeams) =>
        prevBeams
          .map((beam) => ({ ...beam, opacity: beam.opacity - 0.05 }))
          .filter((beam) => beam.opacity > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative py-4 w-full border-none">
      <div
        ref={canvasRef}
        className="relative h-[500px] w-full overflow-hidden"
      >
        {/* Stars background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                opacity: 0.2 + Math.random() * 0.3,
                animation: `twinkle ${20 + Math.random() * 30}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Beams - Triangular/Cone shaped (behind UFO) */}
        {beams.map((beam) => {
          // Find the target object to get its current position
          const targetObject = objects.find(obj => obj.id === beam.targetObjectId);
          if (!targetObject) return null;

          return (
            <div
              key={beam.id}
              className="absolute"
              style={{
                left: '50%',
                top: '30%',
                width: '100px',
                height: `${(targetObject.y - 30)}%`,
                background: `linear-gradient(to bottom, ${beam.color}dd, ${beam.color}88, ${beam.color}44, transparent)`,
                opacity: beam.opacity,
                transform: 'translate(-50%, 0)',
                clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
                boxShadow: `0 0 40px ${beam.color}, 0 0 80px ${beam.color}`,
                filter: 'blur(4px)',
                zIndex: 0,
              }}
            />
          );
        })}

        {/* UFO (Logo) */}
        <div
          className="absolute transition-transform duration-100"
          style={{
            left: `calc(50% + ${ufoX}%)`,
            top: '30%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          {/* UFO glow */}
          <div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/30 blur-2xl"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          />

          {/* UFO body (Logo) */}
          <div
            className="relative"
            style={{
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <Image
              src="/ufo.svg"
              alt="UFO"
              width={64}
              height={64}
              className="h-40 w-40 drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.4))',
              }}
            />
          </div>
        </div>

        {/* Scrolling landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
          {/* Hills layer 1 (back) - Repeating pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex">
            <svg
              className="absolute bottom-0 h-full flex-shrink-0"
              style={{
                width: '200%',
                transform: `translateX(-${landscapeOffset}%)`,
              }}
              viewBox="0 0 2400 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a2f" />
                  <stop offset="100%" stopColor="#0f1f1a" />
                </linearGradient>
              </defs>
              {/* Repeating pattern for seamless loop */}
              <path
                d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100 L1200,200 L0,200 Z"
                fill="url(#hillGradient1)"
                opacity="0.7"
              />
              <path
                d="M1200,100 Q1350,50 1500,100 T1800,100 T2100,100 T2400,100 L2400,200 L1200,200 Z"
                fill="url(#hillGradient1)"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Hills layer 2 (front, darker) - Repeating pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex">
            <svg
              className="absolute bottom-0 h-full flex-shrink-0"
              style={{
                width: '200%',
                transform: `translateX(-${(landscapeOffset * 1.5) % 50}%)`,
              }}
              viewBox="0 0 2400 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f2419" />
                  <stop offset="100%" stopColor="#0a1510" />
                </linearGradient>
              </defs>
              {/* Repeating pattern for seamless loop */}
              <path
                d="M0,130 Q100,90 200,130 T400,130 T600,130 T800,130 T1000,130 T1200,130 L1200,200 L0,200 Z"
                fill="url(#hillGradient2)"
              />
              <path
                d="M1200,130 Q1300,90 1400,130 T1600,130 T1800,130 T2000,130 T2200,130 T2400,130 L2400,200 L1200,200 Z"
                fill="url(#hillGradient2)"
              />
            </svg>
          </div>
        </div>

        {/* Ground objects - Customer Problems */}
        {objects.map((obj) => (
          <div
            key={obj.id}
            className="absolute"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              opacity: obj.opacity,
              transform: 'translateX(-50%)',
              zIndex: obj.isBeingZapped ? 100 : Math.floor(100 - obj.x),
            }}
          >
            <div
              className="relative whitespace-nowrap rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-white ring-1 ring-slate-700"
              style={{
                background: obj.isBeingZapped
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 78, 59, 0.5))'
                  : 'rgba(15, 23, 42, 0.98)',
                boxShadow: obj.isBeingZapped
                  ? '0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3)'
                  : '0 4px 6px rgba(0, 0, 0, 0.3)',
                transform: obj.isBeingZapped ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.2s ease-out',
                borderColor: obj.isBeingZapped ? 'rgba(16, 185, 129, 0.6)' : 'rgba(71, 85, 105, 0.7)',
              }}
            >
              {obj.isBeingZapped && (
                <div
                  className="absolute inset-0 rounded-xl bg-emerald-500/20 animate-pulse"
                  style={{ animation: 'pulse 0.5s ease-in-out infinite' }}
                />
              )}
              <span className="relative z-10">{obj.text}</span>
            </div>
          </div>
        ))}

        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-emerald-300/90">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>eBPF Sensors Active</span>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}


export default function Home() {
  const [installTab, setInstallTab] = useState("helm");
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">

      {/* Hero */}
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

            {/* Preview card */}
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
          </div>

        </Container>
      </section>

      {/* Used by developers from */}
      <section className="py-2 sm:py-0 overflow-hidden">
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
      </section>

      {/* <section id="problems" className="pt-14 sm:pt-16 ">

        <Container>

          <SectionHeader
            title="Your security team is flying blind on AI."
            center
          />

          <ProblemQuestions />

          <div className="mt-12 text-center max-w-4xl mx-auto space-y-4">
            <p className="text-muted-foreground sm:text-lg">
              Most teams need <span className="font-semibold text-rose-600 dark:text-rose-400">2-4 weeks</span> to manually secure their AI usage.
            </p>
            <p className="text-muted-foreground sm:text-lg">
              By then, Shadow AI has already accessed your production databases.
            </p>
            <p className="text-muted-foreground sm:text-lg">
              What if you could see it all - instantly?
            </p>
          </div>
        </Container>
      </section> */}

      <section id="solutiongraph" className="pt-4 sm:pt-0 pb-6 sm:pb-8">
        <Container>
          <div className="text-center">
            <AnimatedTextSection />
          </div>
        </Container>
      </section>

      <FeatureGridSection />


      <SupportedLogoWall />


      {/* Inventory */}
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

      <InstallSection />

      <InvestorSection />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  );
}

function FeatureDoublePane() {
  return (
    <section className="py-4  sm:py-8 mt-8">
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
function SupportedLogoWall() {
  return (
    <Container className="py-14 sm:py-20 overflow-hidden">
      <SectionHeader
        eyebrow=""
        title="Discovers shadow AI across 100+ tools, models, and databases"
        subtitle=""
        center
      />

      <div className="sm:py-8 relative space-y-4 marquee-fade-mask">
        <div className="flex animate-scroll">
          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "gpt.png" },
              { name: "claude", file: "claude.png" },
              { name: "k8s", file: "k8s.png" },
              { name: "airflow", file: "airflow.png" },
              { name: "mcp", file: "mcp.png" },
              { name: "tflow", file: "tflow.png" },
              { name: "pytorch", file: "pytorch.png" },



            ].map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>

          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "gpt.png" },
              { name: "claude", file: "claude.png" },
              { name: "k8s", file: "k8s.png" },
              { name: "airflow", file: "airflow.png" },
              { name: "mcp", file: "mcp.png" },
              { name: "tflow", file: "tflow.png" },
              { name: "pytorch", file: "pytorch.png" },

            ].map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>
        </div>

        <div className="flex animate-scroll-reverse">
          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "psql.png" },
              { name: "claude", file: "hf.png" },
              { name: "k8s", file: "gemini.png" },
              { name: "airflow", file: "weav.png" },
              { name: "mcp", file: "milvus.png" },
              { name: "tflow", file: "mlflow.png" },
              { name: "pytorch", file: "chouse.png" },
            ].map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>

          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "psql.png" },
              { name: "claude", file: "hf.png" },
              { name: "k8s", file: "gemini.png" },
              { name: "airflow", file: "weav.png" },
              { name: "mcp", file: "milvus.png" },
              { name: "tflow", file: "mlflow.png" },
              { name: "pytorch", file: "chouse.png" },

            ].map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>
        </div>

        <div className="flex animate-scroll">
          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "langch.png" },
              { name: "claude", file: "mongo.png" },
              { name: "k8s", file: "qq.png" },
              { name: "airflow", file: "lakefs.png" },
              { name: "mcp", file: "mcp.png" },
              { name: "tflow", file: "temp.png" },
              { name: "pytorch", file: "celery.png" },
            ].map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>

          <div className="flex flex-shrink-0">
            {[
              { name: "gpt", file: "langch.png" },
              { name: "claude", file: "mongo.png" },
              { name: "k8s", file: "qq.png" },
              { name: "airflow", file: "lakefs.png" },
              { name: "mcp", file: "mcp.png" },
              { name: "tflow", file: "temp.png" },
              { name: "pytorch", file: "celery.png" },

            ].map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
              >
                <Image
                  src={`/integrations/${company.file}`}
                  alt={company.name}
                  width={60}
                  height={24}
                  className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                  style={{}}
                />

              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
@keyframes scroll {
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(-50%);
}
}

@keyframes scroll-reverse {
0% {
  transform: translateX(-50%);
}
100% {
  transform: translateX(0);
}
}

@keyframes fade {
to {
opacity: 0;
visibility: hidden;
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


.animate-scroll-reverse {
animation: scroll-reverse 20s linear infinite;
display: flex;
width: fit-content;
}


`}</style>

    </Container>
  )

}

function InvestorSection() {
  return (
    <section className="py-8 sm:py-20 bg-background">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 items-center max-w-5xl mx-auto">
          {/* Left side - Heading */}
          <div className="flex items-center justify-center md:justify-start">
            <h2 className="text-xl sm:text-3xl font-semibold text-foreground text-center md:text-left leading-tight">
              Not just <span className="text-emerald-600 dark:text-emerald-300" >trusted by the best</span> <br />We&apos;re backed by them too
            </h2>
          </div>

          {/* Right side - Investor Logo */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center p-8 rounded-2xl border border-border bg-card ring-1 ring-border w-full">
              <Image
                src="/nexus_logo.png"
                alt="Nexus Venture Partners"
                width={300}
                height={150}
                className="w-full max-w-[160px] sm:max-w-[200px] h-auto opacity-100"
              />
            </div>

          </div>

        </div>
      </Container>
    </section>
  )
}



function InstallSection() {
  return (< section id="install" className="relative py-14 sm:py-24 overflow-hidden" >
    <Container className="relative z-10">
      <SectionHeader
        title="Get started in minutes, not weeks"
        subtitle="One command. Zero code changes. Complete visibility into your AI infrastructure."
        center
      />

      {/* Installation Tabs */}
      <div className="mx-auto max-w-4xl">
        <Tabs defaultValue="install">
          <TabsList className="w-full justify-center mb-0">
            <TabsTrigger value="install">Install</TabsTrigger>
            <TabsTrigger value="uninstall">Uninstall</TabsTrigger>
          </TabsList>

          <TabsContent value="install" className="pt-6">
            <CopyField value="curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh | bash" />
          </TabsContent>
          <TabsContent value="uninstall" className="pt-6">
            <CopyField value="curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/uninstall.sh | bash" />
          </TabsContent>
        </Tabs>
      </div>

    </Container>
  </section >
  )
}

