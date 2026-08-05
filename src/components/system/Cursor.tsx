import { useEffect, useRef, useState } from 'react'
import { useIsDesktop, useReducedMotion } from '@/hooks'
import './Cursor.css'

type Mode = 'default' | 'link' | 'view' | 'drag' | 'hidden'

const LABELS: Partial<Record<Mode, string>> = {
  view: 'View',
  drag: 'Drag',
}

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

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let shown = false

    const render = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!shown) {
        shown = true
        setVisible(true)
      }

      const el = e.target as HTMLElement | null
      const flagged = el?.closest<HTMLElement>('[data-cursor]')
      if (flagged) {
        setMode((flagged.dataset.cursor as Mode) ?? 'default')
        return
      }
      const interactive = el?.closest('a, button, input, textarea, select, [role="button"]')
      setMode(interactive ? 'link' : 'default')
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
