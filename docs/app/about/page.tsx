"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Quote, Shield, Sparkles } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

type GlowState = {
  x: number
  y: number
  visible: boolean
}

const green = "#80CB51"

const members = [
  {
    img: "/about-us/members/apurv-light.png",
    name: "Apurv Garg",
    designation: "CEO & Co-Founder",
    linkedinURL: "https://www.linkedin.com/in/apurvgarg/",
  },
  {
    img: "/about-us/members/krishna-light.png",
    name: "Krishna Bagadia",
    designation: "CTO & Co-Founder",
    linkedinURL: "https://www.linkedin.com/in/krishna-bagadia/",
  },
  {
    img: "/about-us/members/akash.png",
    name: "Akash Mandal",
    designation: "Architect & Co-founder",
    linkedinURL: "https://www.linkedin.com/in/akash-mandal/",
  },
  {
    img: "/about-us/members/tushar.png",
    name: "Tushar Haralkar",
    designation: "Field CISO",
    linkedinURL: "https://www.linkedin.com/in/tushar-haralkar-7922b1110/",
  },
  {
    img: "/about-us/members/akshay.png",
    name: "Akshay Singhal",
    designation: "Head of Engineering",
    linkedinURL: "https://www.linkedin.com/in/akshay30aug/",
  },
  {
    img: "/about-us/members/ninad.png",
    name: "Ninad Wirmalwar",
    designation: "Business Head - India & MEA",
    linkedinURL: "https://www.linkedin.com/in/ninadw/",
  },
  {
    img: "/about-us/members/shubham.png",
    name: "Shubham Ojha",
    designation: "Founding Engineer",
    linkedinURL: "https://www.linkedin.com/in/shubhamkojha/",
  },
  {
    img: "/about-us/members/pooja.png",
    name: "Pooja Gupta",
    designation: "Head of Product",
    linkedinURL: "https://www.linkedin.com/in/poojadgupta/",
  },
]

const topInvestors = [
  { img: "/about-us/investors/nexus.png", alt: "Nexus Venture Partners" },
  { img: "/about-us/investors/dreamit.png", alt: "Dreamit" },
  { img: "/about-us/investors/devc.png", alt: "DeVC" },
]

const industryLogos = [
  { img: "/about-us/investors/meta.png", alt: "Meta" },
  { img: "/about-us/investors/anthropic.png", alt: "Anthropic" },
  { img: "/about-us/investors/postman.png", alt: "Postman" },
  { img: "/about-us/investors/harness.png", alt: "Harness" },
  { img: "/about-us/investors/tanium.png", alt: "Tanium" },
  { img: "/about-us/investors/brex.png", alt: "Brex" },
  { img: "/about-us/investors/rubrik.png", alt: "Rubrik" },
  { img: "/about-us/investors/stripe.png", alt: "Stripe" },
]

const galleryRow1 = [
  { src: "/team-pics/2.png", ratio: "724/408" },
  { src: "/team-pics/3.png", ratio: "727/408" },
  { src: "/team-pics/7.png", ratio: "721/408" },
  { src: "/team-pics/4.png", ratio: "721/408" },
  { src: "/team-pics/9.png", ratio: "727/408" },
  { src: "/team-pics/5.png", ratio: "727/408" },
]

const galleryRow2 = [
  { src: "/team-pics/1.png", ratio: "1/1" },
  { src: "/team-pics/8.png", ratio: "783/466" },
  { src: "/team-pics/6.png", ratio: "1/1" },
  { src: "/team-pics/3.png", ratio: "727/408" },
  { src: "/team-pics/4.png", ratio: "721/408" },
  { src: "/team-pics/9.png", ratio: "727/408" },
]

