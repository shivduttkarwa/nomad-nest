import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'
import { Reveal } from './Motion'
import './SectionHead.css'

type Props = {
  index?: string
  eyebrow?: string
  children: ReactNode
  aside?: ReactNode
  className?: string
}

export function SectionHead({ index, eyebrow, children, aside, className }: Props) {
  return (
    <div className={cx('sechead', className)}>
      <div className="sechead__top">
        {eyebrow && (
          <Reveal as="span" y={12} className="eyebrow">
            {eyebrow}
          </Reveal>
        )}
        {index && <span className="sechead__index mono">{index}</span>}
      </div>
      <div className="sechead__body">
        <div className="sechead__title">{children}</div>
        {aside && <div className="sechead__aside">{aside}</div>}
      </div>
    </div>
  )
}
