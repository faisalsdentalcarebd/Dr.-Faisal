'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0
    let mouseY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power2.out' })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.2, ease: 'power2.out' })
    }

    const onEnterMagnetic = () => {
      cursor.classList.add('magnetic')
      ring.classList.add('magnetic')
    }

    const onLeaveMagnetic = () => {
      cursor.classList.remove('magnetic')
      ring.classList.remove('magnetic')
    }

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 })
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(27,111,201,0.8)', duration: 0.2 })
    }

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(27,111,201,0.4)', duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    const magneticTargets = document.querySelectorAll('.magnetic-target')
    magneticTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnterMagnetic)
      el.addEventListener('mouseleave', onLeaveMagnetic)
    })

    const links = document.querySelectorAll('a, button')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      magneticTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterMagnetic)
        el.removeEventListener('mouseleave', onLeaveMagnetic)
      })
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring hidden md:block" aria-hidden="true" />
    </>
  )
}
