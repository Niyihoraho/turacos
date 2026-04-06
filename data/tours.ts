export interface Tour {
  slug: string;
  title: string;
  location: string;
  image: string;
  gallery: string[];
  description: string;
  duration: string;
  difficulty: string;
  price: string;
  highlights: string[];
  includes: string[];
  contactMessage: string;
}

export const tours: Tour[] = [
  {
    slug: 'gorilla-trekking',
    title: 'Gorilla Trekking',
    location: 'Volcanoes National Park',
    image: '/images/gorilla-tour.png',
    gallery: ['/images/gorilla-tour.png', '/images/landscapes-rwanda.png'],
    description:
      'Experience Rwanda\'s most iconic wildlife encounter with a guided trek through the bamboo forests of Volcanoes National Park. This journey blends conservation, culture, and a once-in-a-lifetime hour with mountain gorillas in their natural habitat.',
    duration: '3-7 Days',
    difficulty: 'Moderate',
    price: 'From $2,450 per person',
    highlights: [
      'Guided gorilla tracking permit assistance',
      'Scenic stay near the Virunga foothills',
      'Community and cultural visit options',
      'Private transport with expert local guide',
    ],
    includes: [
      'Airport pickup and drop-off',
      'Accommodation and daily breakfast',
      '4x4 transportation during the tour',
      'Professional English-speaking guide',
    ],
    contactMessage: 'Hello Turacos Tours, I would like to book the Gorilla Trekking package.',
  },
  {
    slug: 'mountain-hiking',
    title: 'Mountain Hiking',
    location: 'Virunga Volcanic Range',
    image: '/images/hiking-tour.png',
    gallery: ['/images/hiking-tour.png', '/images/landscapes-rwanda.png'],
    description:
      'Explore Rwanda\'s dramatic volcanic landscapes on a highland adventure built for travelers who love altitude, panoramic views, and active days outdoors. From crater rims to mist-filled valleys, every step reveals a new side of the country.',
    duration: '2-5 Days',
    difficulty: 'Challenging',
    price: 'From $1,320 per person',
    highlights: [
      'Summit hikes with panoramic valley views',
      'Experienced trekking guides and porters',
      'Sunrise and sunset photography moments',
      'Flexible routes for different fitness levels',
    ],
    includes: [
      'Trail transfers and logistics support',
      'Accommodation near the hiking base',
      'Packed lunch on hiking days',
      'Safety briefing and local ranger guidance',
    ],
    contactMessage: 'Hello Turacos Tours, I want more details about the Mountain Hiking package.',
  },
  {
    slug: 'chimpanzee-tracking',
    title: 'Chimpanzee Tracking',
    location: 'Nyungwe National Park',
    image: '/images/wildlife-rwanda.png',
    gallery: ['/images/wildlife-rwanda.png', '/images/landscapes-rwanda.png'],
    description:
      'Head into the ancient rainforest of Nyungwe for a vibrant primate experience where birdsong, waterfalls, and forest canopies frame the search for wild chimpanzees. This tour is perfect for nature lovers who want rich biodiversity and immersive forest moments.',
    duration: '2-5 Days',
    difficulty: 'Moderate',
    price: 'From $1,680 per person',
    highlights: [
      'Early morning chimpanzee tracking',
      'Canopy walk above the rainforest',
      'Birding and primate observation stops',
      'Optional tea plantation experience',
    ],
    includes: [
      'Park activity coordination',
      'Lodge stay and breakfast',
      'Private road transfers',
      'Guide support throughout the itinerary',
    ],
    contactMessage: 'Hello Turacos Tours, please share the itinerary for the Chimpanzee Tracking package.',
  },
  {
    slug: 'big-five-safari',
    title: 'Big Five Safari',
    location: 'Akagera National Park',
    image: '/images/landscapes-rwanda.png',
    gallery: ['/images/landscapes-rwanda.png', '/images/wildlife-rwanda.png'],
    description:
      'Discover Rwanda\'s savannah side with game drives across Akagera National Park, where rolling plains, lakes, and acacia landscapes create the perfect backdrop for spotting the Big Five. Ideal for travelers seeking classic safari energy with boutique comfort.',
    duration: '2-4 Days',
    difficulty: 'Easy',
    price: 'From $1,150 per person',
    highlights: [
      'Morning and sunset game drives',
      'Boat safari on Lake Ihema',
      'Big Five wildlife viewing opportunities',
      'Comfortable safari lodge options',
    ],
    includes: [
      'Park entry planning support',
      'Game drive vehicle and driver-guide',
      'Accommodation and selected meals',
      'Bottled water during excursions',
    ],
    contactMessage: 'Hello Turacos Tours, I am interested in the Big Five Safari package.',
  },
];

export const getTourBySlug = (slug: string) =>
  tours.find((tour) => tour.slug === slug);
