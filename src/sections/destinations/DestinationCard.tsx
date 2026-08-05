import { Figure, Tag } from '@/components/ui'
import type { Destination } from '@/data/destinations'
import { cx, money } from '@/lib/utils'
import './DestinationCard.css'

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <article className={cx('dcard', d.orientation === 'portrait' && 'dcard--tall')}>
      <a href="#" className="dcard__link" data-cursor="view">
        <div className="dcard__media">
          <Figure
            id={d.image}
            alt={`${d.name}, ${d.country}`}
            ratio={d.orientation === 'portrait' ? '3 / 4' : '5 / 4'}
          />
          <span className="dcard__coords mono">{d.coords}</span>
        </div>

        <div className="dcard__head">
          <h3 className="display d4">{d.name}</h3>
          <span className="dcard__country mono">{d.country}</span>
        </div>

        <p className="dcard__tagline">{d.tagline}</p>
        <p className="dcard__excerpt">{d.excerpt}</p>

        <div className="dcard__tags">
          {d.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="dcard__foot">
          <span className="mono">{d.season}</span>
          <span className="mono">
            {d.nights} nights · from {money(d.from)}
          </span>
        </div>
      </a>
    </article>
  )
}
