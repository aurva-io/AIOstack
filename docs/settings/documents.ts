import { Paths } from "@/lib/pageroutes"

export const Documents: Paths[] = [
  {
    // heading: "Contents",
    title: "Introduction",
    href: "/home",
    items: [
      {
        title: "Installation",
        href: "/installation",
      },
      {
        title: "Setup",
        href: "/setup",
      },
      {
        title: "Changelog",
        href: "/changelog",
      },
    ],
  },

  {
    title: "Overview",
    href: "/overview",
    items: [
      {
        title: "Architecture",
        href: "/architecture",
      },
    ],
  },

  {
    spacer: true,
  },
  {
    title: "Random",
    href: "/random",
    heading: "Random",
  },

  {
    spacer: true,
  },
]
