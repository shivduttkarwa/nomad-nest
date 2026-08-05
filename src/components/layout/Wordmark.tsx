import { Link } from 'react-router-dom'
import { cx } from '@/lib/utils'
import './Wordmark.css'

export function Wordmark({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" className={cx('wordmark', className)} onClick={onClick} aria-label="Nomad and Nest — home">
      <span className="wordmark__mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" width="20" height="20" fill="none">
          <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.1" />
          <path d="M14 1.5c4 5 4 20 0 25M14 1.5c-4 5-4 20 0 25M1.6 10.5h24.8M1.6 17.5h24.8" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
        </svg>
      </span>
      <span className="wordmark__text display">
        Nomad <em>&amp;</em> Nest
      </span>
    </Link>
  )
}
