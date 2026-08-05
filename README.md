# Nomad &amp; Nest

A five-page marketing site for a private travel atelier. React 19 + TypeScript + Vite,
hand-written CSS, Framer Motion, and Lenis smooth scroll.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle into dist/
npm run preview  # serve the built bundle
```

> **Note on this folder's name.** The `&` in `Nomad & Nest` breaks npm's generated
> `.cmd` shims, so `npx vite` and `npx tsc` fail here. The `npm run` scripts work
> fine. To call a binary directly, go through node:
> `node ./node_modules/vite/bin/vite.js build`.

---

## Design system

Everything is driven by custom properties in `src/styles/tokens.css`. Change the
palette there and the whole site follows.

| | |
|---|---|
| **Paper** | `#f2efe7` — warm bone, not white |
| **Ink** | `#12110f` — near-black with a brown bias |
| **Ember** | `#b0512a` — the single accent, used sparingly |
| **Display** | Instrument Serif, with italics carrying the emphasis |
| **Text/UI** | Inter Tight |
| **Meta/numerals** | JetBrains Mono, uppercase, wide tracking |

Type scales fluidly between a 380px and 1680px viewport via `clamp()`, so there
are no per-breakpoint font sizes to maintain.

The muted greys (`--text-mute`, `--text-faint`) are tuned to clear WCAG AA at the
sizes they're used at. Lightening them will break contrast.

### Stylesheet order

Imported in `src/main.tsx`, and order matters:

1. `tokens.css` — custom properties only
2. `base.css` — reset, element defaults, typography and layout primitives
3. `system.css` — cursor, preloader, route curtain, scroll progress
4. `components.css` — header, menu, footer, buttons, figures, accordion, CTA
5. `pages.css` — per-page composition

---

## Structure

```
src/
├─ App.tsx                  routing, page transitions, global chrome
├─ data/                    all copy and content — edit here, not in components
│  ├─ destinations.ts       16 destinations
│  ├─ journeys.ts           6 journeys with day-by-day itineraries
│  └─ site.ts               nav, studios, values, timeline, team, FAQs…
├─ hooks/                   media queries, magnetic pointer, live clocks
├─ lib/utils.ts             cx, clamp, image URL builder, formatters
├─ components/
│  ├─ system/               SmoothScroll, Cursor, Preloader, Transitions
│  ├─ layout/               Header, Menu, Footer, Wordmark
│  └─ ui/                   Figure, Motion primitives, Btn, Bits, PageHero, Cta
├─ pages/                   Home, Destinations, Journeys, Story, Contact, NotFound
└─ styles/
```

Content is deliberately separated from presentation — the five pages read almost
entirely from `src/data/`, so copy changes never require touching a component.

---

## The five pages

| Route | What's on it |
|---|---|
| `/` | Full-bleed hero, scroll-driven manifesto, hover-preview destination index, offset journey cards, animated stat band, sticky-title process, draggable testimonials, journal |
| `/destinations` | Sticky filter bar — region filters, sort, and a grid/index layout toggle — over 16 animated, re-orderable cards |
| `/journeys` | Featured journey, pace filter, and six expandable rows each opening a full day-by-day itinerary and inclusions |
| `/story` | Founding narrative, four principles, timeline, team, published impact figures, press marquee |
| `/contact` | Four-step enquiry form with validation, destination chips, range sliders, a review summary and success state — plus studio cards with live local times, and an FAQ accordion |

There's also a designed 404 at any unmatched route.

---

## Interaction notes

- **Custom cursor** — desktop only. Any element can change it by setting
  `data-cursor="view" | "drag" | "link"`; the nearest ancestor with the attribute
  wins.
- **Magnetic buttons** — `useMagnetic()` in `src/hooks`. Desktop only.
- **Route transitions** — five panels wipe away as each page enters
  (`RouteCurtain`), while `PageShell` cross-fades the content beneath.
- **Smooth scroll** — Lenis. Overlays must use `useLenisLock()` rather than
  `overflow: hidden`, which Lenis ignores because it drives `scrollTop` itself.
- **Reduced motion** — `prefers-reduced-motion` disables the preloader, custom
  cursor, magnetic pointer, parallax and marquees throughout.

---

## Imagery

Photographs are hot-linked from Unsplash via `img()` in `src/lib/utils.ts`, which
applies consistent crop and quality parameters. Every ID used here was verified
against the real photograph, and the destination each is attached to matches what
the picture actually shows.

For production you'll want to self-host these: replace the `img()` body with your
own asset path and swap the IDs in `src/data/` for filenames. `Figure` already
handles lazy loading, async decoding, a fade-in on load and optional parallax, so
nothing else needs to change.

---

## Not wired up

The enquiry and newsletter forms validate and animate but resolve locally — there
is no backend. Point `Enquiry`'s `submit()` in `src/pages/Contact.tsx` at your
endpoint. Journey and destination cards link to their index pages rather than to
detail routes; the data model already carries a `slug` for each if you want to add
them.
