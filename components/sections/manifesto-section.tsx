"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const carouselImages = [
  "/media/images/carousel/default1.jpg",
  "/media/images/carousel/default2.jpg",
  "/media/images/carousel/default3.jpg",
]

const CORNER_TILT = 5

function ImageCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % carouselImages.length)
  }, [])

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[300px] md:h-[500px] mt-24 mb-48 overflow-visible">
      {/* Corner Decorative Images */}
      <motion.div 
        initial={{ opacity: 0, x: -50, rotate: -5 }}
        whileInView={{ opacity: 1, x: 0, rotate: CORNER_TILT }}
        viewport={{ once: true }}
        className="absolute -bottom-12 -left-12 w-32 h-32 md:w-48 md:h-48 z-30 rounded-2xl overflow-hidden border-4 border-background shadow-2xl hidden sm:block"
      >
        <img src="/media/images/banners/malaysia1.jpg" className="w-full h-full object-cover" alt="" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: -CORNER_TILT }}
        viewport={{ once: true }}
        className="absolute -bottom-12 -right-12 w-32 h-32 md:w-48 md:h-48 z-30 rounded-2xl overflow-hidden border-4 border-background shadow-2xl hidden sm:block"
      >
        <img src="/media/images/banners/malaysia2.jpg" className="w-full h-full object-cover" alt="" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full overflow-hidden rounded-[2.5rem] shadow-2xl group border border-border/40 bg-secondary/20"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={carouselImages[index]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            onClick={prev}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border-border/40 hover:bg-iris hover:text-white transition-all shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={next}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border-border/40 hover:bg-iris hover:text-white transition-all shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === i ? "w-8 bg-iris shadow-[0_0_10px_rgba(91,33,182,0.5)]" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
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
    <section id="about" ref={containerRef} className="relative bg-background px-6 py-32">
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

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="relative mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-center text-foreground/20">
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

        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Superteam Malaysia is the local chapter of the global Superteam network, dedicated to empowering builders, creators, founders, and talent in the Solana ecosystem. We connect talent with opportunities and grow the Web3 ecosystem through events, education, and collaboration.
          </p>
        </motion.div>
      </div>

      <ImageCarousel />
    </section>
  )
}
