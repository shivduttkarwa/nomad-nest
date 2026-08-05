import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLenisInstance } from './SmoothScroll'
import './Transitions.css'

const PANELS = 5

export function RouteCurtain() {
  const { pathname } = useLocation()

  return (
    <div className="curtain" aria-hidden="true" key={pathname}>
      {Array.from({ length: PANELS }, (_, i) => (
        <motion.span
          key={i}
          className="curtain__panel"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.055,
          }}
        />
      ))}
    </div>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenisInstance()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}
