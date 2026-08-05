import { useLayoutEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/ui'
import { testimonials } from '@/data/site'
import { useReducedMotion } from '@/hooks'
import { EASE_OUT, gsap } from '@/lib/gsap'
import { pad } from '@/lib/utils'
import './Testimonials.css'

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const reduced = useReducedMotion()
  const t = testimonials[i]

  const go = (step: number) => {
    setDir(step)
    setI((prev) => (prev + step + testimonials.length) % testimonials.length)
  }

  useLayoutEffect(() => {
    const el = quoteRef.current
    if (!el || reduced) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 34 * dir },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT },
    )

    return () => {
      tween.kill()
    }
  }, [i, dir, reduced])

  return (
    <section className="quotes section">
      <div className="shell quotes__inner">
        <div className="quotes__head">
          <Reveal as="span" y={12} className="eyebrow">
            In their words
          </Reveal>
          <span className="quotes__count mono">
            {pad(i + 1)} — {pad(testimonials.length)}
          </span>
        </div>

        <div className="quotes__stage" data-cursor="drag">
          <blockquote ref={quoteRef} className="quotes__quote">
            <p className="display d3">“{t.quote}”</p>
            <footer>
              <cite>{t.name}</cite>
              <span className="mono">{t.detail}</span>
            </footer>
          </blockquote>
        </div>

        <div className="quotes__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
            <svg viewBox="0 0 20 12" width="20" height="12" fill="none">
              <path d="M20 6H3M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
            <svg viewBox="0 0 20 12" width="20" height="12" fill="none">
              <path d="M0 6h17M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
