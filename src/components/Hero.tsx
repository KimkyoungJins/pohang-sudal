import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-[200px]">🦦</div>
        <div className="absolute bottom-10 right-10 text-[150px]">🌊</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="text-sm font-medium">
            🦦 Licensed Tour Guide in Pohang, South Korea
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Discover Pohang
          <br />
          <span className="text-teal-200">Like a Local</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore Korea&apos;s hidden coastal gem with a certified local guide.
          From stunning sunrises to fresh seafood markets, experience the real
          Pohang that most tourists never see.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-white text-teal-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
          >
            Explore Our Tours
          </Link>
          <Link
            href="/survey"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Help Me Choose
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
          <div>
            <div className="text-3xl font-bold">5+</div>
            <div className="text-white/70 text-sm">Unique Tours</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100%</div>
            <div className="text-white/70 text-sm">Local Expert</div>
          </div>
          <div>
            <div className="text-3xl font-bold">EN</div>
            <div className="text-white/70 text-sm">English Guide</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
