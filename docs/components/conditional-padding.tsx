interface ConditionalPaddingProps {
    children: React.ReactNode
}

export function ConditionalPadding({ children }: ConditionalPaddingProps) {
    return (
        <main className="h-auto">
            {children}
        </main>
    )
}
