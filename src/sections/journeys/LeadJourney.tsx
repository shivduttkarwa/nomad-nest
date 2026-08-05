import { ArrowLink, Btn, Figure, Lines, Reveal } from '@/components/ui'
import type { Journey } from '@/data/journeys'
import { money } from '@/lib/utils'
import './LeadJourney.css'

export function LeadJourney({ j }: { j: Journey }) {
  return (
    <section className="jlead section--tight">
      <div className="shell jlead__inner">
        <Reveal className="jlead__media">
          <Figure id={j.image} alt={j.title} ratio="4 / 5" parallax={40} />
          <span className="jlead__badge mono">Most requested</span>
        </Reveal>

        <div className="jlead__body">
          <Reveal as="span" y={12} className="eyebrow">
            Journey {j.index}
          </Reveal>

          <Lines as="h2" className="display d2 jlead__title" lines={[j.title]} />
          <Reveal delay={0.12}>
            <p className="jlead__sub">{j.subtitle}</p>
            <p className="lead">{j.summary}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="jlead__facts">
              <div>
                <dt className="mono">Duration</dt>
                <dd>{j.nights} nights</dd>
              </div>
              <div>
                <dt className="mono">Pace</dt>
                <dd>{j.pace}</dd>
              </div>
              <div>
                <dt className="mono">Party</dt>
                <dd>{j.party}</dd>
              </div>
              <div>
                <dt className="mono">From</dt>
                <dd>{money(j.from)} pp</dd>
              </div>
            </dl>

            <ul className="jlead__highlights">
              {j.highlights.slice(0, 4).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="jlead__actions">
              <Btn to="/contact">Enquire about this journey</Btn>
              <ArrowLink href="#journeys">See all six</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
