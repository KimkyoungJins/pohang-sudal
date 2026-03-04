import Link from "next/link";
import { tours } from "@/lib/tours";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Tours - Pohang Sudal | Find Your Perfect Tour",
  description:
    "Compare all Pohang Sudal tours side by side. Compare prices, duration, difficulty, group size, and highlights to find the perfect tour for you.",
};

export default function ComparePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            Side by Side
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Compare Tours
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Not sure which tour to pick? Compare all our experiences side by
            side to find the perfect match.
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-3 font-serif text-lg text-dark w-40">
                  Tour
                </th>
                <th className="text-center py-4 px-3 text-gray-500 font-medium">
                  Price
                </th>
                <th className="text-center py-4 px-3 text-gray-500 font-medium">
                  Duration
                </th>
                <th className="text-center py-4 px-3 text-gray-500 font-medium">
                  Difficulty
                </th>
                <th className="text-center py-4 px-3 text-gray-500 font-medium">
                  Group Size
                </th>
                <th className="text-left py-4 px-3 text-gray-500 font-medium">
                  Top Highlights
                </th>
                <th className="py-4 px-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tours.map((tour) => (
                <tr key={tour.slug} className="hover:bg-sky-pale/20 transition-colors">
                  <td className="py-4 px-3">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="font-serif text-dark font-medium hover:text-sky transition-colors"
                    >
                      {tour.title}
                    </Link>
                    {tour.seasonal && (
                      <span className="ml-2 inline-block bg-pink-pale text-pink text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {tour.seasonalLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-dark font-bold text-base">
                      ${tour.price}
                    </span>
                    <span className="text-gray-400 text-xs block">
                      /person
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center text-gray-700">
                    {tour.duration.split("(")[0].trim()}
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        tour.difficulty === "Easy"
                          ? "bg-green-50 text-green-700"
                          : tour.difficulty === "Moderate"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {tour.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center text-gray-700">
                    {tour.groupSize}
                  </td>
                  <td className="py-4 px-3">
                    <ul className="space-y-1">
                      {tour.highlights.slice(0, 3).map((h, i) => (
                        <li
                          key={i}
                          className="text-gray-600 text-xs flex items-start"
                        >
                          <span className="text-pink mr-1 mt-0.5 shrink-0">
                            •
                          </span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-3">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="text-sky text-xs font-medium hover:text-pink transition-colors whitespace-nowrap"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-block bg-gradient-to-r from-sky to-pink text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Book a Tour
          </Link>
        </div>
      </div>
    </div>
  );
}
