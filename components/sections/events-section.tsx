"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react"

const events = [
  {
    title: "Solana Ecosystem Call: Malaysia Edition",
    date: "Feb 28, 2026",
    time: "8:00 PM - 10:00 PM",
    location: "Kuala Lumpur / Virtual",
    lumaUrl: "https://lu.ma/stmy-eco-call",
    image: "/modern-architecture-building-exterior-minimal.jpg",
    status: "Upcoming",
  },
  {
    title: "Web3 Builders Meetup",
    date: "March 15, 2026",
    time: "6:30 PM - 9:00 PM",
    location: "TBD, Kuala Lumpur",
    lumaUrl: "https://lu.ma/stmy-builders-meetup",
    image: "/interior-design-minimalist-living-room-natural-lig.jpg",
    status: "Upcoming",
  },
  {
    title: "Solana Speedrun Hackathon",
    date: "Jan 15, 2026",
    time: "Full Day",
    location: "Global / Online",
    lumaUrl: "https://lu.ma/speedrun-hack",
    image: "/visual-storytelling-design-article.jpg",
    status: "Past",
  },
]

export function EventsSection() {
  return (
    <section id="events" className="bg-secondary px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Events
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              What&apos;s <em className="italic text-iris">happening</em>
            </h2>
          </div>
          <a
            href="https://lu.ma/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-iris font-medium flex items-center gap-2 hover:gap-3 transition-all"
            data-clickable
          >
            View All on Luma <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="bg-background rounded-2xl overflow-hidden border border-border/50 group hover:border-iris/30 transition-all flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-clickable
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    event.status === 'Upcoming' 
                    ? 'bg-iris text-white' 
                    : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-iris text-xs font-semibold mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-4 group-hover:text-iris transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {event.time}
                  </div>
                </div>

                <a
                  href={event.lumaUrl}
                  target="_blank"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-secondary text-foreground w-full py-3 rounded-xl text-sm font-medium hover:bg-iris hover:text-white transition-all"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
