import { Container } from "../navigation/core-ui"
import Image from "next/image";


export function InvestorSection() {
    return (
        <section className="py-16  bg-background">
            <Container>
                <div className="grid gap-8 md:grid-cols-2 items-center max-w-5xl mx-auto">
                    {/* Left side - Heading */}
                    <div className="flex items-center justify-center md:justify-start">
                        <h2 className="text-xl sm:text-3xl font-semibold text-foreground text-center md:text-left leading-tight">
                            Not just <span className="text-emerald-600 dark:text-emerald-300" >trusted by the best</span> <br />We&apos;re backed by them too
                        </h2>
                    </div>

                    {/* Right side - Investor Logo */}
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center p-8 rounded-2xl border border-border bg-card ring-1 ring-border w-full">
                            <Image
                                src="/nexus_logo.png"
                                alt="Nexus Venture Partners"
                                width={300}
                                height={150}
                                className="w-full max-w-[160px] sm:max-w-[200px] h-auto opacity-100"
                            />
                        </div>

                    </div>

                </div>
            </Container>
        </section>
    )
}