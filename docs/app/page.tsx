import { Link } from "lib/transition"

import { PageRoutes } from "@/lib/pageroutes"
import { buttonVariants } from "@/components/ui/button"

export default function Home() { 
  return (
    <>
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <section className="flex min-h-[86.5vh] flex-col items-center justify-center px-2 py-8 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-7xl">
        AI Observability Stack
      </h1>
      <p className="text-foreground mb-8 max-w-[700px] leading-relaxed sm:text-lg">
        Zero-instrumentation eBPF monitoring for AI agents, LLM calls, and ML
        workloads in Kubernetes. Get deep visibility into your AI infrastructure
        without changing a single line of code. and also... open-core!
      </p>

      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <span>eBPF Powered</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 dark:bg-green-900">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span>Kubernetes Native</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 dark:bg-purple-900">
          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
          <span>Multi-Cloud Support</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link
          href={`/docs${PageRoutes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Get Started &crarr;
        </Link>
      </div>
      </section>
    </>
  )
}
