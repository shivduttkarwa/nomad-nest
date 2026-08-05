import { Link } from 'react-router-dom'

import { Btn, Figure, Lines, Reveal } from '@/components/ui'
import { destinations } from '@/data/destinations'
import './OffMap.css'

export function OffMap() {
  const suggestions = destinations.slice(0, 4)

  return (
    <section className="nf">
      <div className="nf__media">
        <Figure
          id="1500530855697-b586d89ba3ee"
          alt="An empty desert road running toward distant hills"
          priority
          parallax={50}
          width={2200}
        />
        <div className="nf__grade" />
      </div>

      <div className="shell nf__inner">
        <Reveal as="span" y={12} className="eyebrow">
          Error 404 — off the map
        </Reveal>

        <Lines
          as="h1"
          className="display d1 nf__title"
          lines={[<>This road does not</>, <>lead <em>anywhere</em>.</>]}
        />

        <Reveal delay={0.25} className="nf__body">
          <p className="lead">
            The page you were after has moved, or never existed. Either way — here are four places that definitely do.
          </p>

          <ul className="nf__links">
            {suggestions.map((d) => (
              <li key={d.slug}>
                <Link to="/destinations">
                  <span className="display d5">{d.name}</span>
                  <span className="mono">{d.country}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Btn to="/" tone="paper" size="lg">
            Back to the beginning
          </Btn>
        </Reveal>
      </div>
    </section>
  )
}
