import { ArrowLink, Btn, Collapse, Figure, Tag } from '@/components/ui'
import type { Journey } from '@/data/journeys'
import { cx, money } from '@/lib/utils'
import './JourneyRow.css'

type Props = {
  j: Journey
  open: boolean
  onToggle: () => void
}

export function JourneyRow({ j, open, onToggle }: Props) {
  return (
    <article className={cx('jrow', open && 'is-open')}>
      <button type="button" className="jrow__head" onClick={onToggle} aria-expanded={open}>
        <span className="jrow__index mono">{j.index}</span>

        <span className="jrow__titles">
          <span className="jrow__title display d3">{j.title}</span>
          <span className="jrow__sub">{j.subtitle}</span>
        </span>

        <span className="jrow__facts">
          <span className="mono">{j.places}</span>
          <span className="mono">{j.nights} nights</span>
          <span className="mono">{j.pace}</span>
          <span className="mono">from {money(j.from)}</span>
        </span>

        <span className="jrow__sign" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <Collapse open={open} className="jrow__panel">
        <div className="jrow__grid">
          <div className="jrow__left">
            <Figure id={j.image} alt={j.title} ratio="4 / 3" className="jrow__figure" />
            <p className="jrow__summary lead">{j.summary}</p>

            <h4 className="eyebrow">Highlights</h4>
            <ul className="jrow__highlights">
              {j.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="jrow__tags">
              <Tag>{j.pace} pace</Tag>
              <Tag>{j.party}</Tag>
              <Tag>{j.nights} nights</Tag>
            </div>
          </div>

          <div className="jrow__right">
            <h4 className="eyebrow">The route</h4>
            <ol className="jrow__days">
              {j.days.map((d) => (
                <li key={d.span}>
                  <span className="jrow__span mono">{d.span}</span>
                  <div>
                    <h5 className="display d5">{d.title}</h5>
                    <p>{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h4 className="eyebrow">What is included</h4>
            <ul className="jrow__includes">
              {j.includes.map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>

            <div className="jrow__cta">
              <Btn to={`/journeys/${j.slug}`}>Read the full journey</Btn>
              <ArrowLink to="/contact">Enquire — {j.title}</ArrowLink>
              <span className="mono">Planning fee $600, credited in full</span>
            </div>
          </div>
        </div>
      </Collapse>
    </article>
  )
}
