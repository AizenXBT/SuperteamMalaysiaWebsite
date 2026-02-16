"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, ArrowRight, Award, ExternalLink, User } from "lucide-react"
import Link from "next/link"

const fallbackMembers = [
  {
    id: "1",
    name: "David",
    role: "Core Team",
    skills: ["Core Team", "Product", "Growth"],
    twitter: "@david_stmy",
    photo: "DV",
    achievements: ["Hackathon Winner", "Solana Builder"],
    bio: "Building the next generation of Web3 talent in Malaysia.",
    projects: ["STMY Website", "Solana Hub"]
  },
  {
    id: "2",
    name: "Arif",
    role: "Developer",
    skills: ["Rust", "Frontend"],
    twitter: "@arif_sol",
    photo: "AR",
    achievements: ["Grant Recipient", "Core Contributor"],
    bio: "Rust enthusiast and frontend wizard. Building on Solana since 2021.",
    projects: ["SolPay MY", "Batik DAO"]
  },
  {
    id: "3",
    name: "Sarah",
    role: "Designer",
    skills: ["Design"],
    twitter: "@sarah_designs",
    photo: "SM",
    achievements: ["Core Contributor", "Design Lead"],
    bio: "Creating beautiful and intuitive Web3 experiences.",
    projects: ["STMY Brand Kit"]
  }
]

function MemberCard({ member, index }: { member: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[400px] w-[300px] perspective-1000 group flex-shrink-0"
      data-clickable
    >
      <motion.div
        className="w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isHovered ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-secondary/40 backdrop-blur-md rounded-2xl p-8 border border-border/20 flex flex-col items-center text-center justify-center">
          <div className="w-24 h-24 rounded-full bg-iris/10 flex items-center justify-center text-3xl font-serif text-iris mb-6 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
            {member.photo_url ? (
              <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <span>{member.photo || member.name.substring(0, 2)}</span>
            )}
          </div>
          <h3 className="text-2xl font-serif text-foreground mb-1">{member.name}</h3>
          <p className="text-iris text-sm font-medium uppercase tracking-wider mb-4">{member.role}</p>
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {member.skills?.slice(0, 3).map((s: string) => (
              <span key={s} className="px-2.5 py-1 bg-background/50 rounded-full text-[10px] text-muted-foreground border border-border/20">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 text-muted-foreground text-[10px] font-medium uppercase tracking-widest opacity-60">
            <span>Hover to reveal</span>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden bg-iris rounded-2xl p-8 text-white rotate-y-180 flex flex-col shadow-2xl shadow-iris/20">
          <h3 className="text-xl font-serif mb-2">{member.name}</h3>
          <p className="text-white/80 text-xs leading-relaxed mb-6 line-clamp-3">{member.bio}</p>
          
          <div className="space-y-4 mb-6 text-left overflow-y-auto pr-2 custom-scrollbar-mini">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-bold">Achievements</p>
              <div className="space-y-1.5">
                {member.achievements?.map((a: string) => (
                  <div key={a} className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-lime" />
                    <span className="text-xs font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-bold">Projects</p>
              <div className="flex flex-wrap gap-1.5">
                {member.projects?.map((p: string) => (
                  <span key={p} className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <a 
              href={`https://x.com/${member.twitter?.replace('@', '')}`} 
              target="_blank" 
              className="text-white hover:text-lime transition-colors inline-flex items-center gap-1.5 text-xs font-medium"
            >
              <Twitter className="w-3.5 h-3.5" />
              {member.twitter}
            </a>
            <ExternalLink className="w-3.5 h-3.5 text-white/40" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MemberSpotlight({ initialData }: { initialData?: any[] }) {
  const members = initialData && initialData.length > 0 ? initialData : fallbackMembers
  const scrollItems = [...members, ...members, ...members]

  return (
    <section className="bg-background py-32 overflow-hidden border-y border-border/10">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
        <div>
          <span className="text-iris text-xs font-black uppercase tracking-[0.2em] mb-4 block">Community Spotlight</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
            Meet the <em className="italic text-iris">members</em>
          </h2>
        </div>
        <Link 
          href="/members" 
          className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-iris transition-all"
        >
          View All members 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative">
        <motion.div 
          className="flex gap-8 px-8"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {scrollItems.map((member, i) => (
            <MemberCard key={i} member={member} index={i} />
          ))}
        </motion.div>

        {/* Edge masks */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .custom-scrollbar-mini::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar-mini::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}
