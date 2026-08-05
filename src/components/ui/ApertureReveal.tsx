import { useLayoutEffect, useRef, type ReactNode } from 'react'

import { useReducedMotion } from '@/hooks'
import { EASE_IN_OUT, EASE_OUT, gsap } from '@/lib/gsap'
import { cx } from '@/lib/utils'
import './ApertureReveal.css'

const SHUT = 'circle(0% at 50% 50%)'
const OPEN = 'circle(75% at 50% 50%)'

type Props = {
  children: ReactNode
  className?: string
  start?: string
  duration?: number
  zoom?: number
}

export function ApertureReveal({
  children,
  className,
  start = 'top 85%',
  duration = 1.4,
  zoom = 1.45,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      const inner = el.querySelector('.aperture-reveal__inner')

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true } })

      tl.fromTo(el, { clipPath: SHUT }, { clipPath: OPEN, duration, ease: EASE_IN_OUT }, 0)
      tl.fromTo(
        inner,
        { scale: zoom, filter: 'brightness(1.18)' },
        { scale: 1, filter: 'brightness(1)', duration: duration + 0.6, ease: EASE_OUT },
        0,
      )
    }, el)

    return () => ctx.revert()
  }, [reduced, start, duration, zoom])

  return (
    <div ref={ref} className={cx('aperture-reveal', className)}>
      <div className="aperture-reveal__inner">{children}</div>
    </div>
  )
}
