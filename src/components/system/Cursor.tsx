import { useEffect, useRef, useState } from 'react'
import { useIsDesktop, useReducedMotion } from '@/hooks'
import './Cursor.css'

type Mode = 'default' | 'link' | 'view' | 'drag' | 'hidden'

const LABELS: Partial<Record<Mode, string>> = {
  view: 'View',
  drag: 'Drag',
}

const DOT_EASE = 0.55
const RING_EASE = 0.12
const FRAME = 1000 / 60
const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]'

export function Cursor() {
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isDesktop || reduced) return

    document.documentElement.classList.add('has-custom-cursor')

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dot = { ...pointer }
    const ring = { ...pointer }

    let raf = 0
    let last = performance.now()
    let shown = false
    let lastTarget: EventTarget | null = null

    const ease = (current: number, target: number, factor: number, frames: number) =>
      current + (target - current) * (1 - Math.pow(1 - factor, frames))

    const render = (now: number) => {
      const frames = Math.min(5, (now - last) / FRAME)
      last = now

      dot.x = ease(dot.x, pointer.x, DOT_EASE, frames)
      dot.y = ease(dot.y, pointer.y, DOT_EASE, frames)
      ring.x = ease(ring.x, pointer.x, RING_EASE, frames)
      ring.y = ease(ring.y, pointer.y, RING_EASE, frames)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY

      if (!shown) {
        shown = true
        setVisible(true)
      }

      if (e.target === lastTarget) return
      lastTarget = e.target

      const el = e.target as HTMLElement | null
      const flagged = el?.closest<HTMLElement>('[data-cursor]')
      if (flagged) {
        setMode((flagged.dataset.cursor as Mode) ?? 'default')
        return
      }
      setMode(el?.closest(INTERACTIVE) ? 'link' : 'default')
    }

    const onLeave = () => {
      shown = false
      setVisible(false)
    }
    const onEnter = () => {
      shown = true
      setVisible(true)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [isDesktop, reduced])

  if (!isDesktop || reduced) return null

  return (
    <div className={`cursor ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      <div ref={dotRef} className="cursor__dot" data-mode={mode} />
      <div ref={ringRef} className="cursor__ring" data-mode={mode}>
        <span className="cursor__label">{LABELS[mode] ?? ''}</span>
      </div>
    </div>
  )
}
