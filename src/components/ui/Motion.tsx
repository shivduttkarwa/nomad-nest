import { Fragment, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

import { useReducedMotion } from '@/hooks'
import { EASE_OUT, SCRUB, SCRUB_TIGHT, ScrollTrigger, SplitText, THROUGH, gsap, startAt } from '@/lib/gsap'
import { cx } from '@/lib/utils'
import './Motion.css'

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  amount = 0.25,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: EASE_OUT,
          delay,
          scrollTrigger: { trigger: el, start: startAt(amount), once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, y, amount, reduced])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export function Lines({
  lines,
  className,
  delay = 0,
  stagger = 0.085,
  play = true,
  as: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  stagger?: number
  play?: boolean
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced || !play) return

    let split: SplitText | null = null

    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'lines__line',
        autoSplit: true,
        onSplit: (self) => {
          return gsap.fromTo(
            self.lines,
            { yPercent: 150 },
            {
              yPercent: 0,
              duration: 1.15,
              ease: EASE_OUT,
              stagger,
              delay,
              scrollTrigger: { trigger: el, start: startAt(0.35), once: true },
            },
          )
        },
      })
    }, el)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [delay, stagger, play, reduced])

  return (
    <Tag ref={ref} className={cx('lines', className)}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </Tag>
  )
}

export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    let split: SplitText | null = null

    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: 'words',
        wordsClass: 'wordreveal__word',
        autoSplit: true,
        onSplit: (self) => {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.4,
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 50%',
                scrub: SCRUB_TIGHT,
              },
            },
          )
        },
      })
    }, el)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [text, reduced])

  return (
    <p ref={ref} className={cx('wordreveal', className)}>
      {text}
    </p>
  )
}

export function Counter({ to, suffix = '', duration = 1.9 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      setValue(to)
      return
    }

    const counter = { n: 0 }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: to,
        duration,
        ease: 'power4.out',
        onUpdate: () => setValue(Math.round(counter.n)),
        scrollTrigger: { trigger: el, start: startAt(0.6), once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [to, duration, reduced])

  return (
    <span ref={ref} className="counter">
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const scope = ref.current
    const target = targetRef.current
    if (!scope || !target || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: { trigger: scope, ...THROUGH, scrub: SCRUB, invalidateOnRefresh: true },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [distance, reduced])

  return { ref, targetRef }
}

export { ScrollTrigger }
