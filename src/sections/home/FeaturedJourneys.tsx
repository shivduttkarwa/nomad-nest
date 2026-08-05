import { Link } from 'react-router-dom'

import { ArrowLink, Figure, Lines, Reveal, SectionHead } from '@/components/ui'
import { featuredJourneys } from '@/data/journeys'
import { cx, money } from '@/lib/utils'
import { HOME_IMAGES } from './images'
import './FeaturedJourneys.css'

export function FeaturedJourneys() {
  return (
    <section className="fjourneys section">
      <div className="shell">
        <SectionHead
          index="02 / 04"
          eyebrow="Written journeys"
          aside={<ArrowLink to="/journeys">Every journey</ArrowLink>}
        >
          <Lines as="h2" className="display d2" lines={[<>Six routes we have</>, <>walked <em>ourselves</em>.</>]} />
        </SectionHead>

        <div className="fjourneys__grid">
          {featuredJourneys.map((j, i) => (
            <Reveal key={j.slug} delay={i * 0.09} className={cx('fjourneys__cell', `fjourneys__cell--${i}`)}>
              <Link to="/journeys" className="jcard" data-cursor="view">
                <div className="jcard__media">
                  <Figure
                    id={HOME_IMAGES.journeys[j.slug] ?? j.image}
                    alt={j.title}
                    ratio={i === 1 ? '3 / 4' : '4 / 5'}
                  />
                  <span className="jcard__index mono">{j.index}</span>
                </div>

                <div className="jcard__body">
                  <h3 className="display d4">{j.title}</h3>
                  <p className="jcard__sub">{j.subtitle}</p>

                  <div className="jcard__meta">
                    <span className="mono">{j.nights} nights</span>
                    <span className="mono">{j.pace}</span>
                    <span className="mono">from {money(j.from)}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
