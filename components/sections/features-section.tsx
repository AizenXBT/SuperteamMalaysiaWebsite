"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Layers, Calendar, Coins } from "lucide-react"

const backdropImages = [
  "/media/images/banners/malaysia1.jpg",
  "/media/images/banners/malaysia2.jpg",
  "/media/images/banners/malaysia3.jpg",
]

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backdropImages.length)
    }, 5000) // Change image every 5 seconds (including 2s fade)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={backdropImages[index]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }} // 2s fade
        />
      </AnimatePresence>
    </div>
  )
}

function CommunityAnimation({ members = [] }: { members?: any[] }) {
  const [active, setActive] = useState(0)
  
  // Available members (4 max, if less than 4, repeat)
  const displayMembers = members.length > 0 
    ? [...members, ...members, ...members, ...members].slice(0, 4) 
    : []

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex -space-x-4">
        {displayMembers.length > 0 ? displayMembers.map((member, i) => (
          <motion.div
            key={i}
            className="w-12 h-12 rounded-full bg-iris/20 border-2 border-background flex items-center justify-center text-[10px] font-medium overflow-hidden"
            animate={{
              scale: active === i ? 1.2 : 1,
              backgroundColor: active === i ? "rgb(var(--iris) / 0.4)" : "rgb(var(--iris) / 0.15)",
              zIndex: active === i ? 10 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {member.photo_url ? (
              <img src={member.photo_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-foreground">{member.name?.substring(0, 2).toUpperCase() || "ST"}</span>
            )}
          </motion.div>
        )) : [0, 1, 2, 3].map((i) => (
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

function ProjectsAnimation({ projects = [] }: { projects?: any[] }) {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-1", "grid-cols-1 grid-rows-3"]
  
  // Use projects from directory (three random max or first three)
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : [null, null, null]

  return (
    <div className="h-full p-4 flex items-center justify-center">
      <motion.div className={`grid ${layouts[layout]} gap-2 w-full max-w-[140px]`} layout>
        {displayProjects.map((project, i) => (
          <motion.div
            key={project?.id || i}
            className="bg-iris/20 rounded-md min-h-[30px] flex items-center justify-center p-1 overflow-hidden"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {project ? (
              <span className="text-[8px] font-bold text-iris/80 uppercase truncate px-1">{project.name}</span>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function EventsAnimation({ nextDate, fallback }: { nextDate?: string, fallback?: number }) {
  const [displayDay, setDisplayDay] = useState(fallback || 15)

  useEffect(() => {
    if (nextDate) {
      const day = new Date(nextDate).getDate()
      setDisplayDay(day)
    }
  }, [nextDate])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <span className="text-4xl md:text-5xl font-serif text-foreground">{displayDay}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider">Next Event</span>
    </div>
  )
}

function EarnAnimation({ value }: { value?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <span className="text-3xl md:text-4xl font-sans font-medium text-foreground">{value || "$50k+"}</span>
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

export function FeaturesSection({ 
  members = [], 
  projects = [], 
  earnedValue,
  nextEventDate,
  nextEventFallback
}: { 
  members?: any[], 
  projects?: any[], 
  earnedValue?: string,
  nextEventDate?: string,
  nextEventFallback?: number
}) {
  const pillars = [
    {
      icon: Users,
      label: "Community",
      title: "Connect with peers.",
      description:
        "Join a vibrant community of developers, designers, and creators. Share knowledge, collaborate on projects, and grow together.",
      animation: <CommunityAnimation members={members} />,
    },
    {
      icon: Layers,
      label: "Projects",
      title: "Build your ideas.",
      description:
        "Create powerful projects that showcase your skills. Our platform helps you collaborate, get feedback, and bring your ideas to life.",
      animation: <ProjectsAnimation projects={projects} />,
    },
    {
      icon: Calendar,
      label: "Events",
      title: "Learn and grow.",
      description:
        "Attend workshops, hackathons, and networking events. Learn from industry experts and connect with like-minded builders.",
      animation: <EventsAnimation nextDate={nextEventDate} fallback={nextEventFallback} />,
    },
    {
      icon: Coins,
      label: "Earn",
      title: "Monetize your skills.",
      description:
        "Discover bounties, hackathons, and grants within the Solana ecosystem. Turn your talent into real-world opportunities.",
      animation: <EarnAnimation value={earnedValue} />,
    },
  ]

  return (
    <section id="pillars" className="relative bg-background px-6 py-24 overflow-hidden">
      <BackgroundSlideshow />
      
      <div className="relative z-20 max-w-6xl mx-auto">
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
            return (
              <motion.div
                key={i}
                className="bg-background/40 md:bg-secondary/40 backdrop-blur-md rounded-xl p-8 min-h-[320px] flex flex-col border border-border/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 0.98, backgroundColor: "rgba(var(--secondary), 0.6)" }}
                whileTap={{ scale: 0.96 }}
                data-clickable
              >
                <div className="flex-1">
                  {pillar.animation}
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
