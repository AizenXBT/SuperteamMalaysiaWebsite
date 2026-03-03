"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export function JoinSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ email }])

      if (error) throw error

      setIsSubmitted(true)
      setEmail("")
      toast.success("Thanks for reaching out!")
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="join" className="bg-iris px-6 py-32 overflow-hidden relative">
      {/* Large watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] font-serif font-bold text-primary-foreground/5 whitespace-nowrap select-none">
          SUPERTEAM
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary-foreground leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Be a part of <em className="italic">history</em>
        </motion.h2>

        <motion.p
          className="text-primary-foreground/70 text-lg mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Join the movement. Connect, learn, build, and earn with the best talent in Malaysia&apos;s Web3 ecosystem.
        </motion.p>

        {/* Email Form */}
        <motion.div
          className="max-w-md mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12 text-lime" />
              <p className="text-white font-bold text-xl">You&apos;re on the list!</p>
              <p className="text-white/60 text-sm">We&apos;ll be in touch with you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-white/40 text-xs hover:text-white underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime/50 transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-foreground text-iris px-8 py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Get in touch
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://t.me/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            data-clickable
          >
            Join Telegram
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
          <a
            href="https://x.com/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            data-clickable
          >
            Follow on X
          </a>
        </motion.div>
      </div>
    </section>
  )
}
