"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/tours", label: "Tours" },
    { href: "/survey", label: "Help Me Choose" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🦦</span>
            <span
              className={`text-lg tracking-wider font-medium transition-colors ${
                scrolled ? "text-dark" : "text-white"
              }`}
            >
              POHANG{" "}
              <span className={scrolled ? "text-ocean" : "text-sunrise-light"}>
                SUDAL
              </span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide hover:opacity-100 transition-all ${
                  scrolled
                    ? "text-gray-600 hover:text-dark"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/booking"
              className={`text-sm tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 ${
                scrolled
                  ? "border-dark text-dark hover:bg-dark hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-dark"
              }`}
            >
              Book Now
            </Link>

            {/* Auth */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200/30 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="focus:outline-none"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-gold/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-ocean text-white flex items-center justify-center text-sm font-medium">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                </button>
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-dark truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className={`text-sm transition-colors ${
                  scrolled
                    ? "text-gray-500 hover:text-dark"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              scrolled ? "text-dark" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mb-4 overflow-hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 px-6 text-gray-700 hover:bg-cream transition-colors border-b border-gray-50 text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block py-4 px-6 text-ocean font-medium text-sm tracking-wide"
            >
              Book Now
            </Link>
            {!loading && (
              <div className="border-t border-gray-100 px-6 py-4">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 truncate max-w-[180px]">
                      {user.displayName || user.email}
                    </span>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="text-sm text-gray-400 hover:text-gray-600"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                    className="text-sm text-ocean"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
