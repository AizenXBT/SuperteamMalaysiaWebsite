"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function JoinSection() {
  return (
    <section id="join" className="bg-iris px-6 py-32 overflow-hidden relative">
      {/* Large watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] font-serif font-bold text-primary-foreground/5 whitespace-nowrap select-none">
          SUPERTEAM
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary-foreground leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Be a part of <em className="italic">history</em>
        </motion.h2>

        <motion.p
          className="text-primary-foreground/70 text-lg mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Join the movement. Connect, learn, build, and earn with the best talent in Malaysia&apos;s Web3 ecosystem.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="https://t.me/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-foreground text-iris px-8 py-3.5 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors flex items-center gap-2"
            data-clickable
          >
            Join Telegram
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-8 py-3.5 rounded-lg font-medium hover:bg-primary-foreground/20 transition-colors flex items-center gap-2"
            data-clickable
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </motion.div>
      </div>
    </section>
  )
}
