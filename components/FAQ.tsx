'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/lib/data'

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-dental-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-label mb-4">Common Questions</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-dental-heading"
          >
            Answers to What{' '}
            <span className="gradient-text">Patients Ask Most</span>
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                openId === faq.id
                  ? 'border-dental-blue shadow-glass'
                  : 'border-dental-border hover:border-dental-blue/40'
              }`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={openId === faq.id}
              >
                <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                  openId === faq.id ? 'text-dental-blue' : 'text-dental-heading'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  openId === faq.id
                    ? 'bg-dental-blue text-white rotate-0'
                    : 'bg-dental-alt text-dental-body'
                }`}>
                  {openId === faq.id ? <Minus size={15} /> : <Plus size={15} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-dental-border mb-4" />
                      <p className="text-dental-body text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-dental-body text-sm mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <a href="tel:01817102030" className="btn-primary">
            Call Us: 01817-102030
          </a>
        </motion.div>
      </div>
    </section>
  )
}
