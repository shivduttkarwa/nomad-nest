import { Fragment, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { cx } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import './Motion.css'

gsap.registerPlugin(SplitText)

const EASE = [0.16, 1, 0.3, 1] as const
const HIDDEN = 150

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  amount = 0.25,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
  as?: ElementType
}) {
  const Tag = motion[as as 'div'] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
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
  const split = useRef<SplitText | null>(null)
  const done = useRef(false)
  const reduced = useReducedMotion()
  const seen = useInView(ref, { once: true, amount: 0.35 })
  const shouldPlay = seen && play && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const instance = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'lines__line',
      autoSplit: true,
      onSplit: (self) => {
        gsap.set(self.lines, { yPercent: done.current ? 0 : HIDDEN })
      },
    })

    split.current = instance
    return () => {
      instance.revert()
      split.current = null
    }
  }, [reduced])

  useEffect(() => {
    if (!shouldPlay || done.current) return
    const instance = split.current
    if (!instance) return

    const tween = gsap.to(instance.lines, {
      yPercent: 0,
      duration: 1.15,
      ease: 'expo.out',
      stagger,
      delay,
      onComplete: () => {
        done.current = true
      },
    })

    return () => {
      tween.kill()
    }
  }, [shouldPlay, stagger, delay])

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

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <span className="wordreveal__word">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  })

  const words = text.split(' ')

  if (reduced) return <p className={cx('wordreveal', className)}>{text}</p>

  return (
    <p ref={ref} className={cx('wordreveal', className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word + (i < words.length - 1 ? ' ' : '')}
          </Word>
        )
      })}
    </p>
  )
}

export function Counter({ to, suffix = '', duration = 1.9 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className="counter">
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [distance, -distance])
  return { ref, y }
}
