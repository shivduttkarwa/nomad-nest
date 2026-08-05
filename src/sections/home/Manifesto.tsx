import { ApertureReveal, Figure, Reveal, WordReveal, useParallax } from '@/components/ui'
import { HOME_IMAGES } from './images'
import './Manifesto.css'

export function Manifesto() {
  const { ref, targetRef } = useParallax(70)

  return (
    <section className="manifesto section" ref={ref}>
      <div className="shell manifesto__inner">
        <div className="manifesto__side">
          <Reveal as="span" y={12} className="eyebrow">
            Who we are
          </Reveal>

          <div className="manifesto__figure" ref={targetRef}>
            <ApertureReveal className="manifesto__frame">
              <Figure
                id={HOME_IMAGES.studio}
                alt="The Fitzroy studio — a quiet gallery-like room hung with prints"
                ratio="3 / 4"
              />
            </ApertureReveal>

            <Reveal as="span" y={10} delay={0.35} amount={0.2} className="manifesto__caption mono">
              The Fitzroy studio, Melbourne
            </Reveal>
          </div>
        </div>

        <div className="manifesto__body">
          <WordReveal
            className="display d3"
            text="We are not a booking engine with a nicer typeface. We are a small studio that writes about a hundred journeys a year — slowly, by hand, and only for people we think we can genuinely help."
          />

          <div className="manifesto__foot">
            <Reveal y={24} amount={0.3}>
              <p>
                Every itinerary begins with a conversation and ends with a document that has your name on it: the route,
                the reasoning, the alternatives we considered and set aside. If we cannot improve on what you would book
                yourself, we will tell you so.
              </p>
            </Reveal>

            <Reveal y={24} delay={0.14} amount={0.3} className="manifesto__sign">
              <span className="display d5">Priya Raghavan</span>
              <span className="mono">Founder — writing since 2011</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
