import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import Link from "next/link";
import { tours } from "@/lib/tours";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Tours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Tours
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Handpicked experiences that showcase the best of Pohang. Every
              tour is led by a certified, English-speaking local guide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tours"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pohang Sudal */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Pohang Sudal?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Licensed & Certified
              </h3>
              <p className="text-gray-500">
                Certified tour interpreter guide (관광통역안내사) — your
                guarantee of professionalism and quality. Legally licensed to
                guide in South Korea.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                True Local Expert
              </h3>
              <p className="text-gray-500">
                Born and based in Pohang. We know the hidden spots, the best
                restaurants, and the stories that make this city special — things
                you won&apos;t find in any guidebook.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fluent English
              </h3>
              <p className="text-gray-500">
                No language barriers. Enjoy seamless communication and in-depth
                explanations about Korean culture, history, and daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Not sure which tour to pick?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Take our quick survey and we&apos;ll recommend the perfect Pohang
            experience based on your interests, schedule, and travel style.
          </p>
          <Link
            href="/survey"
            className="inline-block bg-white text-teal-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors"
          >
            Help Me Choose a Tour
          </Link>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            What Travelers Say
          </h2>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-600 text-lg italic leading-relaxed">
              &quot;An amazing experience! Our guide was incredibly
              knowledgeable about Pohang&apos;s history and took us to places
              we would never have found on our own. The seafood market tour was
              the highlight of our entire Korea trip!&quot;
            </p>
            <p className="mt-4 font-semibold text-gray-900">
              — Coming soon: real reviews from happy travelers
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
