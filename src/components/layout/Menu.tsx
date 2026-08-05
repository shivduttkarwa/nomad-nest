import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { nav, socials, studios } from '@/data/site'
import { destinations } from '@/data/destinations'
import { cx, img } from '@/lib/utils'
import { EASE_IN_OUT, gsap } from '@/lib/gsap'
import { useLocalTime, useReducedMotion } from '@/hooks'
import { useLenisLock } from '@/components/system/SmoothScroll'
import { Wordmark } from './Wordmark'
import './Menu.css'

const PREVIEWS = ['kyoto', 'dolomites', 'serengeti', 'santorini'].map(
  (slug) => destinations.find((d) => d.slug === slug)!,
)

const SHUT = 'inset(0% 0% 100% 0%)'
const OPEN = 'inset(0% 0% 0% 0%)'

function StudioClock({ tz, city, label }: { tz: string; city: string; label: string }) {
  const time = useLocalTime(tz)
  return (
    <li className="menu__studio">
      <span>{city}</span>
      <span className="mono">
        {time} {label}
      </span>
    </li>
  )
}

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hover, setHover] = useState<number | null>(null)
  const [mounted, setMounted] = useState(open)
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useLenisLock(open)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el || !mounted) return

    if (reduced) {
      if (!open) setMounted(false)
      return
    }

    const links = el.querySelectorAll('.menu__reveal')
    const side = el.querySelector('.menu__side')

    const tl = open
      ? gsap
          .timeline()
          .fromTo(el, { clipPath: SHUT }, { clipPath: OPEN, duration: 0.85, ease: EASE_IN_OUT })
          .fromTo(
            links,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, ease: EASE_IN_OUT, stagger: 0.07 },
            0.22,
          )
          .fromTo(side, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5)
      : gsap
          .timeline({ onComplete: () => setMounted(false) })
          .to(links, { yPercent: 110, duration: 0.35, ease: EASE_IN_OUT })
          .to(el, { clipPath: SHUT, duration: 0.55, ease: EASE_IN_OUT }, 0.1)

    return () => {
      tl.kill()
    }
  }, [open, mounted, reduced])

  if (!mounted) return null

  return (
    <div ref={rootRef} className="menu" role="dialog" aria-modal="true" aria-label="Site index">
      <div className="menu__canvas">
        <div className="menu__bar shell">
          <Wordmark onClick={onClose} />
          <button type="button" className="menu__close" onClick={onClose}>
            <span className="menu__close-label mono">Close</span>
            <span className="menu__close-x" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div className="menu__grid shell">
          <nav className="menu__nav" aria-label="Primary">
            <ul>
              {nav.map((item, i) => (
                <li key={item.to}>
                  <div className="menu__reveal">
                    <Link
                      to={item.to}
                      className="menu__link display"
                      onClick={onClose}
                      onPointerEnter={() => setHover(i)}
                      onPointerLeave={() => setHover(null)}
                    >
                      <span className="menu__link-index mono">{item.index}</span>
                      <span className="menu__link-text">{item.label}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="menu__side">
            <div className="menu__block">
              <h2 className="eyebrow">Studios</h2>
              <ul className="menu__studios">
                {studios.map((s) => (
                  <StudioClock key={s.city} tz={s.tz} city={s.city} label={s.tzLabel} />
                ))}
              </ul>
            </div>

            <div className="menu__block">
              <h2 className="eyebrow">Elsewhere</h2>
              <ul className="menu__socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="menu__previews" aria-hidden="true">
          {PREVIEWS.map((d, i) => (
            <div key={d.slug} className={cx('menu__preview', hover === i && 'is-active')}>
              <img src={img(d.image, 900)} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
