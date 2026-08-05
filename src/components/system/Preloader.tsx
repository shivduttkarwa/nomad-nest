import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pad } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import './Preloader.css'

const WORDS = ['Melbourne', 'Lisbon', 'Kyoto', 'Nomad & Nest']

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (reduced) {
      setOpen(false)
      onDone()
      return
    }

    let value = 0
    let timer = 0

    const step = () => {
      const remaining = 100 - value
      value = Math.min(100, value + Math.max(1, Math.round(remaining * 0.12)))
      setCount(value)
      if (value < 100) {
        timer = window.setTimeout(step, 28 + Math.random() * 42)
      } else {
        timer = window.setTimeout(() => {
          setOpen(false)
          onDone()
        }, 420)
      }
    }

    timer = window.setTimeout(step, 220)
    return () => window.clearTimeout(timer)
  }, [reduced, onDone])

  const wordIndex = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__inner">
            <div className="preloader__word">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="preloader__meta">
              <span className="mono">Establishing route</span>
              <span className="preloader__count">{pad(count, 3)}</span>
            </div>

            <div className="preloader__bar">
              <motion.i style={{ scaleX: count / 100 }} transition={{ ease: 'linear' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
