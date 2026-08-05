export const site = {
  name: 'Nomad & Nest',
  tagline: 'Journeys designed around you',
  founded: 2011,
  email: 'studio@nomadandnest.com',
  phone: '+61 3 9421 8800',
}

export const nav = [
  { label: 'Destinations', to: '/destinations', index: '01' },
  { label: 'Journeys', to: '/journeys', index: '02' },
  { label: 'Our Story', to: '/story', index: '03' },
  { label: 'Plan a Trip', to: '/contact', index: '04' },
] as const

export const studios = [
  {
    city: 'Melbourne',
    country: 'Australia',
    address: 'Level 4, 118 Gertrude Street\nFitzroy VIC 3065',
    tz: 'Australia/Melbourne',
    tzLabel: 'AEST',
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    address: 'Rua da Boavista 84\n1200-069 Lisboa',
    tz: 'Europe/Lisbon',
    tzLabel: 'WEST',
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    address: '317 Sasaya-chō, Nakagyō-ku\nKyoto 604-8115',
    tz: 'Asia/Tokyo',
    tzLabel: 'JST',
  },
]

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Journal', href: '#' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export const stats = [
  { value: 46, suffix: '', label: 'Countries mapped on foot' },
  { value: 1400, suffix: '+', label: 'Journeys written to date' },
  { value: 92, suffix: '%', label: 'Travellers who return to us' },
  { value: 14, suffix: ' yrs', label: 'Of doing only this' },
]

export const process = [
  {
    n: '01',
    title: 'The long conversation',
    text: 'Ninety minutes, no brochure, no pitch. We want to know how you travel, not where you have been — whether you read on the plane, whether you would rather walk than be driven, what you would quietly like to avoid.',
  },
  {
    n: '02',
    title: 'A written proposal',
    text: 'Not a package. A document with your name on it: the route, the reasoning behind each night, the alternatives we considered and set aside, and what each part actually costs.',
  },
  {
    n: '03',
    title: 'Revision, until it fits',
    text: 'Most journeys go through three drafts. Some go through seven. We do not charge for any of them, and we would rather you say no twice than accept something that is close enough.',
  },
  {
    n: '04',
    title: 'Someone awake, wherever you are',
    text: 'From the moment you leave, a named person on our team is holding your trip. Not a call centre, not a chatbot — one human who has read the whole document and knows the second night was moved for a reason.',
  },
]

export const values = [
  {
    n: '01',
    title: 'Fewer, better',
    text: 'We take on around a hundred journeys a year. That number is deliberate and it has not grown since 2018. It is the largest number we can write properly.',
  },
  {
    n: '02',
    title: 'Local before luxury',
    text: 'A family-run guesthouse with the right view beats a chain suite with the wrong one. When we do choose the grand hotel, it is because the building itself is the reason.',
  },
  {
    n: '03',
    title: 'Slow is a feature',
    text: 'Three nights is our minimum in any one place. Two-night stops exist to break a long transfer, never to add another name to the itinerary.',
  },
  {
    n: '04',
    title: 'Money that stays put',
    text: 'Guides, drivers and hosts are paid directly and above local rate. We publish the split. One and a half percent of revenue goes to conservancies in the places we send people.',
  },
]

export const timeline = [
  {
    year: '2011',
    title: 'A spare room in Fitzroy',
    text: 'Priya Raghavan writes six itineraries for friends of friends. All six go. The sixth becomes the template we still use.',
  },
  {
    year: '2014',
    title: 'The first guides on retainer',
    text: 'Rather than book through agencies, we begin paying a small circle of guides a monthly retainer to stay available and stay honest.',
  },
  {
    year: '2017',
    title: 'Lisbon',
    text: 'A second studio opens so that European mornings are covered by someone who is actually awake for them.',
  },
  {
    year: '2020',
    title: 'The year of unwinding',
    text: 'We refund in full, without conditions, and keep every guide on retainer through eighteen months of nothing. It costs us the reserves. It buys us the network we have now.',
  },
  {
    year: '2023',
    title: 'Kyoto',
    text: 'A third studio, three desks, and a standing invitation for travellers to drop in for tea on their first afternoon.',
  },
]

