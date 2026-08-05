import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { pad } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
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
  const shown = useRef(0)

  const progress = useMotionValue(0)
  const x = useTransform(progress, (p) => `${-30 + 152 * p}vw`)
  const y = useTransform(progress, (p) => `${100 - 118 * p - SWING * Math.sin(WEAVE * p)}vh`)
  const rotate = useTransform(progress, (p) => -BANK * Math.cos(WEAVE * p))

  useEffect(() => {
    if (reduced) {
      setOpen(false)
      onDone()
      return
    }

    let raf = 0
    let timer = 0
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / FLIGHT_MS)
      progress.set(p)

      const next = Math.round(p * 100)
      if (next !== shown.current) {
        shown.current = next
        setCount(next)
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timer = window.setTimeout(() => {
          setOpen(false)
          onDone()
        }, HOLD_MS)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [reduced, onDone, progress])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div className="preloader__plane" style={{ x, y, rotate }} aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M97 5 43 59 57 95Z" className="preloader__wing" />
              <path d="M97 5 3 45 43 59 57 95Z" className="preloader__body" />
              <path d="M97 5 43 59" className="preloader__crease" />
            </svg>
          </motion.div>

          <div className="preloader__inner">
            <span className="preloader__name display">
              Nomad <em>&amp;</em> Nest
            </span>
            <span className="preloader__count">{pad(count, 3)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
