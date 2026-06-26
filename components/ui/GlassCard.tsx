'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function GlassCard({ children, className, delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -6, boxShadow: '0 20px 60px rgba(27,111,201,0.14)' } : undefined}
      className={cn('glass rounded-2xl p-6', className)}
    >
      {children}
    </motion.div>
  )
}
