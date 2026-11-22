import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { useFinePointer, useReducedMotion } from '@/hooks'
import { SCRUB, SMOOTH_ABOVE, THROUGH, gsap } from '@/lib/gsap'
import { SCROLL_DRIVEN, cx, img } from '@/lib/utils'
import './Figure.css'

type Props = {
  id: string
  alt: string
  ratio?: string
  /** Share of the frame height the image drifts through. 0 disables. */
  depth?: number
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
  depth = 0.12,
  width = 1600,
  className,
  priority = false,
  scaleIn = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const [loaded, setLoaded] = useState(false)

  const drifts = depth > 0 && !reduced && (fine || SCROLL_DRIVEN)
  const scrubs = drifts && fine

  useLayoutEffect(() => {
    const scope = ref.current
    const el = imgRef.current
    if (!scope || !el || reduced) return
    if (!scrubs && !scaleIn) return

    const ctx = gsap.context(() => {
      const scrub = depth >= SMOOTH_ABOVE ? SCRUB : true
      const trigger = { trigger: scope, ...THROUGH, scrub, invalidateOnRefresh: true }
      const travel = () => scope.offsetHeight * depth

      if (scrubs) {
        gsap.fromTo(
          el,
          { y: () => -travel() },
          { y: () => travel(), ease: 'none', force3D: true, scrollTrigger: trigger },
        )
      }
      if (scaleIn) {
        gsap.fromTo(el, { scale: 1.16 }, { scale: 1, ease: 'none', force3D: true, scrollTrigger: trigger })
      }
    }, scope)

    return () => ctx.revert()
  }, [scrubs, depth, scaleIn, reduced])

  const style = {
    ...(ratio ? { aspectRatio: ratio } : null),
    ...(drifts ? ({ '--fig-depth': String(depth) } as CSSProperties) : null),
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={cx(
        'figure',
        drifts && 'figure--drift',
        drifts && !fine && 'figure--scroll',
        loaded && 'is-loaded',
        className,
      )}
      style={style}
    >
      <img
        ref={imgRef}
        src={img(id, width)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        draggable={false}
      />
      {children}
    </div>
  )
}
