'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exit = () => {
      setExiting(true)
      setTimeout(() => setVisible(false), 500)
    }

    // Wait for page load, max 2s
    const safety = setTimeout(exit, 2000)

    if (document.readyState === 'complete') {
      // Already loaded — let animation play at least 1.5s
      const min = setTimeout(exit, 1500)
      clearTimeout(safety)
      return () => clearTimeout(min)
    }

    const onLoad = () => {
      clearTimeout(safety)
      // Page loaded — let animation finish (minimum 1.5s from mount)
      setTimeout(exit, 1500)
    }
    window.addEventListener('load', onLoad, { once: true })

    return () => {
      clearTimeout(safety)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes ringFill {
          to { stroke-dashoffset: 0; }
        }
        @keyframes spinReverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit {
          0%   { opacity: 1; transform: translateX(-50%) rotate(0deg); }
          100% { opacity: 0.6; transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes popIn {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes riseIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillPop {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes preloaderZoomExit {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.8); }
        }
        /* 2s total: content 0→1.5s, zoom exit 1.5→2.0s */
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#f0f4ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Segoe UI', sans-serif",
          overflow: 'hidden',
          animation: exiting ? 'preloaderZoomExit 0.5s cubic-bezier(0.4,0,1,1) forwards' : 'none',
          pointerEvents: exiting ? 'none' : 'all',
        }}
      >
        {/* Ring */}
        <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 120 120">
            {/* Track */}
            <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(30,77,183,0.1)" strokeWidth="3" />
            {/* Inner dashed ring counter-spinning */}
            <circle
              cx="60" cy="60" r="48"
              fill="none" stroke="rgba(30,77,183,0.2)" strokeWidth="1"
              strokeDasharray="4 8"
              style={{ transformOrigin: 'center', animation: 'spinReverse 4s linear infinite' }}
            />
            {/* Progress ring fills */}
            <circle
              cx="60" cy="60" r="55"
              fill="none" stroke="#1e4db7" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="345"
              strokeDashoffset="345"
              style={{
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
                animation: 'ringFill 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
                filter: 'drop-shadow(0 0 4px rgba(30,77,183,0.4))',
              }}
            />
          </svg>

          {/* Orbiting dot */}
          <div style={{
            position: 'absolute',
            width: 10, height: 10,
            borderRadius: '50%',
            background: '#1e4db7',
            boxShadow: '0 0 0 3px rgba(30,77,183,0.15)',
            top: 5, left: '50%',
            transformOrigin: '0 55px',
            animation: 'orbit 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
            opacity: 0,
          }} />

          {/* F monogram */}
          <div style={{
            position: 'relative', zIndex: 2,
            fontSize: '2.2rem', fontWeight: 900, color: '#1e4db7',
            opacity: 0, transform: 'scale(0.5)',
            animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) 0.8s forwards',
          }}>F</div>
        </div>

        {/* Text content */}
        <div style={{ textAlign: 'center', opacity: 0, transform: 'translateY(16px)', animation: 'riseIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.9s forwards' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0a1628' }}>
            Faisal's <span style={{ color: '#1e4db7' }}>Dental</span> Care
          </div>
          <div style={{ fontSize: '0.72rem', color: '#5a6a8e', marginTop: 8 }}>
            Dr. Sheikh Md. Shahriar Quader Faisal
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
            {[
              { label: 'Prosthodontist', delay: '1.05s', filled: true },
              { label: 'FICD Fellow · USA', delay: '1.15s', filled: false },
              { label: 'Gulshan-1, Dhaka', delay: '1.25s', filled: false },
              { label: '28 Years Excellence', delay: '1.35s', filled: false },
            ].map(({ label, delay, filled }) => (
              <span
                key={label}
                style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '1px',
                  padding: '4px 12px', borderRadius: 999,
                  background: filled ? '#1e4db7' : 'transparent',
                  color: filled ? '#fff' : '#1e4db7',
                  border: filled ? 'none' : '1.5px solid rgba(30,77,183,0.3)',
                  opacity: 0, transform: 'scale(0.8)',
                  animation: `pillPop 0.3s cubic-bezier(0.34,1.56,0.64,1) ${delay} forwards`,
                }}
              >{label}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