function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-10 lg:px-20 ${className}`}>{children}</div>
}

function useCursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState<GlowState>({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setGlow({ x: event.clientX - rect.left, y: event.clientY - rect.top, visible: true })
    }

    const onLeave = () => setGlow((current) => ({ ...current, visible: false }))
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return { containerRef, glow }
}

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, revealed }
}

function Hero() {
  const { containerRef, glow } = useCursorGlow()

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-neutral-950">
      <Image
        src="/about-us/hero-bg.svg"
        alt=""
        width={1440}
        height={678}
        className="pointer-events-none absolute left-0 top-0 h-auto w-full"
        priority
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-500"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(128,203,81,0.07), transparent 70%)`,
        }}
      />

      <PageShell>
        <div className="relative z-10 flex justify-center pb-10 pt-16 sm:pb-12 sm:pt-28 md:justify-start lg:pb-24 lg:pt-56">
          <div className="flex max-w-2xl flex-col gap-7 text-center md:text-left">
            <div className="flex flex-col gap-3 lg:gap-5">
              <p className="hero-el type-eyebrow border-transparent bg-transparent px-0 py-0" style={{ animationDelay: "0.05s" }}>
                About Us
              </p>
              <h1 className="type-hero-compact">
                <span className="hero-el block text-white" style={{ animationDelay: "0.2s" }}>
                  The Paradigm has shifted.
                </span>
                <span className="hero-el block text-[#80CB51]" style={{ animationDelay: "0.35s" }}>
                  Security hasn&apos;t kept up.
                </span>
              </h1>
            </div>
            <p className="hero-el type-body max-w-[680px] text-neutral-400" style={{ animationDelay: "0.52s" }}>
              AI agents and dynamic identities move faster, touch more data, and create more sprawl than static controls were built for.
              <br />
              <br />
              Aurva was founded by Meta leaders in AI and security to give teams runtime truth: what happened, when trusted access turned risky, and what excess access made it possible.
            </p>
          </div>
        </div>
      </PageShell>
    </section>
  )
}

function QuoteSection() {
  const { containerRef, glow } = useCursorGlow()
  const { ref, revealed } = useScrollReveal()

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-neutral-950">
      <Image src="/about-us/quote-bg.svg" alt="" width={1440} height={466} className="pointer-events-none absolute left-0 top-0 h-auto w-full" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-500"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(128,203,81,0.07), transparent 70%)`,
        }}
      />

      <PageShell>
        <div className="relative z-10 py-10 sm:py-12 lg:py-24">
          <div
            ref={ref}
            className="flex flex-col gap-5 transition-[opacity,transform] duration-700 ease-out sm:gap-10"
            style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(28px)" }}
          >
            <Quote className="h-8 w-8 fill-[#80CB51] text-[#80CB51] lg:h-10 lg:w-10" />
            <p className="max-w-5xl text-base font-light leading-7 text-neutral-300 sm:text-lg lg:text-2xl lg:leading-9">
              Unauthorized access has always been the enemy. But with AI agents, a harder question is emerging: when does{" "}
              <span className="text-[#80CB51]">legitimate</span> access become <span className="text-[#80CB51]">inappropriate</span> at runtime? Security teams have never had a good answer to that.
              That is why we built Aurva.
            </p>
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#365522] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <Image src="/about-us/members/apurv.png" alt="Apurv Garg" width={64} height={64} className="h-full w-full object-cover object-top" />
              </div>
              <div className="flex flex-col leading-[1.6]">
                <span className="text-sm font-bold text-[#80CB51] lg:text-xl">Apurv Garg</span>
                <span className="text-xs font-medium text-neutral-400 lg:text-base">CEO &amp; Co-founder</span>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  )
}

function TwoPerspectives() {
  const { ref, revealed } = useScrollReveal()
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: -dy * 2.5, y: dx * 2.5, active: true })
  }

  return (
    <section className="bg-neutral-100">
      <PageShell>
        <div
          ref={ref}
          className="flex flex-col gap-5 py-10 transition-[opacity,transform] duration-700 ease-out sm:py-12 lg:py-24"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(28px)" }}
        >
          <span className="type-eyebrow type-eyebrow-light self-center lg:self-start">
            How we got here
          </span>
          <h2 className="type-section-title text-center text-neutral-900 lg:text-left">
            Two Perspectives, One Gap. <span className="text-[#5B903A]">Built to Close it.</span>
          </h2>

          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0, active: false })}
            className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] sm:mt-5"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.active ? "transform 0.08s linear" : "transform 0.5s ease-out",
            }}
          >
            <div className="flex flex-col md:flex-row">
              <PerspectiveCol
                icon={<Sparkles className="h-6 w-6 text-[#80CB51]" />}
                image="/about-us/members/apurv.png"
                title="The AI side"
                body="At Meta, Apurv built and led AI systems at scale. He understands how production models behave: dynamic, fast, and often trusted with highly sensitive data."
              />
              <Divider />
              <PerspectiveCol
                icon={<Shield className="h-6 w-6 text-[#80CB51]" />}
                image="/about-us/members/krishna.png"
                title="The Security side"
                body="Krishna built security infrastructure at Meta that tied access back to real identities and real context. He saw what rigorous, identity-linked access monitoring looks like at scale."
              />
              <Divider />
              <PerspectiveCol
                icon={<Sparkles className="h-6 w-6 text-[#80CB51]" />}
                title="The Intersection"
                body="Together, we saw the gap from both sides: security tools do not understand AI agent behavior, and AI teams cannot see what agents do with data at runtime. Aurva was built to close it."
              />
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  )
}

