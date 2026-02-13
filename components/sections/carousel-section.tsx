"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Amir Hassan",
    handle: "@amirbuilds",
    text: "Superteam MY helped me land my first Solana bounty. The community is incredibly supportive and the mentorship has been invaluable for my Web3 journey.",
  },
  {
    name: "Sarah Lim",
    handle: "@sarahweb3",
    text: "From joining a hackathon to building a full product on Solana -- Superteam Malaysia made it all possible. This community is home.",
  },
  {
    name: "Raj Patel",
    handle: "@rajpateldev",
    text: "The events and workshops organized by Superteam MY are top-notch. I've learned more in 3 months here than in a year of self-study.",
  },
  {
    name: "Mei Chen",
    handle: "@meichendesign",
    text: "As a designer transitioning into Web3, Superteam MY gave me the resources and network I needed. Now I'm designing for two Solana projects!",
  },
  {
    name: "Danish Yusof",
    handle: "@danishbuidl",
    text: "The grant support from the Superteam ecosystem helped us take our DeFi project from idea to launch. Grateful for this incredible community.",
  },
  {
    name: "Priya Nair",
    handle: "@priyanairMY",
    text: "What makes Superteam Malaysia special is the people. Everyone genuinely wants to see you succeed. Best decision I made was joining.",
  },
]

function TweetCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-background rounded-xl p-6 shadow-2xl border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-iris/20 flex items-center justify-center text-sm font-medium text-iris">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-sans font-semibold text-sm text-primary-foreground">{testimonial.name}</p>
            <p className="text-muted-foreground text-xs">{testimonial.handle}</p>
          </div>
        </div>
        <svg className="w-5 h-5 text-primary-foreground/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <p className="text-primary-foreground/80 text-sm leading-relaxed">{testimonial.text}</p>
    </div>
  )
}

export function CarouselSection() {
  const items = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="bg-iris py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground">
            What our <em className="italic">community</em> says
          </h2>
          <p className="text-primary-foreground/60 mt-2 max-w-lg">
            Real feedback from builders, developers, and creators in the Superteam Malaysia ecosystem.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {items.map((testimonial, i) => (
            <TweetCard key={i} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
