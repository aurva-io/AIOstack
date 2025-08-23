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
    title: "Navigation",
    href: "/navigation",
    heading: "Documents",
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
