import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import { EmptyState, Filters, Lines, SectionHead } from '@/components/ui'
import { journeys, PACES, type Pace } from '@/data/journeys'
import { useReducedMotion } from '@/hooks'
import { EASE_OUT, ScrollTrigger, gsap } from '@/lib/gsap'
import { JourneyRow } from './JourneyRow'
import './JourneyCollection.css'

export function JourneyCollection() {
  const [pace, setPace] = useState<Pace | 'all'>('all')
  const [open, setOpen] = useState<string | null>(journeys[0].slug)
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const list = useMemo(() => (pace === 'all' ? journeys : journeys.filter((j) => j.pace === pace)), [pace])

  useLayoutEffect(() => {
    const scope = listRef.current
    if (!scope || reduced) return

    const rows = scope.querySelectorAll('.jrow')
    if (!rows.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.05, overwrite: true },
      )
    }, scope)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [pace, reduced])

  return (
    <section className="jlist section" id="journeys">
      <div className="shell">
        <SectionHead
          index="01 / 02"
          eyebrow="The full collection"
          aside={<Filters options={PACES} value={pace} onChange={setPace} allLabel="Any pace" />}
        >
          <Lines as="h2" className="display d2" lines={[<>Open one and</>, <>read the <em>whole</em> thing.</>]} />
        </SectionHead>

        <div className="jlist__rows" ref={listRef}>
          {list.map((j) => (
            <JourneyRow
              key={j.slug}
              j={j}
              open={open === j.slug}
              onToggle={() => setOpen(open === j.slug ? null : j.slug)}
            />
          ))}
        </div>

        {list.length === 0 && (
          <EmptyState
            title="No journeys at that pace."
            note="We will happily write one — that is rather the point."
          />
        )}
      </div>
    </section>
  )
}
