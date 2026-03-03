"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

export function FAQSection({ initialData }: { initialData?: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const displayFaqs = initialData && initialData.length > 0 ? initialData : []

  if (displayFaqs.length === 0) return null;

  return (
    <section id="faq" className="bg-secondary px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4 font-bold">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground">
            Frequently asked <em className="italic text-iris">questions</em>
          </h2>
          <p className="text-muted-foreground mt-4">
            {"Can't find the answer you're looking for? "}
            <a href="#join" className="text-foreground underline underline-offset-4 hover:text-iris transition-colors" data-clickable>
              Get in touch
            </a>
            .
          </p>
        </motion.div>

        <div className="divide-y divide-border/40">
          {displayFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between py-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-clickable
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm font-mono">
                    ({String(i + 1).padStart(3, "0")})
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-foreground group-hover:text-iris transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 text-iris" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pb-6 pl-12 md:pl-16 max-w-xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
