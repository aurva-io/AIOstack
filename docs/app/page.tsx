import { Link } from "lib/transition"
import Image from "next/image"

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

      <section className="flex min-h-[86.5vh] flex-col items-center justify-center px-2 py-10 text-center">
        <h1 className="mt-14 text-4xl font-bold sm:text-6xl">
        Find Shadow AI <span className="sparkle-purple">Before</span> It Finds Trouble
        </h1>
        <p className=" mt-8 text-foreground mb-8 max-w-[700px] leading-relaxed sm:text-lg">
        Your AI adoption is outpacing your ability to govern it. Regain control with instant visibility into every AI application, API call, and data flow in your organization.
        </p>

        <div className="mb-8 flex  flex-wrap gap-4 text-sm">
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
            className={buttonVariants({ className: "px-4", size: "lg" })}
          >
            Install Now  &rarr;
          </Link>
        </div>
        <div className="mt-10 w-full max-w-6xl px-4">
          <Image
            src="/hero.png"
            alt="AI Observability Stack overview"
            width={1600}
            height={900}
            className="mx-auto w-full rounded-xl border border-border/50 shadow-md"
            priority
          />
        </div>



      </section>
    </>
  )
}
