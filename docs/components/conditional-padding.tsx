"use client"

import { usePathname } from "next/navigation"

interface ConditionalPaddingProps {
    children: React.ReactNode
}

export function ConditionalPadding({ children }: ConditionalPaddingProps) {
    const pathname = usePathname()

    // Remove padding for root (/) and docs pages
    const shouldRemovePadding = pathname === "/" || pathname.startsWith("/docs")

    return (
        <main className={`h-auto ${shouldRemovePadding ? "" : "px-5 sm:px-8"}`}>
            {children}
        </main>
    )
}
