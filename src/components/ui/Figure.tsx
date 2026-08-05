import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { useReducedMotion } from '@/hooks'
import { gsap } from '@/lib/gsap'
import { cx, img } from '@/lib/utils'
import './Figure.css'

type Props = {
  id: string
  alt: string
  ratio?: string
  parallax?: number
  width?: number
  className?: string
  priority?: boolean
  scaleIn?: boolean
  children?: ReactNode
}

export function Figure({
  id,
  alt,
  ratio,
  parallax = 0,
  width = 1600,
  className,
  priority = false,
  scaleIn = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()
  const [loaded, setLoaded] = useState(false)

  const drifts = parallax !== 0 && !reduced

  useLayoutEffect(() => {
    const scope = ref.current
    const el = imgRef.current
    if (!scope || !el || reduced) return
    if (!drifts && !scaleIn) return

    const ctx = gsap.context(() => {
      const trigger = { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true }

      if (drifts) {
        gsap.fromTo(el, { y: -parallax }, { y: parallax, ease: 'none', scrollTrigger: trigger })
      }
      if (scaleIn) {
        gsap.fromTo(el, { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: trigger })
      }
    }, scope)

    return () => ctx.revert()
  }, [drifts, parallax, scaleIn, reduced])

  return (
    <div
      ref={ref}
      className={cx('figure', loaded && 'is-loaded', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        ref={imgRef}
        src={img(id, width)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={{
          height: drifts ? `calc(100% + ${parallax * 2}px)` : '100%',
          top: drifts ? `-${parallax}px` : 0,
        }}
        draggable={false}
      />
      {children}
    </div>
  )
}
