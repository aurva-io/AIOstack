import { notFound } from "next/navigation"
import Link from "next/link"

import { getBlogPost, getAllBlogPosts } from "@/lib/blog"
import { Settings } from "@/lib/meta"
import { Separator } from "@/components/ui/separator"
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition"
        >
          ← Back to the main page
        </Link>

        <article>
          <header className=" px-6 ">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="mb-2 text-muted-foreground">
                {frontmatter.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground border border-gray-200 rounded-xl px-6 py-6">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {frontmatter.author && (
                <>
                  <span>•</span>
                  <span>{frontmatter.author}</span>
                </>
              )}
              {frontmatter.readTime && (
                <>
                  <span>•</span>
                  <span>{frontmatter.readTime}</span>
                </>
              )}
            </div>

          </header>



          <Typography >
            <section className="px-6 text-muted-foreground">{content}</section>
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
