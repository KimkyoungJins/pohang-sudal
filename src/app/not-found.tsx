import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🦦</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-dark mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! This page seems to have drifted out to sea.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-sky to-pink text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/tours"
            className="border border-gray-200 text-gray-600 px-8 py-3 rounded-full font-medium hover:bg-sky-pale transition-colors"
          >
            Browse Tours
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm text-gray-400">
          <Link href="/survey" className="hover:text-sky transition-colors">Help Me Choose</Link>
          <span>&middot;</span>
          <Link href="/blog" className="hover:text-sky transition-colors">Blog</Link>
          <span>&middot;</span>
          <Link href="/about" className="hover:text-sky transition-colors">About</Link>
          <span>&middot;</span>
          <Link href="/faq" className="hover:text-sky transition-colors">FAQ</Link>
        </div>
      </div>
    </div>
  );
}
