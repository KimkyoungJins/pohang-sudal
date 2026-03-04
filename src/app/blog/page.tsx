import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Pohang Sudal | Pohang Travel Guide & Tips",
  description:
    "Read our travel guides, local tips, and insider knowledge about Pohang, South Korea. Plan your perfect trip with advice from a certified local guide.",
};

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            Travel Tips
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Pohang Travel Blog
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Insider tips, local guides, and everything you need to know about
            visiting Pohang — from your certified local guide.
          </p>
        </div>

        {/* Blog posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-sky-pale to-pink-pale flex items-center justify-center shrink-0">
                  <span className="text-5xl">{post.emoji}</span>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-sky-pale text-sky text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime} read</span>
                  </div>
                  <h2 className="font-serif text-xl text-dark group-hover:text-sky transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-gray-300 text-xs mt-3">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
