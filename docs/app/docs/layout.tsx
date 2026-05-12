import { DocsSidebar } from "@/components/docs/DocsSidebar"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="docs-page">
      <div className="docs-shell">
        <DocsSidebar />
        <main className="docs-main">
          {children}
        </main>
      </div>
    </div>
  )
}
