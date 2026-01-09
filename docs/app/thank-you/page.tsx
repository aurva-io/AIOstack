import Link from "next/link";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - AIOStack",
  description: "Thank you for contacting us. We'll get back to you soon.",
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/20">
          <Check size={32} className="text-emerald-600 dark:text-emerald-300" />
        </div>

        <h1 className="text-3xl font-semibold text-foreground mb-4">
          Thank you for reaching out!
        </h1>

        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          We&apos;ve received your message and one of our engineers will get back to you within 24 hours.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
