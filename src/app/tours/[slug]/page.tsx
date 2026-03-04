import Link from "next/link";
import { tours, getTourBySlug } from "@/lib/tours";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reviews from "@/components/Reviews";
import PayButton from "@/components/PayButton";
import ShareButtons from "@/components/ShareButtons";
import TourCalendar from "@/components/TourCalendar";
import TourMap from "@/components/TourMap";

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: `${tour.title} - Pohang Sudal`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} - Pohang Sudal`,
      description: tour.subtitle,
      type: "website",
    },
  };
}

const bgMap: Record<string, string> = {
  "homigot-sunrise": "from-[#f7806a] to-[#f28dac]",
  "seafood-market": "from-[#5eb8f0] to-[#7ed6c3]",
  "guryongpo-heritage": "from-[#c4b5f5] to-[#f28dac]",
  "temple-waterfall-hiking": "from-[#7ed6c3] to-[#5eb8f0]",
  "steel-city-ocean-view": "from-[#5eb8f0] to-[#c4b5f5]",
  "winter-gwamegi": "from-[#a8d8ea] to-[#b8c6db]",
  "spring-cherry-blossom": "from-[#fbc2eb] to-[#f8b4c8]",
  "summer-beach-adventure": "from-[#43e97b] to-[#38f9d7]",
};

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const emojiMap: Record<string, string> = {
    "homigot-sunrise": "🌅",
    "seafood-market": "🦐",
    "guryongpo-heritage": "🏘️",
    "temple-waterfall-hiking": "⛰️",
    "steel-city-ocean-view": "🌊",
    "winter-gwamegi": "🐟",
    "spring-cherry-blossom": "🌸",
    "summer-beach-adventure": "🏖️",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
    },
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className={`relative h-72 sm:h-96 bg-gradient-to-br ${bgMap[tour.slug] || "from-sky to-pink"} flex items-center justify-center`}>
        {tour.seasonal && tour.seasonalLabel && (
          <div className="absolute top-6 right-6">
            <span className="bg-white/90 backdrop-blur-sm text-pink text-sm tracking-wide font-bold px-4 py-2 rounded-full shadow-sm">
              {tour.seasonalLabel}
            </span>
          </div>
        )}
        <div className="text-center text-white">
          <div className="text-7xl mb-4">{emojiMap[tour.slug] || "🗺️"}</div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">{tour.title}</h1>
          <p className="text-white/80 mt-2 text-lg">{tour.subtitle}</p>
          <div className="mt-6">
            <ShareButtons title={tour.title} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-dark mb-3">
                About This Tour
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description}
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-dark mb-3">
                Highlights
              </h2>
              <ul className="space-y-2">
                {tour.highlights.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-pink mr-2 mt-0.5">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-lg text-dark mb-2">
                  What&apos;s Included
                </h3>
                <ul className="space-y-1">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-mint mr-2">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg text-dark mb-2">
                  Not Included
                </h3>
                <ul className="space-y-1">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-coral mr-2">✕</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tour Map */}
            <TourMap tourSlug={tour.slug} />

            {/* Reviews */}
            <div className="pt-4">
              <h2 className="font-serif text-2xl text-dark mb-6">
                Guest Reviews
              </h2>
              <Reviews tourSlug={tour.slug} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-5">
              <div className="text-center">
                <div className="text-3xl font-bold text-dark">
                  ${tour.price}
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    / person
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-dark">
                    {tour.duration.split("(")[0].trim()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Group Size</span>
                  <span className="font-medium text-dark">
                    {tour.groupSize}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="font-medium text-dark">
                    {tour.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Meeting Point</span>
                  <span className="font-medium text-dark text-right max-w-[60%]">
                    {tour.meetingPoint}
                  </span>
                </div>
              </div>

              <Link
                href={`/booking?tour=${tour.slug}`}
                className="block w-full bg-gradient-to-r from-sky to-pink text-white text-center py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Book This Tour
              </Link>
              <PayButton
                tourSlug={tour.slug}
                tourTitle={tour.title}
                price={tour.price}
              />
              <Link
                href="/survey"
                className="block w-full border border-gray-200 text-gray-600 text-center py-3 rounded-full font-medium hover:bg-sky-pale transition-colors"
              >
                Not Sure? Take Our Survey
              </Link>
              <TourCalendar tour={tour} />
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/tours"
            className="text-sky font-medium hover:text-pink transition-colors"
          >
            ← Back to All Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
