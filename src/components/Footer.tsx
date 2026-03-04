import Link from "next/link";
import Newsletter from "@/components/Newsletter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">🦦</span>
              <span className="text-white text-lg tracking-wider font-medium">
                POHANG <span className="text-sky-light">SUDAL</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Your certified local guide in Pohang, South Korea. Licensed tour
              interpreter guide (관광통역안내사) dedicated to showing you the
              authentic side of Korea&apos;s hidden coastal gem.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Instagram" className="hover:text-pink transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-sky-light transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tours */}
          <div className="md:col-span-3">
            <h3 className="text-pink-light text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Tours
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tours/homigot-sunrise" className="hover:text-white transition-colors">Homigot Sunrise</Link></li>
              <li><Link href="/tours/seafood-market" className="hover:text-white transition-colors">Seafood & Market</Link></li>
              <li><Link href="/tours/guryongpo-heritage" className="hover:text-white transition-colors">Guryongpo Heritage</Link></li>
              <li><Link href="/tours/temple-waterfall-hiking" className="hover:text-white transition-colors">Temple & Waterfall</Link></li>
              <li><Link href="/tours/steel-city-ocean-view" className="hover:text-white transition-colors">Steel City & Ocean</Link></li>
            </ul>
          </div>

          {/* Links + Contact */}
          <div className="md:col-span-4">
            <h3 className="text-pink-light text-xs tracking-[0.2em] uppercase font-medium mb-6">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>hello@pohangsudal.com</li>
              <li>+82-10-XXXX-XXXX</li>
              <li>Pohang, Gyeongsangbuk-do</li>
              <li>South Korea</li>
            </ul>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-block bg-gradient-to-r from-sky to-pink text-white px-6 py-2.5 text-xs tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-10 border-b border-white/10">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white text-sm font-medium mb-2">
              Get Pohang Travel Tips
            </h3>
            <p className="text-white/40 text-xs mb-4">
              Subscribe to receive insider guides and exclusive tour offers.
            </p>
            <Newsletter />
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} Pohang Sudal (포항수달). All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <span>&middot;</span>
            <p>Licensed Tour Interpreter Guide (관광통역안내사)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
