'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FALLBACK_IMAGES = [
  { id: 1,  src: '/images/doctors/Dr. Faisal At his Chamber.jpeg',              caption: "Dr. Faisal at His Chamber" },
  { id: 2,  src: '/images/services/1. Crown & Bridge.jpg',                       caption: 'Crown & Bridge' },
  { id: 3,  src: '/images/doctors/Dr. Faisal Planning Implant.jpeg',             caption: 'Implant Planning' },
  { id: 4,  src: '/images/services/2. Dental Implant.jpg',                       caption: 'Dental Implants' },
  { id: 5,  src: '/images/doctors/Dr. Faisal Checking instruments.jpeg',         caption: 'Instrument Precision' },
  { id: 6,  src: '/images/services/3. Fixed Orthodontics.jpg',                   caption: 'Fixed Orthodontics' },
  { id: 7,  src: '/images/doctors/Dr. Faisal At his chamber 2.jpeg',             caption: 'The Clinic' },
  { id: 8,  src: '/images/services/4. Root Canal Treatments.jpg',                caption: 'Root Canal Treatment' },
  { id: 9,  src: '/images/doctors/Dr. Faisal Checking prosthodontic apliance.jpeg', caption: 'Prosthodontic Appliance' },
  { id: 10, src: '/images/services/5. Dental Scaling.jpg',                       caption: 'Dental Scaling' },
  { id: 11, src: '/images/doctors/1. Implant Shot.jpeg',                         caption: 'Implant Procedure' },
  { id: 12, src: '/images/doctors/Dr. Faisal Thinking about prosthodontic.jpeg', caption: 'Expert Consultation' },
]

type GalleryItem = { id: number; src: string; caption: string }

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>(FALLBACK_IMAGES)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('id, url, caption')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setImages(data.map((img, i) => ({ id: i + 1, src: img.url, caption: img.caption || '' })))
        }
      })
  }, [])

  const open = useCallback((id: number) => setLightbox(id), [])
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => {
    setLightbox(i => {
      if (i === null) return null
      const idx = images.findIndex(img => img.id === i)
      return images[(idx - 1 + images.length) % images.length].id
    })
  }, [images])
  const next = useCallback(() => {
    setLightbox(i => {
      if (i === null) return null
      const idx = images.findIndex(img => img.id === i)
      return images[(idx + 1) % images.length].id
    })
  }, [images])

  const active = images.find(img => img.id === lightbox)
  const STRIP = [...images, ...images]

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#0a0603' }}>

      {/* Subtle accent gradient top */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(27,111,201,0.3), transparent)' }} />

      <div className="relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 px-4"
        >
          <span className="inline-block text-xs font-bold tracking-[4px] uppercase mb-4"
            style={{ color: '#1B6FC9' }}>
            Our Clinic
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: '#FFF0E0' }}>
            A Glimpse Inside
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,240,224,0.55)' }}>
            Scroll through our world — a calm, modern space built for your comfort.
          </p>
        </motion.div>

        {/* Filmstrip or Grid based on image count */}
        {images.length >= 5 ? (
          <div
            className="relative w-full overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          >
            <div
              ref={stripRef}
              className="flex gap-5 w-max"
              style={{
                animation: 'scrollRTL 55s linear infinite',
                willChange: 'transform',
              }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...images, ...images].map((img, index) => (
                <div
                  key={`${img.id}-${index}`}
                  className="relative flex-none overflow-hidden cursor-pointer group"
                  style={{
                    width: 320,
                    height: 240,
                    borderRadius: 18,
                    border: '1.5px solid rgba(10,14,24,0.08)',
                    boxShadow: '0 4px 24px rgba(10,14,24,0.08)',
                    background: '#f0e8df',
                  }}
                  onClick={() => open(img.id)}
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                    sizes="320px"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(10,14,24,0.82) 0%, transparent 60%)' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: '#FFF8F0' }}>
                      {img.caption}
                    </span>
                  </div>
                  {/* Orange glow border on hover */}
                  <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 2px #FF6A00' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative flex-none overflow-hidden cursor-pointer group"
                style={{
                  width: 320,
                  height: 240,
                  borderRadius: 18,
                  border: '1.5px solid rgba(10,14,24,0.08)',
                  boxShadow: '0 4px 24px rgba(10,14,24,0.08)',
                  background: '#f0e8df',
                }}
                onClick={() => open(img.id)}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                  sizes="320px"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10,14,24,0.82) 0%, transparent 60%)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#FFF8F0' }}>
                    {img.caption}
                  </span>
                </div>
                {/* Orange glow border on hover */}
                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 2px #FF6A00' }} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14 px-4"
        >
          <a
            href="https://wa.me/+8801XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1B6FC9, #0f4d96)',
              color: '#fff',
              boxShadow: '0 8px 28px rgba(27,111,201,0.35)',
              letterSpacing: '1.5px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(27,111,201,0.45)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(27,111,201,0.35)'
            }}
          >
            Book an Appointment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes scrollRTL {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(10,14,24,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image src={active.src} alt={active.caption} fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 inset-x-0 px-6 py-5"
                style={{ background: 'linear-gradient(to top, rgba(10,14,24,0.92), transparent)' }}>
                <p className="text-base font-semibold" style={{ color: '#FFF8F0' }}>{active.caption}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,248,240,0.45)' }}>
                  {images.findIndex(i => i.id === lightbox) + 1} / {images.length}
                </p>
              </div>
            </motion.div>

            {/* Prev */}
            <button onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(27,111,201,0.2)', border: '1px solid rgba(27,111,201,0.4)', color: '#60a5fa' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {/* Next */}
            <button onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(27,111,201,0.2)', border: '1px solid rgba(27,111,201,0.4)', color: '#60a5fa' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            {/* Close */}
            <button onClick={close}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(27,111,201,0.2)', border: '1px solid rgba(27,111,201,0.4)', color: '#60a5fa' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
