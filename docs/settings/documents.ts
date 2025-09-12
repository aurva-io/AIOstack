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
      {
        title: "Security",
        href: "/security",
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
        title: "Steps",
        href: "/steps",
      },
      {
        title: "Verification",
        href: "/verification",
      },
      {
        title: "Troubleshooting",
        href: "/troubleshooting",
      },
      {
        title: "Next Steps",
        href: "/next-steps",
      },
    ],
  },
]
