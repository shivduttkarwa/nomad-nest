import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(Flip, ScrollTrigger, SplitText)

export { Flip, ScrollTrigger, SplitText, gsap }

export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'expo.inOut'
export const EASE_SOFT = 'power3.out'

export const SCRUB = 1.1
export const SCRUB_TIGHT = 0.6
export const SMOOTH_ABOVE = 0.15

export const THROUGH = { start: 'top bottom', end: 'bottom top' } as const

export function startAt(amount: number) {
  return `top ${Math.round((1 - amount) * 100)}%`
}
