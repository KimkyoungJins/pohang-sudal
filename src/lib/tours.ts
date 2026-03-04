export interface Tour {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: number;
  groupSize: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  image: string;
  seasonal?: boolean;
  seasonalLabel?: string;
  availableMonths?: number[];
  availableDays?: number[];
}

export const tours: Tour[] = [
  {
    slug: "homigot-sunrise",
    title: "Homigot Sunrise Tour",
    subtitle: "Watch the first sunrise on the Korean Peninsula",
    description:
      "Experience the magic of dawn at Homigot, famous for being one of the first places in mainland Korea to see the sunrise. Visit the iconic Hand of Harmony sculpture, explore the Homigot Sunrise Square, and enjoy a traditional Korean breakfast by the sea. This early morning tour is perfect for photographers and anyone seeking a truly memorable Korean experience.",
    duration: "4 hours (5:00 AM - 9:00 AM)",
    price: 89,
    groupSize: "2-8 people",
    highlights: [
      "Iconic Hand of Harmony sculpture at sunrise",
      "Homigot Sunrise Square and lighthouse",
      "Traditional Korean breakfast at a local restaurant",
      "Photo opportunities with stunning coastal views",
      "Learn about the cultural significance of sunrise in Korea",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Traditional Korean breakfast",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Gratuities (optional)"],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Easy",
    image: "/images/homigot.jpg",
  },
  {
    slug: "seafood-market",
    title: "Pohang Seafood & Market Tour",
    subtitle: "Taste the freshest seafood at Jukdo Market",
    description:
      "Dive into Pohang's vibrant food culture at Jukdo Market, one of Korea's largest seafood markets. Sample the famous Pohang gwamegi (semi-dried fish), try fresh sashimi picked right from the tank, and learn how locals shop and eat. This tour is a feast for all senses and the perfect introduction to Korean seafood culture.",
    duration: "3.5 hours (10:00 AM - 1:30 PM)",
    price: 75,
    groupSize: "2-10 people",
    highlights: [
      "Jukdo Market - one of Korea's largest seafood markets",
      "Fresh sashimi tasting directly from market vendors",
      "Try Pohang's famous gwamegi (semi-dried Pacific saury)",
      "Learn about Korean seafood culture and market etiquette",
      "Visit the traditional section for dried goods and snacks",
    ],
    included: [
      "Licensed English-speaking guide",
      "Seafood tasting (sashimi, gwamegi, and more)",
      "Market snack samples",
      "Bottled water",
    ],
    notIncluded: [
      "Hotel transportation (meeting at market entrance)",
      "Additional food purchases",
      "Gratuities (optional)",
    ],
    meetingPoint: "Jukdo Market main entrance",
    difficulty: "Easy",
    image: "/images/jukdo-market.jpg",
  },
  {
    slug: "guryongpo-heritage",
    title: "Guryongpo Heritage Walk",
    subtitle: "Step back in time at a Japanese colonial village",
    description:
      "Explore the beautifully preserved Japanese-style houses of Guryongpo, a unique historical district that tells the story of the Japanese colonial period through architecture. Walk through narrow alleys lined with traditional wooden houses, visit the museum, and hear fascinating stories of the Korean and Japanese communities who lived here. End with fresh seafood at the nearby Guryongpo port.",
    duration: "5 hours (9:00 AM - 2:00 PM)",
    price: 95,
    groupSize: "2-8 people",
    highlights: [
      "Japanese Colonial-era street with preserved wooden houses",
      "Guryongpo Modern History Museum",
      "Scenic coastal walk along Guryongpo port",
      "Fresh seafood lunch at a local restaurant",
      "Stories of Korean-Japanese history and cultural exchange",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Museum entrance fee",
      "Seafood lunch",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Gratuities (optional)"],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Easy",
    image: "/images/guryongpo.jpg",
  },
  {
    slug: "temple-waterfall-hiking",
    title: "Temple & Waterfall Hiking",
    subtitle: "Bogyeongsa Temple and 12 waterfalls trail",
    description:
      "Combine Korean Buddhist culture with spectacular nature on this hiking tour. Start at the ancient Bogyeongsa Temple (built in 602 AD), then hike through a lush valley featuring 12 stunning waterfalls along the Naeyeonsan trail. This tour offers the perfect balance of cultural immersion and outdoor adventure, with breathtaking scenery at every turn.",
    duration: "7 hours (8:00 AM - 3:00 PM)",
    price: 120,
    groupSize: "2-6 people",
    highlights: [
      "Bogyeongsa Temple - 1,400+ years of history",
      "Naeyeonsan 12 Waterfalls trail",
      "Buddhist temple culture experience",
      "Stunning mountain and valley scenery",
      "Korean temple lunch (optional vegetarian available)",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Temple & park entrance fees",
      "Packed lunch and snacks",
      "Bottled water",
      "Hiking poles (if needed)",
    ],
    notIncluded: [
      "Hiking shoes (please bring your own)",
      "Gratuities (optional)",
    ],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Moderate",
    image: "/images/bogyeongsa.jpg",
  },
  {
    slug: "steel-city-ocean-view",
    title: "Steel City & Ocean View",
    subtitle: "POSCO industrial heritage meets coastal beauty",
    description:
      "Discover how Pohang transformed from a small fishing village into Korea's steel capital. Visit the POSCO area to learn about Korea's industrial miracle, then head to Hwanho Park for panoramic ocean views and the famous Space Walk sky bridge. This tour combines Korea's modern industrial story with stunning coastal scenery.",
    duration: "4.5 hours (1:00 PM - 5:30 PM)",
    price: 79,
    groupSize: "2-8 people",
    highlights: [
      "POSCO area and Korea's industrial revolution story",
      "Hwanho Park with panoramic East Sea views",
      "Space Walk - iconic sky bridge over the ocean",
      "Yeongildae Beach sunset (seasonal)",
      "Learn about Korea's rapid economic development",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Afternoon coffee/tea at a local café",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Gratuities (optional)"],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Easy",
    image: "/images/hwanho.jpg",
  },
  {
    slug: "winter-gwamegi",
    title: "Winter Gwamegi & Hot Springs Tour",
    subtitle: "Savor Pohang's iconic winter delicacy and warm up at local hot springs",
    description:
      "Winter in Pohang means gwamegi season — the city's signature semi-dried fish that's been a winter tradition for centuries. This tour takes you deep into Pohang's winter food culture, starting at Jukdo Market's gwamegi stalls where you'll learn to wrap and eat gwamegi like a local. Then warm up at a nearby hot springs spa (온천) to soak away the cold. End the day with a hearty seafood hotpot dinner overlooking the winter sea.",
    duration: "5 hours (11:00 AM - 4:00 PM)",
    price: 99,
    groupSize: "2-8 people",
    highlights: [
      "Gwamegi tasting at Jukdo Market with local expert",
      "Learn the traditional gwamegi preparation process",
      "Relaxing hot springs (온천) experience",
      "Hearty seafood hotpot dinner",
      "Winter coastal scenery and photo spots",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Gwamegi tasting platter",
      "Hot springs entrance fee",
      "Seafood hotpot dinner",
      "Bottled water and warm tea",
    ],
    notIncluded: [
      "Personal hot springs supplies (towel rental available)",
      "Gratuities (optional)",
    ],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Easy",
    image: "/images/gwamegi-winter.jpg",
    seasonal: true,
    seasonalLabel: "Winter Special",
    availableMonths: [11, 12, 1, 2],
    availableDays: [0, 2, 4, 6],
  },
  {
    slug: "spring-cherry-blossom",
    title: "Spring Cherry Blossom & Coastal Walk",
    subtitle: "Experience Pohang's stunning cherry blossom trails along the coast",
    description:
      "When spring arrives in Pohang, the city transforms into a pink wonderland. This tour follows the most beautiful cherry blossom routes in the city, from the tree-lined paths along Hyeongsangang River to the coastal cherry blossom roads near Yeongildae Beach. Enjoy a traditional Korean spring picnic under the blossoms, visit a local flower café, and capture unforgettable photos at the best cherry blossom spots that only locals know about.",
    duration: "4.5 hours (9:30 AM - 2:00 PM)",
    price: 85,
    groupSize: "2-10 people",
    highlights: [
      "Hyeongsangang River cherry blossom path",
      "Yeongildae coastal cherry blossom road",
      "Traditional Korean spring picnic (도시락)",
      "Hidden local flower café visit",
      "Best photography spots for cherry blossoms",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Korean spring picnic lunch (도시락)",
      "Café drink included",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Gratuities (optional)"],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Easy",
    image: "/images/cherry-blossom.jpg",
    seasonal: true,
    seasonalLabel: "Spring Special",
    availableMonths: [3, 4],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    slug: "summer-beach-adventure",
    title: "Summer Beach & Water Sports Adventure",
    subtitle: "Dive into Pohang's best beaches with snorkeling and kayaking",
    description:
      "Summer is the perfect time to experience Pohang's stunning coastline up close. This action-packed tour takes you to the city's best beaches for swimming, snorkeling, and sea kayaking. Start at Wolpo Beach for calm-water snorkeling where you can see colorful sea life, then head to Yeongildae Beach for sea kayaking with panoramic views of the coastline. Cool down with Korean shaved ice (빙수) and end the day watching the sunset at a beachside restaurant with fresh seafood.",
    duration: "6 hours (10:00 AM - 4:00 PM)",
    price: 110,
    groupSize: "2-6 people",
    highlights: [
      "Snorkeling at Wolpo Beach with equipment provided",
      "Sea kayaking at Yeongildae Beach",
      "Korean shaved ice (빙수) at a beachside café",
      "Fresh seafood lunch by the ocean",
      "Stunning summer coastal scenery",
    ],
    included: [
      "Hotel pickup & drop-off in Pohang",
      "Licensed English-speaking guide",
      "Snorkeling equipment rental",
      "Kayak rental and safety gear",
      "Seafood lunch",
      "Korean shaved ice dessert",
      "Bottled water",
    ],
    notIncluded: [
      "Swimwear (please bring your own)",
      "Waterproof phone case",
      "Gratuities (optional)",
    ],
    meetingPoint: "Hotel pickup available in central Pohang",
    difficulty: "Moderate",
    image: "/images/summer-beach.jpg",
    seasonal: true,
    seasonalLabel: "Summer Special",
    availableMonths: [6, 7, 8],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
