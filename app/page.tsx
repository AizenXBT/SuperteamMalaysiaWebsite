import { LenisProvider } from "@/components/lenis-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { HeroSection } from "@/components/sections/hero-section"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { EventsSection } from "@/components/sections/events-section"
import { ShowcaseSection } from "@/components/sections/showcase-section"
import { CarouselSection } from "@/components/sections/carousel-section"
import { InsightsSection } from "@/components/sections/insights-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { FAQSection } from "@/components/sections/faq-section"
import { JoinSection } from "@/components/sections/join-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <LenisProvider>
      <main className="custom-cursor bg-background">
        <CustomCursor />
        <HeroSection />
        <ManifestoSection />
        <FeaturesSection />
        <EventsSection />
        <ShowcaseSection />
        <CarouselSection />
        <InsightsSection />
        <PartnersSection />
        <FAQSection />
        <JoinSection />
        <FooterSection />
      </main>
    </LenisProvider>
  )
}
