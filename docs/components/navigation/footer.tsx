import Link from "next/link"
import Image from "next/image"
import { LuGithub } from "react-icons/lu"

import { Company } from "@/lib/meta"
import { GitHubLink } from "@/settings/navigation"

const FOOTER_LINKS = [
  { label: "License", href: "https://github.com/aurva-io/AIOstack/blob/main/LICENSE", external: true },
  { label: "Docs", href: "/docs/home", external: false },
  { label: "FAQs", href: "/faqs", external: false },
]

export function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <div className="flex items-center gap-3">
          {Company.branding !== false && (
            <Link href="https://aurva.io" target="_blank" rel="noopener noreferrer">
              <Image src="/logo.svg" alt="Aurva Logo" width={18} height={18} className="footer-logo" />
            </Link>
          )}
          <span className="footer-text">
            AIOStack &copy; {new Date().getFullYear()}{" "}
            <Link href={Company.link} className="footer-link">
              {Company.name}
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-5">
          {FOOTER_LINKS.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="footer-link"
            >
              {label}
            </Link>
          ))}
          {GitHubLink.href && (
            <Link
              href={GitHubLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-flex items-center gap-1.5"
            >
              <LuGithub className="h-3 w-3" /> GitHub
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
