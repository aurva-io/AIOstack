import Link from "next/link"
import { GitHubLink, Navigations } from "@/settings/navigation"
import { LuArrowUpRight, LuGithub } from "react-icons/lu"

import { buttonVariants } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"
import { Logo } from "@/components/navigation/logo"
import Search from "@/components/navigation/search"
import { SheetLeft } from "@/components/navigation/sidebar"
import { ModeToggle } from "@/components/navigation/theme-toggle"
import { Zap } from "lucide-react";


function PrimaryButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition hover:scale-[1.01] hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-[.99] bg-emerald-500 ${className}`}
    >
      {children}
    </a>
  );
}

function GhostButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-black dark:text-emerald-300 ring-1 ring-black/15 dark:ring-white/15 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${className}`}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  return (
    <nav className="bg-opacity-5 sticky top-0 z-50 h-16 w-full border-b px-2 backdrop-blur-xl backdrop-filter md:px-4">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 p-1 sm:gap-8 sm:p-3 md:gap-12">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-6">
            <div className="flex">
              <Logo />
            </div>
            <div className="text-muted-foreground hidden items-center gap-5 text-sm font-medium md:flex">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex">
            <Search />
          </div>
          <div className="flex gap-2 sm:ml-0">
            {/* {GitHubLink.href && (
              <Link
                href={GitHubLink.href}
                className={buttonVariants({ variant: "outline", size: "icon" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the repository on GitHub"
              >
                <LuGithub className="h-[1.1rem] w-[1.1rem]" />
              </Link>
            )} */}
            <ModeToggle />
          </div>
          <div className="flex items-center gap-2 hidden sm:inline" >
            <GhostButton href={GitHubLink.href}>
              <LuGithub size={16} className="sm:mr-2" />
              <span >Star on GitHub</span>
            </GhostButton>
            <PrimaryButton href="#install" >
              <Zap size={16} className="mr-2" /> Install Free
            </PrimaryButton>
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
            activeClassName="font-bold text-primary"
            absolute
            className={`flex items-center gap-1 ${isSheet ? "text-base font-semibold" : "text-sm font-medium"}`}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title}{" "}
            {item.external && (
              <LuArrowUpRight className={isSheet ? "h-4 w-4 align-super" : "h-3 w-3 align-super"} strokeWidth={3} />
            )}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        )
      })}
    </>
  )
}
