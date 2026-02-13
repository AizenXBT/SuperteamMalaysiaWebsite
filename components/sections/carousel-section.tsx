"use client"

import { motion } from "framer-motion"
import { Tweet } from "react-tweet"

const tweetIds = [
  "2005824809750467068",
  "1993507268864938021",
  "2009200588106739975",
  "1985242141023719477",
  "1958317788352872540",
  "1970763694201262405",
]

export function CarouselSection() {
  // We double the array to create a seamless loop
  const items = [...tweetIds, ...tweetIds]

  return (
    <section id="testimonials" className="bg-iris py-24 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-4">Wall of Love</p>
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground">
            What our <em className="italic">community</em> says
          </h2>
          <p className="text-primary-foreground/60 mt-2 max-w-lg">
            Real feedback and highlights from the Superteam Malaysia ecosystem.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* We use a flex container for the marquee effect */}
        <motion.div
          className="flex gap-6 w-max px-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 60, // Slower duration for readability
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {items.map((id, i) => (
            <div key={`${id}-${i}`} className="w-[350px] md:w-[450px] flex-shrink-0 dark">
              <Tweet id={id} />
            </div>
          ))}
        </motion.div>
        
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-iris to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-iris to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
