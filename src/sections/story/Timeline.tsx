import { Lines, Reveal, SectionHead } from '@/components/ui'
import { timeline } from '@/data/site'
import './Timeline.css'

export function Timeline() {
  return (
    <section className="timeline section on-dark">
      <div className="shell">
        <SectionHead index="02 / 04" eyebrow="How we got here">
          <Lines as="h2" className="display d2" lines={[<>Fourteen years,</>, <>abbreviated.</>]} />
        </SectionHead>

        <ol className="timeline__list">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.05} className="timeline__item">
              <span className="timeline__year display d3">{t.year}</span>
              <div className="timeline__body">
                <h3 className="display d5">{t.title}</h3>
                <p>{t.text}</p>
              </div>
              <span className="timeline__dot" aria-hidden="true" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
