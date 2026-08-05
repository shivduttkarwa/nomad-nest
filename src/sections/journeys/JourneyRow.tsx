import { AnimatePresence, motion } from 'framer-motion'

import { Btn, Figure, Tag } from '@/components/ui'
import type { Journey } from '@/data/journeys'
import { EASE_OUT } from '@/lib/easing'
import { cx, money } from '@/lib/utils'
import './JourneyRow.css'

type Props = {
  j: Journey
  open: boolean
  onToggle: () => void
}

export function JourneyRow({ j, open, onToggle }: Props) {
  return (
    <motion.article layout className={cx('jrow', open && 'is-open')}>
      <motion.button layout="position" type="button" className="jrow__head" onClick={onToggle} aria-expanded={open}>
        <span className="jrow__index mono">{j.index}</span>

        <span className="jrow__titles">
          <span className="jrow__title display d3">{j.title}</span>
          <span className="jrow__sub">{j.subtitle}</span>
        </span>

        <span className="jrow__facts">
          <span className="mono">{j.places}</span>
          <span className="mono">{j.nights} nights</span>
          <span className="mono">{j.pace}</span>
          <span className="mono">from {money(j.from)}</span>
        </span>

        <span className="jrow__sign" aria-hidden="true">
          <i />
          <i />
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="jrow__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="jrow__grid">
              <div className="jrow__left">
                <Figure id={j.image} alt={j.title} ratio="4 / 3" className="jrow__figure" />
                <p className="jrow__summary lead">{j.summary}</p>

                <h4 className="eyebrow">Highlights</h4>
                <ul className="jrow__highlights">
                  {j.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="jrow__tags">
                  <Tag>{j.pace} pace</Tag>
                  <Tag>{j.party}</Tag>
                  <Tag>{j.nights} nights</Tag>
                </div>
              </div>

              <div className="jrow__right">
                <h4 className="eyebrow">The route</h4>
                <ol className="jrow__days">
                  {j.days.map((d) => (
                    <li key={d.span}>
                      <span className="jrow__span mono">{d.span}</span>
                      <div>
                        <h5 className="display d5">{d.title}</h5>
                        <p>{d.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <h4 className="eyebrow">What is included</h4>
                <ul className="jrow__includes">
                  {j.includes.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>

                <div className="jrow__cta">
                  <Btn to="/contact">Enquire — {j.title}</Btn>
                  <span className="mono">Planning fee $600, credited in full</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
