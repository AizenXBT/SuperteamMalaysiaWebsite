"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LenisProvider } from "@/components/lenis-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { FooterSection } from "@/components/sections/footer-section"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"

const skills = [
  "All",
  "Core Team",
  "Rust",
  "Frontend",
  "Design",
  "Content",
  "Growth",
  "Product",
  "Community",
]

const members = [
  {
    name: "David",
    role: "Core Team",
    skills: ["Core Team", "Product", "Growth"],
    twitter: "@david_stmy",
    photo: "DV",
    achievements: ["Hackathon Winner", "Solana Builder"],
  },
  {
    name: "Arif",
    role: "Developer",
    skills: ["Rust", "Frontend"],
    twitter: "@arif_sol",
    photo: "AR",
    achievements: ["Grant Recipient"],
  },
  {
    name: "Sarah",
    role: "Designer",
    skills: ["Design"],
    twitter: "@sarah_designs",
    photo: "SM",
    achievements: ["Core Contributor"],
  },
  {
    name: "Khalid",
    role: "Community",
    skills: ["Community", "Content"],
    twitter: "@khalid_stmy",
    photo: "KL",
    achievements: ["DAO Contributor"],
  },
]

export default function MembersPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === "All" || m.skills.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <LenisProvider>
      <main className="custom-cursor bg-background min-h-screen">
        <CustomCursor />
        
        {/* Header */}
        <nav className="px-6 py-6 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-clickable>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-iris rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-sans font-bold text-sm">ST</span>
            </div>
            <span className="font-sans font-semibold text-foreground text-sm tracking-tight">
              superteam<span className="text-iris"> MY</span>
            </span>
          </div>
          <div className="w-24" /> {/* Spacer */}
        </nav>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
              Community <em className="italic text-iris">Directory</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Meet the builders, designers, and creators shaping the Solana ecosystem in Malaysia.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-secondary border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-iris/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setActiveFilter(skill)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeFilter === skill
                      ? "bg-iris text-white"
                      : "bg-secondary text-muted-foreground hover:bg-iris/10 hover:text-iris"
                  }`}
                  data-clickable
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-secondary rounded-2xl p-6 border border-border/50 hover:border-iris/30 transition-all group"
                data-clickable
              >
                <div className="w-16 h-16 rounded-full bg-iris/10 flex items-center justify-center text-xl font-serif text-iris mb-4 group-hover:scale-110 transition-transform">
                  {member.photo}
                </div>
                <h3 className="text-xl font-serif text-foreground">{member.name}</h3>
                <p className="text-iris text-xs font-medium uppercase tracking-wider mb-3">{member.role}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-background/50 rounded text-[10px] text-muted-foreground border border-border/50">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  {member.achievements.map(a => (
                    <div key={a} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span className="text-[11px] text-foreground/80 font-medium">{a}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={`https://x.com/${member.twitter}`} 
                  target="_blank" 
                  className="text-muted-foreground hover:text-iris transition-colors inline-flex items-center gap-1.5 text-xs"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {member.twitter}
                </a>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No members found matching your criteria.</p>
            </div>
          )}
        </section>

        <FooterSection />
      </main>
    </LenisProvider>
  )
}
