'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import MagneticButton from './ui/MagneticButton'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/#why-choose' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'navbar-blur' : 'navbar-glass-dark'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Faisal's Dental Care"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className={`font-bold text-sm tracking-tight transition-colors duration-300 ${scrolled ? 'text-dental-heading' : 'text-white drop-shadow-sm'}`}>
                  Faisal&apos;s Dental Care
                </div>
                <div className={`text-[10px] font-medium transition-colors duration-300 ${scrolled ? 'text-dental-body' : 'text-white/75 drop-shadow-sm'}`}>
                  Specialist Dental Care · Gulshan-1
                </div>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 bg-dental-blue/10 border border-dental-blue/20 text-dental-blue text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                <Award size={9} />
                FICD
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    scrolled
                      ? 'text-dental-body hover:text-dental-blue hover:bg-dental-blue/5'
                      : 'text-white hover:text-white hover:bg-white/12 drop-shadow-sm'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-dental-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:01817102030"
                className={`text-sm font-semibold transition-colors duration-300 ${
                  scrolled ? 'text-dental-body hover:text-dental-blue' : 'text-white hover:text-white/80 drop-shadow-sm'
                }`}
              >
                01817-102030
              </a>
              <a
                href="https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl animate-pulse-blue flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp →
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-xl transition-colors duration-200 ${
                scrolled ? 'text-dental-heading hover:bg-dental-alt' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-4 p-2 text-white/70 hover:text-white"
            >
              <X size={26} />
            </button>

            <div className="flex flex-col items-center gap-6 px-8 w-full">
              <div className="mb-6">
                <div className="bg-white rounded-2xl px-4 py-3 inline-block">
                  <Image
                    src="/images/logo.png"
                    alt="Faisal's Dental Care"
                    width={160}
                    height={54}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="text-white/50 text-xs mt-2 text-center">Gulshan-1, Dhaka</div>
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block w-full text-center text-white text-xl font-semibold py-3 border-b border-white/10 hover:text-dental-blue transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full pt-4 flex flex-col gap-3"
              >
                <a
                  href="https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary justify-center text-base py-4 rounded-2xl flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Appointment
                </a>
                <a href="tel:01817102030" className="text-center text-white/60 text-sm py-2">
                  Call: 01817-102030
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
