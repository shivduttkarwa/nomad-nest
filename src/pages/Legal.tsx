import { Link, Navigate, useParams } from 'react-router-dom'

import { Cta, Lines, Reveal } from '@/components/ui'
import { legal } from '@/data/legal'
import './Legal.css'

export default function Legal() {
  const { slug } = useParams()
  const doc = legal.find((d) => d.slug === slug)

  if (!doc) return <Navigate to="/" replace />

  return (
    <>
      <header className="legal__head">
        <div className="shell">
          <div className="legal__top">
            <Reveal as="span" y={12} className="eyebrow">
              Legal
            </Reveal>
            <span className="legal__updated mono">{doc.updated}</span>
          </div>

          <Lines as="h1" className="display d1 legal__title" lines={[doc.title]} delay={0.15} />

          <Reveal delay={0.3} className="legal__intro">
            <p className="lead">{doc.intro}</p>
          </Reveal>
        </div>
      </header>

      <section className="legal section--tight">
        <div className="shell legal__inner">
          {doc.sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i, 4) * 0.06} className="legal__block">
              <h2 className="display d4">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          ))}

          <Reveal className="legal__nav">
            <span className="eyebrow">The other documents</span>
            <ul>
              {legal
                .filter((d) => d.slug !== doc.slug)
                .map((d) => (
                  <li key={d.slug}>
                    <Link to={`/legal/${d.slug}`}>{d.title}</Link>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  )
}
