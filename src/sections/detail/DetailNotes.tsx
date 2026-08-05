import type { ReactNode } from 'react'

import { Reveal, Tag } from '@/components/ui'
import './DetailNotes.css'

type Props = {
  eyebrow: string
  paragraphs: string[]
  tags?: string[]
  aside?: ReactNode
}

export function DetailNotes({ eyebrow, paragraphs, tags, aside }: Props) {
  return (
    <section className="dnotes section--tight">
      <div className="shell dnotes__inner">
        <Reveal as="span" y={12} className="eyebrow">
          {eyebrow}
        </Reveal>

        <div className="dnotes__body">
          <Reveal delay={0.08}>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            {tags && tags.length > 0 && (
              <div className="dnotes__tags">
                {tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </Reveal>

          {aside && (
            <Reveal delay={0.16} className="dnotes__aside">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
