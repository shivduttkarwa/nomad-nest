import { Figure, Reveal, WordReveal, useParallax } from '@/components/ui'
import './Opening.css'

export function Opening() {
  const { ref, targetRef } = useParallax(60)

  return (
    <section className="opening section" ref={ref}>
      <div className="shell opening__inner">
        <div className="opening__text">
          <WordReveal
            className="display d3"
            text="It started because a friend asked for help with three weeks in Japan, and the itinerary took eleven days to write."
          />

          <Reveal delay={0.1} className="opening__para">
            <p>
              Priya was working in publishing at the time. The trip went well enough that five more people asked, and by
              the end of 2011 there were six itineraries, a spare room in Fitzroy, and a suspicion that the industry had
              the whole thing backwards — that the interesting work was not in finding hotels but in deciding what a
              fortnight should actually feel like.
            </p>
            <p>
              Fourteen years later there are six of us across three cities. We still write roughly a hundred journeys a
              year and we have deliberately not grown past that. It is the largest number we can do properly, and doing
              it properly is the only thing we are selling.
            </p>
          </Reveal>
        </div>

        <div className="opening__media" ref={targetRef}>
          <Figure id="1516738901171-8eb4fc13bd20" alt="A wall map stuck with coloured pins" ratio="4 / 5" />
          <span className="opening__caption mono">The pin wall — one pin per journey, since 2011</span>
        </div>
      </div>
    </section>
  )
}
