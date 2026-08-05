import { useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Footer, Header } from '@/components/layout'
import {
  Cursor,
  IntroProvider,
  PageShell,
  Preloader,
  RouteCurtain,
  ScrollProgress,
  ScrollToTop,
  SmoothScroll,
  useLenisLock,
} from '@/components/system'

import Contact from '@/pages/Contact'
import Destinations from '@/pages/Destinations'
import Home from '@/pages/Home'
import Journeys from '@/pages/Journeys'
import NotFound from '@/pages/NotFound'
import Story from '@/pages/Story'

function ScrollLock({ locked }: { locked: boolean }) {
  useLenisLock(locked)
  return null
}

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const onLoaded = useCallback(() => setLoading(false), [])

  return (
    <SmoothScroll>
      <ScrollLock locked={loading} />
      <Preloader onDone={onLoaded} />
      <Cursor />
      <ScrollToTop />
      <ScrollProgress />
      <RouteCurtain />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <IntroProvider done={!loading}>
          <PageShell key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/journeys" element={<Journeys />} />
              <Route path="/story" element={<Story />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageShell>
        </IntroProvider>
      </main>

      <Footer />
    </SmoothScroll>
  )
}
