import { createContext, useContext, type ReactNode } from 'react'

const IntroContext = createContext(true)

export const useIntroDone = () => useContext(IntroContext)

export function IntroProvider({ done, children }: { done: boolean; children: ReactNode }) {
  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>
}
