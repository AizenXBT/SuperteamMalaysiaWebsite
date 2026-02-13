"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LenisProvider } from "@/components/lenis-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { FooterSection } from "@/components/sections/footer-section"
import { 
  ArrowLeft, 
  Search, 
  Twitter, 
  ExternalLink, 
  Award, 
  User, 
  Code,
  Command as CommandIcon 
} from "lucide-react"
import Link from "next/link"
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ThemeToggle } from "@/components/theme-toggle"

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
    bio: "Building the next generation of Web3 talent in Malaysia.",
    projects: ["STMY Website", "Solana Hub"]
  },
  {
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
    name: "Sarah",
    role: "Designer",
    skills: ["Design"],
    twitter: "@sarah_designs",
    photo: "SM",
    achievements: ["Core Contributor", "Design Lead"],
    bio: "Creating beautiful and intuitive Web3 experiences.",
    projects: ["STMY Brand Kit"]
  },
  {
    name: "Khalid",
    role: "Community",
    skills: ["Community", "Content"],
    twitter: "@khalid_stmy",
    photo: "KL",
    achievements: ["DAO Contributor", "Events Lead"],
    bio: "Connecting builders and growing the ecosystem one event at a time.",
    projects: ["KL DeFi Hub"]
  },
  {
    name: "Mei",
    role: "Writer",
    skills: ["Content"],
    twitter: "@mei_content",
    photo: "MC",
    achievements: ["Bounty Winner"],
    bio: "Simplifying complex Web3 concepts through storytelling.",
    projects: ["STMY Newsletter"]
  },
  {
    name: "Raj",
    role: "Growth",
    skills: ["Growth", "Product"],
    twitter: "@raj_growth",
    photo: "RP",
    achievements: ["Hackathon Winner"],
    bio: "Scaling products and communities in the Solana ecosystem.",
    projects: ["Earn Portal"]
  }
]

function MemberCard({ member, index }: { member: typeof members[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[400px] perspective-1000 group"
      data-clickable
    >
      <motion.div
        className="w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isHovered ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-secondary rounded-2xl p-8 border border-border/50 flex flex-col items-center text-center justify-center">
          <div className="w-24 h-24 rounded-full bg-iris/10 flex items-center justify-center text-3xl font-serif text-iris mb-6 group-hover:scale-110 transition-transform duration-500">
            {member.photo}
          </div>
          <h3 className="text-2xl font-serif text-foreground mb-1">{member.name}</h3>
          <p className="text-iris text-sm font-medium uppercase tracking-wider mb-4">{member.role}</p>
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {member.skills.slice(0, 3).map(s => (
              <span key={s} className="px-2.5 py-1 bg-background/50 rounded-full text-[10px] text-muted-foreground border border-border/50">
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
          <p className="text-white/80 text-xs leading-relaxed mb-6">{member.bio}</p>
          
          <div className="space-y-4 mb-6 text-left">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-bold">Achievements</p>
              <div className="space-y-1.5">
                {member.achievements.map(a => (
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
                {member.projects.map(p => (
                  <span key={p} className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <a 
              href={`https://x.com/${member.twitter}`} 
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

export default function MembersPage() {
  const [open, setOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                         m.role.toLowerCase().includes(search.toLowerCase()) ||
                         m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchesFilter = activeFilter === "All" || m.skills.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <LenisProvider>
      <main className="custom-cursor bg-background min-h-screen">
        <CustomCursor />
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput 
            placeholder="Type a name, role or skill..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup heading="Members">
              {members.map((member) => (
                <CommandItem
                  key={member.name}
                  onSelect={() => {
                    setSearch(member.name)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{member.name}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{member.role}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Header */}
        <nav className="px-6 py-6 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-clickable>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-iris rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-sans font-bold text-sm">ST</span>
            </div>
            <span className="font-archivo font-bold text-foreground text-sm tracking-tight">
              superteam<span className="text-iris ml-1">🇲🇾</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-4 md:w-12" />
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
                Community <em className="italic text-iris">Directory</em>
              </h1>
              <p className="text-muted-foreground text-lg">
                Meet the builders, designers, and creators shaping the Solana ecosystem in Malaysia.
              </p>
            </motion.div>

            <Button
              variant="outline"
              className="relative w-full md:w-64 justify-start text-muted-foreground h-12 px-4 rounded-xl border-border/50 bg-secondary/50 hover:bg-secondary transition-all"
              onClick={() => setOpen(true)}
              data-clickable
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search members...</span>
              <Kbd className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-[10px]">⌘</span>K
              </Kbd>
            </Button>
          </div>

          {/* Filters Alignment Fix */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">
              <Code className="w-3.5 h-3.5 text-iris" />
              Filter by Skill
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setActiveFilter(skill)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeFilter === skill
                      ? "bg-iris text-white border-iris shadow-lg shadow-iris/20"
                      : "bg-secondary/50 text-muted-foreground border-border/50 hover:border-iris/30 hover:text-iris"
                  }`}
                  data-clickable
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filteredMembers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-secondary/30 rounded-3xl border border-dashed border-border"
            >
              <div className="w-16 h-16 bg-iris/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-iris/40" />
              </div>
              <p className="text-muted-foreground font-medium">No members found matching &quot;{search}&quot;</p>
              <Button 
                variant="link" 
                onClick={() => {setSearch(""); setActiveFilter("All")}}
                className="mt-2 text-iris"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </section>

        <FooterSection />
      </main>

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
      `}</style>
    </LenisProvider>
  )
}
