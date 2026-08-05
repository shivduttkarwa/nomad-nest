import { Btn, Lines, Reveal, SectionHead } from '@/components/ui'
import type { Journey } from '@/data/journeys'
import './Itinerary.css'

export function Itinerary({ j }: { j: Journey }) {
  return (
    <section className="itin section">
      <div className="shell">
        <SectionHead index="02 / 03" eyebrow="The route">
          <Lines as="h2" className="display d2" lines={[<>Day by day,</>, <>as we would <em>write</em> it.</>]} />
        </SectionHead>

        <ol className="itin__days">
          {j.days.map((d, i) => (
            <Reveal as="li" key={d.span} delay={i * 0.05} className="itin__day">
              <span className="itin__span mono">{d.span}</span>
              <div className="itin__body">
                <h3 className="display d4">{d.title}</h3>
                <p>{d.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="itin__grid">
          <Reveal className="itin__block">
            <h3 className="eyebrow">Highlights</h3>
            <ul className="itin__list">
              {j.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="itin__block">
            <h3 className="eyebrow">What is included</h3>
            <ul className="itin__list itin__list--dash">
              {j.includes.map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="itin__cta">
          <Btn to="/contact">Enquire about {j.title}</Btn>
          <span className="mono">Planning fee $600, credited in full</span>
        </Reveal>
      </div>
    </section>
  )
}
