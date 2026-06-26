'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const WA_LINK = 'https://wa.me/8801817102030?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Faisal%27s%20Dental%20Care.'

export default function BookingForm() {
  return (
    <section id="booking" className="py-24 bg-dental-booking relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-dental-blue/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-blue/5 rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-label mb-4">Book Your Visit</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-dental-heading"
          >
            Book Your{' '}
            <span className="gradient-text">Appointment</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-dental-body mt-3"
          >
            If you are searching for a dentist near me in Gulshan or Dhaka, Dr. Faisal&apos;s clinic is minutes away. Reach us via WhatsApp or phone — we confirm appointments quickly, Saturday–Thursday, 4:00 PM – 8:00 PM.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Contact CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-dental-heading mb-2">Get in Touch Instantly</h3>
              <p className="text-dental-body text-sm leading-relaxed">
                Simply tap WhatsApp or call us directly. Our team responds promptly and will confirm your slot right away.
              </p>
            </div>

            {/* WhatsApp */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-5 bg-[#25D366] hover:bg-[#20bb5a] text-white rounded-2xl px-7 py-6 shadow-lg transition-colors duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">WhatsApp Us</div>
                <div className="text-white/80 text-sm mt-0.5">Tap to open chat — message ready for you</div>
              </div>
            </motion.a>

            {/* Call */}
            <motion.a
              href="tel:01817102030"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-5 bg-dental-blue hover:bg-dental-blue-dark text-white rounded-2xl px-7 py-6 shadow-lg transition-colors duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone size={26} />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Call Directly</div>
                <div className="text-white/80 text-sm mt-0.5">01817-102030</div>
              </div>
            </motion.a>

            {/* Hours note */}
            <div className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-dental-border">
              <Clock size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-dental-heading text-sm">Consulting Hours</div>
                <div className="text-dental-body text-sm mt-0.5">Saturday – Thursday: 4:00 PM – 8:00 PM</div>
                <div className="text-dental-body text-sm">Friday: By Appointment Only</div>
              </div>
            </div>
          </motion.div>

          {/* Clinic Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Info Cards */}
            {[
              {
                icon: MapPin,
                color: 'bg-red-50 text-red-500',
                title: 'Clinic Address',
                lines: [
                  'House # 50, Road # 03, Block-B',
                  'Niketan, Gulshan-1, Dhaka-1212',
                ],
              },
              {
                icon: Phone,
                color: 'bg-green-50 text-green-600',
                title: 'Phone',
                lines: ['01817-102030'],
              },
              {
                icon: Mail,
                color: 'bg-blue-50 text-dental-blue',
                title: 'Email',
                lines: ['faisalsdentalcare@gmail.com'],
              },
              {
                icon: Clock,
                color: 'bg-amber-50 text-amber-600',
                title: 'Consulting Hours',
                lines: [
                  '4:00 PM – 8:00 PM · Saturday – Thursday',
                  'Friday: By Appointment Only',
                ],
              },
            ].map(({ icon: Icon, color, title, lines }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-dental-border shadow-sm hover:shadow-glass hover:border-dental-blue/30 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-dental-heading text-sm mb-1">{title}</div>
                  {lines.map((l) => (
                    <div key={l} className="text-dental-body text-sm">{l}</div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/8801817102030"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="btn-whatsapp w-full justify-center text-sm"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </motion.a>

            {/* Google Maps embed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="rounded-2xl overflow-hidden border border-dental-border h-48"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d813.2210768022504!2d90.4108295204582!3d23.774496562780616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7c5ff02f0ad%3A0x5a1be00b6bcd6920!2sFaisal's%20Dental%20Care!5e0!3m2!1sen!2sbd!4v1781930899881!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Faisal's Dental Care — Niketan, Gulshan-1, Dhaka"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
