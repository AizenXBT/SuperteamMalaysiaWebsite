"use client"

import { motion } from "framer-motion"

function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="flex-shrink-0 w-full bg-background rounded-xl p-6 shadow-2xl border border-border/50 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-iris/20 flex items-center justify-center text-sm font-medium text-iris">
            {t.name
              ? t.name.split(" ").map((n: string) => n[0]).join("")
              : "ST"}
          </div>
          <div>
            <p className="font-sans font-semibold text-sm text-foreground">{t.name}</p>
            <p className="text-muted-foreground text-xs">{t.handle}</p>
          </div>
        </div>
        <svg className="w-5 h-5 text-foreground/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed">{t.content}</p>
    </div>
  )
}

function ScrollingColumn({ items, duration, reverse = false }: { items: any[], duration: number, reverse?: boolean }) {
  if (items.length === 0) return <div className="h-[800px]" />;
  
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden h-[800px]">
      <motion.div
        className="flex flex-col"
        animate={{ 
          y: reverse ? [0, -1200] : [-1200, 0] 
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
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

  // Only show section if we have data
  if (data.length === 0) return null;

  return (
    <section id="testimonials" className="bg-background py-32 overflow-hidden relative border-y border-border/10">
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
