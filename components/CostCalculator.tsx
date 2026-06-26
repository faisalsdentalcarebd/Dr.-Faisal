'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, MessageCircle, Info } from 'lucide-react'

const services = [
  { id: 'crown', label: 'Crown & Bridge Restoration', unit: 'unit', min: 15000, max: 40000, note: 'Per tooth/unit' },
  { id: 'implant', label: 'Dental Implant', unit: 'implant', min: 80000, max: 150000, note: 'Per implant (titanium)' },
  { id: 'ortho', label: 'Fixed Orthodontics (Braces)', unit: 'treatment', min: 40000, max: 100000, note: 'Full treatment, both arches', flat: true },
  { id: 'rct', label: 'Root Canal Treatment', unit: 'tooth', min: 8000, max: 20000, note: 'Per tooth' },
  { id: 'scaling', label: 'Dental Scaling & Cleaning', unit: 'session', min: 3000, max: 6000, note: 'Per session' },
  { id: 'extraction', label: 'Tooth Extraction', unit: 'tooth', min: 3000, max: 8000, note: 'Per tooth' },
  { id: 'filling', label: 'Tooth-Coloured Filling', unit: 'tooth', min: 2000, max: 8000, note: 'Per tooth (composite)' },
]

function formatBDT(amount: number) {
  return '৳' + amount.toLocaleString('en-BD')
}

export default function CostCalculator() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedId, setSelectedId] = useState('implant')
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headingScale = useTransform(scrollYProgress, [0, 0.25], [1.18, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.25], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  const selected = services.find(s => s.id === selectedId)!
  const qty = selected.flat ? 1 : Math.max(1, quantity)
  const minTotal = selected.min * qty
  const maxTotal = selected.max * qty

  const waMessage = encodeURIComponent(
    `Hello, I am interested in ${selected.label}${!selected.flat ? ` (${qty} ${selected.unit}${qty > 1 ? 's' : ''})` : ''}. Can you confirm the exact cost? Thank you.`
  )

  return (
    <section
      ref={sectionRef}
      id="cost-calculator"
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          opacity: 0.35,
        }}
      />
      {/* Blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(27,111,201,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading — scale on scroll */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.div style={{ opacity }} className="inline-block mb-4">
            <span className="section-label">Treatment Cost Estimator</span>
          </motion.div>
          <motion.h2
            style={{ scale: headingScale, y: headingY, opacity }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dental-heading leading-tight tracking-tight"
          >
            Know Your Costs{' '}
            <span className="gradient-text">Before You Visit</span>
          </motion.h2>
          <motion.p
            style={{ opacity }}
            className="text-dental-body mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Select a treatment below to get an instant cost estimate in BDT. Confirm exact pricing via WhatsApp.
          </motion.p>
        </div>

        {/* Calculator card — perspective 3D entrance */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          className="bg-white rounded-3xl border border-dental-border shadow-card-hover overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">

            {/* LEFT — selectors */}
            <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-dental-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-dental-blue/10 flex items-center justify-center">
                  <Calculator size={20} className="text-dental-blue" />
                </div>
                <h3 className="text-lg font-bold text-dental-heading">Select Treatment</h3>
              </div>

              {/* Service Dropdown */}
              <div className="mb-6 relative">
                <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-2 block">
                  Treatment Type
                </label>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full flex items-center justify-between gap-3 bg-dental-alt border border-dental-border rounded-2xl px-5 py-4 text-left transition-all duration-200 hover:border-dental-blue focus:outline-none focus:border-dental-blue"
                >
                  <span className="font-semibold text-dental-heading text-sm">{selected.label}</span>
                  <ChevronDown size={16} className={`text-dental-body transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-dental-border rounded-2xl shadow-card-hover overflow-hidden"
                    >
                      {services.map(s => (
                        <button
                          key={s.id}
                          onClick={() => { setSelectedId(s.id); setQuantity(1); setOpen(false) }}
                          className={`w-full flex items-center justify-between px-5 py-3.5 text-left text-sm transition-colors duration-150 ${
                            s.id === selectedId
                              ? 'bg-dental-blue/8 text-dental-blue font-semibold'
                              : 'text-dental-heading hover:bg-dental-alt'
                          }`}
                        >
                          <span>{s.label}</span>
                          <span className="text-xs text-dental-body">{s.note}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity */}
              {!selected.flat && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6"
                >
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-2 block">
                    Number of {selected.unit}s
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 rounded-xl bg-dental-alt border border-dental-border text-dental-heading font-bold text-lg flex items-center justify-center hover:border-dental-blue transition-colors"
                    >
                      −
                    </button>
                    <span className="text-2xl font-extrabold text-dental-heading w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(20, quantity + 1))}
                      className="w-11 h-11 rounded-xl bg-dental-blue text-white font-bold text-lg flex items-center justify-center hover:bg-dental-blue-dark transition-colors"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Note */}
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4">
                <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700 text-xs leading-relaxed">
                  {selected.note}. These are estimated ranges. Exact cost depends on clinical evaluation.
                </p>
              </div>
            </div>

            {/* RIGHT — result */}
            <div className="p-8 sm:p-10 bg-dental-alt flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-6">Estimated Cost Range</p>

                {/* Range display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId + qty}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-dental-blue tracking-tight">
                        {formatBDT(minTotal)}
                      </span>
                      <span className="text-dental-body text-lg font-semibold mx-3">—</span>
                      <span className="text-4xl sm:text-5xl font-extrabold text-dental-heading tracking-tight">
                        {formatBDT(maxTotal)}
                      </span>
                    </div>
                    <p className="text-dental-body text-sm">
                      {selected.flat
                        ? 'Full treatment estimate'
                        : `Estimate for ${qty} ${selected.unit}${qty > 1 ? 's' : ''}`}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Visual bar */}
                <div className="mt-8 mb-6">
                  <div className="flex justify-between text-xs text-dental-body mb-2">
                    <span>Min</span><span>Max</span>
                  </div>
                  <div className="h-2.5 bg-dental-border rounded-full overflow-hidden">
                    <motion.div
                      key={selectedId + qty}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #1B6FC9, #60a5fa)' }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Breakdown */}
                {!selected.flat && qty > 1 && (
                  <div className="bg-white rounded-xl border border-dental-border px-4 py-3 mb-6">
                    <p className="text-xs text-dental-body">
                      Per {selected.unit}: <span className="font-semibold text-dental-heading">{formatBDT(selected.min)} – {formatBDT(selected.max)}</span>
                      &nbsp;×&nbsp;{qty} {selected.unit}{qty > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/8801817102030?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-dental-blue hover:bg-dental-blue-dark text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 hover:shadow-blue text-sm"
                >
                  <MessageCircle size={18} />
                  Confirm Exact Price on WhatsApp
                </a>
                <p className="text-center text-xs text-dental-body">
                  Saturday – Thursday · 4:00 PM – 8:00 PM
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-xs text-dental-body mt-6"
        >
          All prices are estimates in Bangladeshi Taka (BDT). Final cost is confirmed after clinical examination.
        </motion.p>
      </div>
    </section>
  )
}
