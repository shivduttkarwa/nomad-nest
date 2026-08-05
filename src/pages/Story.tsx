import { Cta, PageHero } from '@/components/ui'
import { Impact, Opening, Press, Team, Timeline, Values } from '@/sections/story'

export default function Story() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        index="03"
        lines={[<>A small studio</>, <>with a <em>long</em> memory.</>]}
        lead="Nomad & Nest has written about fourteen hundred journeys since 2011. We have never advertised, never taken a commission, and never grown past the number of trips we can write by hand."
        meta={[
          { label: 'Founded', value: 'Fitzroy, 2011' },
          { label: 'Studios', value: 'Melbourne · Lisbon · Kyoto' },
          { label: 'People', value: 'Six' },
        ]}
        image="1441974231531-c6227db76b6e"
        imageAlt="A path through tall forest, late afternoon light between the trunks"
      />

      <Opening />
      <Values />
      <Timeline />
      <Team />
      <Impact />
      <Press />

      <Cta />
    </>
  )
}
