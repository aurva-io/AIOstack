import { notFound } from "next/navigation"
import Link from "next/link"

import { getBlogPost, getAllBlogPosts } from "@/lib/blog"
import { Settings } from "@/lib/meta"
import { Typography } from "@/components/ui/typography"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <main className="relative min-h-screen bg-white dark:bg-neutral-900 text-foreground">

      {/* Gradient edges to blend into site background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent dark:from-neutral-900" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent dark:from-neutral-900" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-background to-transparent dark:from-neutral-900" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background to-transparent dark:from-neutral-900" />

      <div className="relative mx-auto w-full max-w-3xl px-6 pt-10 pb-20 sm:px-8 sm:pt-14">

        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="mb-3 text-4xl  font-semibold leading-tight tracking-tight text-foreground">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
                {frontmatter.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 border-t border-neutral-900 border-border dark:border-white pt-4 text-sm text-muted-foreground">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {frontmatter.author && (
                <>
                  <span className="opacity-40">·</span>
                  <span>{frontmatter.author}</span>
                </>
              )}
              {frontmatter.readTime && (
                <>
                  <span className="opacity-40">·</span>
                  <span>{frontmatter.readTime}</span>
                </>
              )}
            </div>
          </header>

          <Typography>
            <section>{content}</section>
          </Typography>
        </article>
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) return null

  const { frontmatter } = post

  return {
    title: `${frontmatter.title} - ${Settings.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
