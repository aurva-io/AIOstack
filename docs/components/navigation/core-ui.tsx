import { ClipboardCheck, Clipboard, X } from "lucide-react";
import React, { useState } from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    );
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title?: string; subtitle?: string; center?: boolean }) {
    return (
        <div className={`mb-8 ${center ? "text-center" : ""}`}>
            {eyebrow && (
                <div className="type-eyebrow type-eyebrow-light mb-3">
                    <span>{eyebrow}</span>
                </div>
            )}
            {title && (
                <h2 className="type-section-title text-foreground">
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="type-body mt-3 text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export function CopyField({ label, value, footnote }: { label?: string; value: string; footnote?: string }) {
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


export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
                    <h2 className="type-section-title text-foreground">Talk to an Engineer</h2>
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
