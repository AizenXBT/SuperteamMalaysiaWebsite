"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Layers, Calendar, Coins } from "lucide-react"

function CommunityAnimation() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex -space-x-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-12 h-12 rounded-full bg-iris/20 border-2 border-background flex items-center justify-center text-xs font-medium"
            animate={{
              scale: active === i ? 1.2 : 1,
              backgroundColor: active === i ? "rgb(var(--iris) / 0.4)" : "rgb(var(--iris) / 0.15)",
              zIndex: active === i ? 10 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-foreground">{["DV", "DS", "CT", "BD"][i]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ProjectsAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-1", "grid-cols-1 grid-rows-3"]

  return (
    <div className="h-full p-4 flex items-center justify-center">
      <motion.div className={`grid ${layouts[layout]} gap-2 w-full max-w-[140px]`} layout>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-iris/20 rounded-md min-h-[30px]"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function EventsAnimation() {
  const [day, setDay] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setDay((prev) => (prev >= 28 ? 1 : prev + 1))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <span className="text-4xl md:text-5xl font-serif text-foreground">{day}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider">Next Event</span>
    </div>
  )
}

function EarnAnimation() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <span className="text-3xl md:text-4xl font-sans font-medium text-foreground">$50k+</span>
      <span className="text-sm text-muted-foreground">Earned by Members</span>
      <div className="w-full max-w-[120px] h-1.5 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-iris rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

const pillars = [
  {
    icon: Users,
    label: "Community",
    title: "Connect with peers.",
    description:
      "Join a vibrant community of developers, designers, and creators. Share knowledge, collaborate on projects, and grow together.",
    animation: CommunityAnimation,
  },
  {
    icon: Layers,
    label: "Projects",
    title: "Build your ideas.",
    description:
      "Create powerful projects that showcase your skills. Our platform helps you collaborate, get feedback, and bring your ideas to life.",
    animation: ProjectsAnimation,
  },
  {
    icon: Calendar,
    label: "Events",
    title: "Learn and grow.",
    description:
      "Attend workshops, hackathons, and networking events. Learn from industry experts and connect with like-minded builders.",
    animation: EventsAnimation,
  },
  {
    icon: Coins,
    label: "Earn",
    title: "Monetize your skills.",
    description:
      "Discover bounties, hackathons, and grants within the Solana ecosystem. Turn your talent into real-world opportunities.",
    animation: EarnAnimation,
  },
]

export function FeaturesSection() {
  return (
    <section id="pillars" className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">What We Offer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground text-balance">
            Everyone belongs in the <em className="italic text-iris">ecosystem</em>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            One ecosystem for every Web3 builder in Malaysia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Animation = pillar.animation
            return (
              <motion.div
                key={i}
                className="bg-secondary rounded-xl p-8 min-h-[320px] flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.96 }}
                data-clickable
              >
                <div className="flex-1">
                  <Animation />
                </div>
                <div className="mt-4">
                  <span className="text-iris text-xs font-medium uppercase tracking-wider">{pillar.label}</span>
                  <h3 className="font-serif text-xl text-foreground mt-1">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
