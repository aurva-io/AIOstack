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

      <section className="flex min-h-[86.5vh] flex-col items-center justify-center py-10 px-4 text-center">
        <h1 className="mt-14 text-4xl font-bold sm:text-6xl">
          Find Shadow AI  <span className="sparkle-purple"> Before </span> It Finds Trouble
        </h1>
        <p className=" mt-8 text-foreground mb-8 max-w-[700px] leading-relaxed sm:text-lg">
          Your AI adoption is outpacing your ability to govern it. Regain control with instant visibility into every AI application, API call, and data flow in your organization.
        </p>

        <div className="mb-8 flex  flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            <span>eBPF Powered</span>
          </div>
          <div className="flex  items-center gap-2 rounded-full bg-green-100 px-3 py-1 dark:bg-green-900">
            <span className=" h-2 w-2 rounded-full bg-green-500"></span>
            <span>Kubernetes Native</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 dark:bg-purple-900">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            <span>Multi-Cloud Support</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href={`/docs/installation/steps`}
            className={buttonVariants({ className: "px-4", size: "lg" })}
          >
            Install Now  &rarr;
          </Link>
        </div>
        <div className="mt-10 w-full max-w-6xl px-4">
          <Image
            src="/hero_2.png"
            alt="AIOStack overview"
            width={1600}
            height={900}
            className="mx-auto w-full rounded-xl border border-border/50 shadow-md"
            priority
          />
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-gradient-to-r from-slate-200 to-slate-200 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
              The Hidden Costs of Rapid AI Adoption
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Companies are racing to deploy AI, but the infrastructure isn&apos;t keeping up. Here&apos;s what&apos;s really happening behind the scenes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 w-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Shadow AI Proliferation</h3>
                  <p className="text-muted-foreground">
                    Teams are deploying AI applications without IT oversight, creating security blind spots and compliance risks.
                    These shadow AI systems operate outside governance frameworks, making them impossible to monitor or secure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 w-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Security Vulnerabilities</h3>
                  <p className="text-muted-foreground">
                    AI systems often handle sensitive data without proper encryption or access controls.
                    Traditional security tools can&apos;t monitor AI-specific threats, leaving organizations exposed to data breaches and unauthorized access.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 w-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Compliance Nightmares</h3>
                  <p className="text-muted-foreground">
                    AI deployments must comply with GDPR, CCPA, and industry regulations, but most lack proper audit trails or data lineage tracking.
                    Organizations face hefty fines and legal risks when AI systems can&apos;t demonstrate compliance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-pink-200 dark:border-pink-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Uncontrolled AI Spending</h3>
                  <p className="text-muted-foreground">
                    AI API costs spiral out of control without visibility into usage patterns, token consumption, or cost attribution. Organizations discover $5,000+ monthly AI bills they can&apos;t track to specific teams or applications, making budget planning impossible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 px-2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold mb-4">
              Introducing
            </h2>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 text-center max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] mx-auto">
              <span className="sparkle-purple">AIOStack </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional DSPM tools weren&apos;t built for AI. Get the visibility you need to prevent costly incidents and ensure compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-border/50 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Detection</h3>
              <p className="text-muted-foreground">
                Discover Shadow AI, AI anomalies and sensitive data access as they happen. No more waiting for quarterly reviews to discover issues.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-border/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Zero Trust Security</h3>
              <p className="text-muted-foreground">
                Monitor every API call, data access, and model inference. Ensure your AI systems meet the highest security standards.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-border/50 hover:border-green-200 dark:hover:border-green-800 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on eBPF technology for minimal overhead. Monitor at scale without impacting your application performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gradient-to-br from-slate-200 to-purple-50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                The <span className="text-red-600 dark:text-red-400">Hidden Crisis</span> in AI
              </h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-sm">!</span>
                  </div>
                  <p>Shadow AI is growing 10x faster than your ability to monitor it</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-sm">!</span>
                  </div>
                  <p>Data breaches cost a lot of money and AI makes them harder to detect</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-sm">!</span>
                  </div>
                  <p>Compliance violations can shut down your AI initiatives overnight</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">Our Solution</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Complete visibility into all AI activity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Real-time threat detection and response</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Automated compliance reporting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Zero performance impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by AI Leaders</h2>
            <p className="text-xl text-muted-foreground">See what industry experts are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Sarah Martinez</div>
                  <div className="text-sm text-muted-foreground">CTO, TechCorp</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "AIOStack gave us complete visibility into our AI infrastructure. We caught a critical data drift issue that could have cost us millions."
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  DJ
                </div>
                <div className="ml-4">
                  <div className="font-semibold">David Johnson</div>
                  <div className="text-sm text-muted-foreground">AI Director, InnovateAI</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The eBPF technology is incredible. We&apos;re monitoring 10,000+ AI requests per second with zero performance impact on our applications."
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  AL
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Alex Liu</div>
                  <div className="text-sm text-muted-foreground">Security Lead, DataFlow Inc</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Finally, a monitoring solution built for AI. The compliance features alone saved us months of manual work and potential regulatory fines."
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* For the Engineers Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900  to-slate-800 text-white relative ">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-purple-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-green-400 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-pink-400 rounded-full"></div>
        </div>

        {/* Linear grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight py-4 ">
              How we drive away the <span className="relative">
                Shadows
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 rounded-full"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Built by engineers, for engineers. Just solid technology that works (mostly).
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-purple-300 text-center">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">

                  <h4 className="text-xl font-bold text-purple-300">eBPF</h4>
                  <p className="text-sm text-gray-400">Kernel-level monitoring</p>
                </div>
                <div className="text-center">

                  <h4 className="text-xl font-bold text-blue-300">Golang</h4>
                  <p className="text-sm text-gray-400">High-performance backend</p>
                </div>
                <div className="text-center">

                  <h4 className="text-xl font-bold text-green-300">ClickHouse</h4>
                  <p className="text-sm text-gray-400">Log Store</p>
                </div>
                <div className="text-center">

                  <h4 className="text-xl font-bold text-orange-300">Kubernetes</h4>
                  <p className="text-sm text-gray-400">Cloud-native deployment</p>
                </div>
              </div>
            </div>






            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-pink-300 text-center">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Zero-code instrumentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time alerting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Multi-cloud support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">REST APIs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Included Dashboard</span>
                </div>
              </div>
            </div>


            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-blue-300 text-center">Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Time To First Byte</span>
                  <span className="text-green-400 font-mono">&lt;10 mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Throughput</span>
                  <span className="text-green-400 font-mono">10k+ req/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Memory</span>
                  <span className="text-green-400 font-mono">&lt;200MB per node</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">CPU Overhead</span>
                  <span className="text-green-400 font-mono">&lt;200mcpu per node</span>
                </div>
              </div>
            </div>




            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-green-300 text-center">Quick Deploy</h3>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-400 mb-2"># Deploy in 2 minutes</div>
                <div className="text-blue-400">helm install aiostack ./charts/aiostack -n aiostack</div>
                <div className="text-gray-400 mt-4 mb-2"># View your dashboard at</div>
                <div className="text-purple-400">https://app.aurva.ai</div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your AI?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join scores of companies already using AIOStack to monitor, secure, and optimize their AI infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/docs/installation/steps"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Install Now
            </Link>

          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • Free forever • Setup in under 10 minutes
          </p>
        </div>


        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-lg font-semibold">Ready to deploy?</span>
        </div>
      </div> */}
      </section>
    </>
  )
}
