import { Marquee } from '@/components/ui'
import './JourneyMarquee.css'

export function JourneyMarquee() {
  return (
    <Marquee className="jmarquee" speed={48}>
      <span className="jmarquee__text display">
        Japan <i>·</i> Italy <i>·</i> Tanzania <i>·</i> Nepal <i>·</i> California <i>·</i> Greece <i>·</i>
      </span>
    </Marquee>
  )
}
