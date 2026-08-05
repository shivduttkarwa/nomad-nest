import { Link } from 'react-router-dom'

import { Cta, Figure, PageHero, Reveal, Tag } from '@/components/ui'
import { journal } from '@/data/site'
import { HOME_IMAGES } from '@/sections/home'
import './JournalIndex.css'

export default function JournalIndex() {
  return (
    <>
      <PageHero
        eyebrow="The dispatch"
        index="05"
        lines={[<>Things worth</>, <>knowing <em>beforehand</em>.</>]}
        lead="Six times a year we write down what we have learned — where the shoulder seasons actually are, why we stopped writing nine-stop itineraries, and what the people who guide for us think about all of it."
        meta={[
          { label: 'Published', value: 'Six times a year' },
          { label: 'Written by', value: 'The six of us' },
          { label: 'Selling', value: 'Nothing' },
        ]}
        image="1490750967868-88aa4486c946"
        imageAlt="A desk with notebooks, a map and a cup of coffee"
      />

      <section className="jindex section--tight">
        <div className="shell">
          <div className="jindex__grid">
            {journal.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/journal/${p.slug}`} className="post" data-cursor="view">
                  <Figure
                    id={HOME_IMAGES.journal[i] ?? p.image}
                    alt={p.title}
                    ratio="16 / 11"
                    className="post__media"
                  />
                  <div className="post__meta">
                    <Tag>{p.kicker}</Tag>
                    <span className="mono">
                      {p.date} · {p.read}
                    </span>
                  </div>
                  <h2 className="display d4">{p.title}</h2>
                  <p>{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  )
}
