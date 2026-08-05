import { Reveal } from '@/components/ui'
import './ClosingNote.css'

export function ClosingNote() {
  return (
    <section className="dnote section--tight">
      <div className="shell dnote__inner">
        <Reveal as="span" y={12} className="eyebrow">
          Not on the list?
        </Reveal>
        <Reveal delay={0.08}>
          <p className="display d3">
            These are the places we know coldly well. We have written good trips to about thirty more — ask, and if we
            cannot do it <em>properly</em>, we will say so.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
