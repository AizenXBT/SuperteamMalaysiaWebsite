"use client"

import { motion } from "framer-motion"
import { Twitter, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Kate",
    handle: "@eggiekate",
    text: "Congratulations new @SuperteamMY leads @m_onchain @W_Han_01 🙌 well deserved 🫶 Was fun ending the year with everyone at the Superteam Malaysia Year End Party ✨",
    id: "2005824809750467068",
    height: "h-auto"
  },
  {
    name: "Superteam Malaysia",
    handle: "@SuperteamMY",
    text: "2/ Drum roll…🥁 Winners! 🥇 @chaindex_xyz 🥈 @MirrorFi_xyz 🥉 @yieldsdotso. Huge congrats to all 3 with stellar presentations, demos & tight answers in Q&A🚀",
    id: "1993507268864938021",
    height: "h-auto"
  },
  {
    name: "Superteam Malaysia",
    handle: "@SuperteamMY",
    text: "Congrats @chaindex_xyz, glad to see projects from Malaysia to Taiwan for the @AppWorks accelerator! Kudos our lovely builder @m_onchain and her husband!",
    id: "2009200588106739975",
    height: "h-auto"
  },
  {
    name: "Superteam Malaysia",
    handle: "@SuperteamMY",
    text: "1/ Big congrats to our #CYPHERthonMY winners by @SuperteamMY @solana, powered by @AppWorks, @jelawangcapital, @magicblock, @sns, @AWSstartups. 🥇 @blox_malaysia 🥈 @chaindex_xyz...",
    id: "1985242141023719477",
    height: "h-auto"
  },
  {
    name: "Superteam Malaysia",
    handle: "@SuperteamMY",
    text: "Congrats to all the winners! And so proud of the projects in Malaysia that can make it this far! @mirrorfi_xyz",
    id: "1958317788352872540",
    height: "h-auto"
  },
  {
    name: "Superteam Malaysia",
    handle: "@SuperteamMY",
    text: "Congrats to our Malaysian Projects @hypebiscus_xyz and the new project Yeeteora that will be participating in @colosseum next! Malaysia is coming with a bunch of super dev and founders this time, gonna rewrite the history !",
    id: "1970763694201262405",
    height: "h-auto"
  },
  {
    name: "Solana Foundation",
    handle: "@solana",
    text: "The speed of innovation in the Malaysian Solana ecosystem is incredible. Builders are shipping real products.",
    id: "ext1",
    height: "h-auto"
  },
  {
    name: "Web3 Builder",
    handle: "@buidl_my",
    text: "Superteam MY is more than a community, it's an accelerator for your career in Web3. Best decision I made this year.",
    id: "ext2",
    height: "h-auto"
  },
  {
    name: "Ecosystem Lead",
    handle: "@st_global",
    text: "Malaysia is becoming a powerhouse for Solana builders in SEA. The talent here is world-class.",
    id: "ext3",
    height: "h-auto"
  }
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className={`w-full bg-secondary/30 backdrop-blur-xl rounded-[2.5rem] p-8 border border-border/40 shadow-xl mb-6 group hover:border-iris/40 transition-all duration-500`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">{t.name}</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">{t.handle}</p>
          </div>
        </div>
        <Twitter className="w-4 h-4 text-iris/20 group-hover:text-iris transition-colors" />
      </div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-iris/5 -z-10" />
        <p className="text-foreground/80 text-sm leading-relaxed font-medium">
          {t.text}
        </p>
      </div>
    </div>
  )
}

function ScrollingColumn({ items, duration, reverse = false }: { items: any[], duration: number, reverse?: boolean }) {
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden h-[800px]">
      <motion.div
        className="flex flex-col gap-6"
        animate={{ 
          y: reverse ? [0, -1200] : [-1200, 0] 
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

export function CarouselSection({ initialData }: { initialData?: any[] }) {
  const data = initialData && initialData.length > 0 ? initialData : []
  
  // Distribute items into 3 columns
  const col1 = data.filter((_, i) => i % 3 === 0)
  const col2 = data.filter((_, i) => i % 3 === 1)
  const col3 = data.filter((_, i) => i % 3 === 2)

  // Ensure columns aren't empty for the animation to work
  if (data.length === 0) return null;

  return (
    <section id="testimonials" className="bg-background py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-iris text-xs font-black uppercase tracking-[0.3em] mb-4 block">Wall of Love</span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[0.9]">
            Built by the <em className="italic text-iris text-6xl md:text-8xl">community</em>
          </h2>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-muted-foreground text-lg max-w-sm"
        >
          Discover why Malaysia&apos;s brightest minds choose Superteam as their home for Web3 growth.
        </motion.p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[800px] overflow-hidden">
          <ScrollingColumn items={col1} duration={40} />
          <ScrollingColumn items={col2} duration={50} reverse />
          <ScrollingColumn items={col3} duration={45} />
        </div>

        {/* Massive fade overlays */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  )
}
