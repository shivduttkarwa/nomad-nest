import { useLayoutEffect, useRef } from 'react'

import { useReducedMotion } from '@/hooks'
import { gsap } from '@/lib/gsap'
import { cx } from '@/lib/utils'
import './Filters.css'

type Props<T extends string> = {
  options: readonly T[]
  value: T | 'all'
  onChange: (v: T | 'all') => void
  allLabel?: string
}

export function Filters<T extends string>({ options, value, onChange, allLabel = 'All' }: Props<T>) {
  const listRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const placed = useRef(false)
  const reduced = useReducedMotion()

  const all = ['all', ...options] as const

  useLayoutEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return

    const move = () => {
      const active = list.querySelector<HTMLElement>('.filters__btn.is-active')
      if (!active) return

      const box = {
        x: active.offsetLeft,
        y: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      }

      if (!placed.current || reduced) {
        placed.current = true
        gsap.set(pill, { ...box, autoAlpha: 1 })
        return
      }

      gsap.to(pill, { ...box, duration: 0.5, ease: 'power3.out' })
    }

    move()
    window.addEventListener('resize', move)
    return () => window.removeEventListener('resize', move)
  }, [value, options, reduced])

  return (
    <div ref={listRef} className="filters" role="tablist" aria-label="Filter">
      <span ref={pillRef} className="filters__pill" aria-hidden="true" />
      {all.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            className={cx('filters__btn', active && 'is-active')}
            onClick={() => onChange(opt as T | 'all')}
          >
            <span>{opt === 'all' ? allLabel : opt}</span>
          </button>
        )
      })}
    </div>
  )
}
