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
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
