import { useRef, type ElementType, type ReactNode } from 'react'

import { useDrift } from './Motion'
import './Parallax.css'

type Props = {
  children: ReactNode
  /** Pixels travelled either side of centre. Negative moves against the scroll. */
  distance?: number
  className?: string
  as?: ElementType
}

export function Parallax({ children, distance = 70, className, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  useDrift(ref, ref, distance)

  return (
    <Tag ref={ref} className={className} data-parallax="">
      {children}
    </Tag>
  )
}
