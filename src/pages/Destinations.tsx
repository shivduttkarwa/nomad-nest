import { useMemo, useState } from 'react'

import { Cta, PageHero } from '@/components/ui'
import { destinations, type Region } from '@/data/destinations'
import { ClosingNote, DestinationCatalogue, FilterBar, type Sort, type View } from '@/sections/destinations'

export default function Destinations() {
  const [region, setRegion] = useState<Region | 'all'>('all')
  const [sort, setSort] = useState<Sort>('Curated')
  const [view, setView] = useState<View>('grid')

  const list = useMemo(() => {
    const filtered = region === 'all' ? destinations : destinations.filter((d) => d.region === region)
    const sorted = [...filtered]
    if (sort === 'Price') sorted.sort((a, b) => a.from - b.from)
    if (sort === 'Duration') sorted.sort((a, b) => a.nights - b.nights)
    if (sort === 'A – Z') sorted.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Curated') sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return sorted
  }, [region, sort])

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        index="01"
        lines={[<>Sixteen places</>, <>we return to <em>often</em>.</>]}
        lead="We do not claim the world. We claim these — the corners we have walked repeatedly, where we know the guides by name and can tell you which week of which month is the one worth taking off work."
        meta={[
          { label: 'Regions', value: 'Four' },
          { label: 'Destinations', value: String(destinations.length) },
          { label: 'Guides on retainer', value: '38' },
        ]}
        image="1528181304800-259b08848526"
        imageAlt="Golden temple roofs against a bright sky"
      />

      <FilterBar
        region={region}
        onRegionChange={setRegion}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        count={list.length}
      />

      <DestinationCatalogue list={list} view={view} />

      <ClosingNote />

      <Cta />
    </>
  )
}
