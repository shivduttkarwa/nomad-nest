import { useLayoutEffect, useRef } from 'react'

import { Marquee } from '@/components/ui'
import { stats } from '@/data/site'
import { useReducedMotion } from '@/hooks'
import { EASE_OUT, gsap } from '@/lib/gsap'
import './Stats.css'

export function Stats() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid || reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      })

      tl.fromTo(
        '.stats__num',
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, ease: EASE_OUT, stagger: 0.09 },
        0,
      )
      tl.fromTo(
        '.stats__label',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT, stagger: 0.09 },
        0.18,
      )
    }, grid)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="stats on-dark">
      <div className="shell">
        <div className="stats__grid" ref={gridRef}>
          {stats.map((s) => (
            <div key={s.label} className="stats__cell">
              <span className="stats__value display">
                <span className="stats__num">
                  {s.value.toLocaleString('en-US')}
                  {s.suffix}
                </span>
              </span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Marquee className="stats__marquee" speed={52} reverse>
        <span className="stats__ribbon mono">
          Slow travel <i>◆</i> Local guides on retainer <i>◆</i> No commissions taken <i>◆</i> Three-night minimums{' '}
          <i>◆</i>
        </span>
      </Marquee>
    </section>
  )
}
