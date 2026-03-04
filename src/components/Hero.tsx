import Link from "next/link";
import WeatherWidget from "@/components/WeatherWidget";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end justify-start overflow-hidden">
      {/* Background gradient — sky blue to pink */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-pink-pale/20 rounded-full blur-2xl" />
      </div>

      {/* Top badge */}
      <div className="absolute top-24 left-0 right-0 text-center z-10 animate-fade-up">
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white tracking-[0.3em] uppercase text-xs font-medium px-6 py-2 rounded-full">
          Licensed Tour Guide &middot; Pohang, South Korea
        </span>
        <div className="mt-3">
          <WeatherWidget />
        </div>
      </div>

      {/* Center title */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <div className="text-6xl mb-4 animate-float">🦦</div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white leading-tight animate-fade-up drop-shadow-lg">
            Discover
            <br />
            <em className="text-pink-pale">Pohang</em>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl mt-6 max-w-md mx-auto animate-fade-up-delay font-light">
            Explore Korea&apos;s hidden coastal gem with a certified local guide
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 w-full pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-up-delay-2">
          <div className="flex items-center space-x-8 text-white/70 text-sm tracking-wide">
            <span>5 Curated Tours</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>English Speaking</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Private & Group</span>
          </div>
          <Link
            href="/tours"
            className="group flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white hover:text-dark transition-all duration-500"
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
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/60" />
      </div>
    </section>
  );
}
