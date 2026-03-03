import Link from "next/link";
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
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🦦</div>
                <p className="text-lg font-medium">Your Guide</p>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Meet Your Guide
              </h1>
              <div className="inline-block bg-teal-50 text-teal-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Pohang?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🌊 Coastal Beauty
              </h3>
              <p className="text-gray-600">
                Located on the southeast coast of Korea, Pohang boasts stunning
                beaches, dramatic cliffs, and the famous Homigot — where the sun
                rises first on mainland Korea.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🦐 Seafood Paradise
              </h3>
              <p className="text-gray-600">
                Home to Jukdo Market, one of Korea&apos;s largest seafood
                markets. Pohang is famous for gwamegi (semi-dried fish) and some
                of the freshest sashimi you&apos;ll ever taste.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🏘️ Rich History
              </h3>
              <p className="text-gray-600">
                From the Japanese colonial-era houses of Guryongpo to the
                ancient Bogyeongsa Temple (built in 602 AD), Pohang&apos;s
                history spans centuries of fascinating stories.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🏙️ Korea&apos;s Steel City
              </h3>
              <p className="text-gray-600">
                Home to POSCO, one of the world&apos;s largest steel
                manufacturers. Pohang&apos;s transformation from a fishing
                village to an industrial powerhouse is a key chapter in
                Korea&apos;s economic miracle.
              </p>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Credentials & Guarantees
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl mb-3">📜</div>
              <h3 className="font-bold text-gray-900 mb-1">
                Government Licensed
              </h3>
              <p className="text-gray-500 text-sm">
                Official 관광통역안내사 certification from the Korean government
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-bold text-gray-900 mb-1">Fully Insured</h3>
              <p className="text-gray-500 text-sm">
                Travel insurance coverage for all tour participants
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-bold text-gray-900 mb-1">
                Satisfaction Promise
              </h3>
              <p className="text-gray-500 text-sm">
                Not happy? We&apos;ll work with you to make it right
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-3">
            Ready to Explore Pohang?
          </h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">
            Whether you already know what you want or need help deciding,
            I&apos;m here to help plan your perfect Pohang experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="bg-white text-teal-700 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors"
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
