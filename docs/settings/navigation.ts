import { PageRoutes } from "@/lib/pageroutes"

type NavigationItem = {
  title: string
  href: string
  external?: boolean
}

export const Navigations: NavigationItem[] = [
  {
    title: "Platform",
    href: "/platform",
  },
  {
    title: "Solutions",
    href: "/solutions",
  },
  {
    title: "Use cases",
    href: "/use-cases",
  },
  {
    title: "Docs",
    href: `/docs${PageRoutes[0].href}`,
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "About us",
    href: "/about-us",
  },
]

export const GitHubLink = {
  href: "https://github.com/aurva-io/AIOstack",
}
