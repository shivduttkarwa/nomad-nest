import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, socials, studios } from '@/data/site'
import { destinations } from '@/data/destinations'
import { cx, img } from '@/lib/utils'
import { useLocalTime } from '@/hooks'
import { useLenisLock } from '@/components/system/SmoothScroll'
import { Wordmark } from './Wordmark'
import './Menu.css'

const PREVIEWS = ['kyoto', 'dolomites', 'serengeti', 'santorini'].map(
  (slug) => destinations.find((d) => d.slug === slug)!,
)

const EASE = [0.76, 0, 0.24, 1] as const

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
  useLenisLock(open)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.85, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
        >
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
                      <motion.div
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%', transition: { duration: 0.35, ease: EASE } }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.22 + i * 0.07 }}
                      >
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
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.aside
                className="menu__side"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
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
              </motion.aside>
            </div>

            <div className="menu__previews" aria-hidden="true">
              {PREVIEWS.map((d, i) => (
                <div key={d.slug} className={cx('menu__preview', hover === i && 'is-active')}>
                  <img src={img(d.image, 900)} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
