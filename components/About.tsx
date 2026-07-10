'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, BookOpen, Clock, Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const badges = [
  { icon: Award, label: 'FICD Fellow', sub: 'Intl. College of Dentists, USA' },
  { icon: Shield, label: 'BMDC: 981', sub: 'Registered Specialist' },
  { icon: Clock, label: '28 Yrs Experience', sub: 'Clinical & Academic' },
  { icon: BookOpen, label: 'BCS (Health)', sub: 'Govt. Service since 2005' },
]

const words = [
  { text: 'For', blue: false }, { text: 'over', blue: false },
  { text: '28 years,', blue: true }, { text: 'patients', blue: false },
  { text: 'across', blue: false }, { text: 'Dhaka', blue: true },
  { text: 'have', blue: false }, { text: 'trusted', blue: false },
  { text: 'Dr. Faisal', blue: true }, { text: 'for', blue: false },
  { text: 'specialist', blue: false }, { text: 'prosthodontic', blue: true },
  { text: 'care', blue: false }, { text: 'that', blue: false },
  { text: 'is', blue: false }, { text: 'precise,', blue: false },
  { text: 'compassionate,', blue: false }, { text: 'and', blue: false },
  { text: 'internationally', blue: true }, { text: 'recognized.', blue: true },
]

const floatingPhotos = [
  {
    src: '/images/doctors/Dr. Faisal At his Chamber.jpeg',
    alt: 'Dr. Faisal at his dental clinic in Niketan, Gulshan-1, Dhaka',
    position: 'top-0 left-0', rotate: '-rotate-2', delay: 0,
    label: 'Dr. Faisal at His Clinic',
  },
  {
    src: '/images/doctors/Dr. Faisal Checking prosthodontic apliance.jpeg',
    alt: "Dr. Faisal examining a prosthodontic appliance",
    position: 'top-4 right-0', rotate: 'rotate-2', delay: 0.15,
    label: 'Prosthodontic Expertise',
  },
  {
    src: '/images/doctors/Dr. Faisal Thinking about prosthodontic.jpeg',
    alt: 'Dr. Faisal in consultation',
    position: 'bottom-4 left-6', rotate: 'rotate-1', delay: 0.3,
    label: 'Patient-First Approach',
  },
  {
    src: '/images/doctors/Dr. Faisal Checking instruments.jpeg',
    alt: 'Dr. Faisal checking dental instruments',
    position: 'bottom-0 right-4', rotate: '-rotate-1', delay: 0.45,
    label: 'Advanced Instruments',
  },
]

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Word-by-word reveal pinned to scroll
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate(self) {
          const progress = self.progress
          const litCount = Math.round(progress * wordRefs.current.length)
          wordRefs.current.forEach((el, i) => {
            if (!el) return
            el.style.color = i < litCount
              ? el.dataset.blue === 'true' ? '#1B6FC9' : '#111827'
              : '#d1d5db'
          })
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="bg-white">

      {/* ── Part 1: Pinned word reveal (scroll-linked storytelling) ── */}
      <div ref={wrapperRef} style={{ height: '280vh' }}>
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16"
        >
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="section-label">About Dr. Faisal</span>
            </motion.div>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.3] tracking-tight select-none">
              {words.map((w, i) => (
                <span key={i}>
                  <span
                    ref={el => { wordRefs.current[i] = el }}
                    data-blue={w.blue ? 'true' : 'false'}
                    style={{ color: '#d1d5db', transition: 'color 0.15s ease' }}
                  >
                    {w.text}
                  </span>
                  {' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* ── Part 2: Doctor details with 3D photo layout ── */}
      <div className="py-24 bg-dental-alt overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Floating Photos with 3D entrance */}
            <div className="relative h-[560px] hidden lg:block" style={{ perspective: 1200 }}>
              {floatingPhotos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, scale: 0.8, rotateY: i % 2 === 0 ? -20 : 20, rotateX: 10, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.85, delay: photo.delay, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: 1.04, rotateY: i % 2 === 0 ? 3 : -3, transition: { duration: 0.3 } }}
                  className={`absolute ${photo.position} w-[220px] bg-white rounded-2xl p-2 shadow-card-hover ${photo.rotate} z-${i + 1} cursor-default`}
                >
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={216}
                      height={270}
                      className="object-cover w-full h-[200px]"
                    />
                  </div>
                  <div className="px-2 py-2">
                    <div className="text-[11px] font-semibold text-dental-blue text-center">{photo.label}</div>
                  </div>
                </motion.div>
              ))}

              {/* Center badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateZ: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, type: 'spring', bounce: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-dental-blue/10 border-2 border-dental-blue/20 flex items-center justify-center z-0"
              >
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-dental-blue">28+</div>
                  <div className="text-[10px] font-semibold text-dental-body leading-tight">Years of<br />Excellence</div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Content */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 800 }}
                className="text-3xl sm:text-4xl font-bold text-dental-heading leading-tight"
              >
                Compassionate Care,{' '}
                <span className="gradient-text">Unmatched Expertise.</span>
              </motion.h2>

              {/* Mobile photos */}
              <div className="grid grid-cols-2 gap-3 lg:hidden">
                {floatingPhotos.slice(0, 2).map(photo => (
                  <div key={photo.src} className="rounded-xl overflow-hidden aspect-[3/4]">
                    <Image src={photo.src} alt={photo.alt} width={200} height={260} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-dental-body leading-relaxed">
                {[
                  'Dr. Sheikh Md. Shahriar Quader — known to his patients as Dr. Faisal — has dedicated nearly three decades to transforming smiles and restoring dental function for patients across Bangladesh. His journey began at Dhaka Dental College in 1997, followed by advanced postgraduate training in Prosthodontics at Bangladesh Medical University.',
                  'As Professor and Head of the Department of Prosthodontics at Shaheed Suhrawardy Medical College Hospital, he trains the next generation of dental specialists while maintaining a thriving private practice at Faisal\'s Dental Care in Gulshan-1.',
                  'In 2019, Dr. Faisal was awarded fellowship by the International College of Dentists, USA — one of the most prestigious recognitions in global dentistry. He has completed advanced training in India, Thailand, and Spain.',
                ].map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm sm:text-base"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Credential Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2 py-2"
              >
                {badges.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="credential-badge">
                    <Icon size={14} className="text-dental-blue" />
                    <div>
                      <div className="text-xs font-semibold text-dental-heading leading-none">{label}</div>
                      <div className="text-[10px] text-dental-body leading-none mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a
                  href="https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Appointment →
                </a>
                <Link href="/about" className="btn-outline-blue">
                  Learn More About Dr. Faisal
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
