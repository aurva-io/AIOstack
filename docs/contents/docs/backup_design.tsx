"use client"

import { Link } from "lib/transition"
import { PageRoutes } from "@/lib/pageroutes"
import { buttonVariants } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Diagonal lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #000 1px, transparent 1px),
            linear-gradient(-45deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Right side stack */}
        <div className="absolute right-20 top-32 space-y-4">
          <div className="w-16 h-1 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-20 h-1 bg-slate-300 dark:bg-slate-600"></div>
        </div>
        
        {/* Left side stack */}
        <div className="absolute left-20 top-48 space-y-4">
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-16 h-1 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-8 h-1 bg-slate-300 dark:bg-slate-600"></div>
        </div>
        
        {/* Bottom right grid */}
        <div className="absolute bottom-32 right-32 grid grid-cols-2 gap-2">
          <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600"></div>
        </div>
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        {/* Hero section */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="mb-6 text-4xl font-light tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl">
            AI Observability Stack
          </h1>
          

          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed sm:text-lg md:text-xl mb-12">
            Zero-instrumentation eBPF monitoring for AI agents, LLM calls, and ML
            workloads in Kubernetes. Get deep visibility into your AI infrastructure
            without changing a single line of code.
          </p>
        </div>

        {/* Feature badges */}
        <div className={`mb-12 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">eBPF Powered</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Kubernetes Native</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Multi-Cloud Support</span>
          </div>
        </div>

        {/* CTA section */}
        <div className={`mb-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/docs${PageRoutes[0].href}`}
              className={`${buttonVariants({ className: "px-6 py-3 text-base font-medium", size: "lg" })} bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100`}
            >
              Get Started
            </Link>
            
            <button className="px-6 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">99.9%</div>
            <div className="text-sm text-slate-500 dark:text-slate-500">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">10ms</div>
            <div className="text-sm text-slate-500 dark:text-slate-500">Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-1">∞</div>
            <div className="text-sm text-slate-500 dark:text-slate-500">Scalability</div>
          </div>
        </div>

        {/* Tech stack */}
        <div className={`mt-12 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded">Go</span>
            <span className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded">eBPF</span>
            <span className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded">Kubernetes</span>
            <span className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded">gRPC</span>
            <span className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded">Helm</span>
          </div>
        </div>
      </section>
    </div>
  )
}
