import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { nav, site, socials, studios } from '@/data/site'
import { useLocalTime } from '@/hooks'
import { Reveal } from '@/components/ui/Motion'
import './Footer.css'

function Clock({ tz, label }: { tz: string; label: string }) {
  const time = useLocalTime(tz)
  return (
    <span className="mono">
      {time} {label}
    </span>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
    setEmail('')
  }

  return (
    <form className="footer__news" onSubmit={submit}>
      <label htmlFor="footer-email" className="eyebrow">
        The dispatch — six times a year
      </label>

      <div className="footer__newsrow">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          aria-label="Email address"
          required
        />
        <button type="submit" aria-label="Subscribe">
          <svg viewBox="0 0 20 12" width="22" height="14" fill="none">
            <path d="M0 6h17M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      <p className={`footer__newsnote ${done ? 'is-done' : ''}`}>
        {done ? 'Thank you — the next dispatch is in three weeks.' : 'Field notes, shoulder-season windows, no selling.'}
      </p>
    </form>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer on-dark">
      <div className="shell">
        <div className="footer__top">
          <Reveal className="footer__statement">
            <p className="display d3">
              Still deciding? That is <em>usually</em> the best moment to talk to us.
            </p>
            <Link to="/contact" className="footer__bigcta">
              <span>Start a conversation</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M4 20L20 4M20 4H8M20 4v12" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </Reveal>

          <Newsletter />
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h2 className="eyebrow">Index</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="eyebrow">Studios</h2>
            <ul>
              {studios.map((s) => (
                <li key={s.city} className="footer__studio">
                  <span>
                    {s.city}, {s.country}
                  </span>
                  <Clock tz={s.tz} label={s.tzLabel} />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="eyebrow">Elsewhere</h2>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="eyebrow">Direct</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li className="muted">Mon – Fri, 9am – 6pm AEST</li>
            </ul>
          </div>
        </div>

        <Reveal y={40} amount={0.4} className="footer__wordmark">
          <span className="display" aria-hidden="true">
            Nomad <em>&amp;</em> Nest
          </span>
        </Reveal>

        <div className="footer__legal">
          <span>
            © {year} {site.name} Pty Ltd. ATAS accredited A10482.
          </span>
          <span className="footer__legal-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Booking conditions</a>
          </span>
          <span className="mono">Designed in Fitzroy</span>
        </div>
      </div>
    </footer>
  )
}
