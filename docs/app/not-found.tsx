import Image from "next/image"
import { Link } from "lib/transition"
import { Settings } from "@/lib/meta"



export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="mb-6 flex items-center justify-center gap-4">
          <Image
            src={Settings.siteicon}
            alt={`${Settings.title} logo`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="dark:invert"
          />
          <h1 className="text-4xl sm:text-4xl font-bold">
            404 | Page Not Found
          </h1>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">

        </h2>

        <p className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          Space is big. You just won&apos;t believe how vastly, hugely, mind-bogglingly big it is.
          Unfortunately, the page you&apos;re looking for isn&apos;t here.<br />Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500"
          >
            Return Home
          </Link>
          {/* <Link
            href="/docs/home"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Browse Docs
          </Link> */}
        </div>
      </div>
    </main>
  )
}
