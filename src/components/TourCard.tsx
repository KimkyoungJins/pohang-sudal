import Link from "next/link";
import type { Tour } from "@/lib/tours";

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

export default function TourCard({
  tour,
  variant = "default",
}: {
  tour: Tour;
  variant?: "default" | "wide" | "tall";
}) {
  const isWide = variant === "wide";
  const isTall = variant === "tall";

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={`group block img-zoom relative overflow-hidden rounded-2xl ${
        isWide ? "col-span-2" : ""
      } ${isTall ? "row-span-2" : ""}`}
    >
      {/* Image placeholder */}
      <div
        className={`img-placeholder bg-gradient-to-br ${
          bgMap[tour.slug] || "from-sky to-pink"
        } ${
          isWide ? "h-72" : isTall ? "h-full min-h-[500px]" : "h-80"
        } flex items-center justify-center`}
      >
        <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-500">
          {emojiMap[tour.slug] || "🗺️"}
        </span>
      </div>

      {/* Seasonal Badge */}
      {tour.seasonal && tour.seasonalLabel && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-pink text-xs tracking-wide font-bold px-3 py-1.5 rounded-full shadow-sm">
            {tour.seasonalLabel}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase font-medium px-3 py-1 rounded-full">
            {tour.difficulty}
          </span>
          <span className="text-white/60 text-xs">
            {tour.duration.split("(")[0].trim()}
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug">
          {tour.title}
        </h3>
        <p className="text-white/70 text-sm mt-2 line-clamp-2 max-w-md">
          {tour.subtitle}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-lg font-light">
            From <span className="text-pink-pale font-medium">${tour.price}</span>
          </span>
          <span className="text-white/50 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
