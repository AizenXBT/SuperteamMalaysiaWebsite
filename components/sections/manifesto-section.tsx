"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: "+", label: "Community", sublabel: "Active Members" },
  { value: 50, suffix: "+", label: "Events", sublabel: "Hosted & Counting" },
  { value: 30, suffix: "+", label: "Projects", sublabel: "Built on Solana" },
  { value: 100, suffix: "+", label: "Bounties", sublabel: "Completed" },
]

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const clipPath = useTransform(scrollYProgress, [0.2, 0.6], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-background px-6 py-32"
    >
      {/* Stats Row */}
      <div className="max-w-6xl mx-auto mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-secondary rounded-xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              data-clickable
            >
              <p className="text-3xl md:text-5xl font-serif text-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-sans font-semibold text-foreground text-sm mt-2">{stat.label}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Manifesto text reveal */}
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-center text-foreground/10">
          Support builders.
          <br />
          Grow the ecosystem.
        </h2>

        <motion.h2
          className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-center bg-gradient-to-r from-iris via-lilac to-iris bg-clip-text text-transparent"
          style={{ clipPath }}
        >
          Support builders.
          <br />
          Grow the ecosystem.
        </motion.h2>
      </div>

      {/* About paragraph */}
      <motion.div
        className="max-w-3xl mx-auto mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-muted-foreground text-lg leading-relaxed">
          Superteam Malaysia is the local chapter of the global Superteam network, dedicated to empowering builders,
          creators, founders, and talent in the Solana ecosystem. We connect talent with opportunities and grow the Web3
          ecosystem through events, education, and collaboration.
        </p>
      </motion.div>
    </section>
  )
}
