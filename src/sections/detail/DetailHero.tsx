import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Figure, Lines, Reveal } from '@/components/ui'
import { useReducedMotion } from '@/hooks'
import { EASE_IN_OUT, gsap } from '@/lib/gsap'
import './DetailHero.css'

type Props = {
  back: { to: string; label: string }
  eyebrow: string
  title: string
  lead: string
  meta: { label: string; value: string }[]
  image: string
  imageAlt: string
  children?: ReactNode
}

export function DetailHero({ back, eyebrow, title, lead, meta, image, imageAlt, children }: Props) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = mediaRef.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(14% 8% 14% 8%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: EASE_IN_OUT, delay: 0.3 },
      )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <header className="dhero">
      <div className="shell">
        <div className="dhero__top">
          <Reveal as="span" y={12}>
            <Link to={back.to} className="dhero__back mono">
              <svg viewBox="0 0 16 10" width="15" height="9" fill="none" aria-hidden="true">
                <path d="M16 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              {back.label}
            </Link>
          </Reveal>
          <span className="dhero__eyebrow mono">{eyebrow}</span>
        </div>

        <Lines as="h1" className="display d1 dhero__title" lines={[title]} delay={0.15} />

        <div className="dhero__foot">
          <Reveal delay={0.3} className="dhero__lead">
            <p className="lead">{lead}</p>
            {children}
          </Reveal>

          <dl className="dhero__meta">
            {meta.map((m, i) => (
              <Reveal as="div" key={m.label} delay={0.4 + i * 0.06} className="dhero__metaitem">
                <dt className="mono">{m.label}</dt>
                <dd>{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="dhero__media" ref={mediaRef}>
        <Figure id={image} alt={imageAlt} parallax={70} priority width={2400} />
      </div>
    </header>
  )
}
