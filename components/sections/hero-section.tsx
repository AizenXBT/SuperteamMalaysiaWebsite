"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle 
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Pillars", href: "#pillars" },
  { label: "Events", href: "#events" },
  { label: "Members", href: "/members" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Earn", href: "#earn" },
  { label: "FAQ", href: "#faq" },
]

export function HeroSection({ members = [], memberCount = 500, eventCount = 50 }: { members?: any[], memberCount?: number, eventCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const Logo = () => (
    <a href="/" className="flex items-center gap-2" data-clickable>
      <span className="font-archivo font-bold text-foreground text-base md:text-lg tracking-tight">
        superteam<span className="text-iris ml-1">🇲🇾</span>
      </span>
    </a>
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-background overflow-hidden"
    >
      {/* Background Banners */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <img
          src="/media/images/banners/hero-light-mode.png"
          alt=""
          className="w-full h-full object-cover opacity-40 dark:hidden"
        />
        <img
          src="/media/images/banners/hero-dark-mode.png"
          alt=""
          className="w-full h-full object-cover opacity-40 hidden dark:block"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
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

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          {/* Desktop CTA */}
          <motion.a
            href="https://t.me/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-iris text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-iris/90 transition-colors items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            data-clickable
          >
            Join Community
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* Mobile Hamburger with Bottom Drawer */}
          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-background/95 backdrop-blur-xl border-t border-border/50 pb-12">
                <DrawerHeader className="text-center border-b border-border/10 pb-6">
                  <DrawerTitle className="flex justify-center">
                    <Logo />
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-1 p-6 max-h-[60vh] overflow-y-auto">
                  {navLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="text-xl font-serif text-foreground hover:text-iris transition-colors py-3 text-center"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <a
                      href="https://t.me/SuperteamMY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-iris text-primary-foreground px-6 py-4 rounded-2xl text-lg font-medium hover:bg-iris/90 transition-colors items-center justify-between group"
                    >
                      <span>Join Community</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 relative z-10"
        style={{ y, opacity }}
      >
        {/* Announcement pill */}
        <motion.a
          href="https://x.com/SuperteamMY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary border border-border/40 rounded-full px-4 py-2 mb-8 text-sm text-muted-foreground hover:text-foreground hover:border-iris/50 transition-colors"
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
            href="#earn"
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
            {members.slice(0, 4).map((member, i) => (
              <div
                key={member.id || i}
                className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground overflow-hidden shadow-sm"
              >
                {member.photo_url ? (
                  <img src={member.photo_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span>{member.name?.substring(0, 2).toUpperCase() || "ST"}</span>
                )}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-iris/20 border-2 border-background flex items-center justify-center text-xs font-medium text-iris backdrop-blur-sm">
              +
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{memberCount}+</strong> members
            </span>
            <span className="w-px h-4 bg-border/40" />
            <span>
              <strong className="text-foreground">{eventCount}+</strong> events
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
