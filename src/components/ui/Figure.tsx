import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cx, img } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import './Figure.css'

type Props = {
  id: string
  alt: string
  ratio?: string
  parallax?: number
  width?: number
  className?: string
  priority?: boolean
  scaleIn?: boolean
  children?: ReactNode
}

export function Figure({
  id,
  alt,
  ratio,
  parallax = 0,
  width = 1600,
  className,
  priority = false,
  scaleIn = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const active = parallax !== 0 && !reduced
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax])
  const scale = useTransform(scrollYProgress, [0, 1], scaleIn && !reduced ? [1.16, 1] : [1, 1])

  return (
    <div
      ref={ref}
      className={cx('figure', loaded && 'is-loaded', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <motion.img
        src={img(id, width)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={{
          y: active ? y : undefined,
          scale: scaleIn && !reduced ? scale : undefined,
          height: active ? `calc(100% + ${parallax * 2}px)` : '100%',
          top: active ? `-${parallax}px` : 0,
        }}
        draggable={false}
      />
      {children}
    </div>
  )
}
