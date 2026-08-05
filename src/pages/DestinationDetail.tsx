import { Navigate, useParams } from 'react-router-dom'

import { Cta } from '@/components/ui'
import { destinations } from '@/data/destinations'
import { journeys } from '@/data/journeys'
import { DetailHero, DetailNotes, LinkedCards } from '@/sections/detail'
import { money } from '@/lib/utils'

export default function DestinationDetail() {
  const { slug } = useParams()
  const d = destinations.find((item) => item.slug === slug)

  if (!d) return <Navigate to="/destinations" replace />

  const visiting = journeys.filter((j) => j.destinations.includes(d.slug))

  return (
    <>
      <DetailHero
        back={{ to: '/destinations', label: 'All destinations' }}
        eyebrow={d.region}
        title={d.name}
        lead={d.tagline}
        meta={[
          { label: 'Country', value: d.country },
          { label: 'Best window', value: d.season },
          { label: 'Typical stay', value: `${d.nights} nights` },
          { label: 'From', value: `${money(d.from)} pp` },
        ]}
        image={d.image}
        imageAlt={`${d.name}, ${d.country}`}
      />

      <DetailNotes
        eyebrow="Why we go"
        paragraphs={[d.excerpt]}
        tags={d.tags}
        aside={
          <dl>
            <div>
              <dt className="mono">Coordinates</dt>
              <dd>{d.coords}</dd>
            </div>
            <div>
              <dt className="mono">Region</dt>
              <dd>{d.region}</dd>
            </div>
            <div>
              <dt className="mono">Journeys that go here</dt>
              <dd>{visiting.length || 'None set — we would write one'}</dd>
            </div>
          </dl>
        }
      />

      <LinkedCards
        index="01 / 01"
        eyebrow="Journeys that go here"
        lines={[<>Written routes</>, <>through <em>{d.name}</em>.</>]}
        items={visiting.map((j) => ({
          to: `/journeys/${j.slug}`,
          kicker: j.index,
          title: j.title,
          meta: `${j.nights} nights · ${j.pace} · from ${money(j.from)}`,
          image: j.image,
        }))}
        empty={{
          title: 'No set journey here yet.',
          note: `We have written ${d.name} into private trips many times — tell us when you want to go and we will draft one.`,
        }}
      />

      <Cta />
    </>
  )
}
