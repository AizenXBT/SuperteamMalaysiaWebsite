"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, ArrowRight, ExternalLink, Filter } from "lucide-react"
import { isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isAfter } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const backdropImages = [
  "/media/images/banners/community1.jpg",
  "/media/images/banners/community2.jpg",
  "/media/images/banners/community3.jpg",
]

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backdropImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/90 to-secondary z-10 dark:from-secondary/40 dark:via-secondary/70 dark:to-secondary" />
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={backdropImages[index]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      </AnimatePresence>
    </div>
  )
}

const fallbackEvents = [
  {
    id: "1",
    title: "Solana Ecosystem Call: Malaysia Edition",
    date: "2026-02-28",
    time_range: "8:00 PM - 10:00 PM",
    location: "Kuala Lumpur / Virtual",
    luma_url: "https://lu.ma/stmy-eco-call",
    image_url: "/media/images/banners/community1.jpg",
    status: "Upcoming",
  }
]

const FILTER_OPTIONS = ["All time", "This Week", "This Month", "This Year"]

export function EventsSection({ initialData }: { initialData?: any[] }) {
  const [filter, setFilter] = useState("All time")
  const allEvents = initialData && initialData.length > 0 ? initialData : fallbackEvents

  const filteredEvents = useMemo(() => {
    const now = new Date()
    return allEvents.filter(event => {
      const eventDate = parseISO(event.date)
      if (filter === "This Week") {
        return isWithinInterval(eventDate, { start: startOfWeek(now), end: endOfWeek(now) })
      }
      if (filter === "This Month") {
        return isWithinInterval(eventDate, { start: startOfMonth(now), end: endOfMonth(now) })
      }
      if (filter === "This Year") {
        return isWithinInterval(eventDate, { start: startOfYear(now), end: endOfYear(now) })
      }
      return true
    })
  }, [allEvents, filter])

  return (
    <section id="events" className="relative bg-secondary px-6 py-24 overflow-hidden min-h-[800px]">
      <BackgroundSlideshow />
      
      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              className="text-muted-foreground text-sm uppercase tracking-widest mb-4 font-bold"
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
          
          <div className="flex flex-col gap-4 items-start md:items-end">
            <div className="flex flex-wrap gap-3 md:gap-4">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={cn(
                    "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 border",
                    filter === opt 
                      ? "bg-iris text-white border-iris shadow-[0_8px_30px_rgb(91,33,182,0.3)] scale-[1.05] z-10" 
                      : "bg-background/20 backdrop-blur-md text-muted-foreground border-border/20 hover:border-iris/20 hover:bg-background/40"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            <a
              href="https://lu.ma/SuperteamMY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-iris font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all text-[10px]"
              data-clickable
            >
              View All on Luma <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id || i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-background/60 backdrop-blur-md rounded-[2rem] overflow-hidden border border-border/20 group hover:border-iris/30 transition-all flex flex-col shadow-xl"
                data-clickable
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image_url || "/media/images/banners/community1.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                      event.status === 'Upcoming' 
                      ? 'bg-iris/80 text-white border-iris/20' 
                      : 'bg-black/40 text-white/60 border-white/10'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-iris text-xs font-black uppercase tracking-tighter mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-6 group-hover:text-iris transition-colors line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-iris/60" />
                      </div>
                      {event.location}
                    </div>
                    {event.time_range && (
                      <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                          <Filter className="w-4 h-4 text-iris/60 rotate-90" />
                        </div>
                        {event.time_range}
                      </div>
                    )}
                  </div>

                  <a
                    href={event.luma_url || "https://lu.ma/SuperteamMY"}
                    target="_blank"
                    className="mt-8 inline-flex items-center justify-center gap-2 bg-iris text-white w-full h-14 rounded-2xl text-base font-bold hover:bg-iris/90 shadow-lg shadow-iris/20 transition-all active:scale-[0.98]"
                  >
                    Register Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-secondary/20 rounded-[3rem] border-2 border-dashed border-border/40"
          >
            <p className="text-muted-foreground font-serif italic text-xl">No events scheduled for this period.</p>
            <Button variant="link" onClick={() => setFilter("All time")} className="text-iris mt-4 underline decoration-iris/30">View all time</Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
