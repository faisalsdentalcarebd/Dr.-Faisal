'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  const commonProps = {
    ref: ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    className: cn('magnetic-target inline-block', className),
  }

  if (href) {
    return (
      <a {...commonProps} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button {...commonProps} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
