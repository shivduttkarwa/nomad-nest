import { useLayoutEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/hooks'
import { EASE_IN_OUT, gsap } from '@/lib/gsap'
import { pad } from '@/lib/utils'
import './Preloader.css'

const FLIGHT_MS = 3800
const HOLD_MS = 600
const WEAVE = Math.PI * 3.5
const SWING = 20
const BANK = 17

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const shown = useRef(0)

  useLayoutEffect(() => {
    if (reduced) {
      setOpen(false)
      onDone()
      return
    }

    const root = rootRef.current
    const plane = planeRef.current
    if (!root || !plane) return

    let raf = 0
    let timer = 0
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / FLIGHT_MS)

      gsap.set(plane, {
        x: `${-30 + 152 * p}vw`,
        y: `${100 - 118 * p - SWING * Math.sin(WEAVE * p)}vh`,
        rotate: -BANK * Math.cos(WEAVE * p),
      })

      const next = Math.round(p * 100)
      if (next !== shown.current) {
        shown.current = next
        setCount(next)
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick)
        return
      }

      timer = window.setTimeout(() => {
        gsap.to(root, {
          yPercent: -100,
          duration: 1.05,
          ease: EASE_IN_OUT,
          onComplete: () => setOpen(false),
        })
        onDone()
      }, HOLD_MS)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [reduced, onDone])

  if (!open) return null

  return (
    <div ref={rootRef} className="preloader">
      <div ref={planeRef} className="preloader__plane" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M97 5 43 59 57 95Z" className="preloader__wing" />
          <path d="M97 5 3 45 43 59 57 95Z" className="preloader__body" />
          <path d="M97 5 43 59" className="preloader__crease" />
        </svg>
      </div>

      <div className="preloader__inner">
        <span className="preloader__name display">
          Nomad <em>&amp;</em> Nest
        </span>
        <span className="preloader__count">{pad(count, 3)}</span>
      </div>
    </div>
  )
}
