import { Marquee } from '@/components/ui'
import { pressLogos } from '@/data/site'
import './Press.css'

export function Press() {
  return (
    <section className="press">
      <div className="shell press__head">
        <span className="eyebrow">Written about in</span>
      </div>
      <Marquee speed={38}>
        <span className="press__row display">
          {pressLogos.map((p) => (
            <span key={p} className="press__logo">
              {p}
              <i>·</i>
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  )
}