export const team = [
  { name: 'Priya Raghavan', role: 'Founder & principal designer', base: 'Melbourne', since: '2011' },
  { name: 'Tomás Ferreira', role: 'Head of Europe', base: 'Lisbon', since: '2017' },
  { name: 'Aiko Nakamura', role: 'Japan & Korea', base: 'Kyoto', since: '2019' },
  { name: 'Daniel Okoye', role: 'East Africa & the Gulf', base: 'Nairobi', since: '2016' },
  { name: 'Sofia Marín', role: 'The Americas', base: 'Melbourne', since: '2021' },
  { name: 'Ben Whitlock', role: 'On-trip concierge lead', base: 'Melbourne', since: '2015' },
]

export const testimonials = [
  {
    quote:
      'They moved our second night to a village nobody had suggested to us, and then explained exactly why in a paragraph. That paragraph turned out to be the whole holiday.',
    name: 'Eleanor & James Whitcombe',
    detail: 'The Slow North · fourteen nights in Japan',
  },
  {
    quote:
      'I have booked with the big names. The difference here is that a person read my email, remembered it a year later, and asked how my father was.',
    name: 'Dr. Meera Anand',
    detail: 'Follow the Herds · Tanzania & Kenya',
  },
  {
    quote:
      'Our flight was cancelled at eleven at night, Lisbon time. It was rebooked before we had finished reading the notification. Nobody woke us up about it.',
    name: 'Callum Reid',
    detail: 'Salt, Stone & Cypress · Italy',
  },
  {
    quote:
      'They talked us out of two destinations we had our hearts set on, and were completely right. That is the part you cannot buy anywhere else.',
    name: 'Nadia & Yusuf Karim',
    detail: 'Islands of the Aegean · Greece',
  },
]

export const journal = [
  {
    kicker: 'Field notes',
    title: 'The case for staying put',
    text: 'Why we stopped writing itineraries with more than five stops, and what happened to the reviews when we did.',
    date: 'June 2026',
    read: '6 min',
    image: '1441974231531-c6227db76b6e',
  },
  {
    kicker: 'Guides',
    title: 'Shoulder season, properly explained',
    text: 'The two-week windows either side of peak that almost nobody books — and the four places where they are genuinely better.',
    date: 'May 2026',
    read: '9 min',
    image: '1490750967868-88aa4486c946',
  },
  {
    kicker: 'Interview',
    title: 'Forty years on the same mountain',
    text: 'Pemba Sherpa has walked the Khumbu since 1984. We asked what has changed, and what has not.',
    date: 'April 2026',
    read: '12 min',
    image: '1519681393784-d120267933ba',
  },
]

export const faqs = [
  {
    q: 'What does a journey typically cost?',
    a: 'Most of our work sits between $6,000 and $15,000 per traveller, excluding international flights. The figure is driven by the length of the trip and how remote it gets, far more than by hotel category. We will give you an honest range in the first conversation, before you have committed to anything.',
  },
  {
    q: 'Do you charge a planning fee?',
    a: 'Yes — $600 per journey, credited in full against the trip if you go ahead. It exists so that we can spend forty hours on a proposal without needing you to book, and so that you are never being sold to.',
  },
  {
    q: 'How far ahead should we start?',
    a: 'Four to six months is comfortable. Nine months is better for Japan in blossom season, the Serengeti crossings, and anywhere with permit caps. We have also put together a very good three-week trip in eleven days, twice. It just costs more.',
  },
  {
    q: 'Can you work with a fixed budget?',
    a: 'Always, and we prefer it. Tell us the number and we will tell you plainly what it does and does not buy in that part of the world. If it does not buy a trip worth taking, we will say that too and suggest somewhere it does.',
  },
  {
    q: 'What happens if something goes wrong mid-trip?',
    a: 'One named person on our team holds your journey from departure to return, with a second as backup across time zones. They have the full document, the supplier contacts and the authority to spend money on your behalf without waiting for approval.',
  },
  {
    q: 'Do you book flights?',
    a: 'We book everything on the ground and will happily hold your international flights too. Many travellers prefer to use their own points — send us the routing and we will build the itinerary around it rather than the other way round.',
  },
]

export const pressLogos = ['Condé Nast Traveller', 'Monocle', 'The Gentlewoman', 'Kinfolk', 'Financial Times', 'Cereal']
