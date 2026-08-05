export const HOME_IMAGES = {
  hero: '/images/home/hero.webp',
  studio: '/images/home/studio.webp',
  cta: '/images/home/cta-ridges.webp',
  destinations: {
    kyoto: '/images/home/destination-kyoto.webp',
    dolomites: '/images/home/destination-dolomites.webp',
    serengeti: '/images/home/destination-serengeti.webp',
    santorini: '/images/home/destination-santorini.webp',
    'val-dorcia': '/images/home/destination-val-dorcia.webp',
  } as Record<string, string>,
  journeys: {
    'the-slow-north': '/images/home/journey-slow-north.webp',
    'salt-stone-cypress': '/images/home/journey-salt-stone-cypress.webp',
    'islands-of-the-aegean': '/images/home/journey-islands-aegean.webp',
  } as Record<string, string>,
  journal: [
    '/images/home/journal-staying-put.webp',
    '/images/home/journal-shoulder-season.webp',
    '/images/home/journal-sherpa.webp',
  ],
} as const
