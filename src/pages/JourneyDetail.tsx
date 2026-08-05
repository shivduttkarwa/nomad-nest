import { Navigate, useParams } from 'react-router-dom'

import { Cta } from '@/components/ui'
import { destinations } from '@/data/destinations'
import { journeys } from '@/data/journeys'
import { DetailHero, DetailNotes, Itinerary, LinkedCards } from '@/sections/detail'
import { money } from '@/lib/utils'

export default function JourneyDetail() {
  const { slug } = useParams()
  const j = journeys.find((item) => item.slug === slug)

  if (!j) return <Navigate to="/journeys" replace />

  const stops = j.destinations
    .map((s) => destinations.find((d) => d.slug === s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))

  return (
    <>
      <DetailHero
        back={{ to: '/journeys', label: 'All journeys' }}
        eyebrow={`Journey ${j.index}`}
        title={j.title}
        lead={j.summary}
        meta={[
          { label: 'Duration', value: `${j.nights} nights` },
          { label: 'Pace', value: j.pace },
          { label: 'Party', value: j.party },
          { label: 'From', value: `${money(j.from)} pp` },
        ]}
        image={j.image}
        imageAlt={j.title}
      />

      <DetailNotes
        eyebrow="The shape of it"
        paragraphs={[j.subtitle, j.summary]}
        aside={
          <dl>
            <div>
              <dt className="mono">Where</dt>
              <dd>{j.places}</dd>
            </div>
            <div>
              <dt className="mono">Nights</dt>
              <dd>{j.nights}</dd>
            </div>
            <div>
              <dt className="mono">Planning fee</dt>
              <dd>$600, credited in full</dd>
            </div>
          </dl>
        }
      />

      <Itinerary j={j} />

      <LinkedCards
        index="03 / 03"
        eyebrow="Where it goes"
        lines={[<>The places on</>, <>this <em>route</em>.</>]}
        items={stops.map((d) => ({
          to: `/destinations/${d.slug}`,
          kicker: d.country,
          title: d.name,
          meta: `${d.season} · ${d.nights} nights · from ${money(d.from)}`,
          image: d.image,
        }))}
      />

      <Cta />
    </>
  )
}
