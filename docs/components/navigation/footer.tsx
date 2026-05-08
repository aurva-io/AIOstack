import Image from "next/image"
import Link from "next/link"
import { LuGithub } from "react-icons/lu"

import { Company } from "@/lib/meta"
import { GitHubLink } from "@/settings/navigation"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050B17] py-8 text-sm text-white/55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            {Company.branding !== false && (
              <Link
                href="https://aurva.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image
                  src="/logo.svg"
                  alt="Aurva Logo"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </Link>
            )}
            <span>
              Aurva •
              &copy; {new Date().getFullYear()}{" "}  <Link className="font-semibold hover:text-white" href={Company.link}>
                {Company.name}
              </Link>{" "}

            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="https://github.com/aurva-io/AIOstack/blob/main/LICENSE" target="_blank"
              rel="noopener noreferrer" className="hover:text-white">
              License
            </Link>
            <Link href="/platform" className="hover:text-white">
              Platform
            </Link>
            <Link href="/solutions" className="hover:text-white">
              Solutions
            </Link>
            <Link href="/docs/home" className="hover:text-white">
              Docs
            </Link>
            <Link href="/faqs" className="hover:text-white">
              FAQs
            </Link>
            {GitHubLink.href && (
              <Link
                href={GitHubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white"
              >
                <LuGithub className="h-3.5 w-3.5" /> GitHub
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
