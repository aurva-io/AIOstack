import { promises as fs } from "fs"
import path from "path"

import { Element, Text } from "hast"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { Node } from "unist"
import { visit } from "unist-util-visit"

import { components } from "@/lib/components"

type BlogFrontmatter = {
  title: string
  description: string
  date: string
  author?: string
  keywords?: string
  readTime?: string
}

type BlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: React.ReactElement
  lastUpdated: string
}

type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  readTime?: string
}

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preCopy,
          rehypeCodeTitles,
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  })
}

const preCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre") {
      const [codeEl] = node.children as Element[]
      if (codeEl?.tagName === "code") {
        const textNode = codeEl.children?.[0] as Text
        node.raw = textNode?.value || ""
      }
    }
  })
}

const postCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre" && node.raw) {
      node.properties = node.properties || {}
      node.properties["raw"] = node.raw
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const contentPath = path.join(
      process.cwd(),
      "/contents/blog/",
      `${slug}.mdx`
    )
    const rawMdx = await fs.readFile(contentPath, "utf-8")
    const stats = await fs.stat(contentPath)
    const lastUpdated = stats.mtime.toISOString()

    const parsedMdx = await parseMdx<BlogFrontmatter>(rawMdx)

    return {
      slug,
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      lastUpdated,
    }
  } catch (err) {
    console.error(`Error loading blog post ${slug}:`, err)
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    const blogDir = path.join(process.cwd(), "/contents/blog/")

    // Check if directory exists
    try {
      await fs.access(blogDir)
    } catch {
      console.log("Blog directory does not exist yet")
      return []
    }

    const files = await fs.readdir(blogDir)
    const mdxFiles = files.filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md")
    )

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx?$/, "")
        const contentPath = path.join(blogDir, file)
        const rawMdx = await fs.readFile(contentPath, "utf-8")
        const parsedMdx = await parseMdx<BlogFrontmatter>(rawMdx)

        return {
          slug,
          title: parsedMdx.frontmatter.title,
          description: parsedMdx.frontmatter.description,
          date: parsedMdx.frontmatter.date,
          author: parsedMdx.frontmatter.author,
          readTime: parsedMdx.frontmatter.readTime,
        }
      })
    )

    // Sort by date, newest first
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (err) {
    console.error("Error loading blog posts:", err)
    return []
  }
}