function Divider() {
  return <div className="hidden w-px flex-shrink-0 self-stretch bg-neutral-200 md:block" />
}

function PerspectiveCol({ image, icon, title, body }: { image?: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 sm:p-10">
      <div className="flex">
        {image && (
          <div className="h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#365522] to-neutral-900">
            <Image src={image} alt="" width={44} height={44} className="h-full w-full object-cover object-top" />
          </div>
        )}
        <div className={`${image ? "-ml-3" : ""} flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full border border-white bg-[#F6EEF7]`}>
          {icon}
        </div>
      </div>
      <h3 className="type-card-title text-neutral-950">{title}</h3>
      <p className="type-body-sm text-neutral-600">{body}</p>
    </div>
  )
}

function TeamSection() {
  const { ref, revealed } = useScrollReveal(0.05)

  return (
    <section className="bg-white">
      <PageShell>
        <div ref={ref} className="flex flex-col gap-7 py-10 sm:gap-10 sm:py-12 lg:py-24">
          <div
            className="flex flex-col gap-3 text-center transition-[opacity,transform] duration-700 ease-out sm:gap-5 md:text-left"
            style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="type-eyebrow type-eyebrow-light self-center md:self-start">
              Who we are
            </span>
            <h2 className="type-section-title text-neutral-900">A Team that spans AI, Security and Infrastructure.</h2>
            <p className="type-body max-w-2xl text-neutral-600">
              We&apos;re engineers, product builders, and security-curious minds across US and Bangalore building what the industry has been demanding.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {members.map((member, index) => (
              <Link
                key={member.name}
                href={member.linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-3 overflow-hidden rounded-lg border border-neutral-200 px-4 pb-4 pt-5 transition-all duration-300 hover:border-[#AADC8A] hover:shadow-md"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${0.1 + index * 0.06}s`,
                }}
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-neutral-100 lg:h-16 lg:w-16">
                  <Image src={member.img} alt={member.name} width={72} height={72} className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 flex translate-y-full items-center justify-center rounded-full bg-neutral-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Linkedin className="h-6 w-6 text-[#80CB51]" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-0.5 text-center">
                  <p className="text-sm font-medium leading-[1.35] text-[#5B903A] transition-colors duration-200 group-hover:text-[#74B94A]">{member.name}</p>
                  <p className="text-xs font-light leading-[1.4] text-neutral-500 lg:text-sm">{member.designation}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageShell>
    </section>
  )
}

function InvestorsSection() {
  const { ref, revealed } = useScrollReveal()

  return (
    <section style={{ backgroundColor: "#FAFDF9" }}>
      <PageShell>
        <div
          ref={ref}
          className="flex flex-col gap-8 py-10 transition-[opacity,transform] duration-700 ease-out sm:gap-12 sm:py-12 md:flex-row md:items-start md:gap-10 lg:gap-16 lg:py-24"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(28px)" }}
        >
          <div className="flex flex-col gap-3 text-center md:w-[40%] md:flex-shrink-0 md:text-left">
            <span className="type-eyebrow type-eyebrow-light self-center md:self-start">
              Investors &amp; Advisors
            </span>
            <h2 className="type-section-title text-neutral-900">Backed by the Best</h2>
            <p className="type-body max-w-xl text-neutral-600">We bring together security experts and builders from iconic companies.</p>
          </div>

          <div className="flex flex-1 flex-col gap-8 sm:gap-10">
            <LogoCluster label="World-Class Investors :" logos={topInvestors} />
            <LogoCluster label="Industry Veterans :" logos={industryLogos} grid />
          </div>
        </div>
      </PageShell>
    </section>
  )
}

function LogoCluster({ label, logos, grid = false }: { label: string; logos: { img: string; alt: string }[]; grid?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <p className="text-center text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-lime-900 md:text-left">{label}</p>
      <div className={grid ? "grid grid-cols-3 justify-items-center gap-x-6 gap-y-8 md:grid-cols-4 md:justify-items-start" : "flex items-center justify-center gap-4 sm:gap-6 md:justify-start lg:gap-10"}>
        {logos.map((logo, index) => (
          <React.Fragment key={logo.alt}>
            {!grid && index > 0 && <div className="h-8 w-px flex-shrink-0 bg-neutral-300" />}
            <div className="cursor-pointer opacity-50 transition-all duration-300 hover:-translate-y-1 hover:opacity-100">
              <Image src={logo.img} alt={logo.alt} width={160} height={56} className={grid ? "h-6 w-auto sm:h-7 lg:h-8" : "h-7 w-auto sm:h-9 lg:h-11"} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function HiringSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(58.55%_90.84%_at_50%_-7.28%,#1B2714_0%,#0A0A0A_100%)]">
      <PageShell>
        <div className="flex flex-col items-center gap-3 pb-8 pt-10 text-center sm:gap-5 sm:pb-10 sm:pt-12 lg:pt-24">
          <span className="type-eyebrow border-transparent bg-transparent text-neutral-300">
            <span className="live-dot h-2 w-2 rounded-full bg-[#80CB51]" />
            Join our team
          </span>
          <h2 className="type-section-title max-w-2xl text-white">
            We&apos;re hiring people who understand <span className="text-[#80CB51]">both sides</span>
          </h2>
          <p className="type-body max-w-xl text-neutral-400">
            If you can see the AI problem and the security problem at the same time, you already think the way we do. Join us in Sunnyvale and Bangalore.
          </p>
        </div>
      </PageShell>

      <div
        className="flex flex-col gap-4 overflow-hidden pb-8 sm:gap-5 sm:pb-10"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <GalleryRow items={galleryRow1} direction="left" />
        <GalleryRow items={galleryRow2} direction="right" />
      </div>

      <PageShell>
        <div className="flex justify-center pb-10 sm:pb-12 lg:pb-24">
          <Link href="/careers" className="explore-btn-wrap">
            <span className="explore-btn-inner">Explore Positions</span>
          </Link>
        </div>
      </PageShell>
    </section>
  )
}

function GalleryRow({ items, direction }: { items: { src: string; ratio: string }[]; direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden">
      <div className={direction === "left" ? "marquee-row-1" : "marquee-row-2"}>
        {[...items, ...items].map((item, index) => (
          <div key={`${item.src}-${index}`} className="gallery-card mx-1.5 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-800 sm:mx-2 sm:h-48 lg:h-56" style={{ aspectRatio: item.ratio }}>
            <Image src={item.src} alt="Life at Aurva" width={800} height={450} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { setTheme, theme: currentTheme } = useTheme()

  useEffect(() => {
    const previousTheme = currentTheme
    setTheme("dark")
    return () => {
      if (previousTheme) setTheme(previousTheme)
    }
  }, [currentTheme, setTheme])

  return (
    <main className="min-h-screen">
      <style jsx global>{`
        @keyframes hero-blur-in {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        .hero-el {
          animation: hero-blur-in 0.7s ease-out both;
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-row-1,
        .marquee-row-2 {
          display: flex;
          align-items: center;
          width: max-content;
        }

        .marquee-row-1 {
          animation: marquee-left 35s linear infinite;
        }

        .marquee-row-2 {
          animation: marquee-right 45s linear infinite;
        }

        .marquee-row-1:hover,
        .marquee-row-2:hover {
          animation-play-state: paused;
        }

        @keyframes live-ping {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          70%,
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }

        .live-dot {
          position: relative;
          box-shadow: 0 0 4px 1px ${green}, 0 0 10px 2px rgba(128, 203, 81, 0.4);
        }

        .live-dot::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: ${green};
          animation: live-ping 2s ease-out infinite;
        }

        .explore-btn-wrap {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          border-radius: 8px;
          background: #46702d;
          padding: 1px;
          transition: filter 0.3s ease;
        }

        .explore-btn-wrap:hover {
          filter: drop-shadow(0 0 6px rgba(128, 203, 81, 0.5));
        }

        .explore-btn-inner {
          position: relative;
          display: inline-flex;
          height: 38px;
          align-items: center;
          border-radius: 7px;
          padding: 8px 16px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .gallery-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <Hero />
      <QuoteSection />
      <Image src="/about-us/TransistionBG.svg" alt="" width={1920} height={400} className="h-auto w-full bg-neutral-950" aria-hidden="true" />
      <TwoPerspectives />
      <TeamSection />
      <InvestorsSection />
      <HiringSection />
    </main>
  )
}
