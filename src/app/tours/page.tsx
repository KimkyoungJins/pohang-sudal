import Link from "next/link";
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
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            Experiences
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Our Tours
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Every tour is personally led by a licensed, English-speaking guide
            who lives in Pohang. Small groups, big experiences.
          </p>
          <Link
            href="/compare"
            className="inline-block mt-4 text-sm text-sky hover:text-pink transition-colors tracking-wide font-medium"
          >
            Compare All Tours →
          </Link>
        </div>

        {/* Filters info */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <span className="bg-sky-pale text-sky px-4 py-2 rounded-full text-sm font-medium">
            🌅 Sunrise
          </span>
          <span className="bg-pink-pale text-pink px-4 py-2 rounded-full text-sm font-medium">
            🦐 Food & Markets
          </span>
          <span className="bg-lavender/20 text-lavender px-4 py-2 rounded-full text-sm font-medium">
            🏘️ Culture & History
          </span>
          <span className="bg-mint/20 text-mint px-4 py-2 rounded-full text-sm font-medium">
            ⛰️ Nature & Hiking
          </span>
          <span className="bg-sky-pale text-sky px-4 py-2 rounded-full text-sm font-medium">
            🌊 Coastal Views
          </span>
          <span className="bg-pink-pale text-pink px-4 py-2 rounded-full text-sm font-medium">
            🗓️ Seasonal
          </span>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div className="mt-16 hero-gradient rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="font-serif text-2xl sm:text-3xl mb-3">
            Want a Custom Tour?
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-6">
            Have a specific interest or limited time? We can create a
            personalized itinerary just for you. Tell us what you&apos;re
            looking for!
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-dark px-8 py-3 rounded-full font-semibold hover:bg-pink-pale transition-colors"
          >
            Request a Custom Tour
          </a>
        </div>
      </div>
    </div>
  );
}
