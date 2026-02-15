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
import { supabase } from "@/lib/supabase"

export const dynamic = 'force-dynamic'

async function getEvents() {
  const { data } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  return data || []
}

async function getProjects() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)
  return data || []
}

async function getPartners() {
  const { data } = await supabase
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true })
  return data || []
}

export default async function Home() {
  // Fetch everything in parallel
  const [events, projects, partners] = await Promise.all([
    getEvents(),
    getProjects(),
    getPartners(),
  ])

  return (
    <LenisProvider>
      <main className="custom-cursor bg-background text-foreground">
        <CustomCursor />
        <HeroSection />
        <ManifestoSection />
        <FeaturesSection />
        <EventsSection initialData={events} />
        <ShowcaseSection initialData={projects} />
        <CarouselSection />
        <InsightsSection />
        <PartnersSection initialData={partners} />
        <FAQSection />
        <JoinSection />
        <FooterSection />
      </main>
    </LenisProvider>
  )
}
