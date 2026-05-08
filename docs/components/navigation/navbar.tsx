"use client"

import { usePathname } from "next/navigation"
import { GitHubLink, Navigations } from "@/settings/navigation"
import { LuArrowUpRight, LuGithub } from "react-icons/lu"
import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"
import { Logo } from "@/components/navigation/logo"
import Search from "@/components/navigation/search"
import { SheetLeft } from "@/components/navigation/sidebar"
import { ModeToggle } from "@/components/navigation/theme-toggle"


function PrimaryButton({ children, href = "#", onClick, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-[#80CB51] px-4 py-2 text-sm font-medium text-[#07100B] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#80CB51] ${className}`}
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
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/78 ring-1 ring-white/15 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#80CB51] ${className}`}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/about'
  const isLightHome = pathname === '/'

  return (
    <nav className={`sticky top-0 z-50 h-16 w-full border-b px-2 backdrop-blur-xl backdrop-filter md:px-4 ${isLightHome ? "border-[#E2DED5] bg-[#F7F5EF]/90 text-[#111411]" : "border-white/10 bg-[#050B17]/95 text-white"}`}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 p-1 sm:gap-8 sm:p-3 md:gap-12">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-6">
            <div className="flex">
              <Logo tone={isLightHome ? "light" : "dark"} />
            </div>
            <div className={`hidden items-center gap-5 text-sm font-medium md:flex ${isLightHome ? "text-[#686D64]" : "text-muted-foreground"}`}>
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex">
            {!isHomePage && <Search />}
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
            {!isHomePage && <ModeToggle />}
          </div>
          {isLightHome ? (
            <div className="hidden sm:flex items-center gap-3">
              <GhostButton href="/#demo" className="rounded-[10px] text-[#111411] ring-[#D3D0C6] hover:bg-white">
                Talk to an Engineer
              </GhostButton>
              <PrimaryButton href="https://aurva.ai/#install" className="rounded-[10px]">
                Try free
              </PrimaryButton>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <GhostButton href={GitHubLink.href}>
                <LuGithub size={16} className="mr-2" />
                <span>Star on GitHub</span>
              </GhostButton>
              <PrimaryButton href="/#demo">
                Get a demo
              </PrimaryButton>
            </div>
          )}
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
            activeClassName="font-bold text-white"
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
