import { Btn } from './Btn'
import { Lines, Reveal } from './Motion'
import { Marquee } from './Marquee'
import { Figure } from './Figure'
import { site } from '@/data/site'
import './Cta.css'

type Props = {
  image?: string
}

export function Cta({ image = '1444927714506-8492d94b4e3d' }: Props) {
  return (
    <section className="cta on-dark">
      <div className="cta__bg">
        <Figure
          id={image}
          alt="Layered ridgelines fading into morning haze"
          parallax={90}
          width={2400}
        />
      </div>

      <div className="shell cta__inner">
        <Reveal as="span" y={12} className="eyebrow">
          Begin
        </Reveal>

        <Lines
          as="h2"
          className="display d1 cta__title"
          lines={[
            <>
              Tell us where <em>you</em>
            </>,
            <>keep meaning to go.</>,
          ]}
        />

        <Reveal delay={0.2} className="cta__body">
          <p className="lead">
            Every journey starts with a ninety-minute conversation and no obligation whatsoever. We will tell you
            honestly whether we are the right studio for the trip you have in mind.
          </p>
          <div className="cta__actions">
            <Btn to="/contact" tone="paper" size="lg">
              Start planning
            </Btn>
            <a className="cta__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>

      <Marquee className="cta__marquee" speed={44}>
        <span className="cta__ribbon display">
          Melbourne <i>·</i> Lisbon <i>·</i> Kyoto <i>·</i>
        </span>
      </Marquee>
    </section>
  )
}
