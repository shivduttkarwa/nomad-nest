export type Region = 'Europe' | 'Asia Pacific' | 'The Americas' | 'Africa & Arabia'

export type Destination = {
  slug: string
  name: string
  country: string
  region: Region
  coords: string
  tagline: string
  excerpt: string
  /** Unsplash photo id (without the `photo-` prefix) */
  image: string
  orientation: 'landscape' | 'portrait'
  season: string
  nights: number
  from: number
  tags: string[]
  featured?: boolean
}

export const REGIONS: Region[] = ['Europe', 'Asia Pacific', 'The Americas', 'Africa & Arabia']

export const destinations: Destination[] = [
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia Pacific',
    coords: '35.0116° N / 135.7681° E',
    tagline: 'Seven hundred temples and one perfect bowl of tea',
    excerpt:
      "We time Kyoto to the shoulder weeks — when the Higashiyama lanes empty at dusk and the machiya kitchens open their sliding doors to eight guests at a time.",
    image: '1493976040374-85c8e12f0c0e',
    orientation: 'landscape',
    season: 'Late Mar – Apr · Nov',
    nights: 9,
    from: 8400,
    tags: ['Culture', 'Food', 'Slow travel'],
    featured: true,
  },
  {
    slug: 'dolomites',
    name: 'The Dolomites',
    country: 'Italy',
    region: 'Europe',
    coords: '46.6942° N / 12.1219° E',
    tagline: 'Limestone cathedrals above a lake the colour of glass',
    excerpt:
      'Rifugio to rifugio on foot, with your bags moved ahead by a driver who knows every switchback. Lago di Braies at six in the morning, before the first bus.',
    image: '1501785888041-af3ef285b470',
    orientation: 'landscape',
    season: 'Jun – Sep',
    nights: 7,
    from: 6200,
    tags: ['Hiking', 'Mountains', 'Design hotels'],
    featured: true,
  },
  {
    slug: 'serengeti',
    name: 'Serengeti',
    country: 'Tanzania',
    region: 'Africa & Arabia',
    coords: '2.3333° S / 34.8333° E',
    tagline: 'The oldest migration on earth, watched from a canvas chair',
    excerpt:
      'Mobile camps that follow the herds rather than wait for them — six tents, one guide per vehicle, and the river crossings timed to the week, not the month.',
    image: '1516426122078-c23e76319801',
    orientation: 'landscape',
    season: 'Jun – Oct · Jan – Feb',
    nights: 8,
    from: 14800,
    tags: ['Safari', 'Wildlife', 'Private guide'],
    featured: true,
  },
  {
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    coords: '36.4618° N / 25.3753° E',
    tagline: 'A caldera at golden hour, minus the cruise ships',
    excerpt:
      'We put you in Imerovigli rather than Oia, and hand you a boat at four — so the famous sunset arrives from the water, with nobody else in the frame.',
    image: '1530841377377-3ff06c0ca713',
    orientation: 'landscape',
    season: 'May – Jun · Sep – Oct',
    nights: 6,
    from: 5400,
    tags: ['Coastal', 'Islands', 'Romance'],
    featured: true,
  },
  {
    slug: 'isle-of-skye',
    name: 'Isle of Skye',
    country: 'Scotland',
    region: 'Europe',
    coords: '57.2736° N / 6.2155° W',
    tagline: 'Weather as the main event',
    excerpt:
      "The Quiraing before breakfast, a distillery at Carbost after, and a stone cottage with the fire already lit. Bring the wrong coat and we'll replace it.",
    image: '1470071459604-3b5ec3a7fe05',
    orientation: 'landscape',
    season: 'May – Sep',
    nights: 5,
    from: 4100,
    tags: ['Wild', 'Road trip', 'Whisky'],
  },
  {
    slug: 'val-dorcia',
    name: "Val d'Orcia",
    country: 'Italy',
    region: 'Europe',
    coords: '43.0678° N / 11.6156° E',
    tagline: 'Cypress roads, a borrowed kitchen, no schedule',
    excerpt:
      "Three nights in a restored podere outside Pienza, a pasta morning with Marta, and the Brunello cellars that don't take walk-ins.",
    image: '1518098268026-4e89f1a2cd8e',
    orientation: 'landscape',
    season: 'Apr – Jun · Sep – Oct',
    nights: 7,
    from: 5900,
    tags: ['Food & wine', 'Countryside', 'Family'],
    featured: true,
  },
  {
    slug: 'cinque-terre',
    name: 'Cinque Terre',
    country: 'Italy',
    region: 'Europe',
    coords: '44.1461° N / 9.6539° E',
    tagline: 'Five villages, one coastal path, zero cars',
    excerpt:
      'Manarola from the sea at dusk, the Sentiero Azzurro walked north to south while the light is behind you, and the anchovy table locals keep to themselves.',
    image: '1516483638261-f4dbaf036963',
    orientation: 'portrait',
    season: 'May – Jun · Sep',
    nights: 5,
    from: 4300,
    tags: ['Coastal', 'Walking', 'Food'],
  },
  {
    slug: 'khumbu',
    name: 'Khumbu Valley',
    country: 'Nepal',
    region: 'Asia Pacific',
    coords: '27.8064° N / 86.7139° E',
    tagline: 'Everest at eye level, at your own pace',
    excerpt:
      'Twelve days to Tengboche and back with two acclimatisation days built in, Sherpa-owned lodges throughout, and a satellite line home every evening.',
    image: '1544735716-392fe2489ffa',
    orientation: 'landscape',
    season: 'Mar – May · Oct – Nov',
    nights: 12,
    from: 7600,
    tags: ['Trekking', 'High altitude', 'Small group'],
  },
  {
    slug: 'railay',
    name: 'Railay & Krabi',
    country: 'Thailand',
    region: 'Asia Pacific',
    coords: '8.0863° N / 98.8378° E',
    tagline: "Limestone towers and a longtail that's yours for the week",
    excerpt:
      'Beaches reachable only by boat, a climbing guide if you want one, and the quietest corners of the Andaman reached long before the day-trippers wake.',
    image: '1552465011-b4e21bf6e79a',
    orientation: 'landscape',
    season: 'Nov – Mar',
    nights: 8,
    from: 5200,
    tags: ['Beach', 'Islands', 'Adventure'],
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    coords: '35.6762° N / 139.6503° E',
    tagline: 'Ten million people and a river of blossom at midnight',
    excerpt:
      'Meguro under sakura at eleven at night, a six-seat sushi counter in Yotsuya, and a fixer on call who can open doors that carry no sign at all.',
    image: '1524413840807-0c3cb6fa808d',
    orientation: 'landscape',
    season: 'Late Mar – Apr · Oct – Nov',
    nights: 6,
    from: 6800,
    tags: ['City', 'Food', 'Design'],
  },
  {
    slug: 'sydney',
    name: 'Sydney & the South Coast',
    country: 'Australia',
    region: 'Asia Pacific',
    coords: '33.8688° S / 151.2093° E',
    tagline: 'Harbour city, then three hundred kilometres of empty coast',
    excerpt:
      'Two nights on the water, then south to Jervis Bay — sea caves, sand white enough to squeak underfoot, and oyster leases visited by tender at slack tide.',
    image: '1523482580672-f109ba8cb9be',
    orientation: 'landscape',
    season: 'Oct – Apr',
    nights: 9,
    from: 7200,
    tags: ['City', 'Coastal', 'Food'],
  },
  {
    slug: 'sacred-valley',
    name: 'Sacred Valley',
    country: 'Peru',
    region: 'The Americas',
    coords: '13.1631° S / 72.5450° W',
    tagline: 'Machu Picchu on the first train, not the fifth',
    excerpt:
      "Three nights acclimatising in the valley before the citadel, a weavers' cooperative above Chinchero, and the Huayna Picchu permit already in your name.",
    image: '1526392060635-9d6019884377',
    orientation: 'landscape',
    season: 'Apr – Oct',
    nights: 10,
    from: 8900,
    tags: ['Ruins', 'Culture', 'Altitude'],
    featured: true,
  },
  {
    slug: 'banff',
    name: 'Banff & Moraine',
    country: 'Canada',
    region: 'The Americas',
    coords: '51.3217° N / 116.1860° W',
    tagline: 'Alpenglow on ten peaks, reflected twice',
    excerpt:
      'A four-in-the-morning shuttle permit for Moraine, a canoe held in your name on Lake Louise, and larch season timed to the fortnight it actually turns.',
    image: '1493246507139-91e8fad9978e',
    orientation: 'landscape',
    season: 'Jun – Oct',
    nights: 7,
    from: 6600,
    tags: ['Mountains', 'Lakes', 'Photography'],
  },
  {
    slug: 'big-sur',
    name: 'Big Sur',
    country: 'United States',
    region: 'The Americas',
    coords: '36.2704° N / 121.8081° W',
    tagline: 'Ninety miles of highway and nowhere in particular to be',
    excerpt:
      'McWay Falls at low tide, a cliff-edge room with no television in it, and dinner at a redwood table that happens to seat fourteen strangers.',
    image: '1510414842594-a61c69b5ae57',
    orientation: 'landscape',
    season: 'Sep – Nov · Apr – May',
    nights: 5,
    from: 5800,
    tags: ['Road trip', 'Coastal', 'Design hotels'],
  },
  {
    slug: 'amboseli',
    name: 'Amboseli & Tsavo',
    country: 'Kenya',
    region: 'Africa & Arabia',
    coords: '2.6527° S / 37.2606° E',
    tagline: 'Acacia shade, and elephants that have known this ground sixty years',
    excerpt:
      'Conservancy camps where the vehicle count is capped, walking safaris led by Maasai guides, and Kilimanjaro clear at dawn more often than not.',
    image: '1547471080-7cc2caa01a7e',
    orientation: 'landscape',
    season: 'Jun – Oct · Jan – Mar',
    nights: 7,
    from: 11400,
    tags: ['Safari', 'Wildlife', 'Conservation'],
  },
  {
    slug: 'dubai-hajar',
    name: 'Dubai & Al Hajar',
    country: 'United Arab Emirates',
    region: 'Africa & Arabia',
    coords: '25.2048° N / 55.2708° E',
    tagline: 'A skyline for two nights, then silence for three',
    excerpt:
      'The city entirely on your terms — private observatory hours, a tasting menu at altitude — then the Hajar range, where the only sound is goats on loose shale.',
    image: '1512453979798-5ea266f8880c',
    orientation: 'landscape',
    season: 'Nov – Mar',
    nights: 6,
    from: 6900,
    tags: ['City', 'Desert', 'Luxury'],
  },
]

export const featuredDestinations = destinations.filter((d) => d.featured)
