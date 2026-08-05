export type LegalDoc = {
  slug: string
  title: string
  updated: string
  intro: string
  sections: { heading: string; body: string[] }[]
}

export const legal: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy',
    updated: 'Updated March 2026',
    intro:
      'We collect the least we can get away with, keep it only as long as it is useful to you, and never sell it. This page says exactly what that means in practice.',
    sections: [
      {
        heading: 'What we hold',
        body: [
          'When you send an enquiry we keep your name, email, telephone number if you gave one, and whatever you wrote in the form. If you go on to travel with us we also hold passport details, dietary and medical notes you choose to share, and the documents that make up your itinerary.',
          'We do not run advertising trackers. The site records no analytics cookies and sets nothing on your device beyond what is needed to display the page.',
        ],
      },
      {
        heading: 'Why we hold it',
        body: [
          'To write and run your journey, and to answer you when you write back. Medical and dietary notes go only to the specific hotel, guide or operator who needs them, and only for the dates you are with them.',
          'We do not build profiles, score you, or feed anything you tell us into automated decision-making.',
        ],
      },
      {
        heading: 'How long',
        body: [
          'Enquiries that do not become bookings are deleted after two years. Booking records are kept for seven years because our accountants and our insurers require it. Passport scans are deleted within thirty days of your return.',
        ],
      },
      {
        heading: 'Your say',
        body: [
          'Write to us and we will send you everything we hold on you, correct anything wrong, or delete the lot — whichever you ask for, within thirty days and at no cost.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms',
    updated: 'Updated March 2026',
    intro:
      'The plain-language version of what you are agreeing to when you work with us. Nothing here is a substitute for the booking conditions attached to your proposal, which are the binding document.',
    sections: [
      {
        heading: 'What we are',
        body: [
          'Nomad & Nest Pty Ltd is a travel designer, ATAS accredited A10482. We plan journeys and book the elements of them on your behalf. We are not the airline, hotel, guide or operator delivering any part of your trip.',
        ],
      },
      {
        heading: 'The planning fee',
        body: [
          'A planning fee of $600 is payable before we begin writing. It is credited in full against the journey if you go on to book. It is not refundable if you do not, because it pays for work already done.',
        ],
      },
      {
        heading: 'What we promise',
        body: [
          'To tell you honestly whether we are the right studio for the trip you have in mind, before you pay us anything. To publish the margin we make in your proposal. To take no commission from any hotel, guide or supplier we recommend.',
        ],
      },
      {
        heading: 'What we cannot promise',
        body: [
          'Weather, wildlife, strikes, volcanoes and the decisions of border officials. Where these affect your journey we will rearrange it as far as we are able, and we will tell you immediately rather than hoping you do not notice.',
        ],
      },
    ],
  },
  {
    slug: 'booking-conditions',
    title: 'Booking conditions',
    updated: 'Updated March 2026',
    intro:
      'Deposits, balances, changes and cancellations. These are the conditions attached to every proposal we send; the version in your signed proposal governs your booking.',
    sections: [
      {
        heading: 'Deposit and balance',
        body: [
          'A deposit of 25% confirms your journey and releases us to hold rooms, guides and internal flights in your name. The balance falls due sixty days before departure. Bookings made inside sixty days are payable in full at confirmation.',
        ],
      },
      {
        heading: 'If you change your mind',
        body: [
          'More than ninety days out, the deposit is transferable to another date within eighteen months. Between ninety and sixty days the deposit is retained. Inside sixty days, cancellation charges follow the terms of the individual suppliers, which we will always show you in full rather than summarising.',
        ],
      },
      {
        heading: 'If we change the journey',
        body: [
          'We will tell you the same day. Where a change is material — a different property, a lost night, a route we can no longer run — you may accept the alternative, take a credit, or cancel for a full refund of everything not already spent with suppliers on your behalf.',
        ],
      },
      {
        heading: 'Insurance',
        body: [
          'Comprehensive travel insurance covering medical repatriation is a condition of travelling with us. We will ask to see it before departure. We do not sell insurance and take nothing from anyone who does.',
        ],
      },
    ],
  },
]

export const findLegal = (slug?: string) => legal.find((d) => d.slug === slug)
