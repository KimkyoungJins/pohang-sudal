import Link from "next/link";
import { tours, getTourBySlug } from "@/lib/tours";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  };
}

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
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-7xl mb-4">{emojiMap[tour.slug] || "🗺️"}</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">{tour.title}</h1>
          <p className="text-teal-100 mt-2 text-lg">{tour.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                About This Tour
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Highlights
              </h2>
              <ul className="space-y-2">
                {tour.highlights.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-0.5">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What&apos;s Included
                </h3>
                <ul className="space-y-1">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Not Included
                </h3>
                <ul className="space-y-1">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-red-400 mr-2">✕</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-5">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-gray-900">
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
                  <span className="font-medium text-gray-900">
                    {tour.duration.split("(")[0].trim()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Group Size</span>
                  <span className="font-medium text-gray-900">
                    {tour.groupSize}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="font-medium text-gray-900">
                    {tour.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Meeting Point</span>
                  <span className="font-medium text-gray-900 text-right max-w-[60%]">
                    {tour.meetingPoint}
                  </span>
                </div>
              </div>

              <Link
                href={`/booking?tour=${tour.slug}`}
                className="block w-full bg-teal-600 text-white text-center py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
              >
                Book This Tour
              </Link>
              <Link
                href="/survey"
                className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Not Sure? Take Our Survey
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/tours"
            className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
          >
            ← Back to All Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
