import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp } from '@/lib/utils'

/* ------------------------------------------------------------------
   Media query
------------------------------------------------------------------ */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/* ------------------------------------------------------------------
   Magnetic pointer attraction — the signature feel of the CTAs.
   Returns a ref to attach to the element you want to pull.
------------------------------------------------------------------ */
export function useMagnetic<T extends HTMLElement>(strength = 0.32, radius = 1.15) {
  const ref = useRef<T>(null)
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !isDesktop || reduced) return

    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const render = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(render)
      } else {
        raf = 0
      }
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const mx = r.left + r.width / 2
      const my = r.top + r.height / 2
      const dx = e.clientX - mx
      const dy = e.clientY - my
      const dist = Math.hypot(dx, dy)
      const reach = (Math.max(r.width, r.height) / 2) * (1 + radius)

      if (dist < reach) {
        const falloff = 1 - clamp(dist / reach, 0, 1)
        tx = dx * strength * falloff
        ty = dy * strength * falloff
      } else {
        tx = 0
        ty = 0
      }
      kick()
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius, isDesktop, reduced])

  return ref
}

/* ------------------------------------------------------------------
   Live clock for a given IANA timezone (footer / contact studios)
------------------------------------------------------------------ */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 10_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}

/* ------------------------------------------------------------------
   Lock body scroll (menu overlay)
------------------------------------------------------------------ */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('is-locked')
    return () => {
      document.body.style.overflow = prev
      document.documentElement.classList.remove('is-locked')
    }
  }, [locked])
}

/* ------------------------------------------------------------------
   Pointer position within an element, normalised 0..1 — used for
   the hover-preview image on the destination index.
------------------------------------------------------------------ */
export function useCursorTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])
  return { pos, onMove }
}
