"use client"

import HeroV4 from "@/components/homepage/v4/HeroV4"
import ObservatoriesSection from "@/components/homepage/v4/ObservatoriesSection"
import HowItWorksSection from "@/components/homepage/v4/HowItWorksSection"
import OutcomesSection from "@/components/homepage/v4/OutcomesSection"
import RosterSection from "@/components/homepage/v4/RosterSection"
import FinalCTASection from "@/components/homepage/v4/FinalCTASection"
import { Footer } from "@/components/navigation/footer"

export default function Home() {
  return (
    <div className="v4-page dark">
      <div className="v4-frame">
        <HeroV4 />
        <ObservatoriesSection />
        <HowItWorksSection />
        <OutcomesSection />
        <RosterSection />
        <FinalCTASection />
      </div>
      <Footer />
    </div>
  )
}
