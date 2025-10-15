import Image from "next/image"
import Link from "next/link"
import { LuGithub } from "react-icons/lu"

import { Company } from "@/lib/meta"
import { GitHubLink } from "@/settings/navigation"

export function Footer() {
  return (
    <footer className="border-t py-8 text-sm text-muted-foreground">
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
              AIOStack •
              &copy; {new Date().getFullYear()}{" "}  <Link className="font-semibold hover:text-foreground" href={Company.link}>
                {Company.name}
              </Link>{" "}

            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/aurva-io/AIOstack/blob/main/LICENSE" target="_blank"
              rel="noopener noreferrer" className="hover:text-foreground">
              Apache-2.0
            </Link>
            <Link href="#security" className="hover:text-foreground">
              Security
            </Link>
            <Link href="/docs/home" className="hover:text-foreground">
              Docs
            </Link>
            {GitHubLink.href && (
              <Link
                href={GitHubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
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
