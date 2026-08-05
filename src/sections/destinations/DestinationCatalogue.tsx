import { useLayoutEffect, useRef } from 'react'

import { EmptyState } from '@/components/ui'
import type { Destination } from '@/data/destinations'
import { useReducedMotion } from '@/hooks'
import { EASE_OUT, ScrollTrigger, gsap } from '@/lib/gsap'
import { DestinationCard } from './DestinationCard'
import { DestinationRow } from './DestinationRow'
import type { View } from './types'
import './DestinationCatalogue.css'

export function DestinationCatalogue({ list, view }: { list: Destination[]; view: View }) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const signature = list.map((d) => d.slug).join('|') + view

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || reduced) return

    const items = scope.querySelectorAll('.dcard, .drow')
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.045, overwrite: true },
      )
    }, scope)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [signature, reduced])

  return (
    <section className="dlist section--tight">
      <div className="shell" ref={scopeRef}>
        {view === 'grid' ? (
          <div className="dgrid">
            {list.map((d, i) => (
              <DestinationCard key={d.slug} d={d} i={i} />
            ))}
          </div>
        ) : (
          <ul className="dtable">
            <li className="dtable__head mono" aria-hidden="true">
              <span>No.</span>
              <span />
              <span>Destination</span>
              <span>Country</span>
              <span>Region</span>
              <span>Season</span>
              <span>Nights</span>
              <span>From</span>
              <span />
            </li>
            {list.map((d, i) => (
              <DestinationRow key={d.slug} d={d} i={i} />
            ))}
          </ul>
        )}

        {list.length === 0 && (
          <EmptyState
            title="Nothing here yet."
            note="Try another region — or ask us about somewhere that isn’t on the list."
          />
        )}
      </div>
    </section>
  )
}
