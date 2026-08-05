import { useId, useState, type ReactNode } from 'react'

import { cx } from '@/lib/utils'
import { Collapse } from './Collapse'
import './Accordion.css'

export type AccordionItem = {
  key: string
  heading: ReactNode
  meta?: ReactNode
  body: ReactNode
}

type Props = {
  items: AccordionItem[]
  defaultOpen?: string
  className?: string
  numbered?: boolean
}

export function Accordion({ items, defaultOpen, className, numbered = false }: Props) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  const uid = useId()

  return (
    <div className={cx('accordion', className)}>
      {items.map((item, i) => {
        const isOpen = open === item.key
        return (
          <div className={cx('accordion__item', isOpen && 'is-open')} key={item.key}>
            <h3 className="accordion__headwrap">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${item.key}`}
                onClick={() => setOpen(isOpen ? null : item.key)}
              >
                {numbered && <span className="accordion__num mono">{String(i + 1).padStart(2, '0')}</span>}
                <span className="accordion__heading">{item.heading}</span>
                {item.meta && <span className="accordion__meta mono">{item.meta}</span>}
                <span className="accordion__sign" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>

            <Collapse open={isOpen} id={`${uid}-${item.key}`} className="accordion__panel" duration={0.55}>
              <div className="accordion__inner">{item.body}</div>
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}
