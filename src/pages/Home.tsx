import { Cta } from '@/components/ui'
import {
  DestinationIndex,
  FeaturedJourneys,
  Hero,
  Journal,
  Manifesto,
  Method,
  Stats,
  Testimonials,
  HOME_IMAGES,
} from '@/sections/home'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <DestinationIndex />
      <FeaturedJourneys />
      <Stats />
      <Method />
      <Testimonials />
      <Journal />
      <Cta image={HOME_IMAGES.cta} />
    </>
  )
}
