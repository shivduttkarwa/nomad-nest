import { Lines, Reveal, SectionHead } from '@/components/ui'
import './Inclusions.css'

const INCLUSIONS = [
  {
    title: 'A named person, awake',
    text: 'One member of our team holds your trip from departure to return, with a second across time zones. Not a rota, not a queue.',
  },
  {
    title: 'Guides paid directly',
    text: 'Above local rate, on retainer where we can. We publish the split in your proposal so you can see where the money lands.',
  },
  {
    title: 'Rebooking without argument',
    text: 'Flights cancelled at midnight get rebooked before you have read the notification. We do not ask you to approve it first.',
  },
  {
    title: 'A document, not a voucher',
    text: 'Thirty to sixty pages: the route, the reasoning, maps, menus, the walk that is worth the early start and the one that is not.',
  },
  {
    title: 'Three-night minimums',
    text: 'We will not sell you a fourteen-night trip with nine stops. Two-night stays exist only to break a long transfer.',
  },
  {
    title: '1.5% to the ground',
    text: 'A fixed share of revenue goes to conservancies and community trusts in the regions we send people to. Audited annually.',
  },
]

export function Inclusions() {
  return (
    <section className="jincl on-dark section">
      <div className="shell jincl__inner">
        <SectionHead index="02 / 02" eyebrow="On every journey">
          <Lines as="h2" className="display d2" lines={[<>What comes as</>, <>standard, <em>always</em>.</>]} />
        </SectionHead>

        <div className="jincl__grid">
          {INCLUSIONS.map((x, i) => (
            <Reveal key={x.title} delay={i * 0.06} className="jincl__cell">
              <h3 className="display d4">{x.title}</h3>
              <p>{x.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
