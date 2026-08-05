import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'

import { ArrowLink, Lines, SectionHead } from '@/components/ui'
import { destinations, featuredDestinations } from '@/data/destinations'
import { useIsDesktop } from '@/hooks'
import { gsap } from '@/lib/gsap'
import { cx, img, money, pad } from '@/lib/utils'
import { HOME_IMAGES } from './images'
import './DestinationIndex.css'

export function DestinationIndex() {
  const isDesktop = useIsDesktop()
  const wrapRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const setRotate = useRef<((v: number) => void) | null>(null)
  const [active, setActive] = useState<number | null>(null)

  const rows = featuredDestinations.slice(0, 5)

  useLayoutEffect(() => {
    const el = previewRef.current
    if (!el || !isDesktop) return

    setX.current = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    setY.current = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    setRotate.current = gsap.quickTo(el, 'rotate', { duration: 0.6, ease: 'power3.out' })

    return () => {
      setX.current = null
      setY.current = null
      setRotate.current = null
      gsap.killTweensOf(el)
    }
  }, [isDesktop])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDesktop || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    setX.current?.(x)
    setY.current?.(y)
    setRotate.current?.(gsap.utils.clamp(-7, 7, (x / 400) * 7))
  }

  return (
    <section className="dindex section">
      <div className="shell">
        <SectionHead
          index="01 / 04"
          eyebrow="Where we work"
          aside={<ArrowLink to="/destinations">All {destinations.length} destinations</ArrowLink>}
        >
          <Lines
            as="h2"
            className="display d2"
            lines={[<>Places we know</>, <>well enough to <em>argue</em> about.</>]}
          />
        </SectionHead>
      </div>

      <div className="dindex__wrap shell" ref={wrapRef} onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <ul className="dindex__list">
          {rows.map((d, i) => (
            <li key={d.slug}>
              <Link
                to="/destinations"
                className={cx('dindex__row', active !== null && active !== i && 'is-dim')}
                onPointerEnter={() => setActive(i)}
                data-cursor="view"
              >
                <span className="dindex__num mono">{pad(i + 1)}</span>

                <span className="dindex__name display d3">{d.name}</span>

                <span className="dindex__thumb" aria-hidden="true">
                  <img src={img(HOME_IMAGES.destinations[d.slug] ?? d.image, 600)} alt="" loading="lazy" />
                </span>

                <span className="dindex__country">{d.country}</span>
                <span className="dindex__season mono">{d.season}</span>
                <span className="dindex__from mono">from {money(d.from)}</span>

                <span className="dindex__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path d="M2 14L14 2M14 2H5M14 2v9" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {isDesktop && (
          <div className="dindex__preview" ref={previewRef} aria-hidden="true">
            {rows.map((d, i) => (
              <img
                key={d.slug}
                src={img(HOME_IMAGES.destinations[d.slug] ?? d.image, 900)}
                alt=""
                className={cx(active === i && 'is-active')}
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
