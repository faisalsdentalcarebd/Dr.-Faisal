'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Case = {
  id: string
  label: string
  before_url: string
  after_url: string
}

export default function BeforeAfter() {
  const [cases, setCases] = useState<Case[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    supabase
      .from('before_after_cases')
      .select('id, label, before_url, after_url')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setCases(data)
        setLoaded(true)
      })
  }, [])

  if (!loaded || cases.length === 0) return null

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#0a0603' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(27,111,201,0.25), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[4px] uppercase mb-4"
            style={{ color: '#1B6FC9' }}>
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: '#FFF0E0' }}>
            Before &amp; After
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,240,224,0.55)' }}>
            Real patient results from Dr. Faisal&apos;s clinic. Every transformation tells a story.
          </p>
        </motion.div>

        {/* Grid of cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,240,224,0.08)' }}
            >
              {/* Images side by side */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4]" style={{ borderRight: '1.5px solid rgba(10,6,3,0.8)' }}>
                  <Image src={c.before_url} alt={`Before — ${c.label}`} fill className="object-cover" sizes="220px" />
                  <div className="absolute bottom-0 inset-x-0 py-2 text-center text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(10,6,3,0.72)', color: 'rgba(255,240,224,0.55)' }}>
                    Before
                  </div>
                </div>
                <div className="relative aspect-[3/4]">
                  <Image src={c.after_url} alt={`After — ${c.label}`} fill className="object-cover" sizes="220px" />
                  <div className="absolute bottom-0 inset-x-0 py-2 text-center text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(10,6,3,0.72)', color: '#1B6FC9' }}>
                    After
                  </div>
                </div>
              </div>
              {/* Label */}
              {c.label && (
                <div className="px-5 py-4" style={{ background: 'rgba(255,240,224,0.03)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'rgba(255,240,224,0.8)' }}>{c.label}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
