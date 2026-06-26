'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Award, Clock, Globe } from 'lucide-react'
import Image from 'next/image'

const leftCards = [
  {
    icon: GraduationCap,
    year: 'ACADEMIC',
    title: 'Professor-Level Expertise',
    description:
      "Associate Professor & Head of Department at Shaheed Suhrawardy Medical College Hospital — his patients get the same depth that shapes Bangladesh's next generation of specialists.",
  },
  {
    icon: Clock,
    year: '1996 – PRESENT',
    title: '28 Years of Excellence',
    description:
      'Three decades of continuous clinical practice across the full spectrum of dental and prosthodontic care — fewer surprises, consistently better outcomes.',
  },
]

const rightCards = [
  {
    icon: Award,
    year: '2019 · USA',
    title: 'FICD Fellow (USA)',
    description:
      "Honoured in 2019 as a Fellow of the International College of Dentists, USA — one of dentistry's highest global recognitions, held by only a select few worldwide.",
  },
  {
    icon: Globe,
    year: 'GLOBAL TRAINING',
    title: 'Three Continents of Training',
    description:
      'Advanced specialty training in dental implants, orthodontics, and periodontology in India, Thailand, and Spain — international standards, delivered in Gulshan-1.',
  },
]

function ReasonCard({
  card,
  index,
  direction,
  align,
}: {
  card: (typeof leftCards)[0]
  index: number
  direction: 'left' | 'right'
  align: 'left' | 'right'
}) {
  return (
    <div className={`relative w-full mb-8 last:mb-0 ${align === 'right' ? 'text-right' : 'text-left'}`}>
      {/* Connector line into the gap toward the spine */}
      <div
        className="absolute top-6 h-0.5 w-8 pointer-events-none"
        style={{
          background:
            align === 'right'
              ? 'linear-gradient(90deg, #1e64ff, rgba(30,100,255,0.15))'
              : 'linear-gradient(90deg, rgba(30,100,255,0.15), #1e64ff)',
          ...(align === 'right' ? { right: -36 } : { left: -36 }),
        }}
      />
      {/* Connector dot */}
      <div
        className="absolute top-[19px] w-3 h-3 rounded-full bg-white border-[2.5px] border-dental-blue pointer-events-none"
        style={{
          boxShadow: '0 0 0 4px rgba(30,100,255,0.12)',
          ...(align === 'right' ? { right: -44 } : { left: -44 }),
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: direction === 'left' ? -60 : 60, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-dental-border p-5 group hover:border-dental-blue/40 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
      >
        {/* Bottom progress fill on hover */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-dental-blue to-blue-400 rounded-full transition-all duration-700 ease-out" />

        {/* Year badge */}
        <span className="inline-block text-[9px] font-bold tracking-[1.5px] uppercase text-dental-blue bg-dental-blue/8 rounded-full px-2.5 py-0.5 mb-3">
          {card.year}
        </span>

        <div className={`flex items-start gap-4 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-10 h-10 rounded-xl bg-dental-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-dental-blue/18 group-hover:scale-110 transition-all duration-300">
            <card.icon size={18} className="text-dental-blue" />
          </div>
          <div>
            <h3 className="font-bold text-dental-heading text-sm mb-1.5 group-hover:text-dental-blue transition-colors duration-200 leading-snug">
              {card.title}
            </h3>
            <p className="text-dental-body text-xs leading-relaxed">{card.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null)

  // Spine draws as user scrolls through the section
  const { scrollYProgress: spineProgress } = useScroll({
    target: sectionRef,
    offset: ['start 55%', 'end 75%'],
  })
  const spineScaleY = useTransform(spineProgress, [0, 0.75], [0, 1])

  // Subtle parallax on doctor image
  const { scrollYProgress: parallax } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(parallax, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dental-blue/4 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-dental-blue/4 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3"
          >
            <span className="section-label">Why Choose Us</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dental-heading tracking-tight leading-tight mb-4"
          >
            Why Patients Choose{' '}
            <span className="gradient-text">Dr. Faisal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-dental-body leading-relaxed"
          >
            Four compelling reasons thousands of patients across Dhaka trust their most important dental decisions to Dr. Faisal.
          </motion.p>
        </div>

        {/* ── DESKTOP: 3-column timeline grid ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_340px_1fr] gap-x-6 items-start">

          {/* Left column — right-aligned cards */}
          <div className="flex flex-col items-end pt-0">
            {leftCards.map((card, i) => (
              <ReasonCard key={card.title} card={card} index={i} direction="left" align="right" />
            ))}
          </div>

          {/* Center column — vertical spine + doctor + nameplate + stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Vertical spine track */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-dental-blue/10 rounded-full overflow-hidden">
              {/* Animated fill drawn by scroll */}
              <motion.div
                style={{ scaleY: spineScaleY, originY: 0 }}
                className="absolute inset-0 bg-dental-blue rounded-full"
                // Glow via box-shadow not supported on div; use filter instead
              />
            </div>

            {/* Doctor image with parallax */}
            <motion.div style={{ y: imageY }} className="relative z-10 w-[300px]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-56 bg-dental-blue/8 rounded-full blur-3xl pointer-events-none" />
              <Image
                src="/images/dr-faisal.png"
                alt="Dr. Sheikh Md. Shahriar Quader Faisal — Prosthodontist"
                width={340}
                height={440}
                className="relative z-10 w-full h-auto object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Floating nameplate */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 bg-dental-blue text-white rounded-2xl px-4 py-2.5 text-center mt-3"
              style={{ boxShadow: '0 8px 24px rgba(30,100,255,0.3)' }}
            >
              <strong className="block text-[0.72rem] font-extrabold leading-snug">
                Dr. Sheikh Md. Shahriar Quader
              </strong>
              <span className="text-[0.6rem] text-white/80">Prosthodontist · Gulshan-1, Dhaka</span>
            </motion.div>

            {/* Stat pills */}
            <div className="relative z-10 flex gap-2 mt-3">
              {[
                { num: '28+', label: 'Years', blue: true },
                { num: '10K+', label: 'Patients', blue: false },
                { num: '5.0★', label: 'Rating', blue: false },
              ].map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`rounded-xl px-3 py-2 text-center ${
                    s.blue
                      ? 'bg-dental-blue text-white shadow-lg'
                      : 'bg-white border border-dental-border shadow-sm'
                  }`}
                >
                  <div className={`font-black text-base leading-none ${s.blue ? '' : 'text-dental-heading'}`}>
                    {s.num}
                  </div>
                  <div className={`text-[8px] mt-0.5 ${s.blue ? 'text-white/80' : 'text-dental-body'}`}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — left-aligned cards */}
          <div className="flex flex-col items-start pt-0">
            {rightCards.map((card, i) => (
              <ReasonCard key={card.title} card={card} index={i} direction="right" align="left" />
            ))}
          </div>
        </div>

        {/* ── MOBILE / TABLET: image top, cards stacked ── */}
        <div className="lg:hidden">
          {/* Doctor image + nameplate + stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-64 bg-dental-blue/8 rounded-full blur-3xl pointer-events-none" />
              <Image
                src="/images/dr-faisal.png"
                alt="Dr. Sheikh Md. Shahriar Quader Faisal"
                width={340}
                height={440}
                className="relative z-10 w-[260px] sm:w-[300px] h-auto object-contain drop-shadow-xl"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-dental-blue text-white rounded-2xl px-4 py-2.5 text-center mt-3 shadow-lg"
            >
              <strong className="block text-[0.72rem] font-extrabold">Dr. Sheikh Md. Shahriar Quader</strong>
              <span className="text-[0.6rem] text-white/80">Prosthodontist · Gulshan-1, Dhaka</span>
            </motion.div>

            <div className="flex gap-3 mt-3 justify-center">
              <div className="bg-dental-blue text-white rounded-xl px-3 py-2 text-center shadow-lg">
                <div className="font-black text-base leading-none">28+</div>
                <div className="text-white/80 text-[8px] mt-0.5">Years</div>
              </div>
              <div className="bg-white border border-dental-border rounded-xl px-3 py-2 text-center shadow-sm">
                <div className="font-black text-base leading-none text-dental-heading">10K+</div>
                <div className="text-dental-body text-[8px] mt-0.5">Patients</div>
              </div>
              <div className="bg-white border border-dental-border rounded-xl px-3 py-2 text-center shadow-sm">
                <div className="font-black text-base leading-none text-dental-heading">5.0★</div>
                <div className="text-dental-body text-[8px] mt-0.5">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* All 4 cards stacked */}
          <div className="space-y-4">
            {[...leftCards, ...rightCards].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-30px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-dental-border p-5 group hover:border-dental-blue/30 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-dental-blue to-blue-400 transition-all duration-700 ease-out" />
                <span className="inline-block text-[9px] font-bold tracking-[1.5px] uppercase text-dental-blue bg-dental-blue/8 rounded-full px-2.5 py-0.5 mb-3">
                  {card.year}
                </span>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dental-blue/10 flex items-center justify-center flex-shrink-0">
                    <card.icon size={18} className="text-dental-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dental-heading text-sm mb-1.5 leading-snug">{card.title}</h3>
                    <p className="text-dental-body text-xs leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FICD highlight bar — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 bg-dental-blue/8 border border-dental-blue/20 rounded-2xl px-6 py-5 text-center sm:text-left"
        >
          <Award size={22} className="text-dental-blue flex-shrink-0" />
          <div>
            <div className="font-bold text-dental-heading text-sm">
              FICD — Fellow, International College of Dentists
            </div>
            <div className="text-dental-body text-xs mt-0.5">
              Awarded 2019 · USA · One of dentistry&apos;s highest global honours — held by only a select few practitioners worldwide
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
