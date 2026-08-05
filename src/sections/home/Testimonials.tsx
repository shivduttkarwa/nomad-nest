import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react'

import { testimonials } from '@/data/site'
import { useReducedMotion } from '@/hooks'
import { EASE_OUT, gsap } from '@/lib/gsap'
import { pad } from '@/lib/utils'
import './Testimonials.css'

const SWIPE = 80

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const innerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const dragFrom = useRef<number | null>(null)
  const first = useRef(true)
  const reduced = useReducedMotion()
  const t = testimonials[i]

  const go = (step: number) => {
    setDir(step)
    setI((prev) => (prev + step + testimonials.length) % testimonials.length)
  }

  useLayoutEffect(() => {
    const inner = innerRef.current
    if (!inner || reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: inner, start: 'top 78%', once: true } })

      tl.fromTo(
        '.quotes__head > *',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT, stagger: 0.1 },
        0,
      )
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.95, ease: EASE_OUT },
        0.15,
      )
      tl.fromTo(
        '.quotes__nav button',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT, stagger: 0.08 },
        0.4,
      )
    }, inner)

    return () => ctx.revert()
  }, [reduced])

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }

    const el = quoteRef.current
    if (!el || reduced) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 34 * dir },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, overwrite: true },
    )

    return () => {
      tween.kill()
    }
  }, [i, dir, reduced])

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragFrom.current = e.clientX
  }

  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragFrom.current === null) return
    const delta = e.clientX - dragFrom.current
    dragFrom.current = null
    if (delta < -SWIPE) go(1)
    else if (delta > SWIPE) go(-1)
  }

  return (
    <section className="quotes section">
      <div className="shell quotes__inner" ref={innerRef}>
        <div className="quotes__head">
          <span className="eyebrow">In their words</span>
          <span className="quotes__count mono">
            {pad(i + 1)} — {pad(testimonials.length)}
          </span>
        </div>

        <div
          className="quotes__stage"
          data-cursor="drag"
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerLeave={() => {
            dragFrom.current = null
          }}
        >
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
