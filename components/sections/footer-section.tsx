"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

const footerLinks = [
  { label: "Members", href: "/members" },
  { label: "Products", href: "/products" },
  { label: "Earn", href: "https://superteam.fun/earn" },
  { label: "FAQ", href: "/#faq" },
]

const socialLinks = [
  {
    label: "X / Twitter",
    href: "https://x.com/SuperteamMY",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/SuperteamMY",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
]

export function FooterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { error } = await supabase.from('contact_submissions').insert([{ email }])

    if (!error) {
      toast.success("Thanks for joining!")
      setEmail("")
    } else {
      toast.error("Something went wrong. Please try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <footer className="relative bg-background px-6 py-24 overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <p className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-archivo font-bold text-foreground/[0.03] whitespace-nowrap leading-none select-none -mb-12">
          SUPERTEAM 🇲🇾
        </p>
      </div>

      {/* Gradient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-iris/20 via-lilac/10 to-lime/10 opacity-40 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Logo, tagline, nav */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-iris rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-sans font-bold text-sm">ST</span>
              </div>
              <span className="font-archivo font-bold text-foreground text-lg tracking-tight">
                superteam<span className="text-iris ml-1">🇲🇾</span>
              </span>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-sm max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              The Talent Layer of Solana in Malaysia. Building, learning, and earning together.
            </motion.p>

            <nav className="flex flex-wrap gap-6 mt-8">
              {footerLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-clickable
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-iris transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  data-clickable
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Get in Touch + Subscribe */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-serif text-lg text-foreground mb-2">Get in touch</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Join us on our journey to build the Solana ecosystem in Malaysia.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-secondary border-0 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-iris transition-all disabled:opacity-50"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="bg-foreground text-background p-3 rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                data-clickable
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </form>
            <p className="text-muted-foreground text-xs mt-2">
              {"We'll send you updates about our projects and events."}
            </p>

            <a
              href="https://superteam.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-iris text-sm font-medium mt-6 hover:gap-2 transition-all"
              data-clickable
            >
              Superteam Global <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Superteam Malaysia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm" data-clickable>
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm" data-clickable>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
