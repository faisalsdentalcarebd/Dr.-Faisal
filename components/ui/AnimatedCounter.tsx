'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  from = 0,
  to,
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(from)
  const rounded = useSpring(count, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: [0.22, 1, 0.36, 1] })
    }
  }, [isInView, count, to, duration])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString() + suffix
      }
    })
    return unsubscribe
  }, [rounded, suffix])

  return <span ref={ref} className={className}>{from}{suffix}</span>
}
