import Image from "next/image"
import { Link } from "lib/transition"

import { Settings } from "@/lib/meta"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
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
        <div className="mb-8 flex items-center gap-3">
          <Image
            src={Settings.siteicon}
            alt={`${Settings.title} main logo`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="dark:invert"
          />
          <h1 className="text-4xl font-bold sm:text-7xl">404</h1>
        </div>
        
        <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
          Page Not Found
        </h2>
        
        <p className="text-foreground mb-8 max-w-[600px] leading-relaxed sm:text-lg">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className={buttonVariants({ className: "px-6", size: "lg" })}
          >
            Return Home &crarr;
          </Link>
          <Link
            href="/docs"
            className={buttonVariants({ variant: "outline", className: "px-6", size: "lg" })}
          >
            Browse Docs
          </Link>
        </div>
      </section>
    </>
  )
}
