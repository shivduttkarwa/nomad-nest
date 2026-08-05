import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks'
import './SmoothScroll.css'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export const useLenisInstance = () => useContext(LenisContext)

export function useScrollTo() {
  const lenis = useLenisInstance()
  return (target: number | string | HTMLElement, offset = 0) => {
    if (lenis) lenis.scrollTo(target, { offset, duration: 1.35 })
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
    else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export function useLenisLock(locked: boolean) {
  const lenis = useLenisInstance()

  useEffect(() => {
    if (!locked) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    return () => {
      document.body.style.overflow = prevOverflow
      lenis?.start()
    }
  }, [locked, lenis])
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      lerp: 0.09,
    })

    setLenis(instance)

    const tick = (time: number) => instance.raf(time * 1000)
    const sync = () => ScrollTrigger.update()

    instance.on('scroll', sync)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      instance.off('scroll', sync)
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
