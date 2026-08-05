import { Link } from 'react-router-dom'

import { ArrowLink, Figure, Lines, Reveal, SectionHead, Tag } from '@/components/ui'
import { journal } from '@/data/site'
import { HOME_IMAGES } from './images'
import './Journal.css'

export function Journal() {
  return (
    <section className="journal section">
      <div className="shell">
        <SectionHead
          index="04 / 04"
          eyebrow="The dispatch"
          aside={<ArrowLink to="/journal">Read the journal</ArrowLink>}
        >
          <Lines as="h2" className="display d2" lines={[<>Things worth</>, <>knowing <em>beforehand</em>.</>]} />
        </SectionHead>

        <div className="journal__grid">
          {journal.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/journal/${p.slug}`} className="post" data-cursor="view">
                <Figure id={HOME_IMAGES.journal[i] ?? p.image} alt={p.title} ratio="16 / 11" className="post__media" />
                <div className="post__meta">
                  <Tag>{p.kicker}</Tag>
                  <span className="mono">
                    {p.date} · {p.read}
                  </span>
                </div>
                <h3 className="display d4">{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
