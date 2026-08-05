import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(Flip, ScrollTrigger, SplitText)

export { Flip, ScrollTrigger, SplitText, gsap }

export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'expo.inOut'
export const EASE_SOFT = 'power3.out'

export function startAt(amount: number) {
  return `top ${Math.round((1 - amount) * 100)}%`
}
