import Image from "next/image"
import { Link } from "lib/transition"

import { Settings } from "@/lib/meta"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="relative w-7 h-7 perspective-1000">
        <div className="relative w-full h-full preserve-3d animate-cube-rotate">
          <Image
            src={Settings.siteicon}
            alt={`${Settings.title} main logo`}
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            className="dark:invert absolute inset-0 backface-hidden"
          />
          <Image
            src={Settings.siteicon2}
            alt={`${Settings.title} secondary logo`}
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 backface-hidden rotate-y-180"
          />
        </div>
      </div>
      <span className="text-md font-semibold">{Settings.title}</span>
    </Link>
  )
}
