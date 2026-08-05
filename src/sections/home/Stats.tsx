import { Counter, Marquee, Reveal } from '@/components/ui'
import { stats } from '@/data/site'
import './Stats.css'

export function Stats() {
  return (
    <section className="stats on-dark">
      <div className="shell">
        <div className="stats__grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stats__cell">
              <span className="stats__value display">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="stats__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <Marquee className="stats__marquee" speed={52} reverse>
        <span className="stats__ribbon mono">
          Slow travel <i>◆</i> Local guides on retainer <i>◆</i> No commissions taken <i>◆</i> Three-night minimums{' '}
          <i>◆</i>
        </span>
      </Marquee>
    </section>
  )
}
