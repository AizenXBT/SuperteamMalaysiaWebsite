"use client"

import { motion } from "framer-motion"

const initialPartners = [
  { name: "Solana Foundation", initials: "SF", logo_url: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Superteam", initials: "ST", logo_url: "https://superteam.fun/favicon.ico" },
  { name: "Helius", initials: "HL", logo_url: "https://www.helius.dev/favicon.ico" },
  { name: "Phantom", initials: "PH", logo_url: "https://phantom.app/favicon.ico" },
  { name: "Jupiter", initials: "JU", logo_url: "https://jup.ag/favicon.ico" },
  { name: "Magic Eden", initials: "ME", logo_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimagedelivery.net%2FE-VnZk4fwouzlzwX_qz4fg%2F532afb9b-8805-424d-8f85-da5c3e0f8600%2Fpublic&f=1&nofb=1&ipt=e534bd240cc6e32c2b7ba30c8b57209a928e193f32258241e933af2bca95a4eb" },
  { name: "Marinade", initials: "MR", logo_url: "https://marinade.finance/favicon.ico" },
  { name: "Raydium", initials: "RY", logo_url: "https://raydium.io/favicon.ico" },
]

export function PartnersSection({ initialData }: { initialData?: any[] }) {
  const partners = initialData && initialData.length > 0 ? initialData : initialPartners

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
              key={partner.id || i}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center group hover:bg-iris/10 transition-all p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              data-clickable
            >
              {partner.logo_url ? (
                <img 
                  src={partner.logo_url} 
                  alt={partner.name} 
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.querySelector('.initials')!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`initials ${partner.logo_url ? 'hidden' : ''} text-muted-foreground group-hover:text-iris font-sans font-bold text-sm md:text-base transition-colors`}>
                {partner.initials}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
