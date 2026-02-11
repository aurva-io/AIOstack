

export function PrimaryButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; className?: string }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500 ${className}`}
        >
            {children}
        </a>
    );
}

export function GhostButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; className?: string }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-200 ring-1 ring-emerald-900/40 dark: ring-white-300 ring-border transition hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
        >
            {children}
        </a>
    );
}