import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🦦</span>
              <span className="text-xl font-bold text-white">
                Pohang Sudal
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted local guide in Pohang, South Korea. Licensed and
              certified to show you the best of Korea&apos;s hidden coastal gem.
            </p>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Tours</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tours/homigot-sunrise"
                  className="hover:text-teal-400 transition-colors"
                >
                  Homigot Sunrise Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/seafood-market"
                  className="hover:text-teal-400 transition-colors"
                >
                  Seafood & Market Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/guryongpo-heritage"
                  className="hover:text-teal-400 transition-colors"
                >
                  Guryongpo Heritage Walk
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/temple-waterfall-hiking"
                  className="hover:text-teal-400 transition-colors"
                >
                  Temple & Waterfall Hiking
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/steel-city-ocean-view"
                  className="hover:text-teal-400 transition-colors"
                >
                  Steel City & Ocean View
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-400 transition-colors"
                >
                  About Your Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/survey"
                  className="hover:text-teal-400 transition-colors"
                >
                  Help Me Choose a Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="hover:text-teal-400 transition-colors"
                >
                  Book a Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 hello@pohangsudal.com</li>
              <li>📱 +82-10-XXXX-XXXX</li>
              <li>📍 Pohang, Gyeongsangbuk-do, South Korea</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-teal-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-teal-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Pohang Sudal (포항수달). All
            rights reserved. Licensed Tour Guide (관광통역안내사).
          </p>
        </div>
      </div>
    </footer>
  );
}
