import { Link, Navigate, useParams } from 'react-router-dom'

import { Cta, Reveal } from '@/components/ui'
import { journal } from '@/data/site'
import { HOME_IMAGES } from '@/sections/home'
import { DetailHero } from '@/sections/detail'
import './JournalPost.css'

export default function JournalPost() {
  const { slug } = useParams()
  const index = journal.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/journal" replace />

  const post = journal[index]
  const next = journal[(index + 1) % journal.length]

  return (
    <>
      <DetailHero
        back={{ to: '/journal', label: 'The dispatch' }}
        eyebrow={post.kicker}
        title={post.title}
        lead={post.text}
        meta={[
          { label: 'Published', value: post.date },
          { label: 'Reading time', value: post.read },
        ]}
        image={HOME_IMAGES.journal[index] ?? post.image}
        imageAlt={post.title}
      />

      <article className="jpost section--tight">
        <div className="shell jpost__inner">
          {post.body.map((para, i) => (
            <Reveal key={para} delay={Math.min(i, 4) * 0.05}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </article>

      <section className="jpost__next section--tight">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Read next</span>
            <Link to={`/journal/${next.slug}`} className="jpost__nextlink">
              <span className="display d3">{next.title}</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M4 20L20 4M20 4H8M20 4v12" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  )
}
