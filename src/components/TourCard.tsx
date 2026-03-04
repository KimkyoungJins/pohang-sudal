import Link from "next/link";
import type { Tour } from "@/lib/tours";

const emojiMap: Record<string, string> = {
  "homigot-sunrise": "🌅",
  "seafood-market": "🦐",
  "guryongpo-heritage": "🏘️",
  "temple-waterfall-hiking": "⛰️",
  "steel-city-ocean-view": "🌊",
};

const bgMap: Record<string, string> = {
  "homigot-sunrise": "from-[#ff6b35] to-[#f7931e]",
  "seafood-market": "from-[#e74c3c] to-[#c0392b]",
  "guryongpo-heritage": "from-[#8b6914] to-[#6b4e1e]",
  "temple-waterfall-hiking": "from-[#27ae60] to-[#1e8449]",
  "steel-city-ocean-view": "from-[#2c3e50] to-[#1b4d6e]",
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
      className={`group block img-zoom relative overflow-hidden ${
        isWide ? "col-span-2" : ""
      } ${isTall ? "row-span-2" : ""}`}
    >
      {/* Image placeholder */}
      <div
        className={`img-placeholder bg-gradient-to-br ${
          bgMap[tour.slug] || "from-ocean to-dark"
        } ${
          isWide ? "h-72" : isTall ? "h-full min-h-[500px]" : "h-80"
        } flex items-center justify-center`}
      >
        <span className="text-6xl opacity-50">{emojiMap[tour.slug] || "🗺️"}</span>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-gold text-xs tracking-widest uppercase font-medium">
            {tour.difficulty}
          </span>
          <span className="text-white/40">&middot;</span>
          <span className="text-white/60 text-xs">
            {tour.duration.split("(")[0].trim()}
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug">
          {tour.title}
        </h3>
        <p className="text-white/60 text-sm mt-2 line-clamp-2 max-w-md">
          {tour.subtitle}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-lg font-light">
            From <span className="text-sunrise-light font-medium">${tour.price}</span>
          </span>
          <span className="text-white/50 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
