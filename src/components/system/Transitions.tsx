import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { useReducedMotion } from '@/hooks'
import { EASE_IN_OUT, EASE_OUT, ScrollTrigger, gsap } from '@/lib/gsap'
import { useLenisInstance } from './SmoothScroll'
import './Transitions.css'

const PANELS = 5

export function RouteCurtain() {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.curtain__panel',
        { scaleY: 1 },
        { scaleY: 0, duration: 0.9, ease: EASE_IN_OUT, stagger: 0.055 },
      )
    }, el)

    return () => ctx.revert()
  }, [pathname, reduced])

  return (
    <div ref={ref} className="curtain" aria-hidden="true">
      {Array.from({ length: PANELS }, (_, i) => (
        <span key={i} className="curtain__panel" />
      ))}
    </div>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: EASE_OUT, delay: 0.15 })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return <div ref={ref}>{children}</div>
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenisInstance()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname, lenis])

  return null
}
