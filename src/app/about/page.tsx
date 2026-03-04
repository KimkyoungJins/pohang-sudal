import Link from "next/link";
import YouTubeSection from "@/components/YouTubeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Pohang Sudal | Your Licensed Tour Guide",
  description:
    "Meet your certified Pohang tour guide. Licensed tour interpreter guide (관광통역안내사) with deep local knowledge and fluent English. Learn about Pohang and what makes it special.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Guide Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="hero-gradient rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🦦</div>
                <p className="text-lg font-medium">Your Guide</p>
              </div>
            </div>
            <div>
              <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
                About Me
              </span>
              <h1 className="font-serif text-4xl text-dark mt-2 mb-4">
                Meet Your Guide
              </h1>
              <div className="inline-block bg-sky-pale text-sky px-4 py-1 rounded-full text-sm font-medium mb-4">
                🏅 Licensed Tour Interpreter Guide (관광통역안내사)
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hi! I&apos;m the founder of Pohang Sudal, a certified tour
                interpreter guide based in Pohang. I hold an official Korean
                government license (관광통역안내사), which means I&apos;m legally
                certified to guide tourists in South Korea.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Living in Pohang gives me a unique perspective on this beautiful
                coastal city. I know the hidden gems, the best local restaurants,
                and the stories behind every corner. My mission is to show you the
                real Pohang — beyond what any guidebook can offer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you&apos;re here for a day or a week, I&apos;ll make
                sure your time in Pohang is unforgettable. Let&apos;s explore
                together!
              </p>
            </div>
          </div>
        </section>

        {/* What is Pohang */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
              Destination
            </span>
            <h2 className="font-serif text-3xl text-dark mt-2">
              Why Pohang?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-pale rounded-2xl p-6">
              <h3 className="font-serif text-xl text-dark mb-2">
                🌊 Coastal Beauty
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Located on the southeast coast of Korea, Pohang boasts stunning
                beaches, dramatic cliffs, and the famous Homigot — where the sun
                rises first on mainland Korea.
              </p>
            </div>
            <div className="bg-pink-pale rounded-2xl p-6">
              <h3 className="font-serif text-xl text-dark mb-2">
                🦐 Seafood Paradise
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Home to Jukdo Market, one of Korea&apos;s largest seafood
                markets. Pohang is famous for gwamegi (semi-dried fish) and some
                of the freshest sashimi you&apos;ll ever taste.
              </p>
            </div>
            <div className="bg-lavender/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-dark mb-2">
                🏘️ Rich History
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From the Japanese colonial-era houses of Guryongpo to the
                ancient Bogyeongsa Temple (built in 602 AD), Pohang&apos;s
                history spans centuries of fascinating stories.
              </p>
            </div>
            <div className="bg-mint/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-dark mb-2">
                🏙️ Korea&apos;s Steel City
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Home to POSCO, one of the world&apos;s largest steel
                manufacturers. Pohang&apos;s transformation from a fishing
                village to an industrial powerhouse is a key chapter in
                Korea&apos;s economic miracle.
              </p>
            </div>
          </div>
        </section>

        {/* YouTube Videos */}
        <YouTubeSection />

        {/* Credentials */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
              Trust
            </span>
            <h2 className="font-serif text-3xl text-dark mt-2">
              Credentials & Guarantees
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-sky-pale">
              <div className="text-4xl mb-3">📜</div>
              <h3 className="font-serif font-bold text-dark mb-1">
                Government Licensed
              </h3>
              <p className="text-gray-500 text-sm">
                Official 관광통역안내사 certification from the Korean government
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-pink-pale">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-serif font-bold text-dark mb-1">Fully Insured</h3>
              <p className="text-gray-500 text-sm">
                Travel insurance coverage for all tour participants
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-mint/30">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-serif font-bold text-dark mb-1">
                Satisfaction Promise
              </h3>
              <p className="text-gray-500 text-sm">
                Not happy? We&apos;ll work with you to make it right
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center hero-gradient rounded-2xl p-10 text-white">
          <h2 className="font-serif text-3xl mb-3">
            Ready to Explore Pohang?
          </h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">
            Whether you already know what you want or need help deciding,
            I&apos;m here to help plan your perfect Pohang experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="bg-white text-dark px-8 py-3 rounded-full font-semibold hover:bg-pink-pale transition-colors"
            >
              Browse Tours
            </Link>
            <Link
              href="/booking"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
