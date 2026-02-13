"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What is Superteam Malaysia?",
    answer:
      "Superteam Malaysia is the Malaysian chapter of the global Superteam network -- a community of developers, designers, creators, and operators building and earning within the Solana ecosystem through bounties, hackathons, grants, and real-world projects.",
  },
  {
    question: "Who can join Superteam Malaysia?",
    answer:
      "Everyone is welcome! Whether you are a developer, designer, writer, marketer, or simply curious about Web3 and Solana, you can join our community. No prior blockchain experience is required.",
  },
  {
    question: "How do members earn through Superteam?",
    answer:
      "Members can earn through completing bounties, participating in hackathons, receiving grants for their projects, and finding job opportunities within the Solana ecosystem. All earnings are in crypto or fiat depending on the opportunity.",
  },
  {
    question: "Is Superteam Malaysia free to join?",
    answer:
      "Yes, joining Superteam Malaysia is completely free. Simply join our Telegram or Discord community, introduce yourself, and start participating in events and opportunities.",
  },
  {
    question: "How can projects collaborate with Superteam MY?",
    answer:
      "Projects building on Solana can collaborate with us by posting bounties, sponsoring events, or reaching out for partnership opportunities. Contact us through our social channels or the form on this site.",
  },
  {
    question: "Do I need to be a developer to join?",
    answer:
      "Not at all. Superteam Malaysia has sub-groups for Developers, Designers, Writers, Growth Marketers, and more. If you have a skill and a willingness to learn about Web3, there is a place for you here.",
  },
]

export function PricingSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-secondary px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">FAQ</p>
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

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
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
