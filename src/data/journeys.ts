export type Pace = 'Gentle' | 'Balanced' | 'Active'

export type Journey = {
  slug: string
  index: string
  title: string
  subtitle: string
  places: string
  nights: number
  from: number
  pace: Pace
  party: string
  image: string
  summary: string
  highlights: string[]
  days: { span: string; title: string; text: string }[]
  includes: string[]
  featured?: boolean
}

export const PACES: Pace[] = ['Gentle', 'Balanced', 'Active']

export const journeys: Journey[] = [
  {
    slug: 'the-slow-north',
    index: '01',
    title: 'The Slow North',
    subtitle: 'Kyoto · Kanazawa · the Noto coast · Tokyo',
    places: 'Japan',
    nights: 14,
    from: 12400,
    pace: 'Gentle',
    party: '2 – 6 travellers',
    image: '1493976040374-85c8e12f0c0e',
    summary:
      'Fourteen nights moving north with the season. Two ryokan, one farmhouse, one design hotel, and a great deal of walking with no particular destination.',
    highlights: [
      'Dawn at Fushimi Inari, an hour before the gates fill',
      'A private tea ceremony in a 200-year-old machiya',
      'Kanazawa gold-leaf workshop with a fourth-generation maker',
      'Two nights on the Noto peninsula, in a house with no wifi',
      'Sushi at a six-seat counter, ordered on your behalf months ahead',
    ],
    days: [
      {
        span: 'Nights 1 – 4',
        title: 'Kyoto',
        text: 'You land in Osaka and are driven straight to Higashiyama. The first morning is deliberately empty. From there: Nanzen-ji at opening, a kaiseki lunch in Gion, and an afternoon in the Philosopher\'s Path with nothing scheduled after it.',
      },
      {
        span: 'Nights 5 – 6',
        title: 'Kurama & Kibune',
        text: 'A short train north into the cedar. Onsen bathing, a river-terrace dinner in summer or a kotatsu in autumn, and the mountain trail between the two shrines walked at whatever pace suits.',
      },
      {
        span: 'Nights 7 – 9',
        title: 'Kanazawa',
        text: 'Thunderbird express along the Sea of Japan. Kenroku-en before the coaches, the Omicho fish market at seven, and an afternoon with a gold-leaf artisan whose family has worked the same room since 1892.',
      },
      {
        span: 'Nights 10 – 11',
        title: 'The Noto Peninsula',
        text: 'The quietest stretch of the trip. A restored farmhouse above terraced rice fields, salt harvested by hand on the coast below, and dinner cooked by the couple who own the house.',
      },
      {
        span: 'Nights 12 – 14',
        title: 'Tokyo',
        text: 'Shinkansen south. A room high above Nihonbashi, a fixer on call, and three evenings arranged around whatever you have developed an appetite for. We leave the last day entirely open — most people want it.',
      },
    ],
    includes: [
      'All internal rail, including reserved Green Car seats',
      'Private transfers on arrival and departure',
      'Thirteen dinners, eight of them booked before you ask',
      'A local guide in each city, never a group',
      'A pocket concierge line, answered in under ten minutes',
    ],
    featured: true,
  },
  {
    slug: 'salt-stone-cypress',
    index: '02',
    title: 'Salt, Stone & Cypress',
    subtitle: 'The Dolomites · Val d\'Orcia · the Ligurian coast',
    places: 'Italy',
    nights: 12,
    from: 10800,
    pace: 'Balanced',
    party: '2 – 8 travellers',
    image: '1518098268026-4e89f1a2cd8e',
    summary:
      'North to south down the spine of Italy — three landscapes, three kitchens, and a car you only drive when you feel like it.',
    highlights: [
      'Lago di Braies at 6am, boat included, before the first bus',
      'A hut-to-hut day on the Alta Via 1 with your bags moved ahead',
      'Pasta with Marta in her own kitchen outside Pienza',
      'Two Brunello cellars that do not take walk-ins',
      'Manarola from the water at dusk, with a bottle of Sciacchetrà',
    ],
    days: [
      {
        span: 'Nights 1 – 4',
        title: 'Alta Badia & Braies',
        text: 'A driver from Venice, then four nights under the Sella massif. One long walking day, one gentle one, and a morning on the lake before anybody else is awake.',
      },
      {
        span: 'Nights 5 – 8',
        title: "Val d'Orcia",
        text: 'South through Emilia with a lunch stop in Modena. A restored podere with a pool nobody else uses, cypress roads at golden hour, and the market at Pienza on Friday.',
      },
      {
        span: 'Nights 9 – 12',
        title: 'Cinque Terre & Portovenere',
        text: 'The Sentiero Azzurro walked north to south so the light stays behind you, an afternoon boat down the coast, and the last two nights in Portovenere where the villages are close but the noise is not.',
      },
    ],
    includes: [
      'Private driver for all inter-region transfers',
      'A hire car for six of the twelve days, should you want it',
      'Luggage moved ahead on every walking day',
      'Cellar visits, cooking morning, and the private boat',
      'Breakfast daily and seven dinners',
    ],
    featured: true,
  },
  {
    slug: 'follow-the-herds',
    index: '03',
    title: 'Follow the Herds',
    subtitle: 'Serengeti · Ngorongoro · Amboseli',
    places: 'Tanzania & Kenya',
    nights: 11,
    from: 21600,
    pace: 'Balanced',
    party: '2 – 6 travellers',
    image: '1516426122078-c23e76319801',
    summary:
      'A mobile camp that moves with the migration rather than waiting for it, one guide to your vehicle, and eleven nights of very early mornings.',
    highlights: [
      'Six-tent mobile camp, repositioned to the herds each fortnight',
      'A river crossing timed to the week, not the month',
      'Walking safari with Maasai guides in a private conservancy',
      'Balloon over the short-grass plains at first light',
      'Kilimanjaro from Amboseli, clear at dawn more often than not',
    ],
    days: [
      {
        span: 'Nights 1 – 2',
        title: 'Ngorongoro Highlands',
        text: 'Into Kilimanjaro, then a forest lodge on the crater rim. The descent onto the floor happens at opening, with a packed breakfast eaten beside a hippo pool.',
      },
      {
        span: 'Nights 3 – 7',
        title: 'Serengeti — mobile camp',
        text: 'Five nights under canvas wherever the herds happen to be. Long game drives, an afternoon on foot, and dinner outdoors with a lamp on the table and very little else.',
      },
      {
        span: 'Nights 8 – 11',
        title: 'Amboseli & the Chyulu Hills',
        text: 'A light aircraft north across the border. Elephant families that researchers have followed for six decades, capped vehicle numbers, and the mountain doing what it does at six in the morning.',
      },
    ],
    includes: [
      'All light-aircraft transfers and park fees',
      'Private vehicle and guide throughout — never shared',
      'Full board, including all drinks at camp',
      'Conservancy and community levies paid in full',
      'Emergency evacuation cover for every traveller',
    ],
  },
  {
    slug: 'thin-air',
    index: '04',
    title: 'Thin Air',
    subtitle: 'Kathmandu · Namche · Tengboche · Khumjung',
    places: 'Nepal',
    nights: 15,
    from: 9800,
    pace: 'Active',
    party: '4 – 10 travellers',
    image: '1544735716-392fe2489ffa',
    summary:
      'Fifteen nights in the Khumbu, paced for people who would rather arrive well than arrive first. Two acclimatisation days are non-negotiable.',
    highlights: [
      'Sherpa-owned lodges for every night on the trail',
      'Two full acclimatisation days built into the schedule',
      'Tengboche monastery at morning prayers',
      'A rest day at Khumjung with the school and the hospital',
      'Porter loads capped and weighed daily, without exception',
    ],
    days: [
      {
        span: 'Nights 1 – 2',
        title: 'Kathmandu',
        text: 'Patan Durbar Square, a Newari kitchen, and a full kit check with your guide. Anything missing is sourced the same afternoon.',
      },
      {
        span: 'Nights 3 – 6',
        title: 'Lukla to Namche',
        text: 'The flight in, then two walking days along the Dudh Kosi. Namche at 3,440 metres, where you stop for a full day whether you feel you need it or not.',
      },
      {
        span: 'Nights 7 – 11',
        title: 'Tengboche & Khumjung',
        text: 'The high point of the route, and the quiet centre of it. Morning prayers at the monastery, a second rest day, and Ama Dablam in view for most of the week.',
      },
      {
        span: 'Nights 12 – 15',
        title: 'Descent & Kathmandu',
        text: 'Down through rhododendron forest, out on the morning flight, and two nights back in the city with a hot bath and nothing at all in the diary.',
      },
    ],
    includes: [
      'All permits, TIMS cards and national park fees',
      'One guide per four travellers, plus porters',
      'Pulse oximetry twice daily and a satellite phone',
      'Helicopter evacuation cover',
      'Full board on the trail, breakfast in Kathmandu',
    ],
  },
  {
    slug: 'the-long-coast',
    index: '05',
    title: 'The Long Coast',
    subtitle: 'Carmel · Big Sur · Santa Lucia · Point Reyes',
    places: 'California',
    nights: 9,
    from: 8600,
    pace: 'Gentle',
    party: '2 – 4 travellers',
    image: '1510414842594-a61c69b5ae57',
    summary:
      'Nine nights, one convertible, and ninety miles of highway with almost nothing on the schedule. The point is the driving.',
    highlights: [
      'McWay Falls timed to low tide and low traffic',
      'A cliff-edge room with no television in it',
      'Dinner at a redwood table seating fourteen strangers',
      'Elephant seals at Piedras Blancas during the winter haul-out',
      'Two nights in Point Reyes, where the fog does the work',
    ],
    days: [
      {
        span: 'Nights 1 – 2',
        title: 'Carmel-by-the-Sea',
        text: 'Collected from San Francisco and driven down. A cottage two streets from the water, an afternoon at Point Lobos, and an early night — the drive south starts at six.',
      },
      {
        span: 'Nights 3 – 6',
        title: 'Big Sur',
        text: 'Four nights on the cliff. Bixby at dawn, the Santa Lucia range on foot, and long stretches where the only instruction is to pull over when something looks good.',
      },
      {
        span: 'Nights 7 – 9',
        title: 'North to Point Reyes',
        text: 'Back up through the city and over the bridge. Oysters at Tomales Bay, the lighthouse stairs, and a last night at a ranch house where dinner is whatever came out of the garden.',
      },
    ],
    includes: [
      'Convertible hire for the full nine days, insurance included',
      'All accommodation, chosen for the view rather than the brand',
      'Restaurant reservations held in your name',
      'A curated 200-track drive playlist, sequenced to the route',
      'Breakfast daily and four dinners',
    ],
  },
  {
    slug: 'islands-of-the-aegean',
    index: '06',
    title: 'Islands of the Aegean',
    subtitle: 'Santorini · Folegandros · Milos · Sifnos',
    places: 'Greece',
    nights: 10,
    from: 9200,
    pace: 'Gentle',
    party: '2 – 8 travellers',
    image: '1530841377377-3ff06c0ca713',
    summary:
      'One famous island, three that are not, and a skippered boat between them so the ferry timetable never gets a say.',
    highlights: [
      'The caldera sunset watched from the water, not the wall',
      'A skippered forty-foot boat for six of the ten days',
      'Folegandros in the off-week, when the chora is entirely local',
      'Sarakiniko at first light, before the colour burns out',
      'A pottery afternoon in Sifnos with a third-generation maker',
    ],
    days: [
      {
        span: 'Nights 1 – 3',
        title: 'Santorini',
        text: 'Imerovigli rather than Oia, so the walk to dinner is downhill and the noise stays elsewhere. A boat at four on the second afternoon.',
      },
      {
        span: 'Nights 4 – 5',
        title: 'Folegandros',
        text: 'The smallest stop and the best one. A cliff-top chora, a beach reached only on foot, and dinner at the same taverna both nights because you will want to.',
      },
      {
        span: 'Nights 6 – 8',
        title: 'Milos',
        text: 'Sarakiniko before the light goes hard, Kleftiko from the sea, and a fisherman\'s house at Klima with the door opening onto the water.',
      },
      {
        span: 'Nights 9 – 10',
        title: 'Sifnos',
        text: 'The kitchen island. A pottery afternoon, a long lunch in Kastro, and a last swim before the morning ferry back to Athens.',
      },
    ],
    includes: [
      'Skippered boat for six days, fuel and crew included',
      'All island transfers and the return to Athens',
      'Breakfast daily and six dinners',
      'A swimming guide to every beach worth the walk',
      'Flexible re-routing if the meltemi has other ideas',
    ],
    featured: true,
  },
]

export const featuredJourneys = journeys.filter((j) => j.featured)
