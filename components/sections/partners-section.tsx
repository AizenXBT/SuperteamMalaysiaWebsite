"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "Solana Foundation", initials: "SF", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Superteam", initials: "ST", logo: "https://superteam.fun/favicon.ico" },
  { name: "Helius", initials: "HL", logo: "https://www.helius.dev/favicon.ico" },
  { name: "Phantom", initials: "PH", logo: "https://phantom.app/favicon.ico" },
  { name: "Jupiter", initials: "JU", logo: "https://jup.ag/favicon.ico" },
  { name: "Magic Eden", initials: "ME", logo: "https://magiceden.io/favicon.ico" },
  { name: "Marinade", initials: "MR", logo: "https://marinade.finance/favicon.ico" },
  { name: "Raydium", initials: "RY", logo: "https://raydium.io/favicon.ico" },
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
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center group hover:bg-iris/10 transition-all p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              data-clickable
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.querySelector('.initials')!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`initials ${partner.logo ? 'hidden' : ''} text-muted-foreground group-hover:text-iris font-sans font-bold text-sm md:text-base transition-colors`}>
                {partner.initials}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
