export interface TourStop {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export interface TourRoute {
  slug: string;
  center: { lat: number; lng: number };
  zoom: number;
  stops: TourStop[];
}

export const tourRoutes: TourRoute[] = [
  {
    slug: "homigot-sunrise",
    center: { lat: 36.076, lng: 129.568 },
    zoom: 13,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Homigot Sunrise Square", lat: 36.076, lng: 129.568, description: "Main sunrise viewing area" },
      { name: "Hand of Harmony", lat: 36.077, lng: 129.572, description: "Iconic sculpture — the main photo spot" },
      { name: "Homigot Lighthouse", lat: 36.079, lng: 129.566, description: "Historic lighthouse with panoramic views" },
      { name: "Sunrise Market Breakfast", lat: 36.074, lng: 129.565, description: "Traditional Korean breakfast spot" },
    ],
  },
  {
    slug: "seafood-market",
    center: { lat: 36.032, lng: 129.365 },
    zoom: 15,
    stops: [
      { name: "Jukdo Market Entrance", lat: 36.032, lng: 129.365, description: "Main entrance — meeting point" },
      { name: "Fresh Fish Section", lat: 36.033, lng: 129.366, description: "Live fish tanks — choose your sashimi" },
      { name: "Gwamegi Stalls", lat: 36.031, lng: 129.364, description: "Pohang's signature dried fish" },
      { name: "2F Eating Area", lat: 36.032, lng: 129.367, description: "Upstairs seating — your fish prepared here" },
      { name: "Street Food Corner", lat: 36.030, lng: 129.363, description: "Tteokbokki, hotteok, and more" },
    ],
  },
  {
    slug: "guryongpo-heritage",
    center: { lat: 35.987, lng: 129.558 },
    zoom: 14,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Guryongpo Japanese Village", lat: 35.987, lng: 129.558, description: "Preserved colonial-era wooden houses" },
      { name: "Modern History Museum", lat: 35.988, lng: 129.559, description: "Museum about Korean-Japanese history" },
      { name: "Guryongpo Port", lat: 35.985, lng: 129.562, description: "Scenic fishing port walk" },
      { name: "Seafood Restaurant", lat: 35.986, lng: 129.560, description: "Fresh seafood lunch by the port" },
    ],
  },
  {
    slug: "temple-waterfall-hiking",
    center: { lat: 36.172, lng: 129.318 },
    zoom: 13,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Bogyeongsa Temple", lat: 36.172, lng: 129.318, description: "Ancient temple built in 602 AD" },
      { name: "First Waterfall", lat: 36.175, lng: 129.315, description: "Ssangsaeng Falls — first of 12 waterfalls" },
      { name: "Yeonsan Falls", lat: 36.180, lng: 129.310, description: "Most spectacular waterfall on the trail" },
      { name: "Summit Viewpoint", lat: 36.185, lng: 129.305, description: "Mountain panorama rest stop" },
    ],
  },
  {
    slug: "steel-city-ocean-view",
    center: { lat: 36.030, lng: 129.370 },
    zoom: 13,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "POSCO Area", lat: 36.008, lng: 129.360, description: "Korea's steel capital story" },
      { name: "Hwanho Park", lat: 36.050, lng: 129.380, description: "Panoramic East Sea views" },
      { name: "Space Walk", lat: 36.051, lng: 129.381, description: "Iconic sky bridge over the ocean" },
      { name: "Yeongildae Beach", lat: 36.038, lng: 129.378, description: "Sunset views at Pohang's main beach" },
    ],
  },
  {
    slug: "winter-gwamegi",
    center: { lat: 36.032, lng: 129.365 },
    zoom: 14,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Jukdo Market Gwamegi", lat: 36.032, lng: 129.365, description: "Gwamegi tasting at market stalls" },
      { name: "Gwamegi Drying Racks", lat: 36.033, lng: 129.368, description: "See traditional gwamegi preparation" },
      { name: "Hot Springs Spa", lat: 36.025, lng: 129.350, description: "Warm up at local hot springs" },
      { name: "Seafood Hotpot Restaurant", lat: 36.028, lng: 129.358, description: "Hearty winter seafood dinner" },
    ],
  },
  {
    slug: "spring-cherry-blossom",
    center: { lat: 36.030, lng: 129.365 },
    zoom: 13,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Hyeongsangang River Path", lat: 36.025, lng: 129.355, description: "Cherry blossom-lined riverside walk" },
      { name: "Yeongildae Coastal Road", lat: 36.038, lng: 129.378, description: "Coastal cherry blossom tunnel" },
      { name: "Picnic Spot", lat: 36.035, lng: 129.370, description: "Korean spring picnic under the blossoms" },
      { name: "Flower Cafe", lat: 36.030, lng: 129.360, description: "Hidden local café with garden views" },
    ],
  },
  {
    slug: "summer-beach-adventure",
    center: { lat: 36.040, lng: 129.390 },
    zoom: 13,
    stops: [
      { name: "Hotel Pickup", lat: 36.019, lng: 129.343, description: "Central Pohang pickup point" },
      { name: "Wolpo Beach", lat: 36.060, lng: 129.410, description: "Calm-water snorkeling spot" },
      { name: "Yeongildae Beach", lat: 36.038, lng: 129.378, description: "Sea kayaking launch point" },
      { name: "Beachside Cafe", lat: 36.039, lng: 129.379, description: "Korean shaved ice (빙수) break" },
      { name: "Seafood Restaurant", lat: 36.037, lng: 129.377, description: "Fresh seafood lunch by the ocean" },
    ],
  },
];

export function getTourRoute(slug: string): TourRoute | undefined {
  return tourRoutes.find((r) => r.slug === slug);
}
