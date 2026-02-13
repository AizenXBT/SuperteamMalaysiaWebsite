"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "Solana Foundation", initials: "SF" },
  { name: "Superteam", initials: "ST" },
  { name: "Helius", initials: "HL" },
  { name: "Phantom", initials: "PH" },
  { name: "Jupiter", initials: "JU" },
  { name: "Magic Eden", initials: "ME" },
  { name: "Marinade", initials: "MR" },
  { name: "Raydium", initials: "RY" },
]

export function PartnersSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground">
            <em className="italic text-iris">Powered</em> by our partners
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            We collaborate with industry leaders who share our vision for innovation and excellence in the Solana
            ecosystem.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center group hover:bg-iris/10 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              data-clickable
            >
              <span className="text-muted-foreground group-hover:text-iris font-sans font-bold text-sm md:text-base transition-colors">
                {partner.initials}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
