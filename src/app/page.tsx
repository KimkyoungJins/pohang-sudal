import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import Reviews from "@/components/Reviews";
import ExternalReviews from "@/components/ExternalReviews";
import InstagramFeed from "@/components/InstagramFeed";
import Link from "next/link";
import { tours } from "@/lib/tours";
import { blogPosts } from "@/lib/blog";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro statement */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-dark leading-relaxed">
            Pohang is Korea&apos;s best-kept secret —{" "}
            <em className="text-sky">
              where the first sunrise meets ancient temples, fresh seafood, and
              coastal beauty
            </em>
            . Let a certified local guide show you the Pohang that no guidebook
            can.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-sky to-pink mx-auto mt-10" />
        </div>
      </section>

      {/* Featured Tours — Magazine grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
                Experiences
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
                Our Tours
              </h2>
            </div>
            <Link
              href="/tours"
              className="hidden sm:block text-sm text-sky hover:text-pink transition-colors tracking-wide"
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
              className="text-sm text-sky tracking-wide"
            >
              View All Tours →
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Tours */}
      {tours.filter((t) => t.seasonal).length > 0 && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
                Limited Time
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
                Seasonal Specials
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Unique experiences available only during specific seasons.
                Don&apos;t miss these limited-time tours!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tours
                .filter((t) => t.seasonal)
                .map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Pohang Sudal */}
      <section className="py-24 bg-sky-pale">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
              Your Guide
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2 pink-line-center">
              Why Pohang Sudal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-5">
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
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-5">
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
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-5">
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

      {/* Survey CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs tracking-[0.3em] uppercase font-medium px-4 py-1.5 rounded-full">
            Personalized
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mt-6 mb-6">
            Not sure where to start?
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Tell us about your interests and travel style. We&apos;ll recommend
            the perfect Pohang experience, curated just for you.
          </p>
          <Link
            href="/survey"
            className="inline-block bg-white text-dark px-10 py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-pink-pale hover:text-dark transition-all duration-500 shadow-lg"
          >
            Take the Survey
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
              Testimonials
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
              Guest Reviews
            </h2>
          </div>
          <Reviews />
          <ExternalReviews />
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-24 bg-sky-pale/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky text-xs tracking-[0.3em] uppercase font-medium">
              Travel Tips
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
              From Our Blog
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-sky-pale to-pink-pale flex items-center justify-center">
                  <span className="text-4xl">{post.emoji}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-sky font-medium">{post.category}</span>
                  <h3 className="font-serif text-lg text-dark mt-1 group-hover:text-sky transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2">{post.readTime} read</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="text-sm text-sky hover:text-pink transition-colors tracking-wide"
            >
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />
    </>
  );
}
