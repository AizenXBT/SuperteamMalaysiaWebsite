"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

const opportunities = [
  {
    title: "Bounties",
    category: "Earn",
    description:
      "Bounties are opportunities to showcase your skills and earn. Complete tasks from Solana projects, submit your work, and get paid in crypto.",
    image: "/visual-storytelling-design-article.jpg",
  },
  {
    title: "Hackathons",
    category: "Build",
    description:
      "Solana hackathons highlight the incredible potential of decentralized technologies. Build cutting-edge innovations across DeFi, DePIN, gaming, and more.",
    image: "/personal-branding-digital-marketing.jpg",
  },
  {
    title: "Grants",
    category: "Fund",
    description:
      "Access Solana Foundation Grants for projects working on decentralization and censorship resistance. From dApps to community initiatives.",
    image: "/typography-trends-modern-fonts.jpg",
  },
  {
    title: "Jobs",
    category: "Career",
    description:
      "Find full-time and freelance opportunities with Solana ecosystem projects. Roles range from development and design to marketing and community.",
    image: "/modern-ui-design-portfolio-mockup.jpg",
  },
]

export function InsightsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section id="earn" className="bg-background px-6 py-24" onMouseMove={handleMouseMove}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">Opportunities</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            <em className="italic text-iris">Earn</em>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Discover multiple opportunities to earn within our community: Bounties, Hackathons, Grants, and Jobs await
            you.
          </p>
        </motion.div>

        <div className="divide-y divide-border/40">
          {opportunities.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              className="group flex items-center justify-between py-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ paddingLeft: 16, paddingRight: 16 }}
              data-clickable
            >
              <div className="flex-1">
                <span className="text-iris text-xs font-medium uppercase tracking-wider">{item.category}</span>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1 group-hover:text-iris transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 max-w-lg leading-relaxed">{item.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-iris group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
            </motion.a>
          ))}
        </div>

        {/* Floating hover image */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="fixed pointer-events-none z-50 w-[200px] md:w-[300px] rounded-lg overflow-hidden shadow-2xl hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePosition.x + 20,
                y: mousePosition.y - 100,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={opportunities[hoveredIndex].image || "/placeholder.svg"}
                alt={opportunities[hoveredIndex].title}
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
