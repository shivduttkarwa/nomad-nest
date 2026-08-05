import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Figure } from './Figure'
import { Lines, Reveal } from './Motion'
import './PageHero.css'

type Props = {
  eyebrow: string
  index: string
  lines: ReactNode[]
  lead: string
  meta: { label: string; value: string }[]
  image: string
  imageAlt: string
}

export function PageHero({ eyebrow, index, lines, lead, meta, image, imageAlt }: Props) {
  return (
    <header className="phero">
      <div className="shell">
        <div className="phero__top">
          <Reveal as="span" y={12} className="eyebrow">
            {eyebrow}
          </Reveal>
          <span className="phero__index mono">{index}</span>
        </div>

        <Lines as="h1" className="display d1 phero__title" lines={lines} delay={0.15} />

        <div className="phero__foot">
          <Reveal delay={0.35} className="phero__lead">
            <p className="lead">{lead}</p>
          </Reveal>

          <dl className="phero__meta">
            {meta.map((m, i) => (
              <Reveal as="div" key={m.label} delay={0.45 + i * 0.07} className="phero__metaitem">
                <dt className="mono">{m.label}</dt>
                <dd>{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <motion.div
        className="phero__media"
        initial={{ clipPath: 'inset(14% 8% 14% 8%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <Figure id={image} alt={imageAlt} parallax={70} priority width={2400} />
      </motion.div>
    </header>
  )
}
