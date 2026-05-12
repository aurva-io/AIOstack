"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuGithub, LuArrowUpRight, LuArrowRight } from "react-icons/lu"
import { SheetClose } from "@/components/ui/sheet"

import { Navigations, GitHubLink } from "@/settings/navigation"
import { Logo } from "@/components/navigation/logo"
import { SheetLeft } from "@/components/navigation/sidebar"
import { ModeToggle } from "@/components/navigation/theme-toggle"
import Anchor from "@/components/navigation/anchor"

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <nav className={`navbar-bar${isHome ? " navbar-bar--home" : ""}`}>
      <div className="navbar-inner">
        <div className="flex items-center gap-8">
          <Logo isDark={isHome} />
          <div className="hidden items-center gap-1 md:flex">
            <NavMenu />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isHome && <ModeToggle />}
          <div className="hidden sm:flex items-center gap-2">
            {GitHubLink.href && (
              <a
                href={GitHubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-ghost-btn"
              >
                <LuGithub size={14} className="mr-1.5" />
                Star on GitHub
              </a>
            )}
            <a href="/docs/introduction" className="navbar-primary-btn">
              Install Now
              <LuArrowRight size={13} className="ml-1.5" />
            </a>
          </div>
          <div className="flex sm:hidden">
            <SheetLeft />
          </div>
        </div>
      </div>
    </nav>
  )
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {Navigations.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="navbar-link-active"
            absolute
            className={`navbar-link ${isSheet ? "text-base font-semibold" : ""}`}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title}
            {item.external && <LuArrowUpRight className="ml-1 inline h-3 w-3 align-super" strokeWidth={2.5} />}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>{Comp}</SheetClose>
        ) : (
          Comp
        )
      })}
    </>
  )
}
