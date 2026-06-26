'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const videoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[420px] overflow-hidden">

      {/* Parallax video */}
      <motion.div className="absolute inset-0" style={{ y: videoY, scale: 1.12 }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/videos/video-section-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(6,10,20,0.55) 0%, rgba(6,10,20,0.3) 50%, rgba(6,10,20,0.55) 100%)' }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-white/12 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-6"
        >
          Faisal&apos;s Dental Care · Gulshan-1, Dhaka
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-3xl"
        >
          28 Years of Transforming{' '}
          <span style={{ background: 'linear-gradient(90deg,#60a5fa,#1B6FC9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Smiles
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
        >
          Specialist prosthodontic care — internationally trained, locally trusted.
        </motion.p>

        <motion.a
          href="https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="inline-flex items-center gap-2.5 bg-dental-blue hover:bg-dental-blue-dark text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 text-sm"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book Your Appointment
        </motion.a>
      </motion.div>
    </section>
  )
}
