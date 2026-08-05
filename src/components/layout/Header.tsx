import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { nav } from '@/data/site'
import { cx } from '@/lib/utils'
import { Btn } from '@/components/ui/Btn'
import { Wordmark } from './Wordmark'
import { Menu } from './Menu'
import './Header.css'

export function Header() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const overDark = pathname === '/' || !nav.some((n) => n.to === pathname)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 64)
    setHidden(y > 420 && y > prev && !menuOpen)
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={cx(
          'header',
          solid && 'is-solid',
          hidden && 'is-hidden',
          menuOpen && 'is-over-menu',
          overDark && !solid && 'is-light',
        )}
      >
        <div className="header__inner shell">
          <Wordmark className="header__brand" />

          <nav className="header__nav" aria-label="Primary">
            {nav.slice(0, 3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cx('header__link', isActive && 'is-active')}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <Btn to="/contact" size="md" variant="outline" className="header__cta">
              Plan a trip
            </Btn>

            <button
              type="button"
              className={cx('header__toggle', menuOpen && 'is-open')}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close index' : 'Open index'}
            >
              <span className="header__toggle-label mono">{menuOpen ? 'Close' : 'Index'}</span>
              <span className="header__toggle-bars" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
