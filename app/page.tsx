import { LenisProvider } from "@/components/lenis-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { HeroSection } from "@/components/sections/hero-section"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { EventsSection } from "@/components/sections/events-section"
import { MemberSpotlight } from "@/components/sections/member-spotlight"
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
  const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
  return data || []
}

async function getMembers() {
  const { data } = await supabase.from('members').select('*').order('created_at', { ascending: false })
  return data || []
}

async function getProjects() {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  return data || []
}

async function getPartners() {
  const { data } = await supabase.from('partners').select('*').order('display_order', { ascending: true })
  return data || []
}

async function getTestimonials() {
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  return data || []
}

async function getFAQs() {
  const { data } = await supabase.from('faqs').select('*').order('display_order', { ascending: true })
  return data || []
}

async function getSiteSettings() {
  const { data } = await supabase.from('site_content').select('*')
  // Transform array to key-value object
  return data?.reduce((acc: any, item: any) => {
    acc[item.key] = item.content
    return acc
  }, {}) || {}
}

export default async function Home() {
  const [events, members, projects, partners, testimonials, faqs, settings] = await Promise.all([
    getEvents(),
    getMembers(),
    getProjects(),
    getPartners(),
    getTestimonials(),
    getFAQs(),
    getSiteSettings(),
  ])

  // CMS Values from settings
  const cmsCounts = {
    bounties: settings?.impact_stats?.bounties || 100,
    earned: settings?.financial_stats?.earned || "$50k+",
    nextEventFallback: settings?.luma_settings?.next_event_number,
    carouselImages: settings?.manifesto_assets?.carousel_images || [],
    cornerImages: settings?.manifesto_assets?.corner_images || { left: null, right: null }
  }

  return (
    <LenisProvider>
      <main className="custom-cursor bg-background text-foreground">
        <CustomCursor />
        <HeroSection members={members.slice(0, 4)} eventCount={events.length} memberCount={members.length} />
        <ManifestoSection 
          memberCount={members.length} 
          eventCount={events.length} 
          projectCount={projects.length} 
          bountyCount={cmsCounts.bounties}
          cmsAssets={{ 
            carousel: cmsCounts.carouselImages, 
            corners: cmsCounts.cornerImages 
          }}
        />
        <FeaturesSection 
          members={members.slice(0, 4)} 
          projects={projects.slice(0, 3)} 
          earnedValue={cmsCounts.earned}
          nextEventDate={events.find(e => e.status === 'Upcoming')?.date}
          nextEventFallback={cmsCounts.nextEventFallback}
        />
        <EventsSection initialData={events} settings={settings?.luma_settings} />
        <MemberSpotlight initialData={members} />
        <ShowcaseSection initialData={projects.slice(0, 4)} />
        <CarouselSection initialData={testimonials} />
        <InsightsSection />
        <PartnersSection initialData={partners} />
        <FAQSection initialData={faqs} />
        <JoinSection />
        <FooterSection />
      </main>
    </LenisProvider>
  )
}
