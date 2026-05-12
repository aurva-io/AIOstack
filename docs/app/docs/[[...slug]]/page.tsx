import { notFound } from "next/navigation"

import { getDocument } from "@/lib/markdown"
import { Settings } from "@/lib/meta"
import { PageRoutes } from "@/lib/pageroutes"
import Pagination from "@/components/navigation/pagination"

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function Pages({ params }: PageProps) {
  const { slug = [] } = await params
  const pathName = slug.join("/")
  const res = await getDocument(pathName)

  if (!res) notFound()

  const { frontmatter, content } = res

  return (
    <div>
      <div className="docs-breadcrumb">
        {["Docs", ...slug].map((part, i, arr) => (
          <span key={i} style={{ color: i === arr.length - 1 ? "var(--docs-text-2)" : "var(--docs-text-3)" }}>
            {part}{i < arr.length - 1 && <span style={{ opacity: .4, marginLeft: 8 }}>/</span>}
          </span>
        ))}
      </div>

      <h1>{frontmatter.title}</h1>
      {frontmatter.description && (
        <p style={{ marginTop: 4, marginBottom: 24, fontSize: 15, color: "var(--docs-text-2)" }}>
          {frontmatter.description}
        </p>
      )}
      <hr />
      {content}
      <Pagination pathname={pathName} />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = await params
  const pathName = slug.join("/")
  const res = await getDocument(pathName)

  if (!res) return null

  const { frontmatter, lastUpdated } = res

  return {
    title: `${frontmatter.title} - ${Settings.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    ...(lastUpdated && {
      lastModified: new Date(lastUpdated).toISOString(),
    }),
  }
}

export function generateStaticParams() {
  return PageRoutes.filter((item) => item.href).map((item) => ({
    slug: item.href.split("/").slice(1),
  }))
}
