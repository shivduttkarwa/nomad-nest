import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { EmptyState, Filters, Lines, SectionHead } from '@/components/ui'
import { journeys, PACES, type Pace } from '@/data/journeys'
import { JourneyRow } from './JourneyRow'
import './JourneyCollection.css'

export function JourneyCollection() {
  const [pace, setPace] = useState<Pace | 'all'>('all')
  const [open, setOpen] = useState<string | null>(journeys[0].slug)

  const list = useMemo(() => (pace === 'all' ? journeys : journeys.filter((j) => j.pace === pace)), [pace])

  return (
    <section className="jlist section" id="journeys">
      <div className="shell">
        <SectionHead
          index="01 / 02"
          eyebrow="The full collection"
          aside={<Filters options={PACES} value={pace} onChange={setPace} allLabel="Any pace" layoutId="pace-pill" />}
        >
          <Lines as="h2" className="display d2" lines={[<>Open one and</>, <>read the <em>whole</em> thing.</>]} />
        </SectionHead>

        <motion.div layout className="jlist__rows">
          {list.map((j) => (
            <JourneyRow
              key={j.slug}
              j={j}
              open={open === j.slug}
              onToggle={() => setOpen(open === j.slug ? null : j.slug)}
            />
          ))}
        </motion.div>

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
