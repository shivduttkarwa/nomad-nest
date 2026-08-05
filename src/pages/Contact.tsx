import { Cta, PageHero } from '@/components/ui'
import { ContactDetails, Faqs } from '@/sections/contact'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Plan a trip"
        index="04"
        lines={[<>Tell us the</>, <>vague <em>version</em> first.</>]}
        lead="You do not need dates, a budget or a destination to start. Most of our best journeys began with a paragraph that said little more than “somewhere quiet, sometime in autumn”."
        meta={[
          { label: 'Reply within', value: 'One working day' },
          { label: 'Planning fee', value: '$600, credited' },
          { label: 'Obligation', value: 'None whatsoever' },
        ]}
        image="1504609773096-104ff2c73ba4"
        imageAlt="A desk of travel notes, a camera, a compass and a leather journal"
      />

      <ContactDetails />

      <Faqs />

      <Cta />
    </>
  )
}
