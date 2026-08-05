import { Filters } from '@/components/ui'
import { REGIONS, type Region } from '@/data/destinations'
import { cx, pad } from '@/lib/utils'
import { SORTS, type Sort, type View } from './types'
import './FilterBar.css'

type Props = {
  region: Region | 'all'
  onRegionChange: (region: Region | 'all') => void
  sort: Sort
  onSortChange: (sort: Sort) => void
  view: View
  onViewChange: (view: View) => void
  count: number
}

export function FilterBar({
  region,
  onRegionChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  count,
}: Props) {
  return (
    <div className="dbar">
      <div className="shell dbar__inner">
        <Filters
          options={REGIONS}
          value={region}
          onChange={onRegionChange}
          allLabel="Everywhere"
        />

        <div className="dbar__right">
          <label className="dbar__sort">
            <span className="mono">Sort</span>
            <select value={sort} onChange={(e) => onSortChange(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </label>

          <div className="dbar__view" role="group" aria-label="Layout">
            <button
              type="button"
              className={cx(view === 'grid' && 'is-active')}
              onClick={() => onViewChange('grid')}
              aria-pressed={view === 'grid'}
            >
              <svg viewBox="0 0 14 14" width="13" height="13" fill="currentColor" aria-hidden="true">
                <rect x="0" y="0" width="6" height="6" />
                <rect x="8" y="0" width="6" height="6" />
                <rect x="0" y="8" width="6" height="6" />
                <rect x="8" y="8" width="6" height="6" />
              </svg>
              <span className="sr-only">Grid</span>
            </button>
            <button
              type="button"
              className={cx(view === 'index' && 'is-active')}
              onClick={() => onViewChange('index')}
              aria-pressed={view === 'index'}
            >
              <svg viewBox="0 0 14 14" width="13" height="13" fill="currentColor" aria-hidden="true">
                <rect x="0" y="1" width="14" height="1.6" />
                <rect x="0" y="6.2" width="14" height="1.6" />
                <rect x="0" y="11.4" width="14" height="1.6" />
              </svg>
              <span className="sr-only">Index</span>
            </button>
          </div>

          <span className="dbar__count mono">
            {pad(count)} {count === 1 ? 'place' : 'places'}
          </span>
        </div>
      </div>
    </div>
  )
}
