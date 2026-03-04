import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} - Pohang Sudal Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown-to-html for ## headings, **bold**, [links](url)
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="font-serif text-2xl text-dark mt-8 mb-4">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={i} className="font-serif text-xl text-dark mt-6 mb-3">
            {paragraph.replace("### ", "")}
          </h3>
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 text-gray-600 mb-4">
            {items.map((item, j) => (
              <li key={j}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      if (paragraph.startsWith("---")) {
        return <hr key={i} className="my-8 border-gray-200" />;
      }

      // Handle inline formatting
      const formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-sky hover:text-pink underline">$1</a>');

      return (
        <p
          key={i}
          className="text-gray-600 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Pohang Sudal",
    },
  };

  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/blog"
          className="text-sky text-sm hover:text-pink transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mt-6 mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-sky-pale text-sky text-xs font-medium px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-400 text-xs">{post.readTime} read</span>
            <span className="text-gray-400 text-xs">{post.date}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-dark leading-snug">
            {post.title}
          </h1>
          <p className="text-gray-500 mt-3 text-lg">{post.excerpt}</p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-sky to-pink mt-6" />
          <div className="mt-4">
            <ShareButtons title={post.title} />
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">{renderContent(post.content)}</div>

        {/* CTA */}
        <div className="mt-12 hero-gradient rounded-2xl p-8 text-center text-white">
          <h3 className="font-serif text-2xl mb-3">Ready to Explore Pohang?</h3>
          <p className="text-white/80 mb-6">
            Book a tour with a certified local guide and experience the real Pohang.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tours"
              className="bg-white text-dark px-6 py-3 rounded-full font-medium hover:bg-pink-pale transition-colors"
            >
              Browse Tours
            </Link>
            <Link
              href="/survey"
              className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Help Me Choose
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
