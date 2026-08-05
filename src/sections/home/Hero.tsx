import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

import { ArrowLink, Btn, Lines } from '@/components/ui'
import { useIntroDone } from '@/components/system'
import { useReducedMotion } from '@/hooks'
import { EASE_IN_OUT, EASE_OUT } from '@/lib/easing'
import { asset, cx } from '@/lib/utils'
import { HOME_IMAGES } from './images'
import './Hero.css'

const SLIDE_MS = 6200
const WIPE_S = 1.5
const INTRO = 0.7
const CONTENT = INTRO + 0.95

const SLIDES = [
  {
    image: HOME_IMAGES.heroes[0],
    place: 'Torres del Paine, Patagonia',
    alt: 'Granite towers rising over a glacial lake in Torres del Paine, Patagonia',
  },
  {
    image: HOME_IMAGES.heroes[1],
    place: 'Sossusvlei, Namibia',
    alt: 'Wind-sculpted red dunes meeting pale clay pans at Sossusvlei, Namibia',
  },
  {
    image: HOME_IMAGES.heroes[2],
    place: 'Yakushima, Japan',
    alt: 'Moss-covered ancient cedar forest on the island of Yakushima, Japan',
  },
  {
    image: HOME_IMAGES.heroes[3],
    place: 'Raja Ampat, Indonesia',
    alt: 'Limestone karst islands scattered across shallow turquoise water in Raja Ampat',
  },
]

const WIPE_FROM = 'polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)'
const WIPE_TO = 'polygon(0% 0%, 130% 0%, 100% 100%, -30% 100%)'

export function Hero() {
  const reduced = useReducedMotion()
  const ready = useIntroDone()
  const [index, setIndex] = useState(0)
  const timer = useRef(0)

  const { scrollYProgress } = useScroll()
  const veil = useTransform(scrollYProgress, [0, 0.14], [0, 1])

  useEffect(() => {
    SLIDES.forEach((s) => {
      const preload = new Image()
      preload.src = asset(s.image)
    })
  }, [])

  const schedule = useCallback(() => {
    if (reduced || !ready) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS)
  }, [reduced, ready])

  useEffect(() => {
    schedule()
    return () => window.clearTimeout(timer.current)
  }, [index, schedule])

  const slide = SLIDES[index]

  return (
    <section className="hero">
      <motion.div
        className="hero__media"
        initial={{ clipPath: 'inset(26% 20% 26% 20%)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.7, ease: EASE_IN_OUT, delay: INTRO }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="hero__slide"
            initial={{ clipPath: reduced ? WIPE_TO : WIPE_FROM }}
            animate={{ clipPath: WIPE_TO }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: WIPE_S * 0.75 } }}
            transition={{ duration: reduced ? 0 : WIPE_S, ease: EASE_IN_OUT }}
          >
            <motion.img
              src={asset(slide.image)}
              alt={slide.alt}
              draggable={false}
              initial={{ scale: reduced ? 1 : 1.18 }}
              animate={{ scale: reduced ? 1 : 1.02 }}
              transition={{ duration: reduced ? 0 : SLIDE_MS / 1000 + WIPE_S, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="hero__grade" />
        <motion.div className="hero__veil" style={{ opacity: veil }} />
      </motion.div>

      <motion.div
        className="hero__dots"
        initial={{ opacity: 0, x: 24 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: CONTENT + 0.85 }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            className={cx('hero__dot', i === index && 'is-on')}
            onClick={() => setIndex(i)}
            aria-label={s.place}
            aria-current={i === index}
          >
            <span className="hero__dotrail">
              {i === index && (
                <motion.i
                  key={index}
                  initial={{ scaleX: reduced ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduced ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                />
              )}
            </span>
          </button>
        ))}
      </motion.div>

      <div className="shell hero__content">
        <Lines
          as="h1"
          className="display hero__title"
          play={ready}
          delay={CONTENT}
          stagger={0.12}
          lines={[
            <>Journeys designed</>,
            <>
              around <em>you</em>.
            </>,
          ]}
        />

        <div className="hero__sub">
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 26 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE_OUT, delay: CONTENT + 0.45 }}
          >
            Roughly a hundred trips a year, written by hand for people who would rather see one valley properly than
            six countries badly.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 26 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE_OUT, delay: CONTENT + 0.6 }}
          >
            <Btn to="/journeys" tone="paper" size="lg">
              See our journeys
            </Btn>
            <ArrowLink to="/contact">Plan something of your own</ArrowLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero__bar shell"
        initial={{ opacity: 0, y: 18 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: CONTENT + 0.75 }}
      >
        <div className="hero__barcell">
          <span className="mono">Currently mapping</span>
          <span className="hero__ticker">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-105%', opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                {slide.place}
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
