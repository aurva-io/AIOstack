import Image from "next/image"
import { Link } from "lib/transition"

import { Settings } from "@/lib/meta"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src={Settings.siteicon}
        alt={`${Settings.title} main logo`}
        width={28}
        height={28}
        loading="lazy"
        decoding="async"
        className="dark:invert"
      />
      <span className="text-md font-semibold">{Settings.title}</span>
    </Link>
  )
}
