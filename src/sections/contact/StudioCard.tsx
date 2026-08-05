import type { studios } from '@/data/site'
import { useLocalTime } from '@/hooks'
import './StudioCard.css'

export function StudioCard({ city, country, address, tz, tzLabel }: (typeof studios)[number]) {
  const time = useLocalTime(tz)

  return (
    <div className="studio">
      <div className="studio__head">
        <h3 className="display d5">{city}</h3>
        <span className="mono">
          {time} {tzLabel}
        </span>
      </div>
      <p className="studio__addr">{address}</p>
      <p className="mono muted">{country}</p>
    </div>
  )
}
