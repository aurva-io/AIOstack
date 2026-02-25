import Link from "next/link"

import { getAllBlogPosts } from "@/lib/blog"

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-4xl mb-5">
            Blog
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl">
            Stay up to date with the latest updates, insights, and announcements from AIOStack
          </p>
        </div>
        <div className="relative w-full">

        </div>
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className="group relative h-full rounded-xl border border-border/200 bg-card/50 backdrop-blur-sm p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Border Effect on Hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>

                  {/* Content */}
                  <div className="relative">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mb-5">
                      <time className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post.readTime && (
                        <>
                          <span className="text-muted-foreground/50">•</span>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {post.readTime}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mb-4 text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-tight">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-muted-foreground mb-6">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      {post.author ? (
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                            {post.author.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {post.author}
                          </span>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all duration-300">
                        Read article
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No posts yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Check back soon for the latest updates and insights from the AIOStack team.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
