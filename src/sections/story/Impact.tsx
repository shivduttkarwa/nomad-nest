import { Counter, Lines, Reveal, SectionHead } from '@/components/ui'
import './Impact.css'

const FIGURES = [
  { value: 1.5, suffix: '%', label: 'Of revenue to conservancies and community trusts' },
  { value: 38, suffix: '', label: 'Guides on monthly retainer across sixteen regions' },
  { value: 0, suffix: '', label: 'Commissions taken from any hotel or supplier' },
  { value: 100, suffix: '%', label: 'Of 2020 bookings refunded without conditions' },
]

export function Impact() {
  return (
    <section className="impact section">
      <div className="shell">
        <SectionHead index="04 / 04" eyebrow="Where the money goes">
          <Lines as="h2" className="display d2" lines={[<>We would rather</>, <>show the <em>numbers</em>.</>]} />
        </SectionHead>

        <div className="impact__grid">
          {FIGURES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="impact__cell">
              <span className="impact__value display d2">
                {s.value === 1.5 ? <>1.5%</> : <Counter to={s.value} suffix={s.suffix} />}
              </span>
              <p>{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="impact__note">
          <p>
            We take no commission from any hotel, guide or supplier. Our income is the planning fee and a transparent
            margin stated in your proposal — which means the recommendation you get is the one we would give a friend,
            not the one that pays best.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
