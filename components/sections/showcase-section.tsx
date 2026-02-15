"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

const fallbackProjects = [
  {
    id: "1",
    name: "Chaindex",
    category: "Analytics",
    description: "Making trading data on Solana easy, fast & cheap ⚔️ built with possibly the youngest dev 😉",
    image_url: "/media/images/project/chaindex.jpg",
    twitter_url: "https://x.com/chaindex_xyz",
  }
]

export function ShowcaseSection({ initialData }: { initialData?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Use server data if available
  const projects = initialData && initialData.length > 0 ? initialData : fallbackProjects

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y4 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const yValues = [y1, y2, y3, y4]

  return (
    <section id="projects" ref={containerRef} className="bg-background px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Projects
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-serif text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our members are <em className="italic text-iris">building...</em>
            </motion.h2>
          </div>
          <motion.p
            className="text-muted-foreground max-w-md text-pretty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Malaysian builders are shipping real products on Solana. Here are some of the projects from our community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              className="relative group"
              style={{ y: yValues[i] || 0 }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-clickable
            >
              {/* Image */}
              <div className="relative h-[280px] rounded-xl overflow-hidden shadow-2xl shadow-black/20">
                <motion.img
                  src={project.image_url || "/media/images/project/chaindex.jpg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-foreground">{project.name}</h3>
                  <div className="flex items-center gap-2">
                    <a 
                      href={project.twitter_url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      data-clickable
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a 
                      href={project.website_url || project.twitter_url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      data-clickable
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <span className="inline-block bg-iris/10 text-iris text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mt-2">
                  {project.category}
                </span>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed line-clamp-2">{project.description}</p>
                <a
                  href={project.twitter_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-iris text-sm font-medium mt-3 hover:gap-2 transition-all"
                  data-clickable
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discover More CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="/products"
            className="bg-secondary border-2 border-dashed border-iris/20 text-foreground px-8 py-4 rounded-xl font-medium hover:border-iris hover:bg-iris/5 transition-all flex items-center gap-2"
            data-clickable
          >
            Discover More Products
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
