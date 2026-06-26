'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Award, Star, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const v1Ref = useRef<HTMLVideoElement>(null)
  const v2Ref = useRef<HTMLVideoElement>(null)
  const activeSlot = useRef<0 | 1>(0)
  const crossfading = useRef(false)
  const [opacities, setOpacities] = useState<[number, number]>([1, 0])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  // Double-buffer crossfade — no black flash, no visible cut
  useEffect(() => {
    const videos = [v1Ref.current!, v2Ref.current!]
    const CROSSFADE_AT = 1.4

    const handleTimeUpdate = () => {
      const slot = activeSlot.current
      const active = videos[slot]
      if (!active?.duration || crossfading.current) return
      const remaining = active.duration - active.currentTime
      if (remaining <= CROSSFADE_AT) {
        crossfading.current = true
        const next = slot === 0 ? 1 : 0
        const nextVid = videos[next]
        nextVid.currentTime = 0
        nextVid.play().catch(() => {})
        activeSlot.current = next
        setOpacities(next === 0 ? [1, 0] : [0, 1])
        setTimeout(() => { crossfading.current = false }, 1600)
      }
    }

    videos.forEach(v => v?.addEventListener('timeupdate', handleTimeUpdate))
    return () => videos.forEach(v => v?.removeEventListener('timeupdate', handleTimeUpdate))
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0e18]">

      {/* ── Video — fully clear, shows through everything ── */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: videoY, scale: 1.15 }}>
        <video
          ref={v1Ref} autoPlay muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none', opacity: opacities[0], transition: 'opacity 1.4s ease' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <video
          ref={v2Ref} muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none', opacity: opacities[1], transition: 'opacity 1.4s ease' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Barely-there membrane — video stays clearly visible ── */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(6, 10, 20, 0.05)' }} />

      {/* ── Two-column content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN — headline ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <span
                className="inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2.5 rounded-full tracking-widest uppercase"
                style={{
                  background: 'rgba(27,111,201,0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(27,111,201,0.45)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Gulshan&apos;s Trusted Prosthodontist
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-8">
              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mb-1"
              >
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-light italic text-white leading-none" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                  Expert Care for a
                </span>
              </motion.div>

              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mb-1"
              >
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.9]" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
                  Confident
                </span>
              </motion.div>

              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]"
                  style={{ background: 'linear-gradient(90deg,#60a5fa,#1B6FC9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Lasting Smile
                </span>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-dental-blue hover:bg-dental-blue-dark text-white font-bold py-4 px-7 rounded-2xl transition-all duration-200 text-sm shadow-blue"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
              </a>
              <a
                href="tel:01817102030"
                className="inline-flex items-center gap-2.5 text-white font-bold py-4 px-7 rounded-2xl transition-all duration-200 text-sm"
                style={{
                  background: 'rgba(27,111,201,0.2)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(27,111,201,0.4)',
                }}
              >
                <Phone size={15} />
                01817-102030
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — stats + info ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* FICD credential card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(27,111,201,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(27,111,201,0.55)',
                boxShadow: '0 4px 32px rgba(27,111,201,0.2)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-dental-blue/50 flex items-center justify-center flex-shrink-0" style={{ backdropFilter: 'blur(8px)' }}>
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-base leading-tight">Dr. Sheikh Md. Shahriar Quader</div>
                  <div className="text-white/90 text-sm">FICD Fellow · International College of Dentists, USA</div>
                </div>
                <div className="ml-auto w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {[
                  { value: '28+', label: 'Years' },
                  { value: '10K+', label: 'Patients' },
                  { value: '5.0★', label: 'Rating' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-white font-black text-xl leading-none mb-1">{value}</div>
                    <div className="text-white text-xs font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services quick list */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(27,111,201,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(27,111,201,0.55)',
                boxShadow: '0 4px 32px rgba(27,111,201,0.2)',
              }}
            >
              <div className="text-white text-xs font-bold tracking-widest uppercase mb-3">Specialist In</div>
              <div className="grid grid-cols-2 gap-2">
                {['Crown & Bridge', 'Dental Implants', 'Root Canal', 'Orthodontics', 'Veneers', 'Fillings'].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-white text-sm font-medium">
                    <CheckCircle size={13} className="text-dental-blue flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Location + hours */}
            <div
              className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
              style={{
                background: 'rgba(27,111,201,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(27,111,201,0.55)',
                boxShadow: '0 4px 32px rgba(27,111,201,0.2)',
              }}
            >
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <MapPin size={14} className="text-dental-blue flex-shrink-0" />
                <span>Niketan, Gulshan-1, Dhaka</span>
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <Clock size={14} className="text-dental-blue flex-shrink-0" />
                <span>4–8 PM · Sat–Thu</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
