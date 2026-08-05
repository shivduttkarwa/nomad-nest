import { motion } from 'framer-motion'
import { cx } from '@/lib/utils'
import './Filters.css'

type Props<T extends string> = {
  options: readonly T[]
  value: T | 'all'
  onChange: (v: T | 'all') => void
  allLabel?: string
  layoutId: string
}

export function Filters<T extends string>({ options, value, onChange, allLabel = 'All', layoutId }: Props<T>) {
  const all = ['all', ...options] as const

  return (
    <div className="filters" role="tablist" aria-label="Filter">
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
            {active && (
              <motion.span
                layoutId={layoutId}
                className="filters__pill"
                transition={{ type: 'spring', stiffness: 420, damping: 38 }}
              />
            )}
            <span>{opt === 'all' ? allLabel : opt}</span>
          </button>
        )
      })}
    </div>
  )
}
