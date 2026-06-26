'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, ArrowUp } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Dr. Faisal', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Blog & Guides', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'WhatsApp Appointment', href: 'https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care.' },
]

const serviceLinks = [
  { label: 'Crown & Bridge', href: '/services/crown-and-bridge' },
  { label: 'Dental Implants', href: '/services/dental-implants' },
  { label: 'Fixed Orthodontics', href: '/services/fixed-orthodontics' },
  { label: 'Root Canal', href: '/services/root-canal-treatment' },
  { label: 'Dental Scaling', href: '/services/dental-scaling' },
  { label: 'Tooth Extraction', href: '/services/tooth-extraction' },
  { label: 'Dental Fillings', href: '/services/dental-fillings' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-dental-heading text-white relative overflow-hidden pb-20 lg:pb-0">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dental-blue/50 to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-dental-blue -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-dental-blue translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-dental-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <div className="font-bold text-base text-white">Faisal&apos;s Dental Care</div>
                <div className="text-white/50 text-xs">Gulshan-1, Dhaka</div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-5">
              The trusted dentist nearby for patients across Gulshan, Banani, and Baridhara — Dr. Faisal brings specialist-level dental care to your neighbourhood.
            </p>

            <p className="text-white/40 text-xs leading-relaxed mb-6">
              28 Years of Expertise. International Training. Your Smile, Our Priority.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100063653151655' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-dental-blue flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                  >
                    <span className="mr-2 text-dental-blue">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                  >
                    <span className="mr-2 text-dental-blue">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  lines: ['House # 50, Road # 03, Block-B', 'Niketan, Gulshan-1, Dhaka-1212'],
                },
                { icon: Phone, lines: ['01817-102030'], href: 'tel:01817102030' },
                { icon: Mail, lines: ['faisalsdentalcare@gmail.com'], href: 'mailto:faisalsdentalcare@gmail.com' },
                { icon: Clock, lines: ['4:00 PM – 8:00 PM', 'Saturday – Thursday'] },
              ].map(({ icon: Icon, lines, href }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon size={15} className="text-dental-blue flex-shrink-0 mt-0.5" />
                  <div>
                    {lines.map((line) =>
                      href ? (
                        <a key={line} href={href} className="block text-white/60 text-sm hover:text-white transition-colors duration-200">
                          {line}
                        </a>
                      ) : (
                        <span key={line} className="block text-white/60 text-sm">{line}</span>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © 2026 Faisal&apos;s Dental Care. All rights reserved. | BMDC Registration: 981 | Designed with care in Dhaka.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-dental-blue flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
