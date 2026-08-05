import { useLayoutEffect, useRef, type ReactNode } from 'react'

import { useReducedMotion } from '@/hooks'
import { ScrollTrigger, gsap } from '@/lib/gsap'
import { cx } from '@/lib/utils'
import './Collapse.css'

type Props = {
  open: boolean
  children: ReactNode
  id?: string
  className?: string
  duration?: number
}

export function Collapse({ open, children, id, className, duration = 0.6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mounted = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (!mounted.current || reduced) {
      mounted.current = true
      gsap.set(el, { height: open ? 'auto' : 0, opacity: open ? 1 : 0 })
      return
    }

    const tween = gsap.to(el, {
      height: open ? 'auto' : 0,
      opacity: open ? 1 : 0,
      duration,
      ease: 'power3.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    })

    return () => {
      tween.kill()
    }
  }, [open, duration, reduced])

  return (
    <div ref={ref} id={id} className={cx('collapse', className)} aria-hidden={!open}>
      {children}
    </div>
  )
}
