import { AnimatePresence, motion } from 'framer-motion'

import { EmptyState } from '@/components/ui'
import type { Destination } from '@/data/destinations'
import { DestinationCard } from './DestinationCard'
import { DestinationRow } from './DestinationRow'
import type { View } from './types'
import './DestinationCatalogue.css'

export function DestinationCatalogue({ list, view }: { list: Destination[]; view: View }) {
  return (
    <section className="dlist section--tight">
      <div className="shell">
        {view === 'grid' ? (
          <motion.div layout className="dgrid">
            <AnimatePresence mode="popLayout">
              {list.map((d, i) => (
                <DestinationCard key={d.slug} d={d} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.ul layout className="dtable">
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
            <AnimatePresence mode="popLayout">
              {list.map((d, i) => (
                <DestinationRow key={d.slug} d={d} i={i} />
              ))}
            </AnimatePresence>
          </motion.ul>
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
