import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import Link from "next/link";
import { tours } from "@/lib/tours";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro statement */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-dark leading-relaxed">
            Pohang is Korea&apos;s best-kept secret —{" "}
            <em className="text-ocean">
              where the first sunrise meets ancient temples, fresh seafood, and
              coastal beauty
            </em>
            . Let a certified local guide show you the Pohang that no guidebook
            can.
          </p>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-10" />
        </div>
      </section>

      {/* Featured Tours — Magazine grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Experiences
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
                Our Tours
              </h2>
            </div>
            <Link
              href="/tours"
              className="hidden sm:block text-sm text-ocean hover:text-ocean-light transition-colors tracking-wide"
            >
              View All →
            </Link>
          </div>

          {/* Bento-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top row: 1 tall + 1 normal */}
            <div className="md:row-span-2">
              <TourCard tour={tours[0]} variant="tall" />
            </div>
            <TourCard tour={tours[1]} />
            <TourCard tour={tours[2]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TourCard tour={tours[3]} />
            <TourCard tour={tours[4]} />
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/tours"
              className="text-sm text-ocean tracking-wide"
            >
              View All Tours →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pohang Sudal — Elegant */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Your Guide
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2 gold-line-center">
              Why Pohang Sudal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="font-serif text-xl text-dark mb-3">
                Government Licensed
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Certified tour interpreter guide (관광통역안내사) — the official
                Korean government credential guaranteeing professionalism and
                expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-serif text-xl text-dark mb-3">
                True Local Knowledge
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Born and raised in Pohang. Every recommendation comes from
                years of living here — the hidden restaurants, the quiet beaches,
                the stories behind every corner.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-serif text-xl text-dark mb-3">
                Personal & Private
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Small groups, personal attention. No crowded tour buses. Every
                tour is tailored to your pace, interests, and curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Survey CTA — Full width */}
      <section className="relative py-32 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] text-white/5">
            🦦
          </div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Personalized
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mt-4 mb-6">
            Not sure where to start?
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Tell us about your interests and travel style. We&apos;ll recommend
            the perfect Pohang experience, curated just for you.
          </p>
          <Link
            href="/survey"
            className="inline-block border border-gold text-gold px-10 py-4 tracking-widest uppercase text-sm hover:bg-gold hover:text-dark transition-all duration-500"
          >
            Take the Survey
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Testimonials
          </span>
          <div className="mt-10">
            <svg
              className="w-8 h-8 text-sand mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-serif text-2xl sm:text-3xl text-dark leading-relaxed italic">
              An unforgettable experience. Our guide&apos;s deep knowledge of
              Pohang transformed a simple trip into a journey through Korean
              culture, history, and cuisine.
            </p>
            <div className="mt-8">
              <div className="w-10 h-[1px] bg-gold mx-auto mb-4" />
              <p className="text-gray-400 text-sm tracking-wide">
                — Your review could be here. Be our first guest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
