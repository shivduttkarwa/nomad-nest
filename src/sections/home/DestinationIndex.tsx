import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowLink, Lines, SectionHead } from '@/components/ui'
import { destinations, featuredDestinations } from '@/data/destinations'
import { useIsDesktop, useReducedMotion } from '@/hooks'
import { EASE_OUT, gsap } from '@/lib/gsap'
import { cx, img, money, pad } from '@/lib/utils'
import { HOME_IMAGES } from './images'
import './DestinationIndex.css'

export function DestinationIndex() {
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const setRotate = useRef<((v: number) => void) | null>(null)

  const pointer = useRef<{ x: number; y: number } | null>(null)
  const lastActive = useRef<number | null>(null)
  const [active, setActive] = useState<number | null>(null)

  const rows = featuredDestinations.slice(0, 5)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE_OUT,
          stagger: 0.08,
          scrollTrigger: { trigger: list, start: 'top 82%', once: true },
        },
      )
    }, list)

    return () => ctx.revert()
  }, [reduced])

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

  const place = useCallback((clientX: number, clientY: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    const x = clientX - r.left - r.width / 2
    const y = clientY - r.top - r.height / 2
    setX.current?.(x)
    setY.current?.(y)
    setRotate.current?.(gsap.utils.clamp(-7, 7, (x / 400) * 7))
  }, [])

  const resolve = useCallback((clientX: number, clientY: number) => {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null
    const row = el?.closest<HTMLElement>('.dindex__row')
    if (!row) {
      setActive(null)
      return
    }
    const i = Number(row.dataset.index)
    setActive(Number.isNaN(i) ? null : i)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const sync = () => {
      const p = pointer.current
      const wrap = wrapRef.current
      if (!p || !wrap) return

      const r = wrap.getBoundingClientRect()
      const inside = p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom

      if (!inside) {
        setActive(null)
        return
      }

      place(p.x, p.y)
      resolve(p.x, p.y)
    }

    const onPointer = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
      sync()
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', sync, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', sync)
    }
  }, [isDesktop, place, resolve])

  useLayoutEffect(() => {
    const wrap = previewRef.current
    if (!wrap || !isDesktop) return

    const shots = Array.from(wrap.querySelectorAll('img'))
    const from = lastActive.current
    const to = active
    lastActive.current = active

    if (to === null) {
      gsap.to(wrap, { autoAlpha: 0, scale: 0.94, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
      return
    }

    const dir = from === null || from === to ? 1 : Math.sign(to - from)

    gsap.to(wrap, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })

    shots.forEach((shot, i) => {
      if (i === to) {
        gsap.fromTo(
          shot,
          { autoAlpha: 0, yPercent: 14 * dir, scale: 1.14 },
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.8, ease: EASE_OUT, overwrite: true },
        )
      } else if (i === from) {
        gsap.to(shot, {
          autoAlpha: 0,
          yPercent: -12 * dir,
          scale: 1.06,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: true,
        })
      } else {
        gsap.set(shot, { autoAlpha: 0, yPercent: 0, scale: 1.06 })
      }
    })
  }, [active, isDesktop])

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

      <div className="dindex__wrap shell" ref={wrapRef}>
        <ul className="dindex__list" ref={listRef}>
          {rows.map((d, i) => (
            <li key={d.slug}>
              <Link
                to={`/destinations/${d.slug}`}
                className={cx('dindex__row', active !== null && active !== i && 'is-dim')}
                data-index={i}
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
            {rows.map((d) => (
              <img
                key={d.slug}
                src={img(HOME_IMAGES.destinations[d.slug] ?? d.image, 900)}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
