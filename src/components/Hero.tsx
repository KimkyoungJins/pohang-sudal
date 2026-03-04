import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end justify-start overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean via-[#1a3a5c] to-dark" />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Top badge */}
      <div className="absolute top-24 left-0 right-0 text-center z-10 animate-fade-up">
        <span className="inline-block text-gold tracking-[0.3em] uppercase text-xs font-medium">
          Licensed Tour Guide &middot; Pohang, South Korea
        </span>
      </div>

      {/* Center title */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white leading-tight animate-fade-up">
            Discover
            <br />
            <em className="text-sunrise-light">Pohang</em>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl mt-6 max-w-md mx-auto animate-fade-up-delay font-light">
            Explore Korea&apos;s hidden coastal gem with a certified local guide
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 w-full pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-up-delay-2">
          <div className="flex items-center space-x-8 text-white/50 text-sm tracking-wide">
            <span>5 Curated Tours</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>English Speaking</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Private & Group</span>
          </div>
          <Link
            href="/tours"
            className="group flex items-center space-x-3 border border-white/30 text-white px-8 py-4 hover:bg-white hover:text-dark transition-all duration-500"
          >
            <span className="tracking-widest uppercase text-sm font-medium">
              Explore Tours
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/40" />
      </div>
    </section>
  );
}
