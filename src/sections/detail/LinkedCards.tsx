import { Link } from 'react-router-dom'

import { EmptyState, Figure, Lines, Reveal, SectionHead } from '@/components/ui'
import './LinkedCards.css'

export type LinkedCard = {
  to: string
  kicker: string
  title: string
  meta: string
  image: string
}

type Props = {
  index: string
  eyebrow: string
  lines: React.ReactNode[]
  items: LinkedCard[]
  empty?: { title: string; note: string }
}

export function LinkedCards({ index, eyebrow, lines, items, empty }: Props) {
  return (
    <section className="lcards section">
      <div className="shell">
        <SectionHead index={index} eyebrow={eyebrow}>
          <Lines as="h2" className="display d2" lines={lines} />
        </SectionHead>

        {items.length > 0 ? (
          <div className="lcards__grid">
            {items.map((item, i) => (
              <Reveal key={item.to} delay={i * 0.08}>
                <Link to={item.to} className="lcard" data-cursor="view">
                  <div className="lcard__media">
                    <Figure id={item.image} alt={item.title} ratio="4 / 5" depth={0.1 + (i % 3) * 0.05} />
                    <span className="lcard__kicker mono">{item.kicker}</span>
                  </div>
                  <h3 className="display d4">{item.title}</h3>
                  <p className="lcard__meta mono">{item.meta}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          empty && <EmptyState title={empty.title} note={empty.note} />
        )}
      </div>
    </section>
  )
}
