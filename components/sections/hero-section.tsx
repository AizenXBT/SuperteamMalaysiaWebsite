"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Pillars", href: "#pillars" },
  { label: "Events", href: "#events" },
  { label: "Members", href: "/members" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Earn", href: "#earn" },
  { label: "FAQ", href: "#faq" },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-background overflow-hidden"
    >
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#" className="flex items-center gap-2" data-clickable>
          <div className="w-8 h-8 bg-iris rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-sans font-bold text-sm">ST</span>
          </div>
          <span className="font-archivo font-bold text-foreground text-base tracking-tight">
            superteam<span className="text-iris ml-1">🇲🇾</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              data-clickable
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.a
            href="#join"
            className="bg-iris text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-iris/90 transition-colors flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            data-clickable
          >
            Join Community
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24"
        style={{ y, opacity }}
      >
        {/* Announcement pill */}
        <motion.a
          href="https://x.com/SuperteamMY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-2 mb-8 text-sm text-muted-foreground hover:text-foreground hover:border-iris/50 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          data-clickable
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Building Solana in Malaysia
          <ArrowRight className="w-3 h-3" />
        </motion.a>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] text-foreground max-w-5xl text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          The Talent Layer
          <br />
          of <em className="italic text-iris">Solana</em>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Superteam Malaysia is a community of the best talent learning, earning, and building in the Solana ecosystem.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="https://t.me/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-iris text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:bg-iris/90 transition-colors"
            data-clickable
          >
            Join the Community
          </a>
          <a
            href="https://superteam.fun/earn/regions/malaysia"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-foreground px-8 py-3.5 rounded-lg font-medium hover:bg-accent/30 transition-colors border border-border/40"
            data-clickable
          >
            Explore Opportunities
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="flex items-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex -space-x-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
              >
                {["DV", "AR", "SM", "KL"][i]}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-iris/20 border-2 border-background flex items-center justify-center text-xs font-medium text-iris">
              +
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">500+</strong> members
            </span>
            <span className="w-px h-4 bg-border" />
            <span>
              <strong className="text-foreground">50+</strong> events
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-1 h-2 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
