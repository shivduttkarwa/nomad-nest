import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Reveal } from '@/components/ui'
import { testimonials } from '@/data/site'
import { EASE_OUT } from '@/lib/easing'
import { pad } from '@/lib/utils'
import './Testimonials.css'

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const t = testimonials[i]

  const go = (step: number) => {
    setDir(step)
    setI((prev) => (prev + step + testimonials.length) % testimonials.length)
  }

  return (
    <section className="quotes section">
      <div className="shell quotes__inner">
        <div className="quotes__head">
          <Reveal as="span" y={12} className="eyebrow">
            In their words
          </Reveal>
          <span className="quotes__count mono">
            {pad(i + 1)} — {pad(testimonials.length)}
          </span>
        </div>

        <div className="quotes__stage" data-cursor="drag">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={i}
              className="quotes__quote"
              custom={dir}
              initial={{ opacity: 0, y: 34 * dir }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -34 * dir }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1)
                else if (info.offset.x > 80) go(-1)
              }}
            >
              <p className="display d3">“{t.quote}”</p>
              <footer>
                <cite>{t.name}</cite>
                <span className="mono">{t.detail}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="quotes__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
            <svg viewBox="0 0 20 12" width="20" height="12" fill="none">
              <path d="M20 6H3M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
            <svg viewBox="0 0 20 12" width="20" height="12" fill="none">
              <path d="M0 6h17M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
