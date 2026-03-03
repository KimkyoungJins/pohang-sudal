import TourCard from "@/components/TourCard";
import { tours } from "@/lib/tours";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours - Pohang Sudal | Explore Pohang with a Local Guide",
  description:
    "Browse our curated Pohang tours: sunrise at Homigot, seafood at Jukdo Market, Guryongpo heritage walk, temple hiking, and more. Book your adventure today!",
};

export default function ToursPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Our Tours
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Every tour is personally led by a licensed, English-speaking guide
            who lives in Pohang. Small groups, big experiences.
          </p>
        </div>

        {/* Filters info */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            🌅 Sunrise
          </span>
          <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            🦐 Food & Markets
          </span>
          <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            🏘️ Culture & History
          </span>
          <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            ⛰️ Nature & Hiking
          </span>
          <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            🌊 Coastal Views
          </span>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Want a Custom Tour?
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-6">
            Have a specific interest or limited time? We can create a
            personalized itinerary just for you. Tell us what you&apos;re
            looking for!
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-teal-700 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors"
          >
            Request a Custom Tour
          </a>
        </div>
      </div>
    </div>
  );
}
