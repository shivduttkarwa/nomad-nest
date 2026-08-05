import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '@/lib/utils'
import './Btn.css'

type Common = {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  tone?: 'ink' | 'paper' | 'accent'
  size?: 'md' | 'lg'
  className?: string
  full?: boolean
}

type Props = Common & {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Btn({
  children,
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  variant = 'solid',
  tone = 'ink',
  size = 'md',
  className,
  full,
}: Props) {
  const cls = cx('btn', `btn--${variant}`, `btn--${tone}`, `btn--${size}`, full && 'btn--full', className)

  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow" aria-hidden="true">
        <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
    </>
  )

  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )

  if (href)
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {inner}
      </a>
    )

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  )
}

export function ArrowLink({
  children,
  to,
  href,
  className,
  onClick,
}: {
  children: ReactNode
  to?: string
  href?: string
  className?: string
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="arrowlink__text">{children}</span>
      <svg className="arrowlink__icon" viewBox="0 0 16 10" width="16" height="10" fill="none" aria-hidden="true">
        <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </>
  )

  if (to)
    return (
      <Link to={to} className={cx('arrowlink', className)} onClick={onClick}>
        {content}
      </Link>
    )

  return (
    <a href={href ?? '#'} className={cx('arrowlink', className)} onClick={onClick}>
      {content}
    </a>
  )
}
