import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

import { ArrowLink, Btn, Figure, Lines } from '@/components/ui'
import { EASE_IN_OUT, EASE_OUT } from '@/lib/easing'
import { HOME_IMAGES } from './images'
import './Hero.css'

const TICKER = ['Kyoto, Japan', 'The Dolomites, Italy', 'Serengeti, Tanzania', 'Sacred Valley, Peru']

export function Hero() {
  const [now, setNow] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setNow((n) => (n + 1) % TICKER.length), 3200)
    return () => window.clearInterval(id)
  }, [])

  const { scrollYProgress } = useScroll()
  const veil = useTransform(scrollYProgress, [0, 0.14], [0, 1])

  return (
    <section className="hero">
      <motion.div
        className="hero__media"
        initial={{ clipPath: 'inset(22% 18% 22% 18%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.8, ease: EASE_IN_OUT, delay: 0.25 }}
      >
        <Figure
          id={HOME_IMAGES.hero}
          alt="A lone figure on a rock outcrop above mist-filled valleys at dawn"
          priority
          scaleIn
          width={2600}
        />
        <div className="hero__grade" />
        <motion.div className="hero__veil" style={{ opacity: veil }} />
      </motion.div>

      <div className="shell hero__content">
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.15 }}
        >
          Est. 2011 — a private travel atelier
        </motion.span>

        <Lines
          as="h1"
          className="display hero__title"
          delay={1.25}
          stagger={0.1}
          lines={[
            <>Journeys designed</>,
            <>
              around <em>you</em>.
            </>,
          ]}
        />

        <motion.div
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.7 }}
        >
          <p className="lead">
            Roughly a hundred trips a year, written by hand for people who would rather see one valley properly than
            six countries badly.
          </p>
          <div className="hero__actions">
            <Btn to="/journeys" tone="paper" size="lg">
              See our journeys
            </Btn>
            <ArrowLink to="/contact">Plan something of your own</ArrowLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__bar shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="hero__barcell">
          <span className="mono">Currently mapping</span>
          <span className="hero__ticker">
            <AnimatePresence mode="wait">
              <motion.span
                key={now}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-105%', opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                {TICKER[now]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="hero__barcell hero__barcell--mid">
          <span className="mono">46 countries · 1,400 journeys</span>
        </div>

        <div className="hero__barcell hero__barcell--end">
          <span className="mono">Scroll</span>
          <span className="hero__scrollline" aria-hidden="true">
            <i />
          </span>
        </div>
      </motion.div>
    </section>
  )
}
