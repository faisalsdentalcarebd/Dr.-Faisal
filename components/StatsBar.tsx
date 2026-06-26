'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from './ui/AnimatedCounter'

const stats = [
  { value: 28, suffix: '+', label: 'Years of Experience' },
  { value: 10000, suffix: '+', label: 'Patients Treated' },
  { value: 3, suffix: '', label: 'Countries of Training' },
  { value: 7, suffix: '', label: 'Specialist Services' },
]

export default function StatsBar() {
  return (
    <section className="bg-dental-blue py-14 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/20 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center relative"
            >
              {/* Divider (desktop) */}
              {i !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 stats-divider" />
              )}

              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                <AnimatedCounter
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  className="tabular-nums"
                />
              </div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
