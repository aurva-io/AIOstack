import { Paths } from "@/lib/pageroutes"

export const Documents: Paths[] = [
  {
    // heading: "Contents",
    title: "Introduction",
    href: "/home",
    items: [
      {
        title: "Why we built AIOStack",
        href: "/overview",
      },
      {
        title: "Architecture",
        href: "/architecture",
      },
    ],
  },
  {
    title: "Installation",
    href: "/installation",
    items: [
      {
        title: "Pre-requisites",
        href: "/pre-reqs",
      },
      {
        title: "Quick Start",
        href: "/steps",
      },
      {
        title: "Verification",
        href: "/verification",
      },

    ],
  },
  {
    title: "Miscellaneous",
    href: "/misc",
    items: [
      {
        title: "Security Notice",
        href: "/security",
      },
    ],
  }
]
