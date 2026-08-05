import { Cta, PageHero } from '@/components/ui'
import { journeys } from '@/data/journeys'
import { Inclusions, JourneyCollection, JourneyMarquee, LeadJourney } from '@/sections/journeys'

export default function Journeys() {
  return (
    <>
      <PageHero
        eyebrow="Journeys"
        index="02"
        lines={[<>Routes written</>, <>to be <em>lived in</em>.</>]}
        lead="Six journeys we have walked, driven and eaten our way through personally. Take one as it stands, or use it as the first draft of something that ends up looking nothing like it."
        meta={[
          { label: 'Journeys', value: String(journeys.length) },
          { label: 'Shortest', value: '9 nights' },
          { label: 'Longest', value: '15 nights' },
        ]}
        image="1476514525535-07fb3b4ae5f1"
        imageAlt="The bow of a wooden rowing boat on a still alpine lake"
      />

      <LeadJourney j={journeys[0]} />

      <JourneyMarquee />

      <JourneyCollection />

      <Inclusions />

      <Cta />
    </>
  )
}
