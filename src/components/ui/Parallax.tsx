import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'

import { useReducedMotion } from '@/hooks'
import { SCRUB, THROUGH, gsap } from '@/lib/gsap'
import './Parallax.css'

type Props = {
  children: ReactNode
  /** Pixels travelled either side of centre. Negative moves against the scroll. */
  distance?: number
  className?: string
  as?: ElementType
}

export function Parallax({ children, distance = 70, className, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced || distance === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: { trigger: el, ...THROUGH, scrub: SCRUB, invalidateOnRefresh: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [distance, reduced])

  return (
    <Tag ref={ref} className={className} data-parallax="">
      {children}
    </Tag>
  )
}
