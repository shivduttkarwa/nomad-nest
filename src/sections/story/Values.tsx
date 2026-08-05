import { Lines, Reveal, SectionHead } from '@/components/ui'
import { values } from '@/data/site'
import './Values.css'

export function Values() {
  return (
    <section className="values section">
      <div className="shell">
        <SectionHead index="01 / 04" eyebrow="What we hold to">
          <Lines as="h2" className="display d2" lines={[<>Four rules we</>, <>have never <em>bent</em>.</>]} />
        </SectionHead>

        <div className="values__grid">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.07} className="values__cell">
              <span className="values__n mono">{v.n}</span>
              <h3 className="display d4">{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
