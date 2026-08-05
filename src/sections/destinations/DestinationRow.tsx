import { motion } from 'framer-motion'

import type { Destination } from '@/data/destinations'
import { EASE_OUT } from '@/lib/easing'
import { img, money, pad } from '@/lib/utils'
import './DestinationRow.css'

export function DestinationRow({ d, i }: { d: Destination; i: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: Math.min(i, 8) * 0.03 }}
      className="drow"
    >
      <a href="#" className="drow__link" data-cursor="view">
        <span className="drow__num mono">{pad(i + 1)}</span>
        <span className="drow__thumb">
          <img src={img(d.image, 400)} alt="" loading="lazy" />
        </span>
        <span className="drow__name display d5">{d.name}</span>
        <span className="drow__country">{d.country}</span>
        <span className="drow__region mono">{d.region}</span>
        <span className="drow__season mono">{d.season}</span>
        <span className="drow__nights mono">{d.nights} nts</span>
        <span className="drow__price mono">{money(d.from)}</span>
        <span className="drow__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
            <path d="M2 14L14 2M14 2H5M14 2v9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </span>
      </a>
    </motion.li>
  )
}
