import Link from "next/link";
import type { Tour } from "@/lib/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image placeholder */}
        <div className="relative h-56 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-white/80">
            <div className="text-center">
              <div className="text-5xl mb-2">
                {tour.slug === "homigot-sunrise" && "🌅"}
                {tour.slug === "seafood-market" && "🦐"}
                {tour.slug === "guryongpo-heritage" && "🏘️"}
                {tour.slug === "temple-waterfall-hiking" && "⛰️"}
                {tour.slug === "steel-city-ocean-view" && "🌊"}
              </div>
              <p className="text-sm font-medium">{tour.duration}</p>
            </div>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
            From ${tour.price}
          </div>
          <div className="absolute bottom-3 left-3 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {tour.difficulty}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
            {tour.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{tour.subtitle}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-gray-500 space-x-3">
              <span>⏱ {tour.duration.split("(")[0].trim()}</span>
              <span>👥 {tour.groupSize}</span>
            </div>
            <span className="text-teal-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
