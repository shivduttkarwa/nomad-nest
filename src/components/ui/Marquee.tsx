import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'
import './Marquee.css'

type Props = {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  repeat?: number
}

export function Marquee({ children, speed = 34, reverse = false, className, repeat = 4 }: Props) {
  return (
    <div className={cx('marquee', className)} aria-hidden="true">
      <div
        className={cx('marquee__track', reverse && 'marquee__track--reverse')}
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: repeat * 2 }, (_, i) => (
          <div className="marquee__group" key={i}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
