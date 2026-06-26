'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ExternalLink } from 'lucide-react'
import { testimonials } from '@/lib/data'

const GOOGLE_LOGO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function Testimonials() {
  return (
    <section className="py-24 bg-dental-alt overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-label mb-4">What Our Patients Say</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-dental-heading tracking-tight"
          >
            Real Stories,{' '}
            <span className="gradient-text">Real Smiles</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-dental-body text-sm mt-3"
          >
            Verified reviews from Google — 5.0 ★ average
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl p-8 border border-dental-border relative overflow-hidden flex flex-col"
              style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dental-blue via-blue-400 to-dental-blue" />

              {/* Card index */}
              <div className="absolute top-6 right-6 text-5xl font-black text-dental-border/50 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Quote icon */}
              <div className="w-11 h-11 rounded-2xl bg-dental-blue/10 flex items-center justify-center mb-5 flex-shrink-0">
                <Quote size={18} className="text-dental-blue" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-dental-heading font-semibold text-base leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote === '★★★★★' ? 'Outstanding experience — 5 stars without hesitation.' : t.quote}&rdquo;
              </blockquote>

              {/* Patient + Google badge */}
              <div className="flex items-center justify-between pt-5 border-t border-dental-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dental-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{t.patient[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-dental-heading text-sm leading-tight">{t.patient}</div>
                    <div className="text-dental-body text-xs mt-0.5">{t.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-dental-border rounded-xl px-2.5 py-1.5 flex-shrink-0">
                  {GOOGLE_LOGO}
                  <span className="text-[10px] font-bold text-dental-body">Google</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stat + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3 bg-white border border-dental-border rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-dental-heading font-bold text-lg">5.0</span>
            <span className="text-dental-body text-sm">on Google Reviews</span>
          </div>

          <a
            href="https://g.co/kgs/your-google-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-dental-blue font-semibold text-sm hover:underline"
          >
            View on Google Maps
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
