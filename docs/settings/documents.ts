import { Paths } from "@/lib/pageroutes"

export const Documents: Paths[] = [

  {
    title: "Installation",
    href: "/installation",
    noLink: true,
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
    title: "Miscellaneous",
    href: "/misc",
  }
]
