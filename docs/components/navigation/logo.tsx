import Image from "next/image"
import { Link } from "lib/transition"

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isLight = tone === "light"

  return (
    <Link href="/" className="flex items-center">
      <Image
        src={isLight ? "/aiostack-logos/aurva.svg" : "/aiostack-logos/aurva-mono.svg"}
        alt="Aurva"
        width={isLight ? 121 : 180}
        height={isLight ? 42 : 61}
        loading="eager"
        decoding="async"
        className="h-8 w-auto"
      />
    </Link>
  )
}
