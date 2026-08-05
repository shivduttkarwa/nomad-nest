import { Lines, Reveal, SectionHead } from '@/components/ui'
import { team } from '@/data/site'
import { pad } from '@/lib/utils'
import './Team.css'

export function Team() {
  return (
    <section className="team section">
      <div className="shell">
        <SectionHead
          index="03 / 04"
          eyebrow="The studio"
          aside={<p className="team__note">Six people. Everyone here writes journeys; nobody here sells them.</p>}
        >
          <Lines as="h2" className="display d2" lines={[<>You will deal</>, <>with a <em>person</em>.</>]} />
        </SectionHead>

        <ul className="team__grid">
          {team.map((m, i) => {
            const initials = m.name
              .split(' ')
              .map((p) => p[0])
              .join('')
            return (
              <Reveal as="li" key={m.name} delay={i * 0.05} className="team__cell">
                <span className="team__monogram display" aria-hidden="true">
                  {initials}
                </span>
                <div className="team__info">
                  <h3 className="display d5">{m.name}</h3>
                  <p className="team__role">{m.role}</p>
                  <p className="mono team__meta">
                    {m.base} · since {m.since}
                  </p>
                </div>
                <span className="team__num mono">{pad(i + 1)}</span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
