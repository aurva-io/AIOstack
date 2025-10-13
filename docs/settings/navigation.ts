import { PageRoutes } from "@/lib/pageroutes"

export const Navigations = [
  {
    title: "Docs",
    href: `/docs${PageRoutes[0].href}`,
  },
  {
    title: "Home",
    href: "https://aurva.io",
    external: false,
  },
]

export const GitHubLink = {
  href: "https://github.com/aurva-io/ai-observability-stack",
}
